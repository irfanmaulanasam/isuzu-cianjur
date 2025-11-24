'use client'

import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';

// == KOMPONEN PEMBANTU (READABILITY & RESPONSIVITAS) ==
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';
import RadioGroup from '../components/ui/RadioGroup';

// == KOMPONEN UTAMA (SPKAdvanced) ==
  export default function SPKAdvanced() {

  // State Logika
  const [step, setStep] = useState(1); // 1: Input WA, 2: OTP, 3: Form SPK
  const [loading, setLoading] = useState(false);
  
  // State Data Verifikasi
  const [noHp, setNoHp] = useState('');
  const [otpSent, setOtpSent] = useState(''); // OTP yang dikirim sistem
  const [otpInput, setOtpInput] = useState(''); // OTP yang diinput user
  
  // State Data SPK Lengkap
  const [formData, setFormData] = useState({
    // I. Data Pemesan
    nama: '', alamat: '', telp: '', fax: '', ktp: '',
    jabatan: '', npwp: '', hp: '', email: '', kodePos: '',

    // II. Data Kendaraan
    jumlahKendaraan: 1, typeKendaraan: '', modelKendaraan: '', 
    warna: '', karoseri: '', nomorPilihan: '',

    // III. Pembayaran & Harga
    pilihanPembelian: 'OTR', // Off The Road (OTR) / BBN
    hargaOffOnRoad: 0, tradeIn: 0, 
    metodePembayaran: 'Cash', // Cash / Kredit
    uangMuka: 0, angsuranPertama: 0, biayaAdministrasi: 0, 
    totalBayar: 0, // Dihitung otomatis
    pembayaranPertama: 0, tanggalBayar: '',
  });

  const sigCanvas = useRef({});

  // --- FUNGSI UNIVERSAL: HANDLE INPUT ---
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;

    // Konversi angka jika diperlukan dan hapus koma/titik jika ada
    if (type === 'number') {
        const cleanValue = value.replace(/[^0-9]/g, '');
        finalValue = cleanValue === '' ? 0 : parseInt(cleanValue, 10);
    }

    setFormData(prevData => ({
        ...prevData,
        [name]: finalValue,
    }));
  };

  // --- FUNGSI 1: VERIFIKASI NOMOR WA ---
  const sendOTP = async () => {
    if (noHp.length < 10) return alert("Nomor WA tidak valid!");
    
    setLoading(true);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setOtpSent(code);

    try {
      // Panggil API kita sendiri (simulasi)
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
        setStep(2); 
        alert("Kode OTP sudah dikirim ke WhatsApp Konsumen!");
      } else {
        alert("Gagal kirim ke nomor tersebut. Pastikan nomor terdaftar di WA! (Simulasi: OTP diterima)");
        setStep(2); // Lanjut ke step 2 untuk simulasi jika API WA gagal
      }
    } catch (err) {
      console.log(err,'error sistem pengiriman WA');
      alert("Error sistem pengiriman WA. (Simulasi: OTP diterima)");
      setStep(2); // Lanjut ke step 2 untuk simulasi jika error
    }
    setLoading(false);
  };

  const verifyOTP = () => {
    // 💡 Di kondisi sebenarnya, Anda harus cek ke DB/Cache OTP
    if (otpInput === otpSent || otpInput === '1234') { // Tambahkan '1234' sebagai master code untuk tes
      alert("✅ Nomor Terverifikasi!");
      setFormData(prev => ({...prev, hp: noHp})); // Simpan noHp ke formData
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
    // 💡 Validasi wajib
    if (sigCanvas.current.isEmpty()) return alert("Tanda tangan wajib diisi!");
    if (!formData.nama || !formData.modelKendaraan || !formData.hargaOffOnRoad || !formData.tanggalBayar) {
        return alert("Harap lengkapi field wajib (*) sebelum submit!");
    }
    
    setLoading(true);
    const doc = new jsPDF();
    const Rupiah = (num) => new Intl.NumberFormat('id-ID').format(num);
    let y = 20; 

    // 1. JUDUL DAN INFO DASAR
    doc.setFontSize(20); doc.text("SURAT PESANAN KENDARAAN (SPK) ISUZU", 105, y, null, null, "center");
    y += 10;
    doc.setFontSize(10); doc.text(`Tanggal SPK: ${new Date().toLocaleDateString('id-ID')}`, 180, y);
    y += 10;
    
    // 2. DATA PEMESAN (Kolom)
    doc.setFontSize(14); doc.text("I. DATA PEMESAN", 20, y);
    y += 5; doc.line(20, y, 190, y); y += 5;
    
    doc.setFontSize(10);
    doc.text(`Nama: ${formData.nama}`, 20, y); doc.text(`KTP: ${formData.ktp}`, 110, y); y += 5;
    doc.text(`Alamat: ${formData.alamat}`, 20, y); doc.text(`NPWP: ${formData.npwp || '-'}`, 110, y); y += 5;
    doc.text(`Jabatan: ${formData.jabatan || '-'}`, 20, y); doc.text(`Telp/Fax: ${formData.telp || '-'}`, 110, y); y += 5;
    doc.text(`WA: ${noHp}`, 20, y); doc.text(`Email: ${formData.email || '-'}`, 110, y); y += 10;

    // 3. DATA KENDARAAN
    doc.setFontSize(14); doc.text("II. DATA KENDARAAN", 20, y);
    y += 5; doc.line(20, y, 190, y); y += 5;
    
    doc.setFontSize(10);
    doc.text(`Model Unit: ${formData.modelKendaraan} (${formData.typeKendaraan})`, 20, y); doc.text(`Warna: ${formData.warna}`, 110, y); y += 5;
    doc.text(`Jumlah: ${formData.jumlahKendaraan}`, 20, y); doc.text(`Nomor Pilihan: ${formData.nomorPilihan || '-'}`, 110, y); y += 5;
    doc.text(`Karoseri: ${formData.karoseri || '-'}`, 20, y); y += 10;

    // 4. DATA PEMBAYARAN
    doc.setFontSize(14); doc.text("III. SKEMA PEMBAYARAN", 20, y);
    y += 5; doc.line(20, y, 190, y); y += 5;

    doc.setFontSize(10);
    doc.text(`Pilihan Harga: ${formData.pilihanPembelian}`, 20, y); doc.text(`Metode: ${formData.metodePembayaran.toUpperCase()}`, 110, y); y += 5;
    doc.text(`Harga ${formData.pilihanPembelian}: Rp ${Rupiah(formData.hargaOffOnRoad)}`, 20, y); doc.text(`Trade In: Rp ${Rupiah(formData.tradeIn)}`, 110, y); y += 5;
    
    if (formData.metodePembayaran === 'Kredit') {
        doc.text(`Uang Muka (DP): Rp ${Rupiah(formData.uangMuka)}`, 20, y); doc.text(`Angs. 1: Rp ${Rupiah(formData.angsuranPertama)}`, 110, y); y += 5;
        doc.text(`Biaya Adm: Rp ${Rupiah(formData.biayaAdministrasi)}`, 20, y); y += 5;
    }
    
    doc.setFontSize(12); doc.text(`TOTAL BAYAR: Rp ${Rupiah(formData.hargaOffOnRoad)}`, 20, y); 
    doc.text(`Pembayaran Pertama: Rp ${Rupiah(formData.pembayaranPertama)}`, 110, y); y += 5;
    doc.setFontSize(10); doc.text(`Tanggal Pembayaran: ${formData.tanggalBayar}`, 110, y); y += 15;
    
    // 5. TANDA TANGAN
    doc.setFontSize(12);
    doc.text("Konsumen", 30, y); doc.text("Sales", 150, y); y += 5;

    // Masukkan Tanda Tangan Konsumen
    const imgData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 25, y, 50, 30);
    
    // Kotak TTD Sales
    doc.rect(140, y, 50, 30); 
    
    y += 40;
    doc.text(`( ${formData.nama} )`, 30, y); doc.text(`( Sales / Counter )`, 150, y); y += 10;
    
    // 6. KIRIM DAN SIMPAN
    const pdfDataUri = doc.output('datauristring'); 
    
    try {
      const res = await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: noHp,
          message: `Terima kasih Pak/Bu ${formData.nama}. Berikut adalah dokumen SPK Digital Anda untuk unit ${formData.modelKendaraan}.`,
          file: pdfDataUri, // Mengirim Data URI Base64
          filename: `SPK-${formData.nama}-${Date.now()}.pdf`
        }),
      });
      
      const data = await res.json();
      
      if (data.status === true) {
        alert("🎉 SUKSES! SPK telah terkirim ke WhatsApp Konsumen.");
      } else {
         alert(`✅ SPK tersimpan. Gagal kirim otomatis via WA. Cek log server API: ${data.message || 'Error API'}`);
      }

      // Selalu Download ke device Sales sebagai backup
      doc.save(`SPK-${formData.nama}-${Date.now()}.pdf`);
      window.location.reload(); 
      
    } catch (err) {
      console.error("Error saat mengirim data:", err);
      alert("⚠️ Error sistem. PDF tersimpan di tablet, tapi gagal kirim otomatis. Cek log konsol.");
      doc.save(`SPK-${formData.nama}-${Date.now()}.pdf`);
    }
    setLoading(false);
  };


  // --- RENDER TAMPILAN ---
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full">
        
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

        {/* STEP 3: FORM SPK UTAMA (Responsive Refactor) */}
        {step === 3 && (
            <div className="space-y-6">
                <div className="text-center pb-4 border-b">
                    <h2 className="text-2xl font-bold text-red-700">SURAT PESANAN KENDARAAN</h2>
                    <p className="text-sm text-gray-500">Isuzu | Nomor WA Terverifikasi: {noHp} <span className="text-green-600">✅</span></p>
                </div>

                {/*  BAGIAN 1: DATA PEMESAN */}
                <section className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Data Pemesan</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <InputField label="Nama Lengkap *" name="nama" type="text" formData={formData} handler={handleInputChange} required />
                            <InputField label="No. KTP/TDP *" name="ktp" type="text" formData={formData} handler={handleInputChange} required />
                            <InputField label="No. Telpon" name="telp" type="tel" formData={formData} handler={handleInputChange} />
                        </div>

                        <div className="space-y-3">
                            <InputField label="No. HP (Otomatis dari verifikasi)" name="hp" type="tel" value={noHp} disabled /> 
                            <InputField label="Email" name="email" type="email" formData={formData} handler={handleInputChange} />
                            <InputField label="Jabatan/Perusahaan" name="jabatan" type="text" formData={formData} handler={handleInputChange} />
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <InputField label="Alamat Lengkap *" name="alamat" type="textarea" formData={formData} handler={handleInputChange} rows="2" required />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="No. NPWP" name="npwp" type="text" formData={formData} handler={handleInputChange} />
                            <InputField label="Kode Pos" name="kodePos" type="text" formData={formData} handler={handleInputChange} />
                        </div>
                    </div>
                </section>

                {/*  BAGIAN 2: DATA KENDARAAN */}
                {/*   */}
                <section className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Data Kendaraan</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <SelectField label="Tipe Kendaraan *" name="typeKendaraan" formData={formData} handler={handleInputChange} options={['Pick Up/Box', 'Truck', 'Bus']} required />
                        <SelectField label="Model Kendaraan *" name="modelKendaraan" formData={formData} handler={handleInputChange} options={['Isuzu Traga', 'Isuzu ELF NLR', 'Isuzu GIGA', 'Isuzu MUX']} required />
                        <InputField label="Warna Kendaraan" name="warna" type="text" formData={formData} handler={handleInputChange} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Jumlah Kendaraan" name="jumlahKendaraan" type="number" formData={formData} handler={handleInputChange} />
                        <InputField label="Nomor Pilihan (Jika ada)" name="nomorPilihan" type="text" formData={formData} handler={handleInputChange} />
                    </div>

                    <InputField label="Keterangan Karoseri / Tambahan" name="karoseri" type="textarea" formData={formData} handler={handleInputChange} rows="2" />
                </section>
                
                {/*  BAGIAN 3: CARA PEMBAYARAN & HARGA */}
                {/*   */}
                <section className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Pembayaran & Harga</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kolom Kiri - Pilihan Pembelian & Metode */}
                        <div className="space-y-4">
                            <RadioGroup 
                                label="Pilihan Harga *" 
                                name="pilihanPembelian" 
                                formData={formData} 
                                handler={handleInputChange} 
                                options={[{value: 'OTR', label: 'On The Road (OTR)'}, {value: 'BBN', label: 'Off The Road (BBN)'}]} 
                            />

                            <InputField 
                                label={`Harga ${formData.pilihanPembelian} (Rp) *`} 
                                name="hargaOffOnRoad" 
                                type="number" 
                                formData={formData} 
                                handler={handleInputChange} 
                                required 
                            />
                            
                            <RadioGroup 
                                label="Metode Pembayaran *" 
                                name="metodePembayaran" 
                                formData={formData} 
                                handler={handleInputChange} 
                                options={[{value: 'Cash', label: 'Cash'}, {value: 'Kredit', label: 'Kredit'}]} 
                            />

                            {formData.metodePembayaran === 'Kredit' && (
                                <div className="space-y-3 border-t pt-3">
                                    <InputField label="Uang Muka (DP) (Rp)" name="uangMuka" type="number" formData={formData} handler={handleInputChange} />
                                    <InputField label="Angsuran Pertama (Rp)" name="angsuranPertama" type="number" formData={formData} handler={handleInputChange} />
                                    <InputField label="Biaya Administrasi (Rp)" name="biayaAdministrasi" type="number" formData={formData} handler={handleInputChange} />
                                </div>
                            )}
                        </div>
                        
                        {/* Kolom Kanan - Detail Harga & Total */}
                        <div className="space-y-4">
                            <InputField label="Harga Trade In (Rp)" name="tradeIn" type="number" formData={formData} handler={handleInputChange} />
                            
                            <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded">
                                <label className="block text-sm font-bold text-red-700">TOTAL HARGA (Rp)</label>
                                {/* Menampilkan hargaOffOnRoad sebagai simulasi total */}
                                <div className="text-xl font-extrabold text-red-700 mt-1">
                                    Rp {new Intl.NumberFormat('id-ID').format(formData.hargaOffOnRoad || 0)}
                                </div>
                            </div>

                            <InputField label="Pembayaran Pertama (Rp) *" name="pembayaranPertama" type="number" formData={formData} handler={handleInputChange} required />
                            <InputField label="Tanggal Pembayaran Pertama *" name="tanggalBayar" type="date" formData={formData} handler={handleInputChange} required />
                        </div>
                    </div>
                </section>

                {/*   BAGIAN 4: TANDA TANGAN & SUBMIT   == */}
                <section className="bg-white p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Persetujuan dan Tanda Tangan</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-white">
                            <SignatureCanvas ref={sigCanvas} penColor='black' canvasProps={{ className: 'w-full h-40' }} />
                            <p className="text-center text-xs text-gray-500 pt-1 border-t mt-1">Tanda Tangan Konsumen (Wajib)</p>
                            <p className="text-center text-sm font-bold mt-1">( {formData.nama || 'Nama Konsumen'} )</p>
                        </div>
                        
                        <div className="flex flex-col justify-end text-center p-4">
                            <p className="text-sm font-semibold mb-6">Persetujuan Sales dan Pimpinan Cabang:</p>
                            <div className="border-b border-gray-400 pb-1 mb-4 text-sm font-medium">Sales / Counter</div>
                            <div className="border-b border-gray-400 pb-1 mb-2 text-sm font-medium">Pimpinan Cabang</div>
                            <p className="text-xs text-gray-500 mt-4">Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleFinalSubmit}
                        disabled={loading}
                        className="w-full mt-6 bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg text-lg flex justify-center items-center gap-2 hover:bg-red-700 transition duration-150 disabled:bg-gray-400"
                    >
                        {loading ? "Memproses Dokumen..." : "🚀 DEAL & KIRIM SPK"}
                    </button>
                </section>
            </div>
        )}

      </div>
    </div>
  );
}