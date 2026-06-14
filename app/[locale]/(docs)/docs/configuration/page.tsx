import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { ParamGroup, Param } from "@/components/Param";
import { Tabs } from "@/components/Tabs";

const STDIO_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"],
      "env": {
        "ACF_LOCALE": "fr"
      }
    }
  }
}`;

const HTTP_BOOT = `# Launch acf-mcp over HTTP instead of stdio
ACF_HTTP_PORT=3000 npx -y acf-mcp --transport http`;

const ARCHIVE_OVERRIDE = `# Point the signed-footer at your self-hosted doctrine mirror
ACF_DOCTRINE_ARCHIVE_URL=https://acf.internal.example.com/doctrine/v1.0/archive.json \\
  npx -y acf-mcp`;

export default async function ConfigurationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Configuration" : "Configuration"}
      description={
        fr
          ? "acf-mcp se configure par variables d’environnement. Aucun secret n’est jamais requis : le serveur ne détient rien de sensible. Cette page liste chaque variable, son rôle, sa valeur par défaut et les deux transports disponibles (stdio et HTTP)."
          : "acf-mcp is configured via environment variables. No secret is ever required: the server holds nothing sensitive. This page lists each variable, its purpose, its default, and the two available transports (stdio and HTTP)."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Aucun secret côté serveur.</strong> acf-mcp ne stocke ni
            clé API, ni token, ni credentials. Les variables ci-dessous
            paramètrent la locale, le transport et l’URL d’archive de doctrine
            — rien d’authentifiant.
          </>
        ) : (
          <>
            <strong>No server-side secret.</strong> acf-mcp stores no API key,
            no token, no credentials. The variables below tune the locale, the
            transport and the doctrine archive URL — nothing authenticating.
          </>
        )}
      </Callout>

      <h2 id="env-vars">
        {fr ? "Variables d’environnement" : "Environment variables"}
      </h2>
      <ParamGroup>
        <Param name="ACF_LOCALE" type="string" defaultValue='"en"'>
          {fr
            ? "Locale de réponse du serveur. Valeurs supportées : en, fr. Affecte le langage des explications dans les sorties d’outils REASON et le contenu retourné pour les ressources bilingues."
            : "Server reply locale. Supported values: en, fr. Affects the language of explanations inside REASON tool outputs and the content returned for bilingual resources."}
        </Param>
        <Param name="ACF_DOCTRINE_ARCHIVE_URL" type="string">
          {fr
            ? "URL absolue de l’archive de doctrine signée que le pied de page doit référencer. Par défaut, la version officielle hébergée sur acfstandard.io. Surchargez cette variable pour pointer vers votre miroir interne ou un environnement isolé du réseau."
            : "Absolute URL of the signed doctrine archive that the signed footer must reference. Defaults to the official version hosted on acfstandard.io. Override this variable to point at your internal mirror or an air-gapped environment."}
        </Param>
        <Param name="ACF_HTTP_PORT" type="integer" defaultValue="3000">
          {fr
            ? "Port d’écoute en mode transport HTTP. Ignoré en mode stdio (le défaut). Activer en passant --transport http en ligne de commande."
            : "Listen port when running with HTTP transport. Ignored in stdio mode (the default). Enabled by passing --transport http on the command line."}
        </Param>
      </ParamGroup>

      <h2 id="transports">
        {fr ? "Transports disponibles" : "Available transports"}
      </h2>
      <p>
        {fr
          ? "Deux transports sont fournis. Le stdio est le défaut, pensé pour un seul utilisateur sur sa machine. Le HTTP existe pour les déploiements multi-utilisateurs derrière votre propre passerelle."
          : "Two transports are shipped. stdio is the default, intended for a single user on their own machine. HTTP exists for multi-user deployments behind your own gateway."}
      </p>

      <Tabs
        tabs={[
          {
            label: "stdio (default)",
            content: (
              <div className="p-5">
                <p className="mb-3 text-[14px] text-navy-50/75">
                  {fr ? (
                    <>
                      Transport par défaut. Le client lance le binaire à la
                      demande via <code>npx</code> et communique via
                      stdin/stdout en JSON-RPC. Pas de port, pas de
                      configuration réseau.
                    </>
                  ) : (
                    <>
                      Default transport. The client launches the binary on
                      demand via <code>npx</code> and talks JSON-RPC over
                      stdin/stdout. No port, no network setup.
                    </>
                  )}
                </p>
                <CodeBlock
                  code={STDIO_CONFIG}
                  language="json"
                  filename="client-config.json"
                />
              </div>
            ),
          },
          {
            label: "HTTP",
            content: (
              <div className="p-5">
                <p className="mb-3 text-[14px] text-navy-50/75">
                  {fr ? (
                    <>
                      Mode opt-in. Le serveur expose un endpoint MCP-over-HTTP
                      sur <code>ACF_HTTP_PORT</code>. Rate-limit par défaut : 60
                      appels par minute et par IP. Voir{" "}
                      <Link href="/docs/authentication">authentification</Link>{" "}
                      pour les détails de protection.
                    </>
                  ) : (
                    <>
                      Opt-in mode. The server exposes an MCP-over-HTTP endpoint
                      on <code>ACF_HTTP_PORT</code>. Default rate limit: 60
                      calls per minute per IP. See{" "}
                      <Link href="/docs/authentication">authentication</Link>{" "}
                      for the protection details.
                    </>
                  )}
                </p>
                <CodeBlock code={HTTP_BOOT} language="bash" />
              </div>
            ),
          },
        ]}
      />

      <h2 id="self-hosted-archive">
        {fr ? "Archive de doctrine auto-hébergée" : "Self-hosted doctrine archive"}
      </h2>
      <p>
        {fr
          ? "Pour un déploiement isolé du réseau ou contrôlé par un référentiel interne, mirroir l’archive signée et pointez ACF_DOCTRINE_ARCHIVE_URL vers votre URL. Le pied de page signé reflétera ce miroir, ce qui rend la trace auditeur cohérente avec votre infrastructure."
          : "For an air-gapped deployment or one controlled by an internal source of truth, mirror the signed archive and point ACF_DOCTRINE_ARCHIVE_URL at your URL. The signed footer will reflect that mirror, keeping the auditor trace consistent with your infrastructure."}
      </p>
      <CodeBlock code={ARCHIVE_OVERRIDE} language="bash" />
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr
          ? "Si vous changez l’URL d’archive, vous restez responsable de la disponibilité du fichier signé pour vos auditeurs. La signature Ed25519 reste valide tant que vous diffusez la doctrine sans la modifier."
          : "If you change the archive URL, you remain responsible for the availability of the signed file for your auditors. The Ed25519 signature remains valid as long as you serve the doctrine unmodified."}
      </Callout>

      <h2 id="cli-flags">
        {fr ? "Drapeaux CLI" : "CLI flags"}
      </h2>
      <ParamGroup>
        <Param name="--transport" type="enum" defaultValue='"stdio"'>
          {fr
            ? "Transport à utiliser. Valeurs : stdio (défaut), http."
            : "Transport to use. Values: stdio (default), http."}
        </Param>
        <Param name="--version" type="flag">
          {fr
            ? "Affiche la version du serveur, le doctrine_version chargé et la clé publique Ed25519, puis quitte."
            : "Prints the server version, the loaded doctrine_version and the Ed25519 public key, then exits."}
        </Param>
        <Param name="--help" type="flag">
          {fr ? "Affiche l’aide et quitte." : "Prints help and exits."}
        </Param>
      </ParamGroup>

      <h2 id="see-also">
        {fr ? "Voir aussi" : "See also"}
      </h2>
      <ul>
        <li>
          <Link href="/docs/authentication">
            {fr ? "Authentification" : "Authentication"}
          </Link>{" "}
          — {fr ? "transport HTTP, clés API." : "HTTP transport, API keys."}
        </li>
        <li>
          <Link href="/docs/errors">
            {fr ? "Codes d’erreur" : "Error codes"}
          </Link>{" "}
          —{" "}
          {fr
            ? "comportement quand une variable est invalide ou un fichier introuvable."
            : "behaviour when a variable is invalid or a file is missing."}
        </li>
      </ul>
    </DocsPage>
  );
}
