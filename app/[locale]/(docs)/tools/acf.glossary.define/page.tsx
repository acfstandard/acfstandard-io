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
  name: "acf.glossary.define",
  arguments: {
    term: "DDAO",
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
                "acf.glossary.define",
                arguments={
                    "term": "DDAO",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "term": "DDAO",
  "expansion": "Délégué à la Décision Agentique Officielle",
  "definition": "Named accountable officer for an autonomous agent's mandate. The DDAO owns the agent's go/no-go, the kill-switch design, the escalation thresholds, and the periodic mandate review. Cannot be a function — must be a named individual with documented authority and a documented backup.",
  "related": {
    "principles": ["P3", "P5"],
    "fiches": ["ACF-04", "ACF-06", "ACF-12"]
  },
  "served_locale": "en",
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "generated_at": "2026-06-14T11:47:22.318Z",
  "disclaimer": "Canonical ACF® definition — for governance and academic use. Not legal advice."
}`;

export default async function GlossaryDefineToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.glossary.define"
      description={
        fr
          ? "Définition canonique d’un terme du vocabulaire ACF® — un mot ou un acronyme en entrée, une définition signée + ses connexions au reste de la doctrine (principes, fiches) en sortie."
          : "Canonical definition of an ACF® vocabulary term — one word or acronym in, one signed definition + its connections to the rest of the doctrine (principles, fiches) out."
      }
      badge="READ"
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Outil de <strong>lecture</strong> du glossaire officiel. Aucune
            inférence, aucune reformulation — la définition retournée est
            l’entrée exacte du glossaire, avec son hash de doctrine et ses
            cross-références. Utilisez-le quand un terme doit être cité tel
            quel dans un dossier, un mémo board ou une thèse.
          </>
        ) : (
          <>
            <strong>Read</strong> tool over the official glossary. No
            inference, no rewording — the returned definition is the verbatim
            glossary entry, with its doctrine hash and cross-references. Use
            it when a term must be cited as-is in a filing, board memo or
            thesis.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand le vocabulaire de gouvernance devient ambigu : qu’est-ce qu’un DDAO ? Que recouvre exactement la Souveraineté Décisionnelle ? Quand un agent passe-t-il de N1 à N2 ? Plutôt que d’improviser une définition (qui dérivera entre deux documents), l’outil renvoie la version canonique signée — le même texte que vous trouverez dans le white paper ACF® et dans les fiches."
          : "Use this tool when governance vocabulary turns ambiguous: what is a DDAO? What does Decision Sovereignty exactly cover? When does an agent transition from N1 to N2? Instead of improvising a definition (which will drift between two documents), the tool returns the canonical signed version — the same text you will find in the ACF® white paper and in the fiches."}
      </p>
      <p>
        {fr
          ? "La valeur n’est pas la définition seule : ce sont les cross-références. Chaque entrée pointe vers les principes ACF® qu’elle active et les fiches méthodologiques qui l’opérationnalisent. Le glossaire est l’entry-point le plus court vers le reste de la doctrine."
          : "The value is not the definition alone: it is the cross-references. Each entry points at the ACF® principles it activates and the methodological cards that operationalise it. The glossary is the shortest entry-point into the rest of the doctrine."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Deux champs. La recherche est insensible à la casse et match indifféremment le terme abrégé (« DDAO ») ou son expansion (« Délégué à la Décision Agentique Officielle »)."
          : "Two fields. Lookup is case-insensitive and matches either the short term (“DDAO”) or its expansion (“Délégué à la Décision Agentique Officielle”) indifferently."}
      </p>
      <ParamGroup>
        <Param name="term" type="string (1-80)" required>
          {fr
            ? "Terme ou acronyme à définir. Exemples : « DDAO », « Souveraineté Décisionnelle », « N2 », « kill switch », « mandat »."
            : "Term or acronym to define. Examples: “DDAO”, “Decision Sovereignty”, “N2”, “kill switch”, “mandate”."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue de la définition. Si la version demandée n’existe pas, l’outil tombe sur le fallback canonique et le signale via served_locale."
            : "Language of the definition. If the requested version does not exist, the tool falls back to the canonical version and signals it via served_locale."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Un objet plat : la définition + ses connexions + le pied-de-page signé."
          : "A flat object: definition + connections + signed footer."}
      </p>
      <ParamGroup>
        <Param name="term" type="string">
          {fr
            ? "Le terme exact tel qu’indexé dans le glossaire (casse canonique)."
            : "The exact term as indexed in the glossary (canonical casing)."}
        </Param>
        <Param name="expansion" type="string?">
          {fr
            ? "Expansion de l’acronyme quand le terme est un sigle. Absent sinon."
            : "Expansion of the acronym when the term is an initialism. Absent otherwise."}
        </Param>
        <Param name="definition" type="string">
          {fr
            ? "La définition canonique. Texte verbatim du glossaire — aucune reformulation."
            : "The canonical definition. Verbatim text from the glossary — no rewording."}
        </Param>
        <Param name="related" type="{ principles: string[], fiches: string[] }">
          {fr
            ? "Cross-références : codes des principes ACF® (P1-P7) et des fiches méthodologiques (ACF-00 à ACF-16) liés au terme."
            : "Cross-references: codes of the ACF® principles (P1-P7) and methodological cards (ACF-00 to ACF-16) tied to the term."}
        </Param>
        <Param name="served_locale" type='"en" | "fr"'>
          {fr
            ? "Locale réellement servie. Diffère du paramètre d’entrée si un fallback a été activé."
            : "Locale actually served. Differs from the input parameter if a fallback was triggered."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "Définir le terme « DDAO » avant de le citer dans un dossier de gouvernance :"
          : "Defining the term “DDAO” before citing it in a governance filing:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock code={NODE_SAMPLE} language="typescript" filename="glossary-define.ts" />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock code={PYTHON_SAMPLE} language="python" filename="glossary_define.py" />
            ),
          },
        ]}
      />

      <h3 id="example-response">{fr ? "Réponse" : "Response"}</h3>
      <CodeBlock code={RESPONSE_SAMPLE} language="json" filename="response.json" />

      <h2 id="errors">{fr ? "Erreurs courantes" : "Common errors"}</h2>
      <ul>
        <li>
          <code>GlossaryEntryNotFound</code> —{" "}
          {fr
            ? "le terme demandé n’existe pas dans le glossaire. Essayez une variante (« DDAO » plutôt que « Officier de Décision Agentique ») ou utilisez acf.search pour identifier le terme canonique."
            : "the requested term does not exist in the glossary. Try a variant (“DDAO” rather than “Agentic Decision Officer”) or use acf.search to identify the canonical term."}
        </li>
        <li>
          <code>InputTooLong</code> —{" "}
          {fr
            ? "le champ term dépasse 80 caractères. L’outil cherche un terme, pas une phrase — raccourcissez."
            : "the term field exceeds 80 characters. The tool looks up a term, not a sentence — shorten it."}
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
          <a href={fr ? "/fr/tools/acf.search" : "/tools/acf.search"}>
            <code>acf.search</code>
          </a>{" "}
          —{" "}
          {fr
            ? "trouver le terme canonique quand on ne connaît pas l’intitulé exact."
            : "find the canonical term when the exact label is unknown."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.fiche.lookup" : "/tools/acf.fiche.lookup"}>
            <code>acf.fiche.lookup</code>
          </a>{" "}
          —{" "}
          {fr
            ? "lire intégralement les fiches méthodologiques citées dans related.fiches."
            : "read in full the methodological cards listed in related.fiches."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.cite" : "/tools/acf.cite"}>
            <code>acf.cite</code>
          </a>{" "}
          —{" "}
          {fr
            ? "produire une citation académique formatée pour réutiliser la définition dans un document."
            : "produce a formatted academic citation to reuse the definition in a document."}
        </li>
      </ul>
    </DocsPage>
  );
}
