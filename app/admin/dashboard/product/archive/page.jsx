"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductArchivePage() {
  const [trashProducts, setTrashProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    const apiKey = localStorage.getItem("isuzu_admin_key");
    try {
      const res = await fetch("http://localhost:3001/api/products/trash", {
        headers: { "x-api-key": apiKey || "" },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setTrashProducts(data);
      }
    } catch (error) {
      console.error("Gagal memuat arsip produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id) => {
    if (!confirm("Pulihkan produk ini kembali aktif?")) return;
    const apiKey = localStorage.getItem("isuzu_admin_key");

    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}/restore`, {
        method: "PUT",
        headers: { "x-api-key": apiKey || "" },
      });
      if (res.ok) {
        setTrashProducts(trashProducts.filter((p) => p.id !== id));
        alert("Produk berhasil dipulihkan!");
      }
    } catch (err) {
      alert("Gagal memulihkan produk.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Arsip Sampah Produk</h1>
        <Link href="/admin/dashboard/product" className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold">
          ← Kembali ke Daftar Produk
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Memuat arsip...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b text-sm">
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Dihapus Oleh</th>
                <th className="p-4">Alasan</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {trashProducts.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-slate-500">Arsip produk kosong.</td></tr>
              ) : (
                trashProducts.map((p) => (
                  <tr key={p.id} className="border-b text-sm">
                    <td className="p-4 font-medium">{p.title || p.name}</td>
                    <td className="p-4 font-semibold">{p.deletedBy || "Admin"}</td>
                    <td className="p-4 italic text-slate-500">&ldquo;{p.deleteReason || "-"}&rdquo;</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleRestore(p.id)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
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