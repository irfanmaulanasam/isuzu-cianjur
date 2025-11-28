// src/components/sections/StoryBrand.jsx
export default function StoryBrand() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold">Mengapa Pilih Bahana Isuzu?</h2>
        <p className="mt-3 text-slate-700">Kami fokus pada transparansi biaya, layanan purna jual, dan optimasi armada untuk hasil bisnis yang nyata. Tim kami berpengalaman menilai kebutuhan logistik dan memberikan rekomendasi yang sesuai.</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>• Konsultasi kebutuhan armada</li>
          <li>• Perhitungan Biaya Kepemilikan 5 tahun</li>
          <li>• Paket servis & suku cadang terjangkau</li>
        </ul>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold">Proses Singkat</h3>
        <ol className="mt-3 list-decimal list-inside text-sm text-slate-600 space-y-2">
          <li>Hubungi sales / konsultasi</li>
          <li>Riset kebutuhan rute & muatan</li>
          <li>Simulasi Biaya Kepemilikan & opsi pembiayaan</li>
          <li>SPK & pengiriman</li>
        </ol>
      </div>
    </div>
  );
}