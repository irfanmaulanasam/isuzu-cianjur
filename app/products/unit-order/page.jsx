'use client'
import { useState, useMemo } from "react";
import { useSmartOTP } from "@/hooks/useSmartOtp";
import { getProductTitle } from "@/src/lib/getProductTitle";
import Breadcrumb from "@/app/components/Breadcrumb";

// Perbaiki struktur outletData menjadi object
const outletData = {
  "Jakarta": ["Isuzu Jakarta 1", "Isuzu Jakarta 2", "Isuzu Jakarta 3"],
  "Bandung": ["Isuzu Bandung 1", "Isuzu Bandung 2"],
  "Surabaya": ["Isuzu Surabaya 1", "Isuzu Surabaya 2"],
  "Medan": ["Isuzu Medan 1", "Isuzu Medan 2"]
};

export default function UnitOrderForm() {
  const { isVerified, showOtpModal, setShowOtpModal, markAsVerified } = useSmartOTP();
  
  const [formData, setFormData] = useState({
    nama: "",
    namaPerusahaan: "",
    email: "",
    nomorHp: "",
    waktuPembelian: "",
    tipeKendaraan: "",
    aplikasi: "",
    captchaChecked: false,
    areaOutlet: "", // Tambahkan state untuk areaOutlet
    outlet: ""
  });

  // Ambil daftar Area Outlet dari keys data
  const areaOutletOptions = useMemo(() => Object.keys(outletData), []);

  // Ambil daftar Outlet berdasarkan Area Outlet yang dipilih
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
    
    // Cek verifikasi OTP sebelum submit
    if (!isVerified) {
      setShowOtpModal(true);
      return;
    }

    console.log("Data Order Unit Dikirim:", formData);
    alert("Formulir order unit Anda telah berhasil dikirim!");
    // Tambahkan logika pengiriman data ke API di sini
  };

  const handleOtpVerification = () => {
    // Verifikasi OTP (dummy function - ganti dengan logic OTP sesungguhnya)
    markAsVerified(formData.nomorHp);
  };

  // Data untuk dropdown
  const waktuPembelianOptions = ["Kurang dari 1 bulan", "1-3 bulan", "3-6 bulan", "Lebih dari 6 bulan"];
  const tipeKendaraanOptions = getProductTitle();
  const aplikasiOptions = ["Website", "Iklan Media Sosial", "Rekomendasi Teman", "Aplikasi Mobile"];

  // Tailwind classes
  const inputClass = "bg-bahana mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm";
  const labelClass = "block text-base font-semibold text-slate-800 mb-1";
  const sectionTitleClass = "text-xl font-bold text-blue-600 mb-4";

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-xl">
      <Breadcrumb />
        <h2 className={sectionTitleClass}>Formulir Order Unit</h2>
        
        {/* Modal OTP */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Verifikasi Nomor Telepon</h3>
              <p className="mb-4">Kami akan mengirim kode OTP ke {formData.nomorHp}</p>
              
              {/* Tambahkan input OTP di sini */}
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="Masukkan kode OTP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={handleOtpVerification}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  Verifikasi
                </button>
                <button 
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Nama */}
          <div>
            <label htmlFor="nama" className={labelClass}>Nama*</label>
            <input 
              type="text" 
              id="nama" 
              name="nama" 
              value={formData.nama} 
              onChange={handleChange} 
              required 
              className={inputClass} 
              placeholder="Nama Anda" 
            />
          </div>

          {/* 2. Nama Perusahaan */}
          <div>
            <label htmlFor="namaPerusahaan" className={labelClass}>Nama Perusahaan</label>
            <input 
              type="text" 
              id="namaPerusahaan" 
              name="namaPerusahaan" 
              value={formData.namaPerusahaan} 
              onChange={handleChange} 
              className={inputClass} 
              placeholder="Nama Perusahaan Anda" 
            />
          </div>

          {/* 3. Area Outlet */}
          <div>
            <label htmlFor="areaOutlet" className={labelClass}>Area Outlet*</label>
            <select 
              id="areaOutlet" 
              name="areaOutlet" 
              value={formData.areaOutlet} 
              onChange={handleChange} 
              required 
              className={inputClass}
            >
              <option value="" disabled>Pilih Kota</option>
              {areaOutletOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
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
              disabled={!formData.areaOutlet}
            >
              <option value="" disabled>Pilih Outlet</option>
              {outletOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* 5. Email */}
          <div>
            <label htmlFor="email" className={labelClass}>Email*</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className={inputClass} 
              placeholder="Email Anda" 
            />
          </div>

          {/* 6. Nomor Hp */}
          <div>
            <label htmlFor="nomorHp" className={labelClass}>Nomor Hp*</label>
            <input 
              type="tel" 
              id="nomorHp" 
              name="nomorHp" 
              value={formData.nomorHp} 
              onChange={handleChange} 
              required 
              className={inputClass} 
              placeholder="Nomor HP Anda" 
            />
          </div>

          {/* 7. Waktu Perkiraan Pembelian */}
          <div>
            <label htmlFor="waktuPembelian" className={labelClass}>Waktu Perkiraan Pembelian Mobil*</label>
            <select 
              id="waktuPembelian" 
              name="waktuPembelian" 
              value={formData.waktuPembelian} 
              onChange={handleChange} 
              required 
              className={inputClass}
            >
              <option value="" disabled>Pilih Waktu Perkiraan Pembelian Mobil</option>
              {waktuPembelianOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* 8. Tipe Kendaraan */}
          <div>
            <label htmlFor="tipeKendaraan" className={labelClass}>Tipe Kendaraan*</label>
            <select 
              id="tipeKendaraan" 
              name="tipeKendaraan" 
              value={formData.tipeKendaraan} 
              onChange={handleChange} 
              required 
              className={inputClass}
            >
              <option value="" disabled>Pilih Tipe Kendaraan</option>
              {tipeKendaraanOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* 9. Aplikasi/Sumber Informasi */}
          <div>
            <label htmlFor="aplikasi" className={labelClass}>Aplikasi*</label>
            <select 
              id="aplikasi" 
              name="aplikasi" 
              value={formData.aplikasi} 
              onChange={handleChange} 
              required 
              className={inputClass}
            >
              <option value="" disabled>Pilih Aplikasi</option>
              {aplikasiOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Captcha */}
          <div className="mt-6">
            <div className="flex items-center space-x-2 border border-slate-300 p-3 w-max rounded-md bg-white">
              <input 
                type="checkbox" 
                id="captcha" 
                name="captchaChecked" 
                checked={formData.captchaChecked} 
                onChange={handleChange} 
                required 
                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="captcha" className="text-sm text-slate-700">Im not a robot</label>
              <span className="text-xs text-slate-500 ml-4">reCAPTCHA</span>
            </div>
          </div>

          {/* Tombol Submit */}
          <button 
            type="submit" 
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition-colors mt-8"
          >
            {isVerified ? "SUBMIT" : "VERIFIKASI NOMOR HP"}
          </button>
        </form>
      </div>
    </section>
  );
}