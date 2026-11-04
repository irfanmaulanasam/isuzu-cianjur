// Hapus import fs, path, dan gray-matter yang lama
const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export async function getSortedArticlesData(category = 'news') {
  try {
    // Mengambil data dari backend Express dengan cache 'no-store' agar selalu update
    const res = await fetch(`${API_URL}/articles`, { cache: 'no-store' });
    
    if (!res.ok) throw new Error('Gagal mengambil data artikel dari API');
    
    const articles = await res.json();
    
    // Filter artikel berdasarkan kategori dan status rilis (published: true)
    const filteredArticles = articles.filter(
      (article) => article.category === category && article.published
    );
    
    // API Prisma sudah mengurutkan berdasarkan createdAt 'desc', jadi tidak perlu sort manual lagi
    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getAllArticleSlugs(category = 'news') {
  try {
    const articles = await getSortedArticlesData(category);
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function getArticleData(slug, category = 'news') {
  try {
    const res = await fetch(`${API_URL}/articles/${slug}`, { cache: 'no-store' });
    
    if (!res.ok) return null;
    
    const article = await res.json();
    
    // Menyusun ulang format agar cocok dengan ekspektasi komponen frontend lama
    return {
      slug: article.slug,
      category: article.category,
      content: article.content, // Ini sekarang berisi HTML murni, bukan Markdown
      title: article.title,
      thumbnail: article.thumbnail,
      excerpt: article.excerpt,
      date: article.createdAt, // Menggunakan tanggal pembuatan dari database
      tags: article.tags
    };
  } catch (error) {
    return null;
  }
}

export async function getAllCategoriesData() {
  const categories = ['news', 'promo', 'event'];
  const result = {};

  // Karena fetch bersifat asynchronous, kita gunakan perulangan for...of
  for (const category of categories) {
    const data = await getSortedArticlesData(category);
    result[category] = data.slice(0, 6);
  }
  
  return result;
  
}
// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'
// import { cache } from 'react' // ✅ Next.js cache

// const newsDirectory = path.join(process.cwd(), 'src/data/news')

// export function getSortedArticlesData(category = 'article') {
//   const categoryDirectory = path.join(newsDirectory, category)
  
//   try {
//     const fileNames = fs.readdirSync(categoryDirectory)
//     const allArticlesData = fileNames.map((fileName) => {
//       const slug = fileName.replace(/\.md$/, '')
//       const fullPath = path.join(categoryDirectory, fileName)
//       const fileContents = fs.readFileSync(fullPath, 'utf8')
//       const matterResult = matter(fileContents)

//       return {
//         slug,
//         category,
//         ...matterResult.data,
//         content: matterResult.content
//       }
//     })

//     return allArticlesData.sort((a, b) => {
//       if (a.date < b.date) return 1
//       else return -1
//     })
//   } catch (error) {
//     return []
//   }
// }

// export function getAllArticleSlugs(category = 'article') {
//   const categoryDirectory = path.join(newsDirectory, category)
  
//   try {
//     const fileNames = fs.readdirSync(categoryDirectory)
//     return fileNames.map((fileName) => {
//       return {
//         slug: fileName.replace(/\.md$/, ''),
//       }
//     })
//   } catch (error) {
//     return []
//   }
// }

// export function getArticleData(slug, category = 'article') {
//   try {
//     const categoryDirectory = path.join(newsDirectory, category)
//     const fullPath = path.join(categoryDirectory, `${slug}.md`)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')
//     const matterResult = matter(fileContents)

//     return {
//       slug,
//       category,
//       content: matterResult.content,
//       ...matterResult.data,
//     }
//   } catch (error) {
//     return null
//   }
// }

// export function getAllCategoriesData() {
//   const categories = ['article', 'promo', 'event']
//   const result = {}

//   categories.forEach(category => {
//     result[category] = getSortedArticlesData(category).slice(0, 6)
//   })

//   return result
// }
