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
  name: "acf.map-ai-act-obligations",
  arguments: {
    annex: "iii",
    use_case:
      "Automated CV screening agent that ranks candidates for a software-engineering role. Outputs a shortlist that recruiters use as a starting point.",
    provider_or_deployer: "deployer",
    gpai_used: true,
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
                "acf.map-ai-act-obligations",
                arguments={
                    "annex": "iii",
                    "use_case": (
                        "Automated CV screening agent that ranks candidates for a "
                        "software-engineering role. Outputs a shortlist that recruiters "
                        "use as a starting point."
                    ),
                    "provider_or_deployer": "deployer",
                    "gpai_used": True,
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "obligations": {
    "pre_go_live": [
      {
        "article": "art-9",
        "title": "Risk management system",
        "requirement": "Establish, implement, document, maintain a risk management system across the lifecycle.",
        "deadline": "2027-12-02",
        "fiches": ["ACF-02", "ACF-09"],
        "operational_actions": [
          "Stand up risk register",
          "Define risk methodology",
          "Review quarterly"
        ],
        "evidence_required": ["Risk register", "Methodology doc"],
        "digital_omnibus_deferred": true
      },
      {
        "article": "art-10",
        "title": "Data and data governance",
        "requirement": "Training/validation/testing data sets governance + quality requirements.",
        "deadline": "2027-12-02",
        "fiches": ["ACF-08"],
        "operational_actions": [
          "Document data sources",
          "Run bias evaluation",
          "Document data drift monitoring"
        ],
        "evidence_required": ["Data inventory", "Bias evaluation report"],
        "digital_omnibus_deferred": true
      },
      {
        "article": "art-11",
        "title": "Technical documentation",
        "requirement": "Maintain technical documentation per Annex IV.",
        "deadline": "2027-12-02",
        "fiches": ["ACF-04"],
        "operational_actions": ["Author Annex IV-aligned tech doc"],
        "evidence_required": ["Technical documentation"],
        "digital_omnibus_deferred": true
      },
      {
        "article": "art-13",
        "title": "Transparency to deployers",
        "requirement": "Provide instructions for use that allow the deployer to interpret outputs.",
        "deadline": "2027-12-02",
        "fiches": ["ACF-04"],
        "operational_actions": [
          "Draft instructions for use",
          "Translate to operating languages"
        ],
        "evidence_required": ["Instructions for use"],
        "digital_omnibus_deferred": true
      },
      {
        "article": "art-50",
        "title": "Transparency on AI/GPAI",
        "requirement": "Disclose AI usage to natural persons interacting with the system.",
        "deadline": "2026-08-02",
        "fiches": ["ACF-04"],
        "operational_actions": ["Add disclosure on every user surface"],
        "evidence_required": ["Disclosure copy"],
        "digital_omnibus_deferred": false
      }
    ],
    "continuous": [
      {
        "article": "art-15",
        "title": "Accuracy, robustness, cybersecurity",
        "requirement": "Maintain accuracy, robustness, cybersecurity levels appropriate to the use.",
        "deadline": "continuous",
        "fiches": ["ACF-06"],
        "operational_actions": [
          "Define accuracy KPIs",
          "Run robustness tests",
          "Define cybersecurity controls"
        ],
        "evidence_required": ["KPI dashboards", "Pen test reports"],
        "digital_omnibus_deferred": false
      },
      {
        "article": "art-26",
        "title": "Deployer obligations",
        "requirement": "Instructions, monitoring, fundamental rights impact assessment.",
        "deadline": "2027-12-02",
        "fiches": ["ACF-12"],
        "operational_actions": [
          "Run fundamental rights IA",
          "Document monitoring plan"
        ],
        "evidence_required": ["FRIA report", "Monitoring plan"],
        "digital_omnibus_deferred": true
      },
      {
        "article": "art-27",
        "title": "Fundamental rights impact assessment",
        "requirement": "Mandatory FRIA for high-risk deployers in some sectors.",
        "deadline": "2027-12-02",
        "fiches": ["ACF-12"],
        "operational_actions": ["Author FRIA"],
        "evidence_required": ["FRIA"],
        "digital_omnibus_deferred": true
      },
      {
        "article": "art-72",
        "title": "Post-market monitoring",
        "requirement": "Establish a post-market monitoring system.",
        "deadline": "continuous",
        "fiches": ["ACF-06"],
        "operational_actions": ["Define post-market monitoring plan"],
        "evidence_required": ["Monitoring reports"],
        "digital_omnibus_deferred": false
      }
    ],
    "on_incident": [
      {
        "article": "art-79",
        "title": "Serious incident reporting",
        "requirement": "Report serious incidents to authorities within 15 days.",
        "deadline": "on-incident",
        "fiches": ["ACF-09"],
        "operational_actions": [
          "Define incident classification + reporting playbook"
        ],
        "evidence_required": ["Incident reports"],
        "digital_omnibus_deferred": false
      }
    ]
  },
  "total_count": 10,
  "critical_path": [
    "art-50: Transparency on AI/GPAI",
    "art-15: Accuracy, robustness, cybersecurity"
  ],
  "confidence": "high",
  "assumptions": [],
  "gaps_to_validate": [
    "Confirm provider_or_deployer qualification — it changes the obligation set.",
    "Confirm GPAI usage — Article 50 transparency obligation depends on it."
  ],
  "requires_human_review": true,
  "rationale_per_rule": [
    {
      "rule_id": "annex-iii.recruitment",
      "rule_version": "2026-06",
      "fired": true,
      "evidence": "Use case mentions CV screening + candidate ranking — Annex III §4 (employment) triggered."
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "regulatory_snapshot": "EU AI Act 2024/1689 · GDPR 2016/679 · ISO 42001:2023 · NIST AI RMF 1.0 · COBIT 2019 — frozen 2026-06",
  "generated_at": "2026-06-14T11:52:08.214Z",
  "disclaimer": "Preliminary qualification only — not legal advice. Human review required."
}`;

export default async function MapAiActObligationsToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.map-ai-act-obligations"
      description={
        fr
          ? "Énumération exhaustive des obligations AI Act applicables à un cas d’usage qualifié — ventilées par phase de cycle de vie (pre-go-live / continu / incident), avec articles, échéances (incluant les reports Digital Omnibus), actions opérationnelles et preuves attendues."
          : "Exhaustive enumeration of the AI Act obligations applicable to a qualified use case — split by lifecycle phase (pre-go-live / continuous / on-incident), with articles, deadlines (including Digital Omnibus deferrals), operational actions, and expected evidence."
      }
      badge="REASON"
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Cet outil produit une <strong>cartographie réglementaire préliminaire</strong>,
            pas un avis juridique. <code>requires_human_review</code> vaut toujours{" "}
            <code>true</code>. Les échéances reflètent le calendrier AI Act 2024/1689 figé
            dans le <code>regulatory_snapshot</code> — un juriste doit valider l’application
            au cas concret avant tout dépôt ou inspection.
          </>
        ) : (
          <>
            This tool produces a <strong>preliminary regulatory map</strong>, not legal
            advice. <code>requires_human_review</code> is always <code>true</code>.
            Deadlines reflect the AI Act 2024/1689 calendar frozen in the{" "}
            <code>regulatory_snapshot</code> — a lawyer must validate fit to the concrete
            case before any filing or inspection.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un système a déjà été qualifié — typiquement haut risque Annexe III, ou Annexe I, ou hors scope — et qu’il faut maintenant la liste exhaustive des articles AI Act qui s’appliquent, en quelle phase, à quelle date d’applicabilité, et quelles preuves doivent être prêtes. C’est la sortie qui alimente un plan de mise en conformité ou la réponse à un inspecteur."
          : "Use this tool when a system has already been qualified — typically as Annex III high-risk, Annex I, or out of scope — and you now need the exhaustive list of AI Act articles that apply, in what phase, on what applicable date, and what evidence must be ready. This is the output that feeds a compliance plan or the answer to an inspector."}
      </p>
      <p>
        {fr
          ? "La question board que la sortie tranche : « De quoi sommes-nous redevables, devant qui, et à quelle date ? » Le critical_path donne les cinq obligations pre-go-live non reportées par Digital Omnibus — celles à clôturer avant tout autre travail."
          : "The board-level question the output answers: “What are we accountable for, to whom, and by when?” The critical_path surfaces the five pre-go-live obligations not deferred by Digital Omnibus — the ones to close before any other work."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Cinq champs, dont quatre obligatoires. La qualification annex et provider_or_deployer doit déjà avoir été tranchée en amont (typiquement par acf.classify-agent ou par un juriste)."
          : "Five fields, four required. The annex and provider_or_deployer qualification must already be settled upstream (typically by acf.classify-agent or by a lawyer)."}
      </p>
      <ParamGroup>
        <Param name="annex" type='"iii" | "i" | "none"' required>
          {fr
            ? "Catégorie de risque AI Act déjà qualifiée. iii = haut risque Annexe III (RH, biométrie, infrastructure critique…) ; i = Annexe I (jouets, machines, dispositifs médicaux régulés) ; none = hors scope haut risque."
            : "AI Act risk category already qualified. iii = Annex III high-risk (HR, biometrics, critical infrastructure…); i = Annex I (toys, machinery, regulated medical devices); none = out of high-risk scope."}
        </Param>
        <Param name="use_case" type="string (10-500)" required>
          {fr
            ? "Description du cas d’usage. Sert à faire matcher les règles métier internes (recrutement, scoring crédit, etc.) qui ajoutent des fiches ACF® et obligations spécifiques."
            : "Use-case description. Used to fire internal business rules (recruitment, credit scoring, etc.) that add specific ACF® cards and obligations."}
        </Param>
        <Param
          name="provider_or_deployer"
          type='"provider" | "deployer" | "both"'
          required
        >
          {fr
            ? "Rôle AI Act du demandeur. deployer ajoute Art. 26 et Art. 27 (FRIA) ; provider ajoute la chaîne Art. 9-15 + Art. 43."
            : "Caller’s AI Act role. deployer adds Art. 26 and Art. 27 (FRIA); provider adds the Art. 9-15 chain + Art. 43."}
        </Param>
        <Param name="gpai_used" type="boolean">
          {fr
            ? "Le système utilise-t-il un GPAI (LLM généraliste) en sous-couche ? Active les obligations GPAI Art. 51-55 et renforce Art. 50 (transparence)."
            : "Does the system use a GPAI (general-purpose LLM) under the hood? Activates GPAI obligations Art. 51-55 and strengthens Art. 50 (transparency)."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue de la sortie textuelle (titres d’articles, rationales)."
            : "Language of the textual output (article titles, rationales)."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "La sortie est un objet structuré ventilant les obligations par phase de cycle de vie, plus métadonnées et pied-de-page signé."
          : "The output is a structured object splitting obligations by lifecycle phase, plus metadata and signed footer."}
      </p>
      <ParamGroup>
        <Param
          name="obligations"
          type="{ pre_go_live: Obligation[], continuous: Obligation[], on_incident: Obligation[] }"
        >
          {fr
            ? "Obligations classées par phase. Chaque Obligation contient article, title, requirement, deadline, fiches ACF® liées, operational_actions, evidence_required et digital_omnibus_deferred."
            : "Obligations classified by phase. Each Obligation carries article, title, requirement, deadline, linked ACF® fiches, operational_actions, evidence_required, and digital_omnibus_deferred."}
        </Param>
        <Param name="total_count" type="number">
          {fr
            ? "Nombre total d’obligations toutes phases confondues."
            : "Total number of obligations across all phases."}
        </Param>
        <Param name="critical_path" type="string[]">
          {fr
            ? "Maximum cinq obligations pre-go-live non reportées par Digital Omnibus — c’est la liste à clôturer en priorité absolue."
            : "Up to five pre-go-live obligations not deferred by Digital Omnibus — the list to close as top priority."}
        </Param>
        <Param name="confidence" type='"low" | "medium" | "high"'>
          {fr
            ? "Niveau de confiance global. low si annex=none mais que des règles ont matché sur le use_case (contradiction)."
            : "Global confidence level. low if annex=none but rules fired on the use_case (contradiction)."}
        </Param>
        <Param name="assumptions" type="string[]">
          {fr
            ? "Hypothèses explicites — par exemple, contradiction détectée entre l’annex déclaré et les règles qui ont matché."
            : "Explicit assumptions — for example, a detected contradiction between the declared annex and the rules that fired."}
        </Param>
        <Param name="gaps_to_validate" type="string[]">
          {fr
            ? "Trous identifiés que la revue humaine doit combler avant d’agir sur la cartographie."
            : "Identified gaps that the human review must close before acting on the map."}
        </Param>
        <Param name="rationale_per_rule" type="RationaleRecord[]">
          {fr
            ? "Trace par règle interne : id, version, fired (true/false), evidence textuelle. Sert l’audit trail signé."
            : "Per-internal-rule trace: id, version, fired (true/false), textual evidence. Feeds the signed audit trail."}
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
          ? "Un déployeur d’agent de présélection CV (Annexe III §4 — emploi) :"
          : "A deployer of a CV screening agent (Annex III §4 — employment):"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock
                code={NODE_SAMPLE}
                language="typescript"
                filename="map-obligations.ts"
              />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock
                code={PYTHON_SAMPLE}
                language="python"
                filename="map_obligations.py"
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
            ? "annex reçoit autre chose que iii / i / none, ou provider_or_deployer autre chose que provider / deployer / both. Corrigez vers l’une des valeurs canoniques."
            : "annex receives something other than iii / i / none, or provider_or_deployer something other than provider / deployer / both. Fix to a canonical value."}
        </li>
        <li>
          <code>InputTooShort</code> —{" "}
          {fr
            ? "use_case &lt; 10 caractères. Une description tronquée empêche les règles métier de matcher — précisez le cas."
            : "use_case &lt; 10 chars. A truncated description prevents business rules from firing — be specific."}
        </li>
        <li>
          <code>DoctrineSnapshotMismatch</code> —{" "}
          {fr
            ? "le snapshot réglementaire chargé ne correspond pas au doctrine_hash demandé. Mettez acf-mcp à jour ou pointez explicitement vers la version archivée."
            : "the loaded regulatory snapshot does not match the requested doctrine_hash. Update acf-mcp or explicitly point at the archived version."}
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
            ? "obtenir la qualification annex + provider_or_deployer avant d’appeler cet outil."
            : "obtain the annex + provider_or_deployer qualification before calling this tool."}
        </li>
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
            ? "traduire les obligations en contrôles DDAO concrets avec budget et effort estimé."
            : "translate obligations into concrete DDAO controls with budget and estimated effort."}
        </li>
        <li>
          <a
            href={
              fr
                ? "/fr/tools/acf.regulation.article"
                : "/tools/acf.regulation.article"
            }
          >
            <code>acf.regulation.article</code>
          </a>{" "}
          —{" "}
          {fr
            ? "récupérer le texte vérifié d’un article AI Act spécifique cité dans la cartographie."
            : "fetch the verified text of a specific AI Act article cited in the map."}
        </li>
      </ul>
    </DocsPage>
  );
}
