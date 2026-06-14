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
  "acf_level": {
    "level": "N1",
    "rationale": "Decision is automated but a human sign-off remains in the loop for MQL routing. Tagged as N1 (assisted) — graduate to N2 only after a 30-day drift review."
  },
  "criticality": {
    "score": "medium",
    "rationale": "Limited financial exposure + standard personal data + internal audience. The risk is reputational and pipeline-quality, not life-safety or financial.",
    "matrix_ref": "ACF-02 §3.2"
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
      { "article": "Art. 50", "requirement": "Inform leads that an AI is involved in the scoring", "applicable_date": "2026-08-02" }
    ],
    "continuous": [
      { "article": "Art. 13", "requirement": "Maintain end-user transparency about the scoring logic", "applicable_date": "—" }
    ],
    "on_incident": []
  },
  "applicable_fiches": [
    { "code": "ACF-04", "why": "Defines the agent identity card — required for any production agent" },
    { "code": "ACF-12", "why": "Mandate of the agent under a named DDAO" },
    { "code": "ACF-06", "why": "Kill switch testing every quarter" },
    { "code": "ACF-08", "why": "Signed decision register — six-month retention by deployer" }
  ],
  "recommended_controls": [
    "Disclose AI involvement in the contact form",
    "Log every score assignment with input and rationale",
    "Quarterly drift review of MQL precision/recall"
  ],
  "ddao_controls": [
    "C-AUTONOMY-01 — N1 gating: every MQL → human review before SDR outreach",
    "C-LOG-03 — Signed decision register branched to ACF-08",
    "C-DRIFT-02 — Monthly drift dashboard for fit-score distribution"
  ],
  "ddao_escalation": {
    "required": true,
    "trigger_thresholds": [
      "fit-score distribution shifts by > 2σ vs baseline",
      "MQL → SQL conversion drops by > 30% week over week",
      "any complaint from a tagged lead"
    ]
  },
  "sign_off_required": {
    "security": false,
    "privacy": true,
    "compliance": true,
    "legal": false,
    "business_sponsor": true,
    "board": false
  },
  "confidence": "high",
  "assumptions": [
    "Lead enrichment uses only public LinkedIn data via official API",
    "No special-category personal data is processed"
  ],
  "gaps_to_validate": [
    "Confirm Salesforce write scope — the agent should NOT update opportunity stages",
    "Confirm retention period of the signed register (six months minimum per Art. 26(6))"
  ],
  "requires_human_review": true,
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "regulatory_snapshot": "EU AI Act 2024/1689 · GDPR 2016/679 · ISO 42001:2023 · NIST AI RMF 1.0 · COBIT 2019 — frozen 2026-06",
  "generated_at": "2026-06-14T11:47:22.318Z",
  "conversion_cta": "Generate the full auditable PDF report on https://acfstandard.com/compliance?ref=mcp",
  "disclaimer": "Preliminary qualification only — not legal advice. Human review required."
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
          ? "Qualification préliminaire d’un agent IA avant go-live — dix champs énumérés en entrée, une évaluation structurée en sortie : niveau d’autonomie, criticité, rôle AI Act, obligations applicables, contrôles DDAO, sign-offs requis."
          : "Pre-go-live qualification of an AI agent — ten qualified-enum input fields, one structured output: autonomy level, criticality, AI Act role, applicable obligations, DDAO controls, required sign-offs."
      }
      badge="REASON"
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Cet outil produit une <strong>qualification préliminaire</strong>, pas un
            avis juridique. <code>requires_human_review</code> vaut toujours{" "}
            <code>true</code> en sortie. Tous les champs énumérés sont stricts —
            l’entrée est rejetée plutôt que devinée.
          </>
        ) : (
          <>
            This tool produces a <strong>preliminary qualification</strong>, not legal
            advice. <code>requires_human_review</code> is always <code>true</code> in
            the output. All enum fields are strict — the call is rejected, not guessed.
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
          ? "Ce n’est pas un outil de production : c’est un outil de cadrage. La sortie est conçue pour entrer dans une fiche ACF-07 (Dossier Premier Agent) que le DDAO va revoir et compléter."
          : "It is not a production-time tool: it is a scoping tool. The output is designed to land in an ACF-07 (First Agent Dossier) card that the DDAO will review and complete."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Dix champs principaux, tous obligatoires sauf indication contraire. Les énumérations sont strictes — l’outil rejette l’entrée plutôt que de deviner."
          : "Ten core fields, all required unless noted. Enums are strict — the tool rejects the input rather than guessing."}
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
          ? "La sortie est un objet à dix-huit champs structurés + pied-de-page signé."
          : "The output is an eighteen-field structured object + signed footer."}
      </p>
      <ParamGroup>
        <Param name="acf_level" type='{ level: "N0"|"N1"|"N2"|"N3", rationale: string }'>
          {fr
            ? "Niveau d’autonomie ACF® recommandé et son rationale."
            : "Recommended ACF® autonomy level and its rationale."}
        </Param>
        <Param
          name="criticality"
          type='{ score: "low"|"medium"|"high"|"critical", rationale, matrix_ref }'
        >
          {fr
            ? "Score de criticité issu de la matrice ACF-02, avec référence à la cellule de la matrice."
            : "Criticality score from the ACF-02 matrix, with a reference to the matrix cell."}
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
            ? "Fiches méthodologiques ACF® à mobiliser (ACF-00 à ACF-16), avec la raison pour chaque fiche retenue."
            : "ACF® methodological cards to mobilise (ACF-00 to ACF-16), with the reason for each retained card."}
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
          ? "Un agent SaaS qui qualifie des leads B2B entrants :"
          : "A SaaS agent qualifying inbound B2B leads:"}
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
          <code>InvalidEnumValue</code> —{" "}
          {fr
            ? "un champ énuméré reçoit une valeur hors liste (ex. financial_exposure: \"medium\"). Corrigez vers une des valeurs canoniques."
            : "an enum field receives an out-of-list value (e.g. financial_exposure: \"medium\"). Fix to one of the canonical values."}
        </li>
        <li>
          <code>InputTooShort</code> —{" "}
          {fr
            ? "description &lt; 20 caractères ou decisions_taken vide. L’outil ne devine pas — corrigez l’entrée."
            : "description &lt; 20 chars or decisions_taken empty. The tool does not guess — fix the input."}
        </li>
        <li>
          <code>DoctrineSnapshotMismatch</code> —{" "}
          {fr
            ? "le doctrine_hash demandé n’est pas chargé. Mettez acf-mcp à jour ou pointez vers la version archivée."
            : "the requested doctrine_hash is not loaded. Update acf-mcp or point at the archived version."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools/acf.assess-autonomy" : "/tools/acf.assess-autonomy"}>
            <code>acf.assess-autonomy</code>
          </a>{" "}
          —{" "}
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
          </a>{" "}
          —{" "}
          {fr
            ? "obtenir l’ensemble exhaustif des obligations AI Act une fois la qualification stabilisée."
            : "get the exhaustive AI Act obligation set once the qualification is stable."}
        </li>
        <li>
          <a
            href={fr ? "/fr/tools/acf.assign-ddao-controls" : "/tools/acf.assign-ddao-controls"}
          >
            <code>acf.assign-ddao-controls</code>
          </a>{" "}
          —{" "}
          {fr
            ? "assigner les contrôles concrets que le DDAO doit imposer."
            : "assign the concrete controls the DDAO must enforce."}
        </li>
      </ul>
    </DocsPage>
  );
}
