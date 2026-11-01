import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

export default async function ReferenceResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Ressources : référence" : "Resources: reference"}
      description={
        fr
          ? "Les ressources transverses : index du glossaire ACF®, métadonnées de la doctrine (version, hash, signature, URL d’archive, langues supportées) et bundle d’archive livré avec le paquet. La couche infrastructure du corpus, celle qui permet de vérifier sur quelle doctrine une sortie d’outil s’appuie."
          : "Cross-cutting resources: ACF® glossary index, doctrine metadata (version, hash, signature, archive URL, supported locales) and the archive bundle shipped with the package. The corpus infrastructure layer, the one that lets you check which doctrine a tool output relies on."
      }
      badge={fr ? "Ressources" : "Resources"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            La ressource <code>acf://meta</code> est <strong>le pivot</strong> du
            modèle de confiance ACF®. Elle expose le <code>content_hash</code> de
            la doctrine et sa signature Ed25519. Pin-la dans votre pipeline
            d’audit et vous obtenez un point d’entrée unique pour vérifier qu’une
            sortie d’outil correspond à une version de doctrine précise.
          </>
        ) : (
          <>
            The <code>acf://meta</code> resource is <strong>the pivot</strong> of
            the ACF® trust model. It exposes the doctrine{" "}
            <code>content_hash</code> and its Ed25519 signature. Pin it in your
            audit pipeline and you get a single entry point to verify that a tool
            output matches a precise doctrine version.
          </>
        )}
      </Callout>

      <h2 id="what-this-contains">
        {fr ? "Ce que cette catégorie contient" : "What this contains"}
      </h2>
      <p>
        {fr
          ? "Trois ressources transverses : (1) acf://glossary, l’index canonique des termes ACF® ; (2) acf://meta, les métadonnées techniques de la doctrine ; (3) le bundle d’archive, un fichier JSON livré dans le paquet npm. Aucune n’est volumineuse : elles tiennent toutes dans un cache client."
          : "Three cross-cutting resources: (1) acf://glossary, the canonical ACF® term index; (2) acf://meta, the doctrine’s technical metadata; (3) the archive bundle, a JSON file shipped in the npm package. None is bulky: they all fit in a client cache."}
      </p>

      <h2 id="list">{fr ? "Liste exhaustive" : "Exhaustive list"}</h2>

      <h3 id="glossary">{fr ? "Glossaire" : "Glossary"}</h3>
      <div className="not-prose mb-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <code className="font-mono text-[13px] font-semibold text-gold">
            acf://glossary
          </code>
          <span className="rounded border border-blue-400/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-300/80">
            JSON
          </span>
          <span className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy-50/65">
            FR + EN
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
          {fr
            ? "Index canonique des termes ACF®"
            : "Canonical index of ACF® terms"}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
          {fr
            ? "Liste structurée des termes officiels (DDAO, Souveraineté décisionnelle, autonomie déléguée, maturité N0 à N3, kill switch, mandat, registre de décisions, etc.) avec définitions bilingues et cross-refs vers les principes, fiches et articles régulateurs."
            : "Structured list of official terms (DDAO, Decision Sovereignty, delegated autonomy, N0 to N3 maturity, kill switch, mandate, decision register, etc.) with bilingual definitions and cross-refs to principles, cards and regulator articles."}
        </p>
        <p className="mt-2 text-[13px] text-navy-50/65">
          {fr ? (
            <>
              See also, outil READ{" "}
              <Link href={"/tools/acf.glossary.define" as never}>
                <code>acf.glossary.define</code>
              </Link>{" "}
              pour la définition canonique d’un terme précis.
            </>
          ) : (
            <>
              See also: READ tool{" "}
              <Link href={"/tools/acf.glossary.define" as never}>
                <code>acf.glossary.define</code>
              </Link>{" "}
              for the canonical definition of a specific term.
            </>
          )}
        </p>
      </div>

      <h3 id="meta">{fr ? "Métadonnées de la doctrine" : "Doctrine metadata"}</h3>
      <div className="not-prose mb-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <code className="font-mono text-[13px] font-semibold text-gold">
            acf://meta
          </code>
          <span className="rounded border border-blue-400/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-300/80">
            JSON
          </span>
          <span className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy-50/65">
            {fr ? "neutre" : "neutral"}
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
          {fr
            ? "Version, empreinte, signature, URL d’archive prévue, langues servies"
            : "Version, hash, signature, planned archive URL, served locales"}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
          {fr
            ? "Document court (JSON, ~1 Ko) qui décrit la version de doctrine actuellement servie : framework_version sémantique, content_build ISO 8601, content_hash SHA-256, doctrine_signature Ed25519, doctrine_public_key, permanent_archive_url, rules_version, fallback_locale et la liste exhaustive des locales supportées (V1.0 : fr, en, es, de, pt, it, nl, ru, ar, tr, ja, zh, ko, seuls fr et en sont effectivement servis, le reste tombe en fallback en)."
            : "Short document (JSON, ~1 KB) describing the doctrine version currently served: semantic framework_version, ISO 8601 content_build, SHA-256 content_hash, Ed25519 doctrine_signature, doctrine_public_key, permanent_archive_url, rules_version, fallback_locale and the exhaustive list of supported locales (V1.0: fr, en, es, de, pt, it, nl, ru, ar, tr, ja, zh, ko, only fr and en are actually served, the rest fall back to en)."}
        </p>
      </div>

      <h3 id="archive">
        {fr ? "Bundle d’archive" : "Archive bundle"}
      </h3>
      <div className="not-prose mb-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <code className="font-mono text-[13px] font-semibold text-gold">
            node_modules/acf-mcp/dist/archive/doctrine-v1.0.json
          </code>
          <span className="rounded border border-gold/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold/80">
            JSON
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
          {fr ? "Livré dans chaque version npm, avec son manifeste" : "Shipped in every npm release, with its manifest"}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
          {fr
            ? "Le bundle d’archive n’est pas une ressource MCP (pas d’URI acf://) : c’est un fichier qui contient tout le corpus de la version, chaque fichier avec son empreinte SHA-256, ainsi que l’empreinte globale, la signature Ed25519 et la clé publique. Le manifeste (manifest-v1.0.json) reprend les mêmes empreintes sans le contenu. Conservez-le dans votre dossier d’audit : il se vérifie hors ligne, sans le serveur MCP."
            : "The archive bundle is not an MCP resource (no acf:// URI): it is a file holding the full corpus of the release, each file with its SHA-256 hash, plus the global hash, the Ed25519 signature and the public key. The manifest (manifest-v1.0.json) carries the same hashes without the content. Keep it in your audit file: it verifies offline, without the MCP server."}
        </p>
      </div>

      <h2 id="version-metadata-shape">
        {fr ? "Forme des métadonnées" : "Metadata shape"}
      </h2>
      <p>
        {fr
          ? "Ce que acf://meta renvoie (valeurs réelles d’acf-mcp 2.0.1) :"
          : "What acf://meta returns (real values of acf-mcp 2.0.1):"}
      </p>
      <CodeBlock
        language="json"
        filename="meta.json"
        code={`{
  "framework_version": "1.0",
  "content_build": "2026-11-01T11:15:31.220Z",
  "content_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "permanent_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "rules_version": "2026-06",
  "locales": [
    "fr",
    "en"
  ],
  "fallback_locale": "en",
  "doctrine_signature": "ed25519:3R0oIiqL3KgdVAemSy4oEprbUZnRWE4OEQQgD+2JnMzKhAL2xrmYjwrwbpkbew0T5B4YKvEYkycWFQ+paADFCQ==",
  "doctrine_public_key": "MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s="
}`}
      />

      <h2 id="fetching-this-category">
        {fr ? "Récupérer les ressources de référence" : "Fetching reference resources"}
      </h2>
      <p>
        {fr
          ? "En pratique, un client commence en général par lire acf://meta une fois au démarrage pour fixer la version de doctrine et obtenir la clé publique de vérification. Le glossaire suit, le plus souvent caché ensuite côté client puisqu’il change uniquement avec la doctrine elle-même."
          : "In practice, a client typically starts by reading acf://meta once at startup to pin the doctrine version and obtain the verification public key. The glossary follows and is usually cached on the client side afterwards, since it only changes with the doctrine itself."}
      </p>
      <CodeBlock
        language="ts"
        filename="fetch-reference.ts"
        code={`// 1. Pin the doctrine version on startup
const metaResp = await client.readResource({ uri: "acf://meta" });
const meta = JSON.parse(metaResp.contents[0].text);

const pinnedVersion = meta.framework_version;        // "1.0"
const pinnedHash = meta.content_hash;                // "sha256:1198..."
const verificationKey = meta.doctrine_public_key;    // base64 SPKI Ed25519

// 2. Read the glossary index
const glossaryResp = await client.readResource({ uri: "acf://glossary" });
const glossary = JSON.parse(glossaryResp.contents[0].text);
// Index of the terms; each one reads at acf://glossary/{term}

// 3. Every later tool output must embed the same content_hash,
//    otherwise the doctrine has shifted and the client must refresh.`}
      />

      <h2 id="see-also">{fr ? "Voir aussi" : "See also"}</h2>
      <p>
        {fr ? (
          <>
            La page <Link href="/signatures">Signatures</Link> détaille la
            vérification Ed25519 hors-ligne et fournit des implémentations Node /
            Python / Go. La page <Link href="/docs/architecture">Architecture</Link>{" "}
            explique pourquoi le contrat de signature est construit autour de{" "}
            <code>acf://meta</code> et non d’une signature par ressource.
          </>
        ) : (
          <>
            The <Link href="/signatures">Signatures</Link> page details offline
            Ed25519 verification and provides Node / Python / Go reference
            implementations. The <Link href="/docs/architecture">Architecture</Link>{" "}
            page explains why the signature contract is built around{" "}
            <code>acf://meta</code> rather than a per-resource signature.
          </>
        )}
      </p>
    </DocsPage>
  );
}
