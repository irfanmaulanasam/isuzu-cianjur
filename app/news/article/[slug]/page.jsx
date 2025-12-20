import { getArticleData, getAllArticleSlugs } from "@/src/lib/getallnews";
import { generateContentMetadata } from "@/src/lib/generateMetadata";
import ArticleClientShell from "@/app/news/components/ArticleClientShell";

export async function generateStaticParams() {
  return getAllArticleSlugs("article");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "article");

  return generateContentMetadata({
    content: article,
    type: "article",
    fallbackTitle: "Artikel Isuzu Bahana Cianjur",
    fallbackDescription: "Berita terbaru tentang Isuzu Euro 4 di Cianjur.",
    title: article?.title
      ? `${article.title} | Isuzu Bahana Cianjur`
      : "Artikel Tidak Ditemukan",
    openGraph: {
      title: article?.title || "Artikel Isuzu Bahana Cianjur",
      description: article?.excerpt || "Baca artikel lengkapnya",
      images: article?.image ? [article.image] : ["/og-news.jpg"],
      type: "article",
    },
  });
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "article");

  return <ArticleClientShell article={article} slug={slug} />;
}