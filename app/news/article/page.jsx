import { getSortedArticlesData } from '@/src/lib/getallnews'
import NewsCard from '@/app/components/layout/NewsCard'
import Link from 'next/link'

export default function ArticleList() {
  const articles = getSortedArticlesData('article')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📖 Semua Artikel
      </h1>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada artikel tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
          <Link
            href="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            ← Kembali ke Beranda Berita
          </Link>
        </div>
      )}
    </div>
  )
}