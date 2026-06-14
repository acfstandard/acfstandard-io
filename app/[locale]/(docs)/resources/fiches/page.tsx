import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

type Fiche = {
  code: string;
  titleEn: string;
  titleFr: string;
  blurbEn: string;
  blurbFr: string;
};

const FICHES: Fiche[] = [
  {
    code: "ACF-00",
    titleEn: "Introduction to ACF®",
    titleFr: "Introduction à l’ACF®",
    blurbEn:
      "Standard overview, founding principles, autonomy levels, dimensions and the DDAO role on a single page.",
    blurbFr:
      "Tour d’horizon du standard, principes fondateurs, niveaux d’autonomie, dimensions et rôle DDAO sur une page.",
  },
  {
    code: "ACF-01",
    titleEn: "Autonomy Mapping",
    titleFr: "Cartographie de l’autonomie",
    blurbEn:
      "Methodology for placing an existing or planned agent on the N0–N3 scale and documenting the rationale.",
    blurbFr:
      "Méthodologie pour positionner un agent existant ou prévu sur l’échelle N0–N3 et documenter le raisonnement.",
  },
  {
    code: "ACF-02",
    titleEn: "Criticality Matrix",
    titleFr: "Matrice de criticité",
    blurbEn:
      "How to score an agent on a (dimension × business impact) matrix to calibrate controls proportionally.",
    blurbFr:
      "Comment scorer un agent sur une matrice (dimension × impact business) pour calibrer les contrôles proportionnellement.",
  },
  {
    code: "ACF-03",
    titleEn: "Agentic Constitution",
    titleFr: "Constitution agentique",
    blurbEn:
      "Template for a written constitution that bounds an agent — purposes, forbidden domains, escalation triggers.",
    blurbFr:
      "Gabarit de constitution écrite qui borne un agent — finalités, domaines interdits, déclencheurs d’escalade.",
  },
  {
    code: "ACF-04",
    titleEn: "Agent Card",
    titleFr: "Fiche Agent",
    blurbEn:
      "Standard documentation card for an agent in production: identity, model, mandate, DDAO, criticality, controls.",
    blurbFr:
      "Fiche de documentation standard d’un agent en production : identité, modèle, mandat, DDAO, criticité, contrôles.",
  },
  {
    code: "ACF-05",
    titleEn: "Decision Register",
    titleFr: "Registre des décisions",
    blurbEn:
      "Time-stamped, hash-chained record of every agentic decision — the operational expression of P2.",
    blurbFr:
      "Registre horodaté et chaîné par hash de chaque décision agentique — expression opérationnelle de P2.",
  },
  {
    code: "ACF-06",
    titleEn: "Ecosystem Constitution",
    titleFr: "Constitution de l’écosystème",
    blurbEn:
      "Cross-agent rules of the road when several agents share data, tools or a mandate scope.",
    blurbFr:
      "Règles transverses quand plusieurs agents partagent données, outils ou périmètre de mandat.",
  },
  {
    code: "ACF-07",
    titleEn: "Kill Switch & human takeover",
    titleFr: "Kill Switch & reprise humaine",
    blurbEn:
      "How to design, document and test a kill switch — the direct AI Act Article 14 operationalisation.",
    blurbFr:
      "Comment concevoir, documenter et tester un kill switch — opérationnalisation directe de l’art. 14 AI Act.",
  },
  {
    code: "ACF-08",
    titleEn: "Agentic Observability",
    titleFr: "Observabilité agentique",
    blurbEn:
      "End-to-end observability requirements: traces, metrics, drift signals, replayable inputs.",
    blurbFr:
      "Exigences d’observabilité bout en bout : traces, métriques, signaux de dérive, inputs rejouables.",
  },
  {
    code: "ACF-09",
    titleEn: "Escalation Thresholds",
    titleFr: "Seuils d’escalade",
    blurbEn:
      "Numeric and qualitative thresholds that force escalation to a human — calibrated by criticality.",
    blurbFr:
      "Seuils numériques et qualitatifs qui forcent une escalade humaine — calibrés sur la criticité.",
  },
  {
    code: "ACF-10",
    titleEn: "Agent Lifecycle",
    titleFr: "Cycle de vie d’un agent",
    blurbEn:
      "Phased lifecycle (design, pre-flight, go-live, run, decommission) with controls per phase.",
    blurbFr:
      "Cycle de vie en phases (conception, pré-vol, go-live, run, décommissionnement) avec contrôles par phase.",
  },
  {
    code: "ACF-11",
    titleEn: "Risk Assessment",
    titleFr: "Évaluation des risques",
    blurbEn:
      "Agentic-specific risk assessment template — feeds the DPIA, the AI Act Art. 9 risk system and the ISO 42001 clause 6.",
    blurbFr:
      "Gabarit d’évaluation des risques spécifique agentique — alimente l’AIPD, le système de risque art. 9 AI Act et la clause 6 ISO 42001.",
  },
  {
    code: "ACF-12",
    titleEn: "Agent Mandate",
    titleFr: "Mandat d’Agent",
    blurbEn:
      "Written mandate that defines an agent’s perimeter, thresholds, DDAO and review cadence — mandatory above N1.",
    blurbFr:
      "Mandat écrit qui définit périmètre, seuils, DDAO et cadence de revue d’un agent — obligatoire au-delà de N1.",
  },
  {
    code: "ACF-13",
    titleEn: "Retention Policy",
    titleFr: "Politique de conservation",
    blurbEn:
      "Retention rules for decision logs, inputs, outputs and rationale, aligned with legal retention periods.",
    blurbFr:
      "Règles de conservation des logs de décision, inputs, outputs et rationale, alignées avec les durées légales.",
  },
  {
    code: "ACF-14",
    titleEn: "Human-takeover Drill",
    titleFr: "Drill de reprise humaine",
    blurbEn:
      "Drill protocol for kill switch tests — frequency by criticality, scoring grid, post-drill remediation.",
    blurbFr:
      "Protocole de drill pour les tests de kill switch — fréquence par criticité, grille de notation, remédiation post-drill.",
  },
  {
    code: "ACF-15",
    titleEn: "Controls Calibration",
    titleFr: "Calibration des contrôles",
    blurbEn:
      "Annual recalibration of controls against P4 — verifies controls still match real autonomy and risk.",
    blurbFr:
      "Recalibration annuelle des contrôles selon P4 — vérifie que les contrôles correspondent toujours à l’autonomie et au risque réels.",
  },
  {
    code: "ACF-16",
    titleEn: "Doctrine Update",
    titleFr: "Mise à jour de la doctrine",
    blurbEn:
      "Process for updating the doctrine — versioning, hash refresh, archive URL bump, downstream notification.",
    blurbFr:
      "Processus de mise à jour de la doctrine — versioning, rafraîchissement du hash, bump de l’URL d’archive, notification downstream.",
  },
];

