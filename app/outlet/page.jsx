// app/outlet/page.jsx
import outlet_list from "@/src/data/outlets/outlet_list";
import OutletClient from "./OutletClient";
import { Suspense } from "react";
import Loading from "./Loading";

export async function generateMetadata({ params }) {
  return {
    title: 'Outlet | Isuzu Bahana Cianjur - Dealer Resmi Euro 4',
    description: 'Cari outlet dan bengkel resmi Isuzu Bahana Cianjur terdekat. Layanan penjualan, servis, dan sparepart untuk Traga, Elf, dan Giga Euro 4.',
    openGraph: {
      title: 'Outlet | Isuzu Bahana Cianjur',
      description: 'Cari outlet dan bengkel resmi Isuzu Bahana Cianjur terdekat. Layanan penjualan, servis, dan sparepart untuk Traga, Elf, dan Giga Euro 4.',
      type: 'website',
      locale: 'id_ID',
      siteName: 'Isuzu Bahana Cianjur',
      images: [
        {
          url: '/og?slug=outlet',
          width: 1200,
          height: 630,
          alt: 'Isuzu Bahana Cianjur - About'
        }
      ]
    },
    
    twitter: {
      card: 'summary_large_image',
      images: '/og?slug=outlet'
    }
  }
}
export default function OutletPage() {
  return (
    <Suspense fallback={<Loading />}>
      <OutletClient outlets={outlet_list} />
    </Suspense>
  )
}