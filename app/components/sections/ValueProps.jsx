// src/components/sections/ValueProps.jsx
export default function ValueProps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Transparansi Biaya Kepemilikan</h3>
        <p className="mt-2 text-sm text-slate-600">Kami tampilkan estimasi biaya operasional lengkap (BBM, servis, sparepart) agar keputusan Anda jelas.</p>
      </div>
      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h3 className="text-lg font-semibold">After Sales Resmi</h3>
        <p className="mt-2 text-sm text-slate-600">Layanan service & suku cadang resmi dari jaringan dealer Bahana Isuzu.</p>
      </div>
      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Solusi Bisnis</h3>
        <p className="mt-2 text-sm text-slate-600">Konsultasi armada berdasarkan rute, muatan, dan target biaya operasional.</p>
      </div>
    </div>
  );
}