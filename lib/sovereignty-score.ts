// ACF Sovereignty Score™, as defined by toolkit card ACF-01.
// Four dependency dimensions, each scored 0-25; the sum (0-100) is a
// dependence index, the inverse of sovereignty: the higher, the more exposed.

export type Dimension = {
  id: string;
  labelEn: string;
  labelFr: string;
  definitionEn: string;
  definitionFr: string;
  questionsEn: [string, string];
  questionsFr: [string, string];
};

export const DIMENSION_MAX = 25;

export const DIMENSIONS: Dimension[] = [
  {
    id: "technological",
    labelEn: "Technological",
    labelFr: "Technologique",
    definitionEn: "Actual control over your models, infrastructure and data.",
    definitionFr: "Maîtrise réelle de vos modèles, de votre infrastructure et de vos données.",
    questionsEn: [
      "Would a change of provider (pricing, terms of service, shutdown) paralyze you?",
      "Does your sensitive data flow outside your control?",
    ],
    questionsFr: [
      "Un changement de fournisseur (prix, CGU, arrêt) vous paralyserait-il ?",
      "Vos données sensibles transitent-elles hors de votre contrôle ?",
    ],
  },
  {
    id: "acquisition",
    labelEn: "Acquisition",
    labelFr: "Acquisition",
    definitionEn: "Share of your customers reached through channels you do not own (e.g. marketplaces).",
    definitionFr: "Part de vos clients qui dépend de canaux que vous ne possédez pas (ex. marketplaces).",
    questionsEn: [
      "Does a third-party platform capture the bulk of your customers?",
      "Would delisting cut you off from the market?",
    ],
    questionsFr: [
      "Une plateforme tierce capte-t-elle l’essentiel de vos clients ?",
      "Un déréférencement vous couperait-il du marché ?",
    ],
  },
  {
    id: "decisional",
    labelEn: "Decisional",
    labelFr: "Décisionnelle",
    definitionEn: "Decisions already delegated to systems without human governance.",
    definitionFr: "Décisions déjà déléguées à des systèmes sans gouvernance humaine.",
    questionsEn: [
      "Are binding decisions being made without review?",
      "Could you justify a decision made by your AI?",
    ],
    questionsFr: [
      "Des décisions engageantes sont-elles prises sans validation ?",
      "Sauriez-vous justifier une décision prise par votre IA ?",
    ],
  },
  {
    id: "financial",
    labelEn: "Financial",
    labelFr: "Financière",
    definitionEn: "Concentration of your revenue or funding among a small number of players.",
    definitionFr: "Concentration de vos revenus ou de votre financement sur peu d’acteurs.",
    questionsEn: [
      "Does a single customer or channel account for a critical share of revenue?",
      "Would its loss threaten business continuity?",
    ],
    questionsFr: [
      "Un seul client ou canal pèse-t-il une part critique du chiffre ?",
      "Sa perte menacerait-elle la continuité de l’activité ?",
    ],
  },
];

// Scoring guide printed on ACF-01: count the "yes" answers per dimension.
export const SCORING_GUIDE: { range: string; en: string; fr: string }[] = [
  { range: "0-8", en: "none: you retain control", fr: "aucune : vous gardez la main" },
  { range: "9-16", en: "one: partial dependence", fr: "une seule : dépendance partielle" },
  { range: "17-25", en: "both: strong dependence", fr: "les deux : dépendance forte" },
];

// Dependence index: plain sum of the four dimension scores (0-100).
export function dependenceIndex(answers: Record<string, number>): number {
  return DIMENSIONS.reduce(
    (s, d) => s + Math.max(0, Math.min(DIMENSION_MAX, answers[d.id] ?? 0)),
    0,
  );
}

// The three reading zones printed on ACF-01.
export function zone(index: number): {
  band: "controlled" | "moderate" | "critical";
  label: { en: string; fr: string };
  advice: { en: string; fr: string };
} {
  if (index <= 33)
    return {
      band: "controlled",
      label: { en: "Sovereignty under control", fr: "Souveraineté maîtrisée" },
      advice: {
        en: "Agentification is possible with light-touch governance. Proceed to ACF-02.",
        fr: "Agentification possible avec une gouvernance légère. Avancez vers ACF-02.",
      },
    };
  if (index <= 66)
    return {
      band: "moderate",
      label: { en: "Moderate exposure", fr: "Exposition modérée" },
      advice: {
        en: "Govern and reduce dependencies before expanding agent autonomy.",
        fr: "Gouvernez et réduisez les dépendances avant d’élargir l’autonomie des agents.",
      },
    };
  return {
    band: "critical",
    label: { en: "Critical dependence", fr: "Dépendance critique" },
    advice: {
      en: "Reduce your exposure before any further automation. Top priority.",
      fr: "Réduisez l’exposition avant toute nouvelle automatisation. Priorité absolue.",
    },
  };
}
