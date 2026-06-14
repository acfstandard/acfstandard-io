"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { findAdjacent } from "@/lib/docs-nav";

export function PrevNext() {
  const locale = useLocale() as "en" | "fr";
  const pathname = usePathname();
  const { prev, next } = findAdjacent(pathname);

  if (!prev && !next) return null;

  const labels = {
    en: { prev: "Previous", next: "Next" },
    fr: { prev: "Précédent", next: "Suivant" },
  };

  return (
    <nav className="mt-16 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col rounded-lg border border-white/10 bg-white/[0.02] p-5 hover:border-gold/30"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
            ← {labels[locale].prev}
          </span>
          <span className="mt-2 font-display text-base font-semibold text-white group-hover:text-gold">
            {prev.title[locale]}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col rounded-lg border border-white/10 bg-white/[0.02] p-5 text-right hover:border-gold/30 md:text-right"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
            {labels[locale].next} →
          </span>
          <span className="mt-2 font-display text-base font-semibold text-white group-hover:text-gold">
            {next.title[locale]}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
