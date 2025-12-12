'use client';
import Link from 'next/link';
import ModelCombobox from '@/app/components/ModelCombobox';
import { allIsuzuModels } from '@/src/data/products/isuzuPrices-utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';


export default function Hero() {
  const router = useRouter();
  const [model, setModel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model) return; // bisa kasih toast/error

    const params = new URLSearchParams();
    params.set("model", model); // kirim nama model utuh

    router.push(`/simulasi-kredit?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-[#E6F0FF] to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0b3b83] leading-tight">Solusi Kendaraan Komersial Euro 4 — Hemat, Andal, Siap Regulasi</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl">Hitung TCO dalam 2 menit, dapatkan rekomendasi armada sesuai rute & budget bisnis Anda. Transparan, praktis, dan didukung layanan aftersales resmi.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/simulation/ownership-cost" className="inline-flex items-center px-5 py-3 bg-[#004AAD] text-white rounded-md shadow hover:bg-[#003680]">Hitung TCO</Link>
            <Link href="/products" className="inline-flex items-center px-5 py-3 border border-slate-300 rounded-md hover:bg-slate-100">Lihat Unit</Link>
            <Link href="/contact" className="inline-flex items-center px-5 py-3 text-sm text-slate-700">Konsultasi Gratis</Link>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0b3b83]">99%</div>
              <div className="text-xs text-slate-600">Ketersediaan Suku Cadang</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0b3b83]">4.8/5</div>
              <div className="text-xs text-slate-600">Rating Kepuasan Pelanggan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0b3b83]">3.5L</div>
              <div className="text-xs text-slate-600">Estimasi BBM/100km</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0b3b83]">200+</div>
              <div className="text-xs text-slate-600">Fleet Terlayani</div>
            </div>
          </div>
        </div>

        <div className="order-first lg:order-last flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">Simulasi Cepat TCO</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <ModelCombobox
                value={model}
                models={allIsuzuModels}
                onChange={setModel}
                // placeholder='Cari model kendaraan...'
                helperText={!model ? "Pilih model kendaraan untuk simulasi" : "hapus untuk ganti model"}
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Rata-rata Km per Hari</label>
                <input name="km" type="number" defaultValue={100} className="w-full border rounded-md px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Harga Solar (Rp/L)</label>
                <input name="fuel" type="number" defaultValue={12000} className="w-full border rounded-md px-3 py-2 mt-1" />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-[#E31E26] text-white rounded-md">Hitung</button>
                <Link href="/contact" className="px-4 py-2 border rounded-md">Konsultasi</Link>
              </div>
              <p className="text-xs text-slate-500">Hasil simulasi bersifat estimasi. Untuk angka final hubungi sales.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}