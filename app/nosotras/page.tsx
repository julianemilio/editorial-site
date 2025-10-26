export default function NosotrasPage() {
  return (
    <main className="bg-white text-[#171717] min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Título principal */}
        <h1 className="text-5xl font-extrabold mb-10">NOSOTRAS</h1>

        {/* Descripción general */}
        <div className="text-lg text-[#444] leading-relaxed space-y-6 mb-16">
          <p>
            <strong>Coneja, libros ilustrados</strong> es una editorial independiente nacida en Cali, Colombia. 
            Creamos, editamos y publicamos libros ilustrados en múltiples formatos: álbumes infantiles, fotografía, 
            cómic, libro-arte y proyectos híbridos donde palabra e imagen se encuentran.
          </p>

          <p>
            Hacemos libros que perduran en el tiempo: ediciones cuidadas, de alta calidad y con los mejores materiales. 
            Todos los libros pasan por una rigurosa curaduría artística y literaria. Creemos en el poder de los libros 
            ilustrados como objetos que acompañan, conmueven y dejan huella en quienes los leen.
          </p>
        </div>

        {/* Integrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Violeta */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-1">Violeta Olarte Rebellón</h2>
            <p className="italic text-[#555] mb-4">Fundadora y editora de Coneja, libros ilustrados</p>
            <p className="text-[#444] leading-relaxed">
              Escritora e ilustradora. Editora de libros académicos y literarios. Promotora de lectura, tallerista y 
              docente universitaria de escritura creativa y poesía. Autora de los libros: <em>Púa, la niña bruja</em> 
              (Sic Semper Ediciones, 2020; Crisálida Ediciones, 2023), <em>Llegar al aware</em> (Tristes Trópicos, 2022), 
              <em>A mí me gusta mucho el mar (lástima que todavía no lo conozco)</em> (Sic Semper Ediciones, 2023) y 
              <em> El cielo de los peces</em> (Coneja, libros ilustrados, 2025). Incluida en la antología 
              <em> El Valle relata: 34 mujeres</em> (Ediciones El Silencio, 2023).
            </p>
          </div>

          {/* Diana */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-1">Diana Acevedo</h2>
            <p className="italic text-[#555] mb-4">Diseñadora editorial</p>
            <p className="text-[#444] leading-relaxed">
              Diseñadora gráfica y editorial con experiencia en la creación y diagramación de libros, catálogos 
              y publicaciones tanto impresas como digitales. Su trayectoria abarca proyectos en el ámbito cultural, 
              educativo y comercial, con un especial interés en la moda y en el sector editorial. Su trabajo se 
              caracteriza por la versatilidad y la capacidad de integrar creatividad, comunicación visual y estrategia 
              para dar vida a proyectos que unen estética y funcionalidad.
            </p>
          </div>

          {/* Camila */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-1">Camila Cassari</h2>
            <p className="italic text-[#555] mb-4">Coordinadora de marketing</p>
            <p className="text-[#444] leading-relaxed">
              Profesional creativa y apasionada con experiencia en coordinación de marketing, empresas B2B/B2C, 
              estrategias de relaciones con medios, marketing digital y planificación de comunicaciones corporativas. 
              Experta en la creación de contenidos que fortalecen la reputación corporativa y el storytelling. 
              También es actriz de teatro y televisión, productora audiovisual, redactora publicitaria, relacionista 
              pública, tallerista, coordinadora de eventos y coach de marca personal. En sus ratos libres, escribe 
              literatura autobiográfica y trabaja en su primera novela interactiva.
            </p>
          </div>

          {/* Julián */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-1">Julián Osorio Larroche</h2>
            <p className="italic text-[#555] mb-4">Desarrollador web</p>
            <p className="text-[#444] leading-relaxed">
              Ingeniero de software con más de una década de experiencia en el desarrollo de aplicaciones y soluciones 
              digitales. Su trabajo se distingue por la capacidad de crear plataformas sólidas, escalables y de alto 
              rendimiento, siempre con atención al detalle y a las buenas prácticas de la industria. Para Coneja, Julián 
              diseñó y desarrolló la página web de la editorial, asegurando una plataforma clara, estética y fácil de usar.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
