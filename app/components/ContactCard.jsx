"use client";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

export default function ContactCard({ item }) {
  const { name, role, phone, photo, regions } = item;

  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden flex">
      
      {/* FOTO 1/4 — VERTIKAL */}
      <div className="w-1/4 relative min-h-[160px] bg-gray-100">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* PROFIL */}
      <div className="w-3/4 p-4 flex flex-col justify-between">

        <div>
          <h3 className="text-xl font-semibold leading-tight">{name}</h3>

          <span className="text-xs px-2 py-1 mt-1 inline-block bg-blue-100 text-blue-700 rounded uppercase tracking-wide">
            {role}
          </span>

          <div className="flex items-start mt-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
            <span>{regions.join(", ")}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/${phone}?text=Halo%20${name},%20saya%20ingin%20bertanya%20lebih%20lanjut`}
          target="_blank"
          className="mt-4 inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          <Phone className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
