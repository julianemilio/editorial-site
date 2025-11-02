"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();

  return (
    <div className="w-full bg-white text-[#171717] min-h-screen">
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl font-semibold mb-6">Tu carrito</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío.</p>
            <Link
              href="/libros"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Ver libros
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={70}
                        height={90}
                        className="rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-base">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Cantidad */}
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                        }
                        className="px-2 py-1 text-lg"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-12 text-center border-x text-sm"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Total del item */}
                    <p className="text-sm font-medium">
                      $ {(item.price * item.quantity).toLocaleString()}
                    </p>

                    {/* Eliminar */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar producto"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen y acciones */}
            <div className="mt-10  pt-6 flex flex-col md:flex-row justify-between gap-6">
            <div></div>

              <div className="flex flex-col items-end w-full md:w-auto">
                <div className="flex justify-between w-full md:w-64 text-sm mb-2">
                  <span>Subtotal:</span>
                  <span>$ {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-full md:w-64 text-sm mb-2">
                  <span>Envío:</span>
                  <span className="text-gray-600 italic"> Se calcula al agregar dirección</span>
                </div>
                <div className="flex justify-between w-full md:w-64 font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>$ {totalAmount.toLocaleString()}</span>
                </div>

                <Link
                  href="/finalizar-compra"
                  className="mt-6 inline-block bg-black text-white! text-center px-6 py-3 rounded-md hover:bg-gray-800 transition"
                >
                  Finalizar compra →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
