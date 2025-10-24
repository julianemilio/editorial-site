import PriceTag from "@/components/PriceTag";

export default function BookCard({
  libro
}: {
  libro: { titulo: string; autor: string; precio: number };
}) {
  return (
    <article className="border border-gray-700 p-4 rounded-2xl shadow hover:shadow-lg transition-all">
      <img
        src={`/portadas/${libro.id}.jpg`}
        alt={libro.titulo}
        className="rounded-xl mb-4"
      />
      <h2 className="text-lg font-semibold">{libro.titulo}</h2>
      <p className="text-sm text-gray-400 mb-2">{libro.autor}</p>
      <PriceTag price={libro.precio} />
      <button className="mt-3 bg-brand-blue text-brand-black px-4 py-2 rounded-xl hover:opacity-90">
        Agregar al carrito
      </button>
    </article>
  );
}
