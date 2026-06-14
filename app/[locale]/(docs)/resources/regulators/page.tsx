import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

type Article = { id: string; titleEn: string; titleFr: string };
type Guide = {
  slug: "ai-act" | "gdpr" | "dora" | "nis2" | "iso-42001";
  labelEn: string;
  labelFr: string;
  scopeEn: string;
  scopeFr: string;
  applicableEn: string;
  applicableFr: string;
  articles: Article[];
};

const GUIDES: Guide[] = [
  {
    slug: "ai-act",
    labelEn: "AI Act — Regulation (EU) 2024/1689",
    labelFr: "AI Act — Règlement (UE) 2024/1689",
    scopeEn:
      "Providers and deployers of AI systems placed on the EU market, with reinforced obligations for high-risk systems.",
    scopeFr:
      "Fournisseurs et déployeurs de systèmes d’IA mis sur le marché de l’UE, obligations renforcées pour les systèmes haut risque.",
    applicableEn:
      "High-risk obligations apply from 2 December 2027 (Digital Omnibus deferral).",
    applicableFr:
      "Obligations haut risque applicables au 2 décembre 2027 (report Digital Omnibus).",
    articles: [
      {
        id: "9",
        titleEn: "Risk management system (high-risk AI)",
        titleFr: "Système de gestion des risques (IA haut risque)",
      },
      {
        id: "10",
        titleEn: "Data and data governance (high-risk AI)",
        titleFr: "Données et gouvernance des données (IA haut risque)",
      },
      {
        id: "12",
        titleEn: "Record-keeping (logging)",
        titleFr: "Enregistrement (journalisation)",
      },
      {
        id: "13",
        titleEn: "Transparency and information to deployers",
        titleFr: "Transparence et information des déployeurs",
      },
      {
        id: "14",
        titleEn: "Human oversight (high-risk AI)",
        titleFr: "Contrôle humain (IA haut risque)",
      },
    ],
  },
  {
    slug: "gdpr",
    labelEn: "GDPR — Regulation (EU) 2016/679",
    labelFr: "RGPD — Règlement (UE) 2016/679",
    scopeEn: "Any processing of personal data of EU data subjects.",
    scopeFr:
      "Tout traitement de données personnelles de personnes concernées dans l’UE.",
    applicableEn: "In force since 25 May 2018.",
    applicableFr: "En vigueur depuis le 25 mai 2018.",
    articles: [
      {
        id: "5",
        titleEn: "Principles relating to processing",
        titleFr: "Principes relatifs au traitement",
      },
      {
        id: "22",
        titleEn: "Automated individual decision-making",
        titleFr: "Décision individuelle automatisée",
      },
      {
        id: "25",
        titleEn: "Data protection by design and by default",
        titleFr: "Protection des données dès la conception et par défaut",
      },
      {
        id: "30",
        titleEn: "Records of processing activities",
        titleFr: "Registre des activités de traitement",
      },
      {
        id: "35",
        titleEn: "Data protection impact assessment (DPIA)",
        titleFr: "Analyse d’impact (AIPD/DPIA)",
      },
    ],
  },
  {
    slug: "dora",
    labelEn: "DORA — Regulation (EU) 2022/2554",
    labelFr: "DORA — Règlement (UE) 2022/2554",
    scopeEn:
      "EU financial entities — banks, insurers, investment firms, crypto-asset service providers, critical ICT third parties.",
    scopeFr:
      "Entités financières de l’UE — banques, assureurs, sociétés d’investissement, prestataires crypto-actifs, tiers TIC critiques.",
    applicableEn: "Applicable since 17 January 2025.",
    applicableFr: "Applicable depuis le 17 janvier 2025.",
    articles: [
      {
        id: "5",
        titleEn: "Governance and organisation (ICT risk management)",
        titleFr: "Gouvernance et organisation (cadre de gestion du risque TIC)",
      },
      {
        id: "6",
        titleEn: "ICT risk management framework",
        titleFr: "Cadre de gestion du risque TIC",
      },
      {
        id: "11",
        titleEn: "Response and recovery (ICT business continuity)",
        titleFr: "Réponse et rétablissement (continuité TIC)",
      },
      {
        id: "17",
        titleEn: "ICT-related incident management process",
        titleFr: "Processus de gestion des incidents TIC",
      },
      {
        id: "28",
        titleEn: "Third-party ICT risk management",
        titleFr: "Gestion du risque tiers TIC",
      },
    ],
  },
  {
    slug: "nis2",
    labelEn: "NIS2 — Directive (EU) 2022/2555",
    labelFr: "NIS2 — Directive (UE) 2022/2555",
    scopeEn:
      "Essential and important entities across 18 sectors — transposed into national law (deadline 17 October 2024).",
    scopeFr:
      "Entités essentielles et importantes sur 18 secteurs — transposée en droit national (échéance 17 octobre 2024).",
    applicableEn:
      "Applicable as transposed by member state legislation.",
    applicableFr:
      "Applicable selon la transposition de chaque État membre.",
    articles: [
      {
        id: "20",
        titleEn: "Governance — management bodies' responsibility",
        titleFr: "Gouvernance — responsabilité des organes de direction",
      },
      {
        id: "21",
        titleEn: "Cybersecurity risk-management measures",
        titleFr: "Mesures de gestion des risques de cybersécurité",
      },
      {
        id: "23",
        titleEn: "Incident reporting obligations",
        titleFr: "Obligations de notification d’incidents",
      },
    ],
  },
  {
    slug: "iso-42001",
    labelEn: "ISO/IEC 42001:2023 — AI management system (AIMS)",
    labelFr: "ISO/IEC 42001:2023 — Système de management de l’IA (SMIA)",
    scopeEn:
      "Voluntary management-system standard — certifiable, suited to organisations claiming a mature AI governance posture.",
    scopeFr:
      "Norme de système de management volontaire — certifiable, adaptée aux organisations affichant une gouvernance IA mature.",
    applicableEn:
      "Voluntary; usable as a baseline AI Act demonstrability scheme.",
    applicableFr:
      "Volontaire ; utilisable comme schéma de démontrabilité pour l’AI Act.",
    articles: [
      {
        id: "6",
        titleEn: "Planning — risks, opportunities, AI impact assessment",
        titleFr: "Planification — risques, opportunités, évaluation d’impact IA",
      },
      {
        id: "8",
        titleEn: "Operation (operational controls)",
        titleFr: "Fonctionnement (maîtrise opérationnelle)",
      },
      {
        id: "9",
        titleEn: "Performance evaluation",
        titleFr: "Évaluation des performances",
      },
      {
        id: "A",
        titleEn: "Annex A — reference controls",
        titleFr: "Annexe A — mesures de référence",
      },
    ],
  },
];

