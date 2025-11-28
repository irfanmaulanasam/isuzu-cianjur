import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import TCOContent from './TCOContent'

export default function TCOCPage() {
    return(
        <Suspense fallback={<Loading/>}>
            <TCOContent/>
        </Suspense>
    )
}