"use client";
import { useState } from "react";

interface EpaycoCheckoutButtonProps {
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
  }>;
}

export default function EpaycoCheckoutButton({
  title,
  description,
  amount,
  invoiceId,
  buyerName,
  buyerEmail,
  buyerPhone,
  beforePayment,
}: EpaycoCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleEpaycoPayment = async () => {
    try {
      setLoading(true);

      const result = beforePayment
        ? await beforePayment()
        : { ok: true, invoiceId };

      if (!result.ok || !result.invoiceId) {
        console.warn("❌ Error en beforePayment o sin invoiceId");
        return;
      }

      const ref = result.invoiceId;

      console.log("🚀 Iniciando ePayco con referencia:", ref);

      // @ts-ignore
      const handler = window.ePayco.checkout.configure({
        key: process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY || "",
        test: process.env.NEXT_PUBLIC_EPAYCO_TEST === "true",
      });

      handler.open({
        name: title,
        description,
        invoice: ref,
        currency: "COP",
        amount,
        tax_base: "0",
        tax: "0",
        country: "CO",
        lang: "es",
        external: "false",
        response: `${process.env.NEXT_PUBLIC_SITE_URL}/pago/respuesta`,
        confirmation: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/confirm`,
        name_billing: buyerName,
        email_billing: buyerEmail,
        mobilephone_billing: buyerPhone,
      });
    } catch (err) {
      console.error("❌ Error iniciando ePayco:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEpaycoPayment}
      disabled={loading}
      className="w-full bg-yellow-500 text-black py-3 rounded-md font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
    >
      {loading ? "Procesando..." : "Pagar con ePayco"}
    </button>
  );
}
