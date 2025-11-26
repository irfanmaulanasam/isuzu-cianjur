'use client';
import { useState, useMemo, useEffect, useCallback } from "react";
// --- Data & Utils ---
import { IsuzuPrices } from "@/src/data/isuzuPrices"; // Ganti path sesuai kebutuhan Anda
import { LeasingData } from "@/data/LeasingData"; // Ganti path sesuai kebutuhan Anda
import { ChevronDown, ChevronUp } from 'lucide-react'; 

// --- UTILITIES (Penting, JANGAN DIHAPUS) ---
const allIsuzuModels = Object.values(IsuzuPrices).flat();
const commonTenors = [12, 24, 36, 48, 60, 72, 84];

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

const formatInputDisplay = (number) => {
  if (number === 0 || number === null || number === undefined || isNaN(number)) return '';
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
  return `Rp ${formatted}`;
};
const cleanInputToNumber = (value) => {
  if (!value) return 0;
  const cleanValue = value.replace(/[^0-9]/g, '');
  return Number(cleanValue) || 0;
};
const hitungAngsuran = (otrNumber, dp, tenor, bunga) => {
  if (otrNumber <= 0 || tenor <= 0) return 0;
  const loanAmount = otrNumber - dp;
  const totalBunga = loanAmount * bunga * (tenor / 12);
  return (loanAmount + totalBunga) / tenor;
};
const toSlug = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};
const slugToModelName = (targetSlug, models) => {
  return models.find(item => toSlug(item.model) === targetSlug)?.model;
};
// ---------------------------------------------

