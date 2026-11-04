"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Mengambil ID dari URL

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "news",
    excerpt: "",
    content: "",
    thumbnail: "",
    published: false,
  });

  // 1. Ambil data artikel lama berdasarkan ID saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/articles`);
        if (res.ok) {
          const articles = await res.json();
          // Cari artikel yang ID-nya cocok
          const currentArticle = articles.find((art) => art.id.toString() === id);
          if (currentArticle) {
            setFormData({
              title: currentArticle.title || "",
              slug: currentArticle.slug || "",
              category: currentArticle.category || "news",
              excerpt: currentArticle.excerpt || "",
              content: currentArticle.content || "",
              thumbnail: currentArticle.thumbnail || "",
              published: currentArticle.published || false,
            });
          } else {
            setError("Artikel tidak ditemukan di database.");
          }
        }
      } catch (err) {
        setError("Gagal memuat data artikel.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticleDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 2. Fungsi Kirim Data Perubahan (PUT / PATCH ke Backend)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const apiKey = localStorage.getItem("isuzu_admin_key");

    try {
      const res = await fetch(`http://localhost:3001/api/articles/${id}`, {
        method: "PUT", // Atau PATCH tergantung route di backend Anda
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey || "",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal memperbarui artikel.");
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Memuat data editor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Edit Artikel (ID: {id})
        </h1>
        <Link href="/admin/dashboard" className="text-slate-600 dark:text-slate-300 hover:text-red-600 text-sm font-semibold">
          ← Batal & Kembali
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleUpdate} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Judul Artikel</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Slug (URL)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Kategori</label>
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

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">URL Thumbnail</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ringkasan (Excerpt)</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Konten Utama (Markdown)</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="12"
            className="w-full px-4 py-3 font-mono text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
            required
          ></textarea>
        </div>

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
            Publikasikan di website
          </label>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
          <Link href="/admin/dashboard" className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 dark:text-slate-300 font-semibold">
            Batal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
          >
            {saving ? "Menyimpan Perubahan..." : "Update Artikel"}
          </button>
        </div>
      </form>
    </div>
  );
}