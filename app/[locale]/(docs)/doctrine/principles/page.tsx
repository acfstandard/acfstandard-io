import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

type P = { code: string; titleEn: string; titleFr: string; bodyEn: string; bodyFr: string };

const PRINCIPLES: P[] = [
  {
    code: "P1",
    titleEn: "Decision / execution separation",
    titleFr: "Séparation décision / exécution",
    bodyEn:
      "The agent may execute; it cannot decide alone on strategic-critical actions (contractual commitment, financial gap above a threshold, international data transfer, irreversible action on a real asset). These decisions are always human, or suspended.",
    bodyFr:
      "L’agent peut exécuter ; il ne peut pas décider seul des décisions stratégiques critiques (engagement contractuel, écart financier au-delà d’un seuil, transfert international de données, action irréversible sur un actif réel). Ces décisions sont toujours humaines, ou suspendues.",
  },
  {
    code: "P2",
    titleEn: "Non-delegable zones",
    titleFr: "Zones non-déléguables",
    bodyEn:
      "Some decisions are never delegable, whatever the agent’s autonomy level and the organisation’s maturity. They are enumerated in each organisation’s Agentic Constitution (card ACF-03).",
    bodyFr:
      "Certaines décisions ne sont jamais déléguables, quel que soit le niveau d’autonomie de l’agent et la maturité de l’organisation. Elles sont énumérées dans la constitution agentique de chaque organisation (fiche ACF-03).",
  },
  {
    code: "P3",
    titleEn: "Traceability and interruptibility",
    titleFr: "Traçabilité et interruptibilité",
    bodyEn:
      "Every agentic action is logged in a cryptographically signed register (card ACF-08). Every action can be interrupted at any time via an operational kill switch (card ACF-06) whose effectiveness is tested.",
    bodyFr:
      "Toute action agentique est journalisée dans un registre cryptographiquement signé (fiche ACF-08). Toute action peut être interrompue à n’importe quel moment via un kill switch opérationnel (fiche ACF-06) dont l’effectivité est testée.",
  },
  {
    code: "P4",
    titleEn: "Living governance",
    titleFr: "Gouvernance vivante",
    bodyEn:
      "The governance framework evolves with the agents’ capabilities. A formal review at least quarterly (cards ACF-05 and ACF-10) adjusts autonomy levels, escalation thresholds, and non-delegable zones.",
    bodyFr:
      "Le cadre de gouvernance évolue avec les capacités des agents. Une revue formelle au moins trimestrielle (fiches ACF-05 et ACF-10) ajuste les niveaux d’autonomie, les seuils d’escalade et les zones non-déléguables.",
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
          ? "ACF® repose sur quatre principes axiomatiques, indépendants du protocole technique utilisé en sous-couche. Ils s’appliquent à tout système agentique en production, quel que soit le client (Claude, GPT, Gemini, modèle propriétaire) ou le protocole (MCP, ACP, Operator, etc.)."
          : "ACF® rests on four axiomatic principles, independent of the technical protocol used underneath. They apply to any agentic system in production, regardless of the client (Claude, GPT, Gemini, proprietary model) or the protocol (MCP, ACP, Operator, etc.)."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr
          ? "Les principes ne se hiérarchisent pas. P3 sans P1 produit un agent qui décide tout seul mais qu’on peut tracer — pas suffisant pour un usage régulé. P1 sans P3 produit un agent surveillé en intention mais inopposable en pratique. Les quatre tiennent ensemble ou pas du tout."
          : "Principles are not ranked. P3 without P1 produces an agent that decides on its own but is traceable — not enough for a regulated use. P1 without P3 produces an agent supervised in intent but undefensible in practice. The four hold together or not at all."}
      </Callout>

      {PRINCIPLES.map((p) => (
        <section key={p.code}>
          <h2 id={p.code.toLowerCase()}>
            {p.code} — {fr ? p.titleFr : p.titleEn}
          </h2>
          <p>{fr ? p.bodyFr : p.bodyEn}</p>
        </section>
      ))}

      <h2 id="why-axiomatic">{fr ? "Pourquoi des axiomes ?" : "Why axiomatic?"}</h2>
      <p>
        {fr
          ? "Les principes ACF® sont posés comme axiomes — non démontrés à partir d’autre chose — pour qu’une organisation puisse les reconnaître ou les rejeter en bloc. Une discussion sur « doit-on tracer les décisions ? » ne mène pas à un déploiement. Une décision sur « adoptons-nous le cadre ACF® ? » permet d’avancer. C’est une posture méthodologique délibérée."
          : "ACF® principles are posited as axioms — not derived from anything else — so an organisation can recognise or reject them as a whole. A debate on “should we trace decisions?” does not lead to a deployment. A decision on “do we adopt the ACF® framework?” unblocks the next step. This is a deliberate methodological posture."}
      </p>
    </DocsPage>
  );
}
