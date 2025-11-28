// app/outlet/page.jsx
import outlet_list from "@/src/data/outlet/outlet_list";
import OutletClient from "./OutletClient";
import { Suspense } from "react";
import Loading from "../components/Loading";

export default function OutletPage() {

  return (
    <Suspense fallback={<Loading />}>
      <OutletClient outlets={outlet_list} />
    </Suspense>
  )
}