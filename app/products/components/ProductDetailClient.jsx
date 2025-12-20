'use client'

import { use, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { specs, allSpecSlugs } from "@/src/data/products/specs";
import SpecPage from "@/app/products/components/SpecPage";
import { autoCompleteSlug } from "@/src/data/config/autoCompleteTCOSlug";
import { useLanguage } from "@/src/context/languageContext";

export default function ProductDetailClient({ params }) {
  const { language } = useLanguage();
  const router = useRouter();
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const { data, shouldRedirect } = useMemo(() => {
    const actualSlug = autoCompleteSlug(slug);
    const foundData = specs[actualSlug || slug];

    if (actualSlug && actualSlug !== slug) {
      return { shouldRedirect: `/products/${actualSlug}`, data: null };
    }

    if (!foundData) {
      const fallbackSlug = allSpecSlugs.find((s) => s.includes(slug));
      if (fallbackSlug) {
        return { shouldRedirect: `/products/${fallbackSlug}`, data: null };
      }
    }

    return {
      shouldRedirect: null,
      data: foundData || specs[allSpecSlugs[0]],
    };
  }, [slug]);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(shouldRedirect);
    }
  }, [shouldRedirect, router]);

  if (shouldRedirect) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      <SpecPage data={{ data, language }} />
    </div>
  );
}