"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product, onClick }) {
  const [imageError, setImageError] = useState(false);

  const { name, image, details } = product;
  const { price = "-", engine = "-", tonnage = "-" } = details || {};

  const handleImageError = () => setImageError(true);

  return (
    <div
      onClick={onClick}
      className="
        w-[260px] 
        border rounded-xl bg-white shadow-sm hover:shadow-md 
        cursor-pointer overflow-hidden transition
      "
    >
      {/* Gambar FIX HEIGHT */}
      <div className="w-full h-[140px] bg-slate-100 overflow-hidden">
        {!imageError && image ? (
          <Image
            src={image}
            alt={name}
            width={300}
            height={200}
            loading="eager"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-xs text-slate-600">
            Gambar tidak tersedia
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold leading-tight">{name}</h3>
        <p className="text-xs font-bold text-red-600 mt-1">{price}</p>

        <hr className="border-red-500 w-8 my-3" />

        {/* Mini Info */}
        <div className="flex justify-between text-[10px] text-gray-600">
          <p>Engine: <span className="font-semibold">{engine}</span></p>
          <p>Tonase: <span className="font-semibold">{tonnage}</span></p>
        </div>
      </div>
    </div>
  );
}

// 'use client'
// import { motion } from "framer-motion";
// import { useState } from "react";
// import Image from "next/image";

// export default function ProductCard({ product, onClick }) {
//     const [imageError, setImageError] = useState(false);

//     // ... (dekonstruksi produk: name, image, details, dll.)
//     const { name, image, details } = product;

//     // Handler yang dipanggil ketika gambar gagal dimuat
//     const handleImageError = (e) => {
//         // Mencegah looping error jika gambar fallback juga gagal
//         if (!imageError) {
//             // Kita tidak perlu mengubah e.currentTarget.src karena kita akan menggunakan logika kondisional di JSX
//             setImageError(true);
//         }
//     };

//     // Tentukan konten visual
//     const ImageOrPlaceholder = () => {
//         if (!imageError || image) {
//             // Tampilkan Gambar Asli
//             return (
//                 <Image
//                     src={image}
//                     alt={name}
//                     width={300}
//                     height={300}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                     onError={handleImageError} // Panggil handler jika error
//                 />
//             );
//         } else {
//             // Tampilkan Placeholder: Kotak abu-abu dengan nama produk
//             console.log("lari kesini karena error>", name, 'url image', image, 'apakah error', imageError);
//             return (
//                 <div
//                     className="h-full w-full bg-slate-200 flex items-center justify-center text-center p-4"
//                     title={`Placeholder untuk ${name}`}
//                 >
//                     <span className="text-sm font-semibold text-slate-700">
//                         [Gambar {name} Tidak Tersedia]
//                     </span>
//                 </div>
//             );
//         }
//     };
//     const {
//         seats = "-",
//         engine = "-",
//         power = "-",
//         tonnage = "-",
//         cabinEnd = "-",
//         price = "-",
//     } = details || {};
//     const formatPrice = (p) => {
//         if (typeof p === 'string') {
//             return p;
//         }
//         if (Array.isArray(p)) {
//             // Ambil harga pertama (misal: Off The Road)
//             const firstItem = p[0];
//             const value = firstItem ? Object.values(firstItem)[0] : '-';
//             return value;
//         }
//         if (typeof p === 'object' && p !== null) {
//             // Ambil harga pertama dari objek
//             return Object.values(p)[0];
//         }
//         return '-';
//     };

//     return (
//         <motion.div
//             whileHover={{ scale: 1.03 }}
//             onClick={onClick} // Memicu fungsi navigasi dari parent
//             className="border rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden bg-white"
//         >
//             <div className="h-48 w-full overflow-hidden bg-slate-100">
//                 {/* <img src={image} alt="" srcset="" /> */}
//                 {ImageOrPlaceholder()}
//                 {/* {ImageOrPlaceholder()} */}
//             </div>

//             {/* Bagian utama judul dan harga */}
//             <div className="p-4 pt-3 flex flex-col justify-between">
//                 <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
//                     <p className="text-sm font-bold text-gray-800 flex-shrink-0 ml-4">{formatPrice(price)}</p>
//                 </div>

//                 {/* Garis pemisah */}
//                 <hr className="my-2 border-red-500 w-1/4" />
//             </div>

//             {/* Area Detail Teknis (Layout 2x2 atau 3x2) - Mirip dengan gambar */}
//             <div className="grid grid-cols-3 text-center border-t border-gray-200 bg-gray-50/50">

//                 {/* Kolom 1: TEMPAT DUDUK */}
//                 <div className="p-2 border-r border-gray-200">
//                     <p className="text-xs font-medium text-gray-500">TEMPAT DUDUK</p>
//                     <p className="text-base font-semibold text-gray-800">{seats}</p>
//                 </div>

//                 {/* Kolom 2: MESIN */}
//                 <div className="p-2 border-r border-gray-200">
//                     <p className="text-xs font-medium text-gray-500">MESIN</p>
//                     <p className="text-base font-semibold text-gray-800">{engine}</p>
//                 </div>

//                 {/* Kolom 3: TONASE */}
//                 <div className="p-2">
//                     <p className="text-xs font-medium text-gray-500">TONASE</p>
//                     <p className="text-base font-semibold text-gray-800">{tonnage}</p>
//                 </div>

//                 {/* Baris Kedua (opsional) */}
//                 <div className="p-2 border-r border-t border-gray-200">
//                     <p className="text-xs font-medium text-gray-500">TENAGA</p>
//                     <p className="text-base font-semibold text-gray-800">{power}</p>
//                 </div>

//                 <div className="p-2 border-r border-t border-gray-200">
//                     <p className="text-xs font-medium text-gray-500">CABIN-TO-END</p>
//                     <p className="text-base font-semibold text-gray-800">{cabinEnd}</p>
//                 </div>

//                 <div className="p-2 border-t border-gray-200">
//                     <p className="text-xs font-medium text-gray-500"></p>
//                     <p className="text-base font-semibold text-gray-800"></p>
//                 </div>

//             </div>

//         </motion.div>
//     );
// }