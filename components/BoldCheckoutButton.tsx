"use client";
import { CONFIG } from "@/lib/config";
import { useState } from "react";

interface BoldCheckoutButtonProps {
  title: string;
  description: string;
  amount: number;
  invoiceId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  beforePayment?: () => Promise<{
    ok: boolean;
    invoiceId?: string;
    integrity?: string;
  }>;
  integritySignature?: string;
}

export default function BoldCheckoutButton({
  title,
  description,
  amount,
  invoiceId,
  buyerName,
  buyerEmail,
  buyerPhone,
  beforePayment,
  integritySignature,
}: BoldCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleBoldPayment = async () => {
    try {
      setLoading(true);

      // 🧠 Ejecutar lógica previa (guardar pedido, generar firma, etc.)
      const result = beforePayment
        ? await beforePayment()
        : { ok: true, invoiceId, integrity: integritySignature };

      if (!result.ok || !result.invoiceId) {
        console.error("❌ No se pudo preparar el pago.");
        return;
      }

      const reference = result.invoiceId;
      const integrity = result.integrity;

      console.log("🚀 Iniciando Bold Checkout con referencia:", reference);

      // ⚡️ Crear instancia del SDK de Bold correctamente
      // @ts-ignore
      const bold = new BoldCheckout({
        orderId: reference,
        currency: "COP",
        amount: Math.round(amount).toString(),
        apiKey: CONFIG.bold.publicKey,
        integritySignature: integrity,
        description: description || title,
        redirectionUrl: `${CONFIG.domain}/pago/respuesta`,
        customer: {
          name: buyerName,
          email: buyerEmail,
          mobile: buyerPhone,
        },
        onSuccess: () => {
          console.log("✅ Pago completado con éxito:", reference);
        },
        onError: (err: any) => {
          console.error("❌ Error en Bold Checkout:", err);
        },
      });

      // 🧾 Abrir el flujo de pago
      bold.open();
    } catch (error) {
      console.error("Error general en BoldCheckoutButton:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBoldPayment}
      disabled={loading}
      className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition disabled:opacity-50"
    >
      {loading ? "Procesando..." : "Pagar con Bold"}
    </button>
  );
}
