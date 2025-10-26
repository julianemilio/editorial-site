export default function ServiciosPage() {
  return (
    <main className="bg-white text-[#171717] min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-16">

        {/* Introducción */}
        <p className="text-lg text-[#444] mb-12">
          Además de nuestro catálogo editorial, en Coneja ofrecemos:
        </p>

        {/* Cuadrícula de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Edición literaria */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Edición literaria</h2>
            <p className="text-[#444] leading-relaxed">
              Acompañamos a escritores y artistas desde la idea inicial hasta la publicación.
            </p>
          </div>

          {/* Diseño editorial */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Diseño editorial</h2>
            <p className="text-[#444] leading-relaxed">
              Maquetación, tipografía y dirección de arte para libros ilustrados y proyectos gráficos.
            </p>
          </div>

          {/* Asesoría literaria */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Asesoría literaria y artística</h2>
            <p className="text-[#444] leading-relaxed">
              Orientación en procesos de escritura, selección de materiales y construcción de propuestas editoriales.
            </p>
          </div>

          {/* Talleres */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Talleres y formación</h2>
            <p className="text-[#444] leading-relaxed">
              Espacios de lectura, creación e ilustración dirigidos a niños, jóvenes y adultos;
              también a maestros, bibliotecarios y promotores de lectura.
            </p>
          </div>
        </div>

        {/* Contacto */}
        <div className="mt-16 border-t border-gray-200 pt-10 flex flex-col gap-4 text-lg">
          <p className="font-medium">
            ¿Quieres trabajar con nosotras? Escríbenos para hablar sobre tu proyecto editorial.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:conejalibrosilustrados@gmail.com"
              className="inline-flex items-center rounded-full border border-[#171717] px-6 py-2 text-base font-semibold text-[#171717] hover:bg-[#171717] hover:text-white transition"
            >
              conejalibrosilustrados@gmail.com
            </a>
            <a
              href="https://wa.me/573160926424"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-[#171717] px-6 py-2 text-base font-semibold text-white hover:bg-[#171717] hover:text-white transition"
            >
              Whatsapp +57 316 092 6424
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
