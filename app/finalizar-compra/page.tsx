"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";
import { BillingFormData } from "@/types/order";

export default function CheckoutPage() {
  const { cartItems, totalAmount } = useCart();

  const [formData, setFormData] = useState<BillingFormData>({
    firstName: "",
    lastName: "",
    idNumber: "",
    country: "Colombia",
    address: "",
    apartment: "",
    city: "",
    department: "",
    postalCode: "",
    phone: "",
    email: "",
    notes: "",
    subscribe: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const shippingCost =
    formData.city.toLowerCase() === "cali" ? 1600 : formData.city ? 16000 : 0;

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "El nombre es obligatorio.";
    if (!formData.lastName.trim()) errors.lastName = "El apellido es obligatorio.";
    if (!formData.address.trim()) errors.address = "La dirección es obligatoria.";
    if (!formData.department.trim()) errors.department = "Seleccione un departamento.";
    if (!formData.city.trim()) errors.city = "Seleccione una ciudad.";
    if (!formData.phone.trim()) errors.phone = "Ingrese un teléfono válido.";
    if (
      !formData.email.trim() ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    )
      errors.email = "Ingrese un correo electrónico válido.";
    return errors;
  };

  useEffect(() => {
    const errors = validateForm();
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const input = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? input.checked : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  return (
    <main className="w-full bg-white text-[#171717]">
      <div className="mx-auto max-w-6xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🧾 Formulario */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Detalles de facturación</h2>
          <CheckoutForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </section>

        {/* 💳 Resumen */}
        <aside>
          <OrderSummary
            items={cartItems}
            total={totalAmount}
            shipping={shippingCost}
            isFormValid={isFormValid}
            buyerName={`${formData.firstName} ${formData.lastName}`}
            buyerEmail={formData.email}
            buyerPhone={formData.phone}
            billingData={formData}
          />
        </aside>
      </div>
    </main>
  );
}
