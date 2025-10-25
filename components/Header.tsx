"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white text-[#171717]">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/coneja-logo.jpg" alt="Coneja logo" className="h-30 w-30" />
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex gap-10 font-medium text-2xl">
          <Link href="/libros">LIBROS</Link>
          <Link href="/nosotras">NOSOTRAS</Link>
          <Link href="/librerias">LIBRERÍAS</Link>
          <Link href="/servicios">SERVICIOS</Link>
          <Link href="/contacto">CONTACTO</Link>
        </nav>

        {/* Ícono carrito (placeholder) */}
        <div className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80">
          <span className="text-xl">🛒</span>
        </div>

        {/* Botón mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Navegación mobile */}
      {open && (
        <nav className="flex flex-col items-center gap-4 py-4 border-t border-gray-200 bg-white md:hidden">
          <Link href="/libros" onClick={() => setOpen(false)}>Libros</Link>
          <Link href="/nosotras" onClick={() => setOpen(false)}>Nosotras</Link>
          <Link href="/librerias" onClick={() => setOpen(false)}>Librerías</Link>
          <Link href="/servicios" onClick={() => setOpen(false)}>Servicios</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
        </nav>
      )}
    </header>
  );
}
