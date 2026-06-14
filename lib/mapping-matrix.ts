export type Standard = "ai-act" | "iso-42001" | "nist-rmf" | "gdpr" | "cobit";

export type Fiche = {
  code: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string;
  summaryFr: string;
};

export type MappingCell = Record<Standard, string>;

export type MappingRow = {
  fiche: Fiche;
  mapping: MappingCell;
};

export const STANDARDS: { id: Standard; labelEn: string; labelFr: string; full: string }[] = [
  { id: "ai-act", labelEn: "EU AI Act", labelFr: "EU AI Act", full: "Regulation (EU) 2024/1689 — Artificial Intelligence Act" },
  { id: "iso-42001", labelEn: "ISO/IEC 42001", labelFr: "ISO/IEC 42001", full: "ISO/IEC 42001:2023 — AI management system" },
  { id: "nist-rmf", labelEn: "NIST AI RMF", labelFr: "NIST AI RMF", full: "NIST AI Risk Management Framework 1.0 (2023)" },
  { id: "gdpr", labelEn: "GDPR", labelFr: "RGPD", full: "Regulation (EU) 2016/679 — General Data Protection Regulation" },
  { id: "cobit", labelEn: "COBIT 2019", labelFr: "COBIT 2019", full: "ISACA COBIT 2019 framework" },
];

