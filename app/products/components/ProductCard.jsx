// 'use client';
import Image from "next/image";
import ImageOrPlaceholder from "./ImagePlaceHolder";
export default function ProductCard({ product }) {
  return (
    <div className="w-[260px] border rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer overflow-hidden">
      {ImageOrPlaceholder(product.image,product.name)}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-slate-500">{product.details.seats}</p>
        <p className="text-sm text-slate-500">{product.details.engine}</p>
        <p className="text-sm font-medium mt-1">{product.details.price}</p>
      </div>
    </div>
  );
}
