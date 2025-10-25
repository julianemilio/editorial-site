import BookCard, { Book } from "./BookCard";

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

export default function BookHighlight() {
  return (
    <section className="max-w-6xl mx-auto mt-8 p-8">
      <BookCard libro={libroDestacado} />
    </section>
  );
}
