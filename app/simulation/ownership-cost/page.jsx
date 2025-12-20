import { Suspense } from "react";
import Loading from '@/app/simulation/ownership-cost/Loading'
import TCOContent from "./TCOContent";

export const metadata = {
  title: 'Simulasi Biaya Kepemilikan Aset (TCO) | Isuzu Bahana Cianjur',
  description:
    'Hitung Biaya Kepemilikan Aset (TCO) Isuzu Traga, Elf, dan Giga Euro 4 di Cianjur. Simulasi biaya operasional, konsumsi BBM, dan perawatan untuk usaha Anda.',
  openGraph: {
    title: 'Simulasi TCO Isuzu Euro 4 | Isuzu Bahana Cianjur',
    description:
      'Simulasikan biaya operasional kendaraan Isuzu Traga, Elf, dan Giga Euro 4. Bantu Anda menghitung efisiensi dan TCO untuk usaha logistik dan niaga.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Isuzu Bahana Cianjur',
    images: [
      {
        url: '/og?slug=tco',
        width: 1200,
        height: 630,
        alt: 'Simulasi Biaya Kepemilikan Aset (TCO) Isuzu Bahana Cianjur'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og?slug=tco']
  }
};

export default function TCOCPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TCOContent />
    </Suspense>
  );
}
