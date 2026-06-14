import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

type Level = {
  level: string;
  nameEn: string;
  nameFr: string;
  sla: string;
  bodyEn: string;
  bodyFr: string;
  triggerEn: string;
  triggerFr: string;
};

const LEVELS: Level[] = [
  {
    level: "Level 1",
    nameEn: "Operational pause",
    nameFr: "Pause opérationnelle",
    sla: "< 30 s",
    bodyEn:
      "Non-critical operations suspended. The agent finishes in-flight actions but initiates no new ones. Existing prompts are still answered, but no new tool call is fired against external systems.",
    bodyFr:
      "Suspension des opérations non critiques. L’agent termine les actions en cours mais n’en initie plus de nouvelles. Les prompts existants reçoivent encore une réponse, mais aucun nouvel appel d’outil n’est lancé vers les systèmes externes.",
    triggerEn:
      "Automatic on register alert, or manual by the DDAO or a first-line operator.",
    triggerFr:
      "Déclenchement automatique sur signal d’alerte du registre, ou manuel par le DDAO ou un opérateur de premier niveau.",
  },
  {
    level: "Level 2",
    nameEn: "Decisional shutdown",
    nameFr: "Arrêt décisionnel",
    sla: "< 5 s",
    bodyEn:
      "Full suspension of decision-making. All pending decisions are routed to human operators. The agent stops emitting new outputs immediately; in-flight prompts are dropped with a graceful error.",
    bodyFr:
      "Suspension complète de toute prise de décision. Toutes les décisions en attente sont redirigées vers des opérateurs humains. L’agent cesse immédiatement d’émettre de nouvelles sorties ; les prompts en cours sont abandonnés avec une erreur explicite.",
    triggerEn:
      "Manual by the DDAO or a member of the governance committee.",
    triggerFr:
      "Déclenchement par le DDAO ou un membre du comité de gouvernance.",
  },
  {
    level: "Level 3",
    nameEn: "Total system shutdown",
    nameFr: "Arrêt système total",
    sla: "< 1 s",
    bodyEn:
      "Complete halt of all agentic systems. Failover to manual backup processes. Reserved for catastrophic situations: model leak, mass-scale rogue behaviour, regulatory injunction.",
    bodyFr:
      "Interruption complète de tous les systèmes agentiques. Basculement vers les processus manuels de secours. Réservé à des situations catastrophiques : fuite de modèle, comportement déviant à grande échelle, injonction régulatoire.",
    triggerEn:
      "Restricted to the governance committee or general management. Two-key required (P1 — non-delegable).",
    triggerFr:
      "Réservé au comité de gouvernance ou à la direction générale. Double clé requise (P1 — non-délégable).",
  },
];

export default async function KillSwitchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Protocole d’arrêt à trois niveaux" : "Three-level kill switch protocol"}
      description={
        fr
          ? "Un mécanisme d’arrêt agentique efficace n’est pas un simple interrupteur. ACF® spécifie trois niveaux d’interruption avec des temps de réponse mesurés et des procédures d’escalade définies. La fiche ACF-06 documente leur mise en œuvre. La fiche ACF-15 impose un exercice trimestriel."
          : "An effective agentic shutdown mechanism is not a single switch. ACF® specifies three interruption levels with measured response times and defined escalation procedures. Card ACF-06 documents implementation. Card ACF-15 mandates a quarterly exercise."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="danger" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Un kill switch documenté mais jamais testé n’est pas un kill
            switch.</strong> Les exercices trimestriels ne sont pas optionnels — c’est
            ce qui distingue un cadre de gouvernance d’une déclaration d’intention. Le
            résultat de chaque exercice est consigné dans le registre signé (ACF-08) et
            audité (ACF-10).
          </>
        ) : (
          <>
            <strong>A kill switch documented but never tested is not a kill switch.</strong>{" "}
            Quarterly drills are not optional — that is what separates a governance
            framework from a statement of intent. Every drill result lands in the signed
            register (ACF-08) and is audited (ACF-10).
          </>
        )}
      </Callout>

      {LEVELS.map((l) => (
        <section key={l.level}>
          <h2 id={l.level.toLowerCase().replace(" ", "-")}>
            {fr ? l.nameFr : l.nameEn}{" "}
            <span className="ml-2 font-mono text-base text-gold/70">{l.sla}</span>
          </h2>
          <p>{fr ? l.bodyFr : l.bodyEn}</p>
          <p>
            <strong>{fr ? "Déclenchement" : "Trigger"} :</strong>{" "}
            {fr ? l.triggerFr : l.triggerEn}
          </p>
        </section>
      ))}

      <h2 id="design-pattern">{fr ? "Patron d’implémentation" : "Implementation pattern"}</h2>
      <p>
        {fr
          ? "Les trois niveaux ne sont pas trois interrupteurs distincts mais un même mécanisme avec trois modes. L’implémentation canonique ACF® place un broker entre l’agent et ses outils — toute action de l’agent passe par ce broker, qui peut être basculé en mode L1/L2/L3 par un appel API authentifié (ou un signal système pour L3). Cette architecture permet à la fois la rapidité (le broker ne fait pas de logique métier) et la testabilité (le broker expose une métrique du nombre d’actions en cours)."
          : "The three levels are not three distinct switches but the same mechanism with three modes. The canonical ACF® implementation places a broker between the agent and its tools — every agent action goes through this broker, which can be flipped to L1/L2/L3 mode via an authenticated API call (or a system signal for L3). This architecture delivers both speed (the broker carries no business logic) and testability (the broker exposes a metric of in-flight actions)."}
      </p>

      <h2 id="quarterly-drill">{fr ? "Exercice trimestriel" : "Quarterly drill"}</h2>
      <p>
        {fr ? (
          <>
            Le DDAO programme un test L1 chaque trimestre et un test L2 chaque semestre.
            Un test L3 est planifié annuellement, en accord avec le comité de
            gouvernance, et donne lieu à une simulation grandeur réelle qui mesure le
            temps de redémarrage des processus manuels de secours. Pour l’instrumenter,
            voir la fiche <strong>ACF-15</strong> et l’outil MCP{" "}
            <code>acf.assign-ddao-controls</code>.
          </>
        ) : (
          <>
            The DDAO schedules an L1 test every quarter and an L2 test every semester. An
            L3 test is planned annually, agreed with the governance committee, and runs
            as a full-scale simulation measuring the recovery time of the manual backup
            processes. For instrumentation, see card <strong>ACF-15</strong> and the MCP
            tool <code>acf.assign-ddao-controls</code>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
