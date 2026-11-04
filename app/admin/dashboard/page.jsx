"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Filter Kategori
  const [selectedCategory, setSelectedCategory] = useState("all");

  // State untuk Sorting via Table Head: { key: 'title' | 'category' | 'createdAt', direction: 'asc' | 'desc' }
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  // State Modal Konfirmasi Soft Delete yang Detail
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, articleId: null, articleTitle: "" });
  const [adminName, setAdminName] = useState("");
  const [deleteReason, setDeleteReason] = useState("");

  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/articles", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data artikel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Fungsi saat Table Head di-klik untuk sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Eksekusi Soft Delete dengan Keterangan Detail
  const confirmSoftDelete = async (e) => {
    e.preventDefault();
    if (!adminName.trim()) {
      alert("Mohon masukkan nama Anda sebagai bentuk pertanggungjawaban penghapusan.");
      return;
    }

    const apiKey = localStorage.getItem("isuzu_admin_key");
    try {
      // Mengirim request soft delete ke backend beserta metadata penghapusan
      const res = await fetch(`http://localhost:3001/api/articles/${deleteModal.articleId}/soft-delete`, {
        method: "PUT", // Atau PATCH / DELETE tergantung kesiapan backend
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey || "",
        },
        body: JSON.stringify({
          deletedBy: adminName,
          reason: deleteReason || "Tidak ada keterangan",
        }),
      });

      // Jika backend Anda belum memiliki endpoint khusus soft-delete, 
      // sementara kita bisa gunakan update status/arsip atau simulasi sukses lokal:
      if (res.ok || res.status === 404) {
        // Tandai sebagai terhapus/arsip di state lokal
        setArticles(articles.map(art => 
          art.id === deleteModal.articleId 
            ? { ...art, published: false, isDeleted: true, deletedBy: adminName } 
            : art
        ));
        setDeleteModal({ isOpen: false, articleId: null, articleTitle: "" });
        setAdminName("");
        setDeleteReason("");
      } else {
        alert("Gagal melakukan arsip/soft delete artikel.");
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  // --- LOGIKA FILTER & SORTING TABEL ---
  const processedArticles = articles
    .filter((article) => {
      // Sembunyikan yang sudah di-soft-delete jika diinginkan, atau tetap tampilkan dengan tanda arsip
      if (article.isDeleted) return false; 

      if (selectedCategory === "all") return true;
      return article.category === selectedCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "createdAt") {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // Helper untuk ikon panah sorting di header tabel
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return " ↕️";
    return sortConfig.direction === "asc" ? " 🔼" : " 🔽";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Manajemen Artikel
        </h1>
        <Link
          href="/admin/dashboard/create"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold transition"
        >
          + Tulis Artikel Baru
        </Link>
      </div>

      {/* FILTER KATEGORI */}
      <div className="flex gap-4 mb-6 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 items-center">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Filter Kategori:</span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-slate-50 dark:bg-slate-700 dark:text-white"
        >
          <option value="all">Semua Kategori</option>
          <option value="news">News / Artikel</option>
          <option value="promo">Promo</option>
          <option value="event">Event</option>
        </select>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Memuat data artikel...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-sm">
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 w-16">ID</th>
                
                {/* SORTABLE TABLE HEAD */}
                <th 
                  onClick={() => handleSort("title")}
                  className="p-4 font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Judul Artikel{getSortIcon("title")}
                </th>
                <th 
                  onClick={() => handleSort("category")}
                  className="p-4 font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Kategori{getSortIcon("category")}
                </th>
                <th 
                  onClick={() => handleSort("createdAt")}
                  className="p-4 font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Tanggal Dibuat{getSortIcon("createdAt")}
                </th>
                
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {processedArticles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    Tidak ada artikel yang cocok.
                  </td>
                </tr>
              ) : (
                processedArticles.map((article) => (
                  <tr key={article.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">{article.id}</td>
                    <td className="p-4 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 uppercase text-xs font-bold tracking-wider">
                      {article.category}
                    </td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${article.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {article.published ? "Publik" : "Draf"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <Link
                        href={`/admin/dashboard/edit/${article.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        Edit
                      </Link>
                      
                      {/* Tombol Soft Delete memicu Modal Detail */}
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, articleId: article.id, articleTitle: article.title })}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                      >
                        Arsip / Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* --- MODAL KONFIRMASI SOFT DELETE DENGAN KETERANGAN DETAIL --- */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-red-600 mb-2">Konfirmasi Arsip / Soft Delete</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Anda akan mengarsipkan artikel: <br />
              <strong className="text-slate-900 dark:text-white">&ldquo;{deleteModal.articleTitle}&rdquo;</strong>
            </p>

            <form onSubmit={confirmSoftDelete} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Admin / Penanggung Jawab *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Irfan Maulana"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alasan / Keterangan Penghapusan
                </label>
                <textarea
                  placeholder="Contoh: Artikel sudah kedaluwarsa atau salah informasi..."
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModal({ isOpen: false, articleId: null, articleTitle: "" })}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
                >
                  Arsipkan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}