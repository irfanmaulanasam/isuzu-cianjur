import { getArticleData, getAllArticleSlugs } from "@/src/lib/getallnews";
import { generateContentMetadata } from "@/src/lib/generateMetadata";
import ArticleClientShell from "@/app/news/components/ArticleClientShell";

export async function generateStaticParams() {
  return getAllArticleSlugs("promo");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "promo");

  return generateContentMetadata({
    content: article,
    type: "promo",
    fallbackTitle: "Promo Isuzu Bahana Cianjur",
    fallbackDescription:
      "Promo dan penawaran menarik dari Bahana Isuzu Cianjur.",
    title: article?.title
      ? `${article.title} | Promo Isuzu Bahana Cianjur`
      : "Promo Tidak Ditemukan",
    openGraph: {
      title: article?.title || "Promo Isuzu Bahana Cianjur",
      description: article?.excerpt || "Lihat detail promo lengkapnya.",
      images: article?.image ? [article.image] : ["/og-news.jpg"],
      type: "article",
    },
  });
}

export default async function PromoDetailPage({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "promo");

  return <ArticleClientShell article={article} slug={slug} />;
}