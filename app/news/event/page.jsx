import { getSortedArticlesData } from '@/src/lib/getallnews'
import NewsCard from '@/app/news/components/NewsCard'
import Link from 'next/link'

export default function EventList() {
  const events = getSortedArticlesData('event')

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        📅 Semua Event
      </h1>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada event tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <NewsCard key={event.slug} article={event} />
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