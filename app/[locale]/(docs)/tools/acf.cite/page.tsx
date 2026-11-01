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
  name: "acf.cite",
  arguments: {
    uri: "acf://fiche/ACF-04",
    style: "apa",
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
                "acf.cite",
                arguments={
                    "uri": "acf://fiche/ACF-04",
                    "style": "apa",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "citation": "Dorange, V. (2026). Agentic Commerce Framework® (ACF®): acf://fiche/ACF-04. ACF Standard. https://acfstandard.com/toolkit/en/ACF-04_agentic-constitution.pdf",
  "structured": {
    "author": "Dorange, V.",
    "year": "2026",
    "title": "Agentic Commerce Framework® (ACF®): acf://fiche/ACF-04",
    "url": "https://acfstandard.com/toolkit/en/ACF-04_agentic-constitution.pdf"
  }
}`;

export default async function CiteToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.cite"
      description={
        fr
          ? "Génère une citation académique d’une ressource ACF® dans le style demandé : APA, MLA, Chicago, ISO 690 ou BibTeX. URI en entrée, citation formatée + version structurée en sortie."
          : "Generates an academic citation of an ACF® resource in the requested style: APA, MLA, Chicago, ISO 690 or BibTeX. URI in, formatted citation + structured version out."
      }
      badge="READ"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Outil de <strong>lecture</strong>. Aucune inférence : la citation
            est dérivée déterministiquement de l’URI et du snapshot de
            doctrine signé. Auteur, année, URL, tous ancrés sur la version
            archivée. Utilisez-le pour les thèses, mémoires, dossiers
            réglementaires, papiers académiques.
          </>
        ) : (
          <>
            <strong>Read</strong> tool. No inference: the citation is
            deterministically derived from the URI and the signed doctrine
            snapshot. Author, year, URL, all anchored on the archived
            version. Use it for theses, dissertations, regulatory filings,
            academic papers.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un livrable doit référencer ACF® de manière formelle : une thèse universitaire, un dossier de conformité soumis à un régulateur, un mémo board, un papier académique. Une citation maison dérive, versions, dates, attributions, et fait perdre la traçabilité. L’outil garantit que toutes les citations d’une même ressource pointent vers la même version figée."
          : "Use this tool when a deliverable must reference ACF® formally: a university thesis, a compliance filing submitted to a regulator, a board memo, an academic paper. A hand-rolled citation drifts, versions, dates, attribution, and traceability breaks. The tool guarantees that every citation of a given resource points at the same frozen version."}
      </p>
      <p>
        {fr
          ? "L’outil renvoie la citation formatée (chaîne prête à copier dans un document) ET sa forme structurée (auteur, année, titre, URL), utile quand l’outil de gestion bibliographique attend des champs séparés (Zotero, Mendeley, EndNote, OBSIDIAN bibtex, etc.)."
          : "The tool returns the formatted citation (a string ready to paste into a document) AND its structured form (author, year, title, URL), useful when the reference manager expects discrete fields (Zotero, Mendeley, EndNote, OBSIDIAN bibtex, etc.)."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Trois champs. La ressource est désignée par son URI ACF® (acf://…), pas par un slug humain : c’est ce qui assure la stabilité de la citation à travers le temps."
          : "Three fields. The resource is addressed by its ACF® URI (acf://…), not by a human slug: this is what keeps the citation stable over time."}
      </p>
      <ParamGroup>
        <Param name="uri" type="string (acf://…)" required>
          {fr
            ? "URI de la ressource à citer. Exemples : acf://fiche/ACF-04, acf://framework/principle/P1, acf://glossary/DDAO, acf://whitepaper, acf://guide/ai-act."
            : "URI of the resource to cite. Examples: acf://fiche/ACF-04, acf://framework/principle/P1, acf://glossary/DDAO, acf://whitepaper, acf://guide/ai-act."}
        </Param>
        <Param
          name="style"
          type='"apa" | "mla" | "chicago" | "iso-690" | "bibtex"'
          defaultValue='"apa"'
        >
          {fr
            ? "Style de citation. APA pour les sciences sociales, MLA pour les sciences humaines, Chicago pour les textes longs, ISO 690 pour les filings européens, BibTeX pour LaTeX."
            : "Citation style. APA for social sciences, MLA for humanities, Chicago for long-form, ISO 690 for European filings, BibTeX for LaTeX."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue du titre dans la citation."
            : "Language of the title in the citation."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Un objet plat : la citation formatée + la version structurée + le pied-de-page signé."
          : "A flat object: formatted citation + structured version + signed footer."}
      </p>
      <ParamGroup>
        <Param name="citation" type="string">
          {fr
            ? "La citation formatée selon le style demandé, prête à coller dans un document."
            : "The formatted citation in the requested style, ready to paste into a document."}
        </Param>
        <Param
          name="structured"
          type="{ author: string, year: string, title: string, url: string }"
        >
          {fr
            ? "Champs discrets pour les outils de gestion bibliographique. URL pointe toujours vers la version archivée de la doctrine."
            : "Discrete fields for reference managers. URL always points at the archived doctrine version."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "Citer la fiche ACF-04 (Constitution Agentique) en APA :"
          : "Citing card ACF-04 (Agentic Constitution) in APA:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: <CodeBlock code={NODE_SAMPLE} language="typescript" filename="cite.ts" />,
          },
          {
            label: "Python",
            content: <CodeBlock code={PYTHON_SAMPLE} language="python" filename="cite.py" />,
          },
        ]}
      />

      <h3 id="example-response">{fr ? "Réponse" : "Response"}</h3>
      <p>
        {fr
          ? "Voici la sortie pour le même URI rendu en APA et en BibTeX (deux appels successifs), pour montrer la forme structurée commune :"
          : "Here is the output for the same URI rendered in APA and BibTeX (two successive calls), to show the shared structured form:"}
      </p>
      <CodeBlock code={RESPONSE_SAMPLE} language="json" filename="response.json" />

      <h2 id="errors">{fr ? "Erreurs courantes" : "Common errors"}</h2>
      <ul>
        <li>
          {fr
            ? "« Invalid scheme: expected acf:// » : l’URI ne commence pas par acf://. Récupérez-la depuis acf.search ou resources/list."
            : "“Invalid scheme: expected acf://”: the URI does not start with acf://. Get it from acf.search or resources/list."}
        </li>
        <li>
          {fr
            ? "style hors énumération : la validation des paramètres échoue et l’erreur JSON-RPC indique le champ style."
            : "style outside the enum: parameter validation fails and the JSON-RPC error names the style field."}
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
            ? "lire la fiche complète avant de la citer."
            : "read the full fiche before citing it."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.glossary.define" : "/tools/acf.glossary.define"}>
            <code>acf.glossary.define</code>
          </a>
          {": "}
          {fr
            ? "définir un terme avant de le citer dans un papier ou un dossier."
            : "define a term before citing it in a paper or filing."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.search" : "/tools/acf.search"}>
            <code>acf.search</code>
          </a>
          {": "}
          {fr
            ? "trouver l’URI canonique d’une ressource à partir d’une requête en langage naturel."
            : "find the canonical URI of a resource from a natural-language query."}
        </li>
      </ul>
    </DocsPage>
  );
}
