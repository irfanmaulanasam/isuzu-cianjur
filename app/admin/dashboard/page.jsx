"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOverviewDashboard() {
  const [stats, setStats] = useState({ articles: 0, products: 0, trashArticles: 0, trashProducts: 0 });

  useEffect(() => {
    // Simulasi pengambilan ringkasan statistik server
    const fetchStats = async () => {
      try {
        const [artRes, prodRes] = await Promise.all([
          fetch("http://localhost:3001/api/articles", { cache: "no-store" }),
          fetch("http://localhost:3001/api/products", { cache: "no-store" }),
        ]);
        const articles = artRes.ok ? await artRes.json() : [];
        const products = prodRes.ok ? await prodRes.json() : [];

        setStats({
          articles: articles.length,
          products: products.length,
          trashArticles: 0,
          trashProducts: 0,
        });
      } catch (err) {
        console.error("Gagal memuat statistik ikhtisar");
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Ikhtisar Dashboard</h1>
      <p className="text-slate-500 mb-8">Selamat datang kembali di Panel Kontrol Bahana Isuzu Cianjur.</p>

      {/* KOTAK STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-semibold text-slate-400 uppercase">Total Artikel Aktif</p>
          <p className="text-4xl font-ext500 text-slate-800 dark:text-white mt-2">{stats.articles}</p>
          <Link href="/admin/dashboard" className="text-xs text-red-600 font-bold mt-4 inline-block hover:underline">Kelola Artikel →</Link>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-semibold text-slate-400 uppercase">Total Produk Aktif</p>
          <p className="text-4xl font-ext500 text-slate-800 dark:text-white mt-2">{stats.products}</p>
          <Link href="/admin/dashboard/product" className="text-xs text-red-600 font-bold mt-4 inline-block hover:underline">Kelola Produk →</Link>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-semibold text-slate-400 uppercase">Arsip Artikel</p>
          <p className="text-4xl font-ext500 text-amber-600 mt-2">Lihat</p>
          <Link href="/admin/dashboard/ArticleArchive" className="text-xs text-red-600 font-bold mt-4 inline-block hover:underline">Buka Trash Artikel →</Link>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-semibold text-slate-400 uppercase">Arsip Produk</p>
          <p className="text-4xl font-ext500 text-amber-600 mt-2">Lihat</p>
          <Link href="/admin/dashboard/productArchive" className="text-xs text-red-600 font-bold mt-4 inline-block hover:underline">Buka Trash Produk →</Link>
        </div>
      </div>
    </div>
  );
}