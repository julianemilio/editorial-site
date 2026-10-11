import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { getBoldPaymentVoucher, toOrderStatus } from "@/lib/bold";
import { sendMail } from "@/lib/mailer";
import { buildOrderConfirmationEmail } from "@/lib/emails/orderConfirmation";

/**
 * Recibe:
 * {
 *   invoiceId: string;
 *   gateway: "bold";
 * }
 *
 * El estado del pago NO se toma del cliente: se consulta directamente a Bold.
 * Si la orden está APPROVED y aún no se ha enviado el correo de confirmación
 * (confirmation_email_sent_at vacío), se envía una sola vez.
 */
export async function POST(req: NextRequest) {
    try {
        const { invoiceId, gateway } = await req.json();

        if (!invoiceId || !gateway) {
            return NextResponse.json(
                { ok: false, error: "invoiceId y gateway son requeridos" },
                { status: 400 }
            );
        }

        const voucher = await getBoldPaymentVoucher(invoiceId);
        if (!voucher) {
            return NextResponse.json(
                { ok: false, error: "No se pudo verificar el pago con Bold" },
                { status: 502 }
            );
        }

        const status = toOrderStatus(voucher.payment_status);

        const { error } = await supabaseServer
            .from("orders")
            .update({ status, gateway })
            .eq("invoice_id", invoiceId);

        if (error) {
            console.error("❌ Supabase update error:", error);
            return NextResponse.json({ ok: false, error }, { status: 500 });
        }

        if (status !== "APPROVED") {
            return NextResponse.json({ ok: true, status, invoiceId });
        }

        // Reserva el envío marcando confirmation_email_sent_at solo si estaba vacío;
        // si otra petición ya lo marcó, no se devuelve fila y no se reenvía el correo.
        const { data: claimed, error: claimError } = await supabaseServer
            .from("orders")
            .update({ confirmation_email_sent_at: new Date().toISOString() })
            .eq("invoice_id", invoiceId)
            .is("confirmation_email_sent_at", null)
            .select("invoice_id, buyer_name, buyer_email, items, subtotal, shipping, total, address, apartment, city, department");

        if (claimError) {
            console.error("❌ Supabase error marcando el correo:", claimError);
            return NextResponse.json({ ok: true, status, invoiceId });
        }

        const order = claimed?.[0];
        if (!order) {
            console.log(`ℹ️ Correo de confirmación ya enviado para ${invoiceId}`);
        } else if (!order.buyer_email) {
            console.warn(`⚠️ La orden ${invoiceId} no tiene buyer_email`);
        } else {
            try {
                const email = buildOrderConfirmationEmail({
                    invoiceId: order.invoice_id,
                    buyerName: order.buyer_name,
                    items: order.items ?? [],
                    subtotal: order.subtotal,
                    shipping: order.shipping,
                    total: order.total,
                    address: order.address,
                    apartment: order.apartment,
                    city: order.city,
                    department: order.department,
                });

                await sendMail({
                    to: order.buyer_email,
                    bcc: process.env.ORDERS_NOTIFY_EMAIL || undefined,
                    ...email,
                });

                console.log(`📧 Correo de confirmación enviado para ${invoiceId}`);
            } catch (mailError) {
                // El pago ya está registrado; un fallo de correo no debe romper la respuesta.
                // Se libera la marca para que un próximo intento pueda reenviarlo.
                console.error(`❌ Error enviando correo para ${invoiceId}:`, mailError);
                await supabaseServer
                    .from("orders")
                    .update({ confirmation_email_sent_at: null })
                    .eq("invoice_id", invoiceId);
            }
        }

        return NextResponse.json({ ok: true, status, invoiceId });
    } catch (e) {
        console.error("⚠️ Error en /api/orders/confirm:", e);
        return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
    }
}
