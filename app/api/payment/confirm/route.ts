import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    const data = await req.formData();

    const x_ref_payco = data.get("x_ref_payco") as string;
    const x_transaction_id = data.get("x_transaction_id") as string;
    const x_amount = data.get("x_amount") as string;
    const x_currency_code = data.get("x_currency_code") as string;
    const x_signature = data.get("x_signature") as string;
    const x_response = data.get("x_response") as string;
    const x_id_invoice = data.get("x_id_invoice") as string;

    // Validar la firma
    const signature = crypto
        .createHash("sha256")
        .update(
            `${process.env.EPAYCO_P_CUST_ID_CLIENTE}^${process.env.EPAYCO_P_KEY}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`
        )
        .digest("hex");

    if (signature !== x_signature) {
        return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    // Procesar resultado
    if (x_response === "Aceptada") {
        console.log("✅ Pago aprobado:", x_id_invoice);
    } else {
        console.log("⚠️ Pago rechazado:", x_response);
    }

    return NextResponse.json({ ok: true });
}
