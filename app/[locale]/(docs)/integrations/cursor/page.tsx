import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Steps, Step } from "@/components/Steps";
import { Tabs } from "@/components/Tabs";

const CURSOR_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`;

const CURSOR_HTTP_CONFIG = `{
  "mcpServers": {
    "acf": {
      "url": "https://your-acf-mcp.example.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_ACF_API_KEY"
      }
    }
  }
}`;

const CURSOR_PROJECT_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`;

export default async function CursorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="Cursor"
      description={
        fr
          ? "Ajoutez acf-mcp à Cursor pour que son agent appelle les outils de gouvernance ACF directement dans votre IDE."
          : "Add acf-mcp to Cursor so its agent can call ACF governance tools directly inside your IDE."
      }
      badge="Integration"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Cursor</strong> est un IDE basé sur VS Code avec un agent intégré.
            Il supporte MCP en stdio et en HTTP, et accepte une configuration{" "}
            <strong>globale</strong> (<code>~/.cursor/mcp.json</code>) ou{" "}
            <strong>par projet</strong> (<code>.cursor/mcp.json</code> à la racine du repo).
          </>
        ) : (
          <>
            <strong>Cursor</strong> is a VS Code-based IDE with a built-in agent. It
            supports MCP over stdio and HTTP, and accepts either a <strong>global</strong>{" "}
            (<code>~/.cursor/mcp.json</code>) or <strong>per-project</strong>{" "}
            (<code>.cursor/mcp.json</code> at the repo root) configuration.
          </>
        )}
      </Callout>

      <h2 id="prerequisites">{fr ? "Pré-requis" : "Prerequisites"}</h2>
      <ul>
        <li>
          <strong>Node.js ≥ 18</strong>{" "}
          ({fr ? "vérifiez avec" : "check with"} <code>node --version</code>)
        </li>
        <li>
          <strong>Cursor</strong> —{" "}
          <a href="https://cursor.com" target="_blank" rel="noopener noreferrer">
            cursor.com
          </a>{" "}
          ({fr ? "macOS, Windows, Linux" : "macOS, Windows, Linux"})
        </li>
      </ul>

      <h2 id="install">{fr ? "Installation" : "Install"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Ouvrez les réglages MCP"
              : "Open MCP settings"
          }
        >
          <p>
            {fr ? (
              <>
                Deux options : interface graphique (Cursor →{" "}
                <strong>Settings → Features → MCP Servers → Add new server</strong>) ou
                édition directe du fichier JSON.
              </>
            ) : (
              <>
                Two options: GUI (Cursor →{" "}
                <strong>Settings → Features → MCP Servers → Add new server</strong>) or
                edit the JSON file directly.
              </>
            )}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Collez la configuration"
              : "Paste the configuration"
          }
        >
          <Tabs
            tabs={[
              {
                label: fr ? "Globale" : "Global",
                content: (
                  <div className="p-5">
                    <p className="mb-3 text-[14px] text-navy-50/75">
                      {fr ? (
                        <>
                          Éditez <code>~/.cursor/mcp.json</code> (créez le fichier s’il
                          n’existe pas). S’applique à tous les projets.
                        </>
                      ) : (
                        <>
                          Edit <code>~/.cursor/mcp.json</code> (create the file if
                          missing). Applies to all projects.
                        </>
                      )}
                    </p>
                    <CodeBlock
                      code={CURSOR_CONFIG}
                      language="json"
                      filename="~/.cursor/mcp.json"
                    />
                  </div>
                ),
              },
              {
                label: fr ? "Par projet" : "Per project",
                content: (
                  <div className="p-5">
                    <p className="mb-3 text-[14px] text-navy-50/75">
                      {fr ? (
                        <>
                          Créez <code>.cursor/mcp.json</code> à la racine du repo.
                          Versionnable, partageable avec l’équipe.
                        </>
                      ) : (
                        <>
                          Create <code>.cursor/mcp.json</code> at the repo root.
                          Commit it to share with the team.
                        </>
                      )}
                    </p>
                    <CodeBlock
                      code={CURSOR_PROJECT_CONFIG}
                      language="json"
                      filename=".cursor/mcp.json"
                    />
                  </div>
                ),
              },
            ]}
          />
        </Step>
        <Step
          title={
            fr
              ? "Activez le serveur dans les réglages"
              : "Enable the server in settings"
          }
        >
          <p>
            {fr
              ? "Settings → Features → MCP Servers : basculez le toggle acf sur ON. Cursor démarre le process et liste les outils détectés."
              : "Settings → Features → MCP Servers: toggle acf to ON. Cursor spawns the process and lists the detected tools."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Rechargez Cursor"
              : "Reload Cursor"
          }
        >
          <p>
            {fr
              ? "Cmd/Ctrl+Shift+P → « Developer: Reload Window » suffit. Pas besoin de quitter l’app."
              : "Cmd/Ctrl+Shift+P → “Developer: Reload Window” is enough. No need to quit the app."}
          </p>
        </Step>
      </Steps>

      <h2 id="verify">{fr ? "Vérifier" : "Verify"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Vérifiez la liste d’outils"
              : "Check the tool list"
          }
        >
          <p>
            {fr
              ? "Settings → MCP Servers : l’entrée acf doit afficher un point vert et le nombre d’outils détectés (13 attendus)."
              : "Settings → MCP Servers: the acf entry should show a green dot and the detected tool count (13 expected)."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Prompt de test dans le chat de l’agent"
              : "Test prompt in the agent chat"
          }
        >
          <p>
            {fr
              ? "Ouvrez le chat agent (Cmd/Ctrl+L), passez en mode Agent et tapez :"
              : "Open the agent chat (Cmd/Ctrl+L), switch to Agent mode, then type:"}{" "}
            <em>
              {fr
                ? "« Utilise acf.advisor pour évaluer la gouvernance d’un agent qui qualifie des leads B2B »"
                : "“Use acf.advisor to assess governance of a B2B lead-qualification agent”"}
            </em>
            .
          </p>
          <p>
            {fr
              ? "L’agent doit appeler l’outil et retourner une réponse signée (doctrine_hash, doctrine_signature, generated_at)."
              : "The agent must call the tool and return a signed reply (doctrine_hash, doctrine_signature, generated_at)."}
          </p>
        </Step>
      </Steps>

      <h2 id="advanced-config">{fr ? "Configuration avancée" : "Advanced config"}</h2>
      <h3 id="http-transport">{fr ? "Transport HTTP" : "HTTP transport"}</h3>
      <p>
        {fr
          ? "Cursor accepte un endpoint HTTP distant. Utile pour mutualiser acf-mcp côté serveur ou enforcer une clé API par utilisateur."
          : "Cursor accepts a remote HTTP endpoint. Useful to share acf-mcp server-side or enforce a per-user API key."}
      </p>
      <CodeBlock
        code={CURSOR_HTTP_CONFIG}
        language="json"
        filename="~/.cursor/mcp.json"
      />
      <p>
        {fr ? (
          <>
            Voir <a href="/fr/docs/authentication">/docs/authentication</a> pour déployer
            acf-mcp en HTTP avec authentification par clé.
          </>
        ) : (
          <>
            See <a href="/docs/authentication">/docs/authentication</a> for deploying
            acf-mcp over HTTP with API-key auth.
          </>
        )}
      </p>

      <h3 id="approval">{fr ? "Auto-approbation" : "Auto-approval"}</h3>
      <p>
        {fr
          ? "Par défaut Cursor demande approbation à chaque appel d’outil. Settings → Features → MCP → cochez les outils acf à auto-approuver. Tous les outils ACF sont déterministes et read-only côté agent : pas de risque d’effet de bord."
          : "Cursor asks for approval on every tool call by default. Settings → Features → MCP → check the acf tools you want to auto-approve. All ACF tools are deterministic and side-effect-free: no risk of write operations."}
      </p>

      <h2 id="troubleshooting">{fr ? "Dépannage" : "Troubleshooting"}</h2>
      <ul>
        <li>
          <strong>
            {fr ? "Point rouge à côté d’acf." : "Red dot next to acf."}
          </strong>{" "}
          {fr
            ? "Cliquez dessus pour ouvrir les logs du serveur. Cause la plus fréquente : Node introuvable ou JSON malformé."
            : "Click it to open server logs. Most common cause: Node not found or malformed JSON."}
        </li>
        <li>
          <strong>
            {fr ? "L’agent n’affiche pas les outils MCP." : "Agent does not list MCP tools."}
          </strong>{" "}
          {fr
            ? "Vérifiez que vous êtes en mode Agent (pas Chat). Le mode Chat ignore les outils MCP."
            : "Check you are in Agent mode (not Chat). Chat mode ignores MCP tools."}
        </li>
        <li>
          <strong>
            {fr ? "Conflit avec .cursor/mcp.json projet." : "Conflict with project .cursor/mcp.json."}
          </strong>{" "}
          {fr
            ? "La config projet écrase la config globale pour les serveurs portant le même nom. Renommez l’entrée (acf-local, acf-prod) si vous voulez les deux."
            : "Project config overrides global for same-named servers. Rename the entry (acf-local, acf-prod) if you need both."}
        </li>
        <li>
          <strong>
            {fr ? "Cursor sur Windows ne trouve pas npx." : "Cursor on Windows cannot find npx."}
          </strong>{" "}
          {fr ? (
            <>
              Remplacez <code>npx</code> par <code>npx.cmd</code> dans la clé{" "}
              <code>command</code>.
            </>
          ) : (
            <>
              Replace <code>npx</code> with <code>npx.cmd</code> in the{" "}
              <code>command</code> key.
            </>
          )}
        </li>
        <li>
          <strong>
            {fr ? "Timeout au démarrage." : "Startup timeout."}
          </strong>{" "}
          {fr
            ? "Premier npx = téléchargement du paquet. Patientez ~10 s, rechargez la fenêtre. Les exécutions suivantes sont instantanées (cache npx)."
            : "First npx = package download. Wait ~10 s, reload window. Subsequent runs are instant (npx cache)."}
        </li>
      </ul>
    </DocsPage>
  );
}
