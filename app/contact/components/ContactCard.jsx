"use client";

import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/src/context/languageContext";
import ID from "@/src/data/contacts/id.json";
import EN from "@/src/data/contacts/en.json";

export default function ContactCard({ item }) {
  const { language } = useLanguage();
  const text = language === "en" ? EN : ID;

  const { name, role, phone, photo, regions } = item;

  const waMessage = encodeURIComponent(
    text.whatsappText.replace("{name}", name)
  );

  return (
    <div className="border rounded-lg shadow-sm bg-white dark:bg-slate-900 dark:border-slate-700 overflow-hidden flex">
      {/* FOTO 1/4 — VERTIKAL */}
      <div className="w-1/4 relative min-h-[160px] bg-gray-100 dark:bg-slate-800">
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
          <h3 className="text-xl font-semibold leading-tight text-slate-900 dark:text-slate-50">
            {name}
          </h3>

          <span className="text-xs px-2 py-1 mt-1 inline-block bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded uppercase tracking-wide">
            {role}
          </span>

          <div className="flex items-start mt-3 text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0 text-red-500 dark:text-red-400" />
            <span>{regions.join(", ")}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/${phone}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 transition"
        >
          <Phone className="w-4 h-4" />
          {text.whatsappLabel}
        </a>
      </div>
    </div>
  );
}