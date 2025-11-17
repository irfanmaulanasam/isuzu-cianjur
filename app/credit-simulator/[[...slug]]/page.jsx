// app/credit-simulator/[[...slug]]/page.jsx
import SimulasiKredit from "@/app/components/SimulasiKredit";

export default function CreditSimulatorPage() {
  return <SimulasiKredit />;
}
// 'use client'; 

// import { useState, useMemo, useEffect, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation"; 

// // Asumsi struktur data imports Anda (sesuaikan path jika perlu)
// import { IsuzuPrices } from "@/src/data/isuzuPrices"; 
// import { LeasingData } from "@/src/data/LeasingData"; 

// // Impor komponen yang telah dipecah
// import { Section } from "@/app/components/CalculatorUI/Section";
// import { Input } from "@/app/components/CalculatorUI/Input"; // Menggunakan InputForm
// import { Result } from "@/app/components/CalculatorUI/Result"; // Menggunakan SimulationResult
// import { autoCompleteSlug } from "@/src/data/utils/autoCompleteSlug"; 
// // Import lainnya seperti specs, allSpecSlugs, cleanPrice tidak digunakan di sini.

// // --- Data & Utils ---

// // Daftar semua model untuk datalist
// const allIsuzuModels = Object.values(IsuzuPrices).flat();

// /**
//  * Fungsi utilitas format Rupiah.
//  * @param {number} number - Nilai angka.
//  * @returns {string} - Nilai dalam format Rupiah.
//  */
// const formatRupiah = (number) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(number);

// /**
//  * Fungsi perhitungan Angsuran Bulanan (Flat Rate).
//  * @param {number} otrNumber - Harga OTR.
//  * @param {number} dp - Uang muka.
//  * @param {number} tenor - Tenor dalam bulan.
//  * @param {number} bunga - Bunga flat rate tahunan (misal: 0.05 untuk 5%).
//  * @returns {number} - Nilai angsuran bulanan.
//  */
// const hitungAngsuran = (otrNumber, dp, tenor, bunga) => {
//   if (otrNumber <= 0 || tenor <= 0) return 0;
  
//   const loanAmount = otrNumber - dp;
//   // Perhitungan Bunga (Flat Rate Tahunan)
//   const totalBunga = loanAmount * bunga * (tenor / 12); 
  
//   return (loanAmount + totalBunga) / tenor; // Angsuran Bulanan
// };

// /**
//  * Mengkonversi teks menjadi slug.
//  * @param {string} text 
//  * @returns {string}
//  */
// const toSlug = (text) => {
//     if (!text) return '';
//     return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
// };

// /**
//  * Mencari NAMA MODEL dari SLUG yang sesuai.
//  * @param {string} targetSlug 
//  * @param {Array<object>} models 
//  * @returns {string | null}
//  */
// const slugToModelName = (targetSlug, models) => {
//     const found = models.find(item => toSlug(item.model) === targetSlug);
//     return found ? found.model : null;
// };


// export default function SimulasiKredit() {
//   const router = useRouter();
//   const pathname = usePathname();
  
//   // Mendapatkan slug dari path URL
//   const slug = pathname.split('/').pop(); 
//   const isDefaultPath = slug === 'credit-simulator' || slug === '[slug]';

//   const [selectedModel, setSelectedModel] = useState("");
//   const [otrPrice, setOtrPrice] = useState(0);
//   const [dpRp, setDpRp] = useState(70000000);
//   const [dpPercent, setDpPercent] = useState(20);
//   const [isReady, setIsReady] = useState(false); // State untuk menunggu data siap

//   // Fungsi untuk mencari data model berdasarkan nama
//   const findModelData = useCallback((modelName) => {
//     return allIsuzuModels.find((item) => item.model === modelName);
//   }, []);

//   // 1. EFFECT UNTUK INJEKSI DATA DARI SLUG URL
//   useEffect(()=>{
//     // Jika tidak ada slug atau di path default, redirect ke model pertama
//     if (isDefaultPath || !slug) {
//         if (!selectedModel) {
//             const defaultModel = allIsuzuModels[0];
//             setSelectedModel(defaultModel.model);
//             router.replace(`/credit-simulator/${toSlug(defaultModel.model)}`);
//         }
//         return; 
//     }
    
