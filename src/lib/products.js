import { specs } from '@/src/data/products/specs.js';
export const allSpecSlugs = Object.keys(specs)
export async function getAllProductSlugs() {
  return allSpecSlugs.map(slug => ({ params: { slug } }));
}

export async function getProductBySlug(slug) {
  return specs.find(spec => spec.slug === slug) || null;
}
