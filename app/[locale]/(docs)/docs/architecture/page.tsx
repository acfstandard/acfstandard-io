import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

const PIPELINE_FLOW = `client (Claude Desktop, Cursor, ...)
   |
   |  stdio JSON-RPC (MCP)
   v
+-------------------------------------------+
|  acf-mcp server (Node.js >= 18)           |
|                                           |
|  1. input validation (zod schemas)        |
|     |                                     |
|     v                                     |
|  2. rule engine (deterministic matcher)   |
|     - loads rules/*.json at startup       |
|     - lunr index for READ tools           |
|     |                                     |
|     v                                     |
|  3. signed footer (Ed25519)               |
|     - doctrine_hash + doctrine_signature  |
|     - generated_at + regulatory_snapshot  |
+-------------------------------------------+
   |
   v
deterministic, signed JSON output`;

const RESOURCE_URI_EXAMPLE = `acf://principles/p1-traceability
acf://fiches/acf-08-decision-register
acf://glossary/ddao
acf://regulator/eu-ai-act/article-26`;

export default async function ArchitecturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Architecture" : "Architecture"}
      description={
        fr
          ? "acf-mcp est un serveur stdio local-first, déterministe, sans appel LLM interne. Base de connaissances versionnée et signée Ed25519. Trois modules en pipeline : entrée → moteur de règles → pied de page signé. Latence typique inférieure à 10 ms par appel."
          : "acf-mcp is a local-first stdio server, deterministic, with no internal LLM call. Versioned and Ed25519-signed knowledge base. Three-module pipeline: input → rule engine → signed footer. Typical latency below 10 ms per call."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>acf-mcp n’appelle aucun LLM en interne.</strong> Chaque
            sortie est produite par un moteur de règles déterministe sur une base
            de connaissances signée. C’est la garantie d’<em>auditabilité</em>{" "}
            qui rend le standard opposable à un auditeur ou un tribunal.
          </>
        ) : (
          <>
            <strong>acf-mcp does not call any LLM internally.</strong> Every
            output is produced by a deterministic rule engine over a signed
            knowledge base. This is the <em>auditability</em> guarantee that
            makes the standard defensible to an auditor or a court.
          </>
        )}
      </Callout>

      <h2 id="design-principles">
        {fr ? "Principes de conception" : "Design principles"}
      </h2>
      <ul>
        <li>
          <strong>{fr ? "Local-first" : "Local-first"}</strong> —{" "}
          {fr
            ? "transport stdio par défaut, lancé par le client à la demande, aucun appel réseau sortant en fonctionnement nominal."
            : "stdio transport by default, launched by the client on demand, no outbound network call in nominal operation."}
        </li>
        <li>
          <strong>{fr ? "Déterministe" : "Deterministic"}</strong> —{" "}
          {fr
            ? "même entrée + même version de doctrine ⇒ même sortie, byte-pour-byte. Pas de température, pas de seed aléatoire, pas de LLM."
            : "same input + same doctrine version ⇒ same output, byte-for-byte. No temperature, no random seed, no LLM."}
        </li>
        <li>
          <strong>{fr ? "Signé bout-en-bout" : "End-to-end signed"}</strong> —{" "}
          {fr
            ? "chaque sortie embarque doctrine_hash, doctrine_signature (Ed25519) et doctrine_public_key. Vérification hors-ligne possible."
            : "every output embeds doctrine_hash, doctrine_signature (Ed25519) and doctrine_public_key. Verifiable offline."}
        </li>
        <li>
          <strong>{fr ? "Versionné" : "Versioned"}</strong> —{" "}
          {fr
            ? "la base de connaissances est figée par release (doctrine_version + doctrine_hash). Aucune dérive silencieuse possible."
            : "the knowledge base is frozen per release (doctrine_version + doctrine_hash). No silent drift possible."}
        </li>
      </ul>

      <h2 id="pipeline">
        {fr ? "Pipeline de traitement" : "Processing pipeline"}
      </h2>
      <p>
        {fr
          ? "Chaque appel d’outil traverse trois modules dans cet ordre strict. La latence cumulée typique est inférieure à 10 ms (lecture disque mise en cache, index lunr en mémoire, signature Ed25519 constante)."
          : "Every tool call passes through three modules in this strict order. Typical end-to-end latency is below 10 ms (cached disk reads, in-memory lunr index, constant-time Ed25519 signing)."}
      </p>
      <CodeBlock language="text" code={PIPELINE_FLOW} />

      <h3 id="module-input">
        {fr ? "1. Validation d’entrée" : "1. Input validation"}
      </h3>
      <p>
        {fr
          ? "Chaque outil déclare un schéma zod. Les champs enum (par exemple autonomy_level ∈ {N0,N1,N2,N3}) sont validés contre la liste canonique de la doctrine. Une description ou un domaine d’usage trop court (< 20 caractères) est rejeté immédiatement, sans appel au moteur."
          : "Every tool declares a zod schema. Enum fields (e.g. autonomy_level ∈ {N0,N1,N2,N3}) are validated against the doctrine’s canonical list. A description or use-case domain shorter than 20 characters is rejected immediately, with no engine call."}
      </p>

      <h3 id="module-engine">
        {fr ? "2. Moteur de règles" : "2. Rule engine"}
      </h3>
      <p>
        {fr
          ? "Le moteur charge ses fichiers de règles JSON depuis le disque au démarrage. Pour les outils REASON, c’est un pattern matcher déterministe (table de correspondances entrée canonique → fragment de doctrine). Pour les outils READ, c’est un index lunr en mémoire (recherche plein-texte sur le corpus signé)."
          : "The engine loads its JSON rule files from disk at startup. For REASON tools, it is a deterministic pattern matcher (canonical-input → doctrine-fragment lookup table). For READ tools, it is an in-memory lunr index (full-text search over the signed corpus)."}
      </p>

      <h3 id="module-footer">
        {fr ? "3. Pied de page signé" : "3. Signed footer"}
      </h3>
      <p>
        {fr
          ? "Le résultat du moteur est sérialisé canoniquement (JCS — RFC 8785), hashé SHA-256, signé Ed25519 avec la clé de doctrine, puis enveloppé dans un objet qui embarque doctrine_version, doctrine_hash, doctrine_signature, doctrine_public_key, regulatory_snapshot et generated_at."
          : "The engine result is serialised canonically (JCS — RFC 8785), SHA-256 hashed, Ed25519-signed with the doctrine key, then wrapped in an object embedding doctrine_version, doctrine_hash, doctrine_signature, doctrine_public_key, regulatory_snapshot and generated_at."}
      </p>
      <p>
        {fr ? (
          <>
            Voir la page <Link href="/signatures">signatures de doctrine</Link>{" "}
            pour le détail cryptographique et trois implémentations de
            vérification.
          </>
        ) : (
          <>
            See the <Link href="/signatures">doctrine signatures</Link> page for
            the cryptographic detail and three reference verifier
            implementations.
          </>
        )}
      </p>

      <h2 id="resources">
        {fr ? "Ressources MCP" : "MCP resources"}
      </h2>
      <p>
        {fr
          ? "Les ressources sont des fichiers markdown avec frontmatter YAML, servis sous des URI canoniques acf://… . Le frontmatter porte la version, le hash et la signature ; le corps porte le contenu pédagogique. Le serveur ne fait que streamer ces fichiers."
          : "Resources are markdown files with YAML frontmatter, served under canonical acf://… URIs. The frontmatter carries version, hash and signature; the body carries the pedagogical content. The server simply streams these files."}
      </p>
      <CodeBlock language="text" code={RESOURCE_URI_EXAMPLE} />

      <h2 id="performance">
        {fr ? "Performance" : "Performance"}
      </h2>
      <ul>
        <li>
          {fr
            ? "Latence typique outil REASON : 2–6 ms (validation + lookup + signature)."
            : "Typical REASON tool latency: 2–6 ms (validation + lookup + signing)."}
        </li>
        <li>
          {fr
            ? "Latence typique outil READ : 4–9 ms (requête lunr + sérialisation)."
            : "Typical READ tool latency: 4–9 ms (lunr query + serialisation)."}
        </li>
        <li>
          {fr
            ? "Empreinte mémoire serveur : ~80 MB au démarrage (corpus + index)."
            : "Server memory footprint: ~80 MB at startup (corpus + index)."}
        </li>
        <li>
          {fr
            ? "Aucun appel réseau en mode stdio nominal. Aucun appel LLM, jamais."
            : "No network call in nominal stdio mode. No LLM call, ever."}
        </li>
      </ul>

      <h2 id="boundaries">
        {fr ? "Limites assumées" : "Stated boundaries"}
      </h2>
      <p>
        {fr
          ? "acf-mcp produit une qualification préliminaire opposable, pas un avis juridique. Le serveur ne valide pas la conformité d’un agent — il fournit la base de connaissances signée, les outils de raisonnement et la trace cryptographique. La décision finale reste celle du DDAO (Designated Deployer of Autonomous Operations) ou du juriste compétent."
          : "acf-mcp produces a defensible preliminary qualification, not legal advice. The server does not certify an agent’s compliance — it provides the signed knowledge base, the reasoning tools and the cryptographic trace. The final decision belongs to the DDAO (Designated Deployer of Autonomous Operations) or the competent counsel."}
      </p>
    </DocsPage>
  );
}
