import Link from "next/link";
export default function CTASection() {
  return (
    <section className="py-16 bg-[#004AAD] text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold">Siap Tingkatkan Efisiensi Armada Anda?</h2>
        <p className="mt-3 max-w-2xl mx-auto">Konsultasi gratis bersama tim kami. Dapatkan rekomendasi unit & simulasi biaya khusus untuk bisnis Anda.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/contact" className="px-6 py-3 bg-white text-[#004AAD] rounded-md font-semibold">Konsultasi Gratis</Link>
          <Link href="/simulation/ownership-cost" className="px-6 py-3 border border-white rounded-md">Hitung Biaya Kepemilikan</Link>
        </div>
      </div>
    </section>
  );
}