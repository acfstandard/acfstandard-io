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

const mandateText = \`
Agent: Treasury Settlement Agent
DDAO: Marie Dupont, Head of Treasury Ops
ACF® doctrine version: v1.0

Decision perimeter (allowed): reconcile intra-day settlement breaks under 10k EUR, post matching entries to the GL.
Forbidden actions: any FX trade, any payment instruction outside the pre-approved counterparty list, any change to the ledger structure.
Escalation thresholds: any break > 10k EUR, any pattern of 3+ breaks from the same counterparty within 24h.
Kill switch: Ops can suspend the agent within 2 minutes via the ACF-07 panel. Drilled quarterly.
Audit log: every action logged with input, decision, signature; 6-month retention in the ACF-08 register.
Sign-off: DDAO + CISO + Head of Compliance.
\`;

const result = await client.callTool({
  name: "acf.evaluate-agent-mandate",
  arguments: {
    mandate_text: mandateText,
    agent_purpose:
      "Reconcile intra-day settlement breaks and post matching journal entries up to 10k EUR.",
    deployment_context: "EU bank, internal treasury, 24/7 ops.",
    locale: "en",
  },
});

console.log(JSON.stringify(result.content, null, 2));`;

const PYTHON_SAMPLE = `from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import asyncio, json

MANDATE_TEXT = """
Agent: Treasury Settlement Agent
DDAO: Marie Dupont, Head of Treasury Ops
ACF® doctrine version: v1.0

Decision perimeter (allowed): reconcile intra-day settlement breaks under 10k EUR, post matching entries to the GL.
Forbidden actions: any FX trade, any payment instruction outside the pre-approved counterparty list, any change to the ledger structure.
Escalation thresholds: any break > 10k EUR, any pattern of 3+ breaks from the same counterparty within 24h.
Kill switch: Ops can suspend the agent within 2 minutes via the ACF-07 panel. Drilled quarterly.
Audit log: every action logged with input, decision, signature; 6-month retention in the ACF-08 register.
Sign-off: DDAO + CISO + Head of Compliance.
"""

async def main():
    params = StdioServerParameters(command="npx", args=["-y", "acf-mcp"])
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            result = await session.call_tool(
                "acf.evaluate-agent-mandate",
                arguments={
                    "mandate_text": MANDATE_TEXT,
                    "agent_purpose": (
                        "Reconcile intra-day settlement breaks and post matching "
                        "journal entries up to 10k EUR."
                    ),
                    "deployment_context": "EU bank, internal treasury, 24/7 ops.",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "verdict": "approve",
  "rationale": "All canonical mandate sections are present; no critical placeholders detected.",
  "strengths": [
    "Identification du DDAO: present.",
    "Périmètre de décision: present.",
    "Actions interdites: present.",
    "Seuils d'escalade: present.",
    "Kill switch: present.",
    "Audit log / decision register: present.",
    "Doctrine version: present.",
    "Sign-off: present."
  ],
  "identified_gaps": [],
  "required_additions": [],
  "reference_fiches": ["ACF-03", "ACF-07", "ACF-09", "ACF-12"],
  "acf_compliance_score": 100,
  "confidence": "high",
  "assumptions": [
    "Mandate evaluation uses an 8-check canonical baseline — sector-specific extras not yet implemented."
  ],
  "gaps_to_validate": [
    "Confirm with the DDAO that the named escalation thresholds reflect real organisational SLAs.",
    "Confirm that the kill switch drill has been run in the last quarter."
  ],
  "requires_human_review": true,
  "rationale_per_rule": [
    {
      "rule_id": "evaluate-mandate.ddao_appointed",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Identification du DDAO check"
    },
    {
      "rule_id": "evaluate-mandate.decision_perimeter",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Périmètre de décision check"
    },
    {
      "rule_id": "evaluate-mandate.forbidden_actions",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Actions interdites check"
    },
    {
      "rule_id": "evaluate-mandate.escalation_thresholds",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Seuils d'escalade check"
    },
    {
      "rule_id": "evaluate-mandate.kill_switch",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Kill switch check"
    },
    {
      "rule_id": "evaluate-mandate.audit_log",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Audit log / decision register check"
    },
    {
      "rule_id": "evaluate-mandate.doctrine_version",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Doctrine version check"
    },
    {
      "rule_id": "evaluate-mandate.sign_off",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Sign-off check"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "regulatory_snapshot": "EU AI Act 2024/1689 · GDPR 2016/679 · ISO 42001:2023 · NIST AI RMF 1.0 · COBIT 2019 — frozen 2026-06",
  "generated_at": "2026-06-14T12:14:52.778Z",
  "disclaimer": "Preliminary qualification only — not legal advice. Human review required."
}`;

