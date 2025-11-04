import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Recibe:
 * {
 *   invoiceId: string;
 *   status: "APPROVED" | "REJECTED" | "PENDING";
 *   amount?: number;
 *   gateway: "epayco" | "bold";
 * }
 */
export async function POST(req: NextRequest) {
    try {
        const { invoiceId, status, amount, gateway } = await req.json();

        if (!invoiceId || !status || !gateway) {
            return NextResponse.json(
                { ok: false, error: "invoiceId, status y gateway son requeridos" },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from("orders")
            .update({
                status: status.toUpperCase(),
                gateway,
            })
            .eq("invoice_id", invoiceId);

        if (error) {
            console.error("❌ Supabase update error:", error);
            return NextResponse.json({ ok: false, error }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("⚠️ Error en /api/orders/confirm:", e);
        return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
    }
}
