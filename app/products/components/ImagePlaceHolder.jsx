'use client';
import Image from "next/image";
import { useState } from "react";

const ImageOrPlaceholder = (image, name) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (!imageError) setImageError(true);
  };

  const showImage = !!image && !imageError;

  if (showImage) {
    return (
      <Image
        src={image}
        alt={name}
        width={400}
        height={300}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={handleImageError}
      />
    );
  }

  return (
    <div className="h-full w-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-center p-3">
      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
        [Gambar {name} Tidak Tersedia]
      </span>
    </div>
  );
};

export default ImageOrPlaceholder;
