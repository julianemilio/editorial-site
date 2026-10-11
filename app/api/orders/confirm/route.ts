import { NextRequest, NextResponse } from "next/server";
import { getBoldPaymentVoucher, toOrderStatus } from "@/lib/bold";
import { sendConfirmationEmailOnce, updateOrderStatus } from "@/lib/orders";

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
 * El webhook de Bold (/api/bold/webhook) cubre el caso en que el cliente cierra la ventana.
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

        if (!(await updateOrderStatus(invoiceId, status, gateway))) {
            return NextResponse.json({ ok: false, error: "Error actualizando la orden" }, { status: 500 });
        }

        if (status === "APPROVED") {
            await sendConfirmationEmailOnce(invoiceId);
        }

        return NextResponse.json({ ok: true, status, invoiceId });
    } catch (e) {
        console.error("⚠️ Error en /api/orders/confirm:", e);
        return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
    }
}
