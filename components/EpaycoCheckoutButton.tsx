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
}

export default function EpaycoCheckoutButton({
  title,
  description,
  amount,
  invoiceId,
  buyerName,
  buyerEmail,
  buyerPhone,
}: Props) {
  const handlePayment = () => {
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

  console.log("");

  return (
    <>
      <Script src="https://checkout.epayco.co/checkout.js" strategy="afterInteractive" />
      <button
        onClick={handlePayment}
        className="mt-4 bg-brand-black text-brand-blue px-6 py-2 rounded-xl hover:opacity-90 font-semibold">
        PAGAR CON EPAYCO
      </button>
    </>
  );
}
