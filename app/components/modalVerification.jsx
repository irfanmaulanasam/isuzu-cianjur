'use client';
import { useState } from 'react';

// Asumsi: Di sini Anda punya logic untuk panggil API /api/send-wa 
// untuk kirim OTP, lalu cek apakah OTP yang dimasukkan benar.

export default function ModalVerifikasi({ phoneNumber, onVerificationSuccess, onClose }) {
  const [otpInput, setOtpInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Input OTP

  // --- Fungsi yang mengurus kirim kode OTP ke WA (panggil /api/send-wa) ---
  const sendCode = async () => {
    // Logika kirim OTP seperti di penjelasan sebelumnya
    setLoading(true);
    // ... logic fetch ke /api/send-wa untuk mengirim kode ...
    setLoading(false);
    setStep(2); // Pindah ke langkah input kode
  };
  
  // --- Fungsi yang mengurus verifikasi kode (setelah kode diterima) ---
  const verifyCode = async () => {
    // Logic cek OTP (bandingkan otpInput dengan kode yang dikirim/disimpan)
    if (otpInput === '1234') { // <--- GANTI dengan logic check OTP yang sebenarnya
        alert("Verifikasi Berhasil!");
        onVerificationSuccess(); // Panggil fungsi di parent (UnitOrderForm)
    } else {
        alert("Kode OTP salah.");
    }
  };
  
  // ... (Kode untuk desain modal, backdrop, input, dll.) ...

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full text-center">
        <h3 className="text-xl font-bold mb-4 text-red-600">Verifikasi Nomor</h3>
        
        {step === 1 && (
            <>
                <p className="mb-4">Kami akan mengirim kode OTP ke:</p>
                <p className="text-lg font-bold mb-6">{phoneNumber}</p>
                <button onClick={sendCode} disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg">
                    {loading ? 'Mengirim...' : 'Kirim Kode via WhatsApp'}
                </button>
            </>
        )}
        
        {step === 2 && (
            <>
                <p className="mb-4">Masukkan kode 4 digit yang Anda terima.</p>
                <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} maxLength={4} className="w-full text-center text-2xl border-2 border-slate-300 rounded-lg py-2 mb-4"/>
                <button onClick={verifyCode} className="w-full bg-red-600 text-white py-2 rounded-lg mb-2">
                    Verifikasi Kode
                </button>
            </>
        )}
        
        <button onClick={onClose} className="mt-4 text-sm text-slate-500 hover:text-red-600">
            Batal
        </button>
      </div>
    </div>
  );
}