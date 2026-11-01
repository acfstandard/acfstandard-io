import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

type Row = { code: string; nameEn: string; nameFr: string; en: string; fr: string };

// Delegated autonomy: set decision by decision (codes returned by the MCP tools).
const AUTONOMY: Row[] = [
  {
    code: "suggestive",
    nameEn: "Suggestive",
    nameFr: "Suggestif",
    en: "The agent suggests, the human decides. The human keeps hold of every executing action.",
    fr: "L’agent suggère, l’humain décide. L’humain garde la main sur chaque action exécutoire.",
  },
  {
    code: "co_decision",
    nameEn: "Co-decision",
    nameFr: "Co-décision",
    en: "The agent proposes a reasoned option, the human validates or rejects it before anything is executed.",
    fr: "L’agent propose une option argumentée, l’humain la valide ou la rejette avant toute exécution.",
  },
  {
    code: "supervised_autonomous",
    nameEn: "Supervised autonomous",
    nameFr: "Autonome supervisé",
    en: "The agent decides and executes within a bounded perimeter, under supervision. Beyond the thresholds of its mandate (ACF-13), it must escalate to a human.",
    fr: "L’agent décide et exécute dans un périmètre borné, sous supervision. Au-delà des seuils de son mandat (ACF-13), il remonte obligatoirement la décision à un humain.",
  },
  {
    code: "autonomous",
    nameEn: "Autonomous",
    nameFr: "Autonome",
    en: "The agent decides and executes without prior human validation, within its mandate. Human control remains possible after the fact and the kill switch (ACF-07) stays active.",
    fr: "L’agent décide et exécute sans validation humaine préalable, dans son mandat. Le contrôle humain reste possible a posteriori et le kill switch (ACF-07) reste actif.",
  },
];

// Agent maturity: one value per agent.
const MATURITY: Row[] = [
  { code: "N0", nameEn: "Classic automation", nameFr: "Automatisation classique", en: "Fixed rules, no learning.", fr: "Règles fixes, aucun apprentissage." },
  { code: "N1", nameEn: "Assisted agent", nameFr: "Agent assisté", en: "The agent analyses and recommends; the final decision remains human.", fr: "L’agent analyse et recommande ; la décision finale reste humaine." },
  { code: "N2", nameEn: "Governed agent", nameFr: "Agent gouverné", en: "The agent acts within a defined framework, under active supervision. This is the default target.", fr: "L’agent agit dans un cadre défini, sous supervision active. C’est la cible par défaut." },
  { code: "N3", nameEn: "Supervised autonomy", nameFr: "Autonomie supervisée", en: "The most mature governance, reserved for specific cases.", fr: "La gouvernance la plus mature, réservée à des cas spécifiques." },
];

