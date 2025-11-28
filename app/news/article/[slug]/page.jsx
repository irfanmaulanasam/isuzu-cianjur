import { getArticleData, getAllArticleSlugs } from '@/src/lib/getallnews'
import ContentReader from '@/app/news/components/ContentReader'
import { generateContentMetadata } from '@/src/lib/generateMetadata'

export async function generateStaticParams() {
  return getAllArticleSlugs('article')
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticleData(slug, 'article')
  
  return generateContentMetadata({ 
    content: article, 
    type: 'article',
    fallbackTitle: 'Artikel Tidak Ditemukan'
  })
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params
  const article = getArticleData(slug, 'article')

  return (
    <ContentReader 
      content={article}
      type="article"
      backPath="/news"
      backLabel="Berita"
    />
  )
}