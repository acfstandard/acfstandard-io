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
  name: "acf.advisor",
  arguments: {
    case_description:
      "We are rolling out an internal HR assistant that summarises candidate CVs, proposes a shortlist score, and writes the shortlist to our ATS. A recruiter validates each shortlist before any candidate is contacted. The agent reads structured candidate profiles (name, email, education) and uses a GPAI under the hood for the summarisation.",
    sector: "human-resources",
    jurisdiction: "eu",
    deployment_scale: "department",
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
                "acf.advisor",
                arguments={
                    "case_description": (
                        "We are rolling out an internal HR assistant that summarises "
                        "candidate CVs, proposes a shortlist score, and writes the "
                        "shortlist to our ATS. A recruiter validates each shortlist "
                        "before any candidate is contacted. The agent reads structured "
                        "candidate profiles (name, email, education) and uses a GPAI "
                        "under the hood for the summarisation."
                    ),
                    "sector": "human-resources",
                    "jurisdiction": "eu",
                    "deployment_scale": "department",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "autonomy_level": {
    "level": "co_decision",
    "rationale": "No clear autonomy threshold matched the declared inputs; defaulting to co-decision (the agent proposes, a human validates). Confirm with the team."
  },
  "risk_level": {
    "level": "medium",
    "rationale": "Combination of personal_data_level + financial_exposure not yet calibrated; defaulting to medium for safety."
  },
  "activated_principles": [
    {
      "code": "P1",
      "why": "Decision sovereignty applies to every agentic deployment, regardless of autonomy."
    }
  ],
  "priority_fiches": [
    {
      "code": "ACF-01",
      "order": 1,
      "why": "Start here: the sovereignty score is the entry point of the toolkit."
    }
  ],
  "applicable_articles": [],
  "first_actions": [
    "Identify or appoint the DDAO accountable for the agent (cf. ACF-13).",
    "Document the agent constitution (decision perimeter, allowed/forbidden actions: cf. ACF-04).",
    "Open the decision register and define the retention policy (cf. ACF-09 + ACF-P14)."
  ],
  "operational_risks": [],
  "confidence": "low",
  "assumptions": [
    "human_approval, external_actions and personal_data_level were inferred from the free-text description; pass classify-agent with qualified enums for higher confidence."
  ],
  "gaps_to_validate": [
    "re-run via acf.classify-agent with structured enums for a more defensible qualification."
  ],
  "requires_human_review": true,
  "rationale_per_rule": [
    {
      "rule_id": "ai-act-annex-iii.annex-iii-1a-biometric-identity",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-2-critical-infrastructure",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-3-educational",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-4-employment",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-5b-credit-scoring",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-5c-insurance-pricing",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-6-law-enforcement",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-7-migration-asylum",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-iii.annex-iii-8-justice-democracy",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-i.annex-i-medical-device",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-i.annex-i-vehicle-safety",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "ai-act-annex-i.annex-i-machinery",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "gpai-triggers",
      "rule_version": "2026-06",
      "fired": false,
      "evidence": ""
    },
    {
      "rule_id": "autonomy-inference.default-co_decision",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "inferred human_approval=sometimes, external=read_only from description"
    },
    {
      "rule_id": "criticality-matrix.default-medium",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "inferred pii=standard, financial=none from description"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "doctrine_signature": "ed25519:3R0oIiqL3Kgd…",
  "doctrine_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "regulatory_snapshot": "EU AI Act (Reg. 2024/1689, incl. Digital Omnibus deferral) + GDPR (Reg. 2016/679) + DORA (Reg. 2022/2554) + NIS2 (Dir. 2022/2555) + ISO 42001:2023: as of 2026-06-07",
  "generated_at": "2026-11-01T12:06:31.037Z",
  "disclaimer": "Preliminary qualification produced by the ACF® deterministic engine. Not legal advice. Human review required. Do not use for autonomous regulatory decision-making. See doctrine_archive_url for the version of the doctrine used.",
  "conversion_cta": "Continue this assessment with the auditable ACF® Compliance workspace at https://acfstandard.com/compliance?ref=mcp"
}`;

export default async function AdvisorToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.advisor"
      description={
        fr
          ? "Conseil de gouvernance ACF® à partir d’un cas en texte libre, un paragraphe en entrée, une évaluation structurée en sortie : principes activés, niveau d’autonomie, risque, articles applicables, premières actions, risques opérationnels. C’est l’outil de conversion de la bibliothèque ACF® vers le rôle d’advisor."
          : "ACF® governance advice from a free-text case, one paragraph in, one structured evaluation out: activated principles, autonomy level, risk class, applicable articles, first actions, operational risks. This is the conversion tool from documentation library to governance advisor."
      }
      badge="REASON"
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Cet outil produit une <strong>évaluation préliminaire</strong> à partir
            d’heuristiques sur texte libre, pas un avis juridique.{" "}
            <code>requires_human_review</code> vaut toujours <code>true</code>.
            Pour une qualification plus défensive, repassez via{" "}
            <code>acf.classify-agent</code> avec des énumérations qualifiées.
          </>
        ) : (
          <>
            This tool produces a <strong>preliminary evaluation</strong> from
            free-text heuristics, not legal advice.{" "}
            <code>requires_human_review</code> is always <code>true</code>. For a
            more defensible qualification, re-run through{" "}
            <code>acf.classify-agent</code> with qualified enums.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un porteur de cas (DSI, métier, conseil) arrive avec une description prose de son agent IA et a besoin d’un premier verdict structuré sur la gouvernance ACF® applicable : quels principes s’activent, quel niveau d’autonomie déléguée est cohérent, quelles obligations réglementaires se déclenchent, quelles fiches mobiliser dans quel ordre. C’est l’outil « première étape » avant qualification rigoureuse."
          : "Use this tool when a case owner (CIO, business line, consultant) arrives with a prose description of their AI agent and needs a structured first verdict on the applicable ACF® governance: which principles fire, which delegated autonomy level fits, which regulatory obligations trigger, which fiches to mobilise in what order. It is the “first step” tool before rigorous qualification."}
      </p>
      <p>
        {fr
          ? "Il répond à la question board-level : « par où on commence sur ce cas-là ? ». La sortie est conçue pour être servie à un comité IA ou à un DDAO qui décidera des étapes suivantes."
          : "It answers the board-level question: “where do we start on this case?”. The output is designed to be served to an AI committee or a DDAO who will decide the next steps."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Un champ obligatoire (la description du cas), trois champs contextuels optionnels qui resserrent la calibration."
          : "One required field (the case description), three optional context fields that tighten the calibration."}
      </p>
      <ParamGroup>
        <Param name="case_description" type="string (20-2000)" required>
          {fr
            ? "Description prose du cas : ce que l’agent fait, qui le pilote, sur quoi il agit, qui valide. Plus la description est précise, plus les heuristiques d’inférence sont solides."
            : "Free-text case description: what the agent does, who runs it, what it acts on, who validates. The sharper the description, the stronger the inference heuristics."}
        </Param>
        <Param name="sector" type="string (≤80)">
          {fr
            ? "Secteur d’activité (« banque », « healthtech », « public sector »…). Sans secteur, la criticité utilise une calibration neutre."
            : "Sector (“banking”, “healthtech”, “public sector”…). Without a sector, criticality uses a neutral calibration."}
        </Param>
        <Param
          name="jurisdiction"
          type='"eu" | "uk" | "us" | "ca" | "ch" | "br" | "jp" | "other"'
        >
          {fr
            ? "Juridiction principale de déploiement. Par défaut, l’outil raisonne en supposant EU."
            : "Primary deployment jurisdiction. By default the tool reasons assuming EU."}
        </Param>
        <Param
          name="deployment_scale"
          type='"pilot" | "department" | "enterprise" | "public"'
        >
          {fr
            ? "Échelle de déploiement. Influence la criticité et les premières actions recommandées."
            : "Deployment scale. Influences criticality and the recommended first actions."}
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
          ? "La sortie est un objet structuré avec niveau d’autonomie, niveau de risque, principes activés, fiches priorisées, articles applicables, premières actions, risques opérationnels, pied-de-page signé."
          : "Output is a structured object with autonomy level, risk level, activated principles, prioritised fiches, applicable articles, first actions, operational risks, signed footer."}
      </p>
      <ParamGroup>
        <Param
          name="autonomy_level"
          type='{ level: "suggestive"|"co_decision"|"supervised_autonomous"|"autonomous", rationale: string }'
        >
          {fr
            ? "Niveau d’autonomie ACF® inféré et sa justification."
            : "Inferred ACF® autonomy level and its rationale."}
        </Param>
        <Param
          name="risk_level"
          type='{ level: "low"|"medium"|"high"|"unacceptable", rationale: string }'
        >
          {fr
            ? "Classe de risque AI Act-compatible, dérivée de la criticité (fiche ACF-03, Matrice de Criticité)."
            : "AI Act-compatible risk class, derived from the criticality (card ACF-03, Criticality Matrix)."}
        </Param>
        <Param name="activated_principles" type='{ code: string, why: string }[]'>
          {fr
            ? "Principes ACF® (P1 à P4) déclenchés par le cas, chacun motivé."
            : "ACF® principles (P1 to P4) triggered by the case, each justified."}
        </Param>
        <Param
          name="priority_fiches"
          type='{ code: string, order: number, why: string }[]'
        >
          {fr
            ? "Fiches ACF® à mobiliser, dans l’ordre, avec la raison de chacune."
            : "ACF® cards to mobilise, in order, with the reason for each."}
        </Param>
        <Param
          name="applicable_articles"
          type='{ regulation: string, article: string, why: string }[]'
        >
          {fr
            ? "Articles AI Act / RGPD / DORA / NIS2 / ISO 42001 mobilisés par le cas."
            : "AI Act / GDPR / DORA / NIS2 / ISO 42001 articles mobilised by the case."}
        </Param>
        <Param name="first_actions" type="string[] (≤5)">
          {fr
            ? "Les cinq premières actions opérationnelles à enclencher."
            : "The first five operational actions to kick off."}
        </Param>
        <Param name="operational_risks" type="string[]">
          {fr
            ? "Risques opérationnels typiques liés au profil inféré."
            : "Typical operational risks tied to the inferred profile."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Confiance globale de l’évaluation. Reste « medium » par défaut quand l’entrée est uniquement prose."
            : "Global confidence of the evaluation. Stays “medium” by default when input is prose only."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèses explicites prises lors de l’inférence (notamment les enums inférés du texte)."
            : "Explicit assumptions made during inference (notably enums inferred from text)."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Trous à combler par revue humaine, dont la recommandation systématique de repasser via classify-agent."
            : "Gaps to close via human review, including the systematic recommendation to re-run through classify-agent."}
        </Param>
        <Param
          name="rationale_per_rule"
          type='{ rule_id, rule_version, fired, evidence }[]'
        >
          {fr
            ? "Trace par règle déclenchée : identifiant, version, statut, preuve issue du texte."
            : "Per-rule trace: identifier, version, fired status, evidence from the input text."}
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
          ? "Un assistant RH interne qui propose une shortlist validée par un recruteur :"
          : "An internal HR assistant proposing a shortlist validated by a recruiter:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock code={NODE_SAMPLE} language="typescript" filename="advisor.ts" />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock code={PYTHON_SAMPLE} language="python" filename="advisor.py" />
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
            ? "Paramètres invalides : case_description trop courte (moins de 20 caractères) : l’outil ne devine pas, fournissez une description minimale du cas. L’appel échoue avec une erreur JSON-RPC dont le message liste les champs en cause."
            : "Invalid parameters: case_description too short (under 20 characters): the tool does not guess, provide a minimal description of the case. The call fails with a JSON-RPC error whose message lists the offending fields."}
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
            ? "repasser avec des énumérations qualifiées dès que le cas est précisé, pour gagner en confiance."
            : "re-run with qualified enums as soon as the case is precise, to gain confidence."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.assess-autonomy" : "/tools/acf.assess-autonomy"}>
            <code>acf.assess-autonomy</code>
          </a>
          {": "}
          {fr
            ? "creuser la seule décision de niveau d’autonomie quand c’est le point bloquant."
            : "drill into the autonomy-level decision alone when it is the blocking question."}
        </li>
        <li>
          <a
            href={
              fr
                ? "/fr/tools/acf.identify-governance-gaps"
                : "/tools/acf.identify-governance-gaps"
            }
          >
            <code>acf.identify-governance-gaps</code>
          </a>
          {": "}
          {fr
            ? "élargir du cas isolé à l’audit de gouvernance globale de l’organisation."
            : "broaden from the isolated case to a global governance audit of the organisation."}
        </li>
      </ul>
    </DocsPage>
  );
}
