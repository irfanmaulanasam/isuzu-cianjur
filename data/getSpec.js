import specs from "@/src/data/specs.json";

export function getSpec(slug) {
  return specs[slug] || null;
}
