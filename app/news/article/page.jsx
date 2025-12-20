import { getSortedArticlesData } from "@/src/lib/getallnews";
import ContentListClient from "@/app/news/components/ContentListClient";

export default async function ArticleListPage() {
  const articles = await getSortedArticlesData("article");
  return (
    <ContentListClient
      items={articles}
      type="article"
      backPath="/news"
    />
  );
}