export default async function FichesResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Ressources — Fiches méthodologiques" : "Resources — Methodological cards"}
      description={
        fr
          ? "Les 17 fiches canoniques ACF® (ACF-00 à ACF-16) — la colonne vertébrale opérationnelle du standard. Chaque fiche est servie en Markdown bilingue avec frontmatter structuré (code, titre, dimension, principes liés, articles liés, fiches liées, mots-clés)."
          : "The 17 canonical ACF® cards (ACF-00 to ACF-16) — the operational backbone of the standard. Each card is served as bilingual Markdown with a structured frontmatter (code, title, dimension, related principles, related articles, related cards, keywords)."
      }
      badge={fr ? "Ressources" : "Resources"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Une fiche n’est pas un document marketing — c’est une recette
            opérationnelle. Si une fiche ne se traduit pas en action concrète chez
            vous d’ici quinze jours, vous lisez probablement la mauvaise fiche.
            Utilisez l’outil REASON{" "}
            <Link href={"/tools/acf.advisor" as never}>
              <code>acf.advisor</code>
            </Link>{" "}
            pour qu’un agent choisisse pour vous.
          </>
        ) : (
          <>
            A card is not a marketing document — it is an operational recipe. If a
            card does not translate into concrete action within fifteen days at
            your shop, you are probably reading the wrong one. Use the REASON tool{" "}
            <Link href={"/tools/acf.advisor" as never}>
              <code>acf.advisor</code>
            </Link>{" "}
            so an agent picks for you.
          </>
        )}
      </Callout>

      <h2 id="what-this-contains">
        {fr ? "Ce que cette catégorie contient" : "What this contains"}
      </h2>
      <p>
        {fr
          ? "Dix-sept ressources, une par fiche, URI acf://fiche/ACF-XX. Le contenu est servi en Markdown (text/markdown). Les deux langues sont disponibles pour les dix-sept fiches en V1.0 — le client choisit via Accept-Language."
          : "Seventeen resources, one per card, URI acf://fiche/ACF-XX. The content is served as Markdown (text/markdown). Both locales ship for all seventeen cards in V1.0 — the client picks via Accept-Language."}
      </p>
      <p>
        {fr ? (
          <>
            See also — outil READ{" "}
            <Link href={"/tools/acf.fiche.lookup" as never}>
              <code>acf.fiche.lookup</code>
            </Link>{" "}
            pour un accès enrichi (résolution par mot-clé, fiches liées, exemple).
          </>
        ) : (
          <>
            See also — READ tool{" "}
            <Link href={"/tools/acf.fiche.lookup" as never}>
              <code>acf.fiche.lookup</code>
            </Link>{" "}
            for enriched access (keyword resolution, related cards, example).
          </>
        )}
      </p>

      <h2 id="list">
        {fr ? "Liste exhaustive" : "Exhaustive list"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×17</span>
      </h2>
      <div className="not-prose mt-4 space-y-2">
        {FICHES.map((f) => (
          <div
            key={f.code}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <code className="font-mono text-[13px] font-semibold text-gold">
                acf://fiche/{f.code}
              </code>
              <span className="rounded border border-emerald-400/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300/80">
                Markdown
              </span>
              <span className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy-50/65">
                FR + EN
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
              {f.code} — {fr ? f.titleFr : f.titleEn}
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
              {fr ? f.blurbFr : f.blurbEn}
            </p>
          </div>
        ))}
      </div>

      <h2 id="frontmatter">
        {fr ? "Structure du frontmatter" : "Frontmatter structure"}
      </h2>
      <p>
        {fr
          ? "Chaque fiche démarre par un bloc YAML qui donne le code, le slug, le titre dans la langue servie, le titre canonique anglais, la dimension de maturité associée, et les références croisées (principes, articles régulateurs, fiches liées)."
          : "Each card starts with a YAML block giving the code, the slug, the title in the served locale, the canonical English title, the associated maturity dimension, and the cross-references (principles, regulator articles, related cards)."}
      </p>
      <CodeBlock
        language="md"
        filename="acf-07.fr.md (excerpt)"
        code={`---
code: "ACF-07"
slug: "kill-switch"
title: "Kill Switch & reprise humaine"
title_en: "Kill Switch & human takeover"
order: 7
maturity_dimension: "D3"
related_principles: ["P3"]
related_articles: ["ai-act/14", "iso-42001/8"]
related_fiches: ["ACF-09", "ACF-14"]
keywords: ["kill switch", "reprise humaine", "AI Act 14"]
version: "1.0"
pdf_url: "/toolkit/ACF-07_kill-switch.pdf"
---

# Kill Switch & reprise humaine
…`}
      />

      <h2 id="fetching-this-category">
        {fr ? "Récupérer une fiche" : "Fetching a card"}
      </h2>
      <p>
        {fr
          ? "Un appel resources/read sur l’URI de la fiche. La langue effectivement servie est exposée dans un en-tête served_locale ajouté en tête de la réponse — c’est ce qui permet à un client de détecter un fallback si une langue n’existe pas pour une fiche donnée (situation qui ne se produit pas en V1.0 mais que le protocole prévoit pour les locales futures es, de, pt, etc.)."
          : "A resources/read call against the card URI. The actually-served locale is exposed in a served_locale header prepended to the response — that is how a client detects a fallback if a locale does not exist for a given card (which does not happen in V1.0 but is provisioned for future locales es, de, pt, etc.)."}
      </p>
      <CodeBlock
        language="ts"
        filename="fetch-fiche.ts"
        code={`// Read ACF-12 — Agent Mandate, in French
const { contents } = await client.readResource({
  uri: "acf://fiche/ACF-12",
});

console.log(contents[0].mimeType); // "text/markdown"
console.log(contents[0].text);
// ---
// served_locale: fr
// is_fallback: false
// ---
// ---
// code: "ACF-12"
// title: "Mandat d'Agent"
// ...
// ---
// # Mandat d'Agent
// ...

// Force English locale via env var (the client picks)
const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "acf-mcp@latest"],
  env: { ACF_MCP_LOCALE: "en" },
});`}
      />
    </DocsPage>
  );
}
