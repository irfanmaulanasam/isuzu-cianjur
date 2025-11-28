import "@/app/globals.css"
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GlobalLayer from "./components/global/GlobalLayer";
import { LanguageProvider } from "@/src/context/languageContext";
export const metadata = {
  title: "Isuzu Commercial Vehicle",
  description: 'Dapatkan harga termurah Isuzu Traga, Elf, dan Giga di Cianjur. Hitung simulasi kredit dan download brosur resmi disini Solusi Euro 4, TCO rendah, dan reliable untuk usaha logistik.'
  , keywords: ['Isuzu Cianjur', 'Harga Isuzu Elf', 'Harga NLR', 'Harga NMR', 'Kredit Isuzu Traga', 'Dealer Isuzu Cianjur', 'euro4'],
  openGraph: {
    title: 'Promo Isuzu Cianjur - DP Ringan',
    description: 'Hitung cicilan Isuzu idamanmu sekarang. Resmi dan Terpercaya.',
  },
  icons: {
    icon: [
      {
        url: '/icon.webp', // Mengacu ke file di public/
        type: 'image/webp',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        <LanguageProvider>
        <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
        <GlobalLayer />
      </body>
    </html>
  )
}