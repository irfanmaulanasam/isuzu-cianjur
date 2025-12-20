import ProductsGrid from "./components/ProductGrid"
import { Suspense } from "react"
import Loading from "./Loading"

export const metadata = {
  title: 'Daftar Produk Isuzu | Bahana Isuzu Cianjur',
  description:
    'Lihat daftar lengkap Isuzu Traga, Elf, dan Giga Euro 4 di Bahana Isuzu Cianjur. Cocok untuk usaha logistik dan niaga.',
}

export default function ProductPage() {
    return(
        <Suspense fallback={<Loading/>}>
            <ProductsGrid />
        </Suspense>
    )
}