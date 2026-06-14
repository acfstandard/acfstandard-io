import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

type Tool = {
  name: string;
  badge: "REASON" | "READ";
  kindEn: string;
  kindFr: string;
  blurbEn: string;
  blurbFr: string;
};

const TOOLS: Tool[] = [
  {
    name: "acf.advisor",
    badge: "REASON",
    kindEn: "Governance assessment",
    kindFr: "Évaluation de gouvernance",
    blurbEn: "Turn a free-text use case into a structured ACF® assessment: principles, autonomy, fiches, obligations, first actions.",
    blurbFr: "Transforme un cas d’usage en évaluation ACF® structurée : principes, autonomie, fiches, obligations, premières actions.",
  },
  {
    name: "acf.classify-agent",
    badge: "REASON",
    kindEn: "Pre-go-live qualification",
    kindFr: "Qualification avant go-live",
    blurbEn: "Ten qualified-enum fields → one structured pre-flight: autonomy level, criticality, AI Act role, controls, sign-offs.",
    blurbFr: "Dix champs énumérés → un go-live structuré : niveau d’autonomie, criticité, rôle AI Act, contrôles, sign-offs.",
  },
  {
    name: "acf.assess-autonomy",
    badge: "REASON",
    kindEn: "Autonomy level",
    kindFr: "Niveau d’autonomie",
    blurbEn: "Should the agent propose, decide, or execute? Get the N0–N3 recommendation with go/no-go, gating, and kill switch design.",
    blurbFr: "Propose, décide ou exécute ? Recommandation N0–N3 avec go/no-go, gating, et design du kill switch.",
  },
  {
    name: "acf.identify-governance-gaps",
    badge: "REASON",
    kindEn: "Gap analysis",
    kindFr: "Analyse de gaps",
    blurbEn: "What does ACF® say you should have that you don't? Gap analysis across 6 maturity dimensions, prioritised remediations.",
    blurbFr: "Ce qu’ACF® dit que vous devriez avoir et que vous n’avez pas. Analyse 6 dimensions, remédiations priorisées.",
  },
  {
    name: "acf.map-ai-act-obligations",
    badge: "REASON",
    kindEn: "AI Act mapping",
    kindFr: "Obligations AI Act",
    blurbEn: "Exhaustive AI Act obligations for a qualified-high-risk system, ventilated by lifecycle phase with deadlines.",
    blurbFr: "Obligations AI Act exhaustives pour un système haut risque, ventilées par phase du cycle de vie avec délais.",
  },
  {
    name: "acf.assign-ddao-controls",
    badge: "REASON",
    kindEn: "DDAO controls",
    kindFr: "Contrôles DDAO",
    blurbEn: "Concrete DDAO controls scoped to the agent’s autonomy and risk: kill switches, escalation, audit trails, ownership.",
    blurbFr: "Contrôles DDAO scopés au niveau d’autonomie et au risque : kill switches, escalade, traces d’audit, ownership.",
  },
  {
    name: "acf.evaluate-agent-mandate",
    badge: "REASON",
    kindEn: "Mandate audit",
    kindFr: "Audit de mandat",
    blurbEn: "Audit an existing agent mandate against the ACF® reference: strengths, gaps, required additions for sign-off.",
    blurbFr: "Audit d’un mandat d’agent existant : forces, manques, ajouts requis pour la signature.",
  },
  {
    name: "acf.search",
    badge: "READ",
    kindEn: "Corpus search",
    kindFr: "Recherche corpus",
    blurbEn: "Search the full ACF® corpus and rank resources by relevance to the question at hand.",
    blurbFr: "Cherche dans tout le corpus ACF® et classe les ressources par pertinence vs la question posée.",
  },
  {
    name: "acf.fiche.lookup",
    badge: "READ",
    kindEn: "Fiche lookup",
    kindFr: "Lookup de fiche",
    blurbEn: "Retrieve the canonical ACF® methodological card for a specific governance question, with example and related cards.",
    blurbFr: "Retrouve la fiche méthodologique ACF® canonique pour une question donnée, avec exemple et fiches liées.",
  },
  {
    name: "acf.regulation.article",
    badge: "READ",
    kindEn: "Regulator article",
    kindFr: "Article régulateur",
    blurbEn: "Verified article text (AI Act, GDPR, DORA, NIS2, ISO 42001) + its operational translation into ACF® principles and fiches.",
    blurbFr: "Texte d’article vérifié (AI Act, RGPD, DORA, NIS2, ISO 42001) + traduction opérationnelle en principes et fiches ACF®.",
  },
  {
    name: "acf.glossary.define",
    badge: "READ",
    kindEn: "Term definition",
    kindFr: "Définition de terme",
    blurbEn: "Canonical ACF® definitions: DDAO, Decision Sovereignty, autonomy transitions, kill switch, and the rest of the doctrine.",
    blurbFr: "Définitions ACF® canoniques : DDAO, Souveraineté Décisionnelle, transitions d’autonomie, kill switch, le reste de la doctrine.",
  },
  {
    name: "acf.cite",
    badge: "READ",
    kindEn: "Citation",
    kindFr: "Citation",
    blurbEn: "Properly formatted citation of ACF® in APA, MLA, Chicago, ISO 690 or BibTeX style for theses, filings, board memos.",
    blurbFr: "Citation ACF® correctement formatée en APA, MLA, Chicago, ISO 690 ou BibTeX pour thèses, dépôts, notes au CA.",
  },
];

