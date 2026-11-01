import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

export default async function AuthenticationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Authentification" : "Authentication"}
      description={
        fr
          ? "acf-mcp ne demande aucune authentification : c’est un serveur local, lancé par votre client MCP sur votre propre poste, qui ne détient aucune donnée sensible."
          : "acf-mcp requires no authentication: it is a local server, started by your MCP client on your own machine, that holds no sensitive data."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr
          ? "La frontière de confiance est la machine qui lance le serveur. Il n’y a ni compte, ni clé API, ni point d’accès hébergé : le paquet npm contient la doctrine, les règles et l’index de recherche, et tout s’exécute localement."
          : "The trust boundary is the machine that starts the server. There is no account, no API key and no hosted endpoint: the npm package holds the doctrine, the rules and the search index, and everything runs locally."}
      </Callout>

      <h2 id="stdio">{fr ? "Transport stdio" : "stdio transport"}</h2>
      <p>
        {fr
          ? "Le client MCP (Claude Desktop, Cursor, Windsurf, Continue, Zed ou votre propre client) démarre acf-mcp comme un processus enfant et échange avec lui sur l’entrée et la sortie standard. Seul ce client peut lui parler ; aucun port réseau n’est ouvert."
          : "The MCP client (Claude Desktop, Cursor, Windsurf, Continue, Zed or your own client) starts acf-mcp as a child process and talks to it over standard input and output. Only that client can reach it; no network port is opened."}
      </p>

      <h2 id="shared-use">{fr ? "Usage partagé" : "Shared use"}</h2>
      <p>
        {fr
          ? "acf-mcp n’est pas distribué comme service réseau. Si vous l’exposez vous-même à plusieurs utilisateurs, l’authentification, la limitation de débit (par IP et globale) et la journalisation des accès relèvent de votre passerelle et non du serveur."
          : "acf-mcp is not distributed as a network service. If you expose it to several users yourself, authentication, rate limiting (per IP and global) and access logging are the job of your gateway, not of the server."}
      </p>

      <h2 id="signed-output">
        {fr ? "La signature reste la racine de confiance" : "The signature remains the root of trust"}
      </h2>
      <p>
        {fr ? (
          <>
            Chaque sortie d’outil de raisonnement porte <code>doctrine_hash</code> et{" "}
            <code>doctrine_signature</code> ; la clé publique se lit dans{" "}
            <code>acf://meta</code>. Un consommateur en aval peut donc vérifier sur quelle
            doctrine la réponse s’appuie, sans faire confiance au canal. Voir{" "}
            <Link href="/signatures">signatures de doctrine</Link>.
          </>
        ) : (
          <>
            Every reasoning tool output carries <code>doctrine_hash</code> and{" "}
            <code>doctrine_signature</code>; the public key is read from{" "}
            <code>acf://meta</code>. A downstream consumer can therefore check which
            doctrine the answer relies on, without trusting the channel. See{" "}
            <Link href="/signatures">doctrine signatures</Link>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
