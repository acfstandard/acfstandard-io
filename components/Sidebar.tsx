"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { docsNav } from "@/lib/docs-nav";

export function Sidebar() {
  const locale = useLocale() as "en" | "fr";
  const pathname = usePathname();

  return (
    <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 overflow-y-auto border-r border-white/10 px-5 py-8 md:block">
      <nav className="space-y-7">
        {docsNav.map((group) => (
          <div key={group.title.en}>
            <h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-gold/80">
              {group.title[locale]}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center justify-between rounded px-2 py-1 text-[13.5px] transition ${
                        active
                          ? "bg-gold/10 text-gold"
                          : "text-navy-50/70 hover:bg-white/[0.04] hover:text-navy-50"
                      }`}
                    >
                      <span className="truncate">{item.title[locale]}</span>
                      {item.badge && (
                        <span
                          className={`ml-2 shrink-0 rounded border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider ${
                            active
                              ? "border-gold/40 text-gold/80"
                              : "border-white/15 text-navy-50/50 group-hover:border-gold/30 group-hover:text-gold/70"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
