import { getArticleData, getAllArticleSlugs } from "@/src/lib/getallnews";
import { generateArticleMetadata } from "@/src/lib/generateMetadata";
import ArticleClientShell from "@/app/news/components/ArticleClientShell";

export async function generateStaticParams() {
  return getAllArticleSlugs("event");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "event");

  if (!article) {
    return {
      title: "Event Tidak Ditemukan | Isuzu Bahana Cianjur",
      description: "Maaf, Event yang Anda cari tidak ditemukan.",
    };
  }

  return generateArticleMetadata({ content: article });
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "event");

  return <ArticleClientShell article={article} slug={slug} />;
}
