import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { ParamGroup, Param } from "@/components/Param";

const STDIO_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"],
      "env": {
        "ACF_MCP_LOCALE": "fr"
      }
    }
  }
}`;

const PINNED_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp@2.0.1"]
    }
  }
}`;

const LOCALE_PER_CALL = `// Per resource: ?lang=fr or ?lang=en
await client.readResource({ uri: "acf://fiche/ACF-13?lang=fr" });

// Per tool call: the locale argument
await client.callTool({
  name: "acf.glossary.define",
  arguments: { term: "DDAO", locale: "fr" },
});`;

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
          ? "acf-mcp est un serveur MCP local qui tourne sur le poste du client, lancé par npx en stdio. Il ne demande aucun secret et une seule variable d’environnement, pour la langue par défaut."
          : "acf-mcp is a local MCP server that runs on the client machine, started by npx over stdio. It needs no secret and a single environment variable, for the default language."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Aucun secret.</strong> acf-mcp ne stocke ni clé API, ni token, ni
            identifiant, et n’appelle aucun service distant pendant un appel d’outil : la
            doctrine, les règles et l’index de recherche sont embarqués dans le paquet.
          </>
        ) : (
          <>
            <strong>No secret.</strong> acf-mcp stores no API key, no token, no credential,
            and calls no remote service during a tool call: the doctrine, the rules and the
            search index ship inside the package.
          </>
        )}
      </Callout>

      <h2 id="client-config">{fr ? "Déclarer le serveur dans votre client" : "Declare the server in your client"}</h2>
      <p>
        {fr
          ? "Tous les clients MCP (Claude Desktop, Cursor, Windsurf, Continue, Zed) utilisent la même déclaration : une commande et ses arguments. Le client lance le serveur et lui parle en stdio."
          : "Every MCP client (Claude Desktop, Cursor, Windsurf, Continue, Zed) uses the same declaration: a command and its arguments. The client starts the server and talks to it over stdio."}
      </p>
      <CodeBlock code={STDIO_CONFIG} language="json" filename="mcp-config.json" />

      <h2 id="env">{fr ? "Variable d’environnement" : "Environment variable"}</h2>
      <ParamGroup>
        <Param name="ACF_MCP_LOCALE" type='"fr" | "en"' defaultValue='"en"'>
          {fr
            ? "Langue par défaut des ressources quand ni l’URI (?lang=) ni l’argument locale d’un outil ne la précisent. Le français et l’anglais sont servis ; toute autre valeur retombe sur l’anglais."
            : "Default language of resources when neither the URI (?lang=) nor a tool’s locale argument sets it. French and English are served; any other value falls back to English."}
        </Param>
      </ParamGroup>

      <h2 id="locale-per-call">{fr ? "Choisir la langue appel par appel" : "Choosing the language per call"}</h2>
      <p>
        {fr
          ? "L’ordre de priorité est le suivant : paramètre explicite (?lang= dans l’URI ou argument locale), puis ACF_MCP_LOCALE, puis l’anglais."
          : "The priority order is: explicit parameter (?lang= in the URI or locale argument), then ACF_MCP_LOCALE, then English."}
      </p>
      <CodeBlock code={LOCALE_PER_CALL} language="typescript" filename="locale.ts" />

      <h2 id="pin-version">{fr ? "Figer la version" : "Pinning the version"}</h2>
      <p>
        {fr
          ? "npx -y acf-mcp prend la dernière version publiée. Pour un audit, figez la version : l’empreinte et la signature de la doctrine ne changent qu’avec elle."
          : "npx -y acf-mcp takes the latest published version. For an audit, pin the version: the doctrine hash and signature only change with it."}
      </p>
      <CodeBlock code={PINNED_CONFIG} language="json" filename="mcp-config.json" />
      <p>
        {fr ? (
          <>
            La version servie, son empreinte et sa clé publique se lisent dans la ressource{" "}
            <code>acf://meta</code>. Voir <Link href="/signatures">Signatures</Link>.
          </>
        ) : (
          <>
            The served version, its hash and its public key are read from the{" "}
            <code>acf://meta</code> resource. See <Link href="/signatures">Signatures</Link>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
