"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Membungkus pengecekan dalam fungsi async untuk menghindari error ESLint "cascading renders"
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
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-red-600">CMS Isuzu</h2>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin/dashboard" className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600">
            Daftar Artikel
          </Link>
          <Link href="/admin/dashboard/createArticle" className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600">
            Tulis Artikel Baru
          </Link>
          <Link href="/admin/dashboard/ArticleTrash" className="px-4 py-2 rounded font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600">
            Arsip Artikel
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => {
              localStorage.removeItem("isuzu_admin_key");
              router.push("/admin/login");
            }}
            className="w-full text-left px-4 py-2 font-medium text-slate-500 hover:text-red-600"
          >
            Keluar
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}