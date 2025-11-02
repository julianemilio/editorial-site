"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // 🛒 Importar contexto para limpiar carrito

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

export default function PagoRespuesta() {
  const params = useSearchParams();
  const refPayco = params.get("ref_payco");
  const { clearCart } = useCart(); // 🧹 función para vaciar el carrito

  const [loading, setLoading] = useState(true);
  const [estado, setEstado] = useState<string | null>(null);
  const [monto, setMonto] = useState<string>("");
  const [moneda, setMoneda] = useState<string>("COP");
  const [cartCleared, setCartCleared] = useState(false); // Evita limpiar dos veces

  useEffect(() => {
    const fetchPago = async () => {
      if (!refPayco) return;

      try {
        const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${refPayco}`);
        const data: EpaycoResponse = await response.json();

        if (data.success && data.data) {
          setEstado(data.data.x_response);
          setMonto(data.data.x_amount);
          setMoneda(data.data.x_currency_code);
        } else {
          setEstado("Error");
        }
      } catch (error) {
        console.error("Error consultando ePayco:", error);
        setEstado("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchPago();
  }, [refPayco]);

  // 🧹 Limpiar carrito si el pago fue aceptado
  useEffect(() => {
    if (estado?.toLowerCase() === "aceptada" && !cartCleared) {
      clearCart();
      setCartCleared(true);
      console.log("🧹 Carrito limpiado tras pago exitoso");
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
            <p className="text-lg mb-2">Tu transacción fue procesada exitosamente.</p>
            <p className="text-gray-700 mb-4">
              Monto: <strong>${monto} {moneda}</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Gracias por tu compra. Te enviaremos un correo cuando tu pedido esté listo para envío.  
              Si tienes alguna duda o necesitas soporte, puedes escribirnos a{" "}
              <a
                href="mailto:contacto@conejalibrosilustrados.com"
                className="underline hover:text-black"
              >
                contacto@conejalibrosilustrados.com
              </a>.
            </p>
          </>
        )}

        {esRechazado && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Pago rechazado
            </h1>
            <p className="text-lg mb-2">Tu pago no pudo ser procesado.</p>
            <p className="text-gray-600 mb-6">
              Si el monto fue descontado, será revertido por tu banco en los próximos días.  
              Puedes intentar nuevamente o usar otro medio de pago.
            </p>
          </>
        )}

        {esPendiente && (
          <>
            <h1 className="text-3xl font-bold text-yellow-600 mb-4">
              Pago pendiente
            </h1>
            <p className="text-lg mb-2">
              Estamos esperando la confirmación de tu banco o método de pago.
            </p>
            <p className="text-gray-600 mb-6">
              Cuando se confirme el pago, recibirás un correo electrónico con la información de tu pedido y envío.
            </p>
          </>
        )}

        {!esAprobado && !esRechazado && !esPendiente && (
          <>
            <h1 className="text-3xl font-bold text-gray-700 mb-4">
              Estado desconocido
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              No pudimos obtener la información del pago.  
              Si realizaste la transacción, escríbenos para ayudarte a verificarla.
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