export default async function ToolsOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  const reason = TOOLS.filter((t) => t.badge === "REASON");
  const read = TOOLS.filter((t) => t.badge === "READ");

  return (
    <DocsPage
      title={fr ? "Référence des outils" : "Tools reference"}
      description={
        fr
          ? "Le serveur acf-mcp expose douze outils MCP — sept REASON (raisonnement déterministe signé sur la doctrine) et cinq READ (lecture des ressources du corpus). Aucun outil n’appelle de LLM en interne ; chaque sortie embarque doctrine_signature, doctrine_hash, doctrine_version et generated_at."
          : "The acf-mcp server exposes twelve MCP tools — seven REASON (deterministic reasoning signed against the doctrine) and five READ (corpus resource lookup). No tool calls an internal LLM; every output embeds doctrine_signature, doctrine_hash, doctrine_version and generated_at."
      }
      badge={fr ? "Outils MCP" : "MCP tools"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Tous les outils sont <strong>déterministes</strong>. Lancez le même appel deux
            fois avec la même <code>doctrine_version</code> et vous obtenez exactement la
            même sortie (au timestamp près). C’est ce qui rend chaque réponse vérifiable
            offline avec la clé publique Ed25519 d’ACF®.
          </>
        ) : (
          <>
            Every tool is <strong>deterministic</strong>. Run the same call twice against
            the same <code>doctrine_version</code> and you get exactly the same output
            (modulo the timestamp). That is what makes every reply verifiable offline
            against the ACF® Ed25519 public key.
          </>
        )}
      </Callout>

      <h2 id="reason-tools">
        {fr ? "Outils REASON" : "REASON tools"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×7</span>
      </h2>
      <p>
        {fr
          ? "Chaque outil REASON produit une qualification structurée à partir d’une entrée déclarée. La sortie est signée et explicitement positionnée comme préliminaire — requires_human_review: true est constant."
          : "Each REASON tool produces a structured qualification from a declared input. The output is signed and explicitly positioned as preliminary — requires_human_review: true is always set."}
      </p>
      <div className="not-prose mt-4 grid gap-3 md:grid-cols-2">
        {reason.map((t) => (
          <Link
            key={t.name}
            href={`/tools/${t.name}` as never}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-gold/30"
          >
            <div className="flex items-center justify-between">
              <code className="font-mono text-sm font-semibold text-gold">{t.name}</code>
              <span className="rounded border border-gold/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold/80">
                REASON
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
              {fr ? t.kindFr : t.kindEn}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-navy-50/75">
              {fr ? t.blurbFr : t.blurbEn}
            </p>
          </Link>
        ))}
      </div>

      <h2 id="read-tools">
        {fr ? "Outils READ" : "READ tools"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×5</span>
      </h2>
      <p>
        {fr
          ? "Les outils READ donnent un accès direct au corpus ACF® : fiches méthodologiques, articles régulateurs, glossaire. Idéaux pour qu’un agent puisse citer ACF® précisément dans une réponse à l’utilisateur."
          : "READ tools give direct access to the ACF® corpus: methodological cards, regulator articles, glossary. Ideal for an agent to cite ACF® precisely in a user reply."}
      </p>
      <div className="not-prose mt-4 grid gap-3 md:grid-cols-2">
        {read.map((t) => (
          <Link
            key={t.name}
            href={`/tools/${t.name}` as never}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-gold/30"
          >
            <div className="flex items-center justify-between">
              <code className="font-mono text-sm font-semibold text-gold">{t.name}</code>
              <span className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-navy-50/60">
                READ
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
              {fr ? t.kindFr : t.kindEn}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-navy-50/75">
              {fr ? t.blurbFr : t.blurbEn}
            </p>
          </Link>
        ))}
      </div>

      <h2 id="signature-footer">
        {fr ? "Le pied-de-page signé partagé" : "The shared signed footer"}
      </h2>
      <p>
        {fr
          ? "Quel que soit l’outil, la sortie embarque les mêmes champs de traçabilité — c’est le contrat d’audit d’ACF®."
          : "Whichever tool, the output embeds the same traceability fields — this is ACF®'s audit contract."}
      </p>
      <ul>
        <li>
          <code>doctrine_version</code> —{" "}
          {fr
            ? "version sémantique de la doctrine au moment de l’appel"
            : "semantic version of the doctrine at call time"}
        </li>
        <li>
          <code>doctrine_hash</code> —{" "}
          {fr
            ? "sha256 du contenu signé"
            : "sha256 of the signed content"}
        </li>
        <li>
          <code>doctrine_signature</code> —{" "}
          {fr
            ? "ed25519 du hash, vérifiable hors-ligne avec la clé publique"
            : "ed25519 over the hash, verifiable offline with the public key"}
        </li>
        <li>
          <code>doctrine_archive_url</code> —{" "}
          {fr
            ? "URL d’archive permanente de la doctrine utilisée"
            : "permanent archive URL of the doctrine used"}
        </li>
        <li>
          <code>regulatory_snapshot</code> —{" "}
          {fr
            ? "corpus régulateur contre lequel l’outil a raisonné"
            : "regulator corpus the tool reasoned against"}
        </li>
        <li>
          <code>generated_at</code> —{" "}
          {fr ? "timestamp ISO 8601" : "ISO 8601 timestamp"}
        </li>
        <li>
          <code>requires_human_review: true</code> —{" "}
          {fr
            ? "constant ; aucun outil ne se substitue à une décision humaine de gouvernance"
            : "constant; no tool substitutes for a human governance decision"}
        </li>
      </ul>
    </DocsPage>
  );
}
