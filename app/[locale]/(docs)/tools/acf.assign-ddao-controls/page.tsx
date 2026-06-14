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
    acf_level: "N2",
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
                    "acf_level": "N2",
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
      "id": "REC-KILL-01",
      "title": "Per-supplier kill switch",
      "description": "Operations can suspend orders to any supplier within 5 minutes, no DDAO escalation required.",
      "owner": "Procurement Ops",
      "frequency": "on_event",
      "evidence_storage": "ACF-07 register"
    },
    {
      "id": "REC-CAP-02",
      "title": "Hard per-order cap at 50k EUR",
      "description": "Any order > 50k EUR is rejected at the agent layer; > 25k requires DDAO co-sign.",
      "owner": "Finance + DDAO",
      "frequency": "on_event",
      "evidence_storage": "ACF-09 escalation log"
    },
    {
      "id": "REC-DRIFT-03",
      "title": "Monthly drift review of supplier mix",
      "description": "Alert if any supplier exceeds 30% of monthly volume vs trailing 6-month baseline.",
      "owner": "DDAO",
      "frequency": "monthly",
      "evidence_storage": "Drift dashboard + DDAO minutes"
    },
    {
      "id": "REC-LOG-04",
      "title": "Signed decision register",
      "description": "Every order decision logged with input, supplier choice, rationale, and ed25519 signature.",
      "owner": "Platform team",
      "frequency": "on_event",
      "evidence_storage": "ACF-08 register, 6-month retention"
    },
    {
      "id": "REC-DRILL-05",
      "title": "Quarterly kill-switch drill",
      "description": "Simulate a supplier compromise; verify orders are halted in < 5 minutes.",
      "owner": "Procurement Ops + DDAO",
      "frequency": "quarterly",
      "evidence_storage": "ACF-07 drill report"
    }
  ],
  "ddao_controls": [
    "C-AUTONOMY-02 — N2 gating: orders 25k-50k EUR require DDAO co-sign before SAP write",
    "C-LOG-03 — Signed decision register branched to ACF-08, 6-month retention",
    "C-KILL-01 — Per-supplier kill switch, response time ≤ 5 min, drilled quarterly",
    "C-DRIFT-02 — Monthly drift dashboard for supplier mix",
    "C-ESC-04 — DDAO escalation on any single order > 25k EUR or supplier concentration > 30%"
  ],
  "total_count": 10,
  "estimated_total_effort_days": 9,
  "ddao_summary": "Control set scoped to ACF® N2 / risk=high (5 recommended controls, 5 ACF-canonical controls).",
  "confidence": "high",
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
      "rule_id": "ddao-mapping.N2-high",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "level=N2, risk=high"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "regulatory_snapshot": "EU AI Act 2024/1689 · GDPR 2016/679 · ISO 42001:2023 · NIST AI RMF 1.0 · COBIT 2019 — frozen 2026-06",
  "generated_at": "2026-06-14T12:03:47.501Z",
  "disclaimer": "Preliminary qualification only — not legal advice. Human review required."
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
          ? "Jeu de contrôles ACF® calé sur le niveau d’autonomie et la classe de risque d’un agent — double vocabulaire (recommended_controls en langage métier + ddao_controls canoniques), effort estimé en jours et propriétaires identifiés."
          : "ACF® control set scoped to an agent’s autonomy level and risk class — dual vocabulary (plain-English recommended_controls + canonical ddao_controls), estimated effort in days, and identified owners."
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
            <code>requires_human_review</code> reste constant — le DDAO valide la cadence
            réelle avant tout commit.
          </>
        ) : (
          <>
            The output deliberately splits <code>recommended_controls</code> (business
            language for sponsor and audit) from <code>ddao_controls</code> (canonical
            ACF® vocabulary for the DDAO). This duality is what makes the assignment
            legible internally AND defensible externally.{" "}
            <code>requires_human_review</code> stays constant — the DDAO validates the
            actual cadence before any commit.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un agent a déjà une qualification ACF® (acf_level) et un score de criticité (risk_level), et qu’il faut maintenant la liste exacte des contrôles à imposer — quelles kill switches, quels seuils d’escalade, quels logs, qui possède chaque contrôle, à quelle fréquence il s’exécute. C’est l’étape qui transforme une qualification en plan opérationnel."
          : "Use this tool when an agent already has an ACF® qualification (acf_level) and a criticality score (risk_level), and you now need the exact list of controls to enforce — what kill switches, what escalation thresholds, what logs, who owns each control, at what cadence it runs. This is the step that turns a qualification into an operational plan."}
      </p>
      <p>
        {fr
          ? "La question board que la sortie tranche : « Combien ça coûte en jours-DDAO, et qui fait quoi ? » L’estimated_total_effort_days donne un ordre de grandeur défendable devant un sponsor financier ; la dualité recommended/ddao évite la confusion vocabulaire entre l’équipe métier et le DDAO."
          : "The board-level question the output answers: “How many DDAO-days does it cost, and who does what?” The estimated_total_effort_days gives a defensible order of magnitude for a financial sponsor; the recommended/ddao duality avoids vocabulary confusion between the business team and the DDAO."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Cinq champs, dont trois obligatoires. Le acf_level et le risk_level doivent déjà avoir été tranchés en amont (typiquement par acf.classify-agent ou acf.assess-autonomy)."
          : "Five fields, three required. The acf_level and risk_level must already be settled upstream (typically by acf.classify-agent or acf.assess-autonomy)."}
      </p>
      <ParamGroup>
        <Param name="agent_description" type="string (10-500)" required>
          {fr
            ? "Description courte de l’agent. Sert au DDAO summary et au rationale, ne pilote pas le choix des contrôles (c’est level × risk qui le fait)."
            : "Short agent description. Used in the DDAO summary and rationale; does not drive the control selection (that is driven by level × risk)."}
        </Param>
        <Param name="acf_level" type='"N0" | "N1" | "N2" | "N3"' required>
          {fr
            ? "Niveau d’autonomie ACF®. N0 = observation pure, N1 = assisté, N2 = délégué borné, N3 = autonome. Pilote la sévérité du jeu de contrôles."
            : "ACF® autonomy level. N0 = pure observation, N1 = assisted, N2 = bounded delegation, N3 = autonomous. Drives the severity of the control set."}
        </Param>
        <Param
          name="risk_level"
          type='"low" | "medium" | "high" | "critical"'
          required
        >
          {fr
            ? "Classe de risque issue de la matrice ACF-02. Combinée à acf_level, elle détermine la cellule de mapping."
            : "Risk class from the ACF-02 matrix. Combined with acf_level, it determines the mapping cell."}
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
          ? "La sortie est un objet structuré contenant deux listes parallèles de contrôles, l’effort estimé total et un résumé prêt à coller dans une fiche ACF-12."
          : "The output is a structured object containing two parallel control lists, the total estimated effort, and a summary ready to paste into an ACF-12 card."}
      </p>
      <ParamGroup>
        <Param name="recommended_controls" type="RecommendedControl[]">
          {fr
            ? "Contrôles en langage métier — id, title, description, owner, frequency (one_time / monthly / quarterly / annual / on_event), evidence_storage. Coupés à 2 si budget_constraint = minimal."
            : "Controls in business language — id, title, description, owner, frequency (one_time / monthly / quarterly / annual / on_event), evidence_storage. Trimmed to 2 if budget_constraint = minimal."}
        </Param>
        <Param name="ddao_controls" type="string[]">
          {fr
            ? "Mêmes contrôles en vocabulaire canonique ACF® — codes C-AUTONOMY-XX, C-LOG-XX, C-KILL-XX, C-DRIFT-XX, C-ESC-XX. Format prêt à coller dans la fiche DDAO."
            : "Same controls in canonical ACF® vocabulary — codes C-AUTONOMY-XX, C-LOG-XX, C-KILL-XX, C-DRIFT-XX, C-ESC-XX. Ready to paste into the DDAO card."}
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
            ? "Phrase de synthèse prête à coller dans la fiche ACF-12 du DDAO."
            : "Summary sentence ready to paste into the DDAO’s ACF-12 card."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Niveau de confiance global. High dès que (level, risk) est dans la matrice canonique sans contradiction."
            : "Global confidence level. High whenever (level, risk) is in the canonical matrix with no contradiction."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèses explicites — en V1.0, pas de surcharge sectorielle (un agent banque hérite des mêmes contrôles qu’un agent SaaS pour le même couple level/risk)."
            : "Explicit assumptions — V1.0 does not yet apply sector-specific overrides (a banking agent inherits the same controls as a SaaS agent for the same level/risk pair)."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Trous à valider par le DDAO — disponibilité réelle pour la cadence proposée, lieu de stockage des preuves."
            : "Gaps for the DDAO to validate — actual availability for the proposed cadence, evidence-storage location."}
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
          ? "Un agent d’achats autonome N2 avec cap à 50k EUR, criticité haute :"
          : "An autonomous N2 procurement agent capped at 50k EUR, high criticality:"}
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
          <code>InvalidEnumValue</code> —{" "}
          {fr
            ? "acf_level reçoit autre chose que N0..N3, ou risk_level autre chose que low / medium / high / critical. L’outil ne devine pas — corrigez vers une valeur canonique."
            : "acf_level receives something other than N0..N3, or risk_level something other than low / medium / high / critical. The tool does not guess — fix to a canonical value."}
        </li>
        <li>
          <code>InputTooShort</code> —{" "}
          {fr
            ? "agent_description &lt; 10 caractères. Le DDAO summary n’aurait aucun contexte exploitable — précisez la description."
            : "agent_description &lt; 10 chars. The DDAO summary would have no usable context — be specific."}
        </li>
        <li>
          <code>MappingNotFound</code> —{" "}
          {fr
            ? "le couple (level, risk) n’est pas dans la matrice de mapping chargée. Probablement un mismatch de doctrine — mettez acf-mcp à jour."
            : "the (level, risk) pair is not in the loaded mapping matrix. Likely a doctrine mismatch — update acf-mcp."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools/acf.classify-agent" : "/tools/acf.classify-agent"}>
            <code>acf.classify-agent</code>
          </a>{" "}
          —{" "}
          {fr
            ? "obtenir acf_level + risk_level en amont, en un seul appel."
            : "obtain acf_level + risk_level upstream, in a single call."}
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
          </a>{" "}
          —{" "}
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
          </a>{" "}
          —{" "}
          {fr
            ? "croiser les contrôles avec les obligations AI Act applicables pour éviter les doublons et les trous."
            : "cross-check controls against applicable AI Act obligations to avoid duplicates and gaps."}
        </li>
      </ul>
    </DocsPage>
  );
}
