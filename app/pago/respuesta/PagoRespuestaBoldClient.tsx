"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function PagoRespuestaBoldClient() {
  const params = useSearchParams();
  const status = params.get("bold-tx-status");
  const reference = params.get("bold-order-id");
  const { clearCart } = useCart();
  const [estado, setEstado] = useState<"APPROVED" | "REJECTED" | "PENDING">("PENDING");
  const [updated, setUpdated] = useState(false); // 👈 evita bucles de actualización

  useEffect(() => {
    if (!reference || !status || updated) return; // ✅ evita múltiples ejecuciones

    const normalized =
      status.toLowerCase() === "approved"
        ? "APPROVED"
        : status.toLowerCase() === "rejected"
        ? "REJECTED"
        : "PENDING";

    setEstado(normalized);

    const updateOrder = async () => {
      try {
        const res = await fetch("/api/orders/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invoiceId: reference,
            status: normalized,
            gateway: "bold",
          }),
        });

        if (!res.ok) {
          console.error("❌ Error al actualizar Supabase:", await res.text());
          return;
        }

        console.log("✅ Orden actualizada en Supabase");

        if (normalized === "APPROVED") {
          clearCart();
        }

        setUpdated(true); // ✅ asegura que no se repita
      } catch (err) {
        console.error("⚠️ Error enviando confirmación:", err);
      }
    };

    updateOrder();
  }, [reference, status, updated, clearCart]);

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

      <Link
        href="/"
        className="mt-8 bg-[#171717] text-white! px-6 py-2 rounded-md hover:bg-black transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
