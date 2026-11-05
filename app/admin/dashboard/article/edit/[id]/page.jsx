// app/admin/dashboard/edit/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ArticleForm from "../../../components/ArticleForm"; // Di dalamnya sudah memuat MarkdownEditor

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id;

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "news",
    excerpt: "",
    content: "", // Konten markdown/teks editor akan masuk ke sini
    thumbnail: "",
    published: false,
  });

  // 1. Ambil data artikel lama berdasarkan ID saat halaman edit dibuka
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/articles/${articleId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil data artikel untuk diedit.");
        }

        const data = await res.json();
        
        // Masukkan data lama ke state form, termasuk isi content dari database
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "news",
          excerpt: data.excerpt || "",
          content: data.content || "", // Teks format lama langsung dimuat ke editor
          thumbnail: data.thumbnail || "",
          published: data.published || false,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetchingData(false);
      }
    };

    if (articleId) {
      fetchArticleDetail();
    }
  }, [articleId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: titleValue,
    }));
  };

  // 2. Fungsi submit untuk memperbarui data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiKey = localStorage.getItem("isuzu_admin_key");

    try {
      const res = await fetch(`http://localhost:3001/api/articles/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey || "",
        },
        body: JSON.stringify(formData), // Mengirim data terbaru termasuk hasil editan dari toolbar editor
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal memperbarui artikel.");
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center text-slate-500">
        Memuat data artikel untuk diedit...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Edit Artikel
          </h1>
          <p className="text-sm text-slate-500 mt-1">ID Artikel: {articleId}</p>
        </div>
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

      {/* Memanggil ArticleForm yang di dalamnya sudah tersemat MarkdownEditor */}
      <ArticleForm 
        formData={formData}
        handleChange={handleChange}
        handleTitleChange={handleTitleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        isEditMode={true}
      />
    </div>
  );
}