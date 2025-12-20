import { specs, allSpecSlugs } from '@/src/data/products/specs.js';

export async function getAllProductSlugs() {
  return allSpecSlugs.map(slug => ({ params: { slug } }));
}

export async function getProductBySlug(slug) {
  return specs.find(spec => spec.slug === slug) || null;
}
