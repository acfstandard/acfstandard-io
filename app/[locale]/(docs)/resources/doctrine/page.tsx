import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

type Row = {
  uri: string;
  titleEn: string;
  titleFr: string;
  mime: "application/json" | "text/markdown";
  locales: "both" | "en-only" | "fr-only" | "neutral";
  blurbEn: string;
  blurbFr: string;
};

const PRINCIPLES: Row[] = [
  {
    uri: "acf://framework/principle/P1",
    titleEn: "P1 — Decision Sovereignty",
    titleFr: "P1 — Souveraineté décisionnelle",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "The organisation retains ultimate responsibility for every agentic decision, whatever the autonomy level.",
    blurbFr:
      "L’organisation garde la responsabilité ultime de chaque décision agentique, quel que soit le niveau d’autonomie.",
  },
  {
    uri: "acf://framework/principle/P2",
    titleEn: "P2 — Doctrinal Traceability",
    titleFr: "P2 — Traçabilité doctrinale",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Every automated decision must be reconstructible by pointing to the doctrine, rules and data that produced it.",
    blurbFr:
      "Toute décision automatisée doit être reconstituable en pointant la doctrine, les règles et les données qui l’ont produite.",
  },
  {
    uri: "acf://framework/principle/P3",
    titleEn: "P3 — Ultimate Human Control",
    titleFr: "P3 — Contrôle humain ultime",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Every autonomous agent ships with a human-takeover mechanism, activatable at any time and calibrated to criticality.",
    blurbFr:
      "Tout agent autonome embarque un dispositif de reprise humaine activable à tout moment, calibré sur la criticité.",
  },
  {
    uri: "acf://framework/principle/P4",
    titleEn: "P4 — Proportional Governance",
    titleFr: "P4 — Proportionnalité de la gouvernance",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Control intensity is proportional to the agent’s real autonomy and to the criticality of the decisions it takes.",
    blurbFr:
      "L’intensité du contrôle est proportionnelle à l’autonomie réelle de l’agent et à la criticité des décisions qu’il prend.",
  },
];

const LEVELS: Row[] = [
  {
    uri: "acf://framework/autonomy-level/N0",
    titleEn: "N0 — Assistance",
    titleFr: "N0 — Assistance",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "The agent suggests; the human decides systematically. The human is the kill switch.",
    blurbFr:
      "L’agent suggère, l’humain décide systématiquement. L’humain est le kill switch.",
  },
  {
    uri: "acf://framework/autonomy-level/N1",
    titleEn: "N1 — Supervised recommendation",
    titleFr: "N1 — Recommandation supervisée",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "The agent proposes a justified decision. The human validates or rejects on an already-shaped option.",
    blurbFr:
      "L’agent propose une décision argumentée. L’humain valide ou rejette sur une option déjà cadrée.",
  },
  {
    uri: "acf://framework/autonomy-level/N2",
    titleEn: "N2 — Conditional execution",
    titleFr: "N2 — Exécution conditionnelle",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Bounded autonomous execution. Above mandate thresholds, escalation is mandatory.",
    blurbFr:
      "Exécution autonome bornée. Au-delà des seuils du mandat, l’escalade est obligatoire.",
  },
  {
    uri: "acf://framework/autonomy-level/N3",
    titleEn: "N3 — Autonomous execution",
    titleFr: "N3 — Exécution autonome",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Full autonomous execution within mandate; human control remains a posteriori, kill switch stays active.",
    blurbFr:
      "Exécution autonome dans le périmètre du mandat ; le contrôle humain reste a posteriori, le kill switch reste actif.",
  },
];

