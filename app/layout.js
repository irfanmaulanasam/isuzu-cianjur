import "@/app/globals.css"
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GlobalLayer from "./components/global/GlobalLayer";
import { LanguageProvider } from "@/src/context/languageContext";
import ChatWidget from "./components/chatWidget";

export const metadata = {
  metadataBase: new URL('https://isuzu-cianjur.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'id-ID': '/id-ID',
    },
  },
  title: {
    template: '%s | Isuzu Bahana Cianjur - Dealer Resmi Isuzu Euro 4',
    default: 'Isuzu Bahana Cianjur - Dealer Resmi Isuzu Euro 4'
  },
  description: 'Dapatkan harga termurah Isuzu Traga, Elf, dan Giga di Cianjur. Hitung simulasi kredit dan download brosur resmi disini Solusi Euro 4, TCO rendah, dan reliable untuk usaha logistik.',
  keywords: ['Isuzu Cianjur', 'Harga Isuzu Elf', 'Harga NLR', 'Harga NMR', 'Kredit Isuzu Traga', 'Dealer Isuzu Cianjur', 'euro4'],
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.webp', sizes: '192x192', type: 'image/webp' },
      { url: '/icon-512.webp', sizes: '512x512', type: 'image/webp' }
    ],
    apple: '/apple-touch-icon.png'
  },
  
  openGraph: {
    title: 'Promo Isuzu Cianjur - DP Ringan | Isuzu Bahana Cianjur',
    description: 'Hitung cicilan Isuzu idamanmu sekarang. Resmi dan Terpercaya. Traga, Elf, Giga Euro 4.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Isuzu Bahana Cianjur',
    images: [
      {
        url: '/og-home.jpg',      // 1200x630px
        width: 1200,
        height: 630,
        alt: 'Promo Isuzu Cianjur - Dealer Resmi Euro 4'
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Promo Isuzu Cianjur - DP Ringan',
    description: 'Hitung cicilan Isuzu idamanmu sekarang. Resmi dan Terpercaya.',
    images: ['/twitter-home.jpg'] // 1200x675px
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        <LanguageProvider>
        <Navbar />
          <main>{children}</main>
          <ChatWidget/>
          <Footer />
        </LanguageProvider>
        <GlobalLayer />
      </body>
    </html>
  )
}