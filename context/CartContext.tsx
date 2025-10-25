"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Libro = {
  id: number;
  titulo: string;
  autor?: string;
  precio: number;
  portada?: string;
  cantidad?: number;
};

type CartContextType = {
  cart: Libro[];
  addToCart: (libro: Libro) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Libro[]>([]);

  // Cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Guardar cada cambio
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar libro o aumentar cantidad
  function addToCart(libro: Libro) {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === libro.id);
      if (existing) {
        return prev.map((l) =>
          l.id === libro.id ? { ...l, cantidad: (l.cantidad ?? 1) + 1 } : l
        );
      }
      return [...prev, { ...libro, cantidad: 1 }];
    });
  }

  // Actualizar cantidad manual o por botones
  function updateQuantity(id: number, cantidad: number) {
    if (cantidad <= 0) {
      setCart((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((l) => (l.id === id ? { ...l, cantidad } : l))
    );
  }

  // Eliminar libro del carrito
  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }

  const totalItems = cart.reduce((sum, l) => sum + (l.cantidad ?? 1), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
