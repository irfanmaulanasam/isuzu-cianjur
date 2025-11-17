'use client'
import { useState, useMemo } from "react";

// Data Dummy untuk Dependent Dropdown (Area Outlet -> Outlet)
const outletData = {
  "Jakarta": ["Outlet Pusat Jakarta", "Outlet Jakarta Barat", "Outlet Jakarta Selatan"],
  "Bandung": ["Outlet Dago", "Outlet Pasteur"],
  "Surabaya": ["Outlet Surabaya Timur", "Outlet Surabaya Pusat"],
};

export default function UnitOrderForm() {
  const [formData, setFormData] = useState({
    nama: "",
    namaPerusahaan: "",
    areaOutlet: "",
    outlet: "",
    email: "",
    nomorHp: "",
    waktuPembelian: "",
    tipeKendaraan: "",
    aplikasi: "",
    captchaChecked: false,
  });

  // Ambil daftar Area Outlet dari keys data
  const areaOutletOptions = useMemo(() => Object.keys(outletData), []);
  
  // Ambil daftar Outlet berdasarkan Area Outlet yang dipilih (Dependent Dropdown)
  const outletOptions = useMemo(() => {
    return formData.areaOutlet ? outletData[formData.areaOutlet] : [];
  }, [formData.areaOutlet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Jika ganti Area Outlet, reset Outlet
    if (name === 'areaOutlet' && value !== formData.areaOutlet) {
        setFormData(prevData => ({
            ...prevData,
            areaOutlet: value,
            outlet: '', // Reset Outlet
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
    console.log("Data Order Unit Dikirim:", formData);
    alert("Formulir order unit Anda telah berhasil dikirim!");
    // Tambahkan logika pengiriman data ke API di sini
  };

  // Data dummy untuk dropdown lainnya
  const waktuPembelianOptions = ["Kurang dari 1 bulan", "1-3 bulan", "3-6 bulan", "Lebih dari 6 bulan"];
  const tipeKendaraanOptions = ["MPV", "SUV", "Hatchback", "Sedan", "Truk"];
  const aplikasiOptions = ["Website", "Iklan Media Sosial", "Rekomendasi Teman", "Aplikasi Mobile"];

  // Tailwind classes dasar
  const inputClass = "mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm";
  const labelClass = "block text-base font-semibold text-slate-800 mb-1";
  const sectionTitleClass = "text-xl font-bold text-red-600 mb-4";

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className={sectionTitleClass}>Formulir Order Unit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Nama */}
          <div>
            <label htmlFor="nama" className={labelClass}>Nama*</label>
            <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} required className={inputClass} placeholder="Nama Anda" />
          </div>
          
          {/* 2. Nama Perusahaan (Tidak wajib, sesuai gambar) */}
          <div>
            <label htmlFor="namaPerusahaan" className={labelClass}>Nama Perusahaan</label>
            <input type="text" id="namaPerusahaan" name="namaPerusahaan" value={formData.namaPerusahaan} onChange={handleChange} className={inputClass} placeholder="Nama Perusahaan Anda" />
          </div>
          
          {/* 3. Area Outlet */}
          <div>
            <label htmlFor="areaOutlet" className={labelClass}>Area Outlet*</label>
            <select id="areaOutlet" name="areaOutlet" value={formData.areaOutlet} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Kota</option>
              {areaOutletOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          {/* 4. Outlet (Dependent Dropdown) */}
          <div>
            <label htmlFor="outlet" className={labelClass}>Outlet*</label>
            <select 
              id="outlet" 
              name="outlet" 
              value={formData.outlet} 
              onChange={handleChange} 
              required 
              className={inputClass}
              disabled={!formData.areaOutlet} // Disable jika Area Outlet belum dipilih
            >
              <option value="" disabled>Pilih Outlet</option>
              {outletOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          {/* 5. Email */}
          <div>
            <label htmlFor="email" className={labelClass}>Email*</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="Email Anda" />
          </div>
          
          {/* 6. Nomor Hp */}
          <div>
            <label htmlFor="nomorHp" className={labelClass}>Nomor Hp*</label>
            <input type="tel" id="nomorHp" name="nomorHp" value={formData.nomorHp} onChange={handleChange} required className={inputClass} placeholder="Nomor HP Anda" />
          </div>
          
          {/* 7. Waktu Perkiraan Pembelian Mobil */}
          <div>
            <label htmlFor="waktuPembelian" className={labelClass}>Waktu Perkiraan Pembelian Mobil*</label>
            <select id="waktuPembelian" name="waktuPembelian" value={formData.waktuPembelian} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Waktu Perkiraan Pembelian Mobil</option>
              {waktuPembelianOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          {/* 8. Tipe Kendaraan */}
          <div>
            <label htmlFor="tipeKendaraan" className={labelClass}>Tipe Kendaraan*</label>
            <select id="tipeKendaraan" name="tipeKendaraan" value={formData.tipeKendaraan} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Tipe Kendaraan</option>
              {tipeKendaraanOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          {/* 9. Aplikasi/Sumber Informasi */}
          <div>
            <label htmlFor="aplikasi" className={labelClass}>Aplikasi*</label>
            <select id="aplikasi" name="aplikasi" value={formData.aplikasi} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Aplikasi</option>
              {aplikasiOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
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