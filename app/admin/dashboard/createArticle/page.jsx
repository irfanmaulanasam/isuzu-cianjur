"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArticleForm from "../components/ArticleForm";

export default function CreateArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

      <ArticleForm 
        formData={formData}
        handleChange={handleChange}
        handleTitleChange={handleTitleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        isEditMode={false}
      />
    </div>
  );
}