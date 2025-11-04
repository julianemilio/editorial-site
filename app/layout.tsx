import "@/app/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Coneja Libros Ilustrados",
  description: "Editorial independiente — libros ilustrados y relatos oníricos."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-white text-[#171717]">
                {/* 🟣 SDK global de Bold para botones embebidos */}
        <Script
          src="https://checkout.bold.co/library/boldPaymentButton.js"
          strategy="afterInteractive"
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
