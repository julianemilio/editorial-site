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
            <ul className="space-y-2 text-[#444] leading-relaxed">
              <li>
                <a
                  href="https://www.instagram.com/libreria.woolf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  Librería Woolf
                </a>{" "}
                —{" "}
                <span className="italic text-[#555]">Calle 39B # 21-54.</span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/manadalibreria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  Manada Librería
                </a>{" "}
                —{" "}
                <span className="italic text-[#555]">Calle 120A # 6-46.</span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/libreriaelgatoqueleeybebe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  El Gato que Lee y Bebe
                </a>{" "}
                —{" "}
                <span className="italic text-[#555]">
                  Calle 70 # 11-48, Chapinero.
                </span>
              </li>
            </ul>
          </div>

          {/* Cali */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Cali</h3>
            <ul className="space-y-2 text-[#444] leading-relaxed">
              <li>
                <a
                  href="https://www.instagram.com/oromocafelibreria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  Oromo Café Librería y Editorial
                </a>{" "}
                —{" "}
                <span className="italic text-[#555]">
                  Calle 17 # 85-27 B, Barrio El Ingenio.
                </span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/laindomita.cali/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  La Indómita
                </a>{" "}
                —{" "}
                <span className="italic text-[#555]">
                  Cra. 2 Oeste # 7-121, Barrio Santa Teresita.
                </span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/fcecolombia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  Librería La María
                </a>{" "}
                —{" "}
                <span className="italic text-[#555]">
                  Avenida 4 Oeste # 4-59, Casa Obeso Mejía.
                </span>
              </li>
            </ul>
          </div>

          {/* Pereira */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Pereira</h3>
            <p className="text-[#444] leading-relaxed">
              <a
                href="https://www.instagram.com/libreria.savia/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black"
              >
                Librería Savia
              </a>{" "}
              —{" "}
              <span className="italic text-[#555]">Calle 15 # 12b-22.</span>
            </p>
          </div>

          {/* Salento */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Salento</h3>
            <p className="text-[#444] leading-relaxed">
              <a
                href="https://www.instagram.com/jerfostreetandnight/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black"
              >
                Jerfo: diseño, moda y arte
              </a>{" "}
              —{" "}
              <span className="italic text-[#555]">Calle 2 # 5-23, Local 2.</span>
            </p>
          </div>

          {/* Córdoba, Argentina */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Córdoba, Argentina</h3>
            <p className="text-[#444] leading-relaxed">
              <a
                href="https://www.instagram.com/rubenlibros/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black"
              >
                Rubén Libros
              </a>{" "}
              —{" "}
              <span className="italic text-[#555]">
                Deán Funes 163, Pasaje Santa Catalina, Locales 1 y 2, Centro.
              </span>
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
