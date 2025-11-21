import { getAllSpecSlugs } from "./getSpec";

export function autoCompleteSlug(input) {
  if (!input) return null;
  const s = input.toLowerCase();
  const slugs = getAllSpecSlugs();
  // exact
  const exact = slugs.find(x => x.toLowerCase() === s);
  if (exact) return exact;
  // substring match (first)
  const partial = slugs.find(x => x.toLowerCase().includes(s));
  if (partial) return partial;
  // dash/space normalized match
  const norm = s.replace(/\s+/g, "-");
  return slugs.find(x => x.toLowerCase().includes(norm)) || null;
}
