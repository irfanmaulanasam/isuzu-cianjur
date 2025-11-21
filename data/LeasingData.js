const MonthRate = ((p)=>{
  return p/120
})
export const LeasingData = [
  { name: "Mitsui Leasing Capital Indonesia",surname:"MLCI", tenor: [12, 24, 36, 48], rate: MonthRate(7.25) },
  { name: "Mandiri Tunas Finance",surname:"MTF", tenor: [12, 24, 36, 48, 60], rate: MonthRate(9.25) },
  { name:"Adira Dinamika Multi Finance",surname: "ADIRA", tenor: [12, 24, 36, 48, 60], rate: MonthRate(10.25)},
  { name:"Astra Credit Companies",surname: "ACC", tenor: [12, 24, 36, 48, 60], rate: MonthRate(8) },
  { name:"Surya Artha Nusantara Finance",surname: "SANF", tenor: [12, 24, 36, 48], rate: MonthRate(9) }
];
