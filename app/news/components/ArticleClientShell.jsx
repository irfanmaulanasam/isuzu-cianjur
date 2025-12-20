// app/news/components/ArticleClientShell.tsx
"use client";

import ContentReader from "@/app/news/components/ContentReader";
import Breadcrumb from "@/app/components/Breadcrumb";
import { useLanguage } from "@/src/context/languageContext";
import Link from "next/link";

export default function ArticleClientShell({article, slug}){
  const { language } = useLanguage();

  if (!article) {
    return (
      <main className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6 py-5">
            <Breadcrumb />
            <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
              {language === "en"
                ? "Article not found"
                : "Artikel tidak ditemukan"}
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {language === "en"
                ? "The article you are looking for may have been removed or the link is incorrect."
                : "Artikel yang Anda cari mungkin sudah dihapus atau tautannya tidak sesuai."}
            </p>
            <Link
              href="/news"
              className="mt-4 inline-flex text-sm text-bahana-primary dark:text-bahana-light hover:underline"
            >
              {language === "en" ? "← Back to News" : "← Kembali ke Berita"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <header className="px-6 pt-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <Breadcrumb />
          </header>

          <section className="px-4 sm:px-6 py-4">
            <ContentReader
              content={article}
              type="article"
              backPath="/news"
              backLabel={
                language === "en" ? "← Back to News" : "← Kembali ke Berita"
              }
            />
          </section>
        </div>
      </div>
    </main>
  );
}