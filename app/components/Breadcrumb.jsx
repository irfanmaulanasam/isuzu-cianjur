'use client';

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useLanguage } from "@/src/context/languageContext";
import enNav from "@/src/data/navbar/en.json";
import idNav from "@/src/data/navbar/id.json";
import productsSummary from "@/src/data/products/products_summary.json";
import { findBreadcrumbTrail } from "@/src/utils/findBreadcrumbTrail";
import { ChevronRight } from "lucide-react";
function getProductNameFromSlug(slug) {
  const found = productsSummary.find((p) => p.slug === slug);
  return found?.name ?? slug.replace(/-/g, " ");
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const { language } = useLanguage();
  const navbarData = language === "id" ? idNav : enNav;
  // console.log(navbarData.navbar.menu[0]);
  
  let trail = findBreadcrumbTrail(navbarData, pathname);

  // leaf untuk halaman produk detail
  if (pathname.startsWith("/products/") && params?.slug) {
    const productLabel = getProductNameFromSlug(
      decodeURIComponent(params.slug)
    );
    trail = [
      ...trail,
      {
        title: productLabel,
        path: pathname,
      },
    ];
  }

  // Leaf untuk halaman berita (news article)
  if (pathname.startsWith("/news/article/") && params?.slug || pathname.startsWith("/news/promo/") && params?.slug || pathname.startsWith("/news/event/") && params?.slug) {
    const raw = decodeURIComponent(params.slug);
    const newsLabel = raw.replace(/-/g, " "); // optional biar lebih rapi

    trail = [
      ...trail,
      {
        title: newsLabel.length > 30 ? newsLabel.substring(0, 30) + "..." : newsLabel,
        path: pathname,
      },
    ];
  }

  if (!trail || trail.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] text-slate-500 dark:text-slate-400 mb-1"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && <span className="text-slate-400">
                <ChevronRight className="text-red-400 text-xs"/>
                </span>}

              {isLast ? (
                <span className="font-semibold text-slate-700 dark:text-slate-100">
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-bahana-primary dark:hover:text-bahana-light"
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}