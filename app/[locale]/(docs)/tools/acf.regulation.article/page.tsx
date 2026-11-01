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
  name: "acf.regulation.article",
  arguments: {
    regulation: "ai-act",
    article: "14",
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
                "acf.regulation.article",
                arguments={
                    "regulation": "ai-act",
                    "article": "14",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "regulation": "ai-act",
  "article": "14",
  "title": "Human oversight (high-risk AI)",
  "text": "High-risk AI systems shall be designed so they can be effectively overseen by natural persons during use, including through stop mechanisms. See Regulation (EU) 2024/1689, Article 14.",
  "mapping": {
    "principles": [
      "P3"
    ],
    "fiches": [
      "ACF-07",
      "ACF-P6",
      "ACF-P7"
    ],
    "operational_note": "ACF operationalises Art. 14 via P3 (ultimate human control), ACF-07 (kill switch), ACF-P6 (escalation thresholds), ACF-P7 (human-takeover drills)."
  },
  "source": "Regulation (EU) 2024/1689, Article 14",
  "applicable_date": "2027-12-02"
}`;

export default async function RegulationArticleToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.regulation.article"
      description={
        fr
          ? "Récupère le texte vérifié d’un article réglementaire (AI Act, RGPD, DORA, NIS2, ISO 42001) et sa traduction opérationnelle ACF® : principes activés, fiches qui l’opérationnalisent, note de mise en œuvre et date d’application."
          : "Fetch the verified text of a regulatory article (AI Act, GDPR, DORA, NIS2, ISO 42001) and its operational translation into ACF®: activated principles, cards that operationalise it, implementation note and date of application."
      }
      badge="READ"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les outils <strong>READ</strong> renvoient le contenu signé du corpus,
            sans couche d’inférence. Le champ <code>text</code> est un résumé de
            l’article, avec sa référence officielle dans <code>source</code> : pour un
            dépôt réglementaire, citez toujours le texte officiel (JOUE/CELEX, ISO…).
          </>
        ) : (
          <>
            <strong>READ</strong> tools return signed corpus content with no
            inference layer. The <code>text</code> field summarises the article, with its
            official reference in <code>source</code>: for a regulatory filing, always
            cite the official text (OJEU/CELEX, ISO…).
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un régulateur, un auditeur ou un comité de direction cite un article précis et qu’il faut renvoyer (a) le texte vérifié et (b) sa lecture opérationnelle ACF®. Exemples : « AI Act Art. 9, comment vous le couvrez ? », « RGPD Art. 35, votre AIPD intègre-t-elle l’agent ? », « DORA Art. 28, tiers critiques ? ». L’outil donne en une réponse le texte et le pont vers vos fiches."
          : "Use this tool when a regulator, auditor or board references a specific article and you have to return (a) the verified text and (b) its ACF® operational reading. Examples: “AI Act Art. 9, how do you cover it?”, “GDPR Art. 35, does your DPIA include the agent?”, “DORA Art. 28, critical third parties?”. The tool returns the text and the bridge to your cards in one shot."}
      </p>
      <p>
        {fr
          ? "La sortie a une vocation pédagogique et de cadrage : elle explique quels principes ACF® l’article active et quelles fiches du toolkit l’opérationnalisent. C’est l’angle « traducteur » entre droit dur et opérations, il ne remplace pas un avis juridique."
          : "The output has a pedagogical and scoping intent: it explains which ACF® principles the article activates and which toolkit cards operationalise it. This is the “translator” angle between hard law and operations, it does not replace legal advice."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Trois champs. regulation est strictement énuméré ; article est le numéro seul, sans « Art. »."
          : "Three fields. regulation is a strict enum; article is the bare number, without “Art.”."}
      </p>
      <ParamGroup>
        <Param
          name="regulation"
          type='"ai-act" | "gdpr" | "dora" | "nis2" | "iso-42001"'
          required
        >
          {fr
            ? "Identifiant canonique de la réglementation. Cinq guides publiés ; toute autre valeur est rejetée."
            : "Canonical regulation identifier. Five guides published; any other value is rejected."}
        </Param>
        <Param name="article" type="string (1-20)" required>
          {fr
            ? "Numéro de l’article ou de la clause, sans préfixe. Articles couverts : AI Act 9, 10, 12, 13, 14 ; RGPD 5, 22, 25, 30, 35 ; DORA 5, 6, 11, 17, 28 ; NIS2 20, 21, 23 ; ISO 42001 6, 8, 9 et A (annexe A)."
            : "Article or clause number, without prefix. Covered articles: AI Act 9, 10, 12, 13, 14; GDPR 5, 22, 25, 30, 35; DORA 5, 6, 11, 17, 28; NIS2 20, 21, 23; ISO 42001 6, 8, 9 and A (Annex A)."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue du titre, du texte et de la note opérationnelle."
            : "Language of the title, text and operational note."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Un objet JSON : l’article, son résumé, sa référence officielle et sa traduction ACF®."
          : "A JSON object: the article, its summary, its official reference and its ACF® translation."}
      </p>
      <ParamGroup>
        <Param name="regulation" type="string">
          {fr ? "Identifiant de la réglementation demandée." : "Identifier of the requested regulation."}
        </Param>
        <Param name="article" type="string">
          {fr ? "Numéro de l’article demandé." : "Number of the requested article."}
        </Param>
        <Param name="title" type="string">
          {fr ? "Intitulé de l’article (« Contrôle humain » pour l’art. 14 de l’AI Act)." : "Article heading (“Human oversight” for AI Act Art. 14)."}
        </Param>
        <Param name="text" type="string">
          {fr ? "Résumé de l’article, avec renvoi au texte officiel." : "Summary of the article, with a pointer to the official text."}
        </Param>
        <Param name="mapping" type="{ principles: string[], fiches: string[], operational_note: string }">
          {fr
            ? "Traduction ACF® : principes activés (P1 à P4), fiches du toolkit qui l’opérationnalisent et note de mise en œuvre."
            : "ACF® translation: activated principles (P1 to P4), toolkit cards that operationalise it and implementation note."}
        </Param>
        <Param name="source" type="string">
          {fr ? "Référence officielle (règlement, directive ou norme, et article)." : "Official reference (regulation, directive or standard, and article)."}
        </Param>
        <Param name="applicable_date" type="string (ISO date)">
          {fr ? "Date d’application de l’article quand elle est connue." : "Date of application of the article when known."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "L’agent prépare une réponse à une question régulateur sur l’AI Act Art. 14 (supervision humaine) :"
          : "The agent prepares a regulator-question answer on AI Act Art. 14 (human oversight):"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock
                code={NODE_SAMPLE}
                language="typescript"
                filename="regulation-article.ts"
              />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock
                code={PYTHON_SAMPLE}
                language="python"
                filename="regulation_article.py"
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
            ? "« Article ai-act Art. 15 not found. Available articles for ai-act: 9, 10, 12, 13, 14. » : l’article n’est pas couvert, le message liste ceux qui le sont. Passez le numéro seul, sans « Art. »."
            : "“Article ai-act Art. 15 not found. Available articles for ai-act: 9, 10, 12, 13, 14.”: the article is not covered, the message lists the covered ones. Pass the bare number, without “Art.”."}
        </li>
        <li>
          {fr
            ? "Réglementation inconnue : toute valeur hors des cinq identifiants fait échouer la validation des paramètres ; l’erreur JSON-RPC indique le champ regulation."
            : "Unknown regulation: any value outside the five identifiers fails parameter validation; the JSON-RPC error names the regulation field."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools/acf.fiche.lookup" : "/tools/acf.fiche.lookup"}>
            <code>acf.fiche.lookup</code>
          </a>
          {": "}
          {fr
            ? "lire les fiches listées dans mapping.fiches."
            : "fetch the cards listed in mapping.fiches."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.search" : "/tools/acf.search"}>
            <code>acf.search</code>
          </a>
          {": "}
          {fr
            ? "quand l’article exact n’est pas connu, lancer une recherche textuelle pour le localiser."
            : "when the exact article is unknown, run a text search to locate it."}
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
            ? "pour l’AI Act, obtenir l’ensemble exhaustif des articles applicables à un agent qualifié haut risque, pas un seul."
            : "for the AI Act, get the exhaustive set of articles applicable to a high-risk agent, not just one."}
        </li>
      </ul>
    </DocsPage>
  );
}
