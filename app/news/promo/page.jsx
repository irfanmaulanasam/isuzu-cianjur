import ContentListClient from "../components/ContentListClient";
import { getSortedArticlesData } from "@/src/lib/getallnews";

export default async function PromoListPage() {
  const promos = await getSortedArticlesData("promo");
  return (
    <ContentListClient
      items={promos}
      type="promo"
      backPath="/news"
    />
  );
}
