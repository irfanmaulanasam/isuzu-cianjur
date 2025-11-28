"use client";

import { MessageCircle, Phone, Tag } from "lucide-react";

export default function OutletCTA({ outletName, address, waNumber, size = "md" }) {
  const btnSize = size === "lg" 
    ? "px-5 py-3 text-base"
    : size === "sm"
    ? "px-3 py-2 text-sm"
    : "px-4 py-2 text-sm";

  const baseStyle =
    "block w-full text-center rounded-md shadow transition font-medium";

  const cekUnitMsg = encodeURIComponent(
    `Halo, saya ingin cek ketersediaan unit di outlet:\n${outletName}\nAlamat: ${address}`
  );

  const consultMsg = encodeURIComponent(
    `Halo, saya ingin konsultasi pembelian di outlet ${outletName}.`
  );

  return (
    <div className="mt-5 space-y-3 w-full">
      {/* Cek Unit */}
      <a
        href={`https://wa.me/${waNumber}?text=${cekUnitMsg}`}
        target="_blank"
        className={`${baseStyle} ${btnSize} bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2`}
      >
        <MessageCircle className="w-4 h-4" />
        Cek Ketersediaan Unit
      </a>

      {/* Konsultasi */}
      <a
        href={`https://wa.me/${waNumber}?text=${consultMsg}`}
        target="_blank"
        className={`${baseStyle} ${btnSize} bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2`}
      >
        <Phone className="w-4 h-4" />
        Hubungi Sales
      </a>

      {/* Promo */}
      <a
        href="/promo"
        className={`${baseStyle} ${btnSize} bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2`}
      >
        <Tag className="w-4 h-4" />
        Lihat Promo Terbaru
      </a>
    </div>
  );
}
