import BookCard from "@/components/BookCard";

const libros = [
  { id: 1, titulo: "El viaje del colibrí", autor: "V. Olarte", precio: 45000 },
  { id: 2, titulo: "Sombras del papel", autor: "J. Osorio", precio: 52000 }
];

export default function HomePage() {
  return (
    <section className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-brand-blue">
        Catálogo de Libros
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {libros.map((libro) => (
          <BookCard key={libro.id} libro={libro} />
        ))}
      </div>
    </section>
  );
}