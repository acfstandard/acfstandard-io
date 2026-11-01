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
  name: "acf.assign-ddao-controls",
  arguments: {
    agent_description:
      "Autonomous procurement agent that places purchase orders up to 50k EUR against pre-approved suppliers and writes the result to SAP.",
    autonomy_level: "supervised_autonomous",
    risk_level: "high",
    budget_constraint: "standard",
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
                "acf.assign-ddao-controls",
                arguments={
                    "agent_description": (
                        "Autonomous procurement agent that places purchase orders "
                        "up to 50k EUR against pre-approved suppliers and writes "
                        "the result to SAP."
                    ),
                    "autonomy_level": "supervised_autonomous",
                    "risk_level": "high",
                    "budget_constraint": "standard",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "recommended_controls": [
    {
      "title": "Formal agent mandate",
      "description": "Mandate document signed by DDAO defining decision perimeter, escalation thresholds and kill switch.",
      "owner_role": "ddao",
      "frequency": "quarterly",
      "evidence_artifact": "agent-mandate.pdf"
    },
    {
      "title": "Kill switch quarterly drill",
      "description": "Test the agent freeze/redirect/revoke path on a non-production replay every quarter.",
      "owner_role": "ciso",
      "frequency": "quarterly",
      "evidence_artifact": "drill-report.pdf"
    },
    {
      "title": "Decision register",
      "description": "Immutable timestamped log of every decision with structured inputs, output, doctrine version.",
      "owner_role": "ddao",
      "frequency": "on_event",
      "evidence_artifact": "decision-register.jsonl"
    },
    {
      "title": "Quarterly risk review",
      "description": "Review of risk profile, drift metrics and incidents over the quarter.",
      "owner_role": "ddao",
      "frequency": "quarterly",
      "evidence_artifact": "risk-review-minutes.pdf"
    }
  ],
  "ddao_controls": [
    {
      "control_id": "ACF-CTRL-101",
      "control_type": "preventive",
      "fiche_reference": "ACF-13",
      "implementation_note": "Mandate templates calibrated by sector; review frequency tied to criticality."
    },
    {
      "control_id": "ACF-CTRL-102",
      "control_type": "corrective",
      "fiche_reference": "ACF-07",
      "implementation_note": "Kill switch with 3 levels: freeze (instant), redirect (≤5min), revoke (≤1h)."
    },
    {
      "control_id": "ACF-CTRL-103",
      "control_type": "detective",
      "fiche_reference": "ACF-09",
      "implementation_note": "Decision register format aligned with Article 49 register for high-risk systems."
    }
  ],
  "total_count": 7,
  "estimated_total_effort_days": 7,
  "ddao_summary": "Control set scoped to ACF® supervised_autonomous / risk=high (4 recommended controls, 3 ACF-canonical controls).",
  "confidence": "medium",
  "assumptions": [
    "Controls are derived from the canonical level × risk mapping; sector-specific overrides not applied in V1.0."
  ],
  "gaps_to_validate": [
    "Confirm DDAO availability for the proposed escalation cadence.",
    "Confirm evidence-storage location for each control before go-live."
  ],
  "requires_human_review": true,
  "rationale_per_rule": [
    {
      "rule_id": "ddao-controls-mapping.supervised_autonomous-high",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "level=supervised_autonomous, risk=high"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "doctrine_signature": "ed25519:3R0oIiqL3Kgd…",
  "doctrine_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "regulatory_snapshot": "EU AI Act (Reg. 2024/1689, incl. Digital Omnibus deferral) + GDPR (Reg. 2016/679) + DORA (Reg. 2022/2554) + NIS2 (Dir. 2022/2555) + ISO 42001:2023: as of 2026-06-07",
  "generated_at": "2026-11-01T12:06:31.046Z",
  "disclaimer": "Preliminary qualification produced by the ACF® deterministic engine. Not legal advice. Human review required. Do not use for autonomous regulatory decision-making. See doctrine_archive_url for the version of the doctrine used."
}`;

export default async function AssignDdaoControlsToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.assign-ddao-controls"
      description={
        fr
          ? "Jeu de contrôles ACF® calé sur le niveau d’autonomie et la classe de risque d’un agent, double vocabulaire (recommended_controls en langage métier + ddao_controls canoniques), effort estimé en jours et propriétaires identifiés."
          : "ACF® control set scoped to an agent’s autonomy level and risk class, dual vocabulary (plain-English recommended_controls + canonical ddao_controls), estimated effort in days, and identified owners."
      }
      badge="REASON"
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            La sortie distingue volontairement <code>recommended_controls</code> (langage
            métier pour le sponsor et l’audit) de <code>ddao_controls</code> (vocabulaire
            canonique ACF® pour le DDAO). Cette dualité est ce qui rend l’assignation
            lisible en interne ET défendable en externe.
            <code>requires_human_review</code> reste constant, le DDAO valide la cadence
            réelle avant tout commit.
          </>
        ) : (
          <>
            The output deliberately splits <code>recommended_controls</code> (business
            language for sponsor and audit) from <code>ddao_controls</code> (canonical
            ACF® vocabulary for the DDAO). This duality is what makes the assignment
            legible internally AND defensible externally.{" "}
            <code>requires_human_review</code> stays constant, the DDAO validates the
            actual cadence before any commit.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un agent a déjà un niveau d’autonomie déléguée (autonomy_level) et un score de criticité (risk_level), et qu’il faut maintenant la liste exacte des contrôles à imposer, quelles kill switches, quels seuils d’escalade, quels logs, qui possède chaque contrôle, à quelle fréquence il s’exécute. C’est l’étape qui transforme une qualification en plan opérationnel."
          : "Use this tool when an agent already has a delegated autonomy level (autonomy_level) and a criticality score (risk_level), and you now need the exact list of controls to enforce, what kill switches, what escalation thresholds, what logs, who owns each control, at what cadence it runs. This is the step that turns a qualification into an operational plan."}
      </p>
      <p>
        {fr
          ? "La question board que la sortie tranche : « Combien ça coûte en jours-DDAO, et qui fait quoi ? » L’estimated_total_effort_days donne un ordre de grandeur défendable devant un sponsor financier ; la dualité recommended/ddao évite la confusion vocabulaire entre l’équipe métier et le DDAO."
          : "The board-level question the output answers: “How many DDAO-days does it cost, and who does what?” The estimated_total_effort_days gives a defensible order of magnitude for a financial sponsor; the recommended/ddao duality avoids vocabulary confusion between the business team and the DDAO."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Cinq champs, dont trois obligatoires. Le autonomy_level et le risk_level doivent déjà avoir été tranchés en amont (typiquement par acf.classify-agent ou acf.assess-autonomy)."
          : "Five fields, three required. The autonomy_level and risk_level must already be settled upstream (typically by acf.classify-agent or acf.assess-autonomy)."}
      </p>
      <ParamGroup>
        <Param name="agent_description" type="string (10-500)" required>
          {fr
            ? "Description courte de l’agent. Sert au DDAO summary et au rationale, ne pilote pas le choix des contrôles (c’est level × risk qui le fait)."
            : "Short agent description. Used in the DDAO summary and rationale; does not drive the control selection (that is driven by level × risk)."}
        </Param>
        <Param name="autonomy_level" type='"suggestive" | "co_decision" | "supervised_autonomous" | "autonomous"' required>
          {fr
            ? "Niveau d’autonomie déléguée pour la décision : suggestif (l’agent suggère, un humain décide), co-décision (l’agent propose, un humain valide), autonome supervisé (l’agent décide sous supervision), autonome (l’agent décide seul dans son mandat). Pilote la sévérité du jeu de contrôles. Renommé depuis acf_level en 2.0.0."
            : "Delegated autonomy level for the decision: suggestive, i.e. advisory (the agent suggests, a human decides), co-decision (the agent proposes, a human validates), supervised autonomous (the agent decides under supervision), autonomous (the agent decides alone within its mandate). Drives the severity of the control set. Renamed from acf_level in 2.0.0."}
        </Param>
        <Param
          name="risk_level"
          type='"low" | "medium" | "high" | "critical"'
          required
        >
          {fr
            ? "Classe de risque issue de la Matrice de Criticité (ACF-03). Combinée à autonomy_level, elle détermine la cellule de mapping."
            : "Risk class from the Criticality Matrix (ACF-03). Combined with autonomy_level, it determines the mapping cell."}
        </Param>
        <Param
          name="budget_constraint"
          type='"minimal" | "standard" | "comprehensive"'
        >
          {fr
            ? "Contrainte budgétaire. minimal = on garde les deux premiers contrôles (kill switch + log) ; standard = jeu canonique complet ; comprehensive = jeu canonique complet sans coupe."
            : "Budget constraint. minimal = keep the first two controls (kill switch + log); standard = full canonical set; comprehensive = full canonical set, no trim."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue de la sortie textuelle (titres de contrôles, summary)."
            : "Language of the textual output (control titles, summary)."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "La sortie est un objet structuré contenant deux listes parallèles de contrôles, l’effort estimé total et un résumé prêt à coller dans le mandat (ACF-13)."
          : "The output is a structured object containing two parallel control lists, the total estimated effort, and a summary ready to paste into the mandate (ACF-13)."}
      </p>
      <ParamGroup>
        <Param name="recommended_controls" type="RecommendedControl[]">
          {fr
            ? "Contrôles en langage métier, id, title, description, owner, frequency (one_time / monthly / quarterly / annual / on_event), evidence_storage. Coupés à 2 si budget_constraint = minimal."
            : "Controls in business language, id, title, description, owner, frequency (one_time / monthly / quarterly / annual / on_event), evidence_storage. Trimmed to 2 if budget_constraint = minimal."}
        </Param>
        <Param name="ddao_controls" type="string[]">
          {fr
            ? "Mêmes contrôles en vocabulaire canonique ACF®, codes ACF-CTRL-XXX, chacun rattaché à sa fiche de référence. Format prêt à coller dans le mandat (ACF-13)."
            : "Same controls in canonical ACF® vocabulary, codes ACF-CTRL-XXX, each tied to its reference card. Ready to paste into the mandate (ACF-13)."}
        </Param>
        <Param name="total_count" type="number">
          {fr
            ? "Total de contrôles toutes listes confondues (recommended + ddao)."
            : "Total controls across both lists (recommended + ddao)."}
        </Param>
        <Param name="estimated_total_effort_days" type="number">
          {fr
            ? "Effort cumulé en jours-personne basé sur la fréquence de chaque contrôle (one_time=5, monthly=1, quarterly=2, annual=4, on_event=1)."
            : "Cumulative person-days based on each control’s frequency (one_time=5, monthly=1, quarterly=2, annual=4, on_event=1)."}
        </Param>
        <Param name="ddao_summary" type="string">
          {fr
            ? "Phrase de synthèse prête à coller dans le mandat (ACF-13) signé par le DDAO."
            : "Summary sentence ready to paste into the mandate (ACF-13) signed by the DDAO."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Niveau de confiance global. High dès que (level, risk) est dans la matrice canonique sans contradiction."
            : "Global confidence level. High whenever (level, risk) is in the canonical matrix with no contradiction."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèses explicites, en V1.0, pas de surcharge sectorielle (un agent bancaire hérite des mêmes contrôles qu’un agent de e-commerce pour le même couple niveau/risque)."
            : "Explicit assumptions: V1.0 does not yet apply sector-specific overrides (a banking agent inherits the same controls as an e-commerce agent for the same level/risk pair)."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Trous à valider par le DDAO, disponibilité réelle pour la cadence proposée, lieu de stockage des preuves."
            : "Gaps for the DDAO to validate, actual availability for the proposed cadence, evidence-storage location."}
        </Param>
        <Param name="requires_human_review" type="true">
          {fr
            ? "Constant. Aucun appel ne retourne false."
            : "Constant. No call returns false."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "Un agent d’achats en autonomie supervisée, plafonné à 50k EUR, criticité haute :"
          : "A supervised autonomous procurement agent capped at 50k EUR, high criticality:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock
                code={NODE_SAMPLE}
                language="typescript"
                filename="assign-controls.ts"
              />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock
                code={PYTHON_SAMPLE}
                language="python"
                filename="assign_controls.py"
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
            ? "Paramètres invalides : autonomy_level hors des 4 niveaux (suggestive, co_decision, supervised_autonomous, autonomous), y compris l’ancien acf_level N0..N3, ou risk_level hors low / medium / high / critical. L’appel échoue avec une erreur JSON-RPC dont le message liste les champs en cause."
            : "Invalid parameters: autonomy_level outside the 4 levels (suggestive, co_decision, supervised_autonomous, autonomous), including the former acf_level N0..N3, or risk_level outside low / medium / high / critical. The call fails with a JSON-RPC error whose message lists the offending fields."}
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
            ? "obtenir autonomy_level + risk_level en amont, en un seul appel."
            : "obtain autonomy_level + risk_level upstream, in a single call."}
        </li>
        <li>
          <a
            href={
              fr
                ? "/fr/tools/acf.evaluate-agent-mandate"
                : "/tools/acf.evaluate-agent-mandate"
            }
          >
            <code>acf.evaluate-agent-mandate</code>
          </a>
          {": "}
          {fr
            ? "vérifier que les contrôles assignés sont bien repris dans le mandat avant sign-off DDAO."
            : "verify that the assigned controls are actually carried into the mandate before DDAO sign-off."}
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
            ? "croiser les contrôles avec les obligations AI Act applicables pour éviter les doublons et les trous."
            : "cross-check controls against applicable AI Act obligations to avoid duplicates and gaps."}
        </li>
      </ul>
    </DocsPage>
  );
}
