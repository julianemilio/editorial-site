"use client";
import Script from "next/script";
import { CONFIG } from "@/lib/config";

interface Props {
  title: string;
  description: string;
  amount: number;
  invoiceId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  beforePayment?: () => Promise<boolean>;
  
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
}: Props) {
  const handlePayment = async () => {
    // Guardar pedido en Supabase antes de abrir ePayco
    const ok = beforePayment ? await beforePayment() : true;
    if (!ok) return;

    const handler = window.ePayco.checkout.configure({
      key: CONFIG.epayco.publicKey,
      test: CONFIG.epayco.testMode,
    });

    handler.open({
      name: title,
      description: description,
      invoice: invoiceId,
      currency: "COP",
      amount: amount.toString(),
      tax_base: "0",
      tax: "0",
      country: "co",
      lang: "es",
      external: "false",
      response: `${CONFIG.domain}/pago/respuesta`,
      confirmation: `${CONFIG.domain}/api/payment/confirm`,
      name_billing: buyerName,
      email_billing: buyerEmail,
      mobilephone_billing: buyerPhone,
    });
  };

  return (
    <>
      <Script src="https://checkout.epayco.co/checkout.js" strategy="afterInteractive" />
      <button
        onClick={handlePayment}
        className="w-full bg-[#171717] text-white py-3 rounded-md font-semibold hover:bg-[#0B0B0C] transition"
      >
        PAGAR CON  EPAYCO
      </button>
    </>
  );
}
