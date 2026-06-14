"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { docsNav } from "@/lib/docs-nav";

export function Sidebar() {
  const locale = useLocale() as "en" | "fr";
  const pathname = usePathname();

  return (
    <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-64 shrink-0 overflow-y-auto border-r border-bd px-5 py-10 md:block">
      <nav className="space-y-8">
        {docsNav.map((group) => (
          <div key={group.title.en}>
            <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
              {group.title[locale]}
            </h4>
            <ul className="space-y-px">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center justify-between rounded-md px-2.5 py-1.5 text-[13.5px] transition ${
                        active
                          ? "bg-gold/10 text-gold"
                          : "text-gr-2 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      <span className="truncate">{item.title[locale]}</span>
                      {item.badge && (
                        <span
                          className={`ml-2 shrink-0 rounded border px-1.5 py-px font-mono text-[9px] font-bold uppercase tracking-wider ${
                            active
                              ? "border-gold/40 text-gold/80"
                              : "border-bd-neutral text-gr group-hover:border-bd group-hover:text-gold/80"
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
