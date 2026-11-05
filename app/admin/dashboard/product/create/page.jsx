"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductForm from "../components/ProductForm"

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "PICKUP-LCV",
    image: "", // URL dari Media Bucket
    price: "",
    // Ringkasan cepat
    details: { seats: "", engine: "", power: "", tonnage: "", cabinEnd: "" },
    // Spesifikasi dinamis bersarang
    sections: [
      { label: "DIMENSI", items: [{ name: "Panjang", value: "" }] }
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    const generatedSlug = nameValue
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      name: nameValue,
      slug: generatedSlug,
    }));
  };

  // --- LOGIKA DINAMIS UNTUK SECTIONS ---
  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { label: "", items: [{ name: "", value: "" }] }]
    }));
  };

  const removeSection = (sIdx) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, idx) => idx !== sIdx)
    }));
  };

  const handleSectionLabelChange = (sIdx, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sIdx].label = value;
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const addItem = (sIdx) => {
    const updatedSections = [...formData.sections];
    updatedSections[sIdx].items.push({ name: "", value: "" });
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const removeItem = (sIdx, iIdx) => {
    const updatedSections = [...formData.sections];
    updatedSections[sIdx].items = updatedSections[sIdx].items.filter((_, idx) => idx !== iIdx);
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };

  const handleItemChange = (sIdx, iIdx, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sIdx].items[iIdx][field] = value;
    setFormData((prev) => ({ ...prev, sections: updatedSections }));
  };
  // -------------------------------------

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
          "x-api-key": apiKey || "",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal menyimpan produk ke server.");
      }

      router.push("/admin/products");
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
          Tambah Produk Baru
        </h1>
        <Link
          href="/admin/products"
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

      <ProductForm 
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleNameChange={handleNameChange}
        handleSubmit={handleSubmit}
        loading={loading}
        // Props khusus sections
        addSection={addSection}
        removeSection={removeSection}
        handleSectionLabelChange={handleSectionLabelChange}
        addItem={addItem}
        removeItem={removeItem}
        handleItemChange={handleItemChange}
      />
    </div>
  );
}