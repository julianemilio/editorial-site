"use client";
import { useCart } from "@/context/CartContext";
import { formatCOP } from "@/lib/format";

export interface Book {
  id: string | number;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  precioOferta?: number;
  imagen: string;
}

export default function BookCard({ libro }: { libro: Book }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: String(libro.id),
      title: libro.titulo,
      price: libro.precioOferta ?? libro.precio,
      quantity: 1,
      image: libro.imagen,
    });
    console.log(`🛒 "${libro.titulo}" agregado al carrito`);
  };

  return (
    <article className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 bg-white">
      <div className="flex justify-center md:w-1/3">
        <img
          src={libro.imagen}
          alt={libro.titulo}
          className="rounded shadow-md max-w-xs"
        />
      </div>

      <div className="flex flex-col md:w-2/3 justify-center text-left">
        <h2 className="text-3xl font-bold mb-2">{libro.titulo}</h2>
        <p className="font-medium mb-4 text-lg">{libro.autor}</p>
        <p className="text-gray-600 italic mb-6 leading-relaxed">
          {libro.descripcion}
        </p>

        <p className="font-semibold mb-1">Precio de lanzamiento:</p>
        <p className="text-lg mb-4">
          {libro.precioOferta ? (
            <>
              <span className="line-through text-gray-400 mr-2">
                ${formatCOP(libro.precio)}
              </span>
              <span className="font-bold">${formatCOP(libro.precioOferta)} COP</span>
            </>
          ) : (
            <span className="font-bold">${formatCOP(libro.precio)} COP</span>
          )}
        </p>

        <button
          onClick={handleAdd}
          className="bg-[#171717] text-white px-5 py-2 rounded-full font-medium hover:bg-[#0B0B0C] transition"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
