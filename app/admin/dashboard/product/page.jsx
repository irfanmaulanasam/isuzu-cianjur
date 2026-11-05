"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../components/DataTable";
import {productColumns} from "../src/product-list-table-head"

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Asumsi endpoint API untuk produk
        const res = await fetch("http://localhost:3001/api/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return " ↕️";
    return sortConfig.direction === "asc" ? " 🔼" : " 🔽";
  };

  // Logika Sorting Data
  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Manajemen Produk</h1>
        <Link
          href="/admin/dashboard/products/create"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold transition"
        >
          + Tambah Unit Baru
        </Link>
      </div>

      <DataTable 
        loading={loading}
        columns={productColumns}
        data={sortedProducts}
        sortConfig={sortConfig}
        handleSort={handleSort}
        getSortIcon={getSortIcon}
        onDeleteClick={(item) => console.log("Buka modal delete produk:", item.id)}
        // URL prefix untuk link edit produk
        editUrlPrefix="/admin/dashboard/product/edit" 
      />
    </div>
  );
}