"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";

interface Props {
  title: string;
  description: string;
  amount: number; // COP
  invoiceId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  beforePayment?: () => Promise<boolean>;
}

declare global {
  interface Window {
    BoldCheckout?: any;
  }
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
}: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [checkout, setCheckout] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ 1. Cargar el script de Bold dinámicamente (solo una vez)
  useEffect(() => {
    if (document.querySelector('script[src="https://checkout.bold.co/library/boldPaymentButton.js"]')) {
      setScriptLoaded(true);
      return;
    }

    const js = document.createElement("script");
    js.src = "https://checkout.bold.co/library/boldPaymentButton.js";
    js.async = true;

    js.onload = () => {
      console.log("✅ Script Bold cargado");
      window.dispatchEvent(new Event("boldCheckoutLoaded"));
      setScriptLoaded(true);
    };

    js.onerror = () => {
      console.error("❌ Error al cargar script Bold");
      window.dispatchEvent(new Event("boldCheckoutLoadFailed"));
      setScriptLoaded(false);
    };

    document.head.appendChild(js);
  }, []);

  // ✅ 2. Crear instancia BoldCheckout cuando el script esté listo
  useEffect(() => {
    if (!scriptLoaded) return;

    const initCheckout = async () => {
      // 🧾 Generar firma SHA256 desde tu backend
      const res = await fetch("/api/bold/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: invoiceId,
          amount: Math.round(amount),
          currency: "COP",
        }),
      });

      const data = await res.json();
      if (!data?.ok || !data?.integrity) {
        console.error("❌ No se pudo generar la firma de integridad Bold");
        return;
      }

      // 🏗️ Crear instancia de venta
      const checkoutInstance = new window.BoldCheckout({
        orderId: invoiceId,
        currency: "COP",
        amount: Math.round(amount).toString(),
        apiKey: CONFIG.bold.publicKey,
        integritySignature: data.integrity,
        description: description || title,
        redirectionUrl: `${CONFIG.domain}/pago/respuesta?reference=${invoiceId}`,
        customer: {
          email: buyerEmail,
          fullName: buyerName,
          phone: buyerPhone,
        },
      });

      console.log("🧠 BoldCheckout inicializado:", checkoutInstance);
      setCheckout(checkoutInstance);
    };

    initCheckout();
  }, [scriptLoaded, invoiceId, amount, buyerEmail, buyerName, buyerPhone, title, description]);

  // ✅ 3. Abrir checkout al hacer clic en tu botón personalizado
  const handlePay = async () => {
    if (!checkout) {
      alert("El checkout de Bold aún no está listo. Espera un momento.");
      return;
    }

    const ok = beforePayment ? await beforePayment() : true;
    if (!ok) return;

    try {
      setLoading(true);
      console.log("💳 Abriendo pasarela Bold...");
      checkout.open(); // método oficial
    } catch (e) {
      console.error("❌ Error al abrir checkout Bold:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={!checkout || loading}
      className="w-full bg-[#171717] text-white py-3 rounded-md font-semibold hover:bg-[#0B0B0C] transition disabled:opacity-50"
    >
      {loading ? "Procesando..." : "PAGAR CON BOLD"}
    </button>
  );
}
