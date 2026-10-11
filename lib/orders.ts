// lib/orders.ts
// Lógica compartida entre /api/orders/confirm y el webhook de Bold.
import { supabaseServer } from "@/lib/supabaseServer";
import { sendMail } from "@/lib/mailer";
import { buildOrderConfirmationEmail } from "@/lib/emails/orderConfirmation";

export type OrderStatus = "APPROVED" | "REJECTED" | "PENDING";

/** Actualiza el estado de la orden. Devuelve false si Supabase falla. */
export async function updateOrderStatus(invoiceId: string, status: OrderStatus, gateway: string) {
    const { error } = await supabaseServer
        .from("orders")
        .update({ status, gateway })
        .eq("invoice_id", invoiceId);

    if (error) {
        console.error("❌ Supabase update error:", error);
        return false;
    }
    return true;
}

/**
 * Envía el correo de confirmación una sola vez por orden.
 * Reserva el envío marcando confirmation_email_sent_at solo si estaba vacío;
 * si otra petición ya lo marcó, no se devuelve fila y no se reenvía el correo.
 */
export async function sendConfirmationEmailOnce(invoiceId: string) {
    const { data: claimed, error } = await supabaseServer
        .from("orders")
        .update({ confirmation_email_sent_at: new Date().toISOString() })
        .eq("invoice_id", invoiceId)
        .is("confirmation_email_sent_at", null)
        .select("invoice_id, buyer_name, buyer_email, items, subtotal, shipping, total, address, apartment, city, department");

    if (error) {
        console.error("❌ Supabase error marcando el correo:", error);
        return;
    }

    const order = claimed?.[0];
    if (!order) {
        console.log(`ℹ️ Sin correo para ${invoiceId}: ya fue enviado o la orden no existe`);
        return;
    }
    if (!order.buyer_email) {
        console.warn(`⚠️ La orden ${invoiceId} no tiene buyer_email`);
        return;
    }

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
        // Se libera la marca para que un próximo intento pueda reenviarlo.
        console.error(`❌ Error enviando correo para ${invoiceId}:`, mailError);
        await supabaseServer
            .from("orders")
            .update({ confirmation_email_sent_at: null })
            .eq("invoice_id", invoiceId);
    }
}
