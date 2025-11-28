'use client'
import Image from "next/image";
import { useState } from "react";

const ImageOrPlaceholder = (image) => {
    const [imageError, setImageError] = useState(false);
    const handleImageError = (e) => {
        // Mencegah looping error jika gambar fallback juga gagal
        if (!imageError) {
            // Kita tidak perlu mengubah e.currentTarget.src karena kita akan menggunakan logika kondisional di JSX
            setImageError(true);
        }
    };
    if (!imageError || image) {
        // Tampilkan Gambar Asli
        return (
            <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError} // Panggil handler jika error
            />
        );
    } else {
        // Tampilkan Placeholder: Kotak abu-abu dengan nama produk
        console.log("lari kesini karena error>", name, 'url image', image, 'apakah error', imageError);
        return (
            <div
                className="h-full w-full bg-slate-200 flex items-center justify-center text-center p-4"
                title={`Placeholder untuk ${name}`}
            >
                <span className="text-sm font-semibold text-slate-700">
                    [Gambar {name} Tidak Tersedia]
                </span>
            </div>
        );
    }
};
export default ImageOrPlaceholder