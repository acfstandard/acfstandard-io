"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { SearchTrigger } from "./SearchModal";

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
    <header className="sticky top-0 z-40 h-[72px] border-b border-bd bg-navy-900/[0.92] backdrop-blur-nav">
      <div className="mx-auto flex h-full max-w-page items-center px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[7px] bg-gold font-display text-[13px] font-extrabold leading-none text-navy-900">
            ACF
          </div>
          <div className="leading-tight">
            <div className="font-display text-[14px] font-bold leading-tight text-white">
              acfstandard.io
            </div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-gold">
              Developer docs
            </div>
          </div>
        </Link>

        {/* Center nav */}
        <nav className="ml-10 hidden gap-7 text-[13px] font-medium md:flex">
          <Link
            href="/docs/introduction"
            className={`transition hover:text-gold ${pathname.startsWith("/docs") ? "text-gold" : "text-gr-2"}`}
          >
            {labels.docs}
          </Link>
          <Link
            href="/tools"
            className={`transition hover:text-gold ${pathname.startsWith("/tools") ? "text-gold" : "text-gr-2"}`}
          >
            {labels.tools}
          </Link>
          <Link
            href="/mappings"
            className={`transition hover:text-gold ${pathname.startsWith("/mappings") ? "text-gold" : "text-gr-2"}`}
          >
            {locale === "fr" ? "Correspondances" : "Mappings"}
          </Link>
          <Link
            href="/signatures"
            className={`transition hover:text-gold ${pathname.startsWith("/signatures") ? "text-gold" : "text-gr-2"}`}
          >
            {labels.signatures}
          </Link>
          <Link
            href="/whitepaper"
            className={`transition hover:text-gold ${pathname.startsWith("/whitepaper") ? "text-gold" : "text-gr-2"}`}
          >
            {labels.whitepaper}
          </Link>
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3">
          <SearchTrigger />
          <a
            href="https://github.com/acfstandard/acf-mcp"
            target="_blank"
            rel="noopener"
            className="hidden rounded-md border border-bd-neutral px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-gr-2 transition hover:border-bd hover:text-gold md:inline-flex"
          >
            GitHub
          </a>
          <Link
            href={pathname}
            locale={locale === "en" ? "fr" : "en"}
            className="rounded-md border border-bd-neutral px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-gr-2 transition hover:border-bd hover:text-gold"
          >
            {locale === "en" ? "FR" : "EN"}
          </Link>
        </div>
      </div>
    </header>
  );
}
