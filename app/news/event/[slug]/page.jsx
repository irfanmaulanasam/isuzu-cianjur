import { getArticleData, getAllArticleSlugs } from '@/src/lib/getallnews'
import ContentReader from '@/app/news/components/ContentReader'
import { generateContentMetadata } from '@/src/lib/generateMetadata'

export async function generateStaticParams() {
  return getAllArticleSlugs('event')
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = getArticleData(slug, 'event')
    
  if (!event) {
    return {
      title: 'Event Tidak Ditemukan - Portal Berita',
    }
  }

  // Simple fix - pakai type: 'website' untuk event
  return {
    title: `${event.title} - Event`,
    description: event.excerpt || event.description,
    openGraph: {
      title: event.title,
      description: event.excerpt || event.description,
      type: 'website', // ← INI YANG DIPERBAIKI
      images: event.thumbnail ? [event.thumbnail] : [],
    },
  }
}

export default async function EventDetail({ params }) {
  const { slug } = await params
  const event = getArticleData(slug, 'event')

  return (
    <ContentReader 
      content={event}
      type="event"
      backPath="/events"
      backLabel="Events"
    />
  )
}