export default function LibreriasPage() {
  return (
    <main className="bg-white text-[#171717] min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Título principal */}
        <h1 className="text-5xl font-extrabold mb-10">LIBRERÍAS AMIGAS</h1>

        {/* Introducción */}
        <p className="text-lg text-[#444] leading-relaxed mb-12 max-w-3xl">
          Creemos en el poder de las librerías como espacios de encuentro. Por eso, compartimos nuestras historias en{" "}
          <strong>espacios de lectura que valoran los libros ilustrados y la lectura como experiencia.</strong>
        </p>

        <p className="text-lg text-[#444] leading-relaxed mb-12">
          Aquí puedes descubrir dónde encontrarnos:
        </p>

        {/* Sección de ciudades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bogotá */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Bogotá</h3>
            <p className="text-[#444] leading-relaxed">
              Librería Woolf —{" "}
              <span className="italic text-[#555]">Calle 39B # 21-54.</span>
            </p>
          </div>

          {/* Cali */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Cali</h3>
            <ul className="space-y-2 text-[#444] leading-relaxed">
              <li>
                Oromo Café Librería y Editorial —{" "}
                <span className="italic text-[#555]">
                  Calle 17 # 85-27 B, Barrio El Ingenio.
                </span>
              </li>
              <li>
                La Indómita —{" "}
                <span className="italic text-[#555]">
                  Cra. 2 Oeste # 7-121, Barrio Santa Teresita.
                </span>
              </li>
            </ul>
          </div>

          {/* Pereira */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Pereira</h3>
            <p className="text-[#444] leading-relaxed">
              Librería Savia —{" "}
              <span className="italic text-[#555]">Calle 15 # 12b-22.</span>
            </p>
          </div>

          {/* Internacional */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition md:col-span-2">
            <h3 className="text-xl font-semibold mb-2">Internacional</h3>
            <p className="text-[#444] leading-relaxed">
              <span className="italic">
                Para envíos internacionales comunícate directamente con nosotros
                para cotizar el valor del envío y el costo total en tu moneda local.
              </span>{" "}
              Puedes escribirnos al correo:{" "}
              <a
                href="mailto:conejalibrosilustrados@gmail.com"
                className="underline hover:text-black"
              >
                conejalibrosilustrados@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
