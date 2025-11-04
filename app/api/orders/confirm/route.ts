import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// body: { reference: string; status: "APPROVED" | "REJECTED" | "PENDING"; amount?: number; gateway: "epayco" | "bold" }
export async function POST(req: NextRequest) {
    try {
        const { reference, status, amount, gateway } = await req.json();

        if (!reference || !status || !gateway) {
            return NextResponse.json({ ok: false, error: "reference/status/gateway requeridos" }, { status: 400 });
        }

        const { error } = await supabase
            .from("orders")
            .update({
                status,
                paid_amount: typeof amount === "number" ? Math.round(amount) : null,
                gateway,
                updated_at: new Date().toISOString(),
            })
            .eq("reference", reference);

        if (error) {
            console.error("❌ Supabase update error:", error);
            return NextResponse.json({ ok: false, error }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("⚠️ orders/confirm:", e);
        return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
    }
}
