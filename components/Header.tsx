"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white text-[#171717] sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/coneja-logo.jpg"
            alt="Coneja logo"
            width={60}
            height={60}
            className="w-14 h-14 object-contain md:w-16 md:h-16"
            priority
          />
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex gap-8 font-medium text-lg tracking-wide">
          <Link href="/libros" className="hover:text-blue-700 transition">
            LIBROS
          </Link>
          <Link href="/nosotras" className="hover:text-blue-700 transition">
            NOSOTRAS
          </Link>
          <Link href="/librerias" className="hover:text-blue-700 transition">
            LIBRERÍAS
          </Link>
          <Link href="/servicios" className="hover:text-blue-700 transition">
            SERVICIOS
          </Link>
          <Link href="/contacto" className="hover:text-blue-700 transition">
            CONTACTO
          </Link>
        </nav>

        {/* Carrito + menú móvil */}
        <div className="flex items-center gap-4">
          {/* Carrito */}
          <div className="relative">
            <Link href="/carrito" aria-label="Carrito">
              <Image
                src="/icons/cart.svg"
                alt="Carrito"
                width={28}
                height={28}
                className="object-contain"
              />
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                {totalItems}
              </span>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center items-center space-y-1.5 focus:outline-none"
            aria-label="Abrir menú"
          >
            <span className="w-6 h-0.5 bg-[#171717] rounded"></span>
            <span className="w-6 h-0.5 bg-[#171717] rounded"></span>
            <span className="w-6 h-0.5 bg-[#171717] rounded"></span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slide-down">
          <nav className="flex flex-col items-center py-4 gap-4 font-medium text-lg">
            <Link href="/libros" onClick={() => setOpen(false)}>
              LIBROS
            </Link>
            <Link href="/nosotras" onClick={() => setOpen(false)}>
              NOSOTRAS
            </Link>
            <Link href="/librerias" onClick={() => setOpen(false)}>
              LIBRERÍAS
            </Link>
            <Link href="/servicios" onClick={() => setOpen(false)}>
              SERVICIOS
            </Link>
            <Link href="/contacto" onClick={() => setOpen(false)}>
              CONTACTO
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
