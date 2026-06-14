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
    article: "Art. 14",
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
                    "article": "Art. 14",
                    "locale": "en",
                },
            )
            print(json.dumps(result.content, indent=2))

asyncio.run(main())`;

const RESPONSE_SAMPLE = `{
  "regulation": "ai-act",
  "regulation_label": "EU AI Act (Regulation 2024/1689)",
  "article": "Art. 14",
  "article_title": "Human oversight",
  "served_locale": "en",
  "is_fallback": false,
  "verified_text": "High-risk AI systems shall be designed and developed in such a way, including with appropriate human-machine interface tools, that they can be effectively overseen by natural persons during the period in which they are in use. […] Human oversight shall aim to prevent or minimise the risks to health, safety or fundamental rights that may emerge when a high-risk AI system is used in accordance with its intended purpose or under conditions of reasonably foreseeable misuse.",
  "applicable_date": "2026-08-02",
  "acf_translation": {
    "summary": "Art. 14 mandates that any high-risk system be designed so a human operator can intervene effectively at run-time. In ACF® vocabulary, this is the kill-switch + escalation-thresholds duo, plus the design constraint that the interface itself must support oversight (not just allow it).",
    "activates_principles": [
      { "code": "P-04", "title": "Reversibility", "why": "Oversight is impossible without a bounded recovery window." },
      { "code": "P-07", "title": "Human-in-the-loop integrity", "why": "Art. 14 is the regulatory anchor of P-07." }
    ],
    "stresses_dimensions": [
      { "code": "D-03", "title": "Operational control", "why": "Kill switch + degraded modes live here." },
      { "code": "D-05", "title": "Human governance", "why": "Defines who has authority to intervene and when." }
    ],
    "operationalised_by_fiches": [
      { "code": "ACF-06", "why": "Defines the kill switch and the degraded mode required by Art. 14(1)-(4)." },
      { "code": "ACF-12", "why": "DDAO mandate — names the natural person empowered to oversee." },
      { "code": "ACF-04", "why": "Agent identity card — declares the oversight surface to internal and external stakeholders." }
    ],
    "autonomy_level_ceiling": "N2 by default; N3 requires explicit derogation with reinforced oversight and is not recommended for high-risk under the AI Act."
  },
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:…",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "generated_at": "2026-06-14T11:47:22.318Z",
  "disclaimer": "Verified text reproduced for reference — always read the official OJEU/CELEX source before quoting in a regulatory filing."
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
          ? "Récupère le texte vérifié d’un article réglementaire (AI Act, RGPD, DORA, NIS2, ISO 42001) et sa traduction opérationnelle ACF® : principes activés, dimensions de maturité stressées, fiches qui l’opérationnalisent, plafond de niveau d’autonomie."
          : "Fetch the verified text of a regulatory article (AI Act, GDPR, DORA, NIS2, ISO 42001) and its operational translation into ACF®: activated principles, stressed maturity dimensions, cards that operationalise it, autonomy-level ceiling."
      }
      badge="READ"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les outils <strong>READ</strong> renvoient le contenu signé du corpus,
            sans couche d’inférence. Le <code>verified_text</code> est reproduit{" "}
            tel que le standard l’a horodaté — pour un dépôt réglementaire, citez
            toujours en plus la source officielle (OJEU/CELEX, ISO, ANSSI…).
          </>
        ) : (
          <>
            <strong>READ</strong> tools return signed corpus content with no
            inference layer. <code>verified_text</code> is reproduced as the
            standard timestamped it — for a regulatory filing, always cite the
            official source (OJEU/CELEX, ISO, ANSSI…) in addition.
          </>
        )}
      </Callout>

      <h2 id="when-to-use">{fr ? "Quand l’utiliser" : "When to use"}</h2>
      <p>
        {fr
          ? "Utilisez cet outil quand un régulateur, un auditeur ou un comité de direction cite un article précis et qu’il faut renvoyer (a) le texte vérifié et (b) sa lecture opérationnelle ACF®. Exemples : « AI Act Art. 9 — comment vous le couvrez ? », « RGPD Art. 35 — votre AIPD intègre-t-elle l’agent ? », « DORA Art. 28 — tiers critiques ? ». L’outil donne en une réponse le texte et le pont vers vos fiches."
          : "Use this tool when a regulator, auditor or board references a specific article and you have to return (a) the verified text and (b) its ACF® operational reading. Examples: “AI Act Art. 9 — how do you cover it?”, “GDPR Art. 35 — does your DPIA include the agent?”, “DORA Art. 28 — critical third parties?”. The tool returns the text and the bridge to your cards in one shot."}
      </p>
      <p>
        {fr
          ? "La sortie a une vocation pédagogique et de cadrage : elle explique quels principes ACF® l’article active, quelles dimensions de maturité il stresse, et quelles fiches méthodologiques l’opérationnalisent. C’est l’angle « traducteur » entre droit dur et opérations — il ne remplace pas un avis juridique."
          : "The output has a pedagogical and scoping intent: it explains which ACF® principles the article activates, which maturity dimensions it stresses, and which methodological cards operationalise it. This is the “translator” angle between hard law and operations — it does not replace legal advice."}
      </p>

      <h2 id="inputs">{fr ? "Paramètres d’entrée" : "Input parameters"}</h2>
      <p>
        {fr
          ? "Trois champs. regulation est strictement énuméré ; article suit le format canonique de chaque réglementation."
          : "Three fields. regulation is a strict enum; article follows each regulation’s canonical format."}
      </p>
      <ParamGroup>
        <Param
          name="regulation"
          type='"ai-act" | "gdpr" | "dora" | "nis2" | "iso-42001"'
          required
        >
          {fr
            ? "Identifiant canonique de la réglementation. Cinq guides publiés en V1.0 ; toute autre valeur est rejetée."
            : "Canonical regulation identifier. Five guides published in V1.0; any other value is rejected."}
        </Param>
        <Param name="article" type="string (2-40)" required>
          {fr
            ? "Référence d’article au format canonique : « Art. 9 », « Art. 14(1) » (AI Act), « Art. 35 » (RGPD), « Art. 28 » (DORA), « Art. 21 » (NIS2), « §6.1 » (ISO 42001). La valeur est validée contre le mapping regulation-articles.json."
            : "Article reference in canonical format: “Art. 9”, “Art. 14(1)” (AI Act), “Art. 35” (GDPR), “Art. 28” (DORA), “Art. 21” (NIS2), “§6.1” (ISO 42001). The value is validated against the regulation-articles.json mapping."}
        </Param>
        <Param name="locale" type='"en" | "fr"' defaultValue='"en"'>
          {fr
            ? "Langue du guide servi. La chaîne de fallback s’applique si la traduction n’est pas publiée."
            : "Locale of the served guide. Fallback chain applies if the translation is not published."}
        </Param>
      </ParamGroup>

      <h2 id="output">{fr ? "Schéma de sortie" : "Output schema"}</h2>
      <p>
        {fr
          ? "Texte vérifié de l’article + traduction opérationnelle ACF® + pied-de-page signé. Tous les codes (P-XX, D-XX, ACF-XX) sont résolvables via les autres outils READ."
          : "Verified article text + ACF® operational translation + signed footer. All codes (P-XX, D-XX, ACF-XX) are resolvable via the other READ tools."}
      </p>
      <ParamGroup>
        <Param name="regulation" type="string">
          {fr
            ? "Identifiant canonique de la réglementation interrogée."
            : "Canonical identifier of the queried regulation."}
        </Param>
        <Param name="regulation_label" type="string">
          {fr
            ? "Libellé long lisible (« EU AI Act (Regulation 2024/1689) »)."
            : "Human-readable long label (“EU AI Act (Regulation 2024/1689)”)."}
        </Param>
        <Param name="article" type="string">
          {fr
            ? "Référence de l’article telle que reçue."
            : "Article reference as received."}
        </Param>
        <Param name="article_title" type="string">
          {fr
            ? "Titre officiel de l’article (« Human oversight » pour AI Act Art. 14)."
            : "Official article title (“Human oversight” for AI Act Art. 14)."}
        </Param>
        <Param name="served_locale" type='"en" | "fr"'>
          {fr
            ? "Langue effectivement servie après chaîne de fallback."
            : "Locale actually served after fallback chain."}
        </Param>
        <Param name="is_fallback" type="boolean">
          {fr
            ? "true si la locale demandée n’est pas disponible."
            : "true if the requested locale is not available."}
        </Param>
        <Param name="verified_text" type="string">
          {fr
            ? "Texte de l’article tel qu’horodaté dans le snapshot doctrinal. À citer en miroir avec la source officielle."
            : "Article text as timestamped in the doctrine snapshot. To be cited alongside the official source."}
        </Param>
        <Param name="applicable_date" type="string (ISO date)">
          {fr
            ? "Date d’applicabilité effective (incluant les reports Digital Omnibus pour l’AI Act)."
            : "Effective applicable date (Digital Omnibus deferrals included for the AI Act)."}
        </Param>
        <Param
          name="acf_translation"
          type="{ summary, activates_principles[], stresses_dimensions[], operationalised_by_fiches[], autonomy_level_ceiling }"
        >
          {fr
            ? "Lecture opérationnelle ACF®. Chaque entrée des trois tableaux porte un code (P-XX / D-XX / ACF-XX) et un why explicite."
            : "ACF® operational reading. Each entry in the three arrays carries a code (P-XX / D-XX / ACF-XX) and an explicit why."}
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
            ? "Rappel constant : ce n’est pas un avis juridique."
            : "Constant reminder: this is not legal advice."}
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
          <code>InvalidEnumValue</code> —{" "}
          {fr
            ? "regulation hors énumération (ex. \"aiact\", \"rgpd\"). Utilisez \"ai-act\", \"gdpr\", \"dora\", \"nis2\" ou \"iso-42001\"."
            : "regulation out of enum (e.g. \"aiact\", \"rgpd\"). Use \"ai-act\", \"gdpr\", \"dora\", \"nis2\" or \"iso-42001\"."}
        </li>
        <li>
          <code>ArticleNotMapped</code> —{" "}
          {fr
            ? "l’article demandé n’est pas dans le mapping regulation-articles.json publié en V1.0. La couverture initiale cible les articles à fort impact agent ; le périmètre s’étend en V1.1."
            : "the requested article is not in the regulation-articles.json mapping published in V1.0. Initial coverage targets agent-critical articles; scope expands in V1.1."}
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
          <a href={fr ? "/fr/tools/acf.fiche.lookup" : "/tools/acf.fiche.lookup"}>
            <code>acf.fiche.lookup</code>
          </a>{" "}
          —{" "}
          {fr
            ? "lire les fiches listées dans acf_translation.operationalised_by_fiches."
            : "fetch the cards listed in acf_translation.operationalised_by_fiches."}
        </li>
        <li>
          <a href={fr ? "/fr/tools/acf.search" : "/tools/acf.search"}>
            <code>acf.search</code>
          </a>{" "}
          —{" "}
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
          </a>{" "}
          —{" "}
          {fr
            ? "pour l’AI Act, obtenir l’ensemble exhaustif des articles applicables à un agent qualifié haut risque, pas un seul."
            : "for the AI Act, get the exhaustive set of articles applicable to a high-risk agent, not just one."}
        </li>
      </ul>
    </DocsPage>
  );
}
