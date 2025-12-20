import { getArticleData, getAllArticleSlugs } from "@/src/lib/getallnews";
import { generateArticleMetadata } from "@/src/lib/generateMetadata";
import ArticleClientShell from "@/app/news/components/ArticleClientShell";

export async function generateStaticParams() {
  return getAllArticleSlugs("article");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "article");

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Isuzu Bahana Cianjur",
      description: "Maaf, artikel yang Anda cari tidak ditemukan.",
    };
  }

  return generateArticleMetadata({ content: article });
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "article");

  return <ArticleClientShell article={article} slug={slug} />;
}
