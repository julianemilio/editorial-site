"use client";

import { useState } from "react";
import { CartItem, OrderPayload, BillingFormData } from "@/types/order";
import { formatCOP } from "@/lib/format";
import PaymentButton from "@/components/PaymentButton";
import { CONFIG } from "@/lib/config";

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
  const [loading, setLoading] = useState(false);

  const handleBeforePayment = async (): Promise<{
    ok: boolean;
    invoiceId?: string;
    integrity?: string;
  }> => {
    try {
      setLoading(true);

      // ✅ Generar invoiceId único para esta transacción
      const newInvoiceId = `INV-${Date.now()}`;

      const payload: OrderPayload = {
        ...billingData,
        invoiceId: newInvoiceId,
        buyerName,
        buyerEmail,
        buyerPhone,
        items,
        subtotal: total,
        shipping,
        total: totalWithShipping,
      };

      // 🧾 Guardar pedido en Supabase
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al guardar el pedido");

      console.log("🧾 Pedido guardado con:", newInvoiceId);

      let integrityValue: string | undefined;

      // 🔐 Generar firma si el proveedor es Bold
      if (CONFIG.paymentProvider === "bold" && totalWithShipping > 0) {
        const res = await fetch("/api/bold/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: newInvoiceId,
            amount: Math.round(totalWithShipping),
            currency: "COP",
          }),
        });

        const data = await res.json();

        if (data?.ok && data?.integrity) {
          integrityValue = data.integrity;
        } else {
          console.error("❌ Error generando firma Bold:", data);
          alert("No se pudo generar la firma para Bold Checkout");
          return { ok: false };
        }
      }

      console.log("✅ Firma Bold generada:", integrityValue);
      return { ok: true, invoiceId: newInvoiceId, integrity: integrityValue };
    } catch (err) {
      console.error("❌ Error en beforePayment:", err);
      alert("No se pudo preparar el pago.");
      return { ok: false };
    } finally {
      setLoading(false);
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
          <PaymentButton
            invoiceId="temp"
            title="Compra Coneja Editorial"
            description="Pago de libros Coneja Editorial"
            amount={totalWithShipping}
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

      {loading && (
        <p className="text-center text-sm text-gray-500 mt-3 animate-pulse">
          Guardando pedido...
        </p>
      )}
    </div>
  );
}
