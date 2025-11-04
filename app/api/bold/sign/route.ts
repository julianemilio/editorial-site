import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const { orderId, amount, currency } = await req.json();
        if (!orderId || typeof amount !== "number" || !currency) {
            return NextResponse.json({ ok: false, error: "orderId/amount/currency requeridos" }, { status: 400 });
        }
        const secret = process.env.BOLD_SECRET_KEY;
        if (!secret) {
            return NextResponse.json({ ok: false, error: "Falta BOLD_SECRET_KEY" }, { status: 500 });
        }

        const raw = `${orderId}${Math.round(amount)}${currency}${secret}`;
        const integrity = crypto.createHash("sha256").update(raw).digest("hex");
        return NextResponse.json({ ok: true, integrity });
    } catch (e) {
        return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
    }
}
