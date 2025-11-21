// app/outlet/page.jsx
import { outlets } from "@/data/outlet";
import OutletClient from "./OutletClient";

export default function OutletPage() {
  return <OutletClient outlets={outlets} />;
}