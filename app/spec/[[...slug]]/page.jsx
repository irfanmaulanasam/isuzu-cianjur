'use client'; // Wajib di Next.js untuk menggunakan hooks seperti useState, useEffect, dll.

import { useState, useMemo, useEffect } from "react";
// Import hooks dari Next.js Navigation (asumsi Anda menggunakan App Router)
import { usePathname, useRouter } from "next/navigation"; 

// Asumsi import data dan komponen eksternal Anda
import { specs, allSpecSlugs } from "@/src/data/specs";
import SpecPage from "@/app/spec/[[...slug]]/SpecPage";
import { autoCompleteSlug } from "@/src/data/utils/autoCompleteSlug";


export default function ProductDetailPage ({ productData }){
    // Inisialisasi hooks
    const router = useRouter();
    const pathName = usePathname();
    
    // Ambil slug dari path saat ini
    const slug = pathName.split('/').pop()
    const isDefaultPath = slug === 'spec';
    
    // State untuk menyimpan data spesifikasi produk
    const [data, setData] = useState(specs[allSpecSlugs[0]])

    useEffect(() => {
        // 1. KONDISI DEFAULT (/spec)
        if (isDefaultPath) {
            return;
        }
        
        // 2. KONDISI SLUG ADA: Autocomplete & Redirect
        const actualSlug = autoCompleteSlug(slug);
        
        if (actualSlug && actualSlug !== slug) {
            // Redirect ke URL yang benar jika autocomplete menemukan kecocokan yang lebih baik
            console.log(`Redirecting to correct slug: /spec/${actualSlug}`);
            router.replace(`/spec/${actualSlug}`); 
            return; 
        }
        
        // 3. Load Data Spesifik
        const found = specs[actualSlug];
        if (found) {
            return;
        } else {
            // Fallback: Jika slug valid namun tidak ditemukan secara persis
            const fallbackSlug = allSpecSlugs.find(s => s.includes(slug));
            
            if (fallbackSlug) {
                // Ditemukan kecocokan sebagian, lakukan redirect
                console.log(`Found partial match, redirecting to: /spec/${fallbackSlug}`);
                router.replace(`/spec/${fallbackSlug}`);
            } else {
                // Jika tidak ada kecocokan sama sekali, kembali ke data default pertama
                console.error(`Invalid slug '${slug}'. Falling back to default spec.`);
                return;
            }
        }
      
      // FIX: Dependency array harus menyertakan semua variabel yang digunakan dari scope luar
      }, [slug, router, isDefaultPath]);

    return (
        <SpecPage data={data} />
    )
}
// 'use client'; // 👈 Wajib di Next.js untuk menggunakan hooks seperti useState, useMemo, dan useEffect

// import { useState, useMemo, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation"; // 👈 Next.js Navigation
// import { specs, allSpecSlugs } from "@/src/data/specs";
// import SpecPage from "@/app/spec/[[...slug]]/SpecPage";
// import { autoCompleteSlug } from "@/src/data/utils/autoCompleteSlug";


// export default function ProductDetailPage ({ productData }){
//     const router = useRouter();
//     const pathName = usePathname();
//     const slug = pathName.split('/').pop()
//     const isDefaultPath = slug === 'spec';
//     const [data, setData] = useState(specs[allSpecSlugs[0]])

//     useEffect(() => {
//         // 1. KONDISI DEFAULT (/spec)
//         if (isDefaultPath) {

//         }
        
//         // 2. KONDISI SLUG ADA: Autocomplete & Redirect
//         const actualSlug = autoCompleteSlug(slug);
        
//         if (actualSlug && actualSlug !== slug) {
//             // Redirect ke URL yang benar
//             router.replace(`/spec/${actualSlug}`); 
//             return; 
//         }
        
//         // 3. Load Data Spesifik
//         const found = specs[actualSlug];
//         if (found) {
//             setData(found)
//         } else {
//             // Fallback: Jika slug valid namun tidak ditemukan
//             const fallbackSlug = allSpecSlugs.find(s => s.includes(slug));
//             if (fallbackSlug) {
//                 router.replace(`/spec/${fallbackSlug}`);
//             } else {
//                 console.error(`Invalid slug '${slug}' and no partial match found. Falling back to default.`);
//         setData(specs[allSpecSlugs[0]]);
//             }
//         }
//       }, [slug]);

//     return (
//         <SpecPage data={data} />
//     )
// }