const DIMENSIONS: Row[] = [
  {
    uri: "acf://framework/dimension/D1",
    titleEn: "D1 — Strategy & governance",
    titleFr: "D1 — Stratégie & gouvernance",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Alignment of agentic AI with business strategy, dedicated governance, executive sponsorship.",
    blurbFr:
      "Alignement de l’IA agentique avec la stratégie d’entreprise, gouvernance dédiée, sponsoring exécutif.",
  },
  {
    uri: "acf://framework/dimension/D2",
    titleEn: "D2 — Doctrine & framework",
    titleFr: "D2 — Doctrine & cadre",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Adoption of a reference framework, published internal doctrine, team training.",
    blurbFr:
      "Adoption d’un cadre de référence, publication d’une doctrine interne, formation des équipes.",
  },
  {
    uri: "acf://framework/dimension/D3",
    titleEn: "D3 — Design & technical control",
    titleFr: "D3 — Conception & contrôle technique",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Secure agent design — mandates, kill switches, observability, foundation-model mastery.",
    blurbFr:
      "Conception sécurisée des agents — mandats, kill switches, observabilité, maîtrise des modèles fondation.",
  },
  {
    uri: "acf://framework/dimension/D4",
    titleEn: "D4 — Accountability & roles",
    titleFr: "D4 — Responsabilités & rôles",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Explicit role definitions (DDAO, DPO, CISO, Compliance, Business) with clear RACI on agentic decisions.",
    blurbFr:
      "Définition explicite des rôles (DDAO, DPO, RSSI, Compliance, Business) avec RACI clair sur les décisions agentiques.",
  },
  {
    uri: "acf://framework/dimension/D5",
    titleEn: "D5 — Regulatory compliance",
    titleFr: "D5 — Conformité réglementaire",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Mastery of AI Act, GDPR, DORA, NIS2, ISO 42001 obligations by sector and jurisdiction.",
    blurbFr:
      "Maîtrise des obligations AI Act, RGPD, DORA, NIS2, ISO 42001 selon le secteur et la juridiction.",
  },
  {
    uri: "acf://framework/dimension/D6",
    titleEn: "D6 — Audit & continuous improvement",
    titleFr: "D6 — Audit & amélioration continue",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Periodic internal audit, incident review, doctrine update cadence.",
    blurbFr:
      "Audit interne périodique, revue d’incidents, cadence de mise à jour de la doctrine.",
  },
];

const TOP: Row[] = [
  {
    uri: "acf://whitepaper",
    titleEn: "ACF® Whitepaper",
    titleFr: "Whitepaper ACF®",
    mime: "text/markdown",
    locales: "both",
    blurbEn:
      "The founding doctrinal document. Served as a single Markdown (V1.0 flat PDF extract; no section anchors).",
    blurbFr:
      "Le document doctrinal fondateur. Servi en Markdown unique (V1.0 extrait PDF plat ; pas d’ancres de section).",
  },
  {
    uri: "acf://framework/ddao",
    titleEn: "DDAO — Delegated Decision Agent Officer",
    titleFr: "DDAO — Delegated Decision Agent Officer",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Canonical definition of the ACF® governance role responsible for autonomous-agent guardianship.",
    blurbFr:
      "Définition canonique du rôle de gouvernance ACF® responsable de la tutelle des agents autonomes.",
  },
  {
    uri: "acf://deck",
    titleEn: "ACF® Slide deck",
    titleFr: "Deck de présentation ACF®",
    mime: "text/markdown",
    locales: "fr-only",
    blurbEn:
      "Presentation deck for the standard — V1.0 ships the French version; English will follow.",
    blurbFr:
      "Deck de présentation du standard — la V1.0 livre la version française ; l’anglaise suivra.",
  },
];

const MANUAL: Row[] = [
  {
    uri: "acf://manual",
    titleEn: "ACF® Manual — full",
    titleFr: "Manuel ACF® — complet",
    mime: "text/markdown",
    locales: "fr-only",
    blurbEn:
      "Full pedagogical manual concatenating all 9 parts. Large payload — prefer the TOC + sections for incremental reads.",
    blurbFr:
      "Manuel pédagogique complet concaténant les 9 parties. Payload volumineux — préférer la TOC + sections pour des lectures incrémentales.",
  },
  {
    uri: "acf://manual/toc",
    titleEn: "ACF® Manual — table of contents",
    titleFr: "Manuel ACF® — table des matières",
    mime: "application/json",
    locales: "fr-only",
    blurbEn:
      "Structured TOC of the manual — 9 parts with titles, page ranges and section URIs.",
    blurbFr:
      "TOC structurée du manuel — 9 parties avec titres, intervalles de pages et URIs de section.",
  },
  {
    uri: "acf://manual/section/{1..9}",
    titleEn: "ACF® Manual — individual section",
    titleFr: "Manuel ACF® — section individuelle",
    mime: "text/markdown",
    locales: "fr-only",
    blurbEn:
      "One of the 9 manual parts. Stable URI; useful for citing a precise passage in an audit reply.",
    blurbFr:
      "Une des 9 parties du manuel. URI stable ; utile pour citer un passage précis dans une réponse d’audit.",
  },
];

