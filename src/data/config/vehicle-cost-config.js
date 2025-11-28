// data/vehicle-cost-config.js
export const VEHICLE_COST_CONFIG = {
  // PAJAK & ASURANSI (Percentage of vehicle price)
  PAJAK_PERTAHUN: 0.015, // 1.5% dari harga kendaraan
  ASURANSI_PERTAHUN: 0.025, // 2.5% dari harga kendaraan
  
  // BIAYA ADMINISTRASI
  KIR_PERTAHUN: 2500000, // Flat rate
  STNK_PERTAHUN: 500000, // Flat rate
  
  // BIAYA OPERASIONAL
  SERVICE_RUTIN_PERTAHUN: 0.01, // 1% dari harga kendaraan
  BAN_PERTAHUN: 0.008, // 0.8% dari harga kendaraan
  OLI_PERTAHUN: 0.003, // 0.3% dari harga kendaraan
  
  // TENOR KREDIT DEFAULT
  TENOR_DEFAULT: 4, // 4 tahun
  UANG_MUKA_DEFAULT: 0.3, // 30%
  BUNGA_KREDIT_PERTAHUN: 0.08, // 8% flat per tahun
  
  // ESTIMASI PENGGUNAAN
  HARI_KERJA_PERTAHUN: 300,
  JAM_OPERASIONAL_PERHARI: 8,
  
  // KONSUMSI BBM BERDASARKAN TIPE
  FUEL_CONSUMPTION: {
    "Low Commercial Vehicle": 10, // km/L
    "Medium Commercial Vehicle": 8, // km/L
    "High Commercial Vehicle": 5, // km/L
    "Sport Utility Vehicle": 12, // km/L
    "Truck Pick Up": 9, // km/L
  },
  
  // BIAYA LAIN-LAIN
  GAJI_SUPIR_PERBULAN: 4000000,
  OVERHEAD_OPERASIONAL: 0.02, // 2% dari harga kendaraan
};