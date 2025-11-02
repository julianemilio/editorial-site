import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { OrderPayload } from "@/types/order";

export async function POST(request: Request) {
    try {
        const data: OrderPayload = await request.json();

        const { error } = await supabase.from("orders").insert([
            {
                invoice_id: data.invoiceId,
                buyer_name: data.buyerName,
                buyer_email: data.buyerEmail,
                buyer_phone: data.buyerPhone,
                country: data.country,
                department: data.department,
                city: data.city,
                address: data.address,
                apartment: data.apartment,
                postal_code: data.postalCode,
                notes: data.notes,
                subscribe: data.subscribe,
                items: data.items,
                subtotal: data.subtotal,
                shipping: data.shipping,
                total: data.total,
            },
        ]);

        if (error) {
            console.error("❌ Error Supabase:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log(`🧾 Pedido ${data.invoiceId} guardado en Supabase`);
        return NextResponse.json({ message: "Pedido guardado exitosamente" });
    } catch (err) {
        console.error("❌ Error general:", err);
        return NextResponse.json({ error: "Error al guardar el pedido" }, { status: 500 });
    }
}
