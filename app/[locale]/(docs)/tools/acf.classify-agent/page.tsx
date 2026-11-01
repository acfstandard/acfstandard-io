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
  name: "acf.classify-agent",
  arguments: {
    name: "B2B lead-qualification agent",
    description:
      "Receives raw inbound leads from the website form, enriches them with public LinkedIn data, scores them on fit, and writes a category to Salesforce.",
    decisions_taken: [
      "assign a fit score 0-100",
      "tag as MQL or disqualified",
      "write the result to the Salesforce lead record",
    ],
    human_approval_required: "sometimes",
    personal_data_level: "standard",
    financial_exposure: "low_operation",
    external_actions: "limited_write",
    gpai_used: true,
    usage_audience: "internal",
    sector: "saas",
    jurisdiction: ["eu", "uk"],
    ai_act_triggers: ["none"],
    processing_purposes: ["marketing"],
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
                "acf.classify-agent",
                arguments={
                    "name": "B2B lead-qualification agent",
                    "description": (
                        "Receives raw inbound leads from the website form, "
                        "enriches them with public LinkedIn data, scores them on fit, "
                        "and writes a category to Salesforce."
                    ),
                    "decisions_taken": [
                        "assign a fit score 0-100",
                        "tag as MQL or disqualified",
                        "write the result to the Salesforce lead record",
                    ],
                    "human_approval_required": "sometimes",
                    "personal_data_level": "standard",
                    "financial_exposure": "low_operation",
                    "external_actions": "limited_write",
                    "gpai_used": True,
                    "usage_audience": "internal",
                    "sector": "saas",
                    "jurisdiction": ["eu", "uk"],
                    "ai_act_triggers": ["none"],
                    "processing_purposes": ["marketing"],
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "autonomy_level": {
    "level": "supervised_autonomous",
    "rationale": "Conditional human approval, write actions allowed within a bounded perimeter → conditional execution (mandate required)."
  },
  "criticality": {
    "score": "medium",
    "rationale": "Standard personal data + low operational exposure → medium criticality (GDPR + operational impact).",
    "matrix_ref": "cell(standard, low_operation)"
  },
  "regulatory_qualifications": {
    "likely_ai_act_role": "deployer",
    "likely_gdpr_status": "controller"
  },
  "regulatory_qualifications_confidence": {
    "likely_ai_act_role": "high",
    "likely_gdpr_status": "high"
  },
  "ai_act_obligations": {
    "pre_go_live": [
      {
        "article": "art-50",
        "requirement": "Transparency obligations on AI systems intended to interact with natural persons (clear notice that the user is interacting with an AI system, unless obvious from context).",
        "applicable_date": "2026-08-02"
      }
    ],
    "continuous": [
      {
        "article": "art-51",
        "requirement": "Classification of GPAI models and identification of systemic-risk models.",
        "applicable_date": "2026-08-02"
      },
      {
        "article": "art-53",
        "requirement": "Technical documentation, training data summary, copyright policy, instructions for downstream providers.",
        "applicable_date": "2026-08-02"
      },
      {
        "article": "art-54",
        "requirement": "Authorised representative requirement for non-EU GPAI providers placing models on the EU market.",
        "applicable_date": "2026-08-02"
      }
    ],
    "on_incident": []
  },
  "applicable_fiches": [
    {
      "code": "ACF-13",
      "why": "Formal mandate required once the agent decides on its own (supervised autonomous or autonomous)."
    },
    {
      "code": "ACF-07",
      "why": "Kill switch required once the agent decides on its own (supervised autonomous or autonomous)."
    },
    {
      "code": "ACF-09",
      "why": "Decision register required once the agent decides on its own (supervised autonomous or autonomous)."
    }
  ],
  "recommended_controls": [
    "Formal agent mandate",
    "Kill switch quarterly drill",
    "Decision register",
    "Quarterly risk review"
  ],
  "ddao_controls": [
    "ACF-CTRL-101 (preventive, ACF-13): Mandate templates calibrated by sector; review frequency tied to criticality.",
    "ACF-CTRL-102 (corrective, ACF-07): Kill switch with 3 levels: freeze (instant), redirect (≤5min), revoke (≤1h).",
    "ACF-CTRL-103 (detective, ACF-09): Decision register format aligned with Article 49 register for high-risk systems."
  ],
  "ddao_escalation": {
    "required": false,
    "trigger_thresholds": [
      "Action above bounded perimeter escalates to DDAO before execution.",
      "Drift > 10% on key metric vs baseline escalates within 24h."
    ]
  },
  "sign_off_required": {
    "security": true,
    "privacy": true,
    "compliance": false,
    "legal": false,
    "business_sponsor": true,
    "board": false
  },
  "confidence": "medium",
  "assumptions": [],
  "gaps_to_validate": [],
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
      "fired": true,
      "evidence": "enum:gpai_used=true"
    },
    {
      "rule_id": "ai-act-roles.ai-act-role-deployer-internal-use",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "enum:usage_audience=internal"
    },
    {
      "rule_id": "gdpr-qualification.gdpr-controller-internal-use",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "enum:usage_audience=internal; enum:personal_data_level=standard"
    },
    {
      "rule_id": "sign-off-matrix.medium-standard-low_operation",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "criticality=medium, pii=standard, fin=low_operation"
    },
    {
      "rule_id": "ddao-controls-mapping.supervised_autonomous-high",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "level=supervised_autonomous, risk=medium"
    },
    {
      "rule_id": "autonomy-inference.supervised_autonomous",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "human_approval=sometimes, ext=limited_write"
    },
    {
      "rule_id": "criticality-matrix.standard-low_operation",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "pii=standard, fin=low_operation"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "doctrine_signature": "ed25519:3R0oIiqL3Kgd…",
  "doctrine_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "regulatory_snapshot": "EU AI Act (Reg. 2024/1689, incl. Digital Omnibus deferral) + GDPR (Reg. 2016/679) + DORA (Reg. 2022/2554) + NIS2 (Dir. 2022/2555) + ISO 42001:2023: as of 2026-06-07",
  "generated_at": "2026-11-01T12:06:31.055Z",
  "disclaimer": "Preliminary qualification produced by the ACF® deterministic engine. Not legal advice. Human review required. Do not use for autonomous regulatory decision-making. See doctrine_archive_url for the version of the doctrine used.",
  "conversion_cta": "Generate the full auditable PDF report on https://acfstandard.com/compliance?ref=mcp"
}`;

export default async function ClassifyAgentToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.classify-agent"
      description={
        fr
          ? "Qualification préliminaire d’un agent IA avant go-live, dix champs énumérés en entrée, une évaluation structurée en sortie : niveau d’autonomie, criticité, rôle AI Act, obligations applicables, contrôles DDAO, sign-offs requis."
          : "Pre-go-live qualification of an AI agent, ten qualified-enum input fields, one structured output: autonomy level, criticality, AI Act role, applicable obligations, DDAO controls, required sign-offs."
      }
      badge="REASON"
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Cet outil produit une <strong>qualification préliminaire</strong>, pas un
            avis juridique. <code>requires_human_review</code> vaut toujours{" "}
            <code>true</code> en sortie. Tous les champs énumérés sont stricts,
            l’entrée est rejetée plutôt que devinée.
          </>
        ) : (
          <>
            This tool produces a <strong>preliminary qualification</strong>, not legal
            advice. <code>requires_human_review</code> is always <code>true</code> in
            the output. All enum fields are strict, the call is rejected, not guessed.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un système d’IA arrive avant son go-live et qu’il faut un premier verdict structuré sur cinq questions en parallèle : à quel niveau d’autonomie il opère, quelle criticité il porte, quel rôle régulatoire il occupe (AI Act + RGPD), quels contrôles mettre en place, et qui doit signer son passage en production. L’outil agrège les cinq verdicts en un seul appel."
          : "Use this tool when an AI system is heading toward go-live and you need a structured first verdict on five questions at once: what autonomy level it operates at, what criticality it carries, what regulatory role it plays (AI Act + GDPR), what controls to put in place, and who must sign off on production. The tool aggregates the five verdicts into one call."}
      </p>
      <p>
        {fr
          ? "Ce n’est pas un outil de production : c’est un outil de cadrage. La sortie est conçue pour entrer dans une fiche ACF-08 (Dossier Premier Agent) que le DDAO va revoir et compléter."
          : "It is not a production-time tool: it is a scoping tool. The output is designed to land in an ACF-08 (First Agent Dossier) card that the DDAO will review and complete."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Dix champs principaux, tous obligatoires sauf indication contraire. Les énumérations sont strictes, l’outil rejette l’entrée plutôt que de deviner."
          : "Ten core fields, all required unless noted. Enums are strict, the tool rejects the input rather than guessing."}
      </p>
      <ParamGroup>
        <Param name="name" type="string (2-200)" required>
          {fr
            ? "Nom court de l’agent. Ce nom apparaît dans le rationale et l’audit trail."
            : "Short agent name. Appears in the rationale and audit trail."}
        </Param>
        <Param name="description" type="string (20-1000)" required>
          {fr
            ? "Description prose de ce que l’agent fait, où il agit, sur quels actifs. Plus c’est précis, plus l’inférence est solide."
            : "Free-text description of what the agent does, where it acts, on what assets. The more precise, the stronger the inference."}
        </Param>
        <Param name="decisions_taken" type="string[] (1-20)" required>
          {fr
            ? "Liste des décisions opérationnelles que l’agent prend (« attribue un score », « envoie un email », « écrit dans Salesforce »…)."
            : "List of operational decisions the agent makes (“assign a score”, “send an email”, “write to Salesforce”…)."}
        </Param>
        <Param
          name="human_approval_required"
          type='"always" | "sometimes" | "never"'
          required
        >
          {fr
            ? "À quelle fréquence un humain valide-t-il les décisions ? Influe directement sur le niveau d’autonomie inféré."
            : "How often does a human approve decisions? Directly influences the inferred autonomy level."}
        </Param>
        <Param
          name="personal_data_level"
          type='"none" | "standard" | "sensitive_special"'
          required
        >
          {fr
            ? "Niveau de données personnelles manipulées. sensitive_special couvre santé, données biométriques, opinion politique, etc."
            : "Level of personal data handled. sensitive_special covers health, biometrics, political opinion, etc."}
        </Param>
        <Param
          name="financial_exposure"
          type='"none" | "low_operation" | "medium_contract" | "high_corporate"'
          required
        >
          {fr
            ? "Exposition financière par décision. medium_contract = engagement contractuel ; high_corporate = trading, transfert massif."
            : "Financial exposure per decision. medium_contract = contractual commitment; high_corporate = trading, massive transfer."}
        </Param>
        <Param
          name="external_actions"
          type='"none" | "read_only" | "limited_write" | "full_write"'
          required
        >
          {fr
            ? "Capacité d’écriture sur des systèmes externes (CRM, ERP, banque, API tierces)."
            : "Write capability against external systems (CRM, ERP, banks, third-party APIs)."}
        </Param>
        <Param name="gpai_used" type="boolean" required>
          {fr
            ? "Le système utilise-t-il un GPAI (LLM généraliste type GPT, Claude, Gemini, Mistral) en sous-couche ? Active les obligations AI Act Art. 51-55."
            : "Does the system use a GPAI (general-purpose LLM such as GPT, Claude, Gemini, Mistral) under the hood? Triggers AI Act Art. 51-55 obligations."}
        </Param>
        <Param
          name="usage_audience"
          type='"internal" | "third_party_b2b" | "public_consumer"'
          required
        >
          {fr
            ? "Qui voit la sortie ? public_consumer engage davantage le RGPD et les obligations de transparence."
            : "Who sees the output? public_consumer raises the GDPR and transparency obligations bar."}
        </Param>
        <Param name="sector" type="string (≤80)">
          {fr
            ? "Secteur d’activité, libre (« banque », « healthtech », « public sector »…). Aide la pondération de la criticité."
            : "Free-text sector (“banking”, “healthtech”, “public sector”…). Helps weight the criticality."}
        </Param>
        <Param
          name="jurisdiction"
          type='("eu" | "uk" | "us" | "ca" | "ch" | "br" | "jp" | "other")[]'
        >
          {fr
            ? "Juridictions où l’agent opère. Active l’AI Act EU + autres référentiels."
            : "Jurisdictions where the agent operates. Activates the EU AI Act + other frameworks."}
        </Param>
        <Param name="ai_act_triggers" type="AiActTriggerEnum[]">
          {fr
            ? "Déclencheurs Annex III explicites (biométrie, infrastructure critique, recrutement, scoring crédit…) ou « none »."
            : "Explicit Annex III triggers (biometrics, critical infrastructure, recruitment, credit scoring…) or “none”."}
        </Param>
        <Param name="processing_purposes" type="ProcessingPurposeEnum[]">
          {fr
            ? "Finalité du traitement RGPD (RH, marketing, financier, support, santé, public, conformité…)."
            : "GDPR processing purpose (HR, marketing, financial, support, healthcare, public, compliance…)."}
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
          ? "La sortie est un objet structuré, suivi du pied-de-page signé de la doctrine."
          : "The output is a structured object, followed by the signed doctrine footer."}
      </p>
      <ParamGroup>
        <Param name="autonomy_level" type='{ level: "suggestive"|"co_decision"|"supervised_autonomous"|"autonomous", rationale: string }'>
          {fr
            ? "Niveau d’autonomie déléguée recommandé pour les décisions de l’agent, et son rationale. Renommé depuis acf_level en 2.0.0 : N0 à N3 désigne désormais la maturité de l’agent, pas l’autonomie d’une décision."
            : "Recommended delegated autonomy level for the agent’s decisions, and its rationale. Renamed from acf_level in 2.0.0: N0 to N3 now refers to agent maturity, not to the autonomy of a decision."}
        </Param>
        <Param
          name="criticality"
          type='{ score: "low"|"medium"|"high"|"critical", rationale, matrix_ref }'
        >
          {fr
            ? "Score de criticité issu de la Matrice de Criticité (ACF-03), avec référence à la cellule de la matrice."
            : "Criticality score from the Criticality Matrix (ACF-03), with a reference to the matrix cell."}
        </Param>
        <Param
          name="regulatory_qualifications"
          type="{ likely_ai_act_role, likely_gdpr_status }"
        >
          {fr
            ? "Rôle AI Act probable (provider, deployer, importer, distributor…) et statut RGPD probable (controller, processor, joint controller)."
            : "Likely AI Act role (provider, deployer, importer, distributor…) and likely GDPR status (controller, processor, joint controller)."}
        </Param>
        <Param
          name="ai_act_obligations"
          type="{ pre_go_live[], continuous[], on_incident[] }"
        >
          {fr
            ? "Obligations AI Act ventilées par phase du cycle de vie, avec article + exigence + date d’applicabilité."
            : "AI Act obligations split by lifecycle phase, with article + requirement + applicable date."}
        </Param>
        <Param name="applicable_fiches" type='{ code: string, why: string }[]'>
          {fr
            ? "Fiches du toolkit ACF® à mobiliser (parmi les 45 : ACF-01 à ACF-20, ACF-O1 à ACF-O10, ACF-P1 à ACF-P15), avec la raison pour chaque fiche retenue."
            : "ACF® toolkit cards to mobilise (among the 45: ACF-01 to ACF-20, ACF-O1 to ACF-O10, ACF-P1 to ACF-P15), with the reason for each retained card."}
        </Param>
        <Param name="recommended_controls" type="string[]">
          {fr
            ? "Contrôles en langage naturel, destinés à l’équipe métier."
            : "Plain-English controls for the business team."}
        </Param>
        <Param name="ddao_controls" type="string[]">
          {fr
            ? "Mêmes contrôles, vocabulaire canonique ACF® (codes C-AUTONOMY-XX, C-LOG-XX, etc.), destinés au DDAO."
            : "Same controls in canonical ACF® vocabulary (C-AUTONOMY-XX, C-LOG-XX, etc.), for the DDAO."}
        </Param>
        <Param
          name="ddao_escalation"
          type="{ required: boolean, trigger_thresholds: string[] }"
        >
          {fr
            ? "L’escalade DDAO est-elle requise ? Si oui, sur quels seuils ?"
            : "Is DDAO escalation required? If so, on which thresholds?"}
        </Param>
        <Param name="sign_off_required" type="{ security, privacy, compliance, legal, business_sponsor, board: boolean }">
          {fr
            ? "Qui doit signer le go-live ? Six rôles internes possibles."
            : "Who must sign off on go-live? Six internal roles."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Niveau de confiance global de la qualification."
            : "Global confidence level of the qualification."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèses explicites prises pour produire la qualification."
            : "Explicit assumptions the qualification rests on."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Trous identifiés que le revue humaine doit combler."
            : "Identified gaps that the human review must close."}
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
          ? "Un agent qui qualifie les leads B2B entrants d’un éditeur de logiciel :"
          : "An agent qualifying a software vendor’s inbound B2B leads:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock code={NODE_SAMPLE} language="typescript" filename="classify-agent.ts" />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock code={PYTHON_SAMPLE} language="python" filename="classify_agent.py" />
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
            ? "Paramètres invalides : un des champs énumérés (human_approval_required, personal_data_level, financial_exposure, external_actions, usage_audience) hors de ses valeurs, ou decisions_taken vide. L’appel échoue avec une erreur JSON-RPC dont le message liste les champs en cause."
            : "Invalid parameters: one of the enumerated fields (human_approval_required, personal_data_level, financial_exposure, external_actions, usage_audience) outside its values, or empty decisions_taken. The call fails with a JSON-RPC error whose message lists the offending fields."}
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
          <a href={fr ? "/fr/tools/acf.assess-autonomy" : "/tools/acf.assess-autonomy"}>
            <code>acf.assess-autonomy</code>
          </a>
          {": "}
          {fr
            ? "creuser la décision de niveau d’autonomie en isolation."
            : "drill into the autonomy-level decision in isolation."}
        </li>
        <li>
          <a
            href={
              fr ? "/fr/tools/acf.map-ai-act-obligations" : "/tools/acf.map-ai-act-obligations"
            }
          >
            <code>acf.map-ai-act-obligations</code>
          </a>
          {": "}
          {fr
            ? "obtenir l’ensemble exhaustif des obligations AI Act une fois la qualification stabilisée."
            : "get the exhaustive AI Act obligation set once the qualification is stable."}
        </li>
        <li>
          <a
            href={fr ? "/fr/tools/acf.assign-ddao-controls" : "/tools/acf.assign-ddao-controls"}
          >
            <code>acf.assign-ddao-controls</code>
          </a>
          {": "}
          {fr
            ? "assigner les contrôles concrets que le DDAO doit imposer."
            : "assign the concrete controls the DDAO must enforce."}
        </li>
      </ul>
    </DocsPage>
  );
}
