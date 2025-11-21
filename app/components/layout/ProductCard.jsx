"use client";
import Image from "next/image";

export default function ProductCard({ product, onClick }) {
  return (
    <article className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="relative h-44 w-full bg-slate-50">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill style={{ objectFit: "contain" }} />
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-sm text-gray-600">{product.details?.price}</div>
          <button onClick={onClick} className="text-sm text-[#004AAD] underline">Lihat</button>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          <div>Seats: {product.details?.seats}</div>
        </div>
      </div>
    </article>
  );
}