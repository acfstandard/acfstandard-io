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
    code: "ACF-06",
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
                    "code": "ACF-06",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "code": "ACF-06",
  "uri": "acf://fiche/ACF-06",
  "served_locale": "en",
  "is_fallback": false,
  "frontmatter": {
    "code": "ACF-06",
    "title": "Kill switch and degraded modes",
    "version": "1.0",
    "keywords": ["kill switch", "degraded mode", "escalation", "DDAO", "reversibility"],
    "related_principles": ["P-04", "P-07"],
    "related_dimensions": ["D-03", "D-05"],
    "related_fiches": ["ACF-04", "ACF-08", "ACF-12"]
  },
  "body": "## Purpose\\n\\nThis card defines the mandatory shutdown path for any agent operating at autonomy level N2 or above. The kill switch is the last line of defence: any DDAO must be able to fire it at any time, without prior sign-off, and the agent must stop within the bounded recovery window.\\n\\n## Required elements\\n\\n1. **Trigger surface** — a documented endpoint, button or runbook command the DDAO can fire in under 60 seconds.\\n2. **Stop semantics** — the agent must commit no further external action after the trigger fires, and ongoing operations must roll back to a safe state.\\n3. **Degraded mode** — a fallback that keeps the business function alive at a lower autonomy (typically N1 with human approval per decision).\\n4. **Quarterly test** — the DDAO runs a documented kill-switch test every 90 days; the signed register records the test result.\\n\\n## Example\\n\\nA fraud-scoring agent (N2) has a Slack `/kill-fraud-agent` command bound to the DDAO group. Firing it switches the agent to N1 degraded mode where every score is queued for human review. The quarterly test is run in production with a synthetic transaction and recorded in ACF-08.\\n\\n## Anti-patterns\\n\\n- A kill switch that requires the deployer’s sign-off to fire (defeats the purpose).\\n- A degraded mode that simply stops the function (the business stops too — kill switches must not be all-or-nothing).\\n- A kill switch that was never tested in production (untested switch ≈ no switch).",
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "generated_at": "2026-06-14T11:47:22.318Z",
  "disclaimer": "Canonical ACF® card content — quote verbatim or paraphrase, always cite the code and version."
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
          ? "Récupère le contenu signé d’une fiche méthodologique ACF® (ACF-00 à ACF-16) — frontmatter (principes, dimensions, fiches liées), corps markdown, exemple et anti-patterns. Aucune interprétation, le texte canonique tel qu’archivé."
          : "Fetch the signed content of an ACF® methodological card (ACF-00 to ACF-16) — frontmatter (related principles, dimensions, cards), markdown body, example and anti-patterns. No interpretation, the canonical archived text."
      }
      badge="READ"
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les outils <strong>READ</strong> renvoient le contenu signé du corpus,
            sans couche d’inférence. <code>acf.fiche.lookup</code> sert la fiche{" "}
            <strong>verbatim</strong> avec son hash et sa signature : si vous la
            citez à un régulateur, vous citez exactement ce que le standard
            publie.
          </>
        ) : (
          <>
            <strong>READ</strong> tools return signed corpus content with no
            inference layer. <code>acf.fiche.lookup</code> serves the card{" "}
            <strong>verbatim</strong> with its hash and signature — if you quote
            it to a regulator, you quote exactly what the standard publishes.
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
          ? "Citez toujours le code (ACF-06), pas le titre traduit. Les fiches sont la couche opérationnelle de la doctrine — chaque fiche mappe vers un ou plusieurs principes (P-XX) et une ou plusieurs dimensions (D-XX) que l’utilisateur peut explorer ensuite."
          : "Always cite the code (ACF-06), not the translated title. Cards are the operational layer of the doctrine — each card maps to one or more principles (P-XX) and one or more dimensions (D-XX) the user can explore next."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Deux champs. Le code est strictement validé contre /^ACF-(0[0-9]|1[0-6])$/ — pas de path traversal possible."
          : "Two fields. The code is strictly validated against /^ACF-(0[0-9]|1[0-6])$/ — no path traversal possible."}
      </p>
      <ParamGroup>
        <Param name="code" type='"ACF-00" .. "ACF-16"' required>
          {fr
            ? "Code canonique de la fiche, sur 6 caractères, casse exacte. Toute autre forme (« acf-6 », « ACF6 », « ACF-006 ») est rejetée."
            : "Canonical six-char card code, exact case. Any other form (“acf-6”, “ACF6”, “ACF-006”) is rejected."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue demandée. Si la fiche n’existe pas dans cette langue, la chaîne de fallback est appliquée et served_locale + is_fallback le signalent dans la sortie."
            : "Requested locale. If the card is not available in that locale, the fallback chain kicks in and served_locale + is_fallback flag it in the output."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Le frontmatter structuré + le corps markdown + le pied-de-page signé. La sortie est un objet JSON ; le corps est une string markdown que vous pouvez rendre tel quel."
          : "Structured frontmatter + markdown body + signed footer. The output is a JSON object; the body is a markdown string you can render as-is."}
      </p>
      <ParamGroup>
        <Param name="code" type="string">
          {fr
            ? "Le code demandé, renvoyé tel quel pour faciliter le tracing."
            : "The requested code, echoed back for tracing."}
        </Param>
        <Param name="uri" type="string">
          {fr
            ? "URI canonique de la ressource (acf://fiche/ACF-XX)."
            : "Canonical resource URI (acf://fiche/ACF-XX)."}
        </Param>
        <Param name="served_locale" type='"en" | "fr"'>
          {fr
            ? "Langue effectivement servie après application de la chaîne de fallback."
            : "Locale actually served after applying the fallback chain."}
        </Param>
        <Param name="is_fallback" type="boolean">
          {fr
            ? "true si served_locale ≠ locale demandée — signaler à l’utilisateur que la traduction n’est pas disponible."
            : "true if served_locale ≠ requested locale — signal to the user that the translation is not available."}
        </Param>
        <Param
          name="frontmatter"
          type="{ code, title, version, keywords[], related_principles[], related_dimensions[], related_fiches[] }"
        >
          {fr
            ? "Métadonnées structurées de la fiche. related_principles, related_dimensions et related_fiches sont des codes que vous pouvez résoudre via acf.search ou resources/read."
            : "Structured card metadata. related_principles, related_dimensions and related_fiches are codes you can resolve via acf.search or resources/read."}
        </Param>
        <Param name="body" type="string (markdown)">
          {fr
            ? "Corps complet de la fiche : objectif, éléments requis, exemple, anti-patterns. Markdown standard, rendu prêt à l’emploi."
            : "Full card body: purpose, required elements, example, anti-patterns. Standard markdown, ready to render."}
        </Param>
        <Param name="doctrine_version" type="string">
          {fr
            ? "Version doctrinale figée pour cet appel."
            : "Doctrine version frozen for this call."}
        </Param>
        <Param name="doctrine_hash" type="string">
          {fr
            ? "Hash SHA-256 du corpus servi."
            : "SHA-256 hash of the served corpus."}
        </Param>
        <Param name="doctrine_signature" type="string">
          {fr
            ? "Signature Ed25519 du hash + version."
            : "Ed25519 signature of hash + version."}
        </Param>
        <Param name="doctrine_archive_url" type="string">
          {fr
            ? "URL de l’archive immuable correspondant à doctrine_hash."
            : "URL of the immutable archive matching doctrine_hash."}
        </Param>
        <Param name="generated_at" type="string (ISO-8601)">
          {fr
            ? "Horodatage UTC de la réponse."
            : "UTC timestamp of the response."}
        </Param>
        <Param name="disclaimer" type="string">
          {fr
            ? "Rappel constant : citez le code et la version quand vous reprenez le contenu."
            : "Constant reminder: cite the code and version when reusing the content."}
        </Param>
      </ParamGroup>

      <h2 id="example">{fr ? "Exemple d’appel" : "Example call"}</h2>
      <p>
        {fr
          ? "L’agent récupère la fiche ACF-06 (kill switch) pour rédiger une réponse à l’audit DORA :"
          : "The agent fetches ACF-06 (kill switch) while drafting a DORA audit answer:"}
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
          <code>InvalidFicheCode</code> —{" "}
          {fr
            ? "code hors regex /^ACF-(0[0-9]|1[0-6])$/. Vérifiez le format : préfixe ACF-, deux chiffres entre 00 et 16, casse exacte."
            : "code out of /^ACF-(0[0-9]|1[0-6])$/. Check format: ACF- prefix, two digits between 00 and 16, exact case."}
        </li>
        <li>
          <code>FicheNotFound</code> —{" "}
          {fr
            ? "le code est valide mais la fiche n’existe ni dans la locale demandée ni dans aucune locale de la chaîne de fallback. Le corpus V1.0 publie ACF-00 à ACF-16 ; ACF-17+ est V1.1."
            : "the code is valid but the card exists in neither the requested locale nor any fallback locale. The V1.0 corpus publishes ACF-00 to ACF-16; ACF-17+ is V1.1."}
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
            ? "trouver le code de la fiche pertinente avant de la lire en détail."
            : "find the relevant card code before fetching it in detail."}
        </li>
        <li>
          <a
            href={fr ? "/fr/tools/acf.regulation.article" : "/tools/acf.regulation.article"}
          >
            <code>acf.regulation.article</code>
          </a>{" "}
          —{" "}
          {fr
            ? "remonter du texte réglementaire vers les fiches qui l’opérationnalisent."
            : "trace from regulatory text back to the cards that operationalise it."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.classify-agent" : "/tools/acf.classify-agent"}>
            <code>acf.classify-agent</code>
          </a>{" "}
          —{" "}
          {fr
            ? "obtenir la liste des fiches applicables à un agent à qualifier (applicable_fiches dans la sortie)."
            : "get the list of cards applicable to an agent (applicable_fiches in the output)."}
        </li>
      </ul>
    </DocsPage>
  );
}
