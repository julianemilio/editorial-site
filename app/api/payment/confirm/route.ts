// /app/api/payment/confirm/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { buildEpaycoSignature, timingSafeEqualHex } from "@/lib/epayco";

export async function POST(request: Request) {
    try {
        // ePayco envía application/x-www-form-urlencoded
        const form = await request.formData();

        const x_invoice = (form.get("x_invoice") as string | null)?.trim() ?? null;
        const x_response = (form.get("x_response") as string | null)?.trim() ?? null;
        const x_transaction_id = (form.get("x_transaction_id") as string | null)?.trim() ?? null;
        const x_ref_payco = (form.get("x_ref_payco") as string | null)?.trim() ?? null;
        const x_currency_code = (form.get("x_currency_code") as string | null)?.trim() ?? null;
        const x_amount = (form.get("x_amount") as string | null)?.trim() ?? null; // OJO: string exacto
        const x_signature = (form.get("x_signature") as string | null)?.trim() ?? null;

        if (!x_invoice || !x_response || !x_transaction_id || !x_ref_payco || !x_currency_code || !x_amount || !x_signature) {
            return NextResponse.json({ error: "Parámetros incompletos" }, { status: 400 });
        }

        // 1) Validar firma
        const expected = buildEpaycoSignature({
            refPayco: x_ref_payco,
            transactionId: x_transaction_id,
            amount: x_amount,              // usar EXACTAMENTE lo que llega en el callback
            currency: x_currency_code,
        });

        const okSignature = timingSafeEqualHex(expected, x_signature);
        if (!okSignature) {
            // No revelar expected en logs de producción
            console.error("Firma inválida para invoice:", x_invoice);
            return NextResponse.json({ error: "Firma inválida" }, { status: 403 });
        }

        // 2) Traer el pedido por invoice
        const { data: orderRows, error: fetchErr } = await supabase
            .from("orders")
            .select("id,total,status")
            .eq("invoice_id", x_invoice)
            .limit(1);

        if (fetchErr) {
            console.error("Supabase fetch error:", fetchErr);
            return NextResponse.json({ error: "Error consultando pedido" }, { status: 500 });
        }
        const order = orderRows?.[0];
        if (!order) {
            return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
        }

        // 3) (Opcional recomendado) Validar monto reportado vs total registrado
        // x_amount llega como string; compara con tu total numérico
        const reported = Number(x_amount);
        const expectedTotal = Number(order.total);
        // Si tus totales pueden tener decimales, usa toFixed(2) en ambos o una tolerancia.
        if (!Number.isNaN(reported) && !Number.isNaN(expectedTotal) && reported !== expectedTotal) {
            console.error(`Monto no coincide. Esperado=${expectedTotal} | Reportado=${reported}`);
            // No actualizamos a 'paid' si el monto no coincide
            return NextResponse.json({ error: "Monto no coincide" }, { status: 422 });
        }

        // Mapear estado ePayco → estado interno
        const status =
            x_response.toLowerCase() === "aceptada"
                ? "paid"
                : x_response.toLowerCase() === "rechazada"
                    ? "rejected"
                    : "pending";

        // 4) Actualizar pedido
        const { error: updateErr } = await supabase
            .from("orders")
            .update({
                status,
                transaction_id: x_transaction_id,
                ref_payco: x_ref_payco,
                currency: x_currency_code,
                paid_amount: reported,
                updated_at: new Date().toISOString(),
            })
            .eq("invoice_id", x_invoice);

        if (updateErr) {
            console.error("Supabase update error:", updateErr);
            return NextResponse.json({ error: "Error actualizando pedido" }, { status: 500 });
        }

        return NextResponse.json({ message: `Pedido ${x_invoice} actualizado: ${status}` });
    } catch (err) {
        console.error("Error confirmación ePayco:", err);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
