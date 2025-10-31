"use client";

import { useCart } from "@/context/CartContext";
import { useState, ChangeEvent, FormEvent } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";

export interface BillingFormData {
  firstName: string;
  lastName: string;
  idNumber: string;
  country: string;
  address: string;
  apartment: string;
  city: string;
  department: string;
  postalCode: string;
  phone: string;
  email: string;
  notes: string;
  subscribe: boolean;
}

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

  // 🧮 Calcula el costo de envío según ciudad
  const shippingCost =
    formData.city.toLowerCase() === "cali" ? 8000 : formData.city ? 16000 : 0;

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
    console.log("Datos de facturación:", formData);
  };

  return (
    <div className="w-full bg-white text-[#171717]">
      <div className="mx-auto max-w-6xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Detalles de facturación</h2>
          <CheckoutForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </section>

        <aside>
          <OrderSummary
            items={cartItems}
            total={totalAmount}
            shipping={shippingCost}
          />
        </aside>
      </div>
    </div>
  );
}
