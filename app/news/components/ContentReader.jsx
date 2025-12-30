// src/components/ContentReader.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ContentReader({
  content,
  type = "article",
}) {
  if (!content) {
    notFound();
  }

  const typeConfig = {
    article: {
      basePath: "/news/article",
      label: "Artikel",
    },
    promo: {
      basePath: "/promo",
      label: "Promo",
    },
    event: {
      basePath: "/events",
      label: "Events",
    },
  };

  const config = typeConfig[type] || typeConfig.article;

  return (
    <div className="container">
      <article className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-slate-700">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-50 mb-4">
          {content.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-slate-400 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
          {content.date && (
            <span className="flex items-center">
              📅 {new Date(content.date).toLocaleDateString("id-ID")}
            </span>
          )}
          {content.author && (
            <span className="flex items-center">
              ✍️ Oleh: {content.author}
            </span>
          )}
          {content.location && (
            <span className="flex items-center">
              📍 {content.location}
            </span>
          )}
          {content.eventDate && (
            <span className="flex items-center">
              🗓️ {new Date(content.eventDate).toLocaleDateString("id-ID")}
            </span>
          )}
        </div>

        {/* Thumbnail */}
        {content.thumbnail && (
          <div className="relative w-full h-80 mb-8">
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        {/* Body */}
        <div className="prose prose-lg max-w-none prose-slate dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl font-bold mt-6 mb-4 text-gray-800 dark:text-slate-50"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl font-bold mt-5 mb-3 text-gray-800 dark:text-slate-50"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg font-bold mt-4 mb-2 text-gray-800 dark:text-slate-50"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="mb-4 text-gray-700 dark:text-slate-200 leading-relaxed"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-slate-200"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-slate-200"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-700 dark:text-slate-200" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong
                  className="font-bold text-gray-800 dark:text-slate-50"
                  {...props}
                />
              ),
              em: ({ node, ...props }) => (
                <em
                  className="italic text-gray-700 dark:text-slate-200"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600 dark:text-slate-200 bg-blue-50 dark:bg-slate-800/60 py-2"
                  {...props}
                />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table
                    className="min-w-full border-collapse border border-gray-300 dark:border-slate-600"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-800 px-4 py-3 text-left font-bold text-gray-800 dark:text-slate-50"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="border border-gray-300 dark:border-slate-600 px-4 py-3 text-gray-700 dark:text-slate-200"
                  {...props}
                />
              ),
              tr: ({ node, ...props }) => (
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  {...props}
                />
              ),
            }}
          >
            {content.content}
          </ReactMarkdown>
        </div>

        {/* CTA Promo */}
        {type === "promo" && content.ctaLink && (
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Tertarik dengan promo ini?
            </h3>
            <Link
              href={content.ctaLink}
              className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors font-semibold"
            >
              Dapatkan Promo Sekarang
            </Link>
          </div>
        )}

        {/* CTA Event */}
        {type === "event" && content.registerLink && (
          <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              Tertarik mengikuti event ini?
            </h3>
            <Link
              href={content.registerLink}
              className="inline-block bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-400 transition-colors font-semibold"
            >
              Daftar Sekarang
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}