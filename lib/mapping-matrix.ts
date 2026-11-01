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
  { id: "ai-act", labelEn: "EU AI Act", labelFr: "EU AI Act", full: "Regulation (EU) 2024/1689: Artificial Intelligence Act" },
  { id: "iso-42001", labelEn: "ISO/IEC 42001", labelFr: "ISO/IEC 42001", full: "ISO/IEC 42001:2023: AI management system" },
  { id: "nist-rmf", labelEn: "NIST AI RMF", labelFr: "NIST AI RMF", full: "NIST AI Risk Management Framework 1.0 (2023)" },
  { id: "gdpr", labelEn: "GDPR", labelFr: "RGPD", full: "Regulation (EU) 2016/679: General Data Protection Regulation" },
  { id: "cobit", labelEn: "COBIT 2019", labelFr: "COBIT 2019", full: "ISACA COBIT 2019 framework" },
];

// Rows follow the ACF® white paper matrix; titles and summaries are the toolkit
// card titles and subtitles (lib/fiches.ts).
export const MAPPING: MappingRow[] = [
  {
    fiche: {
      code: "ACF-01",
      titleEn: "Sovereignty Score",
      titleFr: "Score de Souveraineté",
      summaryEn: "Measure your exposure before automating",
      summaryFr: "Mesurer son exposition avant d'automatiser",
    },
    mapping: { "ai-act": "Art. 9", "iso-42001": "6.1.2", "nist-rmf": "MAP-3", gdpr: "Art. 35", cobit: "EDM-01" },
  },
  {
    fiche: {
      code: "ACF-02",
      titleEn: "Decision Map",
      titleFr: "Carte Décisionnelle",
      summaryEn: "Map your decisions and their level of autonomy",
      summaryFr: "Cartographier vos décisions et leur niveau d'autonomie",
    },
    mapping: { "ai-act": "Art. 14", "iso-42001": "8.4 / A.6", "nist-rmf": "GOVERN-1.1", gdpr: "Art. 22", cobit: "EDM-03" },
  },
  {
    fiche: {
      code: "ACF-03",
      titleEn: "Criticality Matrix",
      titleFr: "Matrice de Criticité",
      summaryEn: "Which decisions can be delegated to an agent?",
      summaryFr: "Quelle décision peut-on déléguer à un agent ?",
    },
    mapping: { "ai-act": "Art. 6 + Ann. III", "iso-42001": "6.1.2", "nist-rmf": "MAP-2", gdpr: "Art. 35", cobit: "APO-12" },
  },
  {
    fiche: {
      code: "ACF-04",
      titleEn: "Agentic Constitution",
      titleFr: "Constitution Agentique",
      summaryEn: "The rules, limits and responsibilities of the agent",
      summaryFr: "Les règles, limites et responsabilités de l'agent",
    },
    mapping: { "ai-act": "Art. 5 + 26", "iso-42001": "5.2", "nist-rmf": "GOVERN-2", gdpr: "Art. 25", cobit: "EDM-01" },
  },
  {
    fiche: {
      code: "ACF-05",
      titleEn: "Agent Card",
      titleFr: "Fiche Agent",
      summaryEn: "Frame every deployed agent",
      summaryFr: "Encadrer chaque agent déployé",
    },
    mapping: { "ai-act": "Art. 11 + 26(6)", "iso-42001": "7.5 + 8.1", "nist-rmf": "MAP-1", gdpr: "Art. 30", cobit: "BAI-09" },
  },
  {
    fiche: {
      code: "ACF-06",
      titleEn: "Supervision & Governance",
      titleFr: "Supervision & Gouvernance",
      summaryEn: "Monitor, measure and keep the agent compliant",
      summaryFr: "Surveiller, mesurer et garder l'agent conforme",
    },
    mapping: { "ai-act": "Art. 14 + 26(5)", "iso-42001": "5.3 + 9.1", "nist-rmf": "GOVERN-3 / MANAGE-2.3", gdpr: "Art. 22 + 37-39", cobit: "MEA-02" },
  },
  {
    fiche: {
      code: "ACF-07",
      titleEn: "Kill Switch",
      titleFr: "Kill Switch",
      summaryEn: "Emergency shutdown protocol",
      summaryFr: "Protocole d'arrêt d'urgence",
    },
    mapping: { "ai-act": "Art. 14(4) + 26(5)", "iso-42001": "8.3", "nist-rmf": "MANAGE-4", gdpr: "Art. 22(3)", cobit: "DSS-02" },
  },
  {
    fiche: {
      code: "ACF-08",
      titleEn: "First Agent Dossier",
      titleFr: "Dossier Premier Agent",
      summaryEn: "Document, frame and prepare the deployment of your first agent",
      summaryFr: "Documenter, cadrer et préparer le déploiement de votre premier agent",
    },
    mapping: { "ai-act": "Art. 11-13 + 17", "iso-42001": "8.1 + 6.2", "nist-rmf": "MAP-2 + GOVERN-4", gdpr: "Art. 30 + 35", cobit: "BAI-01" },
  },
  {
    fiche: {
      code: "ACF-09",
      titleEn: "Agentic Decisions Register",
      titleFr: "Registre des Décisions Agentiques",
      summaryEn: "Log significant decisions and incidents to ensure traceability and compliance",
      summaryFr: "Journaliser les décisions importantes et les incidents pour garantir traçabilité et conformité",
    },
    mapping: { "ai-act": "Art. 12 + 19 + 26(6)", "iso-42001": "9.1 + 7.5.3", "nist-rmf": "MEASURE-2", gdpr: "Art. 30", cobit: "MEA-01" },
  },
  {
    fiche: {
      code: "ACF-10",
      titleEn: "Action Plan & Improvement",
      titleFr: "Plan d'action & Amélioration",
      summaryEn: "Steer corrective actions and continuous improvement of your agents",
      summaryFr: "Piloter les actions correctives et l'amélioration continue de vos agents",
    },
    mapping: { "ai-act": "Art. 9(4) + 17", "iso-42001": "10.1 + 10.2", "nist-rmf": "MANAGE-2", gdpr: "Art. 24 + 32", cobit: "BAI-08" },
  },
  {
    fiche: {
      code: "ACF-11",
      titleEn: "30-Day Governance Audit",
      titleFr: "Audit Gouvernance 30 jours",
      summaryEn: "Assess the maturity of your agentic governance and build a 30-day action plan",
      summaryFr: "Évaluer la maturité de votre gouvernance agentique et bâtir un plan d'action sur 30",
    },
    mapping: { "ai-act": "Art. 17 + 71", "iso-42001": "9.2 + 9.3", "nist-rmf": "GOVERN-5 + MANAGE-3.1", gdpr: "Art. 32", cobit: "MEA-02 + MEA-03" },
  },
  {
    fiche: {
      code: "ACF-12",
      titleEn: "Agentic Risk Assessment",
      titleFr: "Évaluation des Risques Agentiques",
      summaryEn: "Identify, assess and prioritize risks tied to your AI agents to control them more effectively",
      summaryFr: "Identifier, évaluer et prioriser les risques liés à vos agents IA pour mieux les maîtriser",
    },
    mapping: { "ai-act": "Art. 9", "iso-42001": "6.1.2", "nist-rmf": "MAP-3 + MAP-4", gdpr: "Art. 35", cobit: "APO-12" },
  },
  {
    fiche: {
      code: "ACF-13",
      titleEn: "Agent Mandate",
      titleFr: "Mandat d'Agent",
      summaryEn: "Define the scope, limits and responsibilities of every deployed agent",
      summaryFr: "Définir le périmètre, les limites et les responsabilités de chaque agent déployé",
    },
    mapping: { "ai-act": "Art. 16 + 17 + 26", "iso-42001": "5.3", "nist-rmf": "GOVERN-3 + GOVERN-6", gdpr: "Art. 28 + 24", cobit: "APO-05" },
  },
  {
    fiche: {
      code: "ACF-14",
      titleEn: "Responsibility by Design",
      titleFr: "Responsabilité par Design",
      summaryEn: "Responsibility by Design · embedding accountability from inception",
      summaryFr: "Responsibility by Design : concevoir la responsabilité dès l'origine",
    },
    mapping: { "ai-act": "Art. 5 + 13 + 16(b)", "iso-42001": "5.2", "nist-rmf": "GOVERN-1 + MANAGE-1", gdpr: "Art. 5(2) + 24 + 25", cobit: "EDM-01" },
  },
  {
    fiche: {
      code: "ACF-18",
      titleEn: "Guided Case Study",
      titleFr: "Cas Pratique Guidé",
      summaryEn: "Apply the ACF® framework to a real-world scenario, step by step",
      summaryFr: "Appliquer le framework ACF® à un scénario réel, étape par étape",
    },
    mapping: { "ai-act": "Art. 6 + 13", "iso-42001": "7.2 + 7.3", "nist-rmf": "MAP-2", gdpr: "Art. 22", cobit: "BAI-05" },
  },
  {
    fiche: {
      code: "ACF-19",
      titleEn: "Instructor's Guide",
      titleFr: "Guide Enseignant",
      summaryEn: "Facilitate, grade and evaluate agentic governance workshops",
      summaryFr: "Animer, corriger et évaluer des ateliers de gouvernance agentique",
    },
    mapping: { "ai-act": "Art. 4", "iso-42001": "7.2 + 7.3", "nist-rmf": "GOVERN-1.6 + GOVERN-6", gdpr: "Art. 39", cobit: "APO-07" },
  },
  {
    fiche: {
      code: "ACF-20",
      titleEn: "Governance Simulation",
      titleFr: "Simulation de Gouvernance",
      summaryEn: "Train to decide, arbitrate and supervise in real-world conditions",
      summaryFr: "S'entraîner à décider, arbitrer et superviser en situation réelle",
    },
    mapping: { "ai-act": "Art. 9 + 57-63", "iso-42001": "9.1 + 6.2", "nist-rmf": "MANAGE-3 + MEASURE-3", gdpr: "Art. 32", cobit: "BAI-06" },
  },
];
