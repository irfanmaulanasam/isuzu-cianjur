// app/credit-simulator/[[...slug]]/page.jsx
import SimulasiKredit from "@/app/simulation/credit-simulator/SimulasiKredit";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";
export default function CreditSimulatorPage() {

  return( 
    <Suspense fallback={<Loading/>}>
      <SimulasiKredit />
    </Suspense>

  )
}