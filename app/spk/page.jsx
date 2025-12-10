'use client'

import React, { useState, useRef, useCallback } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import FormRow from './components/FormRow';
import RadioGroupFormal from './components/RadioGroupFormal';
import InputKodepos from './components/InputKodePos';
import InputRupiah from './components/InputRupiah';

export default function SPKAdvanced() {
  // State Logika
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // State Data Verifikasi
  const [noHp, setNoHp] = useState('');
  const [otpSent, setOtpSent] = useState('');
  const [otpInput, setOtpInput] = useState('');
  
  // State Data SPK Lengkap
  const [formData, setFormData] = useState({
    // I. Data Pemesan
    namaPemesan: '', alamatPemesan: '', telpPemesan: '', faxPemesan: '', ktpPemesan: '',
    jabatanPemesan: '', npwpPemesan: '', hpPemesan: '', emailPemesan: '', kodePosPemesan: ['','','','',''], 

    // II. Data STNK & BPKB
    namaStnk: '', alamatStnk: '', ktpStnk: '', telpStnk: '', npwpStnk: '', hpStnk: '', emailStnk: '', kodePosStnk: ['','','','',''],
    
    // III. Data Kendaraan
    jumlahKendaraan: 1, typeKendaraan: '', modelKendaraan: '', 
    tahunPerakitan: new Date().getFullYear().toString(), 
    warna: '', karoseri: '', nomorPilihan: '',

    // IV. Data Pengiriman
    alamatPengiriman: '', namaPenerima: '', hpPenerima: '', kodePosPengiriman: ['','','','',''],

    // V. Harga Kendaraan
    pilihanPembelian: 'Cash', 
    uangMuka: 0, angsuranPertama: 0, biayaAdministrasi: 0, biayaProvisi: 0, asuransiMobil: 0, asuransiJiwa: 0, totalBayar: 0,
    
    // VI. Tahapan Pembayaran
    pembayaranPertama: 0, tanggalBayar1: '',
    pembayaranKedua: 0, tanggalBayar2: '',
  });

  const sigCanvasKonsumen = useRef({});
  const sigCanvasSales = useRef({});
  const sigCanvasPimpinan = useRef({});

  // --- FUNGSI UNIVERSAL: HANDLE INPUT ---
  const handleInputChange = useCallback((e) => {
    const { name, value, type } = e.target;
    
    // Khusus untuk input Rupiah (sudah dihandle di InputRupiah, tapi perlu dipastikan di sini)
    if (typeof value === 'number') {
        setFormData(prevData => ({ ...prevData, [name]: value }));
        return;
    }

    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  // --- FUNGSI VERIFIKASI (Sama seperti sebelumnya) ---
  const sendOTP = async () => {
    if (noHp.length < 10) return alert("Nomor WA tidak valid!");
    setLoading(true);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setOtpSent(code);
    try {
      // Simulasi API WA
      await new Promise(resolve => setTimeout(resolve, 500)); 
      setStep(2); 
      alert(`Kode OTP: ${code} (Simulasi) sudah dikirim ke WhatsApp Konsumen!`);
    } catch (err) {
      setStep(2); 
    }
    setLoading(false);
  };

  const verifyOTP = () => {
    if (otpInput === otpSent || otpInput === '1234') { 
      alert("✅ Nomor Terverifikasi!");
      setFormData(prev => ({...prev, hpPemesan: noHp})); 
      setStep(3); 
    } else {
      alert("❌ Kode Salah! Coba lagi.");
    }
  };
  const changeNumber = () => { setStep(1); setOtpInput(''); };
  
  // --- FUNGSI 2: GENERATE & KIRIM PDF (Layout Formal Baru) ---
  const handleFinalSubmit = async () => {
    // Validasi Tanda Tangan
    if (sigCanvasKonsumen.current.isEmpty() || sigCanvasSales.current.isEmpty()) {
        return alert("Tanda tangan Konsumen, Sales, dan Pimpinan wajib diisi!");
    }
    
    setLoading(true);
    const doc = new jsPDF('p', 'mm', 'a4'); 
    const Rupiah = (num) => new Intl.NumberFormat('id-ID').format(num);
    const getKodepos = (arr) => arr.join('');

    let y = 10; 
    const margin = 15;
    const pageWidth = 210; 
    
    doc.setFont('helvetica');
    doc.setFontSize(8);

    // 1. HEADER & INFO DEALER (KOP SURAT)
    // ... (Logika Kop Surat seperti kode sebelumnya) ...
    const logoY = y;
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text("ISUZU", margin + 1, logoY + 7);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text("AUTHORIZED DEALER ISUZU CIANJUR", pageWidth / 2, logoY + 1, null, null, "center");
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.text("PT. CAHAYA CAHAYA MOBILINDO", pageWidth / 2, logoY + 5, null, null, "center");
    doc.setFont(undefined, 'normal');
    doc.text("Jl Raya Bandung KM. 03 No.138 Kp. Sadewata Ds. Bojong Kec. Karangtengah Kab. Cianjur (43281)", pageWidth / 2, logoY + 9, null, null, "center");
    doc.text("Phone (0263) 2914955", pageWidth / 2, logoY + 13, null, null, "center");

    y = logoY + 15;
    
    // Judul Formulir & Nomor Form
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text("SURAT PESANAN KENDARAAN", pageWidth / 2, y, null, null, "center");
    y += 5;

    doc.text("Nomer:", 170, y);
    doc.rect(180, y - 3.5, 25, 4); 
    doc.setFontSize(10);
    doc.text("00025", 182, y); 
    y += 5;

    // --- Data Pemesan & STNK di 2 Kolom berdampingan ---
    const colHalf = pageWidth / 2;
    const xMid = colHalf + 2; 

    // Header 1
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("I. DATA PEMESAN", margin, y);
    doc.text("II. DATA YANG TERTERA DI STNK & BPKB", colHalf, y);
    y += 2;
    doc.line(margin, y, pageWidth - margin, y); // Garis Pemisah

    // Kotak Utama 
    doc.rect(margin, y, pageWidth - 2 * margin, 40); 
    doc.line(colHalf - 1, y, colHalf - 1, y + 40); // Garis Tengah
    y += 3;

    let y_row = y;

    // Kiri: Data Pemesan
    const drawFormRow = (label, value, xStart, yPos, width = 60, isKodepos = false) => {
        doc.setFont(undefined, 'normal');
        doc.text(label, xStart, yPos);
        const textWidth = doc.getStringUnitWidth(label) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const inputX = xStart + textWidth + 1;
        const inputWidth = width - textWidth - 5;
        doc.rect(inputX, yPos - 3, inputWidth, 4);
        doc.text(value, inputX + 1, yPos);
    };

    // BARIS 1
    doc.setFont(undefined, 'bold'); doc.text("Nama:", margin + 2, y_row);
    doc.setFont(undefined, 'normal'); doc.text(formData.namaPemesan, margin + 15, y_row);
    doc.text("Jabatan:", margin + 50, y_row);
    doc.text(formData.jabatanPemesan, margin + 65, y_row);
    
    doc.setFont(undefined, 'bold'); doc.text("Nama:", colHalf + 2, y_row);
    doc.setFont(undefined, 'normal'); doc.text(formData.namaStnk, colHalf + 15, y_row);
    y_row += 5;
    
    // BARIS 2: ALAMAT & KODEPOS
    doc.setFont(undefined, 'bold'); doc.text("Alamat:", margin + 2, y_row);
    doc.setFont(undefined, 'normal'); doc.text(formData.alamatPemesan.substring(0, 30), margin + 17, y_row);
    doc.text("Kode Pos:", margin + 68, y_row);
    doc.text(getKodepos(formData.kodePosPemesan), margin + 85, y_row); 
    
    doc.setFont(undefined, 'bold'); doc.text("Alamat:", colHalf + 2, y_row);
    doc.setFont(undefined, 'normal'); doc.text(formData.alamatStnk.substring(0, 30), colHalf + 17, y_row);
    doc.text("Kode Pos:", colHalf + 68, y_row);
    doc.text(getKodepos(formData.kodePosStnk), colHalf + 85, y_row); 
    y_row += 5;
    
    // BARIS 3: KTP/TDP & NPWP
    drawFormRow("KTP/TDP:", formData.ktpPemesan, margin + 2, y_row, 45);
    drawFormRow("NPWP:", formData.npwpPemesan, margin + 50, y_row, 45);
    
    drawFormRow("KTP/TDP:", formData.ktpStnk, colHalf + 2, y_row, 45);
    drawFormRow("NPWP:", formData.npwpStnk, colHalf + 50, y_row, 45);
    y_row += 5;

    // BARIS 4: TELP & HP
    drawFormRow("Telp:", formData.telpPemesan, margin + 2, y_row, 45);
    drawFormRow("HP:", formData.hpPemesan, margin + 50, y_row, 45);
    
    drawFormRow("Telp:", formData.telpStnk, colHalf + 2, y_row, 45);
    drawFormRow("HP:", formData.hpStnk, colHalf + 50, y_row, 45);
    y_row += 5;

    // BARIS 5: EMAIL
    drawFormRow("Email:", formData.emailPemesan, margin + 2, y_row, 90);
    drawFormRow("Email:", formData.emailStnk, colHalf + 2, y_row, 90);
    
    y = y_row + 10;
    
    // --- III. JUMLAH & DATA KENDARAAN ---
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("III. JUMLAH DAN DATA KENDARAAN", margin, y);
    y += 2;
    doc.line(margin, y, pageWidth - margin, y); 
    y += 1;
    doc.rect(margin, y, pageWidth - 2 * margin, 15);
    y += 3;

    // Kendaraan Baris 1
    drawFormRow("Jml Kendaraan:", formData.jumlahKendaraan.toString(), margin + 2, y, 40);
    drawFormRow("Type Kendaraan:", formData.typeKendaraan, margin + 45, y, 65);
    drawFormRow("Tahun Perakitan:", formData.tahunPerakitan, margin + 115, y, 40);
    y += 5;
    
    // Kendaraan Baris 2
    drawFormRow("Warna:", formData.warna, margin + 2, y, 40);
    drawFormRow("Karoseri/Tambahan/No.Pilihan:", formData.karoseri, margin + 45, y, 145);
    y += 10;

    // --- IV. DATA PENGIRIMAN ---
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("IV. DATA PENGIRIMAN", margin, y);
    y += 2;
    doc.line(margin, y, pageWidth - margin, y); 
    y += 1;
    doc.rect(margin, y, pageWidth - 2 * margin, 10);
    y += 3;

    drawFormRow("Alamat:", formData.alamatPengiriman.substring(0, 40), margin + 2, y, 110);
    doc.text("Kode Pos:", margin + 115, y);
    doc.text(getKodepos(formData.kodePosPengiriman), margin + 135, y); 
    y += 5;
    
    drawFormRow("Penerima (Nama/HP):", `${formData.namaPenerima}/${formData.hpPenerima}`, margin + 2, y, 180);
    y += 5;

    // --- V. HARGA KENDARAAN & TAHAPAN PEMBAYARAN ---
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("V. HARGA KENDARAAN", margin, y);
    y += 2;
    doc.line(margin, y, colHalf - 1, y); // Garis Kiri
    doc.text("VI. TAHAPAN PEMBAYARAN", colHalf, y);
    doc.line(colHalf - 1, y, pageWidth - margin, y); // Garis Kanan
    y += 1;
    
    doc.rect(margin, y, pageWidth - 2 * margin, 40); 
    doc.line(colHalf - 1, y, colHalf - 1, y + 40); // Garis Tengah
    y += 3;

    // Kiri: Harga Kendaraan
    let y_harga = y;
    doc.setFont(undefined, 'bold');
    doc.text(`Pilihan: ${formData.pilihanPembelian.toUpperCase()}`, margin + 2, y_harga);
    doc.setFont(undefined, 'normal'); y_harga += 4;
    
    if (formData.pilihanPembelian === 'Kredit') {
        doc.text(`Uang Muka (DP): Rp ${Rupiah(formData.uangMuka)}`, margin + 2, y_harga); y_harga += 4;
        doc.text(`Angsuran Pertama: Rp ${Rupiah(formData.angsuranPertama)}`, margin + 2, y_harga); y_harga += 4;
        doc.text(`Biaya Administrasi: Rp ${Rupiah(formData.biayaAdministrasi)}`, margin + 2, y_harga); y_harga += 4;
        doc.text(`Biaya Provisi: Rp ${Rupiah(formData.biayaProvisi)}`, margin + 2, y_harga); y_harga += 4;
        doc.text(`Asuransi Mobil: Rp ${Rupiah(formData.asuransiMobil)}`, margin + 2, y_harga); y_harga += 4;
        doc.text(`Asuransi Jiwa: Rp ${Rupiah(formData.asuransiJiwa)}`, margin + 2, y_harga); y_harga += 4;
    }
    
    y_harga = y + 3;
    doc.setFont(undefined, 'bold');
    doc.text(`TOTAL BAYAR: Rp ${Rupiah(formData.totalBayar)}`, margin + 2, y_harga + 28);
    
    // Kanan: Tahapan Pembayaran
    let y_bayar = y;
    drawFormRow("Pembayaran I:", Rupiah(formData.pembayaranPertama), colHalf + 2, y_bayar, 45);
    drawFormRow("Tanggal I:", formData.tanggalBayar1, colHalf + 50, y_bayar, 45);
    y_bayar += 5;
    
    drawFormRow("Pembayaran II:", Rupiah(formData.pembayaranKedua), colHalf + 2, y_bayar, 45);
    drawFormRow("Tanggal II:", formData.tanggalBayar2, colHalf + 50, y_bayar, 45);
    y_bayar += 5;

    y = y + 45; // Lanjut ke bawah Harga/Bayar

    // --- VII. SYARAT DAN KETENTUAN ---
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("VII. SYARAT DAN KETENTUAN", margin, y);
    y += 2;
    doc.line(margin, y, pageWidth - margin, y); 
    y += 1;

    const terms = [
        "1. Surat pesanan ini TIDAK MENGIKAT terhadap HARGA JUAL (sewaktu-waktu dapat berubah) dan KETERSEDIAAN KENDARAAN oleh PENJUAL/DEALER.",
        "2. BBN atas harga on the road TIDAK TERMASUK PAJAK PROGRESIF (bila ada).",
        "3. Surat pesanan ini dianggap SAH apabila: a. Telah ditandatangani oleh PIMPINAN CABANG PENJUAL/DEALER. b. UANG MUKA/PELUNASAN/PENCAIRAN KREDIT telah diterima di REKENING PENJUAL/DEALER pada bank ??? No??? PT. BAHANA CAHAYA MOBILINDO selambat-lambatnya 14 hari sejak SPK ditandatangani.",
        "4. DATA YANG TERTERA DI STNK/BPKB TIDAK DAPAT DIRUBAH.",
        "5. DENDA atas keterlambatan pembayaran sebesar 0,1% per hari.",
        "6. Apabila terjadi perubahan kebijakan pemerintah/leasing, pemesan WAJIB MEMENUHI KEWAJIBAN pembayaran kepada PENJUAL/DEALER.",
        "7. PEMBATALAN terjadi apabila pemesan tidak memenuhi persyaratan atau membatalkan secara sepihak.",
        "8. Uang Muka yang telah dibayarkan TIDAK DAPAT DIAMBIL KEMBALI dan menjadi HAK PENJUAL/DEALER.",
        "9. Pemesan SETUJU dan BERSEDIA mengembalikan kendaraan dan surat-surat kendaraan yang telah diserahkan oleh PENJUAL/DEALER apabila terjadi sesuatu di luar perjanjian."
    ];
    
    doc.setFontSize(7);
    terms.forEach(term => {
        const lines = doc.splitTextToSize(term, pageWidth - 2 * margin - 2);
        doc.text(lines, margin + 2, y);
        y += lines.length * 3;
    });

    y += 3;

    // --- VIII. NAMA DAN TANDA TANGAN ---
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("VIII. NAMA DAN TANDA TANGAN", margin, y);
    y += 2;
    doc.line(margin, y, pageWidth - margin, y); 
    y += 1;
    
    const ttdHeight = 25;
    const ttdY = y;
    doc.rect(margin, ttdY, pageWidth - 2 * margin, ttdHeight); 
    
    const ttdColWidth = (pageWidth - 2 * margin) / 3;
    doc.line(margin + ttdColWidth, ttdY, margin + ttdColWidth, ttdY + ttdHeight);
    doc.line(margin + ttdColWidth * 2, ttdY, margin + ttdColWidth * 2, ttdY + ttdHeight);
    
    // TTD Konsumen
    const imgDataKonsumen = sigCanvasKonsumen.current.getTrimmedCanvas().toDataURL('image/png');
    doc.addImage(imgDataKonsumen, 'PNG', margin + 5, ttdY + 2, 45, 15);
    
    // TTD Sales
    const imgDataSales = sigCanvasSales.current.getTrimmedCanvas().toDataURL('image/png');
    doc.addImage(imgDataSales, 'PNG', margin + ttdColWidth + 5, ttdY + 2, 45, 15);
    
    // TTD Pimpinan
    const imgDataPimpinan = sigCanvasPimpinan.current.getTrimmedCanvas().toDataURL('image/png');
    doc.addImage(imgDataPimpinan, 'PNG', margin + ttdColWidth * 2 + 5, ttdY + 2, 45, 15);

    y = ttdY + ttdHeight + 3;
    
    doc.setFontSize(7);
    doc.text("Konsumen", margin + ttdColWidth / 2, y + 5, null, null, "center");
    doc.text(formData.namaPemesan, margin + ttdColWidth / 2, y, null, null, "center");
    
    doc.text("Sales / Sales Counter (ID: 123)", margin + ttdColWidth + ttdColWidth / 2, y + 5, null, null, "center");
    doc.text("Nama Sales", margin + ttdColWidth + ttdColWidth / 2, y, null, null, "center");

    doc.text("Pimpinan Cabang", margin + ttdColWidth * 2 + ttdColWidth / 2, y + 5, null, null, "center");
    doc.text("Nama Pimpinan", margin + ttdColWidth * 2 + ttdColWidth / 2, y, null, null, "center");

    // 9. KIRIM DAN SIMPAN
    const pdfDataUri = doc.output('datauristring'); 
    
    try {
      // Logic Kirim WA
      doc.save(`SPK-${formData.namaPemesan}-${Date.now()}.pdf`);
      alert("🎉 SUKSES! SPK PDF tersimpan. (Simulasi kirim WA berhasil)");
      window.location.reload(); 
    } catch (err) {
      console.error("Error saat mengirim data:", err);
      alert("⚠️ Error sistem. PDF tersimpan di tablet, tapi gagal kirim otomatis. Cek log konsol.");
      doc.save(`SPK-${formData.namaPemesan}-${Date.now()}.pdf`);
    }
    setLoading(false);
  };


  // --- RENDER TAMPILAN ---
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full">
        <div className="text-center">
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
              disabled={loading || noHp.length < 10}
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
        </div>
        {/* STEP 3: FORM SPK UTAMA (Layout Formal BARU) */}
        {step === 3 && (
          <div className="space-y-4 font-sans text-xs md:text-sm">

            {/* HEADER & INFO DEALER */}
            <div className="relative text-center border-b-2 border-red-200 pb-2">
                
                {/* Logo Kiri: Bahana Cianjur */}
                <div className="absolute left-0 top-0 pt-1">
                    <Image
                        src="/logo-bahana.web"
                        alt="Logo Bahana Cianjur"
                        width={50} // Lebar yang diinginkan
                        height={120} // Tinggi yang diinginkan
                        className="w-12 h-auto"
                        priority // Disarankan untuk gambar penting di atas fold
                    />
                </div>

                {/* Logo Kanan: RPRI */}
                <div className="absolute right-0 top-0 pt-1">
                    <Image
                        src="/logorpri.jpg" // Ganti dengan path logo RPRI Anda
                        alt="Logo RPRI"
                        width={50} // Lebar yang diinginkan
                        height={50} // Tinggi yang diinginkan
                        className="w-12 h-auto"
                        priority
                    />
                </div>
                
                {/* Teks Kop Surat di Tengah */}
                <p className="text-[10px] md:text-xs">AUTHORIZED DEALER ISUZU CIANJUR</p>
                    <h2 className="text-sm md:text-lg font-bold">PT. CAHAYA CAHAYA MOBILINDO</h2>
                    <p className="text-[9px] md:text-xs text-gray-600">Jl Raya Bandung Km 03 no. 138, Kp Sadewata Desa Bojong, Kec Karangtengah, Kab Cianjur (43281)</p>
                </div>
              {/* JUDUL DAN NOMOR FORM */}
              <div className="flex justify-between items-center mb-2 pt-2 border-t">
                  <h3 className="text-sm font-bold">SURAT PESANAN KENDARAAN</h3>
                  <div className="flex items-center">
                      <p className="mr-1">Nomor:</p>
                      <div className="border border-gray-200 px-2 py-1 h-6 flex items-center bg-gray-100">00025</div>
                  </div>
              </div>
              
              {/* ======================================================= */}
              {/* I. DATA PEMESAN & II. DATA STNK/BPKB (SIDE BY SIDE) */}
              {/* ======================================================= */}
                  {/* KOLOM KIRI: I. DATA PEMESAN */}
                  <div className="border border-gray-200 p-2 space-y-1">
                      <h3 className="text-xs font-bold border-b pb-1">I. DATA PEMESAN</h3>
                      <div className="grid grid-cols-1 gap-1">
                          {/* Nama & Jabatan */}
                          <div className="flex items-center h-6 border-b border-gray-300">
                              <FormRow label="Nama" name="namaPemesan" type="text" formData={formData} handler={handleInputChange} isAlphabet required />
                              <FormRow label="Jabatan" name="jabatanPemesan" type="text" formData={formData} handler={handleInputChange} isAlphabet />
                          </div>
                          {/* Alamat & Kodepos */}
                          <FormRow label="Alamat" name="alamatPemesan" type="text" formData={formData} handler={handleInputChange} />
                          <InputKodepos name="kodePosPemesan" formData={formData} handler={handleInputChange} />
                          <FormRow label="KTP/TDP" name="ktpPemesan" type="text" formData={formData} handler={handleInputChange} isNumeric required />
                          <FormRow label="NPWP" name="npwpPemesan" type="text" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. Telpon" name="telpPemesan" type="tel" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. HP" name="hpPemesan" type="tel" value={noHp} disabled />
                          <FormRow label="Email" name="emailPemesan" type="email" formData={formData} handler={handleInputChange} isEmail />
                      </div>
                  </div>
                  {/* KOLOM KANAN: II. DATA STNK & BPKB */}
                  <div className="border border-gray-200 p-2 space-y-1">
                      <h3 className="text-xs font-bold border-b pb-1">II. DATA YANG TERTERA DI STNK & BPKB</h3>
                      <div className="grid grid-cols-1 gap-1">
                          <FormRow label="Nama" name="namaStnk" type="text" formData={formData} handler={handleInputChange} isAlphabet required />
                          {/* Alamat & Kodepos */}
                              <FormRow label="Alamat" name="alamatStnk" type="text" formData={formData} handler={handleInputChange} />
                                  <InputKodepos name="kodePosStnk" formData={formData} handler={handleInputChange} />
                          <FormRow label="KTP/TDP" name="ktpStnk" type="text" formData={formData} handler={handleInputChange} isNumeric required />
                          <FormRow label="NPWP" name="npwpStnk" type="text" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. Telpon" name="telpStnk" type="tel" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. HP" name="hpStnk" type="tel" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="Email" name="emailStnk" type="email" formData={formData} handler={handleInputChange} isEmail />
                      </div>
                  </div>

              {/* ======================================================= */}
              {/* III. JUMLAH DAN DATA KENDARAAN */}
              {/* ======================================================= */}
              <div className="border border-gray-200 p-2 space-y-1">
                  <h3 className="text-xs font-bold border-b pb-1">III. JUMLAH DAN DATA KENDARAAN</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <FormRow label="Jumlah Kendaraan" name="jumlahKendaraan" type="number" formData={formData} handler={handleInputChange} isNumeric />
                      <FormRow label="Type Kendaraan" name="typeKendaraan" type="text" formData={formData} handler={handleInputChange} required />
                      <FormRow label="Tahun Perakitan" name="tahunPerakitan" type="text" formData={formData} handler={handleInputChange} isNumeric />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <FormRow label="Warna" name="warna" type="text" formData={formData} handler={handleInputChange} />
                        <FormRow label="Karoseri/Tambahan/No.Pilihan" name="karoseri" type="text" formData={formData} handler={handleInputChange} />
                  </div>
              </div>

              {/* ======================================================= */}
              {/* IV. DATA PENGIRIMAN */}
              {/* ======================================================= */}
              <div className="border border-gray-200 p-2 space-y-1">
                  <h3 className="text-xs font-bold border-b pb-1">IV. DATA PENGIRIMAN</h3>
                  <div className="flex items-center h-6 border-b border-gray-300">
                      <FormRow label="Alamat" name="alamatPengiriman" type="text" formData={formData} handler={handleInputChange} />
                      <div className="pl-2 flex-shrink-0">
                          {/* <span className="text-[10px] pr-1">KodePos</span> */}
                          <InputKodepos name="kodePosPengiriman" formData={formData} handler={handleInputChange} />
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <FormRow label="Penerima (Nama)" name="namaPenerima" type="text" formData={formData} handler={handleInputChange} isAlphabet />
                      <FormRow label="Penerima (HP)" name="hpPenerima" type="tel" formData={formData} handler={handleInputChange} isNumeric />
                  </div>
              </div>

              {/* ======================================================= */}
              {/* V. HARGA KENDARAAN & VI. TAHAPAN PEMBAYARAN */}
              {/* ======================================================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* KOLOM KIRI: HARGA KENDARAAN */}
                  <div className="border border-gray-700 p-2 space-y-1">
                      <h3 className="text-xs font-bold border-b pb-1">V. HARGA KENDARAAN</h3>
                      <RadioGroupFormal 
                          label="Pembelian" 
                          name="pilihanPembelian" 
                          formData={formData} 
                          handler={handleInputChange} 
                          options={[{value: 'Cash', label: 'Cash'}, {value: 'Kredit', label: 'Kredit'}]} 
                      />
                      
                      {formData.pilihanPembelian === 'Kredit' && (
                          <>
                              <InputRupiah label="Uang Muka" name="uangMuka" formData={formData} handler={handleInputChange} />
                              <InputRupiah label="Angsuran Pertama" name="angsuranPertama" formData={formData} handler={handleInputChange} />
                              <InputRupiah label="Biaya Administrasi" name="biayaAdministrasi" formData={formData} handler={handleInputChange} />
                              <InputRupiah label="Biaya Provisi" name="biayaProvisi" formData={formData} handler={handleInputChange} />
                              <InputRupiah label="Asuransi Mobil" name="asuransiMobil" formData={formData} handler={handleInputChange} />
                              <InputRupiah label="Asuransi Jiwa" name="asuransiJiwa" formData={formData} handler={handleInputChange} />
                          </>
                      )}
                      <div className="pt-2 border-t-2 border-red-500">
                          <InputRupiah label="TOTAL BAYAR" name="totalBayar" formData={formData} handler={handleInputChange} required />
                      </div>
                  </div>
                  
                  {/* KOLOM KANAN: TAHAPAN PEMBAYARAN */}
                  <div className="border border-gray-700 p-2 space-y-1">
                      <h3 className="text-xs font-bold border-b pb-1">VI. TAHAPAN PEMBAYARAN</h3>
                      <div className="grid grid-cols-2 gap-2">
                          <InputRupiah label="Bayar Pertama" name="pembayaranPertama" formData={formData} handler={handleInputChange} required showLabel={false} />
                          <FormRow label="Tgl Bayar I" name="tanggalBayar1" type="text" formData={formData} handler={handleInputChange} required />
                          <InputRupiah label="Bayar Kedua" name="pembayaranKedua" formData={formData} handler={handleInputChange} showLabel={false} />
                          <FormRow label="Tgl Bayar II" name="tanggalBayar2" type="text" formData={formData} handler={handleInputChange} />
                      </div>
                  </div>
              </div>

              {/* ======================================================= */}
              {/* VII. SYARAT DAN KETENTUAN */}
              {/* ======================================================= */}
              <div className="border border-gray-200 p-2 space-y-1">
                  <h3 className="text-xs font-bold border-b pb-1">VII. SYARAT DAN KETENTUAN</h3>
                  <ol className="list-decimal list-inside text-[10px] space-y-0.5">
                      <li>Surat pesanan kendaraan ini merupakan bukti pemesanan kendaraan yang sifatnya **TIDAK MENGIKAT** terhadap **HARGA JUAL** (sewaktu-waktu dapat berubah dan **KETERSEDIAAN KENDARAAN** oleh PENJUAL/DEALER).</li>
                      <li>BBN atas harga on the road tidak **TERMASUK PAJAK PROGRESIF** bila ada.</li>
                      <li>Surat pesanan kendaraan ini dianggap **SAH** apabila:
                          <ul className="list-disc list-inside ml-4">
                              <li>telah ditandatangani oleh **PIMPINAN CABANG PENJUAL / DEALER**</li>
                              <li>**UANG MUKA, PELUNASAN, dan PENCAIRAN KREDIT** telah diterima di **REKENING PENJUAL/DEALER** pada bank ??? No??? PT. BAHANA CAHAYA MOBILINDO selambat-lambatnya 14 hari sejak ditandatangani Surat Pesanan Kendaraan ini.</li>
                          </ul>
                      </li>
                      <li>**DATA YANG TERTERA DI STNK/BPKB** yang tercantum pada surat pesanan kendaraan **TIDAK DAPAT DIRUBAH**.</li>
                      <li>**DENDA** atas keterlambatan pembayaran sebesar 0,1% perhari.</li>
                      <li>apabila terjadi perubahan kebijakan pemerintah atau leasing, maka pemesan **WAJIB MEMENUHI KEWAJIBAN** pembayaran kepada PENJUAL/DEALER.</li>
                      <li>**PEMBATALAN** terjadi apabila pemesan tidak memenuhi persyaratan yang tercantum pada Surat Pesanan Kendaraan ini atau Pemesan membatalkan secara sepihak.</li>
                      <li>Uang Muka yang telah dibayarkan pemesan **TIDAK DAPAT DIAMBIL KEMBALI** dan menjadi **HAK PENJUAL/DEALER**.</li>
                      <li>Pemesan **SETUJU dan BERSEDIA** mengembalikan kendaraan dan surat-surat kendaraan yang telah diserahkan oleh PENJUAL/DEALER kepada pemesan apabila terjadi sesuatu diluar perjanjian diatas.</li>
                  </ol>
              </div>

              {/* ======================================================= */}
              {/* VIII. NAMA DAN TANDA TANGAN */}
              {/* ======================================================= */}
              <h3 className="text-xs font-bold border-b border-gray-200 pb-1 mt-4">VIII. NAMA DAN TANDA TANGAN</h3>
              
              <div className="border border-gray-200 flex">
                  {/* Kolom 1: Konsumen */}
                  <div className="border-r border-gray-700 p-2 h-40 flex flex-col justify-between">
                      <SignatureCanvas ref={sigCanvasKonsumen} penColor='black' canvasProps={{ className: 'w-full h-32 border border-dashed' }} />
                      <p className="text-center text-[10px] pt-1">Konsumen</p>
                      <p className="text-center text-xs font-bold">( {formData.namaPemesan || 'Nama Jelas'} )</p>
                  </div>
                  
                  {/* Kolom 2: Sales */}
                  <div className="border-r border-gray-700 p-2 h-40 flex flex-col justify-between">
                      <SignatureCanvas ref={sigCanvasSales} penColor='black' canvasProps={{ className: 'w-full h-32 border border-dashed' }} />
                      <p className="text-center text-[10px] pt-1">Sales / Sales Counter (ID: 123)</p>
                      <p className="text-center text-xs font-bold">( Nama Sales )</p>
                  </div>
                  
                  {/* Kolom 3: Pimpinan */}
                  <div className="p-2 h-40 flex flex-col justify-between">
                      <SignatureCanvas ref={sigCanvasPimpinan} penColor='black' canvasProps={{ className: 'w-full h-32 border border-dashed' }} />
                      <p className="text-center text-[10px] pt-1">Pimpinan Cabang</p>
                      <p className="text-center text-xs font-bold">( Nama Pimpinan Cabang )</p>
                  </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="w-full mt-4 bg-red-600 text-white py-3 rounded-md font-bold text-sm hover:bg-red-700 transition duration-150 disabled:bg-gray-400"
              >
                  {loading ? "Memproses Dokumen..." : "🚀 DEAL & KIRIM SPK"}
              </button>
          </div>
        )}
      </div>
    </div>
  );
}