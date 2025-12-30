import specsObj  from '@/src/data/products/specs';

const allSpecSlugs = Object.keys(specsObj)
export {allSpecSlugs}
export async function getAllProductSlugs() {
  return allSpecSlugs.map(slug => ({ params: { slug } }));
}
const specs = Object.values(specsObj)
export async function getProductBySlug(slug) {
  return specs.find(spec => spec.slug === slug) || null;
}