export default async function RegulatorsResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Ressources — Guides régulateurs" : "Resources — Regulator guides"}
      description={
        fr
          ? "Cinq guides opérationnels — AI Act, RGPD, DORA, NIS2, ISO 42001 — qui traduisent le texte régulateur en obligations agentiques cartographiées sur les principes, dimensions et fiches ACF®. Vingt-deux articles individuellement adressables via l’outil acf.regulation.article."
          : "Five operational guides — AI Act, GDPR, DORA, NIS2, ISO 42001 — that translate regulator text into agentic obligations mapped onto ACF® principles, dimensions and cards. Twenty-two individually addressable articles through the acf.regulation.article tool."
      }
      badge={fr ? "Ressources" : "Resources"}
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les guides ACF® <strong>ne sont pas un conseil juridique</strong>. Le
            champ <code>text</code> de chaque article est un résumé fidèle — pas
            une reproduction littérale. Le champ <code>mapping</code> /{" "}
            <code>operational_note</code> est de la doctrine ACF®, pas une lecture
            officielle d’un régulateur. Toute qualification produite par les
            outils REASON est marquée <code>requires_human_review: true</code>.
          </>
        ) : (
          <>
            ACF® guides are <strong>not legal advice</strong>. Each article’s{" "}
            <code>text</code> field is a faithful summary — not the verbatim legal
            text. The <code>mapping</code> / <code>operational_note</code> fields
            are ACF® doctrine, not an official regulator reading. Any
            qualification produced by REASON tools ships marked{" "}
            <code>requires_human_review: true</code>.
          </>
        )}
      </Callout>

      <h2 id="what-this-contains">
        {fr ? "Ce que cette catégorie contient" : "What this contains"}
      </h2>
      <p>
        {fr
          ? "Cinq ressources guide au niveau régulateur (URIs acf://guide/{slug}) servies en Markdown bilingue. À l’intérieur de chaque guide, vingt-deux articles individuels sont indexés et accessibles par l’outil READ acf.regulation.article. Chaque article expose son texte résumé, sa source officielle, sa date d’applicabilité, et un mapping vers les principes / dimensions / fiches ACF®."
          : "Five regulator-level guide resources (URIs acf://guide/{slug}) served as bilingual Markdown. Inside each guide, twenty-two individual articles are indexed and accessed through the acf.regulation.article READ tool. Each article exposes its summary text, its official source, its applicable date, and a mapping onto ACF® principles / dimensions / cards."}
      </p>
      <p>
        {fr ? (
          <>
            See also — outils READ{" "}
            <Link href={"/tools/acf.regulation.article" as never}>
              <code>acf.regulation.article</code>
            </Link>{" "}
            (un article précis) et REASON{" "}
            <Link href={"/tools/acf.map-ai-act-obligations" as never}>
              <code>acf.map-ai-act-obligations</code>
            </Link>{" "}
            (obligations exhaustives pour un système qualifié haut risque).
          </>
        ) : (
          <>
            See also — READ tool{" "}
            <Link href={"/tools/acf.regulation.article" as never}>
              <code>acf.regulation.article</code>
            </Link>{" "}
            (one specific article) and REASON tool{" "}
            <Link href={"/tools/acf.map-ai-act-obligations" as never}>
              <code>acf.map-ai-act-obligations</code>
            </Link>{" "}
            (exhaustive obligations for a qualified high-risk system).
          </>
        )}
      </p>

      <h2 id="list">
        {fr ? "Liste exhaustive" : "Exhaustive list"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">
          {fr ? "5 guides · 22 articles" : "5 guides · 22 articles"}
        </span>
      </h2>

      {GUIDES.map((g) => (
        <section key={g.slug}>
          <h3 id={g.slug}>{fr ? g.labelFr : g.labelEn}</h3>
          <div className="not-prose mb-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <code className="font-mono text-[13px] font-semibold text-gold">
                acf://guide/{g.slug}
              </code>
              <span className="rounded border border-emerald-400/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300/80">
                Markdown
              </span>
              <span className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy-50/65">
                FR + EN
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-navy-50/75">
              <strong className="text-navy-50/90">
                {fr ? "Périmètre — " : "Scope — "}
              </strong>
              {fr ? g.scopeFr : g.scopeEn}
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
              <strong className="text-navy-50/90">
                {fr ? "Applicabilité — " : "Applicability — "}
              </strong>
              {fr ? g.applicableFr : g.applicableEn}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
              {fr ? "Articles indexés" : "Indexed articles"} ·{" "}
              {g.articles.length}
            </p>
            <ul className="mt-2 space-y-1 text-[14px] text-navy-50/75">
              {g.articles.map((a) => (
                <li key={a.id} className="flex flex-wrap gap-2">
                  <code className="font-mono text-[12px] text-gold/85">
                    {g.slug}/{a.id}
                  </code>
                  <span>—</span>
                  <span>{fr ? a.titleFr : a.titleEn}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <h2 id="fetching-this-category">
        {fr ? "Récupérer un guide régulateur" : "Fetching a regulator guide"}
      </h2>
      <p>
        {fr
          ? "La ressource guide donne la lecture opérationnelle complète au niveau du régulateur. Pour cibler un article précis avec son mapping, préférer l’outil acf.regulation.article qui renvoie le texte résumé, la source officielle, la date d’applicabilité, et le mapping ACF® dans une seule réponse signée."
          : "The guide resource gives the full operational reading at the regulator level. To target a precise article with its mapping, prefer the acf.regulation.article tool which returns the summary text, official source, applicable date, and ACF® mapping in a single signed response."}
      </p>
      <CodeBlock
        language="ts"
        filename="fetch-regulator.ts"
        code={`// Read the full AI Act operational guide
const guide = await client.readResource({
  uri: "acf://guide/ai-act",
});
console.log(guide.contents[0].mimeType); // "text/markdown"

// Cited an article precisely — use the READ tool instead
const article = await client.callTool({
  name: "acf.regulation.article",
  arguments: { regulation: "ai-act", article: "14" },
});
// Returns:
// {
//   title: "Human oversight (high-risk AI)",
//   text: "High-risk AI systems shall be designed so they can be effectively...",
//   source: "Regulation (EU) 2024/1689, Article 14",
//   applicable_date: "2027-12-02",
//   mapping: {
//     principles: ["P3"],
//     dimensions: ["D3", "D4"],
//     fiches: ["ACF-07", "ACF-09", "ACF-14"],
//     operational_note: "ACF operationalises Art. 14 via P3 (ultimate human control)..."
//   },
//   requires_human_review: true,
//   doctrine_signature: "ed25519:..."
// }`}
      />
    </DocsPage>
  );
}
