'use client'
import { useState, useCallback } from "react";
import jsPDF from 'jspdf';
import FormItem from '../components/FormItem'; // Komponen baru yang lebih fleksibel untuk layout horizontal

export default function BookingServiceFormBIB() {
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    email: "",
    alamat: "",
    jenisMobil: "",
    tahunMobil: "",
    nomorPolisi: "",
    jenisService: "Breakdown Service (On-Site Visit)", 
    tanggalBooking: "",
    jamBooking: "",
    keluhan: "",
    captchaChecked: false,
    loading: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);
  
  // Data dummy (tetap sama)
  const jenisMobilOptions = ["Isuzu Traga", "Isuzu Elf", "Isuzu Giga", "Isuzu D-Max"];
  const tahunMobilOptions = ["2024", "2023", "2022", "2021", "2020"];
  const jamBookingOptions = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

  // Logika generatePDF dan handleSubmit (tetap sama seperti jawaban sebelumnya, tidak diulang di sini)

  // Contoh fungsi generatePDF (asumsi Anda sudah menyalinnya)
  const generatePDF = (data) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;
    const lineHeight = 5;

    // --- Judul Dokumen ---
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("PERMINTAAN BOOKING SERVICE ON-SITE (BIB)", margin, y);
    y += lineHeight;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Nomor Form: BIB-${new Date().getTime().toString().slice(-6)}`, margin, y);
    y += lineHeight * 2;

    // --- Fungsi Helper untuk Blok Data ---
    const drawSection = (title, fields) => {
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(title, margin, y);
        y += 4;
        doc.line(margin, y, pageWidth - margin, y); // Garis bawah judul
        y += 2;

        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        
        fields.forEach(({ label, value }) => {
            const labelText = label + ":";
            // Cetak Label (Bold)
            doc.setFont(undefined, 'bold');
            doc.text(labelText, margin + 2, y);
            
            // Cetak Value (Normal)
            doc.setFont(undefined, 'normal');
            doc.text(String(value), margin + 40, y);
            y += lineHeight;
        });
        y += lineHeight / 2;
    };
    
    // --- I. Data Pelanggan ---
    drawSection("I. DATA PELANGGAN & LOKASI VISIT", [
        { label: "Nama Pemesan", value: data.nama },
        { label: "No. Telepon (WA)", value: data.telepon },
        { label: "Email", value: data.email },
    ]);

    // --- II. Lokasi On-Site ---
    y += lineHeight * 0.5;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text("II. LOKASI ON-SITE (ALAMAT)", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y); // Garis bawah judul
    y += 2;
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const alamatLines = doc.splitTextToSize(data.alamat, pageWidth - 2 * margin - 5);
    doc.text(alamatLines, margin + 2, y);
    y += alamatLines.length * 3.5;
    y += lineHeight / 2;


    // --- III. Profil Unit ---
    drawSection("III. PROFIL UNIT", [
        { label: "Jenis Mobil", value: data.jenisMobil },
        { label: "Tahun Mobil", value: data.tahunMobil },
        { label: "Nomor Polisi", value: data.nomorPolisi },
    ]);
    
    // --- IV. Detail Layanan & Keluhan ---
    y += lineHeight * 0.5;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text("IV. DETAIL LAYANAN & KELUHAN", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y); // Garis bawah judul
    y += 2;

    doc.setFontSize(9);
    
    // Tipe Layanan
    doc.setFont(undefined, 'normal');
    doc.text("Tipe Layanan:", margin + 2, y);
    doc.setFont(undefined, 'bold');
    doc.text(data.jenisService, margin + 40, y);
    y += lineHeight;

    // Waktu Visit
    doc.setFont(undefined, 'normal');
    doc.text("Tanggal/Waktu Visit:", margin + 2, y);
    doc.setFont(undefined, 'bold');
    doc.text(`${data.tanggalBooking} - Pukul ${data.jamBooking} (Estimasi)`, margin + 40, y);
    y += lineHeight;

    // Keluhan
    doc.setFont(undefined, 'normal');
    doc.text("Keluhan:", margin + 2, y);
    y += lineHeight / 2;
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const keluhanLines = doc.splitTextToSize(data.keluhan, pageWidth - 2 * margin - 5);
    doc.text(keluhanLines, margin + 4, y);
    y += keluhanLines.length * 3.5;
    
    y += lineHeight;

    // --- Penutup ---
    doc.setFontSize(8);
    doc.setFont(undefined, 'italic');
    doc.text("Dokumen ini dibuat secara digital dan akan diproses segera oleh Service Advisor.", margin, y);

    return doc.output('datauristring');
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
     setFormData(prev => ({ ...prev, loading: true }));
    
    try {
        // 1. Generate PDF
        const pdfDataUri = generatePDF(formData); 
        
        // 2. Kirim ke Service Advisor (Simulasi)
        console.log("PDF berhasil dibuat dan siap dikirim.");
        
        // Di sini Anda akan menambahkan logika fetch/axios untuk mengirim formData dan pdfDataUri ke backend
        
        alert("Pemesanan Breakdown Service (BIB) berhasil dikirim. Service Advisor akan segera menghubungi Anda!");
        
        // Tambahkan download PDF (opsional, untuk debugging)
        // const link = document.createElement('a');
        // link.href = pdfDataUri;
        // link.download = `Booking_BIB_${formData.nama}.pdf`;
        // link.click();
        
        setFormData(prev => ({ ...prev, loading: false }));
        
    } catch (error) {
        console.error("Gagal memproses booking atau generate PDF:", error);
        alert("Terjadi kesalahan saat mengirim formulir. Coba lagi.");
        setFormData(prev => ({ ...prev, loading: false }));
    }
  };

  // Tailwind classes untuk kotak header
  const headerClass = "bg-gray-200 text-gray-800 font-bold text-xs px-2 py-1 rounded-t-md";
  const sectionClass = "border border-gray-300 rounded-lg p-4 mb-6 bg-white shadow-sm";

  return (
    <section className="py-12 bg-gray-50 font-sans">
      <div className="container mx-auto max-w-4xl p-6 bg-white rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-slate-800">
          FORM BOOKING BREAKDOWN SERVICE (BIB)
        </h1>
        <p className="text-center text-sm text-red-600 font-medium mb-8">
            Layanan mekanik panggilan darurat (On-Site Service) ke lokasi unit Anda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ======================================================= */}
          {/* 1. DATA PELANGGAN & KONTAK */}
          {/* ======================================================= */}
          <div className={sectionClass}>
            <div className={headerClass}>1. DATA PELANGGAN & KONTAK</div>
            <div className="p-3 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-3">
              
              {/* Nama (Lebar Penuh) */}
              <div className="md:col-span-4">
                  <FormItem label="Nama Lengkap" name="nama" type="text" formData={formData} handler={handleChange} required />
              </div>

              {/* Telepon & Email (Grid 2 kolom) */}
              <div className="md:col-span-2">
                  <FormItem label="No. Telepon (WA)" name="telepon" type="tel" formData={formData} handler={handleChange} required isNumeric />
              </div>
              <div className="md:col-span-2">
                  <FormItem label="Email" name="email" type="email" formData={formData} handler={handleChange} required />
              </div>
              
              {/* Alamat (Lebar Penuh dengan Input Vertikal) */}
              <div className="md:col-span-4">
                  <FormItem label="Alamat (Lokasi Visit)*" name="alamat" type="textarea" formData={formData} handler={handleChange} required rows={3} />
              </div>

            </div>
          </div >
          
          {/* ======================================================= */}
          {/* 2. PROFIL UNIT */}
          {/* ======================================================= */}
          <div className={sectionClass}>
            <div className={headerClass}>2. PROFIL UNIT KENDARAAN</div>
            <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">

                <FormItem label="Jenis Mobil" name="jenisMobil" type="select" formData={formData} handler={handleChange} required options={jenisMobilOptions} />
                <FormItem label="Tahun Mobil" name="tahunMobil" type="select" formData={formData} handler={handleChange} required options={tahunMobilOptions} />
                <FormItem label="Nomor Polisi" name="nomorPolisi" type="text" formData={formData} handler={handleChange} required />

            </div>
          </div>

          {/* ======================================================= */}
          {/* 3. DETAIL LAYANAN & WAKTU */}
          {/* ======================================================= */}
          <div className={sectionClass}>
            <div className={headerClass}>3. DETAIL LAYANAN & KELUHAN</div>
            <div className="p-3 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-3">
              
              {/* Tipe Layanan (Read-only) */}
              <div className="md:col-span-4">
                  <FormItem label="Tipe Layanan" name="jenisService" type="text" value={formData.jenisService} disabled />
              </div>
              
              {/* Tanggal & Jam */}
              <div className="md:col-span-2">
                  <FormItem label="Tanggal Visit (Estimasi)" name="tanggalBooking" type="date" formData={formData} handler={handleChange} required />
              </div>
              <div className="md:col-span-2">
                  <FormItem label="Jam Visit (Estimasi)" name="jamBooking" type="select" formData={formData} handler={handleChange} required options={jamBookingOptions} />
              </div>
              
              {/* Keluhan (Lebar Penuh dengan Input Vertikal) */}
              <div className="md:col-span-4">
                  <FormItem label="Detail Keluhan (Penting!)*" name="keluhan" type="textarea" formData={formData} handler={handleChange} required rows={3} placeholder="Deskripsikan masalah (Contoh: Mesin mati mendadak, tidak bisa distarter, asap hitam, dll)." />
              </div>

            </div>
          </div>
          
          {/* Captcha Placeholder dan Tombol Submit */}
          <div className="flex flex-col items-center pt-4">
            <div className="flex items-center space-x-2 border border-slate-300 p-3 w-max rounded-md bg-gray-50 shadow-inner mb-6">
                <input type="checkbox" id="captcha" name="captchaChecked" checked={formData.captchaChecked} onChange={handleChange} required className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"/>
                <label htmlFor="captcha" className="text-sm text-slate-700"> Saya bukan robot</label>
            </div>
            
            <button
                type="submit"
                disabled={formData.loading}
                className="w-full max-w-sm flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {/* ... (Loading spinner logic) ... */}
                {formData.loading ? 'Memproses & Mengirim...' : '🚨 KIRIM FORM BOOKING BREAKDOWN SERVICE'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}