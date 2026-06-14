"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

type Labels = {
  github: string;
  docs: string;
  tools: string;
  signatures: string;
  whitepaper: string;
};

export function Topbar({ labels }: { labels: Labels }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded border border-gold/40 bg-gold/10 font-display text-sm font-bold text-gold">
              ACF
            </div>
            <span className="font-display text-base font-semibold tracking-wide text-white">
              acfstandard.io
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link
              href="/docs/introduction"
              className={`hover:text-gold ${pathname.startsWith("/docs") ? "text-gold" : "text-navy-50/80"}`}
            >
              {labels.docs}
            </Link>
            <Link
              href="/tools"
              className={`hover:text-gold ${pathname.startsWith("/tools") ? "text-gold" : "text-navy-50/80"}`}
            >
              {labels.tools}
            </Link>
            <Link
              href="/signatures"
              className={`hover:text-gold ${pathname.startsWith("/signatures") ? "text-gold" : "text-navy-50/80"}`}
            >
              {labels.signatures}
            </Link>
            <Link
              href="/whitepaper"
              className={`hover:text-gold ${pathname.startsWith("/whitepaper") ? "text-gold" : "text-navy-50/80"}`}
            >
              {labels.whitepaper}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/acfstandard/acf-mcp"
            target="_blank"
            rel="noopener"
            className="hidden text-sm text-navy-50/80 hover:text-gold md:inline"
          >
            {labels.github} ↗
          </a>
          <Link
            href={pathname}
            locale={locale === "en" ? "fr" : "en"}
            className="rounded border border-white/20 px-2 py-1 font-mono text-xs uppercase tracking-wider text-navy-50/80 hover:border-gold hover:text-gold"
          >
            {locale === "en" ? "FR" : "EN"}
          </Link>
        </div>
      </div>
    </header>
  );
}
