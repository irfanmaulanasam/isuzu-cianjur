export const IsuzuPrices = {
  "Sport Utility Vehicle":[
    { model: "MU-X", price:"559800000", type:"Sport Utility Vehicle"},
  ],
  "High-PickUp":[
  {model:"DMAX Single Cabin MT",price:"413950000", type:"Truck Pick Up"},
  {model:"DMAX Double Cabin MT",price:"524100000", type:"Truck Pick Up"},
  {model: "DMAX Rodeo MT",price: "537800000", type:"Truck Pick Up"}
  ],
  "Niaga Berat (HCV)": [
    { model: "FTR T", price:"841340000", type: "High Commercial Vehicle" },
    { model: "FVR L D", price:"922760000", type: "High Commercial Vehicle" },
    { model: "FVR P", price:"929840000", type: "High Commercial Vehicle" },
    { model: "FVR S", price:"941640000", type: "High Commercial Vehicle" },
    { model: "FVR Q", price:"935740000", type: "High Commercial Vehicle" },
    { model: "FVR U", price:"952260000", type: "High Commercial Vehicle" },
    { model: "GVR J", price:"969960000", type: "High Commercial Vehicle" },
    { model: "GVR J HP ABS", price:"1056100000", type: "High Commercial Vehicle" },
    { model: "FVM N", price:"1087960000", type: "High Commercial Vehicle" },
    { model: "FVM U", price:"1102120000", type: "High Commercial Vehicle" },
    { model: "FVM U HP", price:"1164660000", type: "High Commercial Vehicle" },
    { model: "FVM N HP ABS", price:"1183540000", type: "High Commercial Vehicle" },
    { model: "FVZ N HP", price:"1365260000", type: "High Commercial Vehicle" },
    { model: "FVZ L HP MX", price:"1359360000", type: "High Commercial Vehicle" },
    { model: "FVZ U HP", price:"1390040000", type: "High Commercial Vehicle" },
    { model: "GVZ K HP ABS", price:"1393580000", type: "High Commercial Vehicle" },
    { model: "GXZ K ABS", price:"1578840000", type: "High Commercial Vehicle" },
  ],
  "Niaga Menengah (MCV)": [
    { model: "NLR", price:"419000000", type: "Medium Commercial Vehicle" },
    { model: "NLR L", price:"436000000", type: "Medium Commercial Vehicle" },
    { model: "NMR", price:"496000000", type: "Medium Commercial Vehicle" },
    { model: "NMR L", price:"507000000", type: "Medium Commercial Vehicle" },
    { model: "NMR HD 5.8", price:"507000000", type: "Medium Commercial Vehicle" },
    { model: "NMR HD 6.5", price:"518000000", type: "Medium Commercial Vehicle" },
    { model: "NPS", price:"896000000", type: "Medium Commercial Vehicle" },
    { model: "NLR B Microbus AC", price:"596000000", type: "Medium Commercial Vehicle" },
    { model: "NLR B L Microbus AC", price:"643000000", type: "Medium Commercial Vehicle" },
    { model: "NLR B", price:"426000000", type: "Medium Commercial Vehicle" },
    { model: "NLR B L", price:"439000000", type: "Medium Commercial Vehicle" },
    { model: "NQR B", price:"512000000", type: "Medium Commercial Vehicle" },
  ],
  "Niaga Ringan (Low Commercial Vehicle)": [
    { model: "Traga Pick Up (FD)", price:"289000000", type: "Low Commercial Vehicle" },
    { model: "Traga Box Semi Aluminium", price:"330000000", type: "Low Commercial Vehicle" },
    { model: "Traga Box Full Aluminium", price:"336000000", type: "Low Commercial Vehicle" },
    { model: "Traga Freezer Box", price:"410000000", type: "Low Commercial Vehicle" },
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
console.log(IsuzuPrices);

  return Array.from(types);
};
