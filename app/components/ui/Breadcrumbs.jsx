"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();             // contoh: "/products/mobil/avanza"
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    
    // Label: ubah-segment-jadi-kapital
    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return { label, href };
  });

  return (
    <nav className="text-sm flex gap-2 py-3" aria-label="Breadcrumb">
      <Link href="/" className="text-blue-600 hover:underline">Home</Link>
      {breadcrumbs.map((item, idx) => (
        <span key={idx} className="flex gap-2">
          <span>{'>'}</span>
          <Link href={item.href} className="text-blue-600 hover:underline">
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

// "use client";

// import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// export default function Breadcrumbs({ segments }) {
//   return (
//     <nav className="flex items-center gap-1 text-sm text-gray-600 my-4">
//       {segments.map((seg, i) => {
//         const isLast = i === segments.length - 1;

//         return (
//           <div key={i} className="flex items-center gap-1">
//             <Link
//               href={seg.href}
//               className={`${isLast ? "font-semibold text-black" : "hover:underline"}`}
//             >
//               {seg.label}
//             </Link>

//             {!isLast && <ChevronRight size={14} className="text-gray-400" />}
//           </div>
//         );
//       })}
//     </nav>
//   );
// }