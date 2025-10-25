import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#E9F1FA] text-[#171717] text-sm mt-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/concha-logo-name.png" alt="Logo Coneja" className="h-35" />
        </div>

        {/* Info de contacto */}
        <div className="text-sm text-right md:text-left leading-relaxed">
          <p>
            <strong>© 2025 Coneja Libros Ilustrados.</strong> Todos los derechos
            reservados.
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:conejalibrosilustrados@gmail.com"
              className="hover:underline"
            >
              conejalibrosilustrados@gmail.com
            </a>
          </p>
          <p>
            <strong>Instagram:</strong>{" "}
            <a
              href="https://instagram.com/conejalibros"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @coneja.libros
            </a>
          </p>
          <p>
            <strong>WhatsApp:</strong> <a href="https://wa.me/3160926424">316 092 6424</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
