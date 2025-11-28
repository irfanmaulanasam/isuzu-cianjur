'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import products_summary from '@/src/data/products/products_summary.json';
import ProductCard from "@/app/components/ui/ProductCard";

export default function ProductsGrid() {
  const [category, setCategory] = useState('ALL');

  const categories = useMemo(() => {
    const cats = new Set(products_summary.map(p => p.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    if (category === 'ALL') return products_summary;
    return products_summary.filter(p => p.category === category);
  }, [category]);

  return (
    <div className="px-4 py-8">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold">Daftar Produk</h1>
        <div className="mt-4 flex gap-2 items-center flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-2xl text-sm font-medium shadow-sm hover:scale-105 transition-transform focus:outline-none ${
                category === cat
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-slate-500">Tidak ada produk.</div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-start">
            {filtered.map(p => (
              <Link key={p.id} href={`/products/${p.slug}`} className="block hover:no-underline">
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
