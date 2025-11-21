import products from "@/src/data/product_summary.json";

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts() {
  return products;
}