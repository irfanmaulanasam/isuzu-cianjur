// utils/tco-calculator.js
import { IsuzuPrices } from '../data/products/isuzuPrices';
import { VEHICLE_COST_CONFIG } from '../data/config/vehicle-cost-config';

export class TCOCalculator {
  static calculateVehicleTCO(vehicleModel, customParams = {}) {
    // Find vehicle data
    const vehicle = this.findVehicle(vehicleModel);
    if (!vehicle) return null;
    
    const price = this.cleanPrice(vehicle.price);
    const params = { ...customParams };
    
    // Set default parameters if not provided
    if (!params.dailyKm) params.dailyKm = this.getDefaultDailyKm(vehicle.type);
    if (!params.fuelPrice) params.fuelPrice = 12000; // Harga solar default
    if (!params.workingDays) params.workingDays = VEHICLE_COST_CONFIG.HARI_KERJA_PERTAHUN;
    
    const yearlyKm = params.dailyKm * params.workingDays;
    
    return this.calculateDetailedTCO(price, vehicle.type, yearlyKm, params);
  }
  
  static calculateDetailedTCO(vehiclePrice, vehicleType, yearlyKm, params = {}) {
    const {
      tenor = VEHICLE_COST_CONFIG.TENOR_DEFAULT,
      uangMuka = VEHICLE_COST_CONFIG.UANG_MUKA_DEFAULT,
      bungaKredit = VEHICLE_COST_CONFIG.BUNGA_KREDIT_PERTAHUN,
      fuelPrice = 12000,
      gajiSupir = VEHICLE_COST_CONFIG.GAJI_SUPIR_PERBULAN,
      workingDays = VEHICLE_COST_CONFIG.HARI_KERJA_PERTAHUN
    } = params;
    
    const fuelConsumption = VEHICLE_COST_CONFIG.FUEL_CONSUMPTION[vehicleType] || 8;
    
    // 1. BIAYA KEPEMILIKAN (OWNERSHIP COST)
    const pajakPertahun = vehiclePrice * VEHICLE_COST_CONFIG.PAJAK_PERTAHUN;
    const asuransiPertahun = vehiclePrice * VEHICLE_COST_CONFIG.ASURANSI_PERTAHUN;
    const kirPertahun = VEHICLE_COST_CONFIG.KIR_PERTAHUN;
    const stnkPertahun = VEHICLE_COST_CONFIG.STNK_PERTAHUN;
    
    // 2. BIAYA FINANSIAL (KREDIT)
    const nilaiPinjaman = vehiclePrice * (1 - uangMuka);
    const totalBunga = nilaiPinjaman * bungaKredit * tenor;
    const angsuranPokokPertahun = nilaiPinjaman / tenor;
    const bungaPertahun = totalBunga / tenor;
    const totalAngsuranPertahun = angsuranPokokPertahun + bungaPertahun;
    
    // 3. BIAYA OPERASIONAL (OPERATIONAL COST)
    const konsumsiBBMPertahun = yearlyKm / fuelConsumption;
    const biayaBBMPertahun = konsumsiBBMPertahun * fuelPrice;
    const servicePertahun = vehiclePrice * VEHICLE_COST_CONFIG.SERVICE_RUTIN_PERTAHUN;
    const banPertahun = vehiclePrice * VEHICLE_COST_CONFIG.BAN_PERTAHUN;
    const oliPertahun = vehiclePrice * VEHICLE_COST_CONFIG.OIL_PERTAHUN;
    const gajiSupirPertahun = gajiSupir * 12;
    const overheadPertahun = vehiclePrice * VEHICLE_COST_CONFIG.OVERHEAD_OPERASIONAL;
    
    // 4. TOTAL BIAYA
    const biayaTetapPertahun = totalAngsuranPertahun + pajakPertahun + asuransiPertahun + kirPertahun + stnkPertahun;
    const biayaVariabelPertahun = biayaBBMPertahun + servicePertahun + banPertahun + oliPertahun + gajiSupirPertahun + overheadPertahun;
    const totalBiayaPertahun = biayaTetapPertahun + biayaVariabelPertahun;
    
    // 5. BREAKDOWN PER KM & PER BULAN
    const biayaPerKm = yearlyKm > 0 ? totalBiayaPertahun / yearlyKm : 0;
    const biayaPerBulan = totalBiayaPertahun / 12;
    
    return {
      // Input Parameters
      vehiclePrice,
      vehicleType,
      yearlyKm,
      tenor,
      uangMuka: vehiclePrice * uangMuka,
      
      // Breakdown Biaya Tetap
      biayaTetap: {
        angsuranKredit: totalAngsuranPertahun,
        pajak: pajakPertahun,
        asuransi: asuransiPertahun,
        kirStnk: kirPertahun + stnkPertahun,
        total: biayaTetapPertahun
      },
      
      // Breakdown Biaya Variabel
      biayaVariabel: {
        bbm: biayaBBMPertahun,
        service: servicePertahun,
        ban: banPertahun,
        oli: oliPertahun,
        gajiSupir: gajiSupirPertahun,
        overhead: overheadPertahun,
        total: biayaVariabelPertahun
      },
      
      // Total & Rata-rata
      totalBiayaPertahun,
      biayaPerBulan,
      biayaPerKm,
      
      // Additional Metrics
      konsumsiBBMPertahun,
      estimasiBBMPerHari: (yearlyKm / workingDays) / fuelConsumption
    };
  }
  
  static findVehicle(modelName) {
    for (const category of Object.values(IsuzuPrices)) {
      const vehicle = category.find(item => 
        item.model.toLowerCase().includes(modelName.toLowerCase())
      );
      if (vehicle) return vehicle;
    }
    return null;
  }
  
  static cleanPrice(priceString) {
    return parseInt(priceString.replace(/[^\d]/g, ''));
  }
  
  static getDefaultDailyKm(vehicleType) {
    const defaultKm = {
      "Low Commercial Vehicle": 150,
      "Medium Commercial Vehicle": 200,
      "High Commercial Vehicle": 250,
      "Sport Utility Vehicle": 100,
      "Truck Pick Up": 120
    };
    return defaultKm[vehicleType] || 150;
  }
  
  // Method untuk mendapatkan semua model dengan TCO estimasi
  static getAllModelsWithTCOEstimation() {
    const models = [];
    
    Object.values(IsuzuPrices).forEach(category => {
      category.forEach(vehicle => {
        const tco = this.calculateVehicleTCO(vehicle.model);
        if (tco) {
          models.push({
            ...vehicle,
            priceNumber: this.cleanPrice(vehicle.price),
            tcoEstimation: tco
          });
        }
      });
    });
    
    return models.sort((a, b) => a.priceNumber - b.priceNumber);
  }
}