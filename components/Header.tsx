"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-800 bg-brand-black text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Logo Editorial"
            className="h-8 w-8 object-contain"
          />
          <span className="text-lg font-semibold text-brand-blue">
            Editorial Coneja
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden gap-6 md:flex">
          <Link href="/libros" className="hover:text-brand-blue transition-colors">
            Libros
          </Link>
          <Link href="/nosotros" className="hover:text-brand-blue transition-colors">
            Nosotros
          </Link>
          <Link href="/librerias" className="hover:text-brand-blue transition-colors">
            Librerías aliadas
          </Link>
          <Link href="/servicios" className="hover:text-brand-blue transition-colors">
            Servicios
          </Link>
          <Link href="/contacto" className="hover:text-brand-blue transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-brand-blue hover:opacity-80"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-brand-black px-4 pb-4">
          <nav className="flex flex-col gap-2 mt-2 text-sm">
            <Link href="/libros" onClick={() => setOpen(false)}>
              Libros
            </Link>
            <Link href="/nosotros" onClick={() => setOpen(false)}>
              Nosotros
            </Link>
            <Link href="/librerias" onClick={() => setOpen(false)}>
              Librerías aliadas
            </Link>
            <Link href="/servicios" onClick={() => setOpen(false)}>
              Servicios
            </Link>
            <Link href="/contacto" onClick={() => setOpen(false)}>
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
