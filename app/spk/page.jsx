'use client'

import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';

export default function SPKAdvanced() {
  // State Logika
  const [step, setStep] = useState(1); // 1: Input WA, 2: OTP, 3: Form SPK
  const [loading, setLoading] = useState(false);
  
  // State Data
  const [noHp, setNoHp] = useState('');
  const [otpSent, setOtpSent] = useState(''); // OTP yang dikirim sistem
  const [otpInput, setOtpInput] = useState(''); // OTP yang diinput user
  const [formData, setFormData] = useState({
    nama: '', alamat: '', unit: 'Isuzu Traga', dp: '', tenor: ''
  });

  const sigCanvas = useRef({});

  // --- FUNGSI 1: VERIFIKASI NOMOR WA ---
  const sendOTP = async () => {
    if (noHp.length < 10) return alert("Nomor WA tidak valid!");
    
    setLoading(true);
    // Generate 4 digit kode acak
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setOtpSent(code);

    try {
      // Panggil API kita sendiri
      const res = await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: noHp,
          message: `*KODE VERIFIKASI SPK ISUZU*\n\nKode Anda: *${code}*\n\nSebutkan kode ini kepada Sales untuk validasi nomor.`,
        }),
      });
      const data = await res.json();
      if (data.status) {
        setStep(2); // Pindah ke layar input OTP
        alert("Kode OTP sudah dikirim ke WhatsApp Konsumen!");
      } else {
        alert("Gagal kirim ke nomor tersebut. Pastikan nomor terdaftar di WA!");
      }
    } catch (err) {
      console.log(err,'errornya disini');
      
      alert("Error sistem pengiriman WA.");
    }
    setLoading(false);
  };

  const verifyOTP = () => {
    if (otpInput === otpSent) {
      alert("✅ Nomor Terverifikasi!");
      setStep(3); // Masuk ke Form Utama
    } else {
      alert("❌ Kode Salah! Coba lagi.");
    }
  };

  const changeNumber = () => {
    setStep(1);
    setOtpInput('');
  };

  // --- FUNGSI 2: GENERATE & KIRIM PDF ---
  const handleFinalSubmit = async () => {
    if (sigCanvas.current.isEmpty()) return alert("Tanda tangan wajib diisi!");
    setLoading(true);

    // 1. Buat PDF
    const doc = new jsPDF();
    doc.setFontSize(22); doc.text("SPK DIGITAL ISUZU", 105, 20, null, null, "center");
    doc.setFontSize(12); doc.text(`Nama: ${formData.nama}`, 20, 50);
    doc.text(`Unit: ${formData.unit}`, 20, 60);
    doc.text(`No WA Terverifikasi: ${noHp}`, 20, 70);
    
    // Masukkan Tanda Tangan
    const imgData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 130, 100, 50, 30);
    doc.text(`( ${formData.nama} )`, 140, 135);

    // 2. Convert PDF ke Base64 Data URI (agar bisa dikirim via API)
    const pdfDataUri = doc.output('datauristring'); // Format: "data:application/pdf;base64,..."
    
    // 3. Kirim PDF ke WA Konsumen via API
    try {
      await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: noHp,
          message: `Terima kasih Pak/Bu ${formData.nama}.\nBerikut adalah dokumen SPK Digital Anda.\nUnit: ${formData.unit}`,
          file: pdfDataUri, // PDF dikirim disini
          filename: `SPK-${formData.nama}.pdf`
        }),
      });

      // Download juga ke device Sales sebagai backup
      doc.save(`SPK-${formData.nama}.pdf`);
      
      alert("🎉 SUKSES! SPK telah terkirim ke WhatsApp Konsumen.");
      window.location.reload(); // Refresh halaman
      
    } catch (err) {
      alert("PDF tersimpan di tablet, tapi gagal kirim otomatis.");
      doc.save(`SPK-${formData.nama}.pdf`);
    }
    setLoading(false);
  };

  // --- RENDER TAMPILAN ---
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
        
        {/* STEP 1: INPUT WA */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Verifikasi Nomor Konsumen 📱</h2>
            <p className="text-gray-500 mb-4 text-sm">Pastikan nomor aktif untuk menerima dokumen SPK.</p>
            <input 
              type="tel" 
              placeholder="Contoh: 08123456789" 
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              className="w-full p-3 border rounded-lg text-lg mb-4 text-center"
            />
            <button 
              onClick={sendOTP} 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Mengirim..." : "Kirim Kode Verifikasi"}
            </button>
          </div>
        )}

        {/* STEP 2: INPUT OTP */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Masukkan Kode OTP 🔒</h2>
            <p className="mb-4">Kode telah dikirim ke <b>{noHp}</b></p>
            <input 
              type="text" 
              placeholder="XXXX" 
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full p-3 border rounded-lg text-2xl text-center tracking-widest mb-4 font-bold"
              maxLength={4}
            />
            <button 
              onClick={verifyOTP} 
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 mb-2"
            >
              Verifikasi
            </button>
            <button onClick={changeNumber} className="text-red-500 text-sm underline">
              Nomor Salah? Ganti Nomor
            </button>
          </div>
        )}

        {/* STEP 3: FORM SPK UTAMA */}
        {step === 3 && (
          <div>
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Data Pemesanan</h2>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">WA Terverifikasi ✅</span>
             </div>

             <div className="space-y-3 mb-4">
               <input type="text" placeholder="Nama Lengkap" className="w-full p-2 border rounded" 
                 onChange={e => setFormData({...formData, nama: e.target.value})} />
               <input type="text" placeholder="Alamat" className="w-full p-2 border rounded" 
                 onChange={e => setFormData({...formData, alamat: e.target.value})} />
               <select className="w-full p-2 border rounded" onChange={e => setFormData({...formData, unit: e.target.value})}>
                 <option>Isuzu Traga</option>
                 <option>Isuzu ELF NLR</option>
                 <option>Isuzu GIGA</option>
               </select>
             </div>

             <div className="border-2 border-dashed border-gray-300 rounded mb-4">
                <SignatureCanvas ref={sigCanvas} penColor='black' canvasProps={{className: 'w-full h-40'}} />
                <p className="text-center text-xs text-gray-400">Tanda Tangan Disini</p>
             </div>

             <button 
              onClick={handleFinalSubmit}
              disabled={loading}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg text-lg flex justify-center items-center gap-2"
             >
               {loading ? "Memproses..." : "🚀 DEAL & KIRIM SPK"}
             </button>
          </div>
        )}

      </div>
    </div>
  );
}