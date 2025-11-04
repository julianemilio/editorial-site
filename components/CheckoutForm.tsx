
import { colombiaData } from "@/lib/colombiaData";
import { BillingFormData } from "@/types/order";
import { ChangeEvent, FormEvent } from "react";

interface CheckoutFormProps {
  formData: BillingFormData;
  formErrors: Record<string, string>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}


export default function CheckoutForm({
  formData,
  formErrors,
  handleChange,
  handleSubmit,
}: CheckoutFormProps) {
  const departamentos = Object.keys(colombiaData);
  const ciudades = formData.department ? colombiaData[formData.department] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Nombre *"
          name="firstName"
          value={formData.firstName}
          error={formErrors.firstName}
          onChange={handleChange}
        />
        <Field
          label="Apellidos *"
          name="lastName"
          value={formData.lastName}
          error={formErrors.lastName}
          onChange={handleChange}
        />
      </div>

      {/* Cédula (opcional) */}
      <Field
        label="Cédula (opcional)"
        name="idNumber"
        value={formData.idNumber}
        onChange={handleChange}
      />

      {/* País (solo lectura) */}
      <div>
        <label className="block text-sm font-medium mb-1">País / Región</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          readOnly
          className="w-full border rounded-md p-2 bg-gray-50"
        />
      </div>

      {/* Dirección y Apartamento (opcional) */}
      <Field
        label="Dirección *"
        name="address"
        value={formData.address}
        error={formErrors.address}
        onChange={handleChange}
      />
      <Field
        label="Apartamento / habitación (opcional)"
        name="apartment"
        value={formData.apartment}
        onChange={handleChange}
      />

      {/* Departamento y Ciudad (anidados) */}
      <div>
        <label className="block text-sm font-medium mb-1">Departamento *</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={`w-full border rounded-md p-2 ${
            formErrors.department ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!formErrors.department}
        >
          <option value="">Seleccione un departamento</option>
          {departamentos.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {formErrors.department && (
          <p className="text-sm text-red-600 mt-1">{formErrors.department}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ciudad *</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.department}
          className={`w-full border rounded-md p-2 ${
            formErrors.city ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!formErrors.city}
        >
          <option value="">
            {formData.department ? "Seleccione una ciudad" : "Primero seleccione un departamento"}
          </option>
          {ciudades.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {formErrors.city && (
          <p className="text-sm text-red-600 mt-1">{formErrors.city}</p>
        )}
      </div>

      {/* Código postal (opcional) */}
      <Field
        label="Código postal (opcional)"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
      />

      {/* Teléfono y Correo */}
      <Field
        label="Teléfono *"
        name="phone"
        value={formData.phone}
        error={formErrors.phone}
        onChange={handleChange}
      />
      <Field
        label="Correo electrónico *"
        name="email"
        value={formData.email}
        error={formErrors.email}
        onChange={handleChange}
      />

      {/* Suscripción (opcional) */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
          aria-label="Suscribirse al boletín (opcional)"
        />
        <label>Suscribirse a nuestro boletín (opcional)</label>
      </div>

      {/* Notas (opcional) */}
      <div>
        <label className="block text-sm font-medium mb-1">Notas del pedido (opcional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded-md p-2 h-24"
          placeholder="Instrucciones de entrega, referencias, etc."
        />
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: keyof BillingFormData | string;
  value: string;
  error?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

function Field({ label, name, value, error, onChange }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={!!error}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