function Table({ rows, fr, head }: { rows: Row[]; fr: boolean; head: [string, string, string] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-bd-neutral">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-bd-neutral bg-white/[0.03]">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code} className="border-b border-bd-neutral/50 last:border-0">
              <td className="px-4 py-3 align-top font-mono text-[12px] text-white">{r.code}</td>
              <td className="px-4 py-3 align-top font-display text-[13px] font-bold text-white">{fr ? r.nameFr : r.nameEn}</td>
              <td className="px-4 py-3 align-top text-[13px] text-gr-2">{fr ? r.fr : r.en}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AutonomyLevelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Autonomie déléguée et maturité de l’agent" : "Delegated autonomy and agent maturity"}
      description={
        fr
          ? "ACF® distingue deux échelles. L’autonomie déléguée se fixe décision par décision, sur 4 niveaux : suggestif, co-décision, autonome supervisé, autonome. La maturité de l’agent, de N0 à N3, qualifie l’agent dans son ensemble."
          : "ACF® separates two scales. Delegated autonomy is set decision by decision, on 4 levels: suggestive, co-decision, supervised autonomous, autonomous. Agent maturity, from N0 to N3, qualifies the agent as a whole."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr
          ? "On ne délègue pas un agent, on délègue des décisions. Un même agent peut être autonome pour reclasser un ticket et rester en co-décision pour accorder un remboursement : la maturité dit où en est l’agent, l’autonomie dit ce qu’on lui confie pour chaque décision."
          : "You do not delegate an agent, you delegate decisions. The same agent can be autonomous to re-route a ticket and stay in co-decision to grant a refund: maturity says where the agent stands, autonomy says what it is entrusted with for each decision."}
      </Callout>

      <h2 id="delegated-autonomy">{fr ? "Les 4 niveaux d’autonomie déléguée" : "The 4 delegated autonomy levels"}</h2>
      <p>
        {fr
          ? "Ils se fixent pour chaque décision, dans la Carte Décisionnelle (ACF-02) et s’écrivent dans le mandat de l’agent (ACF-13). Les outils du serveur MCP les renvoient sous ces codes, dans le champ autonomy_level."
          : "They are set for each decision, in the Decision Map (ACF-02), and written into the agent's mandate (ACF-13). The MCP server tools return them under these codes, in the autonomy_level field."}
      </p>
      <Table rows={AUTONOMY} fr={fr} head={[fr ? "Code" : "Code", fr ? "Niveau" : "Level", fr ? "Ce que l'agent fait" : "What the agent does"]} />

      <h2 id="criticality">{fr ? "Ce qui borne le niveau : la criticité" : "What bounds the level: criticality"}</h2>
      <p>
        {fr
          ? "La Matrice de Criticité (ACF-03) note chaque décision : criticité = (impact × fréquence × irréversibilité) ÷ 10. En dessous de 15, l’agent peut décider seul ; de 15 à 25, il décide sous supervision ; au-dessus de 25, la décision finale reste humaine. La criticité délimite la zone de délégation acceptable, elle ne fixe pas le niveau à elle seule : à l’intérieur, le choix dépend encore du mandat, de la réversibilité réelle, des seuils chiffrés et de la qualité de la supervision. Certaines décisions relèvent enfin de la zone non délégable, qui interdit sans calculer."
          : "The Criticality Matrix (ACF-03) scores each decision: criticality = (impact × frequency × irreversibility) ÷ 10. Below 15, the agent may decide alone; from 15 to 25, it decides under supervision; above 25, the final decision stays human. Criticality bounds the acceptable delegation zone, it does not set the level on its own: within it, the choice still depends on the mandate, actual reversibility, numeric thresholds and the quality of supervision. Some decisions finally belong to the non-delegable zone, which forbids without calculating."}
      </p>

      <h2 id="maturity">{fr ? "La maturité de l’agent, de N0 à N3" : "Agent maturity, from N0 to N3"}</h2>
      <p>
        {fr
          ? "Une seule valeur par agent, qui mesure le niveau de gouvernance qui l’entoure. Elle ne dit rien du pouvoir délégué sur une décision donnée."
          : "One value per agent, measuring the level of governance around it. It says nothing about the power delegated on a given decision."}
      </p>
      <Table rows={MATURITY} fr={fr} head={["", fr ? "Maturité" : "Maturity", fr ? "Description" : "Description"]} />

      <h2 id="in-practice">{fr ? "En pratique" : "In practice"}</h2>
      <ul>
        <li>
          {fr ? (
            <>Avant tout passage en autonome supervisé ou autonome : mandat signé par le DDAO (ACF-13), kill switch testé (ACF-07, éprouvé avec ACF-P7) et registre des décisions tenu (ACF-09).</>
          ) : (
            <>Before any move to supervised autonomous or autonomous: mandate signed by the DDAO (ACF-13), tested kill switch (ACF-07, drilled with ACF-P7) and a maintained decision register (ACF-09).</>
          )}
        </li>
        <li>
          {fr ? (
            <>Les seuils d’escalade et de confiance se fixent avec la fiche ACF-P6 ; la Revue de Validité (ACF-17) dit quand un mandat ne tient plus.</>
          ) : (
            <>Escalation and trust thresholds are set with card ACF-P6; the Validity Review (ACF-17) tells when a mandate no longer holds.</>
          )}
        </li>
        <li>
          {fr ? (
            <>L'outil <Link href="/tools/acf.assess-autonomy">acf.assess-autonomy</Link> recommande un niveau pour une décision ; <Link href="/tools/acf.assign-ddao-controls">acf.assign-ddao-controls</Link> en déduit les contrôles.</>
          ) : (
            <>The <Link href="/tools/acf.assess-autonomy">acf.assess-autonomy</Link> tool recommends a level for a decision; <Link href="/tools/acf.assign-ddao-controls">acf.assign-ddao-controls</Link> derives the controls from it.</>
          )}
        </li>
      </ul>
    </DocsPage>
  );
}
