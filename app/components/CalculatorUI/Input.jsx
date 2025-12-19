"use client"
import { Info } from "lucide-react";
import { NumericFormat } from "react-number-format";

export function Input({ label, name, value, onChange, info, isCurrency, suffix = '', decimalScale = 0 }) {
  // Logic untuk menentukan decimalScale jika tidak ditentukan (khusus untuk persentase/rasio)
  const finalDecimalScale = name === 'bungaKredit' || name === 'rasioBBM' ? 2 : decimalScale;

  return (
    <div>
      <label className="font-medium text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
        {label} <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" title={info} />
      </label>

      <NumericFormat
        name={name}
        value={value ?? ''}

        // --- Konfigurasi Formatting ---
        thousandSeparator="."
        decimalSeparator=","
        prefix={isCurrency ? 'Rp ' : ''}
        suffix={suffix}
        allowNegative={false}
        decimalScale={finalDecimalScale}

        // --- Integrasi Handler ---
        onValueChange={(values) => {
          onChange({
            target: {
              name: name,
              value: values.floatValue ?? 0 // Pastikan nilainya berupa angka float
            }
          });
        }}

        className="w-full border rounded-lg p-2 mt-1 text-sm"
      />
      {/* Keterangan info di bawah input, dipindahkan dari file utama */}
      <span className="text-xs text-gray-500 dark:text-gray-200 block mt-1">{info}</span>
    </div>
  );
}