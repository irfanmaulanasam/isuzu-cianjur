import Link from 'next/link'

export default function NewsCard({ article }) {
  const getCategoryPath = (category) => {
    switch(category) {
      case 'article': return '/news/article'
      case 'promo': return '/news/promo'
      case 'event': return '/news/event'
      default: return '/news/article'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'article': return 'bg-blue-100 text-blue-800'
      case 'promo': return 'bg-green-100 text-green-800'
      case 'event': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const categoryPath = getCategoryPath(article.category)
  const categoryColor = getCategoryColor(article.category)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColor} self-start`}>
          {article.category || 'article'}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
          <Link 
            href={`${categoryPath}/${article.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        {/* Date */}
        {article.date && (
          <p className="text-gray-500 text-sm mb-2">
            📅 {new Date(article.date).toLocaleDateString('id-ID')}
          </p>
        )}

        {/* Author */}
        {article.author && (
          <p className="text-gray-500 text-sm mb-4">
            ✍️ Oleh: {article.author}
          </p>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
            {article.excerpt}
          </p>
        )}

        {/* Read More Link */}
        <div className="mt-auto">
          <Link 
            href={`${categoryPath}/${article.slug}`}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center"
          >
            Baca Selengkapnya →
          </Link>
        </div>
      </div>
    </div>
  )
}