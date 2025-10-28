export default function ContactoPage() {
  return (
    <main className="bg-white text-[#171717] min-h-screen">
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        {/* Título principal */}
        <h1 className="text-5xl font-extrabold mb-8">CONTACTO</h1>

        {/* Introducción */}
        <p className="text-lg text-[#444] leading-relaxed mb-6">
          En <strong>Coneja, libros ilustrados</strong> creemos en la comunicación directa y cercana.  
          Si tienes un proyecto editorial, una colaboración en mente o simplemente quieres saber más sobre nuestro trabajo,  
          estaremos felices de leerte.
        </p>

        {/* Datos de contacto */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* Correo */}
          <a
            href="mailto:contacto@conejalibrosilustrados.com"
            className="inline-flex items-center rounded-full border border-[#171717] px-8 py-3 text-base font-semibold text-[#171717] hover:bg-[#171717] hover:text-white transition"
          >
            contacto@conejalibrosilustrados.com
          </a>

          {/* Whatsapp */}
          <a
            href="https://wa.me/573160926424"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-[#171717] px-8 py-3 text-base font-semibold text-[#171717] hover:bg-[#171717] hover:text-white transition"
          >
            Whatsapp +57 316 092 6424
          </a>
        </div>

        {/* Separador visual */}
        <hr className="my-16 border-gray-200" />

        {/* Texto final */}
        <div className="text-lg text-[#444] max-w-2xl mx-auto leading-relaxed space-y-4">
          <p>
            También puedes seguirnos en redes sociales para conocer nuestras próximas publicaciones, 
            talleres y novedades del mundo de los libros ilustrados.
          </p>
          <p className="italic text-[#555]">
            Porque los libros también son encuentros: entre palabra e imagen, entre quienes los crean y quienes los leen.
          </p>
        </div>

        {/* Redes (opcional) */}
        <div className="mt-10 flex justify-center gap-6">
          <a
            href="https://instagram.com/conejalibros"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#171717] hover:text-black underline text-base font-medium"
          >
            @conejalibros
          </a>
        </div>
      </section>
    </main>
  );
}
