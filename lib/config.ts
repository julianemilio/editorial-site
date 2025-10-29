export const CONFIG = {
    domain: process.env.NEXT_PUBLIC_DOMAIN!,
    epayco: {
        publicKey: process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY!,
        testMode: process.env.NEXT_PUBLIC_EPAYCO_TEST_MODE === "true",
    },
};