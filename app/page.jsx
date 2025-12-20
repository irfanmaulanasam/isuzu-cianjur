import Hero from './components/sections/Hero';
import ValueProps from './components/sections/ValueProps';
import PromoGrid from './components/sections/PromoGrid';
import QuickTools from './components/sections/QuickTools';
import Testimonials from './components/sections/Testimonial';
import StoryBrand from './components/sections/StoryBrand';
import CTASection from './components/sections/CTASection';

export const metadata = {
  title: 'Bahana Isuzu Cianjur — Dealer Resmi Euro 4 Traga, Elf, Giga',
  description: 'Dealer resmi Isuzu Euro 4 di Cianjur. Harga termurah Traga, Elf, Giga. Simulasi kredit DP ringan, download brosur, layanan aftersales terpercaya.',
  keywords: ['Isuzu Cianjur', 'Dealer Isuzu', 'Harga Elf', 'Kredit Traga', 'Euro 4', 'Giga Cianjur'],
  
  // ✅ Complete Open Graph
  openGraph: {
    title: 'Promo Isuzu Cianjur - DP Ringan | Bahana Isuzu',
    description: 'Harga termurah Isuzu Traga, Elf, Giga Euro 4 di Cianjur. Hitung cicilan sekarang!',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Bahana Isuzu Cianjur',
    images: [
      {
        url: '/og-home.jpg',  // 1200x630px
        width: 1200,
        height: 630,
        alt: 'Promo Isuzu Cianjur - Dealer Resmi Euro 4'
      }
    ]
  },
  
  // ✅ Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Promo Isuzu Cianjur - DP Ringan',
    description: 'Harga termurah Traga, Elf, Giga di Cianjur',
    images: ['/og-home.jpg']
  },
  
  // ✅ Structured Data (SEO Boost)
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AutomotiveDealer',
      name: 'Bahana Isuzu Cianjur',
      description: 'Dealer resmi Isuzu Euro 4 di Cianjur',
      url: 'https://isuzu-cianjur.vercel.app',
      telephone: '+62-812-2154-8054',
      email:'isuzucianjur.office@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cianjur',
        addressPostalCode:43281,
        addressRegion: 'Jawa Barat',
        addressCountry: 'ID'
      },
      makes: ['Bahana Isuzu']
    })
  }
}

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <Hero />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ValueProps />
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PromoGrid />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickTools />
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Testimonials />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StoryBrand />
        </div>
      </section>

      <CTASection />
    </main>
  );
}