// /lib/format.ts

export const formatCOP = (value: number): string =>
    new Intl.NumberFormat("es-CO", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
