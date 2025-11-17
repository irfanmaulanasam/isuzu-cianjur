
// src/components/sections/Testimonials.jsx
export default function Testimonials() {
  const items = [
    { name: 'PT Logistik Jaya', quote: 'Perhitungan TCO jelas membantu kami mengurangi 12% biaya operasional.' },
    { name: 'CV Sukses Sendiri', quote: 'Proses cepat dan aftersales jelas — recommended.' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kisah Pelanggan</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it, i) => (
          <div key={i} className="p-6 bg-white border rounded-xl shadow-sm">
            <p className="italic text-slate-700">“{it.quote}”</p>
            <p className="mt-3 font-semibold">{it.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}