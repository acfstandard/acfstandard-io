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
  name: "acf.fiche.lookup",
  arguments: {
    code: "ACF-07",
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
                "acf.fiche.lookup",
                arguments={
                    "code": "ACF-07",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "code": "ACF-07",
  "title": "Kill Switch",
  "markdown": "\\n# Kill Switch\\n\\n*Emergency shutdown protocol*\\n\\n## Purpose of this card\\n\\nBe able to immediately shut down an agent or agentic system in the event of drift, incident, loss of control, or critical risk.\\n\\n## What the card asks you to fill in\\n\\n1. Agent concerned\\n2. Agent risk level\\n3.…",
  "metadata": {
    "code": "ACF-07",
    "slug": "kill-switch",
    "title": "Kill Switch",
    "title_en": "Kill Switch",
    "family": "decide",
    "order": 7,
    "related_fiches": [],
    "keywords": [
      "kill",
      "switch",
      "decide"
    ],
    "version": "2026-09",
    "pdf_url": "/toolkit/en/ACF-07_kill-switch.pdf"
  },
  "pdf_url": "/toolkit/en/ACF-07_kill-switch.pdf",
  "uri": "acf://fiche/ACF-07",
  "served_locale": "en",
  "is_fallback": false
}`;

export default async function FicheLookupToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.fiche.lookup"
      description={
        fr
          ? "Récupère le contenu d’une des 45 fiches du toolkit ACF® (ACF-01 à ACF-20, ACF-O1 à ACF-O10, ACF-P1 à ACF-P15) : titre, objectif, sections à remplir, famille et lien de la fiche imprimable. Aucune interprétation, le texte de la doctrine signée."
          : "Fetch the content of one of the 45 ACF® toolkit cards (ACF-01 to ACF-20, ACF-O1 to ACF-O10, ACF-P1 to ACF-P15): title, purpose, sections to fill in, family and link to the printable card. No interpretation, the text of the signed doctrine."
      }
      badge="READ"
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les outils <strong>READ</strong> renvoient le contenu signé du corpus,
            sans couche d’inférence. <code>acf.fiche.lookup</code> sert la fiche{" "}
            <strong>verbatim</strong>, telle que contenue dans la doctrine signée
            Ed25519 et vérifiable hors ligne : si vous la citez, vous citez
            exactement ce que le standard publie.
          </>
        ) : (
          <>
            <strong>READ</strong> tools return signed corpus content with no
            inference layer. <code>acf.fiche.lookup</code> serves the card{" "}
            <strong>verbatim</strong>, as contained in the Ed25519-signed doctrine,
            verifiable offline: if you quote it, you quote exactly what the
            standard publishes.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand vous avez identifié la fiche pertinente (par acf.search, par acf.classify-agent, ou parce que l’utilisateur l’a citée explicitement) et qu’il faut son contenu canonique pour répondre. Typiquement : préparer une réponse de mandat DDAO, rédiger un kill switch, justifier un sign-off, citer une fiche dans un audit."
          : "Use this tool once you have identified the relevant card (via acf.search, via acf.classify-agent, or because the user cited it explicitly) and you need its canonical content to answer. Typical cases: drafting a DDAO mandate, designing a kill switch, justifying a sign-off, citing a card in an audit."}
      </p>
      <p>
        {fr
          ? "Citez toujours le code (ACF-07), pas le titre traduit. Les fiches sont la couche opérationnelle de la doctrine ; leur correspondance avec les principes et les référentiels se lit avec acf.map-to-standards et acf.regulation.article."
          : "Always cite the code (ACF-07), not the translated title. Cards are the operational layer of the doctrine; their mapping to the principles and the standards is available through acf.map-to-standards and acf.regulation.article."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Trois champs. Le code est strictement validé contre /^ACF-(0[1-9]|1[0-9]|20|O([1-9]|10)|P([1-9]|1[0-5]))$/, aucun chemin arbitraire n’est possible."
          : "Three fields. The code is strictly validated against /^ACF-(0[1-9]|1[0-9]|20|O([1-9]|10)|P([1-9]|1[0-5]))$/, so no arbitrary path is possible."}
      </p>
      <ParamGroup>
        <Param name="code" type='"ACF-01" .. "ACF-20" | "ACF-O1" .. "ACF-O10" | "ACF-P1" .. "ACF-P15"' required>
          {fr
            ? "Code canonique de la fiche, sur 6 caractères, casse exacte. Toute autre forme (« acf-7 », « ACF7 », « ACF-007 », « ACF-00 ») est rejetée."
            : "Canonical six-char card code, exact case. Any other form (“acf-7”, “ACF7”, “ACF-007”, “ACF-00”) is rejected."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue demandée. Si la fiche n’existe pas dans cette langue, la chaîne de fallback est appliquée et served_locale + is_fallback le signalent dans la sortie."
            : "Requested locale. If the card is not available in that locale, the fallback chain kicks in and served_locale + is_fallback flag it in the output."}
        </Param>
        <Param name="include_frontmatter" type="boolean" defaultValue="false">
          {fr
            ? "Ajoute dans metadata les métadonnées de la fiche (slug, famille, ordre, fiches liées, mots-clés, version)."
            : "Adds the card metadata (slug, family, order, related cards, keywords, version) under metadata."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Un objet JSON : identité de la fiche, contenu en markdown à rendre tel quel, lien de la fiche imprimable et langue servie."
          : "A JSON object: card identity, markdown content to render as-is, link to the printable card and served locale."}
      </p>
      <ParamGroup>
        <Param name="code" type="string">
          {fr ? "Le code de la fiche servie." : "The code of the served card."}
        </Param>
        <Param name="title" type="string">
          {fr ? "Titre de la fiche dans la langue servie." : "Card title in the served locale."}
        </Param>
        <Param name="markdown" type="string (markdown)">
          {fr
            ? "Contenu de la fiche : sous-titre, objectif, sections que la fiche fait remplir, famille, lien de téléchargement."
            : "Card content: subtitle, purpose, sections the card asks you to fill in, family, download link."}
        </Param>
        <Param name="metadata" type="object">
          {fr
            ? "Métadonnées de la fiche si include_frontmatter vaut true, sinon objet vide."
            : "Card metadata when include_frontmatter is true, otherwise an empty object."}
        </Param>
        <Param name="pdf_url" type="string">
          {fr
            ? "Chemin de la fiche imprimable sur acfstandard.com (ex. /toolkit/ACF-07_kill-switch.pdf)."
            : "Path of the printable card on acfstandard.com (e.g. /toolkit/en/ACF-07_kill-switch.pdf)."}
        </Param>
        <Param name="uri" type="string">
          {fr ? "URI de la ressource MCP (acf://fiche/ACF-XX)." : "MCP resource URI (acf://fiche/ACF-XX)."}
        </Param>
        <Param name="served_locale" type='"en" | "fr"'>
          {fr
            ? "Langue effectivement servie après application de la chaîne de repli."
            : "Locale actually served after applying the fallback chain."}
        </Param>
        <Param name="is_fallback" type="boolean">
          {fr
            ? "true si la langue servie diffère de la langue demandée : signalez-le à l’utilisateur."
            : "true if the served locale differs from the requested one: tell the user."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "L’agent récupère la fiche ACF-07 (Kill Switch) pour rédiger une réponse à l’audit DORA :"
          : "The agent fetches ACF-07 (Kill Switch) while drafting a DORA audit answer:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock code={NODE_SAMPLE} language="typescript" filename="fiche-lookup.ts" />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock code={PYTHON_SAMPLE} language="python" filename="fiche_lookup.py" />
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
            ? "Code invalide : toute valeur hors du format des 45 fiches (y compris l’ancien ACF-00) fait échouer la validation des paramètres ; l’erreur JSON-RPC indique le champ code."
            : "Invalid code: any value outside the format of the 45 cards (including the former ACF-00) fails parameter validation; the JSON-RPC error names the code field."}
        </li>
        <li>
          {fr
            ? "« Fiche ACF-XX not found in any locale chain » : le code est valide mais la fiche n’est servie dans aucune langue de la chaîne de repli. Vérifiez la version installée d’acf-mcp."
            : "“Fiche ACF-XX not found in any locale chain”: the code is valid but the card is not served in any locale of the fallback chain. Check the installed acf-mcp version."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools/acf.search" : "/tools/acf.search"}>
            <code>acf.search</code>
          </a>
          {": "}
          {fr
            ? "trouver le code de la fiche pertinente avant de la lire en détail."
            : "find the relevant card code before fetching it in detail."}
        </li>
        <li>
          <a
            href={fr ? "/fr/tools/acf.regulation.article" : "/tools/acf.regulation.article"}
          >
            <code>acf.regulation.article</code>
          </a>
          {": "}
          {fr
            ? "remonter du texte réglementaire vers les fiches qui l’opérationnalisent."
            : "trace from regulatory text back to the cards that operationalise it."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.classify-agent" : "/tools/acf.classify-agent"}>
            <code>acf.classify-agent</code>
          </a>
          {": "}
          {fr
            ? "obtenir la liste des fiches applicables à un agent à qualifier (applicable_fiches dans la sortie)."
            : "get the list of cards applicable to an agent (applicable_fiches in the output)."}
        </li>
      </ul>
    </DocsPage>
  );
}
