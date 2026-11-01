import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

type P = { code: string; titleEn: string; titleFr: string; bodyEn: string; bodyFr: string };

// The 4 official principles, as served by acf-mcp (acf://framework/principle/Pn).
const PRINCIPLES: P[] = [
  {
    code: "P1",
    titleEn: "Decision Sovereignty",
    titleFr: "Souveraineté décisionnelle",
    bodyEn:
      "Critical strategic decisions are never delegated to autonomous agents. The organisation keeps ultimate accountability for the decisions its agents take, whatever level of autonomy it delegates to them. An autonomous AI agent never moves decision accountability outside the organisation. Operational delegation (the agent acts) does not entail responsibility delegation (the organisation answers).",
    bodyFr:
      "Les décisions stratégiques critiques ne sont jamais déléguées à des agents autonomes. L'organisation conserve la responsabilité ultime des décisions prises par ses agents, quel que soit le niveau d'autonomie qu'elle leur délègue. Un agent IA autonome ne déplace jamais la responsabilité décisionnelle hors de l'organisation. La délégation opérationnelle (l'agent agit) n'emporte pas délégation de responsabilité (l'organisation répond).",
  },
  {
    code: "P2",
    titleEn: "Governance by Design",
    titleFr: "Gouvernance par conception",
    bodyEn:
      "Governance frameworks are defined before deployment, not after, and their intensity is proportionate to the criticality of the decisions entrusted to the agent. An agent is not put into service before its framework exists: agentic constitution (cf. ACF-04), mandate (cf. ACF-13), criticality matrix (cf. ACF-03) and stop mechanism (cf. ACF-07). This framework is proportionate: an agent that only suggests does not warrant the same control apparatus as an agent that decides on its own. Over-investing controls on a low-criticality decision wastes resources; under-investing on a critical decision creates regulatory and operational exposure.",
    bodyFr:
      "Les cadres de gouvernance sont définis avant le déploiement, pas après ; leur intensité est proportionnée à la criticité des décisions confiées à l'agent. Un agent n'est pas mis en service avant que son cadre existe : constitution agentique (cf. ACF-04), mandat (cf. ACF-13), matrice de criticité (cf. ACF-03) et dispositif d'arrêt (cf. ACF-07). Ce cadre est proportionné : un agent qui ne fait que suggérer ne mérite pas le même appareil de contrôle qu'un agent qui décide seul. Surinvestir le contrôle sur une décision peu critique coûte sans bénéfice ; sous-investir sur une décision critique crée une exposition réglementaire et opérationnelle.",
  },
  {
    code: "P3",
    titleEn: "Ultimate Human Control",
    titleFr: "Contrôle humain ultime",
    bodyEn:
      "Every agentic system must preserve the ability for human intervention: a takeover mechanism that can be activated at any time and is calibrated to criticality. An agent's autonomy is a conditional privilege, never a vested right. At any moment, an authorised operator must be able to freeze, redirect or revoke the agent. This is the operational expression of AI Act Article 14.",
    bodyFr:
      "Tout système agentique doit préserver la capacité d'intervention humaine : un dispositif de reprise activable à tout moment et calibré sur la criticité. L'autonomie d'un agent est un privilège conditionnel, jamais un droit acquis. À tout instant, un opérateur habilité doit pouvoir geler, infléchir ou révoquer l'agent. C'est l'expression opérationnelle de l'Article 14 de l'AI Act.",
  },
  {
    code: "P4",
    titleEn: "Traceable Accountability",
    titleFr: "Responsabilité traçable",
    bodyEn:
      "Every autonomous action must be auditable and attributable: any decision can be reconstructed after the fact by pointing to the doctrine, rules and data that produced it, and to the person who authorised it. An agentic decision without a reconstructible audit trail is legally indefensible. ACF® mandates that, at any time T, the organisation can answer the question: 'which doctrine version, which rules and which data produced this decision?'",
    bodyFr:
      "Chaque action autonome doit pouvoir être auditée et attribuée : toute décision se reconstitue a posteriori en pointant la doctrine, les règles et les données qui l'ont produite ainsi que le responsable qui l'a autorisée. Une décision agentique sans piste d'audit reconstituable est juridiquement indéfendable. ACF® impose qu'à chaque instant T, l'organisation puisse répondre à la question : « quelle version de la doctrine, quelles règles et quelles données ont produit cette décision ? »",
  },
];

export default async function PrinciplesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Les 4 principes fondateurs" : "The 4 founding principles"}
      description={
        fr
          ? "ACF® repose sur quatre principes fondateurs, indépendants du protocole technique utilisé en sous-couche. Ils s’appliquent à tout système agentique en production, quel que soit le client (Claude, GPT, Gemini, modèle propriétaire) ou le protocole (MCP, ACP, Operator, etc.)."
          : "ACF® rests on four founding principles, independent of the technical protocol used underneath. They apply to any agentic system in production, regardless of the client (Claude, GPT, Gemini, proprietary model) or the protocol (MCP, ACP, Operator, etc.)."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr
          ? "Les principes ne se hiérarchisent pas. Un agent traçable (P4) que personne ne peut arrêter (P3) reste hors de contrôle ; un agent qu’on peut arrêter mais dont personne ne répond (P1) reste hors de responsabilité. Les quatre tiennent ensemble ou pas du tout."
          : "Principles are not ranked. A traceable agent (P4) that nobody can stop (P3) remains out of control; an agent that can be stopped but that nobody answers for (P1) remains outside accountability. The four hold together or not at all."}
      </Callout>

      {PRINCIPLES.map((p) => (
        <section key={p.code}>
          <h2 id={p.code.toLowerCase()}>
            {p.code} · {fr ? p.titleFr : p.titleEn}
          </h2>
          <p>{fr ? p.bodyFr : p.bodyEn}</p>
        </section>
      ))}

      <h2 id="why-axiomatic">{fr ? "Pourquoi des axiomes ?" : "Why axiomatic?"}</h2>
      <p>
        {fr
          ? "Les principes ACF® sont posés comme axiomes, non démontrés à partir d’autre chose, pour qu’une organisation puisse les reconnaître ou les rejeter en bloc. Une discussion sur « doit-on tracer les décisions ? » ne mène pas à un déploiement. Une décision sur « adoptons-nous le cadre ACF® ? » permet d’avancer. C’est une posture méthodologique délibérée."
          : "ACF® principles are posited as axioms, not derived from anything else, so an organisation can recognise or reject them as a whole. A debate on “should we trace decisions?” does not lead to a deployment. A decision on “do we adopt the ACF® framework?” unblocks the next step. This is a deliberate methodological posture."}
      </p>
    </DocsPage>
  );
}
