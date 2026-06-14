"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { docsNav } from "@/lib/docs-nav";
import Fuse from "fuse.js";

type SearchItem = {
  href: string;
  title: string;
  section: string;
  badge?: string;
};

export function SearchModal() {
  const router = useRouter();
  const locale = useLocale() as "en" | "fr";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: SearchItem[] = useMemo(() => {
    return docsNav.flatMap((group) =>
      group.items.map((item) => ({
        href: item.href,
        title: item.title[locale],
        section: group.title[locale],
        badge: item.badge,
      })),
    );
  }, [locale]);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 2 },
          { name: "section", weight: 1 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 1,
      }),
    [items],
  );

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 12);
    return fuse
      .search(query)
      .slice(0, 14)
      .map((r) => r.item);
  }, [query, fuse, items]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const r of results) {
      const arr = map.get(r.section) ?? [];
      arr.push(r);
      map.set(r.section, arr);
    }
    return Array.from(map.entries());
  }, [results]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        close();
      } else if (open && e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (open && e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (open && e.key === "Enter") {
        e.preventDefault();
        const item = results[activeIndex];
        if (item) navigate(item.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, navigate, close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  let cursor = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/15 bg-navy shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <svg
            className="h-4 w-4 text-navy-50/50"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === "fr"
                ? "Rechercher la doc, les outils, les ressources…"
                : "Search docs, tools, resources…"
            }
            className="flex-1 bg-transparent text-[15px] text-white placeholder:text-navy-50/40 focus:outline-none"
          />
          <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px] text-navy-50/60">
            ESC
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-3 py-3">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-navy-50/50">
              {locale === "fr" ? "Aucun résultat" : "No results"}
            </div>
          ) : (
            grouped.map(([section, items]) => (
              <div key={section} className="mb-3 last:mb-0">
                <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-gold/70">
                  {section}
                </p>
                <ul className="space-y-px">
                  {items.map((item) => {
                    cursor++;
                    const isActive = cursor === activeIndex;
                    return (
                      <li key={item.href}>
                        <button
                          type="button"
                          onClick={() => navigate(item.href)}
                          onMouseEnter={() => setActiveIndex(cursor)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[14px] transition ${
                            isActive
                              ? "bg-gold/10 text-gold"
                              : "text-navy-50/80 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                          <span className="flex shrink-0 items-center gap-2">
                            {item.badge && (
                              <span className="rounded border border-white/15 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-navy-50/60">
                                {item.badge}
                              </span>
                            )}
                            {isActive && (
                              <span className="font-mono text-[10px] text-gold/60">↵</span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-5 py-2.5 font-mono text-[10px] text-navy-50/50">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="rounded border border-white/15 px-1 py-px">↑↓</kbd>{" "}
              {locale === "fr" ? "naviguer" : "navigate"}
            </span>
            <span>
              <kbd className="rounded border border-white/15 px-1 py-px">↵</kbd>{" "}
              {locale === "fr" ? "ouvrir" : "open"}
            </span>
            <span>
              <kbd className="rounded border border-white/15 px-1 py-px">esc</kbd>{" "}
              {locale === "fr" ? "fermer" : "close"}
            </span>
          </div>
          <span>acfstandard.io</span>
        </div>
      </div>
    </div>
  );
}

export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as "en" | "fr";
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-navy-50/60 transition hover:border-gold/30 hover:text-navy-50"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="9" r="6" />
          <path d="m17 17-3.5-3.5" />
        </svg>
        <span className="hidden sm:inline">
          {locale === "fr" ? "Rechercher…" : "Search…"}
        </span>
        <kbd className="ml-2 hidden rounded border border-white/15 bg-white/5 px-1.5 py-px font-mono text-[10px] text-navy-50/60 sm:inline">
          {isMac ? "⌘K" : "Ctrl+K"}
        </kbd>
      </button>
      {open && <SearchModalControlled onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchModalControlled({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const locale = useLocale() as "en" | "fr";
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: SearchItem[] = useMemo(
    () =>
      docsNav.flatMap((group) =>
        group.items.map((item) => ({
          href: item.href,
          title: item.title[locale],
          section: group.title[locale],
          badge: item.badge,
        })),
      ),
    [locale],
  );

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 2 },
          { name: "section", weight: 1 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 1,
      }),
    [items],
  );

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 12);
    return fuse
      .search(query)
      .slice(0, 14)
      .map((r) => r.item);
  }, [query, fuse, items]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const r of results) {
      const arr = map.get(r.section) ?? [];
      arr.push(r);
      map.set(r.section, arr);
    }
    return Array.from(map.entries());
  }, [results]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = results[activeIndex];
        if (item) {
          onClose();
          router.push(item.href);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, results, activeIndex, router]);

  let cursor = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/15 bg-navy shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <svg
            className="h-4 w-4 text-navy-50/50"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === "fr"
                ? "Rechercher la doc, les outils, les ressources…"
                : "Search docs, tools, resources…"
            }
            className="flex-1 bg-transparent text-[15px] text-white placeholder:text-navy-50/40 focus:outline-none"
          />
          <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px] text-navy-50/60">
            ESC
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-3 py-3">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-navy-50/50">
              {locale === "fr" ? "Aucun résultat" : "No results"}
            </div>
          ) : (
            grouped.map(([section, items]) => (
              <div key={section} className="mb-3 last:mb-0">
                <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-gold/70">
                  {section}
                </p>
                <ul className="space-y-px">
                  {items.map((item) => {
                    cursor++;
                    const isActive = cursor === activeIndex;
                    return (
                      <li key={item.href}>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            router.push(item.href);
                          }}
                          onMouseEnter={() => setActiveIndex(cursor)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[14px] transition ${
                            isActive
                              ? "bg-gold/10 text-gold"
                              : "text-navy-50/80 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                          <span className="flex shrink-0 items-center gap-2">
                            {item.badge && (
                              <span className="rounded border border-white/15 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-navy-50/60">
                                {item.badge}
                              </span>
                            )}
                            {isActive && (
                              <span className="font-mono text-[10px] text-gold/60">↵</span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-5 py-2.5 font-mono text-[10px] text-navy-50/50">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="rounded border border-white/15 px-1 py-px">↑↓</kbd>{" "}
              {locale === "fr" ? "naviguer" : "navigate"}
            </span>
            <span>
              <kbd className="rounded border border-white/15 px-1 py-px">↵</kbd>{" "}
              {locale === "fr" ? "ouvrir" : "open"}
            </span>
            <span>
              <kbd className="rounded border border-white/15 px-1 py-px">esc</kbd>{" "}
              {locale === "fr" ? "fermer" : "close"}
            </span>
          </div>
          <span>acfstandard.io</span>
        </div>
      </div>
    </div>
  );
}
