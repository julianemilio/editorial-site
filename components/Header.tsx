
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
     <header className="w-full border-b border-gray-200 bg-white text-[#171717]">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/coneja-logo.jpg" alt="Coneja logo" className="h-30 w-30" />
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex gap-10 font-medium text-2xl">
          <Link href="/libros">LIBROS</Link>
          <Link href="/nosotras">NOSOTRAS</Link>
          <Link href="/librerias">LIBRERÍAS</Link>
          <Link href="/servicios">SERVICIOS</Link>
          <Link href="/contacto">CONTACTO</Link>
        </nav>

        {/* Carrito */}
        <div className="relative">
          <Link href="/carrito" className="text-2xl text-brand-blue">
            🛒
          </Link>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
              {totalItems}
            </span>
          )}
        </div>

        {/* Menú móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-brand-blue text-xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-800 px-4 pb-4">
          <nav className="flex flex-col gap-2 mt-2 text-sm">
            <Link href="/libros">Libros</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
