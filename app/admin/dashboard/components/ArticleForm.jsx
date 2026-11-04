// app/admin/dashboard/components/ArticleForm.jsx
"use client";

import Link from "next/link";
import MarkdownEditor from "./MarkdownEditor";
import ImageUploader from "./ImageUploader";

export default function ArticleForm({ 
  formData, 
  handleChange, 
  handleTitleChange, 
  handleSubmit, 
  loading, 
  isEditMode = false 
}) {
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
      
      {/* JUDUL */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Judul Artikel
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="Contoh: Promo Spesial Isuzu Traga Akhir Tahun..."
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
          required
        />
      </div>

      {/* SLUG & KATEGORI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Slug (URL)
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="promo-spesial-traga"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Kategori
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
          >
            <option value="news">News / Artikel</option>
            <option value="promo">Promo</option>
            <option value="event">Event</option>
          </select>
        </div>
      </div>

      {/* THUMBNAIL URL */}
      <div>
       <ImageUploader 
            thumbnailValue={formData.thumbnail}
            onThumbnailChange={(newUrl) => {
            // Ubah menggunakan handleChange tiruan agar aman dan sinkron dengan parent
            handleChange({
                target: {
                name: "thumbnail",
                value: newUrl
                }
            });
            }}
        />
      </div>

      {/* EXCERPT (RINGKASAN) */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Ringkasan Singkat (Excerpt)
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows="2"
          placeholder="Ringkasan pendek yang muncul di kartu beranda..."
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
        ></textarea>
      </div>

      {/* KONTEN UTAMA - Dibuat lebih natural layaknya ngetik biasa */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Isi Artikel / Konten Utama
        </label>
        
        <MarkdownEditor 
            value={formData.content}
            onChange={handleChange}
            placeholder="Tulis informasi artikel secara mengalir, gunakan tombol di atas untuk Heading, Bold, Italic..."
        />
        
        <p className="text-xs text-slate-500 mt-2">
            *Gunakan tombol toolbar di atas untuk memformat teks, atau klik tab <strong>Preview Langsung</strong> untuk melihat hasil jadinya secara instan.
        </p>
      </div>

      {/* STATUS PUBLISH */}
      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          name="published"
          id="published"
          checked={formData.published}
          onChange={handleChange}
          className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-slate-300"
        />
        <label htmlFor="published" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Publikasikan sekarang (Tampilkan di website publik)
        </label>
      </div>

      {/* TOMBOL AKSI */}
      <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
        <Link
          href="/admin/dashboard"
          className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : isEditMode ? "Perbarui Artikel" : "Simpan Artikel"}
        </button>
      </div>

    </form>
  );
}