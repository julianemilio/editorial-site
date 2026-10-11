// lib/bold.ts
// Consulta server-side del estado real de una transacción en Bold.
// Docs: https://developers.bold.co/pagos-en-linea/consulta-de-transacciones

export type BoldPaymentStatus =
    | "NO_TRANSACTION_FOUND"
    | "PROCESSING"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "FAILED"
    | "VOIDED";

export interface BoldPaymentVoucher {
    payment_status: BoldPaymentStatus;
    transaction_id?: string;
    total?: number;
    payment_method?: string;
    payer_email?: string;
    transaction_date?: string;
}

/**
 * Devuelve el comprobante de Bold para la orden, o null si no se pudo consultar.
 * Usa la llave de identidad (la misma llave pública del botón), nunca la secreta.
 */
export async function getBoldPaymentVoucher(orderId: string): Promise<BoldPaymentVoucher | null> {
    const identityKey = process.env.NEXT_PUBLIC_BOLD_PUBLIC_KEY;
    if (!identityKey) {
        console.error("❌ Falta NEXT_PUBLIC_BOLD_PUBLIC_KEY para consultar Bold");
        return null;
    }

    try {
        const res = await fetch(
            `https://payments.api.bold.co/v2/payment-voucher/${encodeURIComponent(orderId)}`,
            {
                headers: { Authorization: `x-api-key ${identityKey}` },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error(`❌ Bold respondió ${res.status} para la orden ${orderId}`);
            return null;
        }

        return (await res.json()) as BoldPaymentVoucher;
    } catch (e) {
        console.error("⚠️ Error consultando Bold:", e);
        return null;
    }
}

/** Traduce el estado de Bold al estado que guardamos en la tabla orders. */
export function toOrderStatus(status: BoldPaymentStatus): "APPROVED" | "REJECTED" | "PENDING" {
    if (status === "APPROVED") return "APPROVED";
    if (status === "REJECTED" || status === "FAILED" || status === "VOIDED") return "REJECTED";
    return "PENDING";
}
