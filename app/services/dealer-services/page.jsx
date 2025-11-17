'use client'
import { useState } from "react";

export default function BookingServiceForm() {
  const [formData, setFormData] = useState({
    // Data Pelanggan
    nama: "",
    telepon: "",
    email: "",
    alamat: "",
    
    // Profil Unit
    jenisMobil: "",
    tahunMobil: "",
    nomorPolisi: "",
    
    // Data Layanan
    provinsi: "",
    bengkel: "",
    jenisService: "",
    tanggalBooking: "",
    jamBooking: "",
    keluhan: "",
    
    // Captcha tidak diimplementasikan penuh, hanya placeholder
    captchaChecked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // LOGIKA PENGIRIMAN DATA FORM KE BACKEND DI SINI
    console.log("Data Booking Dikirim:", formData);
    alert("Formulir booking Anda telah berhasil dikirim!");

    // Biasanya, setelah sukses kirim data, form akan di-reset atau dialihkan
    // setFormData(/* reset data di sini */); 
  };
  
  // Data dummy untuk dropdown
  const jenisMobilOptions = ["Toyota Avanza", "Honda Brio", "Mitsubishi Xpander"];
  const tahunMobilOptions = ["2024", "2023", "2022"];
  const provinsiOptions = ["DKI Jakarta", "Jawa Barat", "Jawa Timur"];
  const bengkelOptions = ["Bengkel A - Jakarta", "Bengkel B - Bandung", "Bengkel C - Surabaya"];
  const jenisServiceOptions = ["Service Rutin", "Ganti Oli", "Perbaikan Rem", "Service Berat"];
  const jamBookingOptions = ["09:00", "10:00", "11:00", "13:00", "14:00"];


  // Tailwind classes dasar untuk input
  const inputClass = "mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-600 focus:border-red-600 sm:text-sm";
  const labelClass = "block text-base font-semibold text-slate-800 mb-1";
  const sectionTitleClass = "text-xl font-bold text-bahana-light mt-6 mb-3 border-b-2 border-bahana-light pb-1";

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-slate-800">
          Formulir Booking Service
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Bagian 1: Data Pelanggan */}
          <h2 className={sectionTitleClass}>Data Pelanggan</h2>
          
          <div>
            <label htmlFor="nama" className={labelClass}>Nama*</label>
            <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} required className={inputClass} placeholder="Nama Anda" />
          </div>
          
          <div>
            <label htmlFor="telepon" className={labelClass}>Telepon*</label>
            <input type="tel" id="telepon" name="telepon" value={formData.telepon} onChange={handleChange} required className={inputClass} placeholder="Telepon Anda" />
          </div>
          
          <div>
            <label htmlFor="email" className={labelClass}>Email*</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="Email Anda" />
          </div>
          
          <div>
            <label htmlFor="alamat" className={labelClass}>Alamat*</label>
            <textarea id="alamat" name="alamat" rows="3" value={formData.alamat} onChange={handleChange} required className={`${inputClass} resize-y`} placeholder="Alamat Anda"></textarea>
          </div>

          ---
          
          {/* Bagian 2: Profil Unit */}
          <h2 className={sectionTitleClass}>Profil Unit</h2>
          
          <div>
            <label htmlFor="jenisMobil" className={labelClass}>Jenis Mobil*</label>
            <select id="jenisMobil" name="jenisMobil" value={formData.jenisMobil} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Jenis Mobil</option>
              {jenisMobilOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          <div>
            <label htmlFor="tahunMobil" className={labelClass}>Tahun Mobil*</label>
            <select id="tahunMobil" name="tahunMobil" value={formData.tahunMobil} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Tahun Mobil</option>
              {tahunMobilOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          <div>
            <label htmlFor="nomorPolisi" className={labelClass}>Nomor Polisi*</label>
            <input type="text" id="nomorPolisi" name="nomorPolisi" value={formData.nomorPolisi} onChange={handleChange} required className={inputClass} placeholder="Nomor Polisi Kendaraan Anda" />
          </div>

          ---

          {/* Bagian 3: Data Layanan */}
          <h2 className={sectionTitleClass}>Data Layanan</h2>

          <div>
            <label htmlFor="provinsi" className={labelClass}>Provinsi*</label>
            <select id="provinsi" name="provinsi" value={formData.provinsi} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Provinsi</option>
              {provinsiOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          <div>
            <label htmlFor="bengkel" className={labelClass}>Bengkel*</label>
            <select id="bengkel" name="bengkel" value={formData.bengkel} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Bengkel</option>
              {bengkelOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          
          <div>
            <label htmlFor="jenisService" className={labelClass}>Jenis Service*</label>
            <select id="jenisService" name="jenisService" value={formData.jenisService} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Pilih Jenis Service</option>
              {jenisServiceOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          {/* Tanggal dan Jam Booking (dalam satu baris) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="tanggalBooking" className={labelClass}>Tanggal Booking*</label>
              <input type="date" id="tanggalBooking" name="tanggalBooking" value={formData.tanggalBooking} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="flex-1">
              <label htmlFor="jamBooking" className={labelClass}>Jam*</label>
              <select id="jamBooking" name="jamBooking" value={formData.jamBooking} onChange={handleChange} required className={inputClass}>
                <option value="" disabled>Pilih Jam</option>
                {jamBookingOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="keluhan" className={labelClass}>Keluhan*</label>
            <textarea id="keluhan" name="keluhan" rows="4" value={formData.keluhan} onChange={handleChange} required className={`${inputClass} resize-y`} placeholder="Sampaikan keluhan Anda"></textarea>
          </div>

          {/* Captcha Placeholder */}
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
                <label htmlFor="captcha" className="text-sm text-slate-700">I`m not a robot</label>
                <span className="text-xs text-slate-500 ml-4">reCAPTCHA</span>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-bahana-primary hover:bg-bahana-light focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-bahana-light-10 transition-colors mt-8"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
}