"use client";
import { useState } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  title?: string;
};

type BookGalleryProps = {
  images: GalleryImage[];
};

export default function BookGallery({ images }: BookGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = () => setSelectedIndex(null);
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  };
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="w-full">
      {/* Grid de miniaturas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            onClick={() => setSelectedIndex(i)}
          >
            <Image
              src={img.src}
              alt={img.title || `Imagen ${i + 1}`}
              width={400}
              height={600}
              className="object-cover w-full h-full transform group-hover:scale-110 transition duration-300"
            />
            {img.title && (
              <div className="absolute bottom-0 w-full bg-black/70 text-white text-sm text-center py-1 opacity-0 group-hover:opacity-100 transition">
                {img.title}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={showPrev}
            className="absolute left-4 text-white text-3xl font-bold hover:text-red-500 transition"
          >
            ‹
          </button>

          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].title || ""}
            width={800}
            height={1200}
            className="max-h-[90vh] w-auto rounded-lg shadow-2xl"
          />

          <button
            onClick={showNext}
            className="absolute right-4 text-white text-3xl font-bold hover:text-red-500 transition"
          >
            ›
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-6 right-6 text-white text-2xl font-bold hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
