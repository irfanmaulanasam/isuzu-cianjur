'use client';
import ImageOrPlaceholder from "./ImagePlaceHolder";

export default function ProductCard({ product }) {
  return (
    <article
      className="group h-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md overflow-hidden flex flex-col"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        {ImageOrPlaceholder(product.image, product.name)}
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-2">
          {product.name}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {product.details.seats}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {product.details.engine}
        </p>
        <p className="text-sm font-semibold mt-2 text-slate-900 dark:text-slate-100">
          {product.details.price}
        </p>
      </div>
    </article>
  );
}