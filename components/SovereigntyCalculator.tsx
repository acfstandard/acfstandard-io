"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { DIMENSIONS, composite, bucket } from "@/lib/sovereignty-score";

const BAND_COLORS: Record<string, { text: string; bg: string; border: string; bar: string }> = {
  critical:   { text: "text-red-300",     bg: "bg-red-400/[0.08]",    border: "border-red-400/40",    bar: "bg-red-400"     },
  weak:       { text: "text-orange-300",  bg: "bg-orange-400/[0.08]", border: "border-orange-400/40", bar: "bg-orange-400"  },
  fragile:    { text: "text-yellow-300",  bg: "bg-yellow-400/[0.08]", border: "border-yellow-400/40", bar: "bg-yellow-400"  },
  controlled: { text: "text-emerald-300", bg: "bg-emerald-400/[0.08]",border: "border-emerald-400/40",bar: "bg-emerald-400" },
  sovereign:  { text: "text-gold",        bg: "bg-gold/[0.08]",       border: "border-gold/40",       bar: "bg-gold"        },
};

export function SovereigntyCalculator() {
  const locale = useLocale() as "en" | "fr";
  const [answers, setAnswers] = useState<Record<string, number>>(() =>
    Object.fromEntries(DIMENSIONS.map((d) => [d.id, 50])),
  );

  const score = useMemo(() => composite(answers), [answers]);
  const buck = useMemo(() => bucket(score), [score]);
  const colors = BAND_COLORS[buck.band];

  const breakdown = useMemo(
    () =>
      DIMENSIONS.map((d) => ({
        ...d,
        value: answers[d.id] ?? 0,
        contribution: Math.round(d.weight * (answers[d.id] ?? 0)),
      })),
    [answers],
  );

  return (
    <div className="my-8 grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* DIMENSIONS */}
      <div className="space-y-5">
        {DIMENSIONS.map((d) => {
          const v = answers[d.id] ?? 0;
          return (
            <div key={d.id} className="rounded-xl border border-bd-neutral bg-navy-700 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <code className="font-mono text-[11px] uppercase tracking-wider text-gold">
                      {d.ficheRef}
                    </code>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gr">
                      {(d.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-[16px] font-bold text-white">
                    {locale === "fr" ? d.labelFr : d.labelEn}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-display text-[28px] font-extrabold text-gold leading-none">
                    {v}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gr">
                    / 100
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-gr-2">
                {locale === "fr" ? d.questionFr : d.questionEn}
              </p>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={v}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [d.id]: parseInt(e.target.value, 10) }))
                }
                className="mt-4 w-full accent-gold"
              />
              <p className="mt-2 font-mono text-[11px] text-gr">
                {locale === "fr" ? d.hintFr : d.hintEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* COMPOSITE SCORE — sticky on desktop */}
      <div className="lg:sticky lg:top-[88px] lg:self-start">
        <div
          className={`rounded-2xl border ${colors.border} ${colors.bg} p-8 text-center`}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {locale === "fr" ? "Sovereignty Score™" : "Sovereignty Score™"}
          </p>
          <div className={`mt-4 font-display text-[88px] font-black leading-none ${colors.text}`}>
            {score}
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gr-2">
            / 100
          </p>
          <p className={`mt-5 font-display text-[15px] font-bold ${colors.text}`}>
            {locale === "fr" ? buck.label.fr : buck.label.en}
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-bd-neutral bg-navy-700 p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {locale === "fr" ? "Décomposition" : "Breakdown"}
          </p>
          <div className="space-y-2.5">
            {breakdown.map((b) => (
              <div key={b.id}>
                <div className="flex items-baseline justify-between gap-2 text-[12px]">
                  <span className="truncate text-gr-2">
                    {locale === "fr" ? b.labelFr : b.labelEn}
                  </span>
                  <span className="font-mono font-semibold text-white">
                    +{b.contribution}
                  </span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full ${colors.bar} transition-all`}
                    style={{ width: `${b.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 font-mono text-[10.5px] leading-relaxed text-gr">
          {locale === "fr"
            ? "Cet outil produit une estimation indicative. Pour un score opposable signé par le DDAO et inscrit au registre, utilisez l’outil acf.identify-governance-gaps du serveur MCP."
            : "This tool produces an indicative estimate. For an opposable score signed by the DDAO and recorded in the register, use the acf.identify-governance-gaps tool from the MCP server."}
        </p>
      </div>
    </div>
  );
}
