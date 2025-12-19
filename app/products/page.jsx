import ProductsGrid from "./components/ProductGrid"
import { Suspense } from "react"
import Loading from "../components/Loading"

export default function ProductPage() {
    return(
        <Suspense fallback={<Loading/>}>
            <ProductsGrid />
        </Suspense>
    )
}