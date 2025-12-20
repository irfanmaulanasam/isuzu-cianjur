import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react' // ✅ Next.js cache

const newsDirectory = path.join(process.cwd(), 'src/data/news')

export function getSortedArticlesData(category = 'article') {
  const categoryDirectory = path.join(newsDirectory, category)
  
  try {
    const fileNames = fs.readdirSync(categoryDirectory)
    const allArticlesData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(categoryDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        category,
        ...matterResult.data,
        content: matterResult.content
      }
    })

    return allArticlesData.sort((a, b) => {
      if (a.date < b.date) return 1
      else return -1
    })
  } catch (error) {
    return []
  }
}

export function getAllArticleSlugs(category = 'article') {
  const categoryDirectory = path.join(newsDirectory, category)
  
  try {
    const fileNames = fs.readdirSync(categoryDirectory)
    return fileNames.map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      }
    })
  } catch (error) {
    return []
  }
}

export function getArticleData(slug, category = 'article') {
  try {
    const categoryDirectory = path.join(newsDirectory, category)
    const fullPath = path.join(categoryDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      category,
      content: matterResult.content,
      ...matterResult.data,
    }
  } catch (error) {
    return null
  }
}

export function getAllCategoriesData() {
  const categories = ['article', 'promo', 'event']
  const result = {}

  categories.forEach(category => {
    result[category] = getSortedArticlesData(category).slice(0, 6)
  })

  return result
}
