'use client'; // 👈 Wajib di Next.js untuk menggunakan hooks seperti useState, useMemo, dan useEffect

import { useState, useMemo, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // 👈 Next.js Navigation
import { specs, allSpecSlugs } from "@/src/data/specs";
import SpecPage from "@/app/components/SpecPage";
import { autoCompleteSlug } from "@/src/data/utils/autoCompleteSlug";


export default function productDetailPage ({ productData }){
    const router = useRouter();
    const pathName = usePathname();
    const slug = pathName.split('/').pop()
    const isDefaultPath = slug === 'spec';
    const [data, setData] = useState(specs[allSpecSlugs[0]])

    useEffect(() => {
        // 1. KONDISI DEFAULT (/spec)
        if (isDefaultPath) {

        }
        
        // 2. KONDISI SLUG ADA: Autocomplete & Redirect
        const actualSlug = autoCompleteSlug(slug);
        
        if (actualSlug && actualSlug !== slug) {
            // Redirect ke URL yang benar
            router.replace(`/spec/${actualSlug}`); 
            return; 
        }
        
        // 3. Load Data Spesifik
        const found = specs[actualSlug];
        if (found) {
            setData(found)
        } else {
            // Fallback: Jika slug valid namun tidak ditemukan
            const fallbackSlug = allSpecSlugs.find(s => s.includes(slug));
            if (fallbackSlug) {
                router.replace(`/spec/${fallbackSlug}`);
            } else {
                setData(specs[fallbackSlug]);
            }
        }
      }, [slug]);

    return (
        <SpecPage data={data} />
    )
}