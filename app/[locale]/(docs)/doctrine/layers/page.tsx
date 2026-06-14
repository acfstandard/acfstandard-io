import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";

type L = { code: string; nameEn: string; nameFr: string; bodyEn: string; bodyFr: string; ownsEn: string; ownsFr: string };

const LAYERS: L[] = [
  {
    code: "C1",
    nameEn: "Strategic",
    nameFr: "Stratégique",
    bodyEn:
      "Charter of agentic sovereignty, governance committee, organisational RACI matrix, designation of the DDAO.",
    bodyFr:
      "Charte de souveraineté agentique, comité de gouvernance, matrice RACI organisationnelle, désignation du DDAO.",
    ownsEn: "General management + board",
    ownsFr: "Direction générale + conseil",
  },
  {
    code: "C2",
    nameEn: "Tactical",
    nameFr: "Tactique",
    bodyEn:
      "Weighted objectives per agent, automatic arbitration rules, human escalation thresholds.",
    bodyFr:
      "Objectifs pondérés par agent, règles d’arbitrage automatique, seuils d’escalade humaine.",
    ownsEn: "Business sponsor + transformation lead",
    ownsFr: "Sponsor métier + responsable transformation",
  },
  {
    code: "C3",
    nameEn: "Operational",
    nameFr: "Opérationnelle",
    bodyEn:
      "Mandate of each agent (card ACF-12), authorised interaction perimeter, categorisation by criticality level (card ACF-02).",
    bodyFr:
      "Mandat de chaque agent (fiche ACF-12), périmètre d’interaction autorisé, catégorisation par niveau de criticité (fiche ACF-02).",
    ownsEn: "DDAO + agent product owner",
    ownsFr: "DDAO + product owner de l’agent",
  },
  {
    code: "C4",
    nameEn: "Technical",
    nameFr: "Technique",
    bodyEn:
      "Adaptive gating, multi-level alerts, real-time sovereignty KPIs, dashboards operable by the DDAO and team.",
    bodyFr:
      "Gating adaptatif, alertes multi-niveaux, KPIs de souveraineté en temps réel, dashboards opérables par le DDAO et son équipe.",
    ownsEn: "DSI + RSSI + SRE",
    ownsFr: "DSI + RSSI + SRE",
  },
];

export default async function LayersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Les 4 couches opérationnelles" : "The 4 operational layers"}
      description={
        fr
          ? "ACF® se déploie sur quatre couches imbriquées (C1 → C4). Chaque couche a son propriétaire et son artefact attendu. Une organisation qui saute une couche obtient un déploiement instable : un C4 sans C1 est un outil sans mandat, un C1 sans C4 est une note sans observabilité."
          : "ACF® deploys across four nested layers (C1 → C4). Each layer has its owner and expected artifact. Skipping a layer produces an unstable deployment: C4 without C1 is a tool without a mandate, C1 without C4 is a memo without observability."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      {LAYERS.map((l) => (
        <section key={l.code}>
          <h2 id={l.code.toLowerCase()}>
            {l.code} — {fr ? l.nameFr : l.nameEn}
          </h2>
          <p>{fr ? l.bodyFr : l.bodyEn}</p>
          <p>
            <strong>{fr ? "Propriétaire principal" : "Principal owner"} :</strong>{" "}
            {fr ? l.ownsFr : l.ownsEn}
          </p>
        </section>
      ))}

      <h2 id="information-flow">{fr ? "Flux d’information entre couches" : "Cross-layer information flow"}</h2>
      <p>
        {fr
          ? "C1 produit la charte ; C2 la décline en objectifs ; C3 les instancie en mandats d’agent ; C4 instrumente les KPIs. À l’inverse, C4 remonte les KPIs à C3 pour ajuster les mandats ; C3 remonte les ajustements à C2 pour modifier les seuils ; C2 escalade à C1 quand un seuil de la charte est mis sous pression. C’est cette boucle qui rend le cadre vivant — P4."
          : "C1 produces the charter; C2 turns it into objectives; C3 instances them into agent mandates; C4 instruments the KPIs. Conversely, C4 escalates KPIs to C3 to tune mandates; C3 escalates adjustments to C2 to modify thresholds; C2 escalates to C1 when a charter threshold is under pressure. This loop is what keeps the framework alive — P4."}
      </p>
    </DocsPage>
  );
}
