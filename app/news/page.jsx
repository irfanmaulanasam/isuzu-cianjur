// app/news/page.jsx (server component)

import { getAllCategoriesData } from '@/src/lib/getallnews'
import Loading from './Loading'
import NewsHomeClient from '@/app/news/NewsHomeClient'
import { Suspense } from 'react'
export const metadata = {
  title: 'Berita, Promo & Event Isuzu | Bahana Isuzu Cianjur',
  description:
    'Kumpulan berita, promo, dan event terbaru dari Isuzu Bahana Cianjur. Update informasi seputar Isuzu Traga, Elf, dan Giga Euro 4 untuk usaha Anda.',
  openGraph: {
    title: 'Berita & Promo Isuzu Bahana Cianjur',
    description:
      'Baca artikel, promo, dan informasi event terbaru dari Isuzu Bahana Cianjur. Resmi dan terpercaya di Cianjur.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Isuzu Bahana Cianjur',
    images: [
      {
        url: '/og?slug=news-home',
        width: 1200,
        height: 630,
        alt: 'Berita, Promo & Event Isuzu Bahana Cianjur'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og?slug=news-home']
  }
}

export default function NewsHome() {
  const categoriesData = getAllCategoriesData()
  return(
  <Suspense fallback={<Loading/>}>
    <NewsHomeClient categoriesData={categoriesData} />
  </Suspense>
  ) 
}
