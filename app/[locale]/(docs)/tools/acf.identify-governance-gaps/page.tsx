import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Tabs } from "@/components/Tabs";
import { ParamGroup, Param } from "@/components/Param";

const NODE_SAMPLE = `import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "acf-mcp"],
});
const client = new Client({ name: "demo", version: "1.0" }, {});
await client.connect(transport);

const result = await client.callTool({
  name: "acf.identify-governance-gaps",
  arguments: {
    current_inventory: {
      ai_systems_count: 14,
      high_risk_count: 2,
      gpai_used: true,
      shadow_ai_known: true,
    },
    current_processes: [
      { process: "ai_committee", exists: true, documented: true },
      { process: "executive_sponsor", exists: true, documented: true },
      { process: "ai_inventory", exists: true, documented: false },
      { process: "doctrine_published", exists: false },
      { process: "kill_switch_drill", exists: false },
      { process: "observability", exists: true, documented: false },
      { process: "ddao_appointed", exists: false },
      { process: "raci", exists: false },
      { process: "dpia", exists: false },
      { process: "article_49_register", exists: false },
      { process: "ai_act_qualification", exists: false },
      { process: "annual_audit", exists: true, documented: true },
      { process: "incident_review", exists: false },
    ],
    sector: "banking",
    locale: "en",
  },
});

console.log(JSON.stringify(result.content, null, 2));`;

