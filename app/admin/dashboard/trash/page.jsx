"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrashPage() {
  const [deletedArticles, setDeletedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data artikel yang di-soft-delete
  const fetchTrashArticles = async () => {
    const apiKey = localStorage.getItem("isuzu_admin_key");
    try {
      const res = await fetch("http://localhost:3001/api/articles/trash", {
        headers: { "x-api-key": apiKey || "" },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setDeletedArticles(data);
      }
    } catch (error) {
      console.error("Gagal memuat data sampah:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashArticles();
  }, []);

  // Fungsi untuk memulihkan artikel (Restore)
  const handleRestore = async (id) => {
    if (!confirm("Apakah Anda yakin ingin memulihkan artikel ini?")) return;

    const apiKey = localStorage.getItem("isuzu_admin_key");
    try {
      const res = await fetch(`http://localhost:3001/api/articles/${id}/restore`, {
        method: "PUT",
        headers: { "x-api-key": apiKey || "" },
      });

      if (res.ok) {
        // Hapus dari state lokal trash agar langsung hilang dari daftar sampah
        setDeletedArticles(deletedArticles.filter((art) => art.id !== id));
        alert("Artikel berhasil dipulihkan ke beranda!");
      } else {
        alert("Gagal memulihkan artikel.");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Arsip Sampah (Trash)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Daftar artikel yang telah di-soft-delete beserta rekam jejak penghapusannya.
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-300 transition"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Memuat data arsip...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-sm">
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Judul Artikel</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Dihapus Oleh</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Alasan Penghapusan</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Waktu Hapus</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {deletedArticles.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    Tidak ada artikel di dalam sampah.
                  </td>
                </tr>
              ) : (
                deletedArticles.map((article) => (
                  <tr key={article.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      {article.title}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">
                      {article.deletedBy || "Tidak diketahui"}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 italic">
                      &ldquo;{article.deleteReason || "Tanpa alasan"}&rdquo;
                    </td>
                    <td className="p-4 text-slate-500">
                      {article.deletedAt ? new Date(article.deletedAt).toLocaleString("id-ID") : "-"}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRestore(article.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg font-semibold text-xs transition"
                      >
                        🔄 Pulihkan
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}