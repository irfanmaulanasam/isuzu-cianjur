import  {specs}  from "@/src/data/products/specs";

export function getSpec(slug) {
  return specs[slug] || null;
}
export function getAllSpecSlugs(){
  return specs.map((p)=>p.slug)
}