const PYTHON_SAMPLE = `from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import asyncio, json

async def main():
    params = StdioServerParameters(command="npx", args=["-y", "acf-mcp"])
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            result = await session.call_tool(
                "acf.identify-governance-gaps",
                arguments={
                    "current_inventory": {
                        "ai_systems_count": 14,
                        "high_risk_count": 2,
                        "gpai_used": True,
                        "shadow_ai_known": True,
                    },
                    "current_processes": [
                        {"process": "ai_committee", "exists": True, "documented": True},
                        {"process": "executive_sponsor", "exists": True, "documented": True},
                        {"process": "ai_inventory", "exists": True, "documented": False},
                        {"process": "doctrine_published", "exists": False},
                        {"process": "kill_switch_drill", "exists": False},
                        {"process": "observability", "exists": True, "documented": False},
                        {"process": "ddao_appointed", "exists": False},
                        {"process": "raci", "exists": False},
                        {"process": "dpia", "exists": False},
                        {"process": "article_49_register", "exists": False},
                        {"process": "ai_act_qualification", "exists": False},
                        {"process": "annual_audit", "exists": True, "documented": True},
                        {"process": "incident_review", "exists": False},
                    ],
                    "sector": "banking",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "maturity_score": {
    "overall": 29,
    "by_principle": {
      "P1": 84,
      "P2": 1,
      "P3": 0,
      "P4": 30
    }
  },
  "gaps": [
    {
      "principle": "P1",
      "severity": "medium",
      "description": "Process 'ai_inventory' exists but is undocumented.",
      "remediation": "Document 'ai_inventory' with the relevant ACF® card.",
      "fiches": [
        "ACF-02"
      ],
      "estimated_effort_days": 2
    },
    {
      "principle": "P2",
      "severity": "medium",
      "description": "Process 'doctrine_published' is missing for P2.",
      "remediation": "Publish a doctrine note grounded in ACF® v1.0 to the relevant teams.",
      "fiches": [],
      "estimated_effort_days": 5
    },
    {
      "principle": "P2",
      "severity": "critical",
      "description": "Process 'ai_act_qualification' is missing for P2.",
      "remediation": "Run acf.classify-agent on each system to qualify under the AI Act.",
      "fiches": [],
      "estimated_effort_days": 5
    },
    {
      "principle": "P2",
      "severity": "critical",
      "description": "Process 'dpia' is missing for P2.",
      "remediation": "Stand up the DPIA workflow with ACF-12 as the template.",
      "fiches": [
        "ACF-12"
      ],
      "estimated_effort_days": 10
    },
    {
      "principle": "P3",
      "severity": "high",
      "description": "Process 'ddao_appointed' is missing for P3.",
      "remediation": "Appoint a DDAO per agent that decides on its own, with a documented mandate.",
      "fiches": [
        "ACF-13"
      ],
      "estimated_effort_days": 5
    },
    {
      "principle": "P3",
      "severity": "high",
      "description": "Process 'kill_switch_drill' is missing for P3.",
      "remediation": "Run a quarterly kill-switch drill per ACF-P7.",
      "fiches": [
        "ACF-07",
        "ACF-P7"
      ],
      "estimated_effort_days": 3
    },
    {
      "principle": "P4",
      "severity": "high",
      "description": "Process 'raci' is missing for P4.",
      "remediation": "Publish a RACI for agentic decisions including DDAO + DPO + CISO + sponsor.",
      "fiches": [],
      "estimated_effort_days": 5
    },
    {
      "principle": "P4",
      "severity": "medium",
      "description": "Process 'observability' exists but is undocumented.",
      "remediation": "Document 'observability' with the relevant ACF® card.",
      "fiches": [
        "ACF-06"
      ],
      "estimated_effort_days": 2
    },
    {
      "principle": "P4",
      "severity": "critical",
      "description": "Process 'article_49_register' is missing for P4.",
      "remediation": "Prepare the Article 49 register for any high-risk system before go-live.",
      "fiches": [
        "ACF-09",
        "ACF-12"
      ],
      "estimated_effort_days": 5
    },
    {
      "principle": "P4",
      "severity": "medium",
      "description": "Process 'incident_review' is missing for P4.",
      "remediation": "Open a quarterly incident review forum with the AI committee.",
      "fiches": [],
      "estimated_effort_days": 5
    },
    {
      "principle": "P1",
      "severity": "high",
      "description": "Shadow AI exists in the organisation.",
      "remediation": "Run a discovery campaign + classify each shadow agent via acf.classify-agent.",
      "fiches": [
        "ACF-02"
      ],
      "estimated_effort_days": 10
    },
    {
      "principle": "P2",
      "severity": "critical",
      "description": "High-risk systems present but no DPIA process.",
      "remediation": "Stand up the DPIA workflow before any new high-risk go-live.",
      "fiches": [
        "ACF-12"
      ],
      "estimated_effort_days": 5
    }
  ],
  "priority_order": [
    "P2: Process 'ai_act_qualification' is missing for P2.",
    "P2: Process 'dpia' is missing for P2.",
    "P4: Process 'article_49_register' is missing for P4.",
    "P2: High-risk systems present but no DPIA process.",
    "P3: Process 'ddao_appointed' is missing for P3.",
    "P3: Process 'kill_switch_drill' is missing for P3.",
    "P4: Process 'raci' is missing for P4.",
    "P1: Shadow AI exists in the organisation.",
    "P1: Process 'ai_inventory' exists but is undocumented.",
    "P2: Process 'doctrine_published' is missing for P2.",
    "P4: Process 'observability' exists but is undocumented.",
    "P4: Process 'incident_review' is missing for P4."
  ],
  "quick_wins": [
    "Process 'ai_inventory' exists but is undocumented.",
    "Process 'kill_switch_drill' is missing for P3.",
    "Process 'observability' exists but is undocumented."
  ],
  "confidence": "low",
  "assumptions": [
    "Coverage is unweighted across the 4 principles; sector-specific weights not yet calibrated."
  ],
  "gaps_to_validate": [
    "Confirm which gaps were inferred vs explicitly declared by your inventory.",
    "Run acf.classify-agent on the high-risk subset to consolidate the qualification."
  ],
  "requires_human_review": true,
  "rationale_per_rule": [
    {
      "rule_id": "identify-gaps.principle-checklist",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "13 processes evaluated"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "doctrine_signature": "ed25519:3R0oIiqL3Kgd…",
  "doctrine_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "regulatory_snapshot": "EU AI Act (Reg. 2024/1689, incl. Digital Omnibus deferral) + GDPR (Reg. 2016/679) + DORA (Reg. 2022/2554) + NIS2 (Dir. 2022/2555) + ISO 42001:2023: as of 2026-06-07",
  "generated_at": "2026-11-01T12:06:31.065Z",
  "disclaimer": "Preliminary qualification produced by the ACF® deterministic engine. Not legal advice. Human review required. Do not use for autonomous regulatory decision-making. See doctrine_archive_url for the version of the doctrine used."
}`;

