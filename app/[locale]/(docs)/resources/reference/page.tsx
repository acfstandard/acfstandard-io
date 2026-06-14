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
      title={fr ? "Ressources — Référence" : "Resources — Reference"}
      description={
        fr
          ? "Les ressources transverses : index du glossaire ACF®, métadonnées de la doctrine (version, hash, signature, URL d’archive, langues supportées) et bundle d’archive permanente. La couche infrastructure du corpus, indispensable pour vérifier qu’une sortie d’outil est opposable."
          : "Cross-cutting resources: ACF® glossary index, doctrine metadata (version, hash, signature, archive URL, supported locales) and permanent archive bundle. The corpus infrastructure layer — indispensable to verify that a tool output is defensible."
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
          ? "Trois ressources transverses : (1) acf://glossary, l’index canonique des termes ACF® ; (2) acf://meta, les métadonnées techniques de la doctrine ; (3) le bundle d’archive permanente exposé hors-MCP via une URL HTTPS gelée. Aucune n’est volumineuse — elles tiennent toutes dans un cache client."
          : "Three cross-cutting resources: (1) acf://glossary, the canonical ACF® term index; (2) acf://meta, the doctrine’s technical metadata; (3) the permanent archive bundle exposed outside MCP via a frozen HTTPS URL. None is bulky — they all fit in a client cache."}
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
            ? "Liste structurée des termes officiels (DDAO, Souveraineté décisionnelle, niveaux N0–N3, kill switch, mandat, registre de décisions, etc.) avec définitions bilingues et cross-refs vers les principes, fiches et articles régulateurs."
            : "Structured list of official terms (DDAO, Decision Sovereignty, N0–N3 levels, kill switch, mandate, decision register, etc.) with bilingual definitions and cross-refs to principles, cards and regulator articles."}
        </p>
        <p className="mt-2 text-[13px] text-navy-50/65">
          {fr ? (
            <>
              See also — outil READ{" "}
              <Link href={"/tools/acf.glossary.define" as never}>
                <code>acf.glossary.define</code>
              </Link>{" "}
              pour la définition canonique d’un terme précis.
            </>
          ) : (
            <>
              See also — READ tool{" "}
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
            ? "Version, hash, signature, URL d’archive, langues supportées"
            : "Version, hash, signature, archive URL, supported locales"}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
          {fr
            ? "Document court (JSON, ~1 Ko) qui décrit la version de doctrine actuellement servie : framework_version sémantique, content_build ISO 8601, content_hash SHA-256, doctrine_signature Ed25519, doctrine_public_key, permanent_archive_url, rules_version, fallback_locale et la liste exhaustive des locales supportées (V1.0 : fr, en, es, de, pt, it, nl, ru, ar, tr, ja, zh, ko — seuls fr et en sont effectivement servis, le reste tombe en fallback en)."
            : "Short document (JSON, ~1 KB) describing the doctrine version currently served: semantic framework_version, ISO 8601 content_build, SHA-256 content_hash, Ed25519 doctrine_signature, doctrine_public_key, permanent_archive_url, rules_version, fallback_locale and the exhaustive list of supported locales (V1.0: fr, en, es, de, pt, it, nl, ru, ar, tr, ja, zh, ko — only fr and en are actually served, the rest fall back to en)."}
        </p>
      </div>

      <h3 id="archive">
        {fr ? "Bundle d’archive permanente" : "Permanent archive bundle"}
      </h3>
      <div className="not-prose mb-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <code className="font-mono text-[13px] font-semibold text-gold">
            https://archive.acfstandard.com/doctrine/v1.0/
          </code>
          <span className="rounded border border-gold/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold/80">
            HTTPS
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
          {fr
            ? "URL gelée hors-MCP, servie par CDN immutable"
            : "Frozen URL outside MCP, served by an immutable CDN"}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">
          {fr
            ? "Le bundle d’archive n’est pas une ressource MCP au sens du protocole (pas d’URI acf://) — c’est une URL HTTPS gelée et signée qui contient tout le corpus de la version concernée (whitepaper, fiches, guides, manuel, principes, dimensions, glossaire, meta). Pin-la dans votre audit pipeline pour avoir une racine de confiance opposable indépendamment de la disponibilité du serveur MCP."
            : "The archive bundle is not an MCP resource in the protocol sense (no acf:// URI) — it is a frozen, signed HTTPS URL containing the full corpus for the version (whitepaper, cards, guides, manual, principles, dimensions, glossary, meta). Pin it in your audit pipeline to keep a defensible root of trust independent of MCP server availability."}
        </p>
      </div>

      <h2 id="version-metadata-shape">
        {fr ? "Forme des métadonnées" : "Metadata shape"}
      </h2>
      <p>
        {fr
          ? "Ce que acf://meta renvoie en V1.0 (chiffres et timestamp réels) :"
          : "What acf://meta returns in V1.0 (real values and timestamp):"}
      </p>
      <CodeBlock
        language="json"
        filename="meta.json"
        code={`{
  "framework_version": "1.0",
  "content_build": "2026-06-14T10:47:44.384Z",
  "content_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "permanent_archive_url": "https://archive.acfstandard.com/doctrine/v1.0/",
  "rules_version": "2026-06",
  "locales": ["fr", "en", "es", "de", "pt", "it", "nl", "ru", "ar", "tr", "ja", "zh", "ko"],
  "fallback_locale": "en",
  "doctrine_signature": "ed25519:yqySJDnYnXaAIC37LJXyw3D9F4dDX7Gt29Em7nn9/wW/EXt1Y8ychyrqnLnWqxDpC2Ek+FYsgPPGFm9q/11TCg==",
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
const pinnedHash = meta.content_hash;                // "sha256:bf0b..."
const verificationKey = meta.doctrine_public_key;    // base64 SPKI Ed25519
const archiveUrl = meta.permanent_archive_url;       // immutable bundle

// 2. Read the glossary index
const glossaryResp = await client.readResource({ uri: "acf://glossary" });
const glossary = JSON.parse(glossaryResp.contents[0].text);
// Array of { term, expansion?, definition: { fr, en }, related_principles, related_fiches, ... }

// 3. Every later tool output must embed the same content_hash —
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
