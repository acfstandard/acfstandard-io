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
    titleEn: "P1 · Decision Sovereignty",
    titleFr: "P1 · Souveraineté décisionnelle",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Critical strategic decisions are never delegated to autonomous agents. The organisation keeps ultimate accountability for the decisions its agents take, whatever level of autonomy it delegates to them.",
    blurbFr:
      "Les décisions stratégiques critiques ne sont jamais déléguées à des agents autonomes. L'organisation conserve la responsabilité ultime des décisions prises par ses agents, quel que soit le niveau d'autonomie qu'elle leur délègue.",
  },
  {
    uri: "acf://framework/principle/P2",
    titleEn: "P2 · Governance by Design",
    titleFr: "P2 · Gouvernance par conception",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Governance frameworks are defined before deployment, not after, and their intensity is proportionate to the criticality of the decisions entrusted to the agent.",
    blurbFr:
      "Les cadres de gouvernance sont définis avant le déploiement, pas après ; leur intensité est proportionnée à la criticité des décisions confiées à l'agent.",
  },
  {
    uri: "acf://framework/principle/P3",
    titleEn: "P3 · Ultimate Human Control",
    titleFr: "P3 · Contrôle humain ultime",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Every agentic system must preserve the ability for human intervention: a takeover mechanism that can be activated at any time and is calibrated to criticality.",
    blurbFr:
      "Tout système agentique doit préserver la capacité d'intervention humaine : un dispositif de reprise activable à tout moment et calibré sur la criticité.",
  },
  {
    uri: "acf://framework/principle/P4",
    titleEn: "P4 · Traceable Accountability",
    titleFr: "P4 · Responsabilité traçable",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Every autonomous action must be auditable and attributable: any decision can be reconstructed after the fact by pointing to the doctrine, rules and data that produced it, and to the person who authorised it.",
    blurbFr:
      "Chaque action autonome doit pouvoir être auditée et attribuée : toute décision se reconstitue a posteriori en pointant la doctrine, les règles et les données qui l'ont produite ainsi que le responsable qui l'a autorisée.",
  },
];

const LEVELS: Row[] = [
  {
    uri: "acf://framework/autonomy-level/suggestive",
    titleEn: "Advisory",
    titleFr: "Suggestif",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "For a given decision, the agent suggests and the human decides. The human keeps hold of every executing action.",
    blurbFr:
      "Pour une décision donnée, l'agent suggère et l'humain décide. L'humain garde la main sur chaque action exécutoire.",
  },
  {
    uri: "acf://framework/autonomy-level/co_decision",
    titleEn: "Co-decision",
    titleFr: "Co-décision",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "For a given decision, the agent proposes a reasoned option and the human validates or rejects it. Every executing action goes through human validation, on an already framed option.",
    blurbFr:
      "Pour une décision donnée, l'agent propose une option argumentée et l'humain valide ou rejette. Chaque action exécutoire passe par une validation humaine, sur une option déjà cadrée.",
  },
  {
    uri: "acf://framework/autonomy-level/supervised_autonomous",
    titleEn: "Supervised autonomous",
    titleFr: "Autonome supervisé",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "For a given decision, the agent decides and executes within a bounded perimeter, under supervision. Beyond the thresholds defined in the mandate, it must escalate the decision to a human.",
    blurbFr:
      "Pour une décision donnée, l'agent décide et exécute dans un périmètre borné, sous supervision. Au-delà des seuils définis dans le mandat, il remonte obligatoirement la décision à un humain.",
  },
  {
    uri: "acf://framework/autonomy-level/autonomous",
    titleEn: "Autonomous",
    titleFr: "Autonome",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "For a given decision, the agent decides and executes without prior human validation, within the mandate's perimeter. Human control remains possible after the fact and the stop mechanism remains active.",
    blurbFr:
      "Pour une décision donnée, l'agent décide et exécute sans validation humaine préalable, dans le périmètre du mandat. Le contrôle humain reste possible a posteriori et le dispositif d'arrêt reste actif.",
  },
];

const TOP: Row[] = [
  {
    uri: "acf://whitepaper",
    titleEn: "ACF® White paper",
    titleFr: "Livre blanc ACF®",
    mime: "text/markdown",
    locales: "both",
    blurbEn:
      "The ACF® white paper, same text as the edition published on acfstandard.com.",
    blurbFr:
      "Le livre blanc ACF®, même texte que l'édition publiée sur acfstandard.com.",
  },
  {
    uri: "acf://framework/ddao",
    titleEn: "DDAO · Delegated Decision Agent Officer",
    titleFr: "DDAO · Delegated Decision Agent Officer",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "Definition of the ACF® role that carries accountability for delegated decisions, independent from the team that owns the agent.",
    blurbFr:
      "Définition du rôle ACF® qui porte la responsabilité des décisions déléguées, indépendant de l'équipe propriétaire de l'agent.",
  },
  {
    uri: "acf://deck",
    titleEn: "ACF® Slide deck",
    titleFr: "Deck de présentation ACF®",
    mime: "text/markdown",
    locales: "both",
    blurbEn:
      "Introduction deck of the standard (27 slides), extracted from the version published on acfstandard.com.",
    blurbFr:
      "Deck d'introduction au standard (27 diapositives), extrait de la version publiée sur acfstandard.com.",
  },
];