//     // Auto-complete dan validasi slug
//     const targetSlug = autoCompleteSlug(slug);
    
//     // Cari Nama Model yang sesuai dengan Slug
//     const modelName = slugToModelName(targetSlug, allIsuzuModels);

//     if (modelName) {
//       setSelectedModel(modelName); 
//       setIsReady(true);
      
//       // Jika slug di URL perlu dibersihkan/dilengkapi, redirect
//       if (targetSlug !== slug) {
//           router.replace(`/credit-simulator/${targetSlug}`);
//       }
      
//     } else {
//       // FALLBACK: Redirect ke model default pertama jika model tidak ditemukan
//       console.warn(`Model untuk slug "${slug}" (${targetSlug}) tidak ditemukan.`);
//       const defaultModel = allIsuzuModels[0];
//       setSelectedModel(defaultModel.model);
//       router.replace(`/credit-simulator/${toSlug(defaultModel.model)}`);
//     }
    
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname]); 

//   // 2. EFFECT UNTUK HARGA OTR BERDASARKAN selectedModel
//   useEffect(() => {
//     const modelData = findModelData(selectedModel);
//     if (modelData) {
//         setOtrPrice(Number(modelData.price));
//     } else {
//         setOtrPrice(0);
//     }
//   }, [selectedModel, findModelData]);

//   // 3. EFFECT UNTUK DP (Percent ke Rupiah)
//   useEffect(() => {
//     if (otrPrice > 0) {
//         setDpRp(Math.round((dpPercent / 100) * otrPrice));
//     } else {
//         setDpRp(0);
//     }
//   }, [dpPercent, otrPrice]);

  
//   // 4. USEMEMO UNTUK SEMUA HASIL PERHITUNGAN DAN VALIDASI
//   const simulationResults = useMemo(() => {
    
//     // VALIDASI KESIAPAN DATA
//     const isCalculationReady = otrPrice > 0 && dpRp > 0 && selectedModel !== "";
    
//     if (!isCalculationReady) {
//         return { isReady: false, formattedOtr: formatRupiah(otrPrice), results: [] };
//     }
    
//     // JIKA SIAP, LAKUKAN PERHITUNGAN
//     const results = LeasingData.map(leasing => ({
//         ...leasing,
//         tenorData: leasing.tenor.map(tenor => {
//             const cicilan = hitungAngsuran(otrPrice, dpRp, tenor, leasing.rate);
            
//             return {
//                 tenor,
//                 cicilan,
//                 formattedCicilan: formatRupiah(cicilan)
//             };
//         })
//     }));

//     return { 
//         isReady: true, 
//         formattedOtr: formatRupiah(otrPrice), 
//         results 
//     };
    
//   }, [otrPrice, dpRp, selectedModel]); 

//   // --- HANDLER UNTUK PERUBAHAN MODEL DI DATALIST ---
//   const handleModelChange = (e) => {
//     const newModel = e.target.value;
//     setSelectedModel(newModel);
    
//     // Jika model yang diketik valid, update URL dengan slug barunya
//     const modelData = findModelData(newModel);
//     if (modelData) {
//         const newSlug = toSlug(newModel);
//         // Ganti URL tanpa memuat ulang komponen
//         if (slug !== newSlug) {
//             router.push(`/credit-simulator/${newSlug}`); 
//         }
//     }
//   };


//   // --- RENDER KOMPONEN UTAMA ---
//   return (
//     <div className="flex justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
//       <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-2xl rounded-xl overflow-hidden bg-white dark:bg-gray-900">

//         {/* Form Input Section */}
//         <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
//           <Section title="Simulasi Kredit Mobil Baru 🚗">
//             <Input
//               selectedModel={selectedModel}
//               handleModelChange={handleModelChange}
//               allIsuzuModels={allIsuzuModels}
//               formattedOtr={simulationResults.formattedOtr}
//               dpRp={dpRp}
//               setDpRp={setDpRp}
//               dpPercent={dpPercent}
//               setDpPercent={setDpPercent}
//               otrPrice={otrPrice}
//             />
//           </Section>
//         </div>

//         {/* Hasil Simulasi Section */}
//         <div className="w-full lg:w-1/2">
//           <Section title="Hasil Simulasi Cicilan 🧾">
//             <Result 
//               isReady={simulationResults.isReady} 
//               results={simulationResults.results} 
//             />
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// }