function LocaleBadge({ locales, fr }: { locales: Row["locales"]; fr: boolean }) {
  const label =
    locales === "both"
      ? fr
        ? "FR + EN"
        : "FR + EN"
      : locales === "fr-only"
        ? fr
          ? "FR uniquement"
          : "FR only"
        : locales === "en-only"
          ? fr
            ? "EN uniquement"
            : "EN only"
          : fr
            ? "neutre"
            : "neutral";
  return (
    <span className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy-50/65">
      {label}
    </span>
  );
}

function MimeBadge({ mime }: { mime: Row["mime"] }) {
  const isJson = mime === "application/json";
  return (
    <span
      className={`rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
        isJson
          ? "border-blue-400/30 text-blue-300/80"
          : "border-emerald-400/30 text-emerald-300/80"
      }`}
    >
      {isJson ? "JSON" : "Markdown"}
    </span>
  );
}

function ResourceList({ rows, fr }: { rows: Row[]; fr: boolean }) {
  return (
    <div className="not-prose mt-4 space-y-2">
      {rows.map((r) => (
        <div
          key={r.uri}
          className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <code className="font-mono text-[13px] font-semibold text-gold">
              {r.uri}
            </code>
            <MimeBadge mime={r.mime} />
            <LocaleBadge locales={r.locales} fr={fr} />
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
            {fr ? r.titleFr : r.titleEn}
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
            {fr ? r.blurbFr : r.blurbEn}
          </p>
        </div>
      ))}
    </div>
  );
}

