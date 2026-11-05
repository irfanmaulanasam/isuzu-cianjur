// app/admin/dashboard/products/edit/[id]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ProductForm from "../../components/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState("");

  // Sesuaikan state persis dengan JSON response dari backend
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    image: "",
    details: { power: "", seats: "", engine: "", tonnage: "", cabinEnd: "" },
    sections: [],
    tco: null
  });

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data produk.");
        const data = await res.json();
        
        // Memasukkan data bersarang langsung ke state
        setFormData({
          name: data.name || "",
          slug: data.slug || "",
          price: data.price || "",
          category: data.category || "",
          image: data.image || "",
          details: data.details || {},
          sections: data.sections || [],
          tco: data.tco || null
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetchingData(false);
      }
    };
    if (id) fetchProductDetail();
  }, [id]);

  // Handler standar untuk field root (name, slug, price, dll)
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handler khusus untuk object 'details'
  const handleDetailChange = (e) => {
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [e.target.name]: e.target.value }
    }));
  };

  // Handler khusus untuk array 'sections' -> 'items'
  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items[itemIndex][field] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiKey = localStorage.getItem("isuzu_admin_key");
    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey || "" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gagal memperbarui produk.");
      router.push("/admin/dashboard/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) return <div className="p-8 text-center">Memuat unit...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header UI tetap sama */}
      <ProductForm 
        formData={formData}
        handleChange={handleChange}
        handleDetailChange={handleDetailChange}
        handleItemChange={handleItemChange}
        handleSubmit={handleSubmit}
        loading={loading}
        isEditMode={true}
      />
    </div>
  );
}