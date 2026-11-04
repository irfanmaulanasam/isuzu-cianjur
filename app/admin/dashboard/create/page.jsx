"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State untuk menampung data form
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "news",
    excerpt: "",
    content: "",
    thumbnail: "",
    published: false,
  });

  // Handler untuk mengubah nilai input secara otomatis
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fungsi otomatis membuat slug dari judul (opsional tapi praktis)
  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    const generatedSlug = titleValue
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title: titleValue,
      slug: generatedSlug,
    }));
  };

  // Fungsi submit data ke backend Express
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Ambil API Key dari localStorage yang disimpan saat login
    const apiKey = localStorage.getItem("isuzu_admin_key");

    try {
      const res = await fetch("http://localhost:3001/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey || "",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal menyimpan artikel ke server.");
      }

      // Jika sukses, lempar kembali ke halaman dashboard utama
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Tulis Artikel Baru
        </h1>
        <Link
          href="/admin/dashboard"
          className="text-slate-600 dark:text-slate-300 hover:text-red-600 text-sm font-semibold"
        >
          ← Batal & Kembali
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

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
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            URL Thumbnail (Cloudinary)
          </label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://res.cloudinary.com/.../image.jpg"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
          />
          <p className="text-xs text-slate-500 mt-1">
            *Anda bisa memasukkan URL hasil upload Cloudinary secara manual atau mengosongkannya.
          </p>
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

        {/* KONTEN UTAMA */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Konten Utama (Format Markdown / HTML)
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="12"
            placeholder="# Judul Artikel&#10;&#10;Tulis isi artikel menggunakan format markdown di sini..."
            className="w-full px-4 py-3 font-mono text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
            required
          ></textarea>
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
            {loading ? "Menyimpan..." : "Simpan Artikel"}
          </button>
        </div>

      </form>
    </div>
  );
}