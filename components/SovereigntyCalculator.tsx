"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { DIMENSIONS, DIMENSION_MAX, SCORING_GUIDE, dependenceIndex, zone } from "@/lib/sovereignty-score";

const BAND_COLORS: Record<string, { text: string; bg: string; border: string; bar: string }> = {
  controlled: { text: "text-gold",       bg: "bg-gold/[0.08]",       border: "border-gold/40",       bar: "bg-gold"       },
  moderate:   { text: "text-yellow-300", bg: "bg-yellow-400/[0.08]", border: "border-yellow-400/40", bar: "bg-yellow-400" },
  critical:   { text: "text-red-300",    bg: "bg-red-400/[0.08]",    border: "border-red-400/40",    bar: "bg-red-400"    },
};

export function SovereigntyCalculator() {
  const locale = useLocale() as "en" | "fr";
  const fr = locale === "fr";
  const [answers, setAnswers] = useState<Record<string, number>>(() =>
    Object.fromEntries(DIMENSIONS.map((d) => [d.id, 0])),
  );

  const index = useMemo(() => dependenceIndex(answers), [answers]);
  const z = useMemo(() => zone(index), [index]);
  const colors = BAND_COLORS[z.band];
  const mostDependent = useMemo(
    () => DIMENSIONS.reduce((a, b) => ((answers[b.id] ?? 0) > (answers[a.id] ?? 0) ? b : a)),
    [answers],
  );

  return (
    <div className="my-8 grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* DIMENSIONS */}
      <div className="space-y-5">
        <div className="rounded-xl border border-bd-neutral bg-navy-700 p-5">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {fr ? "Repère de cotation" : "Scoring guide"}
          </p>
          <p className="text-[13px] leading-relaxed text-gr-2">
            {fr
              ? "Pour chaque dimension, comptez les questions auxquelles vous répondez « oui » :"
              : "For each dimension, count the questions you answer “yes” to:"}
          </p>
          <ul className="mt-2 space-y-1 font-mono text-[12px] text-gr-2">
            {SCORING_GUIDE.map((g) => (
              <li key={g.range}>
                <span className="text-white">{g.range}</span> · {fr ? g.fr : g.en}
              </li>
            ))}
          </ul>
        </div>
        {DIMENSIONS.map((d) => {
          const v = answers[d.id] ?? 0;
          return (
            <div key={d.id} className="rounded-xl border border-bd-neutral bg-navy-700 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <code className="font-mono text-[11px] uppercase tracking-wider text-gold">ACF-01</code>
                  <h3 className="mt-1 font-display text-[16px] font-bold text-white">
                    {fr ? d.labelFr : d.labelEn}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-display text-[28px] font-extrabold text-gold leading-none">{v}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gr">/ {DIMENSION_MAX}</div>
                </div>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-gr-2">
                {fr ? d.definitionFr : d.definitionEn}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-gr-2">
                {(fr ? d.questionsFr : d.questionsEn).map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
              <input
                type="range"
                min={0}
                max={DIMENSION_MAX}
                step={1}
                value={v}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [d.id]: parseInt(e.target.value, 10) }))
                }
                className="mt-4 w-full accent-gold"
                aria-label={fr ? d.labelFr : d.labelEn}
              />
              <p className="mt-2 font-mono text-[11px] text-gr">
                {fr
                  ? "0 = pleinement autonome, 25 = totalement dépendant"
                  : "0 = fully autonomous, 25 = fully dependent"}
              </p>
            </div>
          );
        })}
      </div>

      {/* DEPENDENCE INDEX, sticky on desktop */}
      <div className="lg:sticky lg:top-[88px] lg:self-start">
        <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-8 text-center`}>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {fr ? "Indice de dépendance" : "Dependence index"}
          </p>
          <div className={`mt-4 font-display text-[88px] font-black leading-none ${colors.text}`}>{index}</div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gr-2">/ 100</p>
          <p className={`mt-5 font-display text-[15px] font-bold ${colors.text}`}>
            {fr ? z.label.fr : z.label.en}
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-gr-2">{fr ? z.advice.fr : z.advice.en}</p>
        </div>

        <div className="mt-5 rounded-xl border border-bd-neutral bg-navy-700 p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {fr ? "Décomposition" : "Breakdown"}
          </p>
          <div className="space-y-2.5">
            {DIMENSIONS.map((d) => {
              const v = answers[d.id] ?? 0;
              return (
                <div key={d.id}>
                  <div className="flex items-baseline justify-between gap-2 text-[12px]">
                    <span className="truncate text-gr-2">{fr ? d.labelFr : d.labelEn}</span>
                    <span className="font-mono font-semibold text-white">{v} / {DIMENSION_MAX}</span>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                    <div className={`h-full ${colors.bar} transition-all`} style={{ width: `${(v / DIMENSION_MAX) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          {index > 0 && (
            <p className="mt-4 text-[12px] leading-relaxed text-gr-2">
              {fr
                ? `Dimension la plus dépendante : ${mostDependent.labelFr.toLowerCase()}. C'est là que se joue votre souveraineté.`
                : `Most dependent dimension: ${mostDependent.labelEn.toLowerCase()}. That is where your sovereignty is at stake.`}
            </p>
          )}
        </div>

        <p className="mt-5 font-mono text-[10.5px] leading-relaxed text-gr">
          {fr
            ? "Estimation indicative, calculée dans votre navigateur. La fiche ACF-01 imprimable sert à la consigner et à fixer vos trois priorités d’action."
            : "Indicative estimate, computed in your browser. The printable ACF-01 card is where you record it and set your three action priorities."}
        </p>
      </div>
    </div>
  );
}
