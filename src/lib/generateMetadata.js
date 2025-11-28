// src/lib/generateMetadata.js
export function generateContentMetadata({ content, type, fallbackTitle }) {
  if (!content) {
    return {
      title: `${fallbackTitle} - Portal Berita`,
    }
  }

  const typeLabels = {
    article: 'Artikel',
    promo: 'Promo',
    event: 'Event'
  }

  return {
    title: `${content.title} - ${typeLabels[type] || 'Artikel'}`,
    description: content.excerpt || content.description,
    openGraph: {
      title: content.title,
      description: content.excerpt || content.description,
      type: type === 'event' ? 'event' : 'article',
      publishedTime: content.date,
      ...(type === 'event' && {
        startTime: content.eventDate,
        location: content.location,
      }),
      images: content.thumbnail ? [content.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.excerpt || content.description,
      images: content.thumbnail ? [content.thumbnail] : [],
    },
  }
}