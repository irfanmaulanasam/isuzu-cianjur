import About from "./about";
export async function generateMetadata({ params }) {
  return {
    title: 'About Us | Isuzu Bahana Cianjur - Dealer Resmi Euro 4',
    description: 'Dealer resmi Isuzu Euro 4 di Cianjur. Traga, Elf, Giga dengan DP ringan dan cicilan mudah.',
    
    openGraph: {
      title: 'About Us | Isuzu Bahana Cianjur',
      description: 'Dealer resmi Isuzu Euro 4 di Cianjur. Traga, Elf, Giga dengan DP ringan dan cicilan mudah.',
      type: 'website',
      locale: 'id_ID',
      siteName: 'Isuzu Bahana Cianjur',
      images: [
        {
          url: '/og?slug=about',
          width: 1200,
          height: 630,
          alt: 'Isuzu Bahana Cianjur - About'
        }
      ]
    },
    
    twitter: {
      card: 'summary_large_image',
      images: '/og?slug=about'
    }
  }
}
export default function AboutPage() {
  return <About />;
}