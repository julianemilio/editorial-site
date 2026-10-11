"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Estado = "APPROVED" | "REJECTED" | "PENDING";

// Bold puede tardar unos segundos en registrar la transacción.
const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 4000;

export default function PagoRespuestaBoldClient() {
  const params = useSearchParams();
  const reference = params.get("bold-order-id");
  const { clearCart } = useCart();
  const [estado, setEstado] = useState<Estado>("PENDING");
  // clearCart cambia en cada render; se guarda en un ref para no re-disparar el efecto.
  const clearCartRef = useRef(clearCart);
  useEffect(() => {
    clearCartRef.current = clearCart;
  });

  useEffect(() => {
    if (!reference) return;

    let cancelled = false;

    const confirmOrder = async (attempt: number) => {
      try {
        const res = await fetch("/api/orders/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invoiceId: reference, gateway: "bold" }),
        });

        const data = await res.json().catch(() => null);
        if (cancelled) return;

        if (res.ok && data?.status) {
          setEstado(data.status);

          if (data.status === "APPROVED") {
            clearCartRef.current();
            return;
          }
          if (data.status === "REJECTED") return;
        } else {
          console.error("❌ Error confirmando la orden:", data);
        }
      } catch (err) {
        console.error("⚠️ Error enviando confirmación:", err);
      }

      if (!cancelled && attempt < MAX_ATTEMPTS) {
        setTimeout(() => confirmOrder(attempt + 1), RETRY_DELAY_MS);
      }
    };

    confirmOrder(1);

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-white text-[#171717]">
      <Image
        src="/coneja-logo.jpg"
        alt="Logo Coneja Editorial"
        width={100}
        height={100}
        className="mb-4"
      />

      {estado === "APPROVED" && (
        <>
          <h1 className="text-3xl text-green-600 font-bold mb-2">¡Pago aprobado!</h1>
          <p>Tu compra fue procesada exitosamente.</p>
          <p className="mt-2 text-sm text-gray-600">
            Te enviamos un correo de confirmación con los detalles de tu pedido.
          </p>
        </>
      )}

      {estado === "REJECTED" && (
        <>
          <h1 className="text-3xl text-red-600 font-bold mb-2">Pago rechazado</h1>
          <p>Tu pago no fue procesado correctamente.</p>
        </>
      )}

      {estado === "PENDING" && (
        <>
          <h1 className="text-3xl text-yellow-600 font-bold mb-2">Pago pendiente</h1>
          <p>Esperando confirmación de tu banco.</p>
        </>
      )}

      {reference && (
        <div className="mt-6 rounded-md bg-gray-100 px-6 py-3">
          <p className="text-sm text-gray-600">Número de pedido</p>
          <p className="text-lg font-semibold tracking-wide">{reference}</p>
        </div>
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
