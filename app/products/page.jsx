'use client'
import { useState, useMemo } from "react";
import Link from "next/link";
import products_summary from '@/src/data/products_summary'
import ProductCard from "@/app/components/ui/ProductCard";

export default function ProductsGrid() {
    const data = products_summary
    
    const [category, setCategory] = useState('ALL')
    const categories = useMemo(() => {
        if(data){
            const categoriesSet = new Set(data.map((p) => p.category))
            return ['ALL', ...Array.from(categoriesSet)]
        }
    }, [data])

    const filtered = useMemo(() => {
        if (category === "ALL") return data;
        return data.filter((p) => p.category === category)
    }, [data, category])

    return (
        <div className="px-4 py-8">
            <header className="max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl font-extrabold">Daftar Produk</h1>
                <div className="mt-4 flex gap-2 items-center flex-wrap">
                    {categories.map((cat) => (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((p) => (
                        <Link 
                            key={p.id} 
                            href={`/products/${p.slug}`}
                            className="block hover:no-underline"
                        >
                            <ProductCard
                                product={p}
                                // Tidak perlu onClick handler karena Link sudah menangani navigasi
                            />
                        </Link>
                    ))}
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        Tidak ada produk.
                    </div>
                )}
            </main>
        </div>
    );
}