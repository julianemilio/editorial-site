"use client";

import { useCart } from "@/context/CartContext";

export default function CarritoPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, l) => sum + l.precio * (l.cantidad ?? 1),
    0
  );

  return (
    <section className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-brand-black mb-6">
        Tu carrito de compras
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Tu carrito está vacío 🛒</p>
      ) : (
        <div className="space-y-5">
          {cart.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between border-b border-gray-700 pb-3"
            >
              {/* Imagen + detalles */}
              <div className="flex items-center gap-4">
                <img
                  src={l.portada || `/portadas/${l.id}.jpg`}
                  alt={l.titulo}
                  className="h-20 w-16 object-cover rounded-lg "
                />
                <div>
                  <p className="font-semibold text-black">{l.titulo}</p>
                  {l.autor && (
                    <p className="text-sm text-gray-400">{l.autor}</p>
                  )}
                </div>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center gap-3">
                 <p className="font-semibold text-black">#</p>

                <button
                  onClick={() =>
                    updateQuantity(l.id, (l.cantidad ?? 1) - 1)
                  }
                  className="bg-gray-700 text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-600"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={l.cantidad ?? 1}
                  onChange={(e) =>
                    updateQuantity(l.id, Number(e.target.value))
                  }
                  className="w-12 text-center bg-gray-800 text-white border border-gray-700 rounded-lg"
                />
                <button
                  onClick={() =>
                    updateQuantity(l.id, (l.cantidad ?? 1) + 1)
                  }
                  className="bg-gray-700 text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-600"
                >
                  +
                </button>
              </div>

              {/* Precio + eliminar */}
              <div className="text-right">
                <p className="font-semibold text-brand-black">
                  ${(l.precio * (l.cantidad ?? 1)).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFromCart(l.id)}
                  className="text-xs mt-2 text-red-500 hover:text-red-400"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="text-right mt-6">
            <p className="text-lg font-bold text-white">
              Total:{" "}
              <span className="text-brand-blue">
                ${total.toLocaleString()} COP
              </span>
            </p>
            <button className="mt-4 bg-brand-black text-brand-blue px-6 py-2 rounded-xl hover:opacity-90 font-semibold">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
