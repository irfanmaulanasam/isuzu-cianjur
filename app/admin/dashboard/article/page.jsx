"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ToastNotification from "../components/ToastNotification";
import DeleteModal from "../components/DeleteModal";
import CategoryFilter from "../components/CategoryFilter";
import DataTable from "../components/DataTable";
import { articleColumns } from "../src/article-list-table-head";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, articleId: null, articleTitle: "" });
  const [adminName, setAdminName] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", time: "", type: "success" });

  const triggerToast = (message, type = "success") => {
    const currentTime = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
    setToast({ show: true, message, time: currentTime, type });
    setTimeout(() => {
      setToast({ show: false, message: "", time: "", type: "success" });
    }, 5000);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/articles", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
        triggerToast("Gagal memuat data dari server.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const confirmSoftDelete = async (e) => {
    e.preventDefault();
    if (!adminName.trim()) {
      alert("Mohon masukkan nama Anda sebagai bentuk pertanggungjawaban.");
      return;
    }

    setIsSubmitting(true);
    const apiKey = localStorage.getItem("isuzu_admin_key");
    
    try {
      const res = await fetch(`http://localhost:3001/api/articles/${deleteModal.articleId}/soft-delete`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json", "x-api-key": apiKey || "" },
        body: JSON.stringify({ deletedBy: adminName, reason: deleteReason || "Tidak ada keterangan" }),
      });

      if (res.ok || res.status === 404) {
        setArticles(articles.map(art => 
          art.id === deleteModal.articleId ? { ...art, published: false, isDeleted: true, deletedBy: adminName } : art
        ));
        setDeleteModal({ isOpen: false, articleId: null, articleTitle: "" });
        setAdminName("");
        setDeleteReason("");
        triggerToast("Artikel berhasil diarsipkan.", "success");
      } else {
        const errData = await res.json().catch(() => ({}));
        triggerToast(errData.message || "Gagal melakukan arsip artikel.", "error");
      }
    } catch (err) {
      triggerToast("Terjadi kesalahan jaringan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter & Sorting Logic
  const processedArticles = articles
    .filter((article) => {
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
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return " ↕️";
    return sortConfig.direction === "asc" ? " 🔼" : " 🔽";
  };

  const categoryOptions = [
    { value: "news", label: "News / Artikel" },
    { value: "promo", label: "Promo" },
    { value: "event", label: "Event" },
  ];

  return (
    <div className="relative">
      <ToastNotification toast={toast} />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Daftar Artikel
        </h1>
        <Link
          href="/admin/dashboard/create"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold transition"
        >
          + Tulis Artikel Baru
        </Link>
      </div>

      <CategoryFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categoryOptions}
      />

      <DataTable 
        loading={loading}
        columns={articleColumns}
        data={processedArticles}
        sortConfig={sortConfig}
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        onDeleteClick={(item) => setDeleteModal({ isOpen: true, articleId: item.id, articleTitle: item.title })}
        editUrlPrefix="/admin/dashboard/article/edit"
      />

      <DeleteModal 
        isOpen={deleteModal.isOpen}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        adminName={adminName}
        setAdminName={setAdminName}
        deleteReason={deleteReason}
        setDeleteReason={setDeleteReason}
        isSubmitting={isSubmitting}
        confirmSoftDelete={confirmSoftDelete}
      />
    </div>
  );
}