const MANUAL: Row[] = [
  {
    uri: "acf://manual",
    titleEn: "ACF® Toolkit manual, full",
    titleFr: "Manuel du toolkit ACF®, complet",
    mime: "text/markdown",
    locales: "both",
    blurbEn:
      "The full toolkit manual (331 pages) in one payload. Large: prefer the table of contents and the sections.",
    blurbFr:
      "Le manuel complet du toolkit (331 pages) en un seul envoi. Volumineux : préférez la table des matières et les sections.",
  },
  {
    uri: "acf://manual/toc",
    titleEn: "ACF® Toolkit manual, table of contents",
    titleFr: "Manuel du toolkit ACF®, table des matières",
    mime: "application/json",
    locales: "both",
    blurbEn:
      "The 14 parts of the manual with their titles, page ranges and section URIs.",
    blurbFr:
      "Les 14 parties du manuel avec leurs titres, plages de pages et URI de section.",
  },
  {
    uri: "acf://manual/section/{1..14}",
    titleEn: "ACF® Toolkit manual, one part",
    titleFr: "Manuel du toolkit ACF®, une partie",
    mime: "text/markdown",
    locales: "both",
    blurbEn:
      "One of the 14 parts of the manual. Stable URI, useful to quote a precise passage.",
    blurbFr:
      "Une des 14 parties du manuel. URI stable, utile pour citer un passage précis.",
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
      title={fr ? "Ressources : doctrine" : "Resources: doctrine"}
      description={
        fr
          ? "Le corpus doctrinal : livre blanc, 4 principes, 4 niveaux d’autonomie déléguée, rôle DDAO, glossaire, manuel du toolkit (14 parties) et deck. Le squelette du standard ACF®."
          : "The doctrinal corpus: white paper, 4 principles, 4 delegated autonomy levels, DDAO role, glossary, toolkit manual (14 parts) and deck. The skeleton of the ACF® standard."
      }
      badge={fr ? "Ressources" : "Resources"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les ressources doctrinales sont la racine de tout : les fiches y
            réfèrent, les guides régulateurs y mappent, et les outils REASON les
            invoquent dans leur rationale. Si un point reste flou, vous lisez
            vraisemblablement la mauvaise couche, remontez ici.
          </>
        ) : (
          <>
            Doctrinal resources are the root of everything: the cards reference
            them, the regulator guides map onto them, and REASON tools invoke them
            in their rationale. If something stays unclear, you are likely reading
            the wrong layer, come back here.
          </>
        )}
      </Callout>

      <h2 id="what-this-contains">
        {fr ? "Ce que cette catégorie contient" : "What this contains"}
      </h2>
      <p>
        {fr
          ? "27 ressources : 9 briques structurées en JSON (4 principes, 4 niveaux d’autonomie déléguée, le DDAO), le livre blanc, le deck, et le manuel complet avec sa table des matières et ses 14 parties adressables une à une."
          : "27 resources: 9 structured JSON bricks (4 principles, 4 delegated autonomy levels, the DDAO), the white paper, the deck, and the full manual with its table of contents and its 14 individually addressable parts."}
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
            See also, outil READ{" "}
            <Link href={"/tools/acf.search" as never}>
              <code>acf.search</code>
            </Link>{" "}
            pour rechercher un principe par mot-clé.
          </>
        ) : (
          <>
            See also: READ tool{" "}
            <Link href={"/tools/acf.search" as never}>
              <code>acf.search</code>
            </Link>{" "}
            to search a principle by keyword.
          </>
        )}
      </p>
      <ResourceList rows={PRINCIPLES} fr={fr} />

      <h3 id="autonomy-levels">
        {fr ? "Niveaux d’autonomie déléguée" : "Delegated autonomy levels"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×4</span>
      </h3>
      <p>
        {fr ? (
          <>
            See also, outil REASON{" "}
            <Link href={"/tools/acf.assess-autonomy" as never}>
              <code>acf.assess-autonomy</code>
            </Link>{" "}
            pour qu’un agent recommande un niveau d’autonomie pour une
            décision donnée.
          </>
        ) : (
          <>
            See also: REASON tool{" "}
            <Link href={"/tools/acf.assess-autonomy" as never}>
              <code>acf.assess-autonomy</code>
            </Link>{" "}
            for an agent to recommend an autonomy level for a given decision.
          </>
        )}
      </p>
      <ResourceList rows={LEVELS} fr={fr} />


      <h3 id="manual">
        {fr ? "Manuel pédagogique" : "Pedagogical manual"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">
          {fr ? "× 1 + TOC + 14 sections" : "× 1 + TOC + 14 sections"}
        </span>
      </h3>
      <p>
        {fr
          ? "Le manuel est servi en français et en anglais, extrait des fichiers publiés sur acfstandard.com."
          : "The manual is served in French and English, extracted from the files published on acfstandard.com."}
      </p>
      <ResourceList rows={MANUAL} fr={fr} />

      <h2 id="fetching-this-category">
        {fr ? "Récupérer une ressource doctrinale" : "Fetching a doctrine resource"}
      </h2>
      <p>
        {fr
          ? "Les ressources framework retournent du JSON structuré (champs id, code, title, summary, doctrine, related_fiches). Les ressources narratives retournent du Markdown avec un frontmatter served_locale et is_fallback en tête."
          : "Framework resources return structured JSON (id, code, title, summary, doctrine, related_fiches fields). Narrative resources return Markdown with a served_locale and is_fallback frontmatter at the top."}
      </p>
      <CodeBlock
        language="ts"
        filename="fetch-principle.ts"
        code={`// Read principle P3: Ultimate Human Control
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
//   "related_fiches": ["ACF-07", "ACF-P6", "ACF-P7"]
// }

// Read the whitepaper in French
const wp = await client.readResource({ uri: "acf://whitepaper?lang=fr" });
console.log(wp.contents[0].mimeType); // "text/markdown"
console.log(wp.contents[0].text);     // ---\\nserved_locale: fr\\nis_fallback: false\\n---\\n...`}
      />
    </DocsPage>
  );
}
