export default function PagoRespuesta({ searchParams }) {
  const estado = searchParams.x_response;
  const referencia = searchParams.x_ref_payco;

  return (
    <div className="min-h-screen flex flex-col items-center  text-center p-8">
      {estado === "Aceptada" ? (
        <>
          <h1 className="text-4xl font-bold text-green-600">
            ¡Pago exitoso! 🎉
          </h1>
          <p className="mt-4 text-lg">
            Tu compra ha sido procesada correctamente.<br />
            Ref: {referencia}
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-red-600">
            Pago no completado ❌
          </h1>
          <p className="mt-4 text-lg">
            Por favor intenta nuevamente o verifica tus datos.
          </p>
        </>
      )}
    </div>
  );
}