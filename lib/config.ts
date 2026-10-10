export const CONFIG = {
    domain: process.env.NEXT_PUBLIC_DOMAIN!,
    bold: {
        publicKey: process.env.NEXT_PUBLIC_BOLD_PUBLIC_KEY || "",
        // Solo para firmar (server-side). NO exponer en cliente.
        environment: (process.env.BOLD_ENVIRONMENT || "sandbox") as "sandbox" | "production",
    },
};
