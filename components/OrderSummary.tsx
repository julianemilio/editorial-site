"use client";
import { CartItem, OrderPayload, BillingFormData } from "@/types/order";
import { formatCOP } from "@/lib/format"
import EpaycoCheckoutButton from "@/components/EpaycoCheckoutButton";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  shipping: number;
  isFormValid: boolean;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  billingData: BillingFormData;
}

export default function OrderSummary({
  items,
  total,
  shipping,
  isFormValid,
  buyerName,
  buyerEmail,
  buyerPhone,
  billingData,
}: OrderSummaryProps) {
  const totalWithShipping = total + shipping;
  const invoiceId = `INV-${Date.now()}`;

  const handleBeforePayment = async (): Promise<boolean> => {
    const payload: OrderPayload = {
      ...billingData,
      invoiceId,
      buyerName,
      buyerEmail,
      buyerPhone,
      items,
      subtotal: total,
      shipping,
      total: totalWithShipping,
    };

    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al guardar el pedido");
      console.log("🧾 Pedido guardado en Supabase");
      return true;
    } catch (err) {
      console.error("❌ Error:", err);
      alert("No se pudo guardar el pedido. Intenta nuevamente.");
      return false;
    }
  };

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Tu pedido</h2>

      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>$ {formatCOP(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-sm">
        <span>Subtotal</span>
        <span>$ {formatCOP(total)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span>{shipping ? `$ ${formatCOP(shipping)}` : "Por calcular"}</span>
      </div>
      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
        <span>Total</span>
        <span>$ {formatCOP(totalWithShipping)}</span>
      </div>

      <div className="mt-6">
        {isFormValid ? (
          <EpaycoCheckoutButton
            title="Compra Coneja Editorial"
            description="Pago de libros Coneja Editorial"
            amount={totalWithShipping}
            invoiceId={invoiceId}
            buyerName={buyerName}
            buyerEmail={buyerEmail}
            buyerPhone={buyerPhone}
            beforePayment={handleBeforePayment}
          />
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 rounded-md font-semibold cursor-not-allowed"
          >
            Complete los datos para pagar
          </button>
        )}
      </div>
    </div>
  );
}
