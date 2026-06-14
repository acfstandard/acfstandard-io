import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

type Category = {
  slug: "doctrine" | "fiches" | "regulators" | "reference";
  count: string;
  titleEn: string;
  titleFr: string;
  blurbEn: string;
  blurbFr: string;
};

const CATEGORIES: Category[] = [
  {
    slug: "doctrine",
    count: "×15",
    titleEn: "Doctrine",
    titleFr: "Doctrine",
    blurbEn:
      "The founding corpus — whitepaper, four principles (P1–P4), four autonomy levels (N0–N3), six maturity dimensions (D1–D6), the DDAO role, the manual and the deck.",
    blurbFr:
      "Le corpus fondateur — whitepaper, quatre principes (P1–P4), quatre niveaux d’autonomie (N0–N3), six dimensions de maturité (D1–D6), le rôle DDAO, le manuel et le deck.",
  },
  {
    slug: "fiches",
    count: "×17",
    titleEn: "Methodological cards",
    titleFr: "Fiches méthodologiques",
    blurbEn:
      "The 17 canonical ACF® cards (ACF-00 to ACF-16), bilingual, served as Markdown with frontmatter. The operational backbone of the standard.",
    blurbFr:
      "Les 17 fiches ACF® canoniques (ACF-00 à ACF-16), bilingues, servies en Markdown avec frontmatter. La colonne vertébrale opérationnelle du standard.",
  },
  {
    slug: "regulators",
    count: "×5",
    titleEn: "Regulator guides",
    titleFr: "Guides régulateurs",
    blurbEn:
      "Operational reading of AI Act, GDPR, DORA, NIS2 and ISO 42001 — each guide cross-mapped to the relevant principles, dimensions and fiches.",
    blurbFr:
      "Lecture opérationnelle de l’AI Act, du RGPD, de DORA, de NIS2 et de l’ISO 42001 — chaque guide cartographié vers les principes, dimensions et fiches pertinents.",
  },
  {
    slug: "reference",
    count: "×3",
    titleEn: "Reference",
    titleFr: "Référence",
    blurbEn:
      "Glossary index, doctrine metadata (version, hash, archive URL, locales) and the permanent archive bundle.",
    blurbFr:
      "Index du glossaire, métadonnées de la doctrine (version, hash, URL d’archive, langues) et bundle d’archive permanente.",
  },
];

