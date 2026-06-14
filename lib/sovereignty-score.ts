export type Dimension = {
  id: string;
  weight: number; // 0-1, sums to 1.0 across all dims
  labelEn: string;
  labelFr: string;
  questionEn: string;
  questionFr: string;
  hintEn: string;
  hintFr: string;
  ficheRef: string; // ACF-XX
};

export const DIMENSIONS: Dimension[] = [
  {
    id: "identifiability",
    weight: 0.18,
    labelEn: "Decision identifiability",
    labelFr: "Identifiabilité décisionnelle",
    questionEn:
      "For every consequential decision the agent makes, can you name — instantly — the human individual or governing body who carries responsibility?",
    questionFr:
      "Pour chaque décision à conséquence de l’agent, pouvez-vous nommer — instantanément — la personne ou l’organe humain qui en porte la responsabilité ?",
    hintEn:
      "0 = no one is named, 100 = a DDAO is formally designated and reachable for every agent in production.",
    hintFr:
      "0 = personne n’est nommée, 100 = un DDAO est formellement désigné et joignable pour chaque agent en production.",
    ficheRef: "ACF-12",
  },
  {
    id: "override",
    weight: 0.18,
    labelEn: "Override capability",
    labelFr: "Capacité d’override",
    questionEn:
      "Can a single human override or reverse a specific agent decision in a bounded time (under 1 hour for critical, under 24 hours for non-critical)?",
    questionFr:
      "Un humain seul peut-il annuler ou inverser une décision spécifique de l’agent en un temps borné (moins d’1h pour critique, moins de 24h pour non-critique) ?",
    hintEn:
      "0 = the agent acts irreversibly on real assets, 100 = every decision is reversible by a single DDAO within SLA.",
    hintFr:
      "0 = l’agent agit irréversiblement sur des actifs réels, 100 = toute décision est annulable par un DDAO seul dans le SLA.",
    ficheRef: "ACF-06",
  },
  {
    id: "traceability",
    weight: 0.18,
    labelEn: "Audit traceability",
    labelFr: "Traçabilité audit",
    questionEn:
      "If a regulator asks for the full reasoning behind a specific decision made last Tuesday at 14:12, can you produce a cryptographically signed trace?",
    questionFr:
      "Si un régulateur demande le raisonnement complet d’une décision précise prise mardi dernier à 14h12, pouvez-vous produire une trace cryptographiquement signée ?",
    hintEn:
      "0 = no log, 100 = signed register with Ed25519 + hash chain + RFC 3161 timestamping.",
    hintFr:
      "0 = aucun journal, 100 = registre signé Ed25519 + chaîne de hachage + horodatage RFC 3161.",
    ficheRef: "ACF-08",
  },
  {
    id: "threshold-control",
    weight: 0.14,
    labelEn: "Threshold control",
    labelFr: "Contrôle des seuils",
    questionEn:
      "Are the autonomy thresholds (financial caps, action types, recipient lists) controlled by humans via documented governance, not by the agent itself?",
    questionFr:
      "Les seuils d’autonomie (plafonds financiers, types d’action, listes de destinataires) sont-ils contrôlés par des humains via une gouvernance documentée, et non par l’agent lui-même ?",
    hintEn:
      "0 = the agent sets its own thresholds, 100 = thresholds are signed off by the governance committee and locked.",
    hintFr:
      "0 = l’agent fixe ses propres seuils, 100 = les seuils sont validés par le comité de gouvernance et verrouillés.",
    ficheRef: "ACF-03",
  },
  {
    id: "kill-switch",
    weight: 0.18,
    labelEn: "Kill switch effectiveness",
    labelFr: "Effectivité du kill switch",
    questionEn:
      "Is the three-level kill switch tested in production every quarter, with the test result signed into the audit register?",
    questionFr:
      "Le kill switch à trois niveaux est-il testé en production chaque trimestre, avec le résultat du test signé dans le registre d’audit ?",
    hintEn:
      "0 = a button exists but has never been tested, 100 = L1/L2 drills every quarter, L3 annually, all signed.",
    hintFr:
      "0 = un bouton existe mais n’a jamais été testé, 100 = drills L1/L2 chaque trimestre, L3 annuel, tous signés.",
    ficheRef: "ACF-06",
  },
  {
    id: "drift",
    weight: 0.14,
    labelEn: "Drift visibility",
    labelFr: "Visibilité de la dérive",
    questionEn:
      "Are model drift, case-distribution drift, and cost drift observable in real time, with alert thresholds owned by a DDAO?",
    questionFr:
      "La dérive du modèle, la dérive de distribution des cas et la dérive de coûts sont-elles observables en temps réel, avec des seuils d’alerte sous la responsabilité d’un DDAO ?",
    hintEn:
      "0 = no drift dashboard, 100 = real-time dashboard with DDAO-owned alert thresholds.",
    hintFr:
      "0 = aucun tableau de bord de dérive, 100 = dashboard temps réel avec seuils d’alerte sous responsabilité DDAO.",
    ficheRef: "ACF-11",
  },
];

// Sanity check: weights sum to 1.00 (we accept 1.00 ± 0.01 for rounding)
export function sumOfWeights() {
  return DIMENSIONS.reduce((s, d) => s + d.weight, 0);
}

// Compute the composite Sovereignty Score from per-dimension answers (each 0-100).
export function composite(answers: Record<string, number>): number {
  const total = DIMENSIONS.reduce((s, d) => {
    const v = Math.max(0, Math.min(100, answers[d.id] ?? 0));
    return s + d.weight * v;
  }, 0);
  return Math.round(total);
}

// Bucket the score into a maturity label
export function bucket(score: number): {
  label: { en: string; fr: string };
  band: "critical" | "weak" | "fragile" | "controlled" | "sovereign";
} {
  if (score < 20)
    return { band: "critical", label: { en: "Critical exposure", fr: "Exposition critique" } };
  if (score < 40)
    return { band: "weak", label: { en: "Weak sovereignty", fr: "Souveraineté faible" } };
  if (score < 60)
    return { band: "fragile", label: { en: "Fragile control", fr: "Contrôle fragile" } };
  if (score < 80)
    return {
      band: "controlled",
      label: { en: "Controlled sovereignty", fr: "Souveraineté contrôlée" },
    };
  return {
    band: "sovereign",
    label: { en: "Full sovereignty", fr: "Souveraineté pleine" },
  };
}
