"use client";
import { CartItem } from "@/context/CartContext";
import EpaycoCheckoutButton from "@/components/EpaycoCheckoutButton";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  shipping: number;
  isFormValid: boolean;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}

export default function OrderSummary({
  items,
  total,
  shipping,
  isFormValid,
  buyerName,
  buyerEmail,
  buyerPhone,
}: OrderSummaryProps) {
  const totalWithShipping = total + shipping;
  const invoiceId = `INV-${Date.now()}`;

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Tu pedido</h2>

      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>$ {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-sm">
        <span>Subtotal</span>
        <span>$ {total.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span>{shipping ? `$ ${shipping.toLocaleString()}` : "Por calcular"}</span>
      </div>
      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
        <span>Total</span>
        <span>$ {totalWithShipping.toLocaleString()}</span>
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
