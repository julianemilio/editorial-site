import BookCard, { Book } from "./BookCard";
import BookGallery from "./BookGallery";


const libroDestacado: Book = {
  id: 1,
  titulo: "El cielo de los peces",
  autor: "Violeta Olarte Rebellón",
  descripcion:
    "Once relatos cotidianos y oníricos, en los que humanos y animales comparten la fragilidad, el descubrimiento de la muerte, la ingenuidad y la emoción de estar vivos y explorar el planeta.",
  precio: 100000,
  precioOferta: 80000,
  imagen: "/portadas/el-cielo-de-los-peces.jpg"
};

const books  = [
  { src: "/portadas/el-cielo-de-los-peces.jpg", title: "Portada" },
  { src: "/portadas/el-cielo-de-los-peces-1.jpg", title: "Índice" },
  { src: "/portadas/el-cielo-de-los-peces-2.jpg", title: "Contraportada" },
  { src: "/portadas/el-cielo-de-los-peces-3.jpg", title: "Páginas internas" },
];

export default function BookHighlight() {
  return (
    <section className="max-w-6xl mx-auto mt-8 p-8">
      <BookCard libro={libroDestacado} />
      <BookGallery images={books} />
    </section>
  );
}
