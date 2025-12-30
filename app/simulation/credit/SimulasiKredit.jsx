'use client';
import { useState, useMemo, useEffect, useCallback } from "react";
import ModelDatalistInput from "@/app/components/ModelDataListOption";
import ModelCombobox from "@/app/components/ModelCombobox";
// --- Data & Utils ---
import { LeasingData } from "@/src/data/leasing/Leasing_data";
import { ChevronDown, ChevronUp } from 'lucide-react'; 
import { allIsuzuModels } from "@/src/data/products/isuzuPrices-utils";
import Breadcrumb from "@/app/components/Breadcrumb";
import { commonTenors, formatRupiah, formatInputDisplay, cleanInputToNumber, hitungAngsuran,toSlug, slugToModelName } from "@/src/utils/creditSimulation";

export default function SimulasiKredit({ initialModelName, initialModelPrice }) {
  // --- STATE UTAMA ---
  const [slug, setSlug] = useState('');
  const [initializedFromSlug, setInitializedFromSlug] = useState(false);

  const [selectedModel, setSelectedModel] = useState(initialModelName || "");
  const [otrPrice, setOtrPrice] = useState(initialModelPrice || 0);

  const [dpRp, setDpRp] = useState(70000000);
  const [dpPercent, setDpPercent] = useState(20);
  const [displayDpRp, setDisplayDpRp] = useState(() => formatInputDisplay(70000000));

  const [customTenor, setCustomTenor] = useState(36);
  const [customRatePercent, setCustomRatePercent] = useState(5.5);

  const [activeLeasing, setActiveLeasing] = useState(null);

  const findModelData = useCallback((modelName) => {
    return allIsuzuModels.find((item) => item.model === modelName);
  }, []);

  // 1) Baca slug dari URL SEKALI di awal (kalau tidak ada initialModelName)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (initialModelName) return;          // jika dari props, abaikan slug
    if (initializedFromSlug) return;       // jangan diulang

    const hash = window.location.hash.substring(1).toLowerCase(); // #traga-blind-van -> traga-blind-van
    if (!hash) return;

    setSlug(hash);
  }, [initialModelName, initializedFromSlug]);

  // 2) Pakai slug untuk inisialisasi selectedModel & otrPrice (HANYA sekali)
  useEffect(() => {
    if (!slug) return;
    if (initializedFromSlug) return;

    const modelName = slugToModelName(slug, allIsuzuModels);

    if (modelName) {
      setSelectedModel(modelName);
      const modelData = allIsuzuModels.find(m => m.model === modelName);
      if (modelData) setOtrPrice(Number(modelData.price));
    }

    setInitializedFromSlug(true); // setelah ini slug TIDAK lagi mengubah state
  }, [slug, initializedFromSlug]);

  // 3) Kalau initialModelName / initialModelPrice di‑pass dari props → jadikan sumber kebenaran
  useEffect(() => {
    if (initialModelName && initialModelPrice > 0) {
      setSelectedModel(initialModelName);
      setOtrPrice(initialModelPrice);
    }
  }, [initialModelName, initialModelPrice]);

  // 4) Kalau selectedModel berubah (bukan dari slug props) dan tidak ada harga dari props → cari OTR
  useEffect(() => {
    if (initialModelPrice > 0) return; // harga sudah dari props

    const modelData = findModelData(selectedModel);
    if (modelData) setOtrPrice(Number(modelData.price));
    else setOtrPrice(0);
  }, [selectedModel, findModelData, initialModelPrice]);

  // Handler input DP
  const handleDpRpChange = (e) => {
    const rawValue = e.target.value;
    setDisplayDpRp(rawValue);
    const numericValue = cleanInputToNumber(rawValue);
    setDpRp(numericValue);
  };

  // DP % → DP Rupiah
  useEffect(() => {
    let newDpRp = 0;
    if (otrPrice > 0) {
      const clampedPercent = Math.min(100, Math.max(0, dpPercent));
      newDpRp = Math.round((clampedPercent / 100) * otrPrice);
    }
    setDpRp(newDpRp);
  }, [dpPercent, otrPrice]);

  // Sinkronisasi tampilan DP Rp
  useEffect(() => {
    setDisplayDpRp(formatInputDisplay(dpRp));
  }, [dpRp]);

  // --- USEMEMO UNTUK SIMULASI ---
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

  // --- RENDER ---
  return (
    <div className="flex justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">


        {/* Form Input */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
        <Breadcrumb />
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6 text-center lg:text-left text-blue-700 dark:text-blue-400">
            Simulasi Kredit Mobil Baru 🚗
          </h2>

          {/* Model */}
          {initialModelName ? (
            <div className="mb-6">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                Model Kendaraan
              </span>
              <p className="font-extrabold text-lg text-blue-700 dark:text-blue-400 p-3 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700">
                {initialModelName}
              </p>
            </div>
          ) : (
            <ModelCombobox
              value={selectedModel}
              models={allIsuzuModels}
              onChange={(model) => {
                setSelectedModel(model);

                const data = allIsuzuModels.find(m => m.model === model);
                setOtrPrice(data ? Number(data.price) : 0);

                // Optional: update hash hanya untuk CTA/share
                if (typeof window !== 'undefined') {
                  window.location.hash = toSlug(model);
                }
              }}
              helperText={
                !selectedModel
                  ? "Pilih model kendaraan untuk simulasi"
                  : "hapus untuk ganti model"
              }
            />
          )}

          {/* Harga OTR */}
          <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl mb-6 shadow-inner border border-blue-100 dark:border-gray-700">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-1">
              Harga OTR (On The Road)
            </span>
            <p className="font-extrabold text-2xl text-gray-800 dark:text-white">
              {simulationResults.formattedOtr}
            </p>
          </div>

          {/* Uang Muka */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <label className="block w-full sm:w-1/2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                Uang Muka (Rp)
              </span>
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                Uang Muka (%)
              </span>
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

          {/* Tenor & Bunga */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <label className="block w-full sm:w-1/2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                Jangka Waktu (Bulan)
              </span>
              <select
                value={customTenor}
                onChange={(e) => setCustomTenor(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {commonTenors.map((tenor) => (
                  <option key={tenor} value={tenor}>
                    {tenor} bulan ({tenor / 12} tahun)
                  </option>
                ))}
              </select>
            </label>

            <label className="block w-full sm:w-1/2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                Bunga Tahunan Flat (%)
              </span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={customRatePercent}
                  onChange={(e) => setCustomRatePercent(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <span className="absolute right-0 top-0 h-full flex items-center pr-3 text-gray-500 dark:text-gray-400 pointer-events-none">
                  %
                </span>
              </div>
            </label>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            * Perhitungan cicilan menggunakan metode <b>Bunga Flat Rate</b>.
          </p>
        </div>

        {/* Hasil Simulasi */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6 text-center lg:text-left text-green-700 dark:text-green-400">
            Hasil Simulasi Cicilan 🧾
          </h2>

          {simulationResults.isReady ? (
            <div className="space-y-6">
              {/* Kustom */}
              <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-xl shadow-lg border border-green-200 dark:border-green-700">
                <h3 className="font-extrabold text-2xl mb-1 text-green-700 dark:text-green-300">
                  Cicilan Kustom Anda
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Pokok Pinjaman: <b>{formatRupiah(simulationResults.loanAmount)}</b>
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
                          {leasing.name} (Bunga Flat Tahunan: <b>{Math.round(leasing.rate * 100)}%</b>)
                        </span>
                      </div>
                      {isActive ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Pilihan Tenor:
                        </p>
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
            <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center bg-blue-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-blue-300 dark:border-gray-600">
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Mohon <b>Pilih Model</b> kendaraan dan isi <b>Uang Muka</b>.
              </p>
              <p className="font-medium text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Pastikan <b>Harga OTR</b> dan <b>Uang Muka</b> terisi untuk simulasi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
