"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSecurity = async () => {
      if (pathname === "/admin/login") {
        setIsAuthorized(true);
        return;
      }

      const key = localStorage.getItem("isuzu_admin_key");
      if (!key) {
        router.push("/admin/login");
      } else {
        setIsAuthorized(true);
      }
    };

    checkSecurity();
  }, [pathname, router]);

  if (!isAuthorized) return <div className="min-h-screen bg-slate-100 dark:bg-slate-950" />;

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 relative">
      
      {/* SIDEBAR (Drawer untuk mobile & Statis untuk desktop) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-600">CMS Isuzu</h2>
          {/* Tombol close khusus di dalam sidebar mobile */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-slate-500 font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-6 overflow-y-auto">
          {/* Menu Artikel */}
          <div className="flex flex-col gap-1">
            <span className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Manajemen Artikel
            </span>
            <Link href="/admin/dashboard/article" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition">
              📄 Daftar Artikel
            </Link>
            <Link href="/admin/dashboard/article/create" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition">
              ✍️ Tulis Artikel Baru
            </Link>
            <Link href="/admin/dashboard/article/archive" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition">
              🗑️ Arsip Artikel
            </Link>
          </div>

          {/* Menu Produk */}
          <div className="flex flex-col gap-1">
            <span className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Manajemen Produk
            </span>
            <Link href="/admin/dashboard/product" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition">
              🚚 Daftar Produk
            </Link>
            <Link href="/admin/dashboard/product/create" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition">
              ➕ Tulis Produk Baru
            </Link>
            <Link href="/admin/dashboard/product/archive" onClick={() => setIsMobileOpen(false)} className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition">
              📦 Arsip Produk
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => {
              localStorage.removeItem("isuzu_admin_key");
              router.push("/admin/login");
            }}
            className="w-full text-left px-4 py-2 font-medium text-slate-500 hover:text-red-600"
          >
            🚪 Keluar
          </button>
        </div>
      </aside>

      {/* BACKDROP GELAP SAAT SIDEBAR MOBILE DIBUKA */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* KONTEN UTAMA DENGAN TOMBOL HAMBURGER DI DALAMNYA */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {/* Tombol Hamburger yang menyatu rapi di dalam area konten dashboard */}
        <div className="md:hidden mb-6 flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="font-bold text-slate-800 dark:text-white text-sm">Panel Admin CMS</span>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold"
          >
            ☰ Buka Menu
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}