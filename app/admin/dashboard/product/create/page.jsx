// app/admin/dashboard/products/create/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductForm from "../components/ProductForm"; // Sesuaikan path-nya

export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Inisialisasi state dengan template kerangka standar Isuzu
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    category: "GIGA", // Default value
    image: "",
    details: { 
      power: "", 
      seats: "", 
      engine: "", 
      tonnage: "", 
      cabinEnd: "" 
    },
    sections: [
      {
        label: "DIMENSI",
        items: [
          { name: "Panjang", value: "" },
          { name: "Lebar", value: "" },
          { name: "Tinggi", value: "" },
          { name: "Jarak Sumbu", value: "" },
        ]
      },
      {
        label: "MESIN",
        items: [
          { name: "Model", value: "" },
          { name: "Isi Silinder", value: "" },
          { name: "Tenaga Maksimum", value: "" },
          { name: "Torsi Maksimum", value: "" },
        ]
      },
      {
        label: "RODA",
        items: [
          { name: "Ban Depan", value: "" },
          { name: "Ban Belakang", value: "" },
        ]
      },
      {
        label: "TRANSMISI",
        items: [
          { name: "Model", value: "" },
          { name: "Perbandingan Gigi Terakhir", value: "" },
        ]
      },
      {
        label: "BERAT",
        items: [
          { name: "Berat Total Kendaraan", value: "" },
        ]
      }
    ],
    tco: null
  });

  // Handler standar untuk field root (name, slug, price, dll)
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handler khusus untuk object 'details'
  const handleDetailChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [e.target.name]: e.target.value }
    }));
  };

  // Handler khusus untuk array 'sections' -> 'items'
  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items[itemIndex][field] = value;
    setFormData((prev) => ({ ...prev, sections: newSections }));
  };

  // Fungsi Submit menggunakan method POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const apiKey = localStorage.getItem("isuzu_admin_key");

    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "x-api-key": apiKey || "" 
        },
        // Filter out item yang kosong agar database tidak kotor
        body: JSON.stringify({
          ...formData,
          sections: formData.sections.map(section => ({
            ...section,
            items: section.items.filter(item => item.name.trim() !== "" || item.value.trim() !== "")
          }))
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan produk baru.");
      }

      // Redirect kembali ke tabel produk jika berhasil
      router.push("/admin/dashboard/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Tambah Unit Baru
          </h1>
          <p className="text-sm text-slate-500 mt-1">Masukkan spesifikasi kendaraan Isuzu terbaru</p>
        </div>
        <Link
          href="/admin/dashboard/products"
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

      {/* Menggunakan kembali ProductForm yang sudah dibuat */}
      <ProductForm 
        formData={formData}
        handleChange={handleChange}
        handleDetailChange={handleDetailChange}
        handleItemChange={handleItemChange}
        handleSubmit={handleSubmit}
        loading={loading}
        isEditMode={false} // Beri tahu form bahwa ini bukan mode edit
      />
    </div>
  );
}