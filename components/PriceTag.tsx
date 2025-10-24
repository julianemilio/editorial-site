export default function PriceTag({
  price,
  salePrice
}: {
  price: number;
  salePrice?: number;
}) {
  return (
    <div className="flex items-baseline justify-center gap-2">
      {salePrice ? (
        <>
          <span className="line-through opacity-60 text-sm">
            ${price.toLocaleString()}
          </span>
          <span className="font-bold text-lg text-brand-blue">
            ${salePrice.toLocaleString()}
          </span>
        </>
      ) : (
        <span className="font-bold text-lg text-brand-blue">
          ${price.toLocaleString()}
        </span>
      )}
    </div>
  );
}
