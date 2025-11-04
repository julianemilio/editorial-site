"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

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

export default function PagoRespuestaEpaycoClient() {
  const params = useSearchParams();
  const refPayco = params.get("ref_payco");
  const { clearCart } = useCart();

  const [estado, setEstado] = useState<"APPROVED" | "REJECTED" | "PENDING" | "ERROR">("PENDING");
  const [monto, setMonto] = useState<string>("—");
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false); // 👈 evita bucles

  useEffect(() => {
    if (!refPayco || updated) return; // ✅ evita múltiples ejecuciones

    const validarPago = async () => {
      try {
        const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${refPayco}`);
        const data: EpaycoResponse = await response.json();

        if (!data.success || !data.data) {
          console.warn("⚠️ Respuesta inválida de ePayco:", data);
          setEstado("ERROR");
          return;
        }

        const estadoResp = data.data.x_response.toLowerCase();
        const normalized =
          estadoResp === "aceptada"
            ? "APPROVED"
            : estadoResp === "rechazada"
            ? "REJECTED"
            : "PENDING";

        setEstado(normalized);
        setMonto(data.data.x_amount);

        // 🔄 Actualiza estado en Supabase
        const res = await fetch("/api/orders/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invoiceId: refPayco,
            status: normalized,
            amount: Number(data.data.x_amount),
            gateway: "epayco",
          }),
        });

        if (!res.ok) {
          console.error("❌ Error al actualizar Supabase:", await res.text());
        } else {
          console.log("✅ Orden actualizada en Supabase");
        }

        if (normalized === "APPROVED") clearCart();
        setUpdated(true); // ✅ asegura que no se repita
      } catch (e) {
        console.error("❌ Error validando ePayco:", e);
        setEstado("ERROR");
      } finally {
        setLoading(false);
      }
    };

    validarPago();
  }, [refPayco, updated, clearCart]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen text-center bg-white text-[#171717]">
        <div>
          <Image src="/coneja-logo.jpg" alt="Logo" width={100} height={100} className="mx-auto mb-4" />
          <p className="text-lg animate-pulse">Validando tu pago con ePayco...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-white text-[#171717]">
      <Image src="/coneja-logo.jpg" alt="Logo" width={100} height={100} className="mb-4" />

      {estado === "APPROVED" && (
        <>
          <h1 className="text-3xl text-green-600 font-bold mb-2">¡Pago aprobado!</h1>
          <p className="text-gray-700 mb-4">Tu compra fue procesada exitosamente.</p>
          <p className="text-gray-500">Monto: ${monto}</p>
        </>
      )}

      {estado === "REJECTED" && (
        <>
          <h1 className="text-3xl text-red-600 font-bold mb-2">Pago rechazado</h1>
          <p className="text-gray-700">Tu pago no fue procesado correctamente.</p>
        </>
      )}

      {estado === "PENDING" && (
        <>
          <h1 className="text-3xl text-yellow-600 font-bold mb-2">Pago pendiente</h1>
          <p className="text-gray-700">Esperando confirmación del banco.</p>
        </>
      )}

      {estado === "ERROR" && (
        <>
          <h1 className="text-3xl text-gray-600 font-bold mb-2">Error al validar pago</h1>
          <p className="text-gray-700">No fue posible confirmar el estado del pago.</p>
        </>
      )}

      <Link
        href="/"
        className="mt-8 bg-[#171717] text-white! px-6 py-2 rounded-md hover:bg-black transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