export default async function IdentifyGapsToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.identify-governance-gaps"
      description={
        fr
          ? "Analyse d’écarts de gouvernance rattachée aux 4 principes ACF® : un inventaire et une liste de processus en entrée ; en sortie, un score de couverture par principe, une liste de gaps priorisés par sévérité, des quick wins et des actions de remédiation en sortie."
          : "Governance gap analysis tied to the 4 ACF® principles: an inventory and a process list in; out, a coverage score per principle, a list of gaps prioritised by severity, quick wins and remediation actions out."
      }
      badge="REASON"
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Analyse préliminaire. Le score de maturité repose sur une baseline
            <strong> non pondérée par secteur</strong>: un cabinet de gestion
            d’actifs et une mairie obtiennent la même calibration.{" "}
            <code>requires_human_review</code> vaut toujours <code>true</code>.
            Les gaps non déclarés explicitement par l’inventaire sont inférés,
            confirmez la distinction inféré / déclaré avant d’agir.
          </>
        ) : (
          <>
            Preliminary analysis. The maturity score rests on a baseline that is
            <strong> not weighted by sector</strong>: an asset manager and a
            municipality get the same calibration.{" "}
            <code>requires_human_review</code> is always <code>true</code>. Gaps
            not explicitly declared by the inventory are inferred, confirm the
            inferred / declared distinction before acting.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand vous devez répondre à la question board-level : « qu’est-ce qu’ACF® dit qu’on devrait avoir, et qu’on n’a pas ? ». Il prend un inventaire IA (nombre de systèmes, high-risk, GPAI, shadow AI connue) et une liste de processus de gouvernance avec leur statut (existe / documenté), il rend un score de couverture pour chacun des 4 principes (P1 Souveraineté décisionnelle, P2 Gouvernance par conception, P3 Contrôle humain ultime, P4 Responsabilité traçable) et la liste priorisée des trous à combler."
          : "Use this tool when you must answer the board-level question: “what does ACF® say we should have that we don’t?”. It takes an AI inventory (count of systems, high-risk, GPAI, known shadow AI) and a list of governance processes with their status (exists / documented), returns a coverage score for each of the 4 principles (P1 Decision Sovereignty, P2 Governance by Design, P3 Ultimate Human Control, P4 Traceable Accountability) and the prioritised list of gaps to close."}
      </p>
      <p>
        {fr
          ? "C’est l’outil d’audit. Il sert à cadrer une feuille de route, à prioriser un budget de gouvernance IA, ou à préparer une revue de comité IA. Les premiers résultats sont conçus pour entrer dans une fiche ACF-10 (Plan d’action & Amélioration)."
          : "It is the audit tool. It serves to scope a roadmap, prioritise an AI governance budget, or prepare an AI committee review. First results are designed to land in an ACF-10 (Action Plan & Improvement) card."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Deux blocs obligatoires (inventaire + processus), deux champs contextuels optionnels."
          : "Two required blocks (inventory + processes), two optional context fields."}
      </p>
      <ParamGroup>
        <Param
          name="current_inventory"
          type="{ ai_systems_count, high_risk_count?, gpai_used?, shadow_ai_known? }"
          required
        >
          {fr
            ? "Photo de l’inventaire IA : nombre total de systèmes, nombre marqué high-risk, présence de GPAI, présence connue de shadow AI. Tout sauf ai_systems_count est optionnel, l’outil distingue absent vs déclaré."
            : "Snapshot of the AI inventory: total system count, high-risk count, GPAI presence, known shadow AI presence. Everything except ai_systems_count is optional, the tool distinguishes absent vs declared."}
        </Param>
        <Param
          name="current_processes"
          type="{ process: string, exists: boolean, documented?: boolean }[]"
          required
        >
          {fr
            ? "Liste des processus de gouvernance évalués. Processus reconnus : ai_committee, executive_sponsor, ai_inventory, doctrine_published, kill_switch_drill, observability, ddao_appointed, raci, dpia, article_49_register, ai_act_qualification, annual_audit, incident_review."
            : "List of evaluated governance processes. Recognised processes: ai_committee, executive_sponsor, ai_inventory, doctrine_published, kill_switch_drill, observability, ddao_appointed, raci, dpia, article_49_register, ai_act_qualification, annual_audit, incident_review."}
        </Param>
        <Param name="sector" type="string (≤80)">
          {fr
            ? "Secteur de l’organisation. Stocké pour traçabilité, pas encore utilisé pour pondérer le score (cf. assumptions)."
            : "Organisation’s sector. Stored for traceability, not yet used to weight the score (cf. assumptions)."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue de la sortie textuelle."
            : "Language of the textual output."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Score de couverture (global et par principe), liste des gaps, ordre de priorité, quick wins, pied-de-page signé."
          : "Coverage score (overall and per principle), gap list, priority order, quick wins, signed footer."}
      </p>
      <ParamGroup>
        <Param
          name="maturity_score"
          type='{ overall: number, by_principle: Record<"P1" | "P2" | "P3" | "P4", number> }'
        >
          {fr
            ? "Score global 0-100 et score par principe (P1 à P4). Chaque processus attendu est rattaché au principe qu’il sert : P1 inventaire, comité IA, sponsor ; P2 doctrine publiée, qualification AI Act, AIPD ; P3 DDAO nommé, test du kill switch ; P4 RACI, observabilité, registre art. 49, audit annuel, revue d’incidents."
            : "Overall 0-100 score and per-principle score (P1 to P4). Each expected process is tied to the principle it serves: P1 inventory, AI committee, sponsor; P2 published doctrine, AI Act qualification, DPIA; P3 appointed DDAO, kill switch drill; P4 RACI, observability, Art. 49 register, annual audit, incident review."}
        </Param>
        <Param
          name="gaps"
          type='{ principle, severity: "low"|"medium"|"high"|"critical", description, remediation, fiches, estimated_effort_days }[]'
        >
          {fr
            ? "Liste détaillée des écarts identifiés, chacun avec son principe, sa sévérité, sa remédiation, les fiches associées et l’effort estimé en jours."
            : "Detailed list of identified gaps, each with its principle, severity, remediation, related fiches and effort estimate in days."}
        </Param>
        <Param name="priority_order" type="string[]">
          {fr
            ? "Description des gaps triée par sévérité (critical → low), directement utilisable comme ordre du jour de comité."
            : "Gap descriptions sorted by severity (critical → low), directly usable as a committee agenda."}
        </Param>
        <Param name="quick_wins" type="string[]">
          {fr
            ? "Gaps remédiables en ≤ 3 jours d’effort, utiles pour démarrer un sprint de gouvernance."
            : "Gaps remediable in ≤ 3 effort-days, useful to kick off a governance sprint."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Confiance globale de l’analyse."
            : "Global confidence of the analysis."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèses explicites, notamment la non-pondération sectorielle."
            : "Explicit assumptions, notably the lack of sector weighting."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Points à confirmer en revue humaine, dont la distinction inféré / déclaré et le sous-ensemble high-risk."
            : "Points to confirm in human review, including the inferred / declared distinction and the high-risk subset."}
        </Param>
        <Param
          name="rationale_per_rule"
          type='{ rule_id, rule_version, fired, evidence }[]'
        >
          {fr
            ? "Trace de la règle déclenchée avec le nombre de processus évalués."
            : "Trace of the fired rule with the number of processes evaluated."}
        </Param>
        <Param name="requires_human_review" type="true">
          {fr
            ? "Constant. Aucun appel ne le retourne false."
            : "Constant. No call returns false."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "Une banque avec 14 systèmes IA dont 2 high-risk, GPAI utilisé, shadow AI connue :"
          : "A bank with 14 AI systems including 2 high-risk, GPAI used, known shadow AI:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock
                code={NODE_SAMPLE}
                language="typescript"
                filename="identify-governance-gaps.ts"
              />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock
                code={PYTHON_SAMPLE}
                language="python"
                filename="identify_governance_gaps.py"
              />
            ),
          },
        ]}
      />

      <h3 id="example-response">{fr ? "Réponse" : "Response"}</h3>
      <CodeBlock code={RESPONSE_SAMPLE} language="json" filename="response.json" />

      <h2 id="errors">{fr ? "Erreurs courantes" : "Common errors"}</h2>
      <ul>
        <li>
          {fr
            ? "Paramètres invalides : ai_systems_count négatif ou non entier, ou élément de current_processes sans process ou sans exists. L’appel échoue avec une erreur JSON-RPC dont le message liste les champs en cause."
            : "Invalid parameters: negative or non-integer ai_systems_count, or a current_processes item without process or exists. The call fails with a JSON-RPC error whose message lists the offending fields."}
        </li>
        <li>
          {fr
            ? "Confiance basse : quand peu de champs de contexte sont fournis, confidence vaut low et assumptions dit ce qui a été supposé. Complétez l’entrée avant de vous appuyer sur le résultat."
            : "Low confidence: when few context fields are provided, confidence is low and assumptions states what was assumed. Complete the input before relying on the result."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools/acf.classify-agent" : "/tools/acf.classify-agent"}>
            <code>acf.classify-agent</code>
          </a>
          {": "}
          {fr
            ? "qualifier chaque système identifié comme high-risk pour consolider le panorama de gouvernance."
            : "qualify each system identified as high-risk to consolidate the governance landscape."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.advisor" : "/tools/acf.advisor"}>
            <code>acf.advisor</code>
          </a>
          {": "}
          {fr
            ? "redescendre du score de maturité organisationnel à un cas unitaire quand un gap mérite focus."
            : "drop from the organisational maturity score back to a single case when a gap deserves focus."}
        </li>
        <li>
          <a
            href={
              fr
                ? "/fr/tools/acf.map-ai-act-obligations"
                : "/tools/acf.map-ai-act-obligations"
            }
          >
            <code>acf.map-ai-act-obligations</code>
          </a>
          {": "}
          {fr
            ? "obtenir les obligations exhaustives à inscrire dans le plan de remédiation pour les systèmes high-risk."
            : "get the exhaustive obligations to inscribe in the remediation plan for high-risk systems."}
        </li>
      </ul>
    </DocsPage>
  );
}
