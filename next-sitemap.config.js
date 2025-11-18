/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Mengambil URL dari variabel lingkungan
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL || 'https://isuzu-cianjur.vercel.app', 
  generateRobotsTxt: true, 
}