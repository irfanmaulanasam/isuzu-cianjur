import ProductDetailClient from "@/app/products/components/ProductDetailClient";
import { getAllProductSlugs, getProductBySlug } from "@/src/lib/products";
import { generateProductMetadata } from "@/src/lib/generateMetadata";

export async function generateStaticParams() {
  return getAllProductSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk tidak ditemukan | Bahana Isuzu Cianjur",
      description: "Maaf, produk yang Anda cari tidak tersedia.",
    };
  }

  return generateProductMetadata({ content: product }); // wrapper yang kita buat tadi
}

export default async function ProductDetailPage({ params }) {
  return <ProductDetailClient params={params} />;
}
