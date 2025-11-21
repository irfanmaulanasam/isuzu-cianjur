'use client'; // 👈 Wajib di Next.js untuk menggunakan hooks seperti useState, useMemo, dan useEffect

import { useState, useMemo, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // 👈 Next.js Navigation
import DEFAULT_DATA from "@/src/data/utils/calculator-data/DEFAULT_DATA"
import { autoCompleteSlug } from "@/data/utils/autoCompleteSlug";
import { cleanPrice } from "@/data/calculator-data/cleanPrice";
import { specs, allSpecSlugs } from "@/data/specs";
import { Section } from "@/app/components/CalculatorUI/Section";
import {Input} from "@/app/components/CalculatorUI/Input"
import {Result} from "@/app/components/CalculatorUI/Result"
// Helper untuk format Rupiah
const formatRp = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

export default function VehicleCostCalculatorPage() {
  const router = useRouter(); // 👈 Next.js router
  const pathname = usePathname(); // 👈 Next.js pathname (e.g., /vehicle-cost/traga)
  
  // Ambil slug dari pathname (e.g., /vehicle-cost/SLUG)
  const slug = pathname.split('/').pop();
  const isDefaultPath = slug === 'vehicle-cost'; // Check jika di path utama
  
  const [data, setData] = useState(DEFAULT_DATA);
  
  // --- LOGIKA LOAD DATA & REDIRECT ---
  useEffect(() => {
    // 1. KONDISI DEFAULT (/vehicle-cost)
    if (isDefaultPath) {
      if (data.hargaTruk !== DEFAULT_DATA.hargaTruk) {
        setData(DEFAULT_DATA);
      }
      return; 
    }
    
    // 2. KONDISI SLUG ADA: Autocomplete & Redirect
    const actualSlug = autoCompleteSlug(slug);
    
    if (actualSlug && actualSlug !== slug) {
        // Redirect ke URL yang benar
        router.replace(`/vehicle-cost/${actualSlug}`); 
        return; 
    }
    
    // 3. Load Data Spesifik
    const found = specs[actualSlug];
    if (found) {
        const priceNumber = cleanPrice(found.price);
        setData(prevData => ({
          ...prevData, 
          hargaTruk: priceNumber, 
          // Jika ada data lain di 'specs' yang ingin di-update, tambahkan di sini
        }));
    } else {
        // Fallback: Jika slug valid namun tidak ditemukan
        const fallbackSlug = allSpecSlugs.find(s => s.includes(slug));
        if (fallbackSlug) {
            router.replace(`/vehicle-cost/${fallbackSlug}`);
        } else {
            setData(DEFAULT_DATA);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]); // router tidak perlu dimasukkan karena tidak akan berubah
  
  // --- HANDLER ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nilai string kosong ('') diubah menjadi 0
    const numericValue = Number(value === '' ? 0 : value); 
    setData(prevData => ({ ...prevData, [name]: numericValue }));
  };

  // --- PERHITUNGAN (useMemo) ---
  const result = useMemo(() => {
    // Input Data dengan Fallback
    const hTruk = data.hargaTruk || 0;
    const uPakai = data.umurPakai || 1; 
    const nSisa = data.nilaiSisa || 0;
    const bKredit = data.bungaKredit || 0;
    const kPajak = data.kirPajak || 0;
    const asu = data.asuransi || 0;
    const gSupir = data.gajiSupir || 0;
    const hSolar = data.hargaSolar || 0;
    const rBBM = data.rasioBBM || 1; 
    const jTahunan = data.jarakTahunan || 1; 
    const pRawat = data.perawatan || 0;
    const banCost = data.ban || 0;
    // ------------------------------------
    const tenor = data.tenor || 1; // Tenor dalam tahun (minimal 1)
    const uMuka = data.uangMuka || 0; 
    // ------------------------------------
    
    // 1. KOMPONEN KREDIT (FLAT RATE)
    const nilaiPinjaman = hTruk > uMuka ? hTruk - uMuka : 0;
    // Total Bunga Selama Tenor
    const totalBungaFlat = nilaiPinjaman * (bKredit / 100) * tenor;
    
    // Angsuran Pokok / Tahun
    const pokokTahunan = tenor > 0 ? nilaiPinjaman / tenor : nilaiPinjaman; 
    // Bunga Tahunan (Flat Rate)
    const bungaTahunan = tenor > 0 ? totalBungaFlat / tenor : totalBungaFlat;
    // Total Angsuran Kredit per Tahun
    const angsuranTahunan = pokokTahunan + bungaTahunan;
    
    // 2. BIAYA TETAP (FIXED COST)
    // Penyusutan Ekonomi (untuk Nilai Sisa):
    const penyusutanEkonomi = uPakai > 0 ? (hTruk - nSisa) / uPakai : (hTruk - nSisa); 
    // Fixed Cost = Angsuran Tahunan + Biaya Tetap Lain
    const fixedCost = angsuranTahunan + kPajak + asu + gSupir * 12;
    
    
    // 3. BIAYA VARIABEL
    const konsumsiBBM = rBBM > 0 ? jTahunan / rBBM : 0;
    const biayaBBM = konsumsiBBM * hSolar;
    const variableCost = biayaBBM + pRawat + banCost;
    
    // 4. TOTAL & PER KM
    const totalCost = fixedCost + variableCost;
    const costPerKm = jTahunan > 0 ? totalCost / jTahunan : 0; 
    return { 
        penyusutan: penyusutanEkonomi, 
        bunga: bungaTahunan, 
        pokokTahunan, 
        angsuranTahunan, 
        fixedCost, 
        variableCost, 
        totalCost, 
        costPerKm 
    };
  }, [data]);
  
  // --- RENDER ---
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-0">
      <h1 className="text-2xl font-bold text-center">
        Vehicle Cost Calculator {slug && !isDefaultPath ? `untuk ${slug}` : ''}
      </h1>
      <p className="text-center text-gray-600">
        Simulasi interaktif untuk menghitung biaya kendaraan komersial per tahun dan per kilometer
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <div className="space-y-6">
          <Section title="Harga & Finansial">
            <Input
              label="Harga Kendaraan + Aplikasi"
              name="hargaTruk"
              value={data.hargaTruk}
              onChange={handleChange}
              info="Harga total kendaraan beserta perlengkapan tambahan seperti box atau GPS."
              isCurrency
            />
            <Input 
              label="Umur Pakai (tahun)"
              name="umurPakai" value={data.umurPakai}
              onChange={handleChange}
              info="Estimasi umur ekonomis kendaraan sebelum diganti." 
            />
            <Input 
              label="Nilai Sisa"
              name="nilaiSisa"
              value={data.nilaiSisa}
              onChange={handleChange}
              info="Nilai jual kembali kendaraan di akhir umur pakai." 
              isCurrency
            />
            <Input 
                label="Uang Muka (Down Payment)"
                name="uangMuka"
                value={data.uangMuka}
                onChange={handleChange}
                info="Uang muka yang dibayarkan di awal transaksi kredit." 
                isCurrency
            />
            <Input 
                label="Tenor Kredit (Tahun)"
                name="tenor"
                value={data.tenor}
                onChange={handleChange}
                info="Jangka waktu kredit dalam tahun." 
            />
            <Input
              label="Bunga Kredit Tahunan (%)"
              name="bungaKredit"
              value={data.bungaKredit}
              onChange={handleChange}
              info="Persentase bunga tahunan yang diterapkan oleh lembaga pembiayaan (flat rate)." 
              suffix=" %"
              decimalScale={2}
            />
          </Section>
          
          <Section title="Biaya Tetap Lain">
            <Input 
              label="KIR & Pajak / Tahun"
              name="kirPajak"
              value={data.kirPajak}
              onChange={handleChange}
              info="Biaya tahunan seperti KIR, pajak, dan administrasi kendaraan." 
              isCurrency
            />
            <Input
              label="Asuransi / Tahun"
              name="asuransi"
              value={data.asuransi}
              onChange={handleChange}
              info="Premi tahunan asuransi kendaraan."
              isCurrency
            />
            <Input
              label="Gaji Supir / Bulan"
              name="gajiSupir"
              value={data.gajiSupir}
              onChange={handleChange}
              info="Total gaji bulanan untuk pengemudi."
              isCurrency
            />
          </Section>
        </div>
        
        {/* Kolom Kanan */}
        <div className="space-y-6">
          <Section title="Biaya Variabel">
            <Input 
              label="Harga Solar per Liter"
              name="hargaSolar"
              value={data.hargaSolar}
              onChange={handleChange}
              info="Harga bahan bakar diesel yang digunakan."
              isCurrency
            />
            <Input
              label="Rasio Konsumsi BBM (Km/L)"
              name="rasioBBM" value={data.rasioBBM} 
              onChange={handleChange}
              info="Berapa kilometer yang bisa ditempuh tiap 1 liter solar." 
              suffix=" Km/L"
              decimalScale={2}
            />
            <Input 
                label="Jarak Tempuh per Tahun (Km)" 
                name="jarakTahunan" 
                value={data.jarakTahunan} 
                onChange={handleChange} 
                info="Perkiraan total jarak yang ditempuh kendaraan dalam setahun." 
                suffix=" Km"
            />
            <Input 
                label="Perawatan / Tahun" 
                name="perawatan" 
                value={data.perawatan} 
                onChange={handleChange} 
                info="Biaya servis rutin, oli, dan spare part." 
                isCurrency
            />
            <Input 
                label="Ban / Tahun" 
                name="ban" 
                value={data.ban} 
                onChange={handleChange} 
                info="Rata-rata biaya penggantian ban tahunan." 
                isCurrency
            />
          </Section>
          
          {/* HASIL PERHITUNGAN */}
          <Section title="Hasil Perhitungan">
            <Result label="Angsuran Pokok Kredit / Tahun" value={formatRp(result.pokokTahunan)} />
            <Result label="Bunga Kredit / Tahun" value={formatRp(result.bunga)} />
            <Result label="Total Angsuran Kredit / Tahun" value={formatRp(result.angsuranTahunan)} highlight />
            <hr className="my-2"/>
            <Result label="Penyusutan Ekonomi / Tahun" value={formatRp(result.penyusutan)} />
            <Result label="Total Fixed Cost (Termasuk Angsuran)" value={formatRp(result.fixedCost)} />
            <Result label="Total Variable Cost" value={formatRp(result.variableCost)} />
            <Result label="Total Biaya Operasional / Tahun" value={formatRp(result.totalCost)} highlight />
            <Result label="Biaya per Km" value={`${formatRp(result.costPerKm)}/km`} highlight />
          </Section>
        </div>
      </div>
    </div>
  );
}