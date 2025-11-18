'use client'
import { useState, useMemo } from "react";

// Data Dummy untuk Dependent Dropdown
const locationData = {
  "Jawa Barat": ["Bandung", "Bekasi", "Depok"],
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Barat", "Jakarta Selatan"],
  "Jawa Timur": ["Surabaya", "Malang", "Sidoarjo"],
};

export default function SparepartOrderForm() {
  const [formData, setFormData] = useState({
    // Data Pelanggan & Lokasi
    nama: "",
    nomorRangka: "",
    noHP: "",
    email: "",
    provinsi: "",
    kabupatenKota: "",
    kebutuhanSparepart: "",
    captchaChecked: false,
  });

  // Ambil daftar provinsi dari keys data
  const provinsiOptions = useMemo(() => Object.keys(locationData), []);
  
  // Ambil daftar kabupaten/kota berdasarkan provinsi yang dipilih
  const kabupatenKotaOptions = useMemo(() => {
    return formData.provinsi ? locationData[formData.provinsi] : [];
  }, [formData.provinsi]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Jika ganti provinsi, reset Kabupaten/Kota
    if (name === 'provinsi' && value !== formData.provinsi) {
        setFormData(prevData => ({
            ...prevData,
            provinsi: value,
            kabupatenKota: '', // Reset Kabupaten/Kota
        }));
        return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Order Sparepart Dikirim:", formData);
    alert("Formulir order sparepart Anda telah berhasil dikirim!");
    // Tambahkan logika pengiriman data ke API di sini
  };

  // Tailwind classes dasar
  const inputClass = "mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm";
  const labelClass = "block text-base font-semibold text-red-600 mb-1"; // Label warna merah sesuai gambar
  const sectionTitleClass = "text-xl font-bold text-red-600 mb-4"; // Judul utama

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className={sectionTitleClass}>Data Pelanggan</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Nama */}
          <div>
            <label htmlFor="nama" className={labelClass}>Nama*</label>
            <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} required className={inputClass} placeholder="Nama Anda" />
          </div>
          
          {/* 2. Nomor Rangka */}
          <div>
            <label htmlFor="nomorRangka" className={labelClass}>Nomor Rangka*</label>
            <input type="text" id="nomorRangka" name="nomorRangka" value={formData.nomorRangka} onChange={handleChange} required className={inputClass} placeholder="Nomor Rangka" />
          </div>
          
          {/* 3. No HP */}
          <div>
            <label htmlFor="noHP" className={labelClass}>No HP*</label>
            <input type="tel" id="noHP" name="noHP" value={formData.noHP} onChange={handleChange} required className={inputClass} placeholder="Nomor Handphone Anda" />
          </div>
          
          {/* 4. Email */}
          <div>
            <label htmlFor="email" className={labelClass}>Email*</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="Email Anda" />
          </div>
          
          {/* 5. Provinsi */}
          <div>
            <label htmlFor="provinsi" className={labelClass}>Provinsi*</label>
            <select id="provinsi" name="provinsi" value={formData.provinsi} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Provinsi</option>
              {provinsiOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          {/* 6. Kabupaten/Kota (Dependent Dropdown) */}
          <div>
            <label htmlFor="kabupatenKota" className={labelClass}>Kabupaten/Kota*</label>
            <select 
              id="kabupatenKota" 
              name="kabupatenKota" 
              value={formData.kabupatenKota} 
              onChange={handleChange} 
              required 
              className={inputClass}
              disabled={!formData.provinsi} // Disable jika Provinsi belum dipilih
            >
              <option value="" disabled>Pilih Kabupaten/Kota</option>
              {kabupatenKotaOptions.map(option => <option key={option} value={option}>{option}</option>)}
              {kabupatenKotaOptions.length === 0 && formData.provinsi && <option value="" disabled>Loading...</option>}
            </select>
          </div>
          
          {/* 7. Kebutuhan Sparepart */}
          <div>
            <label htmlFor="kebutuhanSparepart" className={labelClass}>Kebutuhan Sparepart*</label>
            <textarea id="kebutuhanSparepart" name="kebutuhanSparepart" rows="4" value={formData.kebutuhanSparepart} onChange={handleChange} required className={`${inputClass} resize-y`} placeholder="Sampaikan Kebutuhan Sparepart Anda"></textarea>
          </div>

          {/* Captcha Placeholder */}
          <div className="mt-6">
            <div className="flex items-center space-x-2 border border-slate-300 p-3 w-max rounded-md bg-white">
                <input type="checkbox" id="captcha" name="captchaChecked" checked={formData.captchaChecked} onChange={handleChange} required className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"/>
                <label htmlFor="captcha" className="text-sm text-slate-700">I`m not a robot</label>
                <span className="text-xs text-slate-500 ml-4">reCAPTCHA</span>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition-colors mt-8"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
}