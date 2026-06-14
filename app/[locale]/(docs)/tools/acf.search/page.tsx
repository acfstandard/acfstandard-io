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
  name: "acf.search",
  arguments: {
    query: "kill switch escalation thresholds",
    scope: "all",
    locale: "en",
    limit: 5,
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
                "acf.search",
                arguments={
                    "query": "kill switch escalation thresholds",
                    "scope": "all",
                    "locale": "en",
                    "limit": 5,
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "query": "kill switch escalation thresholds",
  "scope": "all",
  "locale": "en",
  "hits": [
    {
      "uri": "acf://fiche/ACF-06",
      "title": "ACF-06 — Kill switch and degraded modes",
      "snippet": "Defines the mandatory shutdown paths, the escalation thresholds that fire them, and the quarterly test cadence required for any N2+ agent.",
      "score": 8.42,
      "category": "fiche",
      "locale": "en"
    },
    {
      "uri": "acf://framework/principle/P-04",
      "title": "Principle P-04 — Reversibility",
      "snippet": "Every autonomous decision must remain reversible by a human operator within a bounded recovery window.",
      "score": 6.18,
      "category": "principle",
      "locale": "en"
    },
    {
      "uri": "acf://framework/autonomy-level/N2",
      "title": "Autonomy level N2 — Supervised autonomy",
      "snippet": "The agent decides and executes on its own; the DDAO sets escalation thresholds, a kill switch, and a signed decision register.",
      "score": 5.71,
      "category": "autonomy_level",
      "locale": "en"
    },
    {
      "uri": "acf://fiche/ACF-08",
      "title": "ACF-08 — Signed decision register",
      "snippet": "Every escalation event is logged in the signed register with the trigger threshold that fired it.",
      "score": 4.92,
      "category": "fiche",
      "locale": "en"
    },
    {
      "uri": "acf://glossary/kill%20switch",
      "title": "kill switch",
      "snippet": "Mandatory shutdown path that any DDAO can fire at any time, without prior sign-off, to stop an agent.",
      "score": 3.65,
      "category": "glossary",
      "locale": "en"
    }
  ],
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "generated_at": "2026-06-14T11:47:22.318Z",
  "disclaimer": "Search results rank candidate resources by relevance — read the cited resources before quoting them."
}`;

export default async function SearchToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="acf.search"
      description={
        fr
          ? "Recherche plein-texte sur l’ensemble du corpus ACF® — principes, niveaux d’autonomie, dimensions, DDAO, fiches, guides réglementaires, glossaire, whitepaper. Renvoie une liste classée d’URIs canoniques à lire ensuite."
          : "Full-text search over the entire ACF® corpus — principles, autonomy levels, dimensions, DDAO, fiches, regulatory guides, glossary, whitepaper. Returns a ranked list of canonical URIs to read next."
      }
      badge="READ"
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les outils <strong>READ</strong> renvoient le contenu signé du corpus,
            sans couche d’inférence. <code>acf.search</code> ne réécrit pas, ne
            résume pas et ne devine pas : il classe des URIs <code>acf://…</code>{" "}
            qu’un autre appel ira lire.
          </>
        ) : (
          <>
            <strong>READ</strong> tools return signed corpus content with no
            inference layer. <code>acf.search</code> does not rewrite, summarise
            or guess — it ranks <code>acf://…</code> URIs that a follow-up call
            will read.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand l’agent doit répondre à une question opérationnelle ou réglementaire et ne sait pas quelle ressource ACF® citer en priorité. La requête peut être un mot-clé technique (« kill switch »), une question métier (« qui doit signer le go-live ? ») ou une référence externe (« GDPR Art. 35 »). La sortie donne les URIs candidats classés par pertinence, pas leur contenu."
          : "Use this tool when the agent has to answer an operational or regulatory question and does not yet know which ACF® resource to cite. The query can be a technical keyword (“kill switch”), a business question (“who signs the go-live?”) or an external reference (“GDPR Art. 35”). The output gives the candidate URIs ranked by relevance, not their content."}
      </p>
      <p>
        {fr
          ? "Étape de cadrage uniquement : enchaînez avec acf.fiche.lookup, acf.regulation.article ou un appel resources/read pour récupérer le contenu signé avant de répondre à l’utilisateur. Le score de lunr est pondéré pour promouvoir le corpus framework (principes, niveaux, dimensions) au-dessus des synonymes glossaire."
          : "Scoping step only: chain with acf.fiche.lookup, acf.regulation.article or a resources/read call to fetch the signed content before replying to the user. The lunr score is weighted to promote framework content (principles, levels, dimensions) above glossary synonyms."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Quatre champs simples. La requête est normalisée (diacritiques retirés, minuscules) avant indexation lunr."
          : "Four simple fields. The query is normalised (diacritics stripped, lower-cased) before lunr indexing."}
      </p>
      <ParamGroup>
        <Param name="query" type="string (1-200)" required>
          {fr
            ? "Termes recherchés. Accents et casse sont normalisés (« souveraineté » matche le token « souverainete »)."
            : "Search terms. Accents and case are normalised (“souveraineté” matches the stored token “souverainete”)."}
        </Param>
        <Param
          name="scope"
          type='"all" | "framework" | "fiche" | "guide" | "whitepaper" | "glossary"'
          defaultValue='"all"'
        >
          {fr
            ? "Restreint la recherche à un sous-corpus. framework regroupe principes, niveaux d’autonomie, dimensions et DDAO."
            : "Restrict the search to a sub-corpus. framework bundles principles, autonomy levels, dimensions and DDAO."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue du corpus interrogé. Les documents existent en FR et EN ; aucune traduction n’est inventée."
            : "Locale of the queried corpus. Documents exist in FR and EN; no translation is invented."}
        </Param>
        <Param name="limit" type="integer (1-20)" defaultValue="10">
          {fr
            ? "Nombre maximum de résultats à renvoyer après tri par score pondéré."
            : "Maximum number of hits returned after weighted score sort."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Une liste de hits classés par score décroissant, plus le pied-de-page signé qui identifie la version du corpus interrogé."
          : "A list of hits ranked by descending score, plus the signed footer identifying the version of the corpus queried."}
      </p>
      <ParamGroup>
        <Param name="query" type="string">
          {fr
            ? "La requête telle que reçue (pas la version normalisée). Utile pour l’audit trail."
            : "The query as received (not the normalised version). Useful for the audit trail."}
        </Param>
        <Param name="scope" type="string">
          {fr
            ? "Sous-corpus effectivement interrogé."
            : "Sub-corpus actually queried."}
        </Param>
        <Param name="locale" type='"en" | "fr"'>
          {fr
            ? "Langue effectivement servie."
            : "Locale actually served."}
        </Param>
        <Param
          name="hits"
          type="{ uri, title, snippet, score, category, locale }[]"
        >
          {fr
            ? "Tableau des résultats. uri est un acf://… à passer à resources/read ou à un autre outil READ. category prend les valeurs principle, autonomy_level, dimension, ddao, fiche, guide, whitepaper, glossary."
            : "Result array. uri is an acf://… to pass to resources/read or another READ tool. category is one of principle, autonomy_level, dimension, ddao, fiche, guide, whitepaper, glossary."}
        </Param>
        <Param name="doctrine_version" type="string">
          {fr
            ? "Version doctrinale figée pour cet appel."
            : "Doctrine version frozen for this call."}
        </Param>
        <Param name="doctrine_hash" type="string">
          {fr
            ? "Hash SHA-256 du corpus servi. Permet de vérifier qu’aucune réécriture silencieuse n’a eu lieu entre deux appels."
            : "SHA-256 hash of the served corpus. Lets you check that no silent rewrite happened between two calls."}
        </Param>
        <Param name="doctrine_signature" type="string">
          {fr
            ? "Signature Ed25519 du hash + version. Vérifiable indépendamment via la clé publique publiée."
            : "Ed25519 signature of hash + version. Independently verifiable against the published public key."}
        </Param>
        <Param name="doctrine_archive_url" type="string">
          {fr
            ? "URL de l’archive doctrinale immuable correspondant à doctrine_hash."
            : "URL of the immutable doctrine archive matching doctrine_hash."}
        </Param>
        <Param name="generated_at" type="string (ISO-8601)">
          {fr
            ? "Horodatage UTC de la réponse."
            : "UTC timestamp of the response."}
        </Param>
        <Param name="disclaimer" type="string">
          {fr
            ? "Rappel constant : les scores classent des candidats, ils ne valident pas une réponse."
            : "Constant reminder: scores rank candidates, they do not validate an answer."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "L’agent cherche les ressources liées au kill switch pour préparer une réponse à l’audit DORA :"
          : "The agent searches for kill-switch-related resources while preparing a DORA audit reply:"}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock code={NODE_SAMPLE} language="typescript" filename="search.ts" />
            ),
          },
          {
            label: "Python",
            content: (
              <CodeBlock code={PYTHON_SAMPLE} language="python" filename="search.py" />
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
            ? "scope reçoit une valeur hors liste (ex. scope: \"fiches\" au pluriel). Corrigez vers une des six valeurs canoniques."
            : "scope receives an out-of-list value (e.g. scope: \"fiches\" plural). Fix to one of the six canonical values."}
        </li>
        <li>
          <code>QueryTooLong</code> —{" "}
          {fr
            ? "query &gt; 200 caractères. acf.search est conçu pour des mots-clés, pas pour des paragraphes entiers — résumez l’intention en quelques tokens."
            : "query &gt; 200 chars. acf.search is built for keywords, not full paragraphs — boil the intent down to a few tokens."}
        </li>
        <li>
          <code>EmptyHits</code> —{" "}
          {fr
            ? "aucun résultat ne dépasse le seuil de pertinence. Élargissez le scope à \"all\", retirez les caractères spéciaux ou reformulez."
            : "no result clears the relevance threshold. Broaden scope to \"all\", drop special characters or rephrase."}
        </li>
      </ul>

      <h2 id="related">{fr ? "Outils liés" : "Related tools"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools/acf.fiche.lookup" : "/tools/acf.fiche.lookup"}>
            <code>acf.fiche.lookup</code>
          </a>{" "}
          —{" "}
          {fr
            ? "lire le contenu signé d’une fiche ACF® candidate identifiée par acf.search."
            : "fetch the signed content of an ACF® fiche candidate identified by acf.search."}
        </li>
        <li>
          <a
            href={fr ? "/fr/tools/acf.regulation.article" : "/tools/acf.regulation.article"}
          >
            <code>acf.regulation.article</code>
          </a>{" "}
          —{" "}
          {fr
            ? "récupérer le texte vérifié d’un article réglementaire quand la requête pointe vers un guide AI Act, RGPD, DORA, NIS2 ou ISO 42001."
            : "fetch the verified text of a regulatory article when the query points at an AI Act, GDPR, DORA, NIS2 or ISO 42001 guide."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.classify-agent" : "/tools/acf.classify-agent"}>
            <code>acf.classify-agent</code>
          </a>{" "}
          —{" "}
          {fr
            ? "quand la recherche débouche sur une qualification d’agent, basculer vers l’outil REASON dédié."
            : "when the search ends up needing an agent qualification, switch to the dedicated REASON tool."}
        </li>
      </ul>
    </DocsPage>
  );
}
