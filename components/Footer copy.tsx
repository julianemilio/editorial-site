import Link from "next/link";

export default function Footer2() {
  return (
    <footer className="w-full border-t border-gray-800 bg-brand-black text-gray-400">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Logo & texto */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Logo Editorial"
            className="h-8 w-8 object-contain opacity-90"
          />
          <p className="text-sm">
            © {new Date().getFullYear()} Editorial Coneja. Todos los derechos
            reservados.
          </p>
        </div>

        {/* Links secundarios */}
        <div className="flex gap-4 text-sm">
          <Link
            href="/politica-de-privacidad"
            className="hover:text-brand-blue transition-colors"
          >
            Política de Privacidad
          </Link>
          <Link
            href="/terminos"
            className="hover:text-brand-blue transition-colors"
          >
            Términos
          </Link>
          <a
            href="mailto:contacto@conejaeditorial.com"
            className="hover:text-brand-blue transition-colors"
          >
            contacto@conejaeditorial.com
          </a>
        </div>
      </div>
    </footer>
  );
}
