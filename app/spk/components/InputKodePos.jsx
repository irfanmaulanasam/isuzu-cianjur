// components/InputKodepos.js
import React, { useRef, useEffect } from 'react';

export default function InputKodepos({ name, formData, handler }) {
    // Inisialisasi useRef dengan array kosong
    const inputRefs = useRef([]);

    // Reset refs saat komponen unmount atau update agar tidak memory leak
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 5);
    }, []);

    const handleChange = (index, value) => {
        // Hanya ambil angka
        const cleanValue = value.replace(/[^0-9]/g, '').slice(0, 1);
        
        // Copy state array yang ada (Safety check jika undefined)
        const currentKodepos = formData[name] || ['','','','',''];
        const newKodepos = [...currentKodepos];
        
        newKodepos[index] = cleanValue;
        
        // Kirim ke parent
        handler({ target: { name: name, value: newKodepos } });

        // Logic Auto-Focus Maju
        if (cleanValue && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    
    const handleKeyDown = (index, e) => {
        // Logic Auto-Focus Mundur (Backspace)
        if (e.key === 'Backspace' && !formData[name]?.[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Pastikan data kodepos ada, jika tidak buat array kosong 5 biji
    const values = formData[name] || ['','','','',''];

    return (
        <div className="flex space-x-1">
            {values.map((digit, index) => (
                <input
                    key={index}
                    // ✅ CARA AMAN: Assign ref di dalam callback ini, bukan di body function
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="tel" // Gunakan tel agar keyboard angka muncul di HP
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    className="w-8 h-8 text-center border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
            ))}
        </div>
    );
}