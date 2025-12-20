'use client'
import Link from 'next/link'
import { useMemo } from 'react'
import { useLanguage } from '@/src/context/languageContext'
import NewsCard from './components/NewsCard'
import EN_TEXT from '@/src/data/news/en'
import ID_TEXT from '@/src/data/news/id'

export default function NewsHomeClient({ categoriesData }) {
  const { language } = useLanguage()

  const text = useMemo(
    () => (language === 'en' ? EN_TEXT : ID_TEXT),
    [language]
  )

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-50">
        📰 {text.title}
      </h1>

      {/* Navigation Tabs */}
      <div className="flex gap-6 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
        <Link
          href="/news/article"
          className="text-lg font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {text.tabs.article}
        </Link>
        <Link
          href="/news/promo"
          className="text-lg font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {text.tabs.promo}
        </Link>
        <Link
          href="/news/event"
          className="text-lg font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {text.tabs.event}
        </Link>
      </div>

      {/* Featured Articles from each category */}
      <div className="space-y-12">
        {/* Articles */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {text.sections.article.title}
            </h2>
            <Link
              href="/news/article"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
            >
              {text.sections.article.seeAll}
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {text.sections.promo.title}
            </h2>
            <Link
              href="/news/promo"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
            >
              {text.sections.promo.seeAll}
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {text.sections.event.title}
            </h2>
            <Link
              href="/news/event"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
            >
              {text.sections.event.seeAll}
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