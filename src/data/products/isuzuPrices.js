export const IsuzuPrices = {
   "Niaga Ringan (Low Commercial Vehicle)": [
    { model: "Traga Pick Up (FD)", price: "297000000", type: "Low Commercial Vehicle" },
    { model: "Traga Pick Up (FD) Black Premium", price: "299000000", type: "Low Commercial Vehicle" },
    { model: "Traga Pick Up (FD) AC", price: "306000000", type: "Low Commercial Vehicle" },
    { model: "Traga Pick Up (FD) Black Premium AC", price: "308000000", type: "Low Commercial Vehicle" },
    { model: "Traga Box Besi Aluminium", price: "338000000", type: "Low Commercial Vehicle" },
    { model: "Traga Bus", price: "506000000", type: "Low Commercial Vehicle" },
    { model: "Traga Chassis B", price: "301000000", type: "Low Commercial Vehicle" },
    { model: "Traga Chassis", price: "296000000", type: "Low Commercial Vehicle" },
    { model: "Traga Freezer Box", price: "420000000", type: "Low Commercial Vehicle" },
  ],
  "Sport Utility Vehicle": [
    { model: "MU-X", price: "559800000", type: "Sport Utility Vehicle" },
  ],
  "High-PickUp": [
    { model: "DMAX Single Cabin MT", price: "413950000", type: "Truck Pick Up" },
    { model: "DMAX Double Cabin MT", price: "524100000", type: "Truck Pick Up" },
    { model: "DMAX Rodeo MT", price: "537800000", type: "Truck Pick Up" }
  ],
  "Niaga Berat (HCV)": [
    { model: "FTR Q", price: "640000000", type: "High Commercial Vehicle" },
    { model: "FTR P", price: "712000000", type: "High Commercial Vehicle" },
    { model: "FTR S", price: "716000000", type: "High Commercial Vehicle" },
    { model: "FTR T", price: "724000000", type: "High Commercial Vehicle" },

    { model: "FVR L D", price: "793000000", type: "High Commercial Vehicle" },
    { model: "FVR P", price: "799000000", type: "High Commercial Vehicle" },
    { model: "FVR S", price: "809000000", type: "High Commercial Vehicle" },
    { model: "FVR Q", price: "804000000", type: "High Commercial Vehicle" },
    { model: "FVR U", price: "818000000", type: "High Commercial Vehicle" },

    { model: "GVR J", price: "833000000", type: "High Commercial Vehicle" },
    { model: "GVR J HP ABS", price: "906000000", type: "High Commercial Vehicle" },

    { model: "FVM N", price: "940000000", type: "High Commercial Vehicle" },
    { model: "FVM U", price: "952000000", type: "High Commercial Vehicle" },
    { model: "FVM U HP", price: "1005000000", type: "High Commercial Vehicle" },
    { model: "FVM N HP ABS", price: "1021000000", type: "High Commercial Vehicle" },

    { model: "FVZ N HP", price: "1179000000", type: "High Commercial Vehicle" },
    { model: "FVZ L HP MX", price: "1174000000", type: "High Commercial Vehicle" },
    { model: "FVZ U HP", price: "1200000000", type: "High Commercial Vehicle" },

    { model: "GVZ K HP ABS", price: "1196000000", type: "High Commercial Vehicle" },
    { model: "GXZ K ABS", price: "1353000000", type: "High Commercial Vehicle" },
  ],
  "Niaga Menengah (MCV)": [
    { model: "NLR", price: "433000000", type: "Medium Commercial Vehicle" },
    { model: "NLR L", price: "450000000", type: "Medium Commercial Vehicle" },

    { model: "NMR", price: "511000000", type: "Medium Commercial Vehicle" },
    { model: "NMR L", price: "522000000", type: "Medium Commercial Vehicle" },
    { model: "NMR HD 5.8", price: "522000000", type: "Medium Commercial Vehicle" },
    { model: "NMR HD 6.5", price: "533000000", type: "Medium Commercial Vehicle" },

    { model: "NPS", price: "910000000", type: "Medium Commercial Vehicle" },

    { model: "NLR B Microbus AC", price: "607000000", type: "Medium Commercial Vehicle" },
    { model: "NLR B L Microbus AC", price: "654000000", type: "Medium Commercial Vehicle" },

    { model: "NLR B", price: "437000000", type: "Medium Commercial Vehicle" },
    { model: "NLR B L", price: "450000000", type: "Medium Commercial Vehicle" },

    { model: "NQR", price: "527000000", type: "Medium Commercial Vehicle" },
  ],
  
};
export const getUniqueTypes = () => {
  const types = new Set();

  Object.values(IsuzuPrices).forEach(group => {
    if (Array.isArray(group)) {
      group.forEach(item => types.add(item.type));
    } else if (group && typeof group === "object") {
      // types.add(IsuzuPrices.keys);
      types.add(group.type);
    }
  });

  return Array.from(types);
};

export const getPriceForProduct = (product) => {
  if (!product) return null;

  const allPrices = Object.values(IsuzuPrices).flat();

  const name = product.name.toLowerCase();

  const matched = allPrices.find((item) => {
    const model = item.model.toLowerCase();

    return name.includes(model);
  });

  return matched ? Number(matched.price) : null;
};