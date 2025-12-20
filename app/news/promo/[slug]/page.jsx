// app/news/[slug]/page.js
import { getArticleData, getAllArticleSlugs } from "@/src/lib/getallnews";
import { generateArticleMetadata } from "@/src/lib/generateMetadata";
import ArticleClientShell from "@/app/news/components/ArticleClientShell";

export async function generateStaticParams() {
  return getAllArticleSlugs("promo");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "promo");

  if (!article) {
    return {
      title: "Promo Tidak Ditemukan | Isuzu Bahana Cianjur",
      description: "Maaf, Promo yang Anda cari tidak ditemukan.",
    };
  }

  return generateArticleMetadata({ content: article });
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "promo");

  return <ArticleClientShell article={article} slug={slug} />;
}
