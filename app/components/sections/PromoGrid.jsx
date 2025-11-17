// src/components/sections/PromoGrid.jsx
import Link from "next/link";
export default function PromoGrid() {
  const promos = [
    { title: 'Promo Angsuran Ringan', desc: 'DP ringan + bunga kompetitif', badge: 'Terbaru' },
    { title: 'Paket Fleet', desc: 'Harga khusus untuk pembelian >5 unit', badge: 'Populer' },
    { title: 'Trade-In', desc: 'Nilai tukar menarik untuk unit lama', badge: 'Limited' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Promo & Penawaran</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {promos.map((p) => (
          <div key={p.title} className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{p.title}</h3>
              <span className="text-xs text-white bg-[#E31E26] px-2 py-1 rounded">{p.badge}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
            <div className="mt-4">
              <Link href="/news/promo" className="text-sm text-[#004AAD] hover:underline">Lihat Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}