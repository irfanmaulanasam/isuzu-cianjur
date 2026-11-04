"use client";

import { useState, useEffect } from "react";

export default function ImageUploader({ thumbnailValue, onThumbnailChange }) {
  const [uploading, setUploading] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  // 1. Handler saat admin memilih file gambar dari komputer
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file); // Sesuai dengan middleware upload.single('image')

    const apiKey = localStorage.getItem("isuzu_admin_key");

    try {
      const res = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        headers: {
          "x-api-key": apiKey || "",
        },
        body: formData, // Mengirim bentuk FormData (bukan JSON)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunggah gambar");

      // Masukkan URL aman dari Cloudinary ke state utama thumbnail
      onThumbnailChange(data.url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  // 2. Fungsi untuk mengambil daftar galeri gambar yang sudah pernah di-upload
  const fetchImageGallery = async () => {
    setGalleryModalOpen(true);
    setLoadingGallery(true);
    const apiKey = localStorage.getItem("isuzu_admin_key");

    try {
      const res = await fetch("http://localhost:3001/api/images", {
        headers: {
          "x-api-key": apiKey || "",
        },
      });
      const result = await res.json();
      if (res.ok) {
        setImageList(result.data || []);
      }
    } catch (err) {
      console.error("Gagal memuat galeri gambar", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        Thumbnail / Gambar Artikel
      </label>

      {/* Input URL Manual / Hasil Upload */}
      <div className="flex gap-2">
        <input
          type="text"
          value={thumbnailValue}
          onChange={(e) => onThumbnailChange(e.target.value)}
          placeholder="https://res.cloudinary.com/.../image.jpg"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-slate-50 dark:bg-slate-700 dark:text-white"
        />
      </div>

      {/* Tombol Aksi: Upload File Lokal atau Pilih dari Galeri Server */}
      <div className="flex flex-wrap items-center gap-3">
        <label className={`cursor-pointer px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-semibold transition flex items-center gap-2 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          <span>{uploading ? "⏳ Mengunggah..." : "📁 Upload dari Komputer"}</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>

        <button
          type="button"
          onClick={fetchImageGallery}
          className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100 transition"
        >
          🖼️ Pilih dari Galeri Server
        </button>
      </div>

      {/* Kotak Preview Gambar */}
      {thumbnailValue && (
        <div className="relative mt-2 w-full h-48 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
            src={thumbnailValue} 
            alt="Preview Thumbnail" 
            className="object-cover w-full h-full"
            onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Gagal+Memuat+Gambar"; }}
            />
            <button
            type="button"
            onClick={() => onThumbnailChange("")}
            className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full text-xs shadow hover:bg-red-700 transition"
            title="Hapus Gambar"
            >
            ✕
            </button>
        </div>
       )}

      {/* MODAL PILIH DARI GALERI SERVER */}
      {galleryModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-700 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Pilih Gambar dari Galeri</h3>
              <button 
                type="button" 
                onClick={() => setGalleryModalOpen(false)}
                className="text-slate-500 hover:text-slate-700 text-sm font-bold"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="overflow-y-auto flex-1 grid grid-cols-3 gap-3 pr-2">
              {loadingGallery ? (
                <div className="col-span-3 py-8 text-center text-slate-500 text-sm">Memuat galeri gambar...</div>
              ) : imageList.length === 0 ? (
                <div className="col-span-3 py-8 text-center text-slate-500 text-sm">Belum ada gambar di server.</div>
              ) : (
                imageList.map((img) => (
                  <div 
                    key={img.public_id}
                    onClick={() => {
                      onThumbnailChange(img.url);
                      setGalleryModalOpen(false);
                    }}
                    className="cursor-pointer group relative rounded-lg border border-slate-200 dark:border-slate-700 overflow-hiden h-28 bg-slate-100 dark:bg-slate-900 hover:border-red-500 transition"
                  >
                    {imageList.map((img) => (
                    <div 
                        key={img.public_id}
                        onClick={() => {
                        onThumbnailChange(img.url);
                        setGalleryModalOpen(false);
                        }}
                        className="cursor-pointer group relative rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden h-28 bg-slate-100 dark:bg-slate-900 hover:border-red-500 transition"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt="Gallery item" className="object-cover w-full h-full group-hover:scale-105 transition duration-300" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold">
                        Pilih Gambar
                        </div>
                    </div>
                    ))}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold">
                      Pilih Gambar
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}