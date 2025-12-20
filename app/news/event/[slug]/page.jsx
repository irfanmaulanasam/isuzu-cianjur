// app/news/event/[slug]/page.tsx
import { getArticleData, getAllArticleSlugs } from "@/src/lib/getallnews";
import { generateContentMetadata } from "@/src/lib/generateMetadata";
import ArticleClientShell from "@/app/news/components/ArticleClientShell";

export async function generateStaticParams() {
  return getAllArticleSlugs("event");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "event");

  return generateContentMetadata({
    content: article,
    type: "event",
    fallbackTitle: "Event Isuzu Bahana Cianjur",
    fallbackDescription:
      "Event dan kegiatan terbaru dari Bahana Isuzu Cianjur.",
    title: article?.title
      ? `${article.title} | Event Isuzu Bahana Cianjur`
      : "Event Tidak Ditemukan",
    openGraph: {
      title: article?.title || "Event Isuzu Bahana Cianjur",
      description: article?.excerpt || "Lihat detail event lengkapnya.",
      images: article?.image ? [article.image] : ["/og-news.jpg"],
      type: "article",
    },
  });
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const article = await getArticleData(slug, "event");

  return <ArticleClientShell article={article} slug={slug} />;
}