export default async function EvaluateAgentMandateToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.evaluate-agent-mandate"
      description={
        fr
          ? "Audit préliminaire d’un mandat d’agent existant — huit checks canoniques (DDAO nommé, périmètre, actions interdites, seuils d’escalade, kill switch, registre, version doctrine, sign-off) → verdict approve / approve_with_changes / reject + additions requises."
          : "Preliminary audit of an existing agent mandate — eight canonical checks (DDAO appointed, perimeter, forbidden actions, escalation thresholds, kill switch, audit log, doctrine version, sign-off) → verdict approve / approve_with_changes / reject + required additions."
      }
      badge="REASON"
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Cet outil produit un <strong>verdict préliminaire</strong> sur un mandat
            existant, pas un avis juridique. La présence de <code>TBD</code>, «{" "}
            <code>à compléter</code> » ou <code>???</code> dans le texte abaisse
            automatiquement le score de 20 points et classe le mandat «{" "}
            <code>non signable</code> » — c’est par design.{" "}
            <code>requires_human_review</code> reste constant.
          </>
        ) : (
          <>
            This tool produces a <strong>preliminary verdict</strong> on an existing
            mandate, not legal advice. Presence of <code>TBD</code>, “{" "}
            <code>à compléter</code>” or <code>???</code> in the text automatically
            drops the score by 20 points and classes the mandate as “{" "}
            <code>not signable</code>” — by design. <code>requires_human_review</code>{" "}
            stays constant.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un mandat d’agent a déjà été rédigé — par une équipe métier, un cabinet, un DDAO — et qu’il faut le passer au filtre ACF® avant signature ou inspection. L’outil applique huit checks regex canoniques sur le texte et calcule un score de conformité 0-100 pondéré, puis tranche en approve / approve_with_changes / reject."
          : "Use this tool when an agent mandate has already been drafted — by a business team, a law firm, a DDAO — and you need to filter it through ACF® before signature or inspection. The tool applies eight canonical regex checks on the text and computes a weighted 0-100 compliance score, then rules approve / approve_with_changes / reject."}
      </p>
      <p>
        {fr
          ? "La question board que la sortie tranche : « Ce mandat est-il signable en l’état ? » Si non, les required_additions donnent les rédactions à ajouter, fiche ACF® de référence par fiche. Le pénalty automatique sur les placeholders TBD/??? rend les mandats à trous immédiatement rejetables."
          : "The board-level question the output answers: “Is this mandate signable as-is?” If not, required_additions surfaces the draft text to add, ACF® reference card by card. The automatic penalty on TBD/??? placeholders makes incomplete mandates immediately rejectable."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Quatre champs, dont deux obligatoires. Le mandate_text est passé brut à l’évaluateur — pas de pré-nettoyage côté outil."
          : "Four fields, two required. The mandate_text is passed raw to the evaluator — no upstream cleaning by the tool."}
      </p>
      <ParamGroup>
        <Param name="mandate_text" type="string (50-10000)" required>
          {fr
            ? "Texte intégral du mandat à auditer. Les huit checks regex matchent sur ce texte ; la présence de TBD / à compléter / ??? est pénalisée automatiquement."
            : "Full text of the mandate to audit. The eight regex checks match against this text; TBD / à compléter / ??? are automatically penalised."}
        </Param>
        <Param name="agent_purpose" type="string (10-500)" required>
          {fr
            ? "Finalité courte de l’agent. Sert au rationale et au gaps_to_validate, ne pilote pas les checks (qui restent canoniques)."
            : "Short agent purpose. Used in the rationale and gaps_to_validate; does not drive the checks (which stay canonical)."}
        </Param>
        <Param name="deployment_context" type="string (≤500)">
          {fr
            ? "Contexte de déploiement (« banque UE, trésorerie interne », « santé publique, accès patients »…). Optionnel mais renforce le niveau de confiance."
            : "Deployment context (“EU bank, internal treasury”, “public healthcare, patient access”…). Optional but raises the confidence level."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue de la sortie textuelle (rationale, descriptions de gaps)."
            : "Language of the textual output (rationale, gap descriptions)."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "La sortie est un objet structuré contenant un verdict, le score de conformité, les forces, les gaps, les additions à intégrer et le pied-de-page signé."
          : "The output is a structured object containing a verdict, the compliance score, strengths, gaps, additions to integrate, and the signed footer."}
      </p>
      <ParamGroup>
        <Param
          name="verdict"
          type='"approve" | "approve_with_changes" | "reject"'
        >
          {fr
            ? "Verdict global. ≥ 80 = approve ; 50-79 = approve_with_changes ; < 50 = reject. La présence de placeholders TBD bascule presque toujours en reject."
            : "Global verdict. ≥ 80 = approve; 50-79 = approve_with_changes; < 50 = reject. TBD placeholders almost always tip into reject."}
        </Param>
        <Param name="rationale" type="string">
          {fr
            ? "Justification textuelle du verdict, prête à coller dans une revue DDAO."
            : "Textual justification of the verdict, ready to paste into a DDAO review."}
        </Param>
        <Param name="strengths" type="string[]">
          {fr
            ? "Liste des sections canoniques effectivement présentes dans le mandat."
            : "List of canonical sections actually present in the mandate."}
        </Param>
        <Param
          name="identified_gaps"
          type='{ area: string, severity: "low" | "medium" | "high" | "critical", description: string }[]'
        >
          {fr
            ? "Sections manquantes ou insuffisantes. Severity dérive du poids du check (15 = high, 10 = medium, 5 = low) ; les placeholders TBD donnent severity = critical."
            : "Missing or insufficient sections. Severity derives from check weight (15 = high, 10 = medium, 5 = low); TBD placeholders yield severity = critical."}
        </Param>
        <Param
          name="required_additions"
          type='{ section: string, suggested_text: string, fiche_reference: string }[]'
        >
          {fr
            ? "Rédactions concrètes à ajouter au mandat, fiche ACF® de référence par section."
            : "Concrete draft text to add to the mandate, ACF® reference card per section."}
        </Param>
        <Param name="reference_fiches" type="string[]">
          {fr
            ? "Fiches ACF® systématiquement mobilisées par cette évaluation (ACF-03, ACF-07, ACF-09, ACF-12)."
            : "ACF® cards systematically mobilised by this evaluation (ACF-03, ACF-07, ACF-09, ACF-12)."}
        </Param>
        <Param name="acf_compliance_score" type="number (0-100)">
          {fr
            ? "Score pondéré sur 100. Total des poids des checks satisfaits, moins 20 si présence de placeholders TBD."
            : "Weighted score out of 100. Sum of satisfied check weights, minus 20 if TBD placeholders present."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Niveau de confiance global. medium par défaut, monte avec un deployment_context fourni."
            : "Global confidence level. medium by default, rises with a supplied deployment_context."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèse principale : la V1.0 applique huit checks canoniques sans surcharge sectorielle."
            : "Main assumption: V1.0 applies eight canonical checks without sector-specific overrides."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Trous à valider avec le DDAO — SLA réels d’escalade, exécution effective du drill kill switch."
            : "Gaps to validate with the DDAO — actual escalation SLAs, actual execution of the kill-switch drill."}
        </Param>
        <Param name="requires_human_review" type="true">
          {fr
            ? "Constant. Aucun appel ne retourne false — même un verdict approve impose la signature humaine."
            : "Constant. No call returns false — even an approve verdict requires a human signature."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "Un mandat d’agent de réconciliation de trésorerie, complet, à valider avant sign-off :"
          : "A treasury settlement agent mandate, complete, awaiting sign-off:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock
                code={NODE_SAMPLE}
                language="typescript"
                filename="evaluate-mandate.ts"
              />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock
                code={PYTHON_SAMPLE}
                language="python"
                filename="evaluate_mandate.py"
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
          <code>InputTooShort</code> —{" "}
          {fr
            ? "mandate_text &lt; 50 caractères ou agent_purpose &lt; 10 caractères. Un mandat aussi court ne contient pas les huit sections canoniques — rédigez ou rejetez."
            : "mandate_text &lt; 50 chars or agent_purpose &lt; 10 chars. A mandate that short cannot contain the eight canonical sections — draft or reject."}
        </li>
        <li>
          <code>InputTooLong</code> —{" "}
          {fr
            ? "mandate_text &gt; 10000 caractères. Découpez le mandat en sections évaluées séparément, ou retirez les annexes non auditables (ex. politiques internes citées en référence)."
            : "mandate_text &gt; 10000 chars. Split the mandate into separately evaluated sections, or strip non-auditable appendices (e.g. internal policies cited by reference)."}
        </li>
        <li>
          <code>DoctrineSnapshotMismatch</code> —{" "}
          {fr
            ? "le moteur de checks ne correspond pas au doctrine_hash demandé. Mettez acf-mcp à jour ou pointez vers la version archivée."
            : "the check engine does not match the requested doctrine_hash. Update acf-mcp or point at the archived version."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a
            href={
              fr ? "/fr/tools/acf.assign-ddao-controls" : "/tools/acf.assign-ddao-controls"
            }
          >
            <code>acf.assign-ddao-controls</code>
          </a>{" "}
          —{" "}
          {fr
            ? "obtenir le jeu de contrôles à coller dans le mandat avant l’audit."
            : "obtain the control set to paste into the mandate before the audit."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.classify-agent" : "/tools/acf.classify-agent"}>
            <code>acf.classify-agent</code>
          </a>{" "}
          —{" "}
          {fr
            ? "qualifier l’agent en amont si le mandat ne précise pas encore son niveau d’autonomie ou son rôle régulatoire."
            : "qualify the agent upstream if the mandate does not yet specify its autonomy level or regulatory role."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.fiche.lookup" : "/tools/acf.fiche.lookup"}>
            <code>acf.fiche.lookup</code>
          </a>{" "}
          —{" "}
          {fr
            ? "récupérer le détail des fiches référencées (ACF-03, ACF-07, ACF-09, ACF-12) pour rédiger les required_additions."
            : "fetch the detail of referenced cards (ACF-03, ACF-07, ACF-09, ACF-12) when drafting required_additions."}
        </li>
      </ul>
    </DocsPage>
  );
}
