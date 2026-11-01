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
  name: "acf.assess-autonomy",
  arguments: {
    agent_description:
      "Procurement agent that drafts purchase orders for office supplies under EUR 5k and submits them to the ERP for approval.",
    intended_actions: [
      "draft purchase order from request",
      "validate vendor against approved list",
      "submit PO to ERP for human approval",
    ],
    reversibility: "partially",
    audit_requirements: "internal",
    human_in_loop_cost: "medium",
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
                "acf.assess-autonomy",
                arguments={
                    "agent_description": (
                        "Procurement agent that drafts purchase orders for office "
                        "supplies under EUR 5k and submits them to the ERP for "
                        "approval."
                    ),
                    "intended_actions": [
                        "draft purchase order from request",
                        "validate vendor against approved list",
                        "submit PO to ERP for human approval",
                    ],
                    "reversibility": "partially",
                    "audit_requirements": "internal",
                    "human_in_loop_cost": "medium",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "recommended_level": {
    "level": "supervised_autonomous",
    "rationale": "Partial reversibility with internal audit allows supervised autonomy within a documented mandate."
  },
  "go_no_go_criteria": [
    {
      "criterion": "Mandate signed by the named DDAO",
      "status": "conditional"
    },
    {
      "criterion": "Kill switch documented and tested",
      "status": "fail"
    },
    {
      "criterion": "Decision register format defined",
      "status": "conditional"
    },
    {
      "criterion": "Escalation thresholds named in numeric terms",
      "status": "fail"
    },
    {
      "criterion": "Sign-off from DPO if PII transits the agent",
      "status": "conditional"
    }
  ],
  "gating_thresholds": [
    {
      "condition": "Any action above bounded perimeter",
      "escalation": "Block + DDAO ack before execution"
    },
    {
      "condition": "Drift > 10% on key metric vs baseline",
      "escalation": "Auto-suspend within 24h + post-mortem"
    },
    {
      "condition": "3 consecutive incidents in 24h",
      "escalation": "Auto-suspend + immediate DDAO review"
    }
  ],
  "kill_switch_design": {
    "levels": [
      "freeze (instant)",
      "redirect (≤5 min)",
      "revoke (≤1 h)"
    ],
    "response_time_s": [
      5,
      300,
      3600
    ]
  },
  "referenced_fiches": [
    "ACF-07",
    "ACF-P6",
    "ACF-13",
    "ACF-09"
  ],
  "confidence": "medium",
  "assumptions": [
    "Inference is deterministic over the 4 supplied dimensions; sector calibration not included."
  ],
  "gaps_to_validate": [
    "Confirm whether any intended action handles PII (Article 35 GDPR DPIA may apply).",
    "Confirm whether the kill switch has been tested in the last quarter."
  ],
  "requires_human_review": true,
  "rationale_per_rule": [
    {
      "rule_id": "assess-autonomy.decision-tree",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "reversibility=partially, audit=internal, hil_cost=medium"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "doctrine_signature": "ed25519:3R0oIiqL3Kgd…",
  "doctrine_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "regulatory_snapshot": "EU AI Act (Reg. 2024/1689, incl. Digital Omnibus deferral) + GDPR (Reg. 2016/679) + DORA (Reg. 2022/2554) + NIS2 (Dir. 2022/2555) + ISO 42001:2023: as of 2026-06-07",
  "generated_at": "2026-11-01T12:06:31.043Z",
  "disclaimer": "Preliminary qualification produced by the ACF® deterministic engine. Not legal advice. Human review required. Do not use for autonomous regulatory decision-making. See doctrine_archive_url for the version of the doctrine used."
}`;

export default async function AssessAutonomyToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.assess-autonomy"
      description={
        fr
          ? "Décision d’autonomie isolée : faut-il que l’agent propose, décide ou exécute ? Quatre champs en entrée, un niveau d’autonomie déléguée en sortie (suggestif, co-décision, autonome supervisé ou autonome), avec critères go/no-go, seuils de gating, et conception du kill switch."
          : "Standalone autonomy decision: should the agent propose, decide or execute? Four input fields, one delegated autonomy level out (suggestive, co-decision, supervised autonomous or autonomous), with go/no-go criteria, gating thresholds, and kill switch design."
      }
      badge="REASON"
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Évaluation préliminaire fondée sur un arbre de décision déterministe
            à quatre dimensions. <code>requires_human_review</code> vaut toujours{" "}
            <code>true</code>. Les critères go/no-go en sortie ne sont valides
            qu’après revue humaine, ce n’est pas un verdict de mise en
            production.
          </>
        ) : (
          <>
            Preliminary assessment based on a deterministic four-dimension
            decision tree. <code>requires_human_review</code> is always{" "}
            <code>true</code>. The go/no-go criteria in the output are only
            valid after human review, this is not a go-live verdict.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand la seule question qui bloque est : « quel niveau d’autonomie ACF® donner à cet agent ? ». Vous savez déjà ce qu’il fait, vous savez ce qui se passe en cas d’erreur, vous voulez un verdict structuré sur le niveau d’autonomie déléguée (suggestif, co-décision, autonome supervisé, autonome) avec critères go/no-go associés. C’est la version chirurgicale de classify-agent quand seul l’axe autonomie est en débat."
          : "Use this tool when the only blocking question is: “what ACF® autonomy level should this agent have?”. You already know what it does, you know what happens on error, you want a structured verdict on the delegated autonomy level (suggestive, co-decision, supervised autonomous, autonomous) with the associated go/no-go criteria. It is the surgical version of classify-agent when only the autonomy axis is in debate."}
      </p>
      <p>
        {fr
          ? "Il répond à la question DDAO : « est-ce qu’on autorise cet agent à exécuter, ou seulement à proposer ? ». La sortie inclut une conception de kill switch à trois niveaux (freeze, redirect, revoke) directement utilisable dans la fiche ACF-07."
          : "It answers the DDAO question: “do we allow this agent to execute, or only to propose?”. The output includes a three-level kill switch design (freeze, redirect, revoke) directly usable in the ACF-07 card."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Cinq champs en entrée, dont quatre obligatoires. Les énumérations sont strictes."
          : "Five input fields, four of them required. Enums are strict."}
      </p>
      <ParamGroup>
        <Param name="agent_description" type="string (10-1500)" required>
          {fr
            ? "Description courte de l’agent (rôle, périmètre). Le contenu sert au rationale, pas à l’inférence."
            : "Short agent description (role, scope). Used in the rationale, not in the inference."}
        </Param>
        <Param name="intended_actions" type="string[] (1-20)" required>
          {fr
            ? "Liste des actions prévues. Les verbes comptent : « search », « summari* », « propose », « suggest » donnent le niveau suggestif quand l’audit est interne et la réversibilité totale."
            : "List of intended actions. Verbs matter: “search”, “summari*”, “propose”, “suggest” give the suggestive level when audit is internal and reversibility is full."}
        </Param>
        <Param
          name="reversibility"
          type='"fully" | "partially" | "irreversible"'
          required
        >
          {fr
            ? "Réversibilité des actions. « irreversible » sous audit réglementaire ou forensique garde la décision finale humaine : co-décision au plus."
            : "Reversibility of actions. “irreversible” under regulatory or forensic audit keeps the final decision human: co-decision at most."}
        </Param>
        <Param
          name="audit_requirements"
          type='"none" | "internal" | "regulatory" | "forensic"'
          required
        >
          {fr
            ? "Niveau d’auditabilité attendu. « regulatory » ou « forensic » plafonne au niveau co-décision : l’agent propose, un humain valide."
            : "Expected audit level. “regulatory” or “forensic” caps the level at co-decision: the agent proposes, a human validates."}
        </Param>
        <Param
          name="human_in_loop_cost"
          type='"low" | "medium" | "high"'
        >
          {fr
            ? "Coût humain de la mise en boucle. « high » + actions réversibles + aucun audit autorisent le niveau autonome, dans le mandat."
            : "Cost of keeping a human in the loop. “high” + reversible actions + no audit allow the autonomous level, within the mandate."}
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
          ? "Niveau recommandé, critères go/no-go, seuils de gating, conception de kill switch, fiches référencées, pied-de-page signé."
          : "Recommended level, go/no-go criteria, gating thresholds, kill switch design, referenced fiches, signed footer."}
      </p>
      <ParamGroup>
        <Param
          name="recommended_level"
          type='{ level: "suggestive"|"co_decision"|"supervised_autonomous"|"autonomous", rationale: string }'
        >
          {fr
            ? "Niveau ACF® recommandé par l’arbre de décision et sa justification."
            : "ACF® level recommended by the decision tree and its rationale."}
        </Param>
        <Param
          name="go_no_go_criteria"
          type='{ criterion: string, status: "pass"|"conditional"|"fail" }[]'
        >
          {fr
            ? "Cinq critères de validation go-live (mandat DDAO, kill switch, registre, seuils, sign-off DPO) avec leur statut inféré."
            : "Five go-live validation criteria (DDAO mandate, kill switch, register, thresholds, DPO sign-off) with their inferred status."}
        </Param>
        <Param
          name="gating_thresholds"
          type='{ condition: string, escalation: string }[]'
        >
          {fr
            ? "Conditions de blocage et l’escalade associée, directement utilisables dans le mandat (ACF-13)."
            : "Blocking conditions and the matching escalation, directly usable in the mandate (ACF-13)."}
        </Param>
        <Param
          name="kill_switch_design"
          type="{ levels: string[], response_time_s: number[] }"
        >
          {fr
            ? "Trois niveaux de kill switch : freeze (instant), redirect (≤5 min), revoke (≤1 h)."
            : "Three kill switch levels: freeze (instant), redirect (≤5 min), revoke (≤1 h)."}
        </Param>
        <Param name="referenced_fiches" type="string[]">
          {fr
            ? "Fiches ACF® à mobiliser pour le niveau recommandé (ex. ACF-07, ACF-P6, ACF-13, ACF-09)."
            : "ACF® cards to mobilise for the recommended level (e.g. ACF-07, ACF-P6, ACF-13, ACF-09)."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Confiance globale de la recommandation."
            : "Global confidence of the recommendation."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèses explicites prises par l’arbre de décision."
            : "Explicit assumptions made by the decision tree."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Points à confirmer en revue humaine, notamment PII (DPIA Article 35) et test trimestriel du kill switch."
            : "Points to confirm in human review, notably PII (Article 35 DPIA) and quarterly kill switch testing."}
        </Param>
        <Param
          name="rationale_per_rule"
          type='{ rule_id, rule_version, fired, evidence }[]'
        >
          {fr
            ? "Trace de la règle déclenchée avec sa preuve (les valeurs d’entrée concaténées)."
            : "Trace of the fired rule with its evidence (the concatenated input values)."}
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
          ? "Un agent procure qui rédige des bons de commande sous EUR 5k :"
          : "A procurement agent drafting purchase orders under EUR 5k:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock code={NODE_SAMPLE} language="typescript" filename="assess-autonomy.ts" />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock code={PYTHON_SAMPLE} language="python" filename="assess_autonomy.py" />
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
            ? "Paramètres invalides : reversibility, audit_requirements ou human_in_loop_cost hors énumération, ou intended_actions vide. L’appel échoue avec une erreur JSON-RPC dont le message liste les champs en cause."
            : "Invalid parameters: reversibility, audit_requirements or human_in_loop_cost outside their enums, or empty intended_actions. The call fails with a JSON-RPC error whose message lists the offending fields."}
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
            ? "élargir au-delà de la seule décision d’autonomie pour obtenir criticité, rôle régulatoire et sign-offs."
            : "broaden beyond the autonomy decision alone to also get criticality, regulatory role and sign-offs."}
        </li>
        <li>
          <a
            href={
              fr
                ? "/fr/tools/acf.assign-ddao-controls"
                : "/tools/acf.assign-ddao-controls"
            }
          >
            <code>acf.assign-ddao-controls</code>
          </a>
          {": "}
          {fr
            ? "transformer le niveau recommandé en contrôles concrets à imposer côté DDAO."
            : "turn the recommended level into concrete controls the DDAO must enforce."}
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
            ? "auditer un mandat existant à la lumière du niveau d’autonomie recommandé."
            : "audit an existing mandate in the light of the recommended autonomy level."}
        </li>
      </ul>
    </DocsPage>
  );
}