export const MAPPING: MappingRow[] = [
  {
    fiche: {
      code: "ACF-00",
      titleEn: "Sovereignty Score",
      titleFr: "Score de Souveraineté",
      summaryEn: "Evaluates the level of decisional sovereignty preserved by the organisation across the agent portfolio.",
      summaryFr: "Évalue le niveau de souveraineté décisionnelle conservé par l’organisation sur le portefeuille d’agents.",
    },
    mapping: { "ai-act": "Art. 9", "iso-42001": "6.1.2", "nist-rmf": "MAP-3", gdpr: "Art. 35", cobit: "EDM-01" },
  },
  {
    fiche: {
      code: "ACF-01",
      titleEn: "Decision Map",
      titleFr: "Carte Décisionnelle",
      summaryEn: "Maps every decision the agent makes and its approval chain.",
      summaryFr: "Cartographie chaque décision de l’agent et sa chaîne d’approbation.",
    },
    mapping: { "ai-act": "Art. 14", "iso-42001": "8.4 / A.6", "nist-rmf": "GOVERN-1.1", gdpr: "Art. 22", cobit: "EDM-03" },
  },
  {
    fiche: {
      code: "ACF-02",
      titleEn: "Criticality Matrix",
      titleFr: "Matrice de Criticité",
      summaryEn: "Classifies each agent by criticality, impact, and irreversibility.",
      summaryFr: "Classifie chaque agent par criticité, impact et irréversibilité.",
    },
    mapping: { "ai-act": "Art. 6 + Ann. III", "iso-42001": "6.1.2", "nist-rmf": "MAP-2", gdpr: "Art. 35", cobit: "APO-12" },
  },
  {
    fiche: {
      code: "ACF-03",
      titleEn: "Agentic Constitution",
      titleFr: "Constitution Agentique",
      summaryEn: "Internal charter — who decides what, how, with which limits.",
      summaryFr: "Charte interne — qui décide quoi, comment, avec quelles limites.",
    },
    mapping: { "ai-act": "Art. 5 + 26", "iso-42001": "5.2", "nist-rmf": "GOVERN-2", gdpr: "Art. 25", cobit: "EDM-01" },
  },
  {
    fiche: {
      code: "ACF-04",
      titleEn: "Agent Card",
      titleFr: "Fiche Agent",
      summaryEn: "Operational identity: perimeter, data, tools, autonomy level.",
      summaryFr: "Identité opérationnelle : périmètre, données, outils, autonomie.",
    },
    mapping: { "ai-act": "Art. 11 + 26(6)", "iso-42001": "7.5 + 8.1", "nist-rmf": "MAP-1", gdpr: "Art. 30", cobit: "BAI-09" },
  },
  {
    fiche: {
      code: "ACF-05",
      titleEn: "Supervision & Governance",
      titleFr: "Supervision & Gouvernance",
      summaryEn: "Continuous supervision mechanisms.",
      summaryFr: "Mécanismes de supervision continue.",
    },
    mapping: { "ai-act": "Art. 14 + 26(5)", "iso-42001": "5.3 + 9.1", "nist-rmf": "GOVERN-3 / MANAGE-2.3", gdpr: "Art. 22 + 37-39", cobit: "MEA-02" },
  },
  {
    fiche: {
      code: "ACF-06",
      titleEn: "Kill Switch",
      titleFr: "Kill Switch",
      summaryEn: "Three-level emergency shutdown procedure with measurable response times.",
      summaryFr: "Procédure d’arrêt d’urgence à trois niveaux avec temps de réponse mesurables.",
    },
    mapping: { "ai-act": "Art. 14(4) + 26(5)", "iso-42001": "8.3", "nist-rmf": "MANAGE-4", gdpr: "Art. 22(3)", cobit: "DSS-02" },
  },
  {
    fiche: {
      code: "ACF-07",
      titleEn: "First Agent Dossier",
      titleFr: "Dossier Premier Agent",
      summaryEn: "Qualification dossier before production go-live.",
      summaryFr: "Dossier de qualification avant la mise en production.",
    },
    mapping: { "ai-act": "Art. 11-13 + 17", "iso-42001": "8.1 + 6.2", "nist-rmf": "MAP-2 + GOVERN-4", gdpr: "Art. 30 + 35", cobit: "BAI-01" },
  },
  {
    fiche: {
      code: "ACF-08",
      titleEn: "Agentic Decision Register",
      titleFr: "Registre des Décisions Agentiques",
      summaryEn: "Cryptographically signed event log (Ed25519 + hash chain).",
      summaryFr: "Journal d’évènements cryptographiquement signé (Ed25519 + chaîne de hachage).",
    },
    mapping: { "ai-act": "Art. 12 + 19 + 26(6)", "iso-42001": "9.1 + 7.5.3", "nist-rmf": "MEASURE-2", gdpr: "Art. 30", cobit: "MEA-01" },
  },
  {
    fiche: {
      code: "ACF-09",
      titleEn: "Action & Improvement Plan",
      titleFr: "Plan d’Action & Amélioration",
      summaryEn: "Post-deployment improvement plan.",
      summaryFr: "Plan d’amélioration post-déploiement.",
    },
    mapping: { "ai-act": "Art. 9(4) + 17", "iso-42001": "10.1 + 10.2", "nist-rmf": "MANAGE-2", gdpr: "Art. 24 + 32", cobit: "BAI-08" },
  },
  {
    fiche: {
      code: "ACF-10",
      titleEn: "30-Day Governance Audit",
      titleFr: "Audit Gouvernance 30 jours",
      summaryEn: "Periodic internal audit.",
      summaryFr: "Audit interne périodique.",
    },
    mapping: { "ai-act": "Art. 17 + 71", "iso-42001": "9.2 + 9.3", "nist-rmf": "GOVERN-5 + MANAGE-3.1", gdpr: "Art. 32", cobit: "MEA-02 + MEA-03" },
  },
  {
    fiche: {
      code: "ACF-11",
      titleEn: "Agentic Risk Assessment",
      titleFr: "Évaluation des Risques Agentiques",
      summaryEn: "Specific risk analysis: drift, hallucination, escalation.",
      summaryFr: "Analyse de risques spécifique : drift, hallucination, escalade.",
    },
    mapping: { "ai-act": "Art. 9", "iso-42001": "6.1.2", "nist-rmf": "MAP-3 + MAP-4", gdpr: "Art. 35", cobit: "APO-12" },
  },
  {
    fiche: {
      code: "ACF-12",
      titleEn: "Agent Mandate",
      titleFr: "Mandat d’Agent",
      summaryEn: "Formal delegation from the organisation to the DDAO.",
      summaryFr: "Délégation formelle de l’organisation au DDAO.",
    },
    mapping: { "ai-act": "Art. 16 + 17 + 26", "iso-42001": "5.3", "nist-rmf": "GOVERN-3 + GOVERN-6", gdpr: "Art. 28 + 24", cobit: "APO-05" },
  },
  {
    fiche: {
      code: "ACF-13",
      titleEn: "Guided Practical Case",
      titleFr: "Cas Pratique Guidé",
      summaryEn: "Worked use case for training and blind audit.",
      summaryFr: "Cas d’usage commenté pour formation et audit blanc.",
    },
    mapping: { "ai-act": "Art. 6 + 13", "iso-42001": "7.2 + 7.3", "nist-rmf": "MAP-2", gdpr: "Art. 22", cobit: "BAI-05" },
  },
  {
    fiche: {
      code: "ACF-14",
      titleEn: "Teacher Guide",
      titleFr: "Guide Enseignant",
      summaryEn: "Pedagogical run sheet for trainers.",
      summaryFr: "Déroulé pédagogique pour formateurs.",
    },
    mapping: { "ai-act": "Art. 4", "iso-42001": "7.2 + 7.3", "nist-rmf": "GOVERN-1.6 + GOVERN-6", gdpr: "Art. 39", cobit: "APO-07" },
  },
  {
    fiche: {
      code: "ACF-15",
      titleEn: "Governance Simulation",
      titleFr: "Simulation de Gouvernance",
      summaryEn: "Sandbox exercise — mandatory quarterly per ACF®.",
      summaryFr: "Exercice de bac à sable — obligatoire trimestriellement selon ACF®.",
    },
    mapping: { "ai-act": "Art. 9 + 57-63", "iso-42001": "9.1 + 6.2", "nist-rmf": "MANAGE-3 + MEASURE-3", gdpr: "Art. 32", cobit: "BAI-06" },
  },
  {
    fiche: {
      code: "ACF-16",
      titleEn: "Accountability by Design",
      titleFr: "Responsabilité par Design",
      summaryEn: "Cross-cutting accountability principle.",
      summaryFr: "Principe transversal d’accountability.",
    },
    mapping: { "ai-act": "Art. 5 + 13 + 16(b)", "iso-42001": "5.2", "nist-rmf": "GOVERN-1 + MANAGE-1", gdpr: "Art. 5(2) + 24 + 25", cobit: "EDM-01" },
  },
];
