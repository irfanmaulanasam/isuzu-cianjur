// app/news/components/ContentListClient.tsx
"use client";

import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import { useLanguage } from "@/src/context/languageContext";
import NewsCard from "@/app/news/components/NewsCard";

const TEXTS = {
  article: {
    id: {
      title: "Semua Artikel",
      empty: "Tidak ada artikel tersedia.",
      back: "← Kembali ke Beranda Berita",
    },
    en: {
      title: "All Articles",
      empty: "No articles available.",
      back: "← Back to News Home",
    },
  },
  promo: {
    id: {
      title: "Semua Promo",
      empty: "Tidak ada promo aktif.",
      back: "← Kembali ke Beranda Berita",
    },
    en: {
      title: "All Promotions",
      empty: "No promotions available.",
      back: "← Back to News Home",
    },
  },
  event: {
    id: {
      title: "Semua Event",
      empty: "Tidak ada event dijadwalkan.",
      back: "← Kembali ke Beranda Berita",
    },
    en: {
      title: "All Events",
      empty: "No events scheduled.",
      back: "← Back to News Home",
    },
  },
};

export default function ContentListClient({
  items,
  type,
  backPath,
}) {
  const { language } = useLanguage();
  const t = TEXTS[type][language === "en" ? "en" : "id"];

  return (
    <main className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <header className="px-4 sm:px-6 pt-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Breadcrumb />
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              📖 {t.title}
            </h1>
          </header>

          <section className="px-4 sm:px-6 py-5">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400 text-base">
                  {t.empty}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {items.map((item) => (
                    <NewsCard key={item.slug} article={item} />
                  ))}
                </div>

                <Link
                  href={backPath}
                  className="inline-flex items-center text-sm text-bahana-primary dark:text-bahana-light hover:underline"
                >
                  {t.back}
                </Link>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}