export default async function ResourcesOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Référence des ressources" : "Resources reference"}
      description={
        fr
          ? "Le serveur acf-mcp expose le corpus ACF® comme ressources MCP — URI canoniques, MIME typés, lectures seules, contenu signé. Chaque ressource est addressable par son URI acf://… et servable dans la langue négociée par le client."
          : "The acf-mcp server exposes the ACF® corpus as MCP resources — canonical URIs, typed MIME, read-only access, signed content. Every resource is addressable by its acf://… URI and served in the locale negotiated with the client."
      }
      badge={fr ? "Ressources MCP" : "MCP resources"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Ressources vs outils.</strong> Un outil MCP <em>raisonne</em>{" "}
            (REASON) ou <em>récupère</em> (READ) ; une ressource MCP <em>se lit</em>.
            Les ressources d’<code>acf-mcp</code> sont la matière brute : whitepaper,
            fiches, articles régulateurs, glossaire, métadonnées. Les outils READ
            (par exemple <code>acf.fiche.lookup</code>) sont des accès enrichis à ces
            mêmes ressources avec contexte et cross-refs.
          </>
        ) : (
          <>
            <strong>Resources vs tools.</strong> An MCP tool either <em>reasons</em>{" "}
            (REASON) or <em>retrieves</em> (READ); an MCP resource is just{" "}
            <em>read</em>. <code>acf-mcp</code> resources are the raw matter:
            whitepaper, cards, regulator articles, glossary, metadata. READ tools
            (e.g. <code>acf.fiche.lookup</code>) are enriched access points to the
            same resources with context and cross-refs.
          </>
        )}
      </Callout>

      <h2 id="what-is-a-resource">
        {fr ? "Qu’est-ce qu’une ressource MCP" : "What is an MCP resource"}
      </h2>
      <p>
        {fr
          ? "Dans la spécification Model Context Protocol, une ressource est un contenu identifié par une URI, accompagné d’un MIME type et exposé en lecture seule via les méthodes resources/list et resources/read. Le client négocie le contenu, le serveur le sert. C’est l’équivalent d’un GET HTTP doctrinal — pas de mutation, pas d’effet de bord."
          : "In the Model Context Protocol specification, a resource is content identified by a URI, accompanied by a MIME type and exposed read-only through the resources/list and resources/read methods. The client negotiates the content, the server serves it. It is the doctrinal equivalent of an HTTP GET — no mutation, no side effect."}
      </p>
      <p>
        {fr
          ? "Chaque ressource d’acf-mcp est signée à la source : la version de la doctrine est gelée dans le content_hash exposé par acf://meta, signé Ed25519 et archivée sur acfstandard.com. Un client peut donc citer une ressource dans une réponse utilisateur et prouver hors-ligne, des années plus tard, qu’elle a été lue exactement telle qu’elle l’est aujourd’hui."
          : "Every acf-mcp resource is signed at the source: the doctrine version is frozen in the content_hash exposed by acf://meta, signed Ed25519 and archived on acfstandard.com. A client can therefore cite a resource in a user reply and prove, offline and years later, that it was read exactly as it stands today."}
      </p>

      <h2 id="by-category">{fr ? "Par catégorie" : "By category"}</h2>
      <p>
        {fr
          ? "Les ressources ACF® sont organisées en quatre catégories logiques. Cliquez pour la liste exhaustive et un exemple de fetch."
          : "ACF® resources are organised into four logical categories. Click for the exhaustive list and a fetch example."}
      </p>
      <div className="not-prose mt-4 grid gap-3 md:grid-cols-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/resources/${c.slug}` as never}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-gold/30"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-white">
                {fr ? c.titleFr : c.titleEn}
              </span>
              <span className="font-mono text-sm text-gold/70">{c.count}</span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-navy-50/75">
              {fr ? c.blurbFr : c.blurbEn}
            </p>
          </Link>
        ))}
      </div>

      <h2 id="by-uri-pattern">
        {fr ? "Par motif d’URI" : "By URI pattern"}
      </h2>
      <p>
        {fr
          ? "Toutes les ressources sont adressées par une URI de la forme acf://catégorie/identifiant. La langue est négociée hors-URI via l’en-tête Accept-Language ou la variable ACF_MCP_LOCALE — pas dans l’URI elle-même, pour garder une seule URI canonique par contenu."
          : "All resources are addressed by a URI of the form acf://category/identifier. The locale is negotiated outside the URI via the Accept-Language header or the ACF_MCP_LOCALE variable — not in the URI itself, so that each piece of content has a single canonical URI."}
      </p>
      <ul>
        <li>
          <code>acf://whitepaper</code> —{" "}
          {fr
            ? "le whitepaper fondateur d’ACF® (Markdown)"
            : "the founding ACF® whitepaper (Markdown)"}
        </li>
        <li>
          <code>acf://deck</code> —{" "}
          {fr
            ? "le deck de présentation du standard (Markdown)"
            : "the standard’s presentation deck (Markdown)"}
        </li>
        <li>
          <code>acf://manual</code>, <code>acf://manual/toc</code>,{" "}
          <code>acf://manual/section/{`{N}`}</code> —{" "}
          {fr
            ? "le manuel pédagogique complet, sa table des matières, et chaque partie individuellement (9 parties)"
            : "the full pedagogical manual, its table of contents, and each part individually (9 parts)"}
        </li>
        <li>
          <code>acf://framework/principle/{`{P1..P4}`}</code> —{" "}
          {fr
            ? "les 4 principes fondateurs (JSON structuré)"
            : "the 4 founding principles (structured JSON)"}
        </li>
        <li>
          <code>acf://framework/autonomy-level/{`{N0..N3}`}</code> —{" "}
          {fr
            ? "les 4 niveaux d’autonomie (JSON structuré)"
            : "the 4 autonomy levels (structured JSON)"}
        </li>
        <li>
          <code>acf://framework/dimension/{`{D1..D6}`}</code> —{" "}
          {fr
            ? "les 6 dimensions de maturité (JSON structuré)"
            : "the 6 maturity dimensions (structured JSON)"}
        </li>
        <li>
          <code>acf://framework/ddao</code> —{" "}
          {fr
            ? "la définition canonique du rôle DDAO"
            : "the canonical definition of the DDAO role"}
        </li>
        <li>
          <code>acf://fiche/{`{ACF-00..ACF-16}`}</code> —{" "}
          {fr
            ? "une des 17 fiches méthodologiques (Markdown avec frontmatter)"
            : "one of the 17 methodological cards (Markdown with frontmatter)"}
        </li>
        <li>
          <code>acf://guide/{`{ai-act|gdpr|dora|nis2|iso-42001}`}</code> —{" "}
          {fr
            ? "le guide opérationnel d’un régulateur (Markdown)"
            : "the operational guide for a regulator (Markdown)"}
        </li>
        <li>
          <code>acf://glossary</code> —{" "}
          {fr
            ? "l’index canonique des termes ACF®"
            : "the canonical index of ACF® terms"}
        </li>
        <li>
          <code>acf://meta</code> —{" "}
          {fr
            ? "métadonnées de la doctrine — version, hash, URL d’archive, langues"
            : "doctrine metadata — version, hash, archive URL, locales"}
        </li>
      </ul>

      <h2 id="fetching">{fr ? "Récupérer une ressource" : "Fetching a resource"}</h2>
      <p>
        {fr
          ? "Un client MCP appelle la méthode resources/read avec l’URI cible. Le serveur renvoie un tableau contents avec le MIME type et le texte. La langue effectivement servie est exposée dans le frontmatter served_locale (pour les Markdown) ou dans l’enveloppe served_locale / is_fallback (pour les JSON), pour qu’un client puisse détecter un fallback vers l’anglais."
          : "An MCP client calls the resources/read method with the target URI. The server returns a contents array with the MIME type and the text. The actually-served locale is exposed in the served_locale frontmatter (for Markdown) or in the served_locale / is_fallback envelope (for JSON), so a client can detect a fallback to English."}
      </p>
      <CodeBlock
        language="ts"
        filename="fetch-resource.ts"
        code={`import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "acf-mcp@latest"],
  env: { ACF_MCP_LOCALE: "fr" },
});

const client = new Client({ name: "acf-demo", version: "1.0.0" }, {});
await client.connect(transport);

// List every resource
const { resources } = await client.listResources();

// Read one — here ACF-07 (Kill switch)
const { contents } = await client.readResource({
  uri: "acf://fiche/ACF-07",
});

console.log(contents[0].mimeType);   // "text/markdown"
console.log(contents[0].text);       // frontmatter + body`}
      />

      <h2 id="signing">{fr ? "Signature" : "Signing"}</h2>
      <p>
        {fr ? (
          <>
            La signature ne porte pas sur chaque ressource individuelle mais sur le
            content_hash de la doctrine complète, exposé par <code>acf://meta</code>{" "}
            et embarqué dans le pied-de-page de chaque sortie d’outil. C’est ce hash
            qui rend opposable l’ensemble du corpus : si une seule fiche change, le
            hash change, et la doctrine entière reçoit une nouvelle version. Détails
            cryptographiques et code de vérification :{" "}
            <Link href="/signatures">page Signatures</Link>.
          </>
        ) : (
          <>
            Signing does not target each resource individually — it targets the
            content_hash of the full doctrine, exposed by <code>acf://meta</code> and
            embedded in every tool output footer. That hash is what makes the whole
            corpus defensible: if a single card changes, the hash changes, and the
            entire doctrine receives a new version. Cryptographic details and
            verification code: <Link href="/signatures">Signatures page</Link>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
