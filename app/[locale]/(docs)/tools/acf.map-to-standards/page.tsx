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
  name: "acf.map-to-standards",
  arguments: {
    fiche_id: "ACF-09",
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
                "acf.map-to-standards",
                arguments={
                    "fiche_id": "ACF-09",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "fiches": [
    {
      "fiche_id": "ACF-09",
      "total_articles": 6,
      "mappings": [
        {
          "regulation": "ai-act",
          "regulation_label": "AI Act: Regulation (EU) 2024/1689",
          "articles": [
            {
              "article": "10",
              "title": "Data and data governance (high-risk AI)",
              "operational_note": "ACF operationalises Art. 10 via ACF-09 (decision register) + ACF-P14 (retention policy).",
              "source": "Regulation (EU) 2024/1689, Article 10",
              "applicable_date": "2027-12-02"
            },
            {
              "article": "12",
              "title": "Record-keeping (logging)",
              "operational_note": "ACF operationalises Art. 12 via ACF-09 (time-stamped decision register) + ACF-09 (reconstructible audit trail), a direct expression of P4.",
              "source": "Regulation (EU) 2024/1689, Article 12",
              "applicable_date": "2027-12-02"
            }
          ]
        },
        {
          "regulation": "gdpr",
          "regulation_label": "GDPR: Regulation (EU) 2016/679",
          "articles": [
            {
              "article": "30",
              "title": "Records of processing activities",
              "operational_note": "The ACF-09 decision register feeds and cross-checks the GDPR Art. 30 record for agentic processing.",
              "source": "Regulation (EU) 2016/679, Article 30"
            }
          ]
        },
        {
          "regulation": "dora",
          "regulation_label": "DORA: Regulation (EU) 2022/2554 (applicable since 2025-01-17)",
          "articles": [
            {
              "article": "17",
              "title": "ICT-related incident management process",
              "operational_note": "The decision register (ACF-09) and audit trail (ACF-09) provide the agentic-incident detection and notification evidence.",
              "source": "Regulation (EU) 2022/2554, Article 17",
              "applicable_date": "2025-01-17"
            }
          ]
        },
        {
          "regulation": "nis2",
          "regulation_label": "NIS2: Directive (EU) 2022/2555 (national transposition; deadline 2024-10-17)",
          "articles": [
            {
              "article": "23",
              "title": "Incident reporting obligations",
              "operational_note": "The reconstructible audit trail (P4, ACF-09/ACF-09) supplies the factual basis for timely incident notifications.",
              "source": "Directive (EU) 2022/2555, Article 23"
            }
          ]
        },
        {
          "regulation": "iso-42001",
          "regulation_label": "ISO/IEC 42001:2023: AI management system (AIMS)",
          "articles": [
            {
              "article": "9",
              "title": "Performance evaluation",
              "operational_note": "The clause 9 internal audit and review draw on the audit trail (ACF-09) and the improvement loop (ACF-10).",
              "source": "ISO/IEC 42001:2023, clause 9"
            }
          ]
        }
      ]
    }
  ],
  "total_fiches": 1,
  "total_articles_referenced": 6,
  "regulations_covered": [
    "ai-act",
    "gdpr",
    "dora",
    "nis2",
    "iso-42001"
  ],
  "doctrine_version": "1.0",
  "doctrine_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "permanent_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "regulatory_snapshot": "AI Act (Reg. (EU) 2024/1689) incl. Digital Omnibus deferrals · GDPR (Reg. (EU) 2016/679) · DORA (Reg. (EU) 2022/2554) · NIS2 (Dir. (EU) 2022/2555) · ISO/IEC 42001:2023: as interpreted on 2026-06-07",
  "served_locale": "en",
  "requires_human_review": true,
  "disclaimer": "Preliminary qualification produced by the ACF® deterministic engine. Not legal advice. Human review required. Do not use for autonomous regulatory decision-making. See doctrine_archive_url for the version of the doctrine used.",
  "source_note": "Mappings reflect ACF v1.0 doctrine. The reverse-index is derived from content/guides/regulation-articles.json (the same source consumed by acf.regulation.article). For verbatim regulatory text, consult the cited source instrument."
}`;

export default async function MapToStandardsToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.map-to-standards"
      description={
        fr
          ? "Index inversé entre les fiches du toolkit ACF® et les articles des référentiels externes (AI Act, RGPD, DORA, NIS2, ISO/IEC 42001) : pour une fiche, les articles qu’elle opérationnalise ; sans fiche, l’inventaire complet des fiches citées par la correspondance."
          : "Reverse index between the ACF® toolkit cards and the articles of the external standards (AI Act, GDPR, DORA, NIS2, ISO/IEC 42001): for one card, the articles it operationalises; without a card, the full inventory of the cards the mapping cites."
      }
      badge="REASON"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            L’outil lit la même correspondance que <code>acf.regulation.article</code>, dans
            l’autre sens : <code>acf.regulation.article</code> part d’un article, celui-ci part
            d’une fiche. Les deux renvoient donc toujours des réponses cohérentes.
          </>
        ) : (
          <>
            The tool reads the same mapping as <code>acf.regulation.article</code>, the other
            way round: <code>acf.regulation.article</code> starts from an article, this one
            starts from a card. Both therefore always return consistent answers.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un DDAO, un auditeur ou un responsable conformité doit montrer à quels articles réglementaires se rattache une fiche déjà remplie, par exemple pour argumenter qu’un registre des décisions (ACF-09) couvre la journalisation de l’AI Act et le registre de l’article 30 du RGPD. Sans fiche_id, il sert à préparer un audit croisé ou une revue de couverture."
          : "Use this tool when a DDAO, an auditor or a compliance officer has to show which regulatory articles a completed card relates to, for instance to argue that a decision register (ACF-09) covers AI Act record-keeping and the GDPR Article 30 record. Without fiche_id, it helps prepare a cross-mapping audit or a coverage review."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr ? "Trois champs, tous optionnels." : "Three fields, all optional."}
      </p>
      <ParamGroup>
        <Param name="fiche_id" type='"ACF-01" .. "ACF-20" | "ACF-O1" .. "ACF-O10" | "ACF-P1" .. "ACF-P15"'>
          {fr
            ? "Code d’une des 45 fiches. Absent, l’outil renvoie toutes les fiches que la correspondance cite."
            : "Code of one of the 45 cards. When absent, the tool returns every card the mapping cites."}
        </Param>
        <Param name="regulations" type='("ai-act" | "gdpr" | "dora" | "nis2" | "iso-42001")[]'>
          {fr
            ? "Restreint la réponse à certains référentiels. Par défaut, les cinq."
            : "Restricts the answer to some standards. By default, all five."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr ? "Langue des intitulés et des notes opérationnelles." : "Language of the headings and operational notes."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <ParamGroup>
        <Param
          name="fiches"
          type="{ fiche_id, total_articles, mappings: { regulation, regulation_label, articles: { article, title, operational_note, source, applicable_date? }[] }[] }[]"
        >
          {fr
            ? "Pour chaque fiche, les articles rattachés, regroupés par référentiel, avec la note opérationnelle et la référence officielle."
            : "For each card, the related articles, grouped by standard, with the operational note and the official reference."}
        </Param>
        <Param name="total_fiches" type="number">
          {fr ? "Nombre de fiches renvoyées." : "Number of cards returned."}
        </Param>
        <Param name="total_articles_referenced" type="number">
          {fr ? "Nombre total de rattachements fiche-article." : "Total number of card-article links."}
        </Param>
        <Param name="regulations_covered" type="string[]">
          {fr ? "Référentiels interrogés." : "Standards queried."}
        </Param>
        <Param name="requires_human_review" type="true">
          {fr
            ? "Toujours true : la correspondance sert à argumenter et ne constitue pas un avis juridique."
            : "Always true: the mapping supports an argument, it is not legal advice."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "Les articles auxquels se rattache le Registre des Décisions Agentiques (ACF-09) :"
          : "The articles the Agentic Decisions Register (ACF-09) relates to:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: <CodeBlock code={NODE_SAMPLE} language="typescript" filename="map-to-standards.ts" />,
          },
          {
            label: "Python",
            content: <CodeBlock code={PYTHON_SAMPLE} language="python" filename="map_to_standards.py" />,
          },
        ]}
      />

      <h3 id="example-response">{fr ? "Réponse" : "Response"}</h3>
      <CodeBlock code={RESPONSE_SAMPLE} language="json" filename="response.json" />

      <h2 id="errors">{fr ? "Erreurs courantes" : "Common errors"}</h2>
      <ul>
        <li>
          {fr
            ? "Paramètres invalides : fiche_id hors des 45 codes (y compris l’ancien ACF-00) ou référentiel inconnu. L’appel échoue avec une erreur JSON-RPC dont le message liste les champs en cause."
            : "Invalid parameters: fiche_id outside the 45 codes (including the former ACF-00) or unknown standard. The call fails with a JSON-RPC error whose message lists the offending fields."}
        </li>
        <li>
          {fr
            ? "total_articles à 0 : la fiche existe mais la correspondance ne la cite pour aucun article des référentiels demandés."
            : "total_articles at 0: the card exists but the mapping cites it for no article of the requested standards."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools/acf.regulation.article" : "/tools/acf.regulation.article"}>
            <code>acf.regulation.article</code>
          </a>
          {": "}
          {fr ? "partir d’un article pour retrouver les fiches." : "start from an article to find the cards."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.fiche.lookup" : "/tools/acf.fiche.lookup"}>
            <code>acf.fiche.lookup</code>
          </a>
          {": "}
          {fr ? "lire la fiche avant de citer sa correspondance." : "read the card before citing its mapping."}
        </li>
      </ul>
    </DocsPage>
  );
}
