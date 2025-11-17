export default function MarkdownWrapper({ children }) {
  return (
    <article className="
      prose prose-slate
      max-w-none
      prose-headings:text-bahana-primary
      prose-a:text-bahana-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-slate-800
      prose-li:marker:text-bahana-primary
      prose-blockquote:border-bahana-primary
      prose-h1:text-3xl
      prose-h2:text-2xl
      prose-h3:text-xl
      prose-p:leading-relaxed
      dark:prose-invert
    ">
      {children}
    </article>
  );
}
