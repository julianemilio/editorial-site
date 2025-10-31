import Image from "next/image";
import { CartItem } from "@/context/CartContext";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  shipping: number;
}

export default function OrderSummary({ items, total, shipping }: OrderSummaryProps) {
  const totalWithShipping = total + shipping;

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Tu pedido</h2>

      <div className="divide-y">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Tu carrito está vacío.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <div className="flex items-center gap-3">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={70}
                    className="object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-medium">
                $ {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between text-sm mt-4">
        <span>Subtotal</span>
        <span>$ {total.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span>
          {shipping === 0 ? "Por calcular" : `$ ${shipping.toLocaleString()} COP`}
        </span>
      </div>

      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
        <span>Total</span>
        <span>$ {totalWithShipping.toLocaleString()} COP</span>
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" required />
          He leído y acepto los términos y condiciones
        </label>
      </div>

      <div className="mt-4">
        {/* Aquí insertas tu botón ePayco */}
        <div id="epayco-button-container"></div>
      </div>
    </div>
  );
}
