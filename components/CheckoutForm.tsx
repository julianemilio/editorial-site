import { BillingFormData } from "@/app/finalizar-compra/page";
import { ChangeEvent, FormEvent } from "react";

interface CheckoutFormProps {
  formData: BillingFormData;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// 🌎 Datos anidados de departamentos y ciudades de Colombia
const colombiaData: Record<string, string[]> = {
  "Amazonas": ["Leticia", "Puerto Nariño", "La Pedrera", "El Encanto"],
  "Antioquia": [
    "Medellín", "Bello", "Envigado", "Itagüí", "Rionegro", "Turbo",
    "Apartadó", "La Ceja", "Sabaneta", "Copacabana", "Caucasia", "Amagá",
    "Santa Fe de Antioquia", "Marinilla", "El Carmen de Viboral"
  ],
  "Arauca": ["Arauca", "Arauquita", "Saravena", "Tame", "Cravo Norte", "Puerto Rondón", "Fortul"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Puerto Colombia", "Galapa", "Baranoa", "Santo Tomás"],
  "Bolívar": [
    "Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar", "Mompox",
    "Arjona", "San Juan Nepomuceno", "María La Baja", "San Jacinto"
  ],
  "Boyacá": [
    "Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Samacá",
    "Moniquirá", "Nobsa", "Villa de Leyva"
  ],
  "Caldas": ["Manizales", "La Dorada", "Villamaría", "Chinchiná", "Anserma", "Riosucio", "Supía"],
  "Caquetá": ["Florencia", "Curillo", "La Montañita", "Morelia", "Belén de los Andaquíes", "El Doncello", "Puerto Rico"],
  "Casanare": ["Yopal", "Aguazul", "Villanueva", "Tauramena", "Paz de Ariporo", "Monterrey"],
  "Cauca": [
    "Popayán", "Santander de Quilichao", "Puerto Tejada", "Patía", "El Tambo",
    "Guapi", "Suárez", "Cajibío"
  ],
  "Cesar": ["Valledupar", "Aguachica", "La Jagua de Ibirico", "Curumaní", "El Copey", "Bosconia", "Chiriguaná"],
  "Chocó": ["Quibdó", "Istmina", "Tadó", "Condoto", "Acandí", "Bahía Solano", "Nuquí"],
  "Córdoba": ["Montería", "Lorica", "Planeta Rica", "Cereté", "Sahagún", "Tierralta", "Montelíbano"],
  "Cundinamarca": [
    "Bogotá", "Soacha", "Zipaquirá", "Girardot", "Chía", "Facatativá",
    "Fusagasugá", "Mosquera", "Madrid", "Funza", "Tocancipá"
  ],
  "Guainía": ["Inírida", "Barrancominas"],
  "Guaviare": ["San José del Guaviare", "Calamar", "El Retorno"],
  "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre", "Algeciras"],
  "La Guajira": ["Riohacha", "Maicao", "Uribia", "Fonseca", "San Juan del Cesar", "Villanueva", "Manaure"],
  "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "Aracataca", "El Banco", "Plato", "Pivijay"],
  "Meta": ["Villavicencio", "Acacías", "Granada", "Puerto López", "Restrepo", "Cumaral", "San Martín"],
  "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres", "La Unión", "Sandoná", "Barbacoas"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Los Patios", "Villa del Rosario", "Chinácota"],
  "Putumayo": ["Mocoa", "Orito", "Puerto Asís", "Sibundoy", "Villagarzón"],
  "Quindío": ["Armenia", "Calarcá", "La Tebaida", "Montenegro", "Quimbaya", "Circasia", "Filandia"],
  "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Marsella"],
  "San Andrés y Providencia": ["San Andrés", "Providencia"],
  "Santander": [
    "Bucaramanga", "Floridablanca", "Barrancabermeja", "Girón", "Piedecuesta",
    "San Gil", "Socorro", "Lebrija"
  ],
  "Sucre": ["Sincelejo", "Corozal", "Sampués", "San Marcos", "Tolú", "Coveñas", "Los Palmitos"],
  "Tolima": ["Ibagué", "Espinal", "Honda", "Melgar", "Líbano", "Mariquita", "Chaparral"],
  "Valle del Cauca": [
    "Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Jamundí",
    "Buga", "Yumbo", "Sevilla", "Zarzal", "Caicedonia", "La Unión"
  ],
  "Vaupés": ["Mitú", "Carurú", "Taraira"],
  "Vichada": ["Puerto Carreño", "La Primavera", "Santa Rosalía", "Cumaribo"]
};

export default function CheckoutForm({
  formData,
  handleChange,
  handleSubmit,
}: CheckoutFormProps) {
  const departamentos = Object.keys(colombiaData);
  const ciudades = formData.department
    ? colombiaData[formData.department] || []
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Apellidos *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
      </div>

      {/* Cédula */}
      <div>
        <label className="block text-sm font-medium">Cédula (opcional)</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* País */}
      <div>
        <label className="block text-sm font-medium">País / Región</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          readOnly
          className="w-full border rounded-md p-2 bg-gray-50"
        />
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-medium">Dirección *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Apartamento */}
      <div>
        <label className="block text-sm font-medium">Apartamento / habitación</label>
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Departamento */}
      <div>
        <label className="block text-sm font-medium">Departamento *</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        >
          <option value="">Seleccione un departamento</option>
          {departamentos.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Ciudad */}
      <div>
        <label className="block text-sm font-medium">Ciudad *</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
          disabled={!formData.department}
        >
          <option value="">
            {formData.department
              ? "Seleccione una ciudad"
              : "Primero seleccione un departamento"}
          </option>
          {ciudades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Código postal */}
      <div>
        <label className="block text-sm font-medium">Código postal (opcional)</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium">Teléfono *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium">Correo electrónico *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      {/* Suscripción */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        <label>Suscribirse a nuestro boletín</label>
      </div>

      {/* Notas */}
      <div>
        <label className="block text-sm font-medium">Notas del pedido (opcional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded-md p-2 h-24"
        />
      </div>
    </form>
  );
}
