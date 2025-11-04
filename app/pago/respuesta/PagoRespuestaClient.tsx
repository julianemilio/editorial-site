"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface EpaycoResponse {
  success: boolean;
  data?: {
    x_response: string;
    x_amount: string;
    x_currency_code: string;
    x_transaction_id: string;
    x_description: string;
  };
}

export default function PagoRespuestaClient() {
  const params = useSearchParams();
  const refPayco = params.get("ref_payco");
  const boldStatus = params.get("bold-tx-status"); // ✅ actualizado
  const boldOrderId = params.get("bold-order-id");
  const reference = params.get("reference");

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [estado, setEstado] = useState<string | null>(null);
  const [monto, setMonto] = useState<string>("—");
  const [moneda, setMoneda] = useState<string>("COP");
  const [cartCleared, setCartCleared] = useState(false);

  // 🔍 Validar pago según origen
  useEffect(() => {
    const fetchPago = async () => {
      try {
        if (refPayco) {
          // 🟣 ePayco
          const response = await fetch(
            `https://secure.epayco.co/validation/v1/reference/${refPayco}`
          );
          const data: EpaycoResponse = await response.json();

          if (data.success && data.data) {
            setEstado(data.data.x_response);
            setMonto(data.data.x_amount);
            setMoneda(data.data.x_currency_code);

            // 🧾 Actualiza orden ePayco en Supabase
            await supabase
              .from("orders")
              .update({
                status: data.data.x_response.toUpperCase(),
                paid_amount: Number(data.data.x_amount),
                gateway: "epayco",
                updated_at: new Date().toISOString(),
              })
              .eq("reference", refPayco);
          } else {
            setEstado("Error");
          }
        } else if (boldStatus || boldOrderId || reference) {
          // 🟢 Bold
          const status = boldStatus?.toUpperCase() || "PENDING";
          let estadoTexto = "Pendiente";
          if (status === "APPROVED") estadoTexto = "Aceptada";
          else if (status === "REJECTED") estadoTexto = "Rechazada";

          setEstado(estadoTexto);
          setMonto("—");

          // ✅ Actualiza estado en Supabase
          if (reference) {
            await supabase
              .from("orders")
              .update({
                status: estadoTexto.toUpperCase(),
                gateway: "bold",
                updated_at: new Date().toISOString(),
              })
              .eq("reference", reference);
          }
        } else {
          setEstado("Error");
        }
      } catch (error) {
        console.error("Error validando pago:", error);
        setEstado("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchPago();
  }, [refPayco, boldStatus, boldOrderId, reference]);

  // 🧹 Limpiar carrito si el pago fue aprobado
  useEffect(() => {
    if (estado?.toLowerCase() === "aceptada" && !cartCleared) {
      clearCart();
      setCartCleared(true);
    }
  }, [estado, clearCart, cartCleared]);

  const baseClasses = "bg-white text-[#171717] min-h-screen";

  if (loading) {
    return (
      <main className={baseClasses}>
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="animate-pulse">
            <Image
              src="/coneja-logo.jpg"
              alt="Coneja Editorial"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-semibold mb-2">Procesando pago...</h1>
            <p className="text-gray-600">Por favor espera un momento</p>
          </div>
        </section>
      </main>
    );
  }

  const esAprobado = estado?.toLowerCase() === "aceptada";
  const esRechazado = estado?.toLowerCase() === "rechazada";
  const esPendiente = estado?.toLowerCase() === "pendiente";

  return (
    <main className={baseClasses}>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        {esAprobado && (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              ¡Pago aprobado!
            </h1>
            <p className="text-lg mb-2">
              Tu transacción fue procesada exitosamente.
            </p>
            <p className="text-gray-700 mb-4">
              Referencia: <strong>{reference}</strong>
            </p>
          </>
        )}

        {esRechazado && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Pago rechazado
            </h1>
            <p className="text-lg mb-2">Tu pago no pudo ser procesado.</p>
          </>
        )}

        {esPendiente && (
          <>
            <h1 className="text-3xl font-bold text-yellow-600 mb-4">
              Pago pendiente
            </h1>
            <p className="text-lg mb-2">
              Esperando confirmación de tu banco.
            </p>
          </>
        )}

        {!esAprobado && !esRechazado && !esPendiente && (
          <>
            <h1 className="text-3xl font-bold text-gray-700 mb-4">
              Estado desconocido
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              No pudimos obtener la información del pago. Si realizaste la
              transacción, escríbenos para ayudarte.
            </p>
          </>
        )}

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/"
            className="bg-[#171717] text-white! px-6 py-2 rounded-full hover:bg-[#0B0B0C] transition"
          >
            Volver al inicio
          </Link>
          <Link
            href="/libros"
            className="border border-[#171717] text-[#171717] px-6 py-2 rounded-full hover:bg-[#171717] hover:text-white transition"
          >
            Ver más libros
          </Link>
        </div>
      </section>
    </main>
  );
}
