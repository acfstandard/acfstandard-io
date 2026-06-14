"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { docsNav } from "@/lib/docs-nav";

export function Breadcrumbs() {
  const locale = useLocale() as "en" | "fr";
  const pathname = usePathname();

  for (const group of docsNav) {
    const item = group.items.find((i) => i.href === pathname);
    if (item) {
      return (
        <nav
          aria-label="Breadcrumbs"
          className="mb-6 flex items-center gap-2 font-mono text-xs text-navy-50/50"
        >
          <Link href="/" className="hover:text-gold">
            acfstandard.io
          </Link>
          <span>/</span>
          <span>{group.title[locale]}</span>
          <span>/</span>
          <span className="text-navy-50">{item.title[locale]}</span>
        </nav>
      );
    }
  }
  return null;
}
