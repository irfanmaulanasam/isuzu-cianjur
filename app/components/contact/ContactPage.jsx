"use client";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const waNumber = "6281234567890"; // nomor kamu
  const waMessage = encodeURIComponent("Halo, saya ingin konsultasi dan cek ketersediaan unit Isuzu.");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Hubungi Sales Resmi Isuzu</h1>
        <p className="text-gray-600 mt-2">
          Konsultasi gratis, cek unit ready, dan penawaran terbaik.
        </p>
      </div>

      {/* Quick Action */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <a
          href={`https://wa.me/${waNumber}?text=${waMessage}`}
          className="flex flex-col items-center gap-2 p-5 border rounded-xl hover:shadow"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="font-medium">WhatsApp</span>
        </a>

        <a
          href={`tel:${waNumber}`}
          className="flex flex-col items-center gap-2 p-5 border rounded-xl hover:shadow"
        >
          <Phone className="h-7 w-7" />
          <span className="font-medium">Telepon</span>
        </a>

        <a
          href="/promo"
          className="flex flex-col items-center gap-2 p-5 border rounded-xl hover:shadow"
        >
          <Mail className="h-7 w-7" />
          <span className="font-medium">Cek Promo</span>
        </a>
      </div>

      {/* Card Sales */}
      <div className="p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4">Kontak Sales</h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-6 w-6 text-green-600" />
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              className="text-blue-600 hover:underline"
            >
              WhatsApp Sales
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6" />
            <span>{waNumber}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6" />
            <span>Isuzu Cianjur — Jl. Raya Sukabumi KM XX</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          className="w-full h-72 rounded-xl border"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}