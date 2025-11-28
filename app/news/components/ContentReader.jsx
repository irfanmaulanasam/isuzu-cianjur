// src/components/ContentReader.jsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ContentReader({ 
  content, 
  type = 'article',
  backPath = '/news',
  backLabel = 'Berita'
}) {
  if (!content) {
    notFound()
  }

  // Config berdasarkan type
  const typeConfig = {
    article: {
      basePath: '/news/article',
      label: 'Artikel'
    },
    promo: {
      basePath: '/promo',
      label: 'Promo'
    },
    event: {
      basePath: '/events',
      label: 'Events'
    }
  }

  const config = typeConfig[type] || typeConfig.article

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-blue-600">
          Beranda
        </Link>
        <span>/</span>
        <Link href={backPath} className="hover:text-blue-600">
          {backLabel}
        </Link>
        <span>/</span>
        <Link href={config.basePath} className="hover:text-blue-600">
          {config.label}
        </Link>
        <span>/</span>
        <span className="text-gray-800 truncate" title={content.title}>
          {content.title.length > 30 ? `${content.title.substring(0, 30)}...` : content.title}
        </span>
      </nav>
      
      <article className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {content.title}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
          {content.date && (
            <span className="flex items-center">
              📅 {new Date(content.date).toLocaleDateString('id-ID')}
            </span>
          )}
          {content.author && (
            <span className="flex items-center">
              ✍️ Oleh: {content.author}
            </span>
          )}
          {/* Tambahan field khusus untuk event */}
          {content.location && (
            <span className="flex items-center">
              📍 {content.location}
            </span>
          )}
          {content.eventDate && (
            <span className="flex items-center">
              🗓️ {new Date(content.eventDate).toLocaleDateString('id-ID')}
            </span>
          )}
        </div>
        
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
        
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-800" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-gray-800" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-gray-800" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-gray-800" {...props} />,
              em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600 bg-blue-50 py-2" {...props} />
              ),
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border-collapse border border-gray-300" {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th className="border border-gray-300 bg-gray-100 px-4 py-3 text-left font-bold text-gray-800" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="border border-gray-300 px-4 py-3 text-gray-700" {...props} />
              ),
              tr: ({node, ...props}) => (
                <tr className="hover:bg-gray-50 transition-colors" {...props} />
              ),
            }}
          >
            {content.content}
          </ReactMarkdown>
        </div>

        {/* Tambahan CTA untuk promo */}
        {type === 'promo' && content.ctaLink && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Tertarik dengan promo ini?
            </h3>
            <Link 
              href={content.ctaLink}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Dapatkan Promo Sekarang
            </Link>
          </div>
        )}

        {/* Tambahan info untuk event */}
        {type === 'event' && content.registerLink && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Tertarik mengikuti event ini?
            </h3>
            <Link 
              href={content.registerLink}
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Daftar Sekarang
            </Link>
          </div>
        )}
      </article>
    </div>
  )
}