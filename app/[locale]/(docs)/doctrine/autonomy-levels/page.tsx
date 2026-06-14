import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

type Lvl = {
  level: string;
  nameEn: string;
  nameFr: string;
  shortEn: string;
  shortFr: string;
  controlsEn: string;
  controlsFr: string;
};

const LEVELS: Lvl[] = [
  {
    level: "N0",
    nameEn: "Classical automation",
    nameFr: "Automatisation classique",
    shortEn:
      "Fixed rules, no learning. Every change goes through a human change request.",
    shortFr:
      "Règles fixes, aucun apprentissage. Toute modification passe par un changement humain.",
    controlsEn:
      "Static config diff review · change management · no log requirement beyond classical IT operations.",
    controlsFr:
      "Revue de diff config statique · gestion du changement · aucune obligation de journalisation au-delà de l’ITSM classique.",
  },
  {
    level: "N1",
    nameEn: "Assisted agents",
    nameFr: "Agents assistés",
    shortEn:
      "The agent analyses, ranks, and recommends. The final decision remains systematically human.",
    shortFr:
      "L’agent analyse, hiérarchise et recommande. La décision finale reste systématiquement humaine.",
    controlsEn:
      "Signed recommendation log · human accept/reject capture · monthly drift review · DDAO designated but light cadence.",
    controlsFr:
      "Journal signé des recommandations · capture accept/reject humain · revue mensuelle de dérive · DDAO désigné mais cadence légère.",
  },
  {
    level: "N2",
    nameEn: "Governed agents",
    nameFr: "Agents gouvernés",
    shortEn:
      "The agent decides within a strict frame (agentic constitution + locked non-delegable zones + tested kill switch + signed register). This is the default target for production agentic commerce in 2026-2027.",
    shortFr:
      "L’agent décide dans un cadre strict (constitution agentique + zones non-déléguables verrouillées + kill switch testé + registre signé). C’est le niveau visé par défaut pour le commerce agentique en production en 2026-2027.",
    controlsEn:
      "Full ACF-04/06/08/12 stack · quarterly simulation (ACF-15) · 30-day audit (ACF-10) · DDAO with veto authority.",
    controlsFr:
      "Pile ACF-04/06/08/12 complète · simulation trimestrielle (ACF-15) · audit 30 jours (ACF-10) · DDAO avec autorité de veto.",
  },
  {
    level: "N3",
    nameEn: "Supervised autonomy",
    nameFr: "Autonomie supervisée",
    shortEn:
      "The agent decides AND learns. Reserved for specific cases. Requires the most mature governance: monthly review, dual DDAO, biannual external audit, embedded model board approval before any model swap.",
    shortFr:
      "L’agent décide ET apprend. Réservé à des cas spécifiques. Exige la gouvernance la plus mature : revue mensuelle, double DDAO, audit externe semestriel, validation par un comité modèle avant tout changement de modèle.",
    controlsEn:
      "Everything from N2 + continuous model evaluation pipeline + biannual external audit + dual-control kill switch + canary deployments.",
    controlsFr:
      "Tout N2 + pipeline d’évaluation modèle continue + audit externe semestriel + kill switch à double contrôle + déploiements canary.",
  },
];

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
      title={fr ? "Les 4 niveaux d’autonomie N0–N3" : "The 4 autonomy levels N0–N3"}
      description={
        fr
          ? "ACF® classe les agents par niveau d’autonomie. La progression recommandée est N0 → N1 → N2 → N3. Chaque passage à un niveau supérieur déclenche les contrôles de la fiche ACF-00 (Score de Souveraineté)."
          : "ACF® classifies agents by autonomy level. The recommended progression is N0 → N1 → N2 → N3. Each upgrade triggers the controls of card ACF-00 (ACF Sovereignty Score)."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>N2 est la cible par défaut</strong> pour la majorité des cas d’usage
            en production en 2026-2027. N3 est l’exception, pas la règle. Sauter N1 pour
            arriver directement à N2 est acceptable ; sauter N2 pour arriver à N3 ne
            l’est pas, sauf cas de figure documentés.
          </>
        ) : (
          <>
            <strong>N2 is the default target</strong> for the majority of production use
            cases in 2026-2027. N3 is the exception, not the rule. Skipping N1 to land
            directly at N2 is acceptable; skipping N2 to reach N3 is not, save for
            documented edge cases.
          </>
        )}
      </Callout>

      {LEVELS.map((l) => (
        <section key={l.level}>
          <h2 id={l.level.toLowerCase()}>
            {l.level} — {fr ? l.nameFr : l.nameEn}
          </h2>
          <p>{fr ? l.shortFr : l.shortEn}</p>
          <p>
            <strong>{fr ? "Contrôles attendus" : "Expected controls"} :</strong>{" "}
            {fr ? l.controlsFr : l.controlsEn}
          </p>
        </section>
      ))}

      <h2 id="transitions">{fr ? "Règles de transition" : "Transition rules"}</h2>
      <ul>
        <li>
          <strong>N0 → N1</strong> —{" "}
          {fr
            ? "fiche ACF-04 produite, DDAO désigné, registre des recommandations activé."
            : "card ACF-04 produced, DDAO designated, recommendation register active."}
        </li>
        <li>
          <strong>N1 → N2</strong> —{" "}
          {fr
            ? "ACF-06 testé, ACF-08 signé Ed25519, ACF-15 simulation passée, audit ACF-10 vert à 30 jours."
            : "ACF-06 tested, ACF-08 Ed25519-signed, ACF-15 simulation passed, ACF-10 30-day audit green."}
        </li>
        <li>
          <strong>N2 → N3</strong> —{" "}
          {fr
            ? "double DDAO en place, audit externe initial passé, pipeline d’évaluation continue du modèle opérationnel, board signs off."
            : "dual DDAO in place, initial external audit passed, continuous model evaluation pipeline operational, board signs off."}
        </li>
      </ul>
    </DocsPage>
  );
}
