// src/data/calculator-data/DEFAULT_DATA.js
import { VEHICLE_COST_CONFIG } from './vehicle-cost-config';

export const DEFAULT_DATA = {
  // Harga & Finansial
  hargaTruk: 450000000,
  umurPakai: 5,
  nilaiSisa: 0.2, // 20% dari harga awal
  uangMuka: VEHICLE_COST_CONFIG.UANG_MUKA_DEFAULT,
  tenor: VEHICLE_COST_CONFIG.TENOR_DEFAULT,
  bungaKredit: VEHICLE_COST_CONFIG.BUNGA_KREDIT_PERTAHUN * 100, // dalam persen
  
  // Biaya Tetap
  kirPajak: VEHICLE_COST_CONFIG.KIR_PERTAHUN + VEHICLE_COST_CONFIG.STNK_PERTAHUN,
  asuransi: 0, // Akan dihitung otomatis
  gajiSupir: VEHICLE_COST_CONFIG.GAJI_SUPIR_PERBULAN,
  
  // Biaya Variabel
  hargaSolar: 12000,
  rasioBBM: 8,
  jarakTahunan: 150 * VEHICLE_COST_CONFIG.HARI_KERJA_PERTAHUN, // 150km/hari * 300 hari
  perawatan: 0, // Akan dihitung otomatis
  ban: 0, // Akan dihitung otomatis
};