'use client';
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import { useLanguage } from "@/src/context/languageContext";
export default function ServicesHubPage() {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <header className="px-4 sm:px-6 pt-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <Breadcrumb />
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              { language === 'id' ? 'Layanan' : 'Services' }
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              { language === 'id' ? 'Pilih jenis layanan yang Anda butuhkan.' : 'Select the type of service you need.' }
            </p>
          </header>

          <section className="px-4 sm:px-6 py-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/services/bib-services"
              className="block rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-bahana-primary dark:hover:border-bahana-light hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
            >
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                { language === 'id' ? 'Layanan BIB' : 'BIB Services' }
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {   language === 'id' ? 'Booking layanan BIB untuk armada Anda.' : 'Book BIB services for your fleet.' }
              </p>
            </Link>

            <Link
              href="/services/dealer-services"
              className="block rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-bahana-primary dark:hover:border-bahana-light hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
            >
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                {   language === 'id' ? 'Layanan Dealer' : 'Dealer Services' }
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                { language === 'id' ? 'Booking servis di bengkel resmi Bahana Isuzu Cianjur.' : 'Book service at Bahana Isuzu Cianjur authorized workshop.' }
              </p>
            </Link>

            <Link
              href="/services/sparepart-order"
              className="block rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-bahana-primary dark:hover:border-bahana-light hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
            >
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                {   language === 'id' ? 'Pemesanan Suku Cadang' : 'Sparepart Order' }
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                { language === 'id' ? 'Pemesanan suku cadang asli Isuzu.' : 'Order genuine Isuzu spare parts.' }
              </p>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}