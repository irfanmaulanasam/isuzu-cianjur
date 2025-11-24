import { specs } from "./specs";

export function getProductTitle() {
  return Object.values(specs).map(p => p.title);
}