export default async function DoctrineResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Ressources — Doctrine" : "Resources — Doctrine"}
      description={
        fr
          ? "Le corpus doctrinal : whitepaper, 4 principes, 4 niveaux d’autonomie, 6 dimensions de maturité, rôle DDAO, manuel pédagogique (9 parties) et deck. Le squelette du standard ACF®."
          : "The doctrinal corpus: whitepaper, 4 principles, 4 autonomy levels, 6 maturity dimensions, DDAO role, pedagogical manual (9 parts) and deck. The skeleton of the ACF® standard."
      }
      badge={fr ? "Ressources" : "Resources"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les ressources doctrinales sont la racine de tout : les fiches y
            réfèrent, les guides régulateurs y mappent, et les outils REASON les
            invoquent dans leur rationale. Si un point reste flou, vous lisez
            vraisemblablement la mauvaise couche — remontez ici.
          </>
        ) : (
          <>
            Doctrinal resources are the root of everything: the cards reference
            them, the regulator guides map onto them, and REASON tools invoke them
            in their rationale. If something stays unclear, you are likely reading
            the wrong layer — come back here.
          </>
        )}
      </Callout>

      <h2 id="what-this-contains">
        {fr ? "Ce que cette catégorie contient" : "What this contains"}
      </h2>
      <p>
        {fr
          ? "Quinze ressources canoniques au total : trois documents narratifs (whitepaper, deck, manuel), quatorze briques structurées (principes, niveaux, dimensions, DDAO). Le manuel se décompose en plus en une table des matières + neuf sections individuellement adressables."
          : "Fifteen canonical resources in total: three narrative documents (whitepaper, deck, manual), fourteen structured bricks (principles, levels, dimensions, DDAO). The manual additionally breaks down into a TOC plus nine individually addressable sections."}
      </p>

      <h2 id="list">
        {fr ? "Liste exhaustive" : "Exhaustive list"}
      </h2>

      <h3 id="top">{fr ? "Documents racines" : "Root documents"}</h3>
      <ResourceList rows={TOP} fr={fr} />

      <h3 id="principles">
        {fr ? "Principes fondateurs" : "Founding principles"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×4</span>
      </h3>
      <p>
        {fr ? (
          <>
            See also — outil READ{" "}
            <Link href={"/tools/acf.search" as never}>
              <code>acf.search</code>
            </Link>{" "}
            pour rechercher un principe par mot-clé.
          </>
        ) : (
          <>
            See also — READ tool{" "}
            <Link href={"/tools/acf.search" as never}>
              <code>acf.search</code>
            </Link>{" "}
            to search a principle by keyword.
          </>
        )}
      </p>
      <ResourceList rows={PRINCIPLES} fr={fr} />

      <h3 id="autonomy-levels">
        {fr ? "Niveaux d’autonomie" : "Autonomy levels"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×4</span>
      </h3>
      <p>
        {fr ? (
          <>
            See also — outil REASON{" "}
            <Link href={"/tools/acf.assess-autonomy" as never}>
              <code>acf.assess-autonomy</code>
            </Link>{" "}
            pour qu’un agent recommande un niveau N0–N3 à partir d’un cas
            d’usage.
          </>
        ) : (
          <>
            See also — REASON tool{" "}
            <Link href={"/tools/acf.assess-autonomy" as never}>
              <code>acf.assess-autonomy</code>
            </Link>{" "}
            for an agent to recommend an N0–N3 level from a use case.
          </>
        )}
      </p>
      <ResourceList rows={LEVELS} fr={fr} />

      <h3 id="dimensions">
        {fr ? "Dimensions de maturité" : "Maturity dimensions"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×6</span>
      </h3>
      <p>
        {fr ? (
          <>
            See also — outil REASON{" "}
            <Link href={"/tools/acf.identify-governance-gaps" as never}>
              <code>acf.identify-governance-gaps</code>
            </Link>{" "}
            pour une analyse de gaps cartographiée sur les six dimensions.
          </>
        ) : (
          <>
            See also — REASON tool{" "}
            <Link href={"/tools/acf.identify-governance-gaps" as never}>
              <code>acf.identify-governance-gaps</code>
            </Link>{" "}
            for a gap analysis mapped onto the six dimensions.
          </>
        )}
      </p>
      <ResourceList rows={DIMENSIONS} fr={fr} />

      <h3 id="manual">
        {fr ? "Manuel pédagogique" : "Pedagogical manual"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">
          {fr ? "× 1 + TOC + 9 sections" : "× 1 + TOC + 9 sections"}
        </span>
      </h3>
      <p>
        {fr
          ? "La V1.0 ne livre que la version française du manuel. Un client réclamant en (Accept-Language: en) reçoit le contenu français avec is_fallback: true."
          : "V1.0 only ships the French manual. A client requesting English (Accept-Language: en) receives the French content with is_fallback: true."}
      </p>
      <ResourceList rows={MANUAL} fr={fr} />

      <h2 id="fetching-this-category">
        {fr ? "Récupérer une ressource doctrinale" : "Fetching a doctrine resource"}
      </h2>
      <p>
        {fr
          ? "Les ressources framework retournent du JSON structuré (champs title, summary, doctrine, related_fiches, related_dimensions). Les ressources narratives retournent du Markdown avec un frontmatter served_locale et is_fallback en tête."
          : "Framework resources return structured JSON (title, summary, doctrine, related_fiches, related_dimensions fields). Narrative resources return Markdown with a served_locale and is_fallback frontmatter at the top."}
      </p>
      <CodeBlock
        language="ts"
        filename="fetch-principle.ts"
        code={`// Read principle P3 — Ultimate Human Control
const { contents } = await client.readResource({
  uri: "acf://framework/principle/P3",
});

const payload = JSON.parse(contents[0].text);
// {
//   "id": "P3",
//   "code": "P3",
//   "title": { "fr": "Contrôle humain ultime", "en": "Ultimate Human Control" },
//   "summary": { "fr": "...", "en": "..." },
//   "doctrine": { "fr": "...", "en": "..." },
//   "related_fiches": ["ACF-07", "ACF-09", "ACF-14"],
//   "related_dimensions": ["D3", "D6"]
// }

// Read the whitepaper in French
const wp = await client.readResource({ uri: "acf://whitepaper" });
console.log(wp.contents[0].mimeType); // "text/markdown"
console.log(wp.contents[0].text);     // ---\\nserved_locale: fr\\nis_fallback: false\\n---\\n...`}
      />
    </DocsPage>
  );
}
