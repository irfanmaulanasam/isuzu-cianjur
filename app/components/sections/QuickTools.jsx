// src/components/sections/QuickTools.jsx
import Link from "next/link";
export default function QuickTools() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Alat Cepat untuk Pengusaha</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-white">
          <h4 className="font-semibold">Simulasi Kredit</h4>
          <p className="text-sm text-slate-600">Perkiraan angsuran berdasarkan tenor & DP.</p>
          <div className="mt-3">
            <Link href="/simulation/credit" className="text-[#004AAD] hover:underline">Coba Sekarang</Link>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <h4 className="font-semibold">Hitung Biaya Kepemilikan</h4>
          <p className="text-sm text-slate-600">Estimasi biaya operasional per tahun.</p>
          <div className="mt-3">
            <Link href="/simulation/ownership-cost" className="text-[#004AAD] hover:underline">Mulai Hitung</Link>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <h4 className="font-semibold">Cek Unit & Stok</h4>
          <p className="text-sm text-slate-600">Cek ketersediaan unit di outlet terdekat.</p>
          <div className="mt-3">
            <Link href="/outlet" className="text-[#004AAD] hover:underline">Cek Outlet</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
