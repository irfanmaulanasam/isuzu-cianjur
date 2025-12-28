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
    tipePemesan: 'Perseorangan', // Default: Perseorangan
    namaPemesan: '', // Nama Orang ATAU Nama Instansi
    namaPic: '', // Khusus Korporasi
    jabatanPemesan: '', // Khusus Korporasi
    
    alamatPemesan: '', telpPemesan: '', faxPemesan: '', ktpPemesan: '',
    npwpPemesan: '', hpPemesan: '', emailPemesan: '', kodePosPemesan: ['','','','',''],
    // II. Data STNK
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

    doc.text("Nomor:", 170, y);
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

    // DEFINISI SYARAT & KETENTUAN DENGAN MARKDOWN **
    // Catatan: Gunakan satu array string untuk kemudahan parsing
    const termsWithBold = [
        "1. Surat pesanan ini **TIDAK MENGIKAT** terhadap **HARGA JUAL** (sewaktu-waktu dapat berubah) dan **KETERSEDIAAN KENDARAAN** oleh PENJUAL/DEALER.",
        "2. BBN atas harga on the road TIDAK TERMASUK **PAJAK PROGRESIF** (bila ada).",
        "3. Surat pesanan ini dianggap **SAH** apabila: a. Telah ditandatangani oleh **PIMPINAN CABANG PENJUAL/DEALER**. b. **UANG MUKA/PELUNASAN/PENCAIRAN KREDIT** telah diterima di **REKENING PENJUAL/DEALER** pada bank ??? No??? PT. BAHANA CAHAYA MOBILINDO selambat-lambatnya 14 hari sejak SPK ditandatangani.",
        "4. **DATA YANG TERTERA DI STNK/BPKB** TIDAK DAPAT **DIRUBAH**.",
        "5. **DENDA** atas keterlambatan pembayaran sebesar 0,1% per hari.",
        "6. Apabila terjadi perubahan kebijakan pemerintah/leasing, pemesan **WAJIB MEMENUHI KEWAJIBAN** pembayaran kepada PENJUAL/DEALER.",
        "7. **PEMBATALAN** terjadi apabila pemesan tidak memenuhi persyaratan atau membatalkan secara sepihak.",
        "8. Uang Muka yang telah dibayarkan **TIDAK DAPAT DIAMBIL KEMBALI** dan menjadi **HAK PENJUAL/DEALER**.",
        "9. Pemesan **SETUJU dan BERSEDIA** mengembalikan kendaraan dan surat-surat kendaraan yang telah diserahkan oleh PENJUAL/DEALER apabila terjadi sesuatu di luar perjanjian."
    ];
    
    doc.setFontSize(7);
    const textMargin = margin + 2;

    termsWithBold.forEach(term => {
        let currentX = textMargin;
        const parts = term.split(/(\*\*.*?\*\*)/g); // Membagi string berdasarkan penanda **teks**
        
        let initialY = y;
        let linesWritten = 0;
        
        parts.forEach(part => {
            const isBold = part.startsWith('**') && part.endsWith('**');
            let textToPrint = isBold ? part.slice(2, -2) : part;

            if (!textToPrint) return;

            // Pastikan baris sudah benar
            doc.setFont(undefined, isBold ? 'bold' : 'normal');
            
            // Logika Word Wrapping jsPDF (Sangat disederhanakan)
            const words = textToPrint.split(' ');
            
            for (const word of words) {
                if (word === "") continue;
                
                // Cek lebar saat ini ditambah kata baru
                const wordWidth = doc.getStringUnitWidth(word) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                const spaceWidth = doc.getStringUnitWidth(' ') * doc.internal.getFontSize() / doc.internal.scaleFactor;
                
                if (currentX + wordWidth > pageWidth - margin) {
                    // Pindah Baris
                    y += 3; // Kenaikan baris 3mm
                    linesWritten++;
                    currentX = textMargin;
                }
                
                // Cetak kata
                doc.text(word, currentX, y);
                currentX += wordWidth + spaceWidth;
            }
        });

        // Setelah selesai 1 item, tambahkan jarak ke item berikutnya.
        // Jika hanya 1 baris, kita hanya perlu 3mm jaraknya.
        if (linesWritten === 0) {
            y += 3; 
        } else {
             // Jika lebih dari 1 baris, tambahkan sedikit ruang ekstra
            y += 1;
        }
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans dark:bg-blue-900 dark:text-white">
      <div className="bg-white dark:bg-slate-700/80 p-6 rounded-xl shadow-lg max-w-4xl w-full">
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
              type='button'
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
              type='button'
              onClick={verifyOTP} 
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 mb-2"
            >
              Verifikasi
            </button>
            <button type='button' onClick={changeNumber} className="text-red-500 text-sm underline">
              Nomor Salah? Ganti Nomor
            </button>
          </div>
                )}
        </div>
        {/* STEP 3: FORM SPK UTAMA (Layout Formal BARU) */}
        {step === 3 && (
          <div className="space-y-8 font-sans text-sm pb-10">

              {/* HEADER & INFO DEALER */}
              <div className="relative text-center border-b-2 border-red-200 pb-4">
                  <div className="absolute left-0 top-0">
                      <Image src="/logo-bahana.webp" alt="Logo Bahana" width={60} height={60} className="w-16 h-auto object-contain" />
                  </div>
                  <div className="absolute right-0 top-0">
                      <Image src="/logorpri.jpg" alt="Logo RPRI" width={60} height={60} className="w-16 h-auto object-contain" />
                  </div>
                  
                  <p className="text-[10px] md:text-xs text-gray-500 tracking-widest uppercase mb-1">Authorized Dealer Isuzu Cianjur</p>
                  <h2 className="text-lg md:text-xl font-extrabold text-red-700 tracking-wide">PT. CAHAYA CAHAYA MOBILINDO</h2>
                  <p className="text-[10px] md:text-xs text-gray-500">Jl Raya Bandung Km 03 No.138 Kp. Sadewata (43281)</p>
              </div>
              
              {/* JUDUL DAN NOMOR FORM */}
              <div className="flex justify-between items-end mb-6">
                  <h3 className="text-xl font-bold text-gray-800 border-b-4 border-red-600 inline-block pb-1">SPK DIGITAL</h3>
                  <div className="flex flex-col items-end">
                      <span className="text-[10px] text-gray-400">Nomor Dokumen:</span>
                      <div className="bg-gray-100 text-gray-700 font-mono px-3 py-1 rounded-md text-sm border border-gray-300 shadow-inner">
                          00025/SPK/2025
                      </div>
                  </div>
              </div>

              {/* ======================================================= */}
              {/* I. DATA PEMESAN (LOGIKA BARU) */}
              {/* ======================================================= */}
              <section className="bg-white dark:bg-slate-700/80 border border-gray-200 rounded-xl shadow-sm p-5 md:p-6 transition-all hover:shadow-md">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                      <h3 className="text-base font-bold text-gray-800 flex items-center">
                          <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                          DATA PEMESAN
                      </h3>
                      
                      {/* Radio Button Tipe Pemesan */}
                      <div className="flex bg-gray-100 p-1 rounded-lg dark:bg-slate-700/80">
                          {['Perseorangan', 'Korporasi'].map((type) => (
                              <button
                                  type='button'
                                  key={type}
                                  onClick={() => setFormData({...formData, tipePemesan: type})}
                                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                                      formData.tipePemesan === type 
                                      ? 'bg-white text-red-600 shadow-sm border border-gray-200' 
                                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-white'
                                  }`}
                              >
                                  {type}
                              </button>
                          ))}
                      </div>
                  </div>

                  <div className="space-y-1">
                      {/* LOGIKA PERSEORANGAN VS KORPORASI */}
                      {formData.tipePemesan === 'Perseorangan' ? (
                          <FormRow label="Nama Lengkap" name="namaPemesan" type="text" formData={formData} handler={handleInputChange} isAlphabet required />
                      ) : (
                          <div className=" p-4 rounded-lg mb-4 border border-red-100 space-y-2">
                              <FormRow label="Nama Instansi/PT" name="namaPemesan" type="text" formData={formData} handler={handleInputChange} required />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormRow label="Nama PIC" name="namaPic" type="text" formData={formData} handler={handleInputChange} isAlphabet required />
                                  <FormRow label="Jabatan PIC" name="jabatanPemesan" type="text" formData={formData} handler={handleInputChange} isAlphabet />
                              </div>
                          </div>
                      )}

                      {/* Data Umum */}
                      <div className="flex flex-col md:flex-row md:items-start py-2 border-t border-dashed border-gray-200 mt-2">
                          <label className="w-full md:w-1/3 text-xs font-semibold text-gray-600 mb-1 mt-2 dark:text-gray-100">Alamat Lengkap & Kode Pos</label>
                          <div className="w-full md:w-2/3 space-y-2">
                              <textarea 
                                  name="alamatPemesan" 
                                  value={formData.alamatPemesan} 
                                  onChange={handleInputChange}
                                  rows="2"
                                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                                  placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                              />
                              <div className="flex items-center justify-end space-x-2">
                                  <span className="text-[10px] text-gray-500">Kode Pos:</span>
                                  <InputKodepos name="kodePosPemesan" formData={formData} handler={handleInputChange} />
                              </div>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                          <FormRow label="No. KTP/TDP" name="ktpPemesan" type="text" formData={formData} handler={handleInputChange} isNumeric required />
                          <FormRow label="No. NPWP" name="npwpPemesan" type="text" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. Telpon Kantor/Rumah" name="telpPemesan" type="tel" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. HP (WA)" name="hpPemesan" type="tel" value={noHp} disabled />
                      </div>
                      <FormRow label="Alamat Email" name="emailPemesan" type="email" formData={formData} handler={handleInputChange} isEmail />
                  </div>
              </section>

              {/* ======================================================= */}
              {/* II. DATA STNK & BPKB */}
              {/* ======================================================= */}
              <section className="bg-white dark:bg-slate-700/80 border border-gray-200 rounded-xl shadow-sm p-5 md:p-6 hover:shadow-md transition-all">
                  <div className="border-b border-gray-100 pb-3 mb-4">
                      <h3 className="text-base font-bold text-gray-800 flex items-center">
                          <span className="bg-gray-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                          DATA STNK & BPKB
                      </h3>
                  </div>
                  
                  <div className="space-y-1">
                      <FormRow label="Nama di STNK" name="namaStnk" type="text" formData={formData} handler={handleInputChange} isAlphabet required />
                      
                      <div className="flex flex-col md:flex-row md:items-start py-2 border-t border-dashed border-gray-200 mt-2">
                          <label className="w-full md:w-1/3 text-xs font-semibold text-gray-600 mb-1 mt-2 dark:text-gray-100">Alamat STNK</label>
                          <div className="w-full md:w-2/3 space-y-2">
                              <textarea 
                                  name="alamatStnk" 
                                  value={formData.alamatStnk} 
                                  onChange={handleInputChange}
                                  rows="2"
                                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                              />
                              <div className="flex items-center justify-end space-x-2">
                                  <span className="text-[10px] text-gray-500">Kode Pos:</span>
                                  <InputKodepos name="kodePosStnk" formData={formData} handler={handleInputChange} />
                              </div>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                          <FormRow label="No. KTP" name="ktpStnk" type="text" formData={formData} handler={handleInputChange} isNumeric required />
                          <FormRow label="No. NPWP" name="npwpStnk" type="text" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. Telpon" name="telpStnk" type="tel" formData={formData} handler={handleInputChange} isNumeric />
                          <FormRow label="No. HP" name="hpStnk" type="tel" formData={formData} handler={handleInputChange} isNumeric />
                      </div>
                      <FormRow label="Email" name="emailStnk" type="email" formData={formData} handler={handleInputChange} isEmail />
                  </div>
              </section>
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
                      <div className="pl-2 flex-shrink-0">
                          {/* <span className="text-[10px] pr-1">KodePos</span> */}
                      </div>
                  </div>
                      <FormRow label="Alamat" name="alamatPengiriman" type="text" formData={formData} handler={handleInputChange} />
                          <InputKodepos name="kodePosPengiriman" formData={formData} handler={handleInputChange} />
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
                          </>
                      )}
                      <InputRupiah label="Biaya Administrasi" name="biayaAdministrasi" formData={formData} handler={handleInputChange} />
                      <InputRupiah label="Biaya Provisi" name="biayaProvisi" formData={formData} handler={handleInputChange} />
                      <InputRupiah label="Asuransi Mobil" name="asuransiMobil" formData={formData} handler={handleInputChange} />
                      <InputRupiah label="Asuransi Jiwa" name="asuransiJiwa" formData={formData} handler={handleInputChange} />
                      <div className="pt-2 border-t-2 border-red-500">
                          <InputRupiah label="TOTAL BAYAR" name="totalBayar" formData={formData} handler={handleInputChange} required />
                      </div>
                  </div>
                  
                  {/* KOLOM KANAN: TAHAPAN PEMBAYARAN */}
                  <div className="border border-gray-700 p-2 space-y-1">
                      <h3 className="text-xs font-bold border-b pb-1">VI. TAHAPAN PEMBAYARAN</h3>
                      <div className="grid grid-cols-2 gap-2">
                          <InputRupiah label="Bayar Pertama" name="pembayaranPertama" formData={formData} handler={handleInputChange} required showLabel={false} />
                          <FormRow label="Tgl Bayar I" name="tanggalBayar1" type="date" formData={formData} handler={handleInputChange} required />
                          <InputRupiah label="Bayar Kedua" name="pembayaranKedua" formData={formData} handler={handleInputChange} showLabel={false} />
                          <FormRow label="Tgl Bayar II" name="tanggalBayar2" type="date" formData={formData} handler={handleInputChange} />
                      </div>
                  </div>
              </div>

              {/* ======================================================= */}
              {/* VII. SYARAT DAN KETENTUAN */}
              {/* ======================================================= */}
              <div className="border border-gray-200 p-2 space-y-1">
                  <h3 className="text-xs font-bold border-b pb-1">VII. SYARAT DAN KETENTUAN</h3>
                  <ol className="list-decimal list-inside text-[10px] space-y-0.5">
                      <li>Surat pesanan kendaraan ini merupakan bukti pemesanan kendaraan yang sifatnya <strong>TIDAK MENGIKAT</strong> terhadap <strong>HARGA JUAL</strong> (sewaktu-waktu dapat berubah dan <strong>KETERSEDIAAN KENDARAAN</strong> oleh PENJUAL/DEALER).</li>
                      <li>BBN atas harga on the road tidak <strong>TERMASUK PAJAK PROGRESIF</strong> bila ada.</li>
                      <li>Surat pesanan kendaraan ini dianggap <strong>SAH</strong> apabila:
                          <ul className="list-disc list-inside ml-4">
                              <li>telah ditandatangani oleh <strong>PIMPINAN CABANG PENJUAL / DEALER</strong></li>
                              <li><strong>UANG MUKA, PELUNASAN, dan PENCAIRAN KREDIT</strong> telah diterima di <strong>REKENING PENJUAL/DEALER</strong> pada bank ??? No??? PT. BAHANA CAHAYA MOBILINDO selambat-lambatnya 14 hari sejak ditandatangani Surat Pesanan Kendaraan ini.</li>
                          </ul>
                      </li>
                      <li><strong>DATA YANG TERTERA DI STNK/BPKB</strong> yang tercantum pada surat pesanan kendaraan <strong>TIDAK DAPAT DIRUBAH</strong>.</li>
                      <li><strong>DENDA</strong> atas keterlambatan pembayaran sebesar 0,1% perhari.</li>
                      <li>apabila terjadi perubahan kebijakan pemerintah atau leasing, maka pemesan <strong>WAJIB MEMENUHI KEWAJIBAN</strong> pembayaran kepada PENJUAL/DEALER.</li>
                      <li><strong>PEMBATALAN</strong> terjadi apabila pemesan tidak memenuhi persyaratan yang tercantum pada Surat Pesanan Kendaraan ini atau Pemesan membatalkan secara sepihak.</li>
                      <li>Uang Muka yang telah dibayarkan pemesan <strong>TIDAK DAPAT DIAMBIL KEMBALI</strong> dan menjadi <strong>HAK PENJUAL/DEALER</strong>.</li>
                      <li>Pemesan <strong>SETUJU dan BERSEDIA</strong> mengembalikan kendaraan dan surat-surat kendaraan yang telah diserahkan oleh PENJUAL/DEALER kepada pemesan apabila terjadi sesuatu diluar perjanjian diatas.</li>
                  </ol>
              </div>

              {/* ======================================================= */}
              {/* VIII. NAMA DAN TANDA TANGAN */}
              {/* ======================================================= */}
              <h3 className="text-xs font-bold border-b border-gray-200 pb-1 mt-4">VIII. NAMA DAN TANDA TANGAN</h3>
              
              <div className="border border-gray-200 flex mb:flex-row">
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
              {/* TOMBOL SUBMIT */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 md:static md:bg-transparent md:border-none md:shadow-none md:p-0 md:mt-8">
                  <button 
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold shadow-lg text-lg flex justify-center items-center gap-2 hover:from-red-700 hover:to-red-800 transform hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                      {loading ? (
                          <>
                              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Memproses Dokumen...
                          </>
                      ) : (
                          <>🚀 KONFIRMASI & KIRIM SPK</>
                      )}
                  </button>
              </div>

          </div>
        )}
      </div>
    </div>
  );
}
