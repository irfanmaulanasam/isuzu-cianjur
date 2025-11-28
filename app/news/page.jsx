import { getAllCategoriesData } from '@/src/lib/getallnews'
import Link from 'next/link'
import NewsCard from './components/NewsCard'

export default function NewsHome() {
  const categoriesData = getAllCategoriesData()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📰 Berita & Informasi
      </h1>

      {/* Navigation Tabs */}
      <div className="flex gap-6 mb-8 border-b pb-4">
        <Link 
          href="/news/article"
          className="text-lg font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          Artikel
        </Link>
        <Link 
          href="/news/promo"
          className="text-lg font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          Promo
        </Link>
        <Link 
          href="/news/event"
          className="text-lg font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          Event
        </Link>
      </div>

      {/* Featured Articles from each category */}
      <div className="space-y-12">
        {/* Articles */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Artikel Terbaru</h2>
            <Link href="/news/article" className="text-blue-600 hover:text-blue-800 font-semibold">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.article.slice(0, 3).map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* Promos */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Promo Terbaru</h2>
            <Link href="/news/promo" className="text-blue-600 hover:text-blue-800 font-semibold">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.promo.slice(0, 3).map((promo) => (
              <NewsCard key={promo.slug} article={promo} />
            ))}
          </div>
        </section>

        {/* Events */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Event Terbaru</h2>
            <Link href="/news/event" className="text-blue-600 hover:text-blue-800 font-semibold">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.event.slice(0, 3).map((event) => (
              <NewsCard key={event.slug} article={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}