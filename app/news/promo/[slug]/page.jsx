import { getArticleData, getAllArticleSlugs } from '@/src/lib/getallnews'
import ContentReader from '@/app/news/components/ContentReader'
import { generateContentMetadata } from '@/src/lib/generateMetadata'

export async function generateStaticParams() {
  return getAllArticleSlugs('promo')
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const promo = getArticleData(slug, 'promo')
  
  return generateContentMetadata({ 
    content: promo, 
    type: 'promo',
    fallbackTitle: 'Promo Tidak Ditemukan'
  })
}

export default async function PromoDetail({ params }) {
  const { slug } = await params
  const promo = getArticleData(slug, 'promo')

  return (
    <ContentReader 
      content={promo}
      type="promo"
      backPath="/promo"
      backLabel="Promo"
    />
  )
}