export default function SimulasiKredit({ initialModelName, initialModelPrice }) {
  // --- STATE UTAMA ---
  const [slug, setSlug] = useState('');
  
  // Model dan OTR price akan diinisialisasi dari props jika tersedia
  const [selectedModel, setSelectedModel] = useState(initialModelName || "");
  const [otrPrice, setOtrPrice] = useState(initialModelPrice || 0);
  
  const [dpRp, setDpRp] = useState(70000000);
  const [dpPercent, setDpPercent] = useState(20);
  const [displayDpRp, setDisplayDpRp] = useState(() => formatInputDisplay(70000000));

  const [customTenor, setCustomTenor] = useState(36);
  const [customRatePercent, setCustomRatePercent] = useState(5.5);
  
  // State untuk mengontrol Akordeon Leasing
  const [activeLeasing, setActiveLeasing] = useState(null);

  // --- UTILITY CALLBACKS ---
  const findModelData = useCallback((modelName) => {
    return allIsuzuModels.find((item) => item.model === modelName);
  }, []);

  const findModelDataFuzzy = useCallback((modelName) => {
    if (!modelName) return null;
    const lowerName = modelName.toLowerCase().trim();
    return allIsuzuModels.find((item) => item.model.toLowerCase() === lowerName);
  }, []);

  const autoCompleteSlug = useCallback((shortSlug) => {
    if (shortSlug === "blindvan") { shortSlug = "traga-blind-van"; }
    if (shortSlug === 'nmr-58') { shortSlug = 'elf-nmr-hd-58'; }
    if (shortSlug === 'nmr-65') { shortSlug = 'elf-nmr-hd-65'; }

    const prefixMap = {
      "nmr": "elf-", "nmr-65": "elf-", "nlr": "elf-", "nps": "elf-", "nqr": "elf-",
      "dmax": "", "traga": "", "blind-van": "traga-", "box": "traga-",
      "mu-x": "", "giga": "", "elf": ""
    };
    for (const [key, prefix] of Object.entries(prefixMap)) {
      if (shortSlug.startsWith(key) || shortSlug === key.replace('-', '')) {
        return prefix + shortSlug;
      }
    }
    const foundModel = allIsuzuModels.find(item => {
      const itemSlug = toSlug(item.model);
      return itemSlug.includes(shortSlug);
    });
    return foundModel ? toSlug(foundModel.model) : shortSlug;
  }, []);

  // --- EFFECT LISTENERS ---

  // EFFECT 0: Setup listener untuk URL Hash (Hanya berlaku jika initialModelName kosong)
  useEffect(() => {
    if (typeof window === 'undefined' || initialModelName) return;

    const getSlugFromHash = () => window.location.hash.substring(1).toLowerCase();

    const initialSlug = getSlugFromHash();
    if (initialSlug) setSlug(initialSlug);

    const handleHashChange = () => {
      setSlug(getSlugFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [initialModelName]); // Dependensi ditambahkan

  // Handler saat input Rupiah diubah
  const handleDpRpChange = (e) => {
    const rawValue = e.target.value;
    setDisplayDpRp(rawValue);
    const numericValue = cleanInputToNumber(rawValue);
    setDpRp(numericValue);
  };

  // EFFECT 1: Handle slug changes dan set selectedModel (Sumber Kebenaran Model)
  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    
    // **PRIORITAS PROPS:** Jika data dari props sudah ada, abaikan logika slug/hash
    if (initialModelName && initialModelPrice > 0) {
        setSelectedModel(initialModelName);
        setOtrPrice(initialModelPrice);
        return; 
    }

    // --- LOGIC LAMA (HANYA JIKA TIDAK ADA PROPS) ---
    if (slug === "") {
      const defaultModel = allIsuzuModels[0];
      const defaultSlug = toSlug(defaultModel.model);
      setSelectedModel(defaultModel.model);
      if (isBrowser) {
        // window.location.hash = defaultSlug; // Opsional: set hash default
      }
      return;
    }

    const targetSlug = autoCompleteSlug(slug);
    const modelName = slugToModelName(targetSlug, allIsuzuModels);

    if (modelName) {
      setSelectedModel(modelName);
      if (targetSlug !== slug && isBrowser) {
        window.location.hash = targetSlug;
      }
    } else {
      // Fallback
      const defaultModel = allIsuzuModels[allIsuzuModels.length - 1];
      setSelectedModel(defaultModel.model);
      if (isBrowser) {
        // window.location.hash = toSlug(defaultModel.model);
      }
    }
  }, [slug, autoCompleteSlug, initialModelName, initialModelPrice]); // Dependensi ditambahkan

  // EFFECT 2: Update OTR price (HANYA BERJALAN JIKA initialModelPrice KOSONG)
  useEffect(() => {
    // Jika harga sudah diset dari props, jangan lakukan pencarian OTR
    if (initialModelPrice > 0) return; 
    
    const modelData = findModelData(selectedModel);
    if (modelData) setOtrPrice(Number(modelData.price));
    else setOtrPrice(0);
  }, [selectedModel, findModelData, initialModelPrice]); // Dependensi ditambahkan

  // EFFECT 3 & 4: Update DP & Sinkronisasi Tampilan Input Rupiah (Tetap sama)
  useEffect(() => {
    let newDpRp = 0;
    if (otrPrice > 0) {
      const clampedPercent = Math.min(100, Math.max(0, dpPercent));
      newDpRp = Math.round((clampedPercent / 100) * otrPrice);
    }
    setDpRp(newDpRp);
  }, [dpPercent, otrPrice]);

  useEffect(() => {
    setDisplayDpRp(formatInputDisplay(dpRp));
  }, [dpRp]);


  // --- USEMEMO UNTUK SEMUA HASIL PERHITUNGAN DAN VALIDASI ---
  const simulationResults = useMemo(() => {

    const isReady = otrPrice > 0 && dpRp > 0 && findModelData(selectedModel);

    if (!isReady) {
      return {
        isReady: false,
        formattedOtr: formatRupiah(otrPrice),
        results: [],
        customResult: null,
        loanAmount: 0,
      };
    }

    const loanAmount = otrPrice - dpRp;

    const customCicilan = hitungAngsuran(
      otrPrice,
      dpRp,
      customTenor,
      customRatePercent / 100
    );

    const customResult = {
      tenor: customTenor,
      ratePercent: customRatePercent,
      cicilan: customCicilan,
      formattedCicilan: formatRupiah(customCicilan),
      formattedLoanAmount: formatRupiah(loanAmount)
    };

    const fixedResults = LeasingData.map(leasing => ({
      ...leasing,
      tenorData: leasing.tenor.map(tenor => {
        const cicilan = hitungAngsuran(otrPrice, dpRp, tenor, leasing.rate);

        return {
          tenor,
          cicilan,
          formattedCicilan: formatRupiah(cicilan)
        };
      })
    }));

    return {
      isReady: true,
      formattedOtr: formatRupiah(otrPrice),
      results: fixedResults,
      customResult,
      loanAmount
    };

  }, [otrPrice, dpRp, selectedModel, customTenor, customRatePercent, findModelData]);

  // --- RENDER KOMPONEN ---
  return (
    <div className="flex justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">

        {/* Form Input */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6 text-center lg:text-left text-blue-700 dark:text-blue-400">
            Simulasi Kredit Mobil Baru 🚗
          </h2>

          {/* Model (Input/Display - Pengecekan apakah menggunakan props) */}
          {initialModelName ? (
             <div className="mb-6">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Model Kendaraan</span>
                <p className="font-extrabold text-lg text-blue-700 dark:text-blue-400 p-3 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700">
                    {initialModelName}
                </p>
            </div>
          ) : (
             <label className="block mb-6">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Pilih Model Kendaraan</span>
                <input
                  type="text"
                  id="model-select"
                  list="model-options"
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (typeof window === 'undefined') return;

                    const rawInput = e.target.value.trim();
                    const matchedModel = findModelDataFuzzy(rawInput);

                    if (matchedModel) {
                      const officialModelName = matchedModel.model;
                      const newSlug = toSlug(officialModelName);

                      setSelectedModel(officialModelName);
                      window.location.hash = newSlug;
                      setSlug(newSlug);
                    } else {
                      const currentSlug = window.location.hash.substring(1);
                      const modelFromSlug = slugToModelName(currentSlug, allIsuzuModels) || allIsuzuModels[0].model;
                      setSelectedModel(modelFromSlug);
                    }
                  }}
                  placeholder="Ketik nama model..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
                <datalist id="model-options">
                  {allIsuzuModels.map((item) => (
                    <option key={item.model} value={item.model} />
                  ))}
                </datalist>
              </label>
          )}


          {/* Harga OTR */}
          <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl mb-6 shadow-inner border border-blue-100 dark:border-gray-700">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-1">Harga OTR (On The Road)</span>
            <p className="font-extrabold text-2xl text-gray-800 dark:text-white">
              {simulationResults.formattedOtr}
            </p>
          </div>

          {/* Uang Muka, Tenor, Bunga (Tetap sama) */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <label className="block w-full sm:w-1/2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Uang Muka (Rp)</span>
              <input
                type="text"
                value={displayDpRp}
                onChange={handleDpRpChange}
                onBlur={() => setDisplayDpRp(formatInputDisplay(dpRp))}
                placeholder="Rp 0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>

            <label className="block w-full sm:w-1/2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Uang Muka (%)</span>
              <input
                type="number"
                value={dpPercent}
                min="0"
                max="100"
                onChange={(e) => {
                  const newPercent = Math.min(100, Math.max(0, Number(e.target.value)));
                  setDpPercent(newPercent);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <label className="block w-full sm:w-1/2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Jangka Waktu (Bulan)</span>
              <select
                value={customTenor}
                onChange={(e) => setCustomTenor(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {commonTenors.map(tenor => (
                  <option key={tenor} value={tenor}>{tenor} bulan ({tenor / 12} tahun)</option>
                ))}
              </select>
            </label>

            <label className="block w-full sm:w-1/2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Bunga Tahunan Flat (%)</span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={customRatePercent}
                  onChange={(e) => setCustomRatePercent(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <span className="absolute right-0 top-0 h-full flex items-center pr-3 text-gray-500 dark:text-gray-400 pointer-events-none">%</span>
              </div>
            </label>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            * Perhitungan cicilan menggunakan metode **Bunga Flat Rate**.
          </p>
        </div>

        {/* Hasil Simulasi - REVISI TAMPILAN (Menghilangkan Scroll Ganda) */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6 text-center lg:text-left text-green-700 dark:text-green-400">
            Hasil Simulasi Cicilan 🧾
          </h2>

          {simulationResults.isReady ? (
            // --- KONTEN HASIL ---
            <div className="space-y-6"> {/* max-h dan overflow Dihapus */}

              {/* Hasil Simulasi Kustom */}
              <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-xl shadow-lg border border-green-200 dark:border-green-700">
                <h3 className="font-extrabold text-2xl mb-1 text-green-700 dark:text-green-300">
                  Cicilan Kustom Anda
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Pokok Pinjaman: **{formatRupiah(simulationResults.loanAmount)}**
                </p>
                <div className="flex justify-between items-center py-2 border-t border-green-300 dark:border-green-600 pt-3">
                  <span className="font-bold text-gray-800 dark:text-white">
                    {simulationResults.customResult.tenor} bulan ({simulationResults.customResult.ratePercent}% Flat)
                  </span>
                  <span className="font-extrabold text-3xl text-green-600 dark:text-green-400">
                    {simulationResults.customResult.formattedCicilan}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-lg dark:text-white text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                Perbandingan dengan Leasing Rekanan
              </h3>

              {/* Perbandingan Leasing - Menggunakan AKORDEON */}
              {simulationResults.results.map((leasing) => {
                const isActive = activeLeasing === leasing.name;

                return (
                  <div 
                    key={leasing.name} 
                    className={`border-2 rounded-xl p-4 shadow-md bg-white dark:bg-gray-800 transition-colors ${
                      isActive 
                        ? 'border-blue-500 dark:border-blue-400' 
                        : 'border-blue-200 dark:border-blue-700'
                    }`}
                  >
                    <button
                      className="w-full flex justify-between items-center text-left"
                      onClick={() => setActiveLeasing(isActive ? null : leasing.name)}
                    >
                      <div>
                        <h3 className="font-extrabold text-xl mb-1 text-blue-900 dark:text-blue-200">
                          {leasing.surname}
                        </h3>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {leasing.name} (Bunga Flat Tahunan: **{Math.round(leasing.rate * 100)}%**)
                        </span>
                      </div>
                      {isActive ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>

                    {/* Konten Akordeon (Hanya tampil jika isActive) */}
                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pilihan Tenor:</p>
                        {/* Tabel Tenor */}
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {leasing.tenorData.map((data) => (
                            <div
                              key={data.tenor}
                              className="flex justify-between items-center py-2 text-sm sm:text-base hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-100 px-1"
                            >
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {data.tenor} bulan
                              </span>
                              <span className="font-extrabold text-lg text-blue-600 dark:text-blue-400">
                                {data.formattedCicilan}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // --- KONTEN PESAN (jika belum siap) ---
            <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center bg-blue-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-blue-300 dark:border-gray-600">
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Mohon **Pilih Model** kendaraan dan isi **Uang Muka**.
              </p>
              <p className="font-medium text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Pastikan **Harga OTR** dan **Uang Muka** terisi untuk simulasi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// 'use client';
// import { useState, useMemo, useEffect, useCallback } from "react";
// // --- Data & Utils ---
// import { IsuzuPrices } from "@/data/isuzuPrices";
// /**
//  * Data simulasi leasing/pembiayaan.
//  * rate: Suku Bunga Flat Tahunan (dalam bentuk desimal, misal 0.05 = 5%)
//  * tenor: Pilihan tenor dalam bulan
//  */
// import { LeasingData } from "@/data/LeasingData";

// const allIsuzuModels = Object.values(IsuzuPrices).flat();
// // Pilihan Tenor yang umum
// const commonTenors = [12, 24, 36, 48, 60, 72, 84];

// // Fungsi utilitas format Rupiah untuk tampilan akhir (dengan simbol mata uang)
// const formatRupiah = (number) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(number);

// // Fungsi utilitas format Rupiah untuk input (hanya angka dan titik)
// const formatInputDisplay = (number) => {
//   if (number === 0 || number === null || number === undefined || isNaN(number)) return '';
//   const formatted = new Intl.NumberFormat('id-ID', {
//     style: 'decimal',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(number);
//   return `Rp ${formatted}`;
// };
// // Fungsi utilitas untuk membersihkan string input menjadi angka mentah
// const cleanInputToNumber = (value) => {
//   if (!value) return 0;
//   // Hapus semua karakter non-digit (termasuk "Rp", spasi, dan titik ribuan)
//   const cleanValue = value.replace(/[^0-9]/g, '');
//   return Number(cleanValue) || 0;
// };
// // Fungsi perhitungan (Flat Rate)
// const hitungAngsuran = (otrNumber, dp, tenor, bunga) => {
//   if (otrNumber <= 0 || tenor <= 0) return 0;
//   const loanAmount = otrNumber - dp;
//   // Perhitungan Bunga (Flat Rate Tahunan)
//   // Bunga: Bunga * Pinjaman * (Tenor / 12)
//   const totalBunga = loanAmount * bunga * (tenor / 12);
//   return (loanAmount + totalBunga) / tenor; // Angsuran Bulanan
// };
// const toSlug = (text) => {
//   if (!text) return '';
//   return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
// };
// const slugToModelName = (targetSlug, models) => {
//   return models.find(item => toSlug(item.model) === targetSlug)?.model;
// };
// export default function SimulasiKredit(ModelPrice) {
//   const [slug, setSlug] = useState('');
//   // selectedModel adalah nilai yang ditampilkan di input, yang juga merupakan nama model resmi jika valid.
//   const [selectedModel, setSelectedModel] = useState("");
//   const [otrPrice, setOtrPrice] = useState(0);
//   const [dpRp, setDpRp] = useState(70000000);
//   const [dpPercent, setDpPercent] = useState(20);
//   const [displayDpRp, setDisplayDpRp] = useState(() => formatInputDisplay(70000000));

//   const [customTenor, setCustomTenor] = useState(36);
//   const [customRatePercent, setCustomRatePercent] = useState(5.5);

//   // Fungsi untuk mencari data model berdasarkan nama (case sensitive)
//   const findModelData = useCallback((modelName) => {
//     return allIsuzuModels.find((item) => item.model === modelName);
//   }, []);

//   // Fungsi untuk mencari model secara case-insensitive
//   const findModelDataFuzzy = useCallback((modelName) => {
//     if (!modelName) return null;
//     const lowerName = modelName.toLowerCase().trim();
//     return allIsuzuModels.find((item) => item.model.toLowerCase() === lowerName);
//   }, []);
//   // System auto-complete untuk slug pendek
//   const autoCompleteSlug = useCallback((shortSlug) => {
//     if (shortSlug === "blindvan") { shortSlug = "traga-blind-van"; }
//     if (shortSlug === 'nmr-58') { shortSlug = 'elf-nmr-hd-58'; }
//     if (shortSlug === 'nmr-65') { shortSlug = 'elf-nmr-hd-65'; }

//     const prefixMap = {
//       "nmr": "elf-", "nmr-65": "elf-", "nlr": "elf-", "nps": "elf-", "nqr": "elf-",
//       "dmax": "", "traga": "", "blind-van": "traga-", "box": "traga-",
//       "mu-x": "", "giga": "", "elf": ""
//     };
//     for (const [key, prefix] of Object.entries(prefixMap)) {
//       if (shortSlug.startsWith(key) || shortSlug === key.replace('-', '')) {
//         return prefix + shortSlug;
//       }
//     }
//     const foundModel = allIsuzuModels.find(item => {
//       const itemSlug = toSlug(item.model);
//       return itemSlug.includes(shortSlug);
//     });
//     return foundModel ? toSlug(foundModel.model) : shortSlug;
//   }, []);

//   // EFFECT 0: Setup listener untuk URL Hash
//   useEffect(() => {
//     // Fungsi ini hanya berjalan di browser
//     if (typeof window === 'undefined') return;

//     const getSlugFromHash = () => window.location.hash.substring(1).toLowerCase();

//     const initialSlug = getSlugFromHash();
//     if (initialSlug) setSlug(initialSlug);

//     const handleHashChange = () => {
//       setSlug(getSlugFromHash());
//     };

//     window.addEventListener('hashchange', handleHashChange);
//     return () => {
//       window.removeEventListener('hashchange', handleHashChange);
//     };
//   }, []);


//   // Handler saat input Rupiah diubah
//   const handleDpRpChange = (e) => {
//     const rawValue = e.target.value;
//     setDisplayDpRp(rawValue);
//     const numericValue = cleanInputToNumber(rawValue);
//     setDpRp(numericValue);
//   };

//   // EFFECT 1: Handle slug changes dan set selectedModel (Source of Truth Model)
//   useEffect(() => {
//     const isBrowser = typeof window !== 'undefined';

//     if (slug === "") {
//       const defaultModel = allIsuzuModels[0];
//       const defaultSlug = toSlug(defaultModel.model);
//       setSelectedModel(defaultModel.model);
//       if (isBrowser) {
//         window.location.hash = defaultSlug;
//       }
//       return;
//     }

//     const targetSlug = autoCompleteSlug(slug);
//     const modelName = slugToModelName(targetSlug, allIsuzuModels);

//     if (modelName) {
//       // Jika slug valid, set model resmi
//       setSelectedModel(modelName);
//       // Auto-complete slug jika diperlukan
//       if (targetSlug !== slug && isBrowser) {
//         window.location.hash = targetSlug;
//       }
//     } else {
//       // Jika model tidak ditemukan dari slug (biasanya hanya terjadi saat URL diubah manual)
//       const defaultModel = allIsuzuModels[allIsuzuModels.length - 1];
//       const defaultSlug = toSlug(defaultModel.model);
//       setSelectedModel(defaultModel.model);
//       if (isBrowser) {
//         window.location.hash = defaultSlug;
//       }
//     }
//   }, [slug, autoCompleteSlug]);

//   // EFFECT 2: Update OTR price berdasarkan selectedModel
//   useEffect(() => {
//     const modelData = findModelData(selectedModel);
//     if (modelData) setOtrPrice(Number(modelData.price));
//     else setOtrPrice(0);
//   }, [selectedModel, findModelData]);

//   // EFFECT 3: Update DP (Percent ke Rupiah)
//   useEffect(() => {
//     let newDpRp = 0;
//     if (otrPrice > 0) {
//       const clampedPercent = Math.min(100, Math.max(0, dpPercent));
//       newDpRp = Math.round((clampedPercent / 100) * otrPrice);
//     }
//     setDpRp(newDpRp);
//   }, [dpPercent, otrPrice]);

//   // EFFECT 4: Sinkronisasi Tampilan Input Rupiah
//   useEffect(() => {
//     setDisplayDpRp(formatInputDisplay(dpRp));
//   }, [dpRp]);


//   // USEMEMO UNTUK SEMUA HASIL PERHITUNGAN DAN VALIDASI
//   const simulationResults = useMemo(() => {

//     const isReady = otrPrice > 0 && dpRp > 0 && findModelData(selectedModel);

//     if (!isReady) {
//       return {
//         isReady: false,
//         formattedOtr: formatRupiah(otrPrice),
//         results: [],
//         customResult: null,
//         loanAmount: 0,
//       };
//     }

//     const loanAmount = otrPrice - dpRp;

//     const customCicilan = hitungAngsuran(
//       otrPrice,
//       dpRp,
//       customTenor,
//       customRatePercent / 100
//     );

//     const customResult = {
//       tenor: customTenor,
//       ratePercent: customRatePercent,
//       cicilan: customCicilan,
//       formattedCicilan: formatRupiah(customCicilan),
//       formattedLoanAmount: formatRupiah(loanAmount)
//     };

//     const fixedResults = LeasingData.map(leasing => ({
//       ...leasing,
//       tenorData: leasing.tenor.map(tenor => {
//         const cicilan = hitungAngsuran(otrPrice, dpRp, tenor, leasing.rate);

//         return {
//           tenor,
//           cicilan,
//           formattedCicilan: formatRupiah(cicilan)
//         };
//       })
//     }));

//     return {
//       isReady: true,
//       formattedOtr: formatRupiah(otrPrice),
//       results: fixedResults,
//       customResult,
//       loanAmount
//     };

//   }, [otrPrice, dpRp, selectedModel, customTenor, customRatePercent, findModelData]);

//   // --- RENDER KOMPONEN ---
//   return (
//     <div className="flex justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
//       <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">

//         {/* Form Input */}
//         <div className="w-full lg:w-1/2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
//           <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6 text-center lg:text-left text-blue-700 dark:text-blue-400">
//             Simulasi Kredit Mobil Baru 🚗
//           </h2>

//           {/* Model (Input + Datalist) */}
//           <label className="block mb-6">
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Pilih Model Kendaraan</span>
//             <input
//               type="text"
//               id="model-select"
//               list="model-options"
//               value={selectedModel}
//               onChange={(e) => {
//                 // Saat mengetik, hanya update state input.
//                 setSelectedModel(e.target.value);
//               }}
//               onBlur={(e) => {
//                 if (typeof window === 'undefined') return;

//                 const rawInput = e.target.value.trim();
//                 const matchedModel = findModelDataFuzzy(rawInput);

//                 if (matchedModel) {
//                   // Jika ditemukan kecocokan (case-insensitive), set model resmi dan update hash
//                   const officialModelName = matchedModel.model;
//                   const newSlug = toSlug(officialModelName);

//                   setSelectedModel(officialModelName); // Update tampilan input dengan nama resmi
//                   window.location.hash = newSlug; // Update URL hash
//                   setSlug(newSlug); // Trigger Effect 1 (konfirmasi model)
//                 } else {
//                   // Jika tidak ada kecocokan, kembalikan input ke model yang sedang valid di hash
//                   const currentSlug = window.location.hash.substring(1);
//                   const modelFromSlug = slugToModelName(currentSlug, allIsuzuModels) || allIsuzuModels[0].model;
//                   setSelectedModel(modelFromSlug);
//                 }
//               }}
//               placeholder="Ketik nama model..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//             />
//             <datalist id="model-options">
//               {allIsuzuModels.map((item) => (
//                 <option key={item.model} value={item.model} />
//               ))}
//             </datalist>
//           </label>

//           {/* Harga OTR */}
//           <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl mb-6 shadow-inner border border-blue-100 dark:border-gray-700">
//             <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-1">Harga OTR (On The Road)</span>
//             <p className="font-extrabold text-2xl text-gray-800 dark:text-white">
//               {simulationResults.formattedOtr}
//             </p>
//           </div>

//           {/* Uang Muka */}
//           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
//             <label className="block w-full sm:w-1/2">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Uang Muka (Rp)</span>
//               <input
//                 type="text"
//                 value={displayDpRp}
//                 onChange={handleDpRpChange}
//                 onBlur={() => setDisplayDpRp(formatInputDisplay(dpRp))}
//                 placeholder="Rp 0"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </label>

//             <label className="block w-full sm:w-1/2">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Uang Muka (%)</span>
//               <input
//                 type="number"
//                 value={dpPercent}
//                 min="0"
//                 max="100"
//                 onChange={(e) => {
//                   const newPercent = Math.min(100, Math.max(0, Number(e.target.value)));
//                   setDpPercent(newPercent);
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </label>
//           </div>

//           {/* INPUT BARU: Jangka Waktu (Tenor) & Suku Bunga (Rate) */}
//           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
//             <label className="block w-full sm:w-1/2">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Jangka Waktu (Bulan)</span>
//               <select
//                 value={customTenor}
//                 onChange={(e) => setCustomTenor(Number(e.target.value))}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {commonTenors.map(tenor => (
//                   <option key={tenor} value={tenor}>{tenor} bulan ({tenor / 12} tahun)</option>
//                 ))}
//               </select>
//             </label>

//             <label className="block w-full sm:w-1/2">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Bunga Tahunan Flat (%)</span>
//               <div className="relative">
//                 <input
//                   type="number"
//                   step="0.1"
//                   min="0"
//                   value={customRatePercent}
//                   onChange={(e) => setCustomRatePercent(Number(e.target.value))}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
//                 />
//                 <span className="absolute right-0 top-0 h-full flex items-center pr-3 text-gray-500 dark:text-gray-400 pointer-events-none">%</span>
//               </div>
//             </label>
//           </div>

//           <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//             * Perhitungan cicilan menggunakan metode **Bunga Flat Rate** (bunga dihitung dari pokok pinjaman awal).
//           </p>
//         </div>

//         {/* Hasil Simulasi - CONDITIONAL RENDERED */}
//         <div className="w-full lg:w-1/2 p-6 sm:p-8">
//           <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6 text-center lg:text-left text-green-700 dark:text-green-400">
//             Hasil Simulasi Cicilan 🧾
//           </h2>

//           {simulationResults.isReady ? (
//             // --- KONTEN HASIL ---
//             <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">

//               {/* Hasil Simulasi Kustom */}
//               <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-xl shadow-lg border border-green-200 dark:border-green-700">
//                 <h3 className="font-extrabold text-2xl mb-1 text-green-700 dark:text-green-300">
//                   Cicilan Kustom Anda
//                 </h3>
//                 <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
//                   Pokok Pinjaman: **{formatRupiah(simulationResults.loanAmount)}**
//                 </p>
//                 <div className="flex justify-between items-center py-2 border-t border-green-300 dark:border-green-600 pt-3">
//                   <span className="font-bold text-gray-800 dark:text-white">
//                     {simulationResults.customResult.tenor} bulan ({simulationResults.customResult.ratePercent}% Flat)
//                   </span>
//                   <span className="font-extrabold text-3xl text-green-600 dark:text-green-400">
//                     {simulationResults.customResult.formattedCicilan}
//                   </span>
//                 </div>
//               </div>

//               <h3 className="font-semibold text-lg dark:text-white text-center pt-4 border-t border-gray-200 dark:border-gray-700">
//                 Perbandingan dengan Leasing Rekanan
//               </h3>

//               {/* Perbandingan Leasing Tetap */}
//               {simulationResults.results.map((leasing) => (
//                 <div key={leasing.name} className="border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4 shadow-md bg-white dark:bg-gray-800">
//                   <h3 className="font-extrabold text-xl dark:text-white text-center lg:text-left mb-1 text-blue-900 dark:text-blue-200">
//                     {leasing.surname}
//                   </h3>
//                   <span className="text-xs text-gray-600 dark:text-gray-400 block mb-4">
//                     {leasing.name} (Bunga Flat Tahunan: **{Math.round(leasing.rate * 100)}%**)
//                   </span>

//                   {/* Tabel Tenor */}
//                   <div className="divide-y divide-gray-200 dark:divide-gray-700 border-t border-b border-gray-200 dark:border-gray-700">
//                     {leasing.tenorData.map((data) => (
//                       <div
//                         key={data.tenor}
//                         className="flex justify-between items-center py-2 text-sm sm:text-base hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-100"
//                       >
//                         <span className="font-medium text-gray-700 dark:text-gray-300">
//                           {data.tenor} bulan
//                         </span>
//                         <span className="font-extrabold text-lg text-blue-600 dark:text-blue-400">
//                           {data.formattedCicilan}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             // --- KONTEN PESAN (jika belum siap) ---
//             <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center bg-blue-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-blue-300 dark:border-gray-600">
//               <p className="font-semibold text-gray-700 dark:text-gray-300">
//                 Mohon **Ketik dan Pilih Model** kendaraan yang tersedia.
//               </p>
//               <p className="font-medium text-gray-500 dark:text-gray-400 mt-2 text-sm">
//                 Pastikan **Harga OTR** dan **Uang Muka** sudah terisi untuk menampilkan simulasi kredit dari berbagai *leasing* rekanan.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }