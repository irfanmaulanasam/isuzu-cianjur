'use client';
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_DATA } from "@/src/data/config/TCO_Default";
import { TCOCalculator } from "@/src/data/utils/tco-calculator";
import { Section } from "@/app/components/CalculatorUI/Section";
import { Input } from "@/app/components/CalculatorUI/Input";
import { Result } from "@/app/components/CalculatorUI/Result";
import Breadcrumb from "@/app/components/Breadcrumb";

const formatRp = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

export default function VehicleCostCalculatorPage() {
  const searchParams = useSearchParams();
  
  const modelParam = searchParams.get('model');
  const kmParam = searchParams.get('km');
  const fuelParam = searchParams.get('fuel');

  const [data, setData] = useState(() => {
    if (modelParam) {
      const tcoResult = TCOCalculator.calculateVehicleTCO(modelParam, {
        dailyKm: Number(kmParam) || undefined,
        fuelPrice: Number(fuelParam) || undefined
      });
      
      if (tcoResult) {
        return {
          ...DEFAULT_DATA,
          hargaTruk: tcoResult.vehiclePrice,
          rasioBBM: tcoResult.fuelConsumption,
          jarakTahunan: tcoResult.yearlyKm,
          hargaSolar: Number(fuelParam) || 12000,
          asuransi: tcoResult.biayaTetap.asuransi,
          perawatan: tcoResult.biayaVariabel.service + tcoResult.biayaVariabel.oli,
          ban: tcoResult.biayaVariabel.ban
        };
      }
    }
    
    return DEFAULT_DATA;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : Number(value);
    setData(prev => ({ ...prev, [name]: numericValue }));
  };

  const result = useMemo(() => {
    const hTruk = data.hargaTruk || 0;
    const uPakai = data.umurPakai || 1;
    const nSisa = data.nilaiSisa || 0;
    const bKredit = (data.bungaKredit || 0) / 100;
    const kPajak = data.kirPajak || 0;
    const asu = data.asuransi || 0;
    const gSupir = data.gajiSupir || 0;
    const hSolar = data.hargaSolar || 0;
    const rBBM = data.rasioBBM || 1;
    const jTahunan = data.jarakTahunan || 1;
    const pRawat = data.perawatan || 0;
    const banCost = data.ban || 0;
    const tenor = data.tenor || 1;
    const uMuka = data.uangMuka || 0;

    const nilaiPinjaman = hTruk > uMuka ? hTruk - uMuka : 0;
    const totalBungaFlat = nilaiPinjaman * bKredit * tenor;
    const pokokTahunan = tenor > 0 ? nilaiPinjaman / tenor : nilaiPinjaman;
    const bungaTahunan = tenor > 0 ? totalBungaFlat / tenor : totalBungaFlat;
    const angsuranTahunan = pokokTahunan + bungaTahunan;

    const penyusutanEkonomi = uPakai > 0 ? (hTruk - (hTruk * nSisa)) / uPakai : (hTruk - (hTruk * nSisa));
    const fixedCost = angsuranTahunan + kPajak + asu + gSupir * 12;

    const konsumsiBBM = rBBM > 0 ? jTahunan / rBBM : 0;
    const biayaBBM = konsumsiBBM * hSolar;
    const variableCost = biayaBBM + pRawat + banCost;

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
      costPerKm,
      konsumsiBBM
    };
  }, [data]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-0 min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <Breadcrumb />
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 pb-2">
          Vehicle Cost Calculator {modelParam ? `- ${modelParam.toUpperCase()}` : ''}
        </h1>
      </div>
      
      {/* Info dari Hero Section */}
      {modelParam && (
        <div className="bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-lg">
            📊 Parameter dari Simulasi Cepat:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm p-3 rounded-lg border">
              <span className="text-slate-600 dark:text-slate-300">Model:</span>
              <div className="font-bold text-xl text-blue-600 dark:text-blue-400">{modelParam.toUpperCase()}</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm p-3 rounded-lg border">
              <span className="text-slate-600 dark:text-slate-300">Km/Hari:</span>
              <div className="font-bold text-xl text-emerald-600 dark:text-emerald-400">{kmParam || '150'} km</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm p-3 rounded-lg border">
              <span className="text-slate-600 dark:text-slate-300">Harga Solar:</span>
              <div className="font-bold text-xl text-amber-600 dark:text-amber-400">{formatRp(Number(fuelParam) || 12000)}/L</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Kiri - Form Inputs */}
        <div className="space-y-8">
          <Section title="💰 Harga & Finansial" className="dark:bg-slate-800/30">
            <Input
              label="Harga Kendaraan"
              name="hargaTruk"
              value={data.hargaTruk}
              onChange={handleChange}
              info="Harga total kendaraan OTR (On The Road)"
              isCurrency
            />
            <Input 
              label="Umur Pakai (tahun)"
              name="umurPakai" 
              value={data.umurPakai}
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
          
          <Section title="🏛️ Biaya Tetap Lain" className="dark:bg-slate-800/30">
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

        {/* Kolom Kanan - Results */}
        <div className="space-y-8">
          <Section title="⚡ Biaya Variabel" className="dark:bg-slate-800/30">
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
              name="rasioBBM" 
              value={data.rasioBBM} 
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
          
          <Section title="📈 Hasil Perhitungan TCO" className="dark:bg-gradient-to-br dark:from-emerald-900/20 dark:to-blue-900/20 border-2 border-emerald-200/50 dark:border-emerald-500/30 rounded-2xl shadow-2xl">
            <div className="space-y-4">
              <Result 
                label="💎 Total Biaya Operasional / Tahun" 
                value={formatRp(result.totalCost)} 
                highlight 
                className="text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg"
              />
              <Result 
                label="📅 Biaya per Bulan" 
                value={formatRp(result.totalCost / 12)} 
                className="text-lg font-semibold text-emerald-700 dark:text-emerald-300"
              />
              <Result 
                label="🚗 Biaya per Km" 
                value={`${formatRp(result.costPerKm)}/km`} 
                highlight 
                className="text-xl font-bold text-amber-600 dark:text-amber-400"
              />
              <hr className="border-slate-200 dark:border-slate-700 my-4" />
              <Result 
                label="🏗️ Biaya Tetap / Tahun" 
                value={formatRp(result.fixedCost)} 
              />
              <Result 
                label="🔧 Biaya Variabel / Tahun" 
                value={formatRp(result.variableCost)} 
              />
              <Result 
                label="⛽ Konsumsi BBM / Tahun"  
                value={`${(result.konsumsiBBM / 1000).toFixed(1)} kL`} 
                info="Dalam kiloliter (1 kL = 1,000 Liter)"
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}