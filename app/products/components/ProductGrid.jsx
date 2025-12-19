'use client';
import { useState, useMemo } from "react";
import Link from "next/link";
import products_summary from "@/src/data/products/products_summary.json";
import ProductCard from "@/app/products/components/ProductCard";
import { useLanguage } from "@/src/context/languageContext";
import ID from "@/src/data/products/id.json";
import EN from "@/src/data/products/en.json";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function ProductsGrid() {
  const { language } = useLanguage();
  const text = useMemo(() => (language === "en" ? EN : ID), [language]);

  const [category, setCategory] = useState("ALL");

  const categories = text.categories;

  const filtered = useMemo(() => {
    if (category === "ALL") return products_summary;
    return products_summary.filter((p) => p.category === category);
  }, [category]);

  return (
      <section className="px-4 py-8 bg-white dark:bg-slate-950">
        <header className="max-w-6xl mx-auto mb-6">
          <Breadcrumb />
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {text.title}
          </h1>

          <div className="mt-4 flex gap-2 items-center flex-wrap">
            {categories.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-3 py-1 rounded-2xl text-sm font-medium shadow-sm focus:outline-none transition-transform hover:scale-105 ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">
              {text.empty}
            </div>
          ) : (
            <div
              className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="block hover:no-underline"
                >
                  <ProductCard product={p} />
                </Link>
              ))}
            </div>
          )}
        </main>
      </section>
  );
} 