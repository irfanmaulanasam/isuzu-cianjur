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
              { language === 'id' ? 'Simulasi' : 'Simulation' }
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              { language === 'id' ? 'Pilih jenis simulasi yang Anda butuhkan.' : 'Select the type of simulation you need.' }
            </p>
          </header>

          <section className="px-4 sm:px-6 py-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/simulation/credit"
              className="block rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-bahana-primary dark:hover:border-bahana-light hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
            >
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                { language === 'id' ? 'Simulasi Kredit' : 'Credit Simulation' }
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                { language === 'id' ? 'Simulasi kredit untuk pembelian kendaraan.' : 'Credit simulation for vehicle purchase.' }
              </p>
            </Link>

            <Link
              href="/simulation/ownership-cost"
              className="block rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-bahana-primary dark:hover:border-bahana-light hover:bg-slate-50 dark:hover:bg-slate-800/70 transition"
            >
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                { language === 'id' ? 'Simulasi Biaya Kepemilikan' : 'Owner Cost Simulation' }
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                { language === 'id' ? 'Simulasi biaya kepemilikan kendaraan.' : 'Simulation of vehicle ownership costs.' }
              </p>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}