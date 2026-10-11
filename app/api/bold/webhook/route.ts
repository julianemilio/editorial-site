import { NextRequest, NextResponse, after } from "next/server";
import crypto from "crypto";
import { OrderStatus, sendConfirmationEmailOnce, updateOrderStatus } from "@/lib/orders";

// Docs: https://developers.bold.co/webhook

interface BoldWebhookEvent {
    id: string;
    type: "SALE_APPROVED" | "SALE_REJECTED" | "VOID_APPROVED" | "VOID_REJECTED";
    subject: string;
    data: {
        payment_id: string;
        metadata?: { reference?: string | null };
    };
}

const EVENT_STATUS: Partial<Record<BoldWebhookEvent["type"], OrderStatus>> = {
    SALE_APPROVED: "APPROVED",
    SALE_REJECTED: "REJECTED",
    VOID_APPROVED: "REJECTED",
};

/**
 * Bold firma el cuerpo así: HMAC-SHA256(base64(body), llave secreta) en hex.
 * En sandbox la llave es un string vacío.
 */
function isValidSignature(rawBody: string, signature: string | null) {
    if (!signature) return false;

    const secret = process.env.BOLD_ENVIRONMENT === "production" ? process.env.BOLD_SECRET_KEY : "";
    if (secret === undefined) {
        console.error("❌ Falta BOLD_SECRET_KEY para validar el webhook");
        return false;
    }

    const encoded = Buffer.from(rawBody, "utf8").toString("base64");
    const expected = crypto.createHmac("sha256", secret).update(encoded).digest("hex");

    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
    const rawBody = await req.text();

    if (!isValidSignature(rawBody, req.headers.get("x-bold-signature"))) {
        console.warn("⚠️ Webhook de Bold con firma inválida");
        return NextResponse.json({ ok: false, error: "Firma inválida" }, { status: 400 });
    }

    let event: BoldWebhookEvent;
    try {
        event = JSON.parse(rawBody);
    } catch {
        return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
    }

    // En el botón de pagos, metadata.reference es el order-id que enviamos (invoice_id).
    const invoiceId = event.data?.metadata?.reference;
    const status = EVENT_STATUS[event.type];

    console.log(`🔔 Webhook Bold ${event.type} para ${invoiceId ?? "(sin referencia)"} (${event.data?.payment_id})`);

    // Eventos sin orden asociada o que no cambian el estado: se confirman para que Bold no reintente.
    if (!invoiceId || !status) {
        return NextResponse.json({ ok: true });
    }

    // Si Supabase falla respondemos 500 para que Bold reintente más tarde.
    if (!(await updateOrderStatus(invoiceId, status, "bold"))) {
        return NextResponse.json({ ok: false }, { status: 500 });
    }

    // Bold espera respuesta en menos de 2 s; el correo se envía después de responder.
    if (status === "APPROVED") {
        after(() => sendConfirmationEmailOnce(invoiceId));
    }

    return NextResponse.json({ ok: true });
}
