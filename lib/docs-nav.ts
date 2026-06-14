export type NavItem = {
  title: { en: string; fr: string };
  href: string;
  badge?: string;
};

export type NavGroup = {
  title: { en: string; fr: string };
  items: NavItem[];
};

export const docsNav: NavGroup[] = [
  {
    title: { en: "For executives", fr: "Pour dirigeants" },
    items: [
      {
        title: { en: "Why ACF in 90 s", fr: "Pourquoi ACF en 90 s" },
        href: "/why-acf",
        badge: "EXEC",
      },
    ],
  },
  {
    title: { en: "Sovereignty Score™", fr: "Sovereignty Score™" },
    items: [
      {
        title: { en: "Overview", fr: "Vue d’ensemble" },
        href: "/sovereignty-score",
        badge: "KPI",
      },
      {
        title: { en: "Calculate", fr: "Calculer" },
        href: "/sovereignty-score/calculate",
        badge: "TOOL",
      },
      {
        title: { en: "Sovereignty Index", fr: "Sovereignty Index" },
        href: "/sovereignty-index",
        badge: "Q4 26",
      },
    ],
  },
  {
    title: { en: "Get started", fr: "Démarrer" },
    items: [
      {
        title: { en: "Introduction", fr: "Introduction" },
        href: "/docs/introduction",
      },
      {
        title: { en: "Quickstart", fr: "Démarrage rapide" },
        href: "/docs/quickstart",
      },
      {
        title: { en: "Architecture", fr: "Architecture" },
        href: "/docs/architecture",
      },
      {
        title: { en: "Configuration", fr: "Configuration" },
        href: "/docs/configuration",
      },
      {
        title: { en: "Authentication", fr: "Authentification" },
        href: "/docs/authentication",
        badge: "HTTP",
      },
      {
        title: { en: "Errors", fr: "Erreurs" },
        href: "/docs/errors",
      },
      {
        title: { en: "FAQ", fr: "FAQ" },
        href: "/docs/faq",
      },
    ],
  },
  {
    title: { en: "Tools reference", fr: "Référence des outils" },
    items: [
      { title: { en: "Overview", fr: "Vue d’ensemble" }, href: "/tools" },
      { title: { en: "acf.advisor", fr: "acf.advisor" }, href: "/tools/acf.advisor", badge: "REASON" },
      { title: { en: "acf.classify-agent", fr: "acf.classify-agent" }, href: "/tools/acf.classify-agent", badge: "REASON" },
      { title: { en: "acf.assess-autonomy", fr: "acf.assess-autonomy" }, href: "/tools/acf.assess-autonomy", badge: "REASON" },
      { title: { en: "acf.identify-governance-gaps", fr: "acf.identify-governance-gaps" }, href: "/tools/acf.identify-governance-gaps", badge: "REASON" },
      { title: { en: "acf.map-ai-act-obligations", fr: "acf.map-ai-act-obligations" }, href: "/tools/acf.map-ai-act-obligations", badge: "REASON" },
      { title: { en: "acf.assign-ddao-controls", fr: "acf.assign-ddao-controls" }, href: "/tools/acf.assign-ddao-controls", badge: "REASON" },
      { title: { en: "acf.evaluate-agent-mandate", fr: "acf.evaluate-agent-mandate" }, href: "/tools/acf.evaluate-agent-mandate", badge: "REASON" },
      { title: { en: "acf.search", fr: "acf.search" }, href: "/tools/acf.search", badge: "READ" },
      { title: { en: "acf.fiche.lookup", fr: "acf.fiche.lookup" }, href: "/tools/acf.fiche.lookup", badge: "READ" },
      { title: { en: "acf.regulation.article", fr: "acf.regulation.article" }, href: "/tools/acf.regulation.article", badge: "READ" },
      { title: { en: "acf.glossary.define", fr: "acf.glossary.define" }, href: "/tools/acf.glossary.define", badge: "READ" },
      { title: { en: "acf.cite", fr: "acf.cite" }, href: "/tools/acf.cite", badge: "READ" },
    ],
  },
  {
    title: { en: "Resources", fr: "Ressources" },
    items: [
      { title: { en: "Overview", fr: "Vue d’ensemble" }, href: "/resources" },
      {
        title: { en: "Doctrine", fr: "Doctrine" },
        href: "/resources/doctrine",
      },
      { title: { en: "Fiches", fr: "Fiches" }, href: "/resources/fiches" },
      {
        title: { en: "Regulator guides", fr: "Guides régulateurs" },
        href: "/resources/regulators",
      },
      {
        title: { en: "Reference", fr: "Référence" },
        href: "/resources/reference",
      },
    ],
  },
  {
    title: { en: "Doctrine", fr: "Doctrine" },
    items: [
      {
        title: { en: "4 principles", fr: "4 principes" },
        href: "/doctrine/principles",
      },
      {
        title: { en: "4 layers", fr: "4 couches" },
        href: "/doctrine/layers",
      },
      {
        title: { en: "N0–N3 autonomy", fr: "Autonomie N0–N3" },
        href: "/doctrine/autonomy-levels",
      },
      {
        title: { en: "DDAO role", fr: "Rôle DDAO" },
        href: "/doctrine/ddao",
      },
      {
        title: { en: "Kill switch", fr: "Kill switch" },
        href: "/doctrine/kill-switch",
      },
      {
        title: { en: "17 fiches", fr: "17 fiches" },
        href: "/doctrine/17-fiches",
      },
    ],
  },
  {
    title: { en: "Standards mapping", fr: "Correspondances standards" },
    items: [
      {
        title: { en: "17×5 matrix", fr: "Matrice 17×5" },
        href: "/mappings",
        badge: "MATRIX",
      },
      {
        title: { en: "EU AI Act", fr: "EU AI Act" },
        href: "/mappings/ai-act",
      },
      {
        title: { en: "ISO/IEC 42001", fr: "ISO/IEC 42001" },
        href: "/mappings/iso-42001",
      },
      {
        title: { en: "NIST AI RMF", fr: "NIST AI RMF" },
        href: "/mappings/nist-ai-rmf",
      },
      { title: { en: "GDPR", fr: "RGPD" }, href: "/mappings/gdpr" },
      {
        title: { en: "COBIT 2019", fr: "COBIT 2019" },
        href: "/mappings/cobit",
      },
    ],
  },
  {
    title: { en: "Signatures", fr: "Signatures" },
    items: [
      { title: { en: "Overview", fr: "Vue d’ensemble" }, href: "/signatures" },
      {
        title: { en: "Verify in Node.js", fr: "Vérifier en Node.js" },
        href: "/signatures/verify-node",
      },
      {
        title: { en: "Verify in Python", fr: "Vérifier en Python" },
        href: "/signatures/verify-python",
      },
      {
        title: { en: "Verify in Go", fr: "Vérifier en Go" },
        href: "/signatures/verify-go",
      },
      {
        title: { en: "Public key history", fr: "Historique des clés" },
        href: "/signatures/public-key",
      },
    ],
  },
  {
    title: { en: "Integrations", fr: "Intégrations" },
    items: [
      {
        title: { en: "Claude Desktop", fr: "Claude Desktop" },
        href: "/integrations/claude-desktop",
      },
      { title: { en: "Cursor", fr: "Cursor" }, href: "/integrations/cursor" },
      {
        title: { en: "Windsurf", fr: "Windsurf" },
        href: "/integrations/windsurf",
      },
      {
        title: { en: "Continue", fr: "Continue" },
        href: "/integrations/continue",
      },
      { title: { en: "Zed", fr: "Zed" }, href: "/integrations/zed" },
      {
        title: { en: "Custom MCP client", fr: "Client MCP custom" },
        href: "/integrations/custom-mcp-client",
      },
    ],
  },
];

export function flattenDocsNav(): NavItem[] {
  return docsNav.flatMap((g) => g.items);
}

export function findAdjacent(href: string): { prev: NavItem | null; next: NavItem | null } {
  const items = flattenDocsNav();
  const idx = items.findIndex((item) => item.href === href);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? items[idx - 1] : null,
    next: idx < items.length - 1 ? items[idx + 1] : null,
  };
}
