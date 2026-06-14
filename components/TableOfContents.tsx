"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type Heading = { id: string; text: string; level: number };

export function TableOfContents() {
  const locale = useLocale() as "en" | "fr";
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const collected: Heading[] = Array.from(
      document.querySelectorAll("main h2[id], main h3[id]"),
    ).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: Number(el.tagName.slice(1)),
    }));
    setHeadings(collected);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveId(e.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%" },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-[80px] hidden h-fit w-56 shrink-0 self-start lg:block">
      <div className="border-l border-white/10 pl-5">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-gold/80">
          {locale === "fr" ? "Sur cette page" : "On this page"}
        </p>
        <ul className="space-y-1.5 text-[12.5px]">
          {headings.map((h) => (
            <li
              key={h.id}
              style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
            >
              <a
                href={`#${h.id}`}
                className={`block transition ${
                  activeId === h.id
                    ? "text-gold"
                    : "text-navy-50/60 hover:text-navy-50"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
