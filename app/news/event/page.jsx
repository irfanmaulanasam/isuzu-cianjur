import ContentListClient from "../components/ContentListClient";
export default async function EventListPage() {
  const events = await getSortedArticlesData("event");
  return (
    <ContentListClient
      items={events}
      type="event"
      backPath="/news"
    />
  );
}