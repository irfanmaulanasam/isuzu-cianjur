import { getArticleData, getAllArticleSlugs } from '@/src/lib/getallnews'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  const promos = getAllArticleSlugs('promo')
  return promos
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const promo = getArticleData(slug, 'promo')
  
  if (!promo) {
    return {
      title: 'Promo Tidak Ditemukan',
    }
  }
  
  return {
    title: `${promo.title} - Portal Berita`,
    description: promo.excerpt,
  }
}

export default async function PromoDetail({ params }) {
  const { slug } = await params
  const promo = getArticleData(slug, 'promo')

  if (!promo) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/news" className="hover:text-blue-600">
          Beranda Berita
        </Link>
        <span>/</span>
        <Link href="/news/promo" className="hover:text-blue-600">
          Promo
        </Link>
        <span>/</span>
        <span className="text-gray-800 truncate">{promo.title}</span>
      </nav>
      
      <article className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {promo.title}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
          {promo.date && (
            <span className="flex items-center">
              📅 {new Date(promo.date).toLocaleDateString('id-ID')}
            </span>
          )}
          {promo.author && (
            <span className="flex items-center">
              ✍️ Oleh: {promo.author}
            </span>
          )}
        </div>
        
        {promo.thumbnail && (
          <Image 
            src={promo.thumbnail} 
            alt={promo.title}
            height={100}
            width={60}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
        
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
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
            }}
          >
            {promo.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}