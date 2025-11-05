"use client";
import { CONFIG } from "@/lib/config";
import EpaycoCheckoutButton from "@/components/EpaycoCheckoutButton";
import BoldCheckoutButton from "@/components/BoldCheckoutButton";

interface PaymentButtonProps {
  title: string;
  description: string;
  amount: number;
  invoiceId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  beforePayment?: () => Promise<{
    ok: boolean;
    invoiceId?: string;
    integrity?: string;
  }>;
  integritySignature?: string;
}

export default function PaymentButton(props: PaymentButtonProps) {
  return CONFIG.paymentProvider === "bold"
    ? <BoldCheckoutButton {...props} />
    : <EpaycoCheckoutButton {...props} />;
}
