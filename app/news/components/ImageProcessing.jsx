// src/components/ArticleImage.jsx

import React from 'react';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

// Komponen ini harus dijalankan di Server Component (default Next.js)
// karena menggunakan 'fs' (Node.js API)
export default function ArticleImage({ src, alt, className = '', width = 800, height = 450 }) {
  // Pastikan src dimulai dengan '/' (misal: /images/news/traga.jpg)
  if (!src || src.startsWith('/')) {
      return null;
  }
    
  // 1. Tentukan path absolut file di sistem (berdasarkan folder public)
  // Perhatian: fs hanya bisa digunakan di Server Component atau API Route
  const publicPath = path.join(process.cwd(), 'public', src);
  
  // 2. Cek keberadaan file gambar
  const imageExists = fs.existsSync(publicPath);

  if (!imageExists) {
    // 3. LOGIKA FALLBACK (jika gambar TIDAK ADA)
    return (
      <div 
        className={`bg-gray-300 flex items-center justify-center text-gray-600 text-center rounded-lg shadow-md border border-dashed border-gray-400 p-8 ${className}`}
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
      >
        <p>🖼️ Placeholder: Gambar belum tersedia ({src})</p>
      </div>
    );
  }

  // 4. LOGIKA NORMAL (jika gambar ADA)
  // Catatan: Gunakan width dan height yang eksplisit di Next/Image
  return (
    <Image 
      src={src} 
      alt={alt} 
      className={`rounded-lg shadow-md ${className}`} 
      width={width} 
      height={height} 
    />
  );
}