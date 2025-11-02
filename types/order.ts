// /types/order.ts

export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
}

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

export interface OrderPayload extends BillingFormData {
    invoiceId: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}
