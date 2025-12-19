'use client';
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";

export default function SpecPage({ data:{data, language="id"} }) {
  if (!data) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-6">
            <Breadcrumb />
            <p className="mt-2 text-slate-700 dark:text-slate-200">
              {language === "id" ? "Spesifikasi tidak ditemukan." : "Specifications not found."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
          {/* HEADER CARD */}
          <header className="px-6 pt-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            {/* breadcrumb di dalam card, rata kiri, jarak tipis */}
            <Breadcrumb />

            <h1 className="mt-1 text-3xl font-extrabold text-red-600 dark:text-red-400">
              {data.title}
            </h1>

            {data.subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {data.subtitle}
              </p>
            )}

            {data.price && (
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-2">
                {data.price}
              </p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'en'
                ? 'Technical specification values are presented in Indonesian as per official brochure.'
                : 'Nilai spesifikasi teknis disajikan dalam Bahasa Indonesia sesuai brosur resmi.'}
            </p>
            {/* CTA BAR */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/simulation/ownership-cost?model=${encodeURIComponent(
                  data.slug
                )}`}
                className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm rounded-md bg-bahana-primary text-white hover:bg-bahana-dark transition"
              >
                Hitung Biaya Kepemilikan
              </Link>

              <Link
                href={`/simulation/credit?model=${encodeURIComponent(data.slug)}`}
                className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm rounded-md border border-bahana-primary text-bahana-primary hover:bg-bahana-light/20 dark:hover:bg-bahana-light/10 rounded-md transition"
              >
                Simulasi Kredit
              </Link>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_SALES_PHONE}?text=${encodeURIComponent(
                  `Halo, saya tertarik dengan ${data.title}. Bisa dibantu info lebih lanjut?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm rounded-md bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 transition"
              >
                Tanya Sales
              </a>
            </div>
          </header>

          {/* BODY CARD */}
          <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.sections.map((section, sIdx) => (
              <section
                key={sIdx}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm"
              >
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70">
                  <h3 className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-100 uppercase">
                    {section.label}
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {section.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 flex justify-between items-start text-sm"
                    >
                      <div className="text-slate-600 dark:text-slate-300 pr-4">
                        {it.name}
                      </div>
                      <div className="text-right text-slate-900 dark:text-slate-50 font-medium min-w-[40%]">
                        {it.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </section>
  );
}

// 'use client';

// export default function SpecPage({ data: {data, language} }) {
//   if (!data) {
//     return (
//       <section className="py-12 bg-gray-50 dark:bg-slate-950">
//         <div className="max-w-4xl mx-auto px-4 text-slate-700 dark:text-slate-200">
//           Spesifikasi tidak ditemukan.
//         </div>
//       </section>
//     );
//   }
//   return (
    
//     <section className="py-12 bg-gray-50 dark:bg-slate-950">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Card utama */}
//         <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
//           {/* Header */}
//           <header className="px-6 pt-6 pb-4 border-b border-slate-200 dark:border-slate-800">
//             <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
//               {data.title}
//             </h1>
//             {data.subtitle && (
//               <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
//                 {data.subtitle}
//               </p>
//             )}
//             <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
//               {language === 'en'
//                 ? 'Technical specification values are presented in Indonesian as per official brochure.'
//                 : 'Nilai spesifikasi teknis disajikan dalam Bahasa Indonesia sesuai brosur resmi.'}
//             </p>
//           </header>
//           {/* Grid spesifikasi */}
//           <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {data.sections.map((section, sIdx) => (
//               <section
//                 key={sIdx}
//                 className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm"
//               >
//                 <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70">
//                   <h3 className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-100 uppercase">
//                     {section.label}
//                   </h3>
//                 </div>

//                 <div className="divide-y divide-slate-100 dark:divide-slate-800">
//                   {section.items.map((it, idx) => (
//                     <div
//                       key={idx}
//                       className="px-4 py-3 flex justify-between items-start text-sm"
//                     >
//                       <div className="text-slate-600 dark:text-slate-300 pr-4">
//                         {it.name}
//                       </div>
//                       <div className="text-right text-slate-900 dark:text-slate-50 font-medium min-w-[40%]">
//                         {it.value}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             ))}
//           </main>
//         </div>
//       </div>
//     </section>
//   );
// }
