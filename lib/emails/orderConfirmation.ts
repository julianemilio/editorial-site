// lib/emails/orderConfirmation.ts
import { formatCOP } from "@/lib/format";
import { CartItem } from "@/types/order";

export interface OrderEmailData {
    invoiceId: string;
    buyerName: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    address?: string;
    apartment?: string;
    city?: string;
    department?: string;
}

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

export function buildOrderConfirmationEmail(order: OrderEmailData) {
    const subject = `Recibimos tu pago - Pedido ${order.invoiceId}`;
    const shippingAddress = [order.address, order.apartment, order.city, order.department]
        .filter(Boolean)
        .join(", ");

    const rows = order.items
        .map(
            (item) => `
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(item.title)} × ${item.quantity}</td>
            <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">$${formatCOP(item.price * item.quantity)}</td>
          </tr>`
        )
        .join("");

    const html = `
<!doctype html>
<html lang="es">
  <body style="margin:0;padding:24px;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;color:#171717;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;padding:32px;">
      <tr><td>
        <h1 style="font-size:22px;margin:0 0 16px;">¡Gracias por tu compra, ${escapeHtml(order.buyerName)}!</h1>
        <p style="margin:0 0 16px;">Recibimos tu pago correctamente. Estamos preparando tu pedido.</p>

        <div style="background:#f6f6f6;border-radius:6px;padding:16px;margin:0 0 24px;text-align:center;">
          <div style="font-size:13px;color:#555;">Número de pedido</div>
          <div style="font-size:20px;font-weight:bold;letter-spacing:1px;">${escapeHtml(order.invoiceId)}</div>
          <div style="font-size:12px;color:#555;margin-top:4px;">Guárdalo para cualquier consulta sobre tu compra.</div>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
          ${rows}
          <tr><td style="padding:8px 0;">Subtotal</td><td style="padding:8px 0;text-align:right;">$${formatCOP(order.subtotal)}</td></tr>
          <tr><td style="padding:8px 0;">Envío</td><td style="padding:8px 0;text-align:right;">$${formatCOP(order.shipping)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;">Total</td><td style="padding:8px 0;text-align:right;font-weight:bold;">$${formatCOP(order.total)} COP</td></tr>
        </table>

        ${shippingAddress ? `<p style="font-size:14px;margin:24px 0 0;"><strong>Dirección de envío:</strong> ${escapeHtml(shippingAddress)}</p>` : ""}

        <p style="font-size:13px;color:#555;margin:24px 0 0;">
          Si tienes preguntas, escríbenos a
          <a href="mailto:contacto@conejalibrosilustrados.com" style="color:#171717;">contacto@conejalibrosilustrados.com</a>
          indicando tu número de pedido.
        </p>
        <p style="font-size:13px;color:#555;margin:16px 0 0;">Coneja Editorial</p>
      </td></tr>
    </table>
  </body>
</html>`;

    const text = [
        `¡Gracias por tu compra, ${order.buyerName}!`,
        "",
        "Recibimos tu pago correctamente. Estamos preparando tu pedido.",
        "",
        `Número de pedido: ${order.invoiceId}`,
        "",
        ...order.items.map((i) => `- ${i.title} x ${i.quantity}: $${formatCOP(i.price * i.quantity)}`),
        `Subtotal: $${formatCOP(order.subtotal)}`,
        `Envío: $${formatCOP(order.shipping)}`,
        `Total: $${formatCOP(order.total)} COP`,
        shippingAddress ? `\nDirección de envío: ${shippingAddress}` : "",
        "",
        "Si tienes preguntas, escríbenos a contacto@conejalibrosilustrados.com indicando tu número de pedido.",
        "Coneja Editorial",
    ].join("\n");

    return { subject, html, text };
}
