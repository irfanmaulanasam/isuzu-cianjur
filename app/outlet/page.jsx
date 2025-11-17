// app/outlet/page.jsx
import { outlets } from "@/src/data/outlet";
import OutletClient from "./OutletClient";

export default function OutletPage() {
  return <OutletClient outlets={outlets} />;
}