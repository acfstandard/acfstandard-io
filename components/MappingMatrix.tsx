"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { MAPPING, STANDARDS, type Standard } from "@/lib/mapping-matrix";

export function MappingMatrix() {
  const locale = useLocale() as "en" | "fr";
  const [query, setQuery] = useState("");
  const [filterStandards, setFilterStandards] = useState<Set<Standard>>(
    new Set(STANDARDS.map((s) => s.id)),
  );
  const [selected, setSelected] = useState<{ ficheCode: string; standard: Standard } | null>(
    null,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MAPPING.filter((row) => {
      if (!q) return true;
      const hay = `${row.fiche.code} ${row.fiche[locale === "fr" ? "titleFr" : "titleEn"]} ${row.fiche[locale === "fr" ? "summaryFr" : "summaryEn"]} ${Object.values(row.mapping).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, locale]);

  const visibleStandards = STANDARDS.filter((s) => filterStandards.has(s.id));

  const toggleStandard = (id: Standard) => {
    setFilterStandards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="my-8 rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <svg
            className="h-4 w-4 shrink-0 text-navy-50/50"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-3.5-3.5" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === "fr"
                ? "Filtrer par fiche, article, mot-clé…"
                : "Filter by fiche, article, keyword…"
            }
            className="flex-1 bg-transparent text-sm text-white placeholder:text-navy-50/40 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-navy-50/60 hover:border-gold/40 hover:text-gold"
            >
              {locale === "fr" ? "Effacer" : "Clear"}
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {STANDARDS.map((s) => {
            const active = filterStandards.has(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleStandard(s.id)}
                className={`rounded border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition ${
                  active
                    ? "border-gold/40 bg-gold/10 text-gold"
                    : "border-white/15 text-navy-50/50 hover:border-white/30 hover:text-navy-50/80"
                }`}
              >
                {locale === "fr" ? s.labelFr : s.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold/70">
                {locale === "fr" ? "Fiche ACF®" : "ACF® Fiche"}
              </th>
              {visibleStandards.map((s) => (
                <th
                  key={s.id}
                  className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold/70"
                  title={s.full}
                >
                  {locale === "fr" ? s.labelFr : s.labelEn}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleStandards.length + 1}
                  className="px-4 py-12 text-center text-navy-50/50"
                >
                  {locale === "fr" ? "Aucun résultat" : "No results"}
                </td>
              </tr>
            ) : (
              filtered.map((row, idx) => (
                <tr
                  key={row.fiche.code}
                  className={`border-b border-white/[0.06] transition hover:bg-white/[0.02] ${
                    idx % 2 === 1 ? "bg-white/[0.01]" : ""
                  }`}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col">
                      <code className="font-mono text-[12px] font-semibold text-gold">
                        {row.fiche.code}
                      </code>
                      <span className="mt-1 text-[13px] text-white">
                        {locale === "fr" ? row.fiche.titleFr : row.fiche.titleEn}
                      </span>
                      <span className="mt-1 text-[12px] leading-relaxed text-navy-50/60">
                        {locale === "fr" ? row.fiche.summaryFr : row.fiche.summaryEn}
                      </span>
                    </div>
                  </td>
                  {visibleStandards.map((s) => {
                    const ref = row.mapping[s.id];
                    const isSel =
                      selected?.ficheCode === row.fiche.code && selected.standard === s.id;
                    return (
                      <td key={s.id} className="px-3 py-3 align-top">
                        <button
                          type="button"
                          onClick={() =>
                            setSelected(
                              isSel ? null : { ficheCode: row.fiche.code, standard: s.id },
                            )
                          }
                          className={`rounded border px-2 py-1 text-left font-mono text-[12px] transition ${
                            isSel
                              ? "border-gold bg-gold/15 text-gold"
                              : "border-white/15 text-navy-50/80 hover:border-gold/40 hover:text-gold"
                          }`}
                        >
                          {ref}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 font-mono text-[11px] text-navy-50/50">
        <span>
          {filtered.length} / {MAPPING.length} {locale === "fr" ? "fiches" : "fiches"}
        </span>
        <span>
          {visibleStandards.length} / {STANDARDS.length} {locale === "fr" ? "référentiels" : "standards"}
        </span>
      </div>
    </div>
  );
}
