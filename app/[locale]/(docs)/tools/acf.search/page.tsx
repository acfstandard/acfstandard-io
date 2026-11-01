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
  "hits": [
    {
      "uri": "acf://fiche/ACF-07",
      "title": "Kill Switch",
      "snippet": "Be able to immediately shut down an agent or agentic system in the event of drift, incident, loss of control, or critical risk.",
      "score": 24.125325,
      "category": "fiche",
      "locale": "en"
    },
    {
      "uri": "acf://glossary/Kill%20switch",
      "title": "Kill switch",
      "snippet": "Human takeover mechanism allowing an agent to be frozen, redirected or revoked at any time. Multi-level: immediate suspension, deferred suspension, permanent revocation. Cf. ACF-07.",
      "score": 20.25405,
      "category": "glossary",
      "locale": "en"
    },
    {
      "uri": "acf://framework/autonomy-level/supervised_autonomous",
      "title": "Supervised autonomous",
      "snippet": "For a given decision, the agent decides and executes within a bounded perimeter, under supervision. Beyond the thresholds defined in the mandate, it must escalate the decision to a human.",
      "score": 18.977750000000004,
      "category": "autonomy_level",
      "locale": "en"
    },
    {
      "uri": "acf://framework/ddao",
      "title": "DDAO : Delegated Decision Agent Officer",
      "snippet": "ACF®-defined governance role that acts as the legal guardian of one or more autonomous AI agents. The DDAO validates the agent mandate (cf. ACF-13), arbitrates escalations that cross defined thresholds, authorises decision-perimeter changes",
      "score": 13.615250000000001,
      "category": "ddao",
      "locale": "en"
    },
    {
      "uri": "acf://glossary/Agent%20Mandate",
      "title": "Agent Mandate",
      "snippet": "Formal document bounding an autonomous agent's decision perimeter, escalation thresholds, technical safeguards and traceability obligations. Cf. ACF-13.",
      "score": 13.565700000000001,
      "category": "glossary",
      "locale": "en"
    }
  ]
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
          ? "Recherche plein-texte sur l’ensemble du corpus ACF®, principes, niveaux d’autonomie, DDAO, 45 fiches, guides réglementaires, glossaire, livre blanc. Renvoie une liste classée d’URIs canoniques à lire ensuite."
          : "Full-text search over the entire ACF® corpus, principles, autonomy levels, DDAO, 45 cards, regulatory guides, glossary, white paper. Returns a ranked list of canonical URIs to read next."
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
            or guess, it ranks <code>acf://…</code> URIs that a follow-up call
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
        <Param name="query" type="string (2-200)" required>
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
            ? "Restreint la recherche à un sous-corpus. framework regroupe principes, niveaux d’autonomie et DDAO."
            : "Restrict the search to a sub-corpus. framework bundles principles, autonomy levels and DDAO."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue du corpus interrogé. Les documents existent en FR et EN ; aucune traduction n’est inventée."
            : "Locale of the queried corpus. Documents exist in FR and EN; no translation is invented."}
        </Param>
        <Param name="limit" type="integer (1-20)" defaultValue="5">
          {fr
            ? "Nombre maximum de résultats à renvoyer après tri par score pondéré."
            : "Maximum number of hits returned after weighted score sort."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Un objet JSON avec la seule liste hits, vide si rien ne correspond."
          : "A JSON object with a single hits list, empty when nothing matches."}
      </p>
      <ParamGroup>
        <Param name="hits" type='{ uri, title, snippet, score, category, locale }[]'>
          {fr
            ? "Résultats classés par pertinence. uri est un acf://… à passer à resources/read ou à un autre outil READ. category vaut principle, autonomy_level, ddao, fiche, guide, whitepaper, glossary ou meta."
            : "Results ranked by relevance. uri is an acf://… to pass to resources/read or another READ tool. category is one of principle, autonomy_level, ddao, fiche, guide, whitepaper, glossary or meta."}
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
          {fr
            ? "Requête trop courte ou trop longue (moins de 2 ou plus de 200 caractères), scope ou limit hors bornes : la validation des paramètres échoue et l’erreur JSON-RPC indique le champ en cause."
            : "Query too short or too long (fewer than 2 or more than 200 characters), scope or limit out of range: parameter validation fails and the JSON-RPC error names the field."}
        </li>
        <li>
          {fr
            ? "Liste hits vide : aucun document ne correspond. Reformulez avec le vocabulaire ACF® (fiche, mandat, DDAO, criticité) ou élargissez scope à all."
            : "Empty hits list: no document matches. Rephrase with ACF® vocabulary (card, mandate, DDAO, criticality) or widen scope to all."}
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
            ? "lire le contenu signé d’une fiche ACF® candidate identifiée par acf.search."
            : "fetch the signed content of an ACF® fiche candidate identified by acf.search."}
        </li>
        <li>
          <a
            href={fr ? "/fr/tools/acf.regulation.article" : "/tools/acf.regulation.article"}
          >
            <code>acf.regulation.article</code>
          </a>
          {": "}
          {fr
            ? "récupérer le texte vérifié d’un article réglementaire quand la requête pointe vers un guide AI Act, RGPD, DORA, NIS2 ou ISO 42001."
            : "fetch the verified text of a regulatory article when the query points at an AI Act, GDPR, DORA, NIS2 or ISO 42001 guide."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.classify-agent" : "/tools/acf.classify-agent"}>
            <code>acf.classify-agent</code>
          </a>
          {": "}
          {fr
            ? "quand la recherche débouche sur une qualification d’agent, basculer vers l’outil REASON dédié."
            : "when the search ends up needing an agent qualification, switch to the dedicated REASON tool."}
        </li>
      </ul>
    </DocsPage>
  );
}
