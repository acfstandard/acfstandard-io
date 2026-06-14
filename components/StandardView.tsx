import { MAPPING, type Standard, STANDARDS } from "@/lib/mapping-matrix";

type Locale = "en" | "fr";

const STANDARD_INTROS: Record<
  Standard,
  { en: string; fr: string; refUrl: string }
> = {
  "ai-act": {
    en: "EU AI Act — Regulation (EU) 2024/1689. The first comprehensive horizontal AI regulation in the world. High-risk obligations enforcement begins December 2, 2027 for Annex III systems. Penalties up to €35M or 7% of global turnover.",
    fr: "EU AI Act — Règlement (UE) 2024/1689. Premier régime horizontal exhaustif de l’IA au monde. L’enforcement haut-risque entre en vigueur le 2 décembre 2027 pour les systèmes Annex III. Sanctions jusqu’à 35 M€ ou 7 % du chiffre d’affaires mondial.",
    refUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689",
  },
  "iso-42001": {
    en: "ISO/IEC 42001:2023 — AI management system. The ISO standard for organisations developing, deploying or using AI. Certification-ready; aligns with ISO 9001 / 27001 management system structure.",
    fr: "ISO/IEC 42001:2023 — Système de management de l’IA. Standard ISO pour les organisations qui développent, déploient ou utilisent de l’IA. Certifiable ; aligné sur la structure ISO 9001 / 27001.",
    refUrl: "https://www.iso.org/standard/81230.html",
  },
  "nist-rmf": {
    en: "NIST AI Risk Management Framework 1.0 (2023). Voluntary US framework articulating four functions: GOVERN, MAP, MEASURE, MANAGE. Used as the de facto baseline by many US organisations and increasingly referenced in procurement.",
    fr: "NIST AI Risk Management Framework 1.0 (2023). Cadre américain volontaire articulé en quatre fonctions : GOVERN, MAP, MEASURE, MANAGE. Référence de facto pour beaucoup d’organisations américaines et de plus en plus citée dans les marchés.",
    refUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
  },
  gdpr: {
    en: "GDPR — Regulation (EU) 2016/679. The European data protection regulation. For agentic systems, three articles are pivotal: Art. 22 (automated individual decision-making), Art. 30 (records of processing activities), Art. 35 (DPIA).",
    fr: "RGPD — Règlement (UE) 2016/679. Régime européen de protection des données. Pour les systèmes agentiques, trois articles sont pivots : Art. 22 (décision automatisée individuelle), Art. 30 (registre des activités de traitement), Art. 35 (AIPD).",
    refUrl: "https://eur-lex.europa.eu/eli/reg/2016/679",
  },
  cobit: {
    en: "COBIT 2019 — ISACA framework for the governance and management of enterprise IT. The reference for IT audit shops and internal audit functions. Articulates around domains: Evaluate-Direct-Monitor (EDM), Align-Plan-Organise (APO), Build-Acquire-Implement (BAI), Deliver-Service-Support (DSS), Monitor-Evaluate-Assess (MEA).",
    fr: "COBIT 2019 — Cadre ISACA pour la gouvernance et le management de l’IT d’entreprise. Référence des cabinets d’audit IT et des fonctions d’audit interne. Structuré en domaines : Evaluate-Direct-Monitor (EDM), Align-Plan-Organise (APO), Build-Acquire-Implement (BAI), Deliver-Service-Support (DSS), Monitor-Evaluate-Assess (MEA).",
    refUrl: "https://www.isaca.org/resources/cobit",
  },
};

export function StandardView({
  standard,
  locale,
}: {
  standard: Standard;
  locale: Locale;
}) {
  const meta = STANDARDS.find((s) => s.id === standard);
  const intro = STANDARD_INTROS[standard];
  if (!meta) return null;

  return (
    <>
      <p>
        <a href={intro.refUrl} target="_blank" rel="noopener">
          {meta.full} ↗
        </a>
      </p>
      <p>{intro[locale]}</p>

      <h2 id="acf-mapping">
        {locale === "fr" ? "Correspondance ACF® →" : "ACF® mapping →"} {meta.labelEn}
      </h2>
      <p>
        {locale === "fr"
          ? "Chaque ligne ci-dessous est une fiche méthodologique ACF® et l’article principal du standard qui lui correspond. Le mapping est délibérément conservateur — quand une fiche couvre plusieurs articles, seul l’article principal est cité ici. La vue complète multi-référentiel est sur la matrice."
          : "Each row below is an ACF® methodological card and the principal article of the standard it maps to. The mapping is deliberately conservative — when a card covers several articles, only the principal article is cited here. The full multi-standard view is on the matrix."}
      </p>

      <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold/70">
                {locale === "fr" ? "Fiche" : "Card"}
              </th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold/70">
                {locale === "fr" ? "Titre" : "Title"}
              </th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold/70">
                {meta.labelEn}
              </th>
            </tr>
          </thead>
          <tbody>
            {MAPPING.map((row, idx) => (
              <tr
                key={row.fiche.code}
                className={`border-b border-white/[0.06] ${idx % 2 === 1 ? "bg-white/[0.01]" : ""}`}
              >
                <td className="px-4 py-3 align-top">
                  <code className="font-mono text-[12px] font-semibold text-gold">
                    {row.fiche.code}
                  </code>
                </td>
                <td className="px-4 py-3 align-top text-[13px] text-white">
                  {locale === "fr" ? row.fiche.titleFr : row.fiche.titleEn}
                </td>
                <td className="px-4 py-3 align-top">
                  <code className="font-mono text-[12px] text-navy-50/80">
                    {row.mapping[standard]}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
