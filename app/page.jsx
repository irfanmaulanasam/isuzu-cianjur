// src/app/page.jsx
import Image from "next/image";
export default function Home() {
return (
<div className="bg-gray-100 text-gray-900">
  <header className="bg-white shadow p-4 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Brand</h1>
      <nav className="space-x-4">
        <a href="#about" className="hover:text-blue-600">About</a>
        <a href="#services" className="hover:text-blue-600">Services</a>
        <a href="#contact" className="hover:text-blue-600">Contact</a>
      </nav>
    </div>
  </header>

  <section className="max-w-6xl mx-auto p-6 mt-8">
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h2 className="text-4xl font-extrabold mb-4">Solusi yang Tepat, Data yang Jelas</h2>
        <p className="text-lg mb-6">Bangun keputusan bisnis yang lebih kuat dengan informasi yang akurat dan sistem yang terstruktur.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700">Get Started</button>
      </div>
      <Image
      src="https://via.placeholder.com/500x300"
      alt="Hero Image"
      width={500}
      height={300}
      className="rounded-2xl shadow"
    />
    </div>
  </section>

  <section id="about" className="bg-white py-12 mt-12">
    <div className="max-w-6xl mx-auto p-6">
      <h3 className="text-3xl font-bold mb-4">Tentang Kami</h3>
      <p className="text-gray-700 leading-relaxed">Kami membantu usaha memahami data, membuat flow kerja, dan menata sistem agar lebih efisien. Cocok untuk UKM yang ingin naik level.</p>
    </div>
  </section>

  <section id="services" className="py-12">
    <div className="max-w-6xl mx-auto p-6">
      <h3 className="text-3xl font-bold mb-6">Layanan</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="text-xl font-semibold mb-2">Flow Diagram</h4>
          <p className="text-gray-700 text-sm">Membantu menggambar alur kerja bisnis secara detail dan terstruktur.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="text-xl font-semibold mb-2">Validasi Data</h4>
          <p className="text-gray-700 text-sm">Periksa fakta penting sebelum mengambil keputusan besar usaha.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="text-xl font-semibold mb-2">Eksekusi Sistem</h4>
          <p className="text-gray-700 text-sm">Implementasi sistem praktis dari rencana yang sudah dibuat.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" className="bg-white py-12 mt-12">
    <div className="max-w-6xl mx-auto p-6">
      <h3 className="text-3xl font-bold mb-4">Kontak</h3>
      <p className="text-gray-700 mb-4">Ingin konsultasi atau tanya-tanya? Hubungi kami.</p>
      <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700">WhatsApp</button>
    </div>
  </section>

  <footer className="text-center text-sm text-gray-600 py-6 mt-12">
    © 2025 Brand. Semua hak dilindungi.
  </footer>
</div>
);
}