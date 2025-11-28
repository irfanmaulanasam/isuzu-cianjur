import  {loadMarkdown}  from "@/src/lib/loadmarkdown"
import MarkdownWrapper from "../components/MarkdownWrapper";
export default async function PrivacyPolicy() {
  const html = await loadMarkdown("/src/data/legal/privacy.md");

  return (
    <div className="prose mx-auto py-10">
      <MarkdownWrapper>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </MarkdownWrapper>
    </div>
  );
}
