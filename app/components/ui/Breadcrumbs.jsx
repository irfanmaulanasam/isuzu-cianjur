"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ segments }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-600 my-4">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;

        return (
          <div key={i} className="flex items-center gap-1">
            <Link
              href={seg.href}
              className={`${isLast ? "font-semibold text-black" : "hover:underline"}`}
            >
              {seg.label}
            </Link>

            {!isLast && <ChevronRight size={14} className="text-gray-400" />}
          </div>
        );
      })}
    </nav>
  );
}