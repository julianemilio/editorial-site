import { Suspense } from "react";
import PagoRespuestaClient from "./PagoRespuestaClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="bg-white text-[#171717] min-h-screen flex items-center justify-center text-center">
          <div className="animate-pulse">
            <img
              src="/coneja-logo.jpg"
              alt="Coneja Editorial"
              className="mx-auto mb-4 w-24 h-24 object-contain"
            />
            <h1 className="text-2xl font-semibold mb-2">Cargando...</h1>
            <p className="text-gray-600">Por favor espera un momento</p>
          </div>
        </main>
      }
    >
      <PagoRespuestaClient />
    </Suspense>
  );
}
