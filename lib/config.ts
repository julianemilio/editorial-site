export const CONFIG = {
    domain: process.env.NEXT_PUBLIC_DOMAIN!,
    paymentProvider: (process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || "epayco").toLowerCase(),
    epayco: {
        publicKey: process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY || "",
        testMode: process.env.NEXT_PUBLIC_EPAYCO_TEST === "true",
    },
    bold: {
        publicKey: process.env.NEXT_PUBLIC_BOLD_PUBLIC_KEY || "",
        // Solo para firmar (server-side). NO exponer en cliente.
        environment: (process.env.BOLD_ENVIRONMENT || "sandbox") as "sandbox" | "production",
    },
};
