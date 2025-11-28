'use client';

import { useState, useEffect, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import { specs, allSpecSlugs } from "@/src/data/products/specs";
import SpecPage from "@/app/products/components/SpecPage";
import { autoCompleteSlug } from "@/src/data/config/autoCompleteTCOSlug";

export default function ProductDetailPage({ params }) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;

    // Hitung data secara synchronous dengan useMemo
    const { data, shouldRedirect } = useMemo(() => {
        const actualSlug = autoCompleteSlug(slug);
        const foundData = specs[actualSlug || slug];

        // Cek apakah perlu redirect
        if (actualSlug && actualSlug !== slug) {
            return { shouldRedirect: `/products/${actualSlug}`, data: null };
        }

        if (!foundData) {
            const fallbackSlug = allSpecSlugs.find(s => s.includes(slug));
            if (fallbackSlug) {
                return { shouldRedirect: `/products/${fallbackSlug}`, data: null };
            }
        }

        return { 
            shouldRedirect: null, 
            data: foundData || specs[allSpecSlugs[0]] 
        };
    }, [slug]);

    // Handle redirect di useEffect terpisah
    useEffect(() => {
        if (shouldRedirect) {
            console.log(`Redirecting to: ${shouldRedirect}`);
            router.replace(shouldRedirect);
        }
    }, [shouldRedirect, router]);

    if (shouldRedirect) {
        return <div>Redirecting...</div>;
    }

    return <SpecPage data={data} />;
}