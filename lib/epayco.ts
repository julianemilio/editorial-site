// /lib/epayco.ts
import crypto from "crypto";

export function buildEpaycoSignature(params: {
    refPayco: string;
    transactionId: string;
    amount: string;        // usar el string EXACTO que envía ePayco
    currency: string;
}): string {
    const pCust = process.env.EPAYCO_P_CUST_ID_CLIENTE ?? "";
    const pKey = process.env.EPAYCO_P_KEY ?? "";

    const base = `${pCust}^${pKey}^${params.refPayco}^${params.transactionId}^${params.amount}^${params.currency}`;
    return crypto.createHash("sha256").update(base).digest("hex");
}

export function timingSafeEqualHex(a: string, b: string): boolean {
    const bufA = Buffer.from(a.toLowerCase(), "hex");
    const bufB = Buffer.from(b.toLowerCase(), "hex");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}
