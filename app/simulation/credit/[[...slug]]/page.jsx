import SimulasiKredit from "@/app/simulation/credit/SimulasiKredit";
import Loading from "@/app/simulation/credit/Loading";
import { Suspense } from "react";

export const metadata = {
  title: 'Simulasi Kredit Isuzu | Bahana Isuzu Cianjur',
  description:
    'Hitung simulasi kredit Isuzu Traga, Elf, dan Giga Euro 4 di Bahana Isuzu Cianjur. Atur uang muka, tenor, dan bunga flat untuk melihat cicilan per bulan.',
  openGraph: {
    title: 'Simulasi Kredit Mobil Isuzu | Bahana Isuzu Cianjur',
    description:
      'Simulasikan cicilan kredit untuk Isuzu Traga, Elf, dan Giga Euro 4. Bandingkan cicilan custom dengan leasing rekanan resmi Bahana Isuzu Cianjur.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Isuzu Bahana Cianjur',
    images: [
      {
        url: '/og?slug=simulasi-kredit',
        width: 1200,
        height: 630,
        alt: 'Simulasi Kredit Mobil Isuzu Bahana Cianjur'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og?slug=simulasi-kredit']
  }
};

export default function CreditSimulatorPage() {
  return( 
    <Suspense fallback={<Loading/>}>
      <SimulasiKredit />
    </Suspense>

  )
}