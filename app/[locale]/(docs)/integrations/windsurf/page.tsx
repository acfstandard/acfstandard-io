import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Steps, Step } from "@/components/Steps";
import { Tabs } from "@/components/Tabs";

const WINDSURF_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`;

const WINDSURF_CONFIG_ENV = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"],
      "env": {
        "ACF_LOG_LEVEL": "debug"
      }
    }
  }
}`;

export default async function WindsurfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="Windsurf"
      description={
        fr
          ? "Connectez acf-mcp à Windsurf (Codeium) pour que Cascade dispose des outils de gouvernance ACF dans ses workflows agentiques."
          : "Connect acf-mcp to Windsurf (Codeium) so Cascade has ACF governance tools available in its agentic workflows."
      }
      badge="Integration"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Windsurf</strong> est l’IDE agentique de Codeium. Son agent intégré,{" "}
            <strong>Cascade</strong>, lit les serveurs MCP déclarés dans{" "}
            <code>~/.codeium/windsurf/mcp_config.json</code>. La configuration est
            globale (pas de fichier par projet à ce jour).
          </>
        ) : (
          <>
            <strong>Windsurf</strong> is Codeium’s agentic IDE. Its built-in agent,{" "}
            <strong>Cascade</strong>, reads MCP servers declared in{" "}
            <code>~/.codeium/windsurf/mcp_config.json</code>. The config is global
            (no per-project file today).
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
          <strong>Windsurf</strong> —{" "}
          <a href="https://windsurf.com" target="_blank" rel="noopener noreferrer">
            windsurf.com
          </a>{" "}
          ({fr ? "macOS, Windows, Linux" : "macOS, Windows, Linux"})
        </li>
      </ul>

      <h2 id="install">{fr ? "Installation" : "Install"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Ouvrez le panneau Cascade"
              : "Open the Cascade panel"
          }
        >
          <p>
            {fr
              ? "Cliquez sur l’icône Cascade dans la barre latérale, puis sur l’icône en haut à droite : Settings → MCP Servers."
              : "Click the Cascade icon in the sidebar, then the top-right icon: Settings → MCP Servers."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Éditez mcp_config.json"
              : "Edit mcp_config.json"
          }
        >
          <p>
            {fr
              ? "Le bouton « Add Server » ouvre le fichier JSON. Sinon, ouvrez-le directement :"
              : "The “Add Server” button opens the JSON file. Or open it directly:"}
          </p>
          <Tabs
            tabs={[
              {
                label: "macOS / Linux",
                content: (
                  <div className="p-5">
                    <CodeBlock
                      code="~/.codeium/windsurf/mcp_config.json"
                      language="bash"
                    />
                  </div>
                ),
              },
              {
                label: "Windows",
                content: (
                  <div className="p-5">
                    <CodeBlock
                      code="%USERPROFILE%\\.codeium\\windsurf\\mcp_config.json"
                      language="powershell"
                    />
                  </div>
                ),
              },
            ]}
          />
          <CodeBlock
            code={WINDSURF_CONFIG}
            language="json"
            filename="mcp_config.json"
          />
        </Step>
        <Step
          title={
            fr
              ? "Rafraîchissez les serveurs MCP"
              : "Refresh MCP servers"
          }
        >
          <p>
            {fr
              ? "Dans Cascade → Settings → MCP Servers, cliquez sur « Refresh ». Windsurf relit le fichier sans redémarrage."
              : "In Cascade → Settings → MCP Servers, click “Refresh”. Windsurf re-reads the file without a restart."}
          </p>
        </Step>
      </Steps>

      <h2 id="verify">{fr ? "Vérifier" : "Verify"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Confirmez que acf est listé"
              : "Confirm acf is listed"
          }
        >
          <p>
            {fr
              ? "Cascade → MCP Servers : l’entrée acf doit afficher 13 outils détectés (8 REASON + 5 READ)."
              : "Cascade → MCP Servers: the acf entry should show 13 detected tools (8 REASON + 5 READ)."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Lancez un prompt de test"
              : "Run a test prompt"
          }
        >
          <p>
            {fr
              ? "Dans la conversation Cascade, tapez :"
              : "In the Cascade conversation, type:"}{" "}
            <em>
              {fr
                ? "« Utilise acf.advisor pour évaluer la gouvernance d’un agent qui qualifie des leads B2B »"
                : "“Use acf.advisor to assess governance of a B2B lead-qualification agent”"}
            </em>
            .
          </p>
          <p>
            {fr
              ? "Cascade demande l’autorisation d’appeler l’outil, puis affiche la réponse signée (doctrine_hash, doctrine_signature, generated_at)."
              : "Cascade asks permission to call the tool, then displays the signed reply (doctrine_hash, doctrine_signature, generated_at)."}
          </p>
        </Step>
      </Steps>

      <h2 id="advanced-config">{fr ? "Configuration avancée" : "Advanced config"}</h2>
      <h3 id="env-vars">{fr ? "Variables d’environnement" : "Environment variables"}</h3>
      <CodeBlock
        code={WINDSURF_CONFIG_ENV}
        language="json"
        filename="mcp_config.json"
      />
      <p>
        {fr
          ? "Utile pour activer le mode debug pendant le premier branchement (logs verbeux dans la console Cascade)."
          : "Useful to enable debug mode during first wiring (verbose logs in the Cascade console)."}
      </p>

      <h3 id="transport">{fr ? "Transport" : "Transport"}</h3>
      <p>
        {fr
          ? "Windsurf supporte uniquement stdio à date. Pour un endpoint HTTP partagé en équipe, utilisez Cursor ou Continue côté client et déployez acf-mcp en HTTP — voir "
          : "Windsurf only supports stdio today. For a shared HTTP endpoint, use Cursor or Continue on the client side and deploy acf-mcp over HTTP — see "}
        <a href={fr ? "/fr/docs/authentication" : "/docs/authentication"}>
          /docs/authentication
        </a>
        .
      </p>

      <h3 id="cascade-rules">{fr ? "Cascade rules" : "Cascade rules"}</h3>
      <p>
        {fr ? (
          <>
            Ajoutez à votre <code>.windsurfrules</code> projet : « When the user asks
            about agent governance, compliance or AI-Act conformity, prefer calling
            acf.advisor before answering ». Cascade s’y conformera dans tous les
            workflows agentiques.
          </>
        ) : (
          <>
            Add this to your project <code>.windsurfrules</code>: “When the user asks
            about agent governance, compliance or AI-Act conformity, prefer calling
            acf.advisor before answering.” Cascade will follow it across agentic
            workflows.
          </>
        )}
      </p>

      <h2 id="troubleshooting">{fr ? "Dépannage" : "Troubleshooting"}</h2>
      <ul>
        <li>
          <strong>
            {fr ? "« 0 tools detected »." : "“0 tools detected”."}
          </strong>{" "}
          {fr
            ? "Le serveur a démarré mais a planté sur le handshake initial. Activez ACF_LOG_LEVEL=debug et cliquez Refresh pour voir l’erreur côté Cascade."
            : "Server started but crashed on the initial handshake. Set ACF_LOG_LEVEL=debug and click Refresh to see the error in Cascade."}
        </li>
        <li>
          <strong>
            {fr ? "Refresh sans effet." : "Refresh does nothing."}
          </strong>{" "}
          {fr
            ? "Sur certaines versions, un quit/relaunch complet de Windsurf reste nécessaire après modification du JSON."
            : "On some versions, a full quit/relaunch of Windsurf is still required after editing the JSON."}
        </li>
        <li>
          <strong>
            {fr ? "Permissions refusées en boucle." : "Permission prompts in a loop."}
          </strong>{" "}
          {fr
            ? "Activez « Always allow » pour acf dans les réglages Cascade. Tous les outils ACF sont read-only côté agent (pas de write filesystem, pas d’appel HTTP sortant)."
            : "Enable “Always allow” for acf in Cascade settings. All ACF tools are read-only from the agent’s side (no filesystem writes, no outbound HTTP)."}
        </li>
        <li>
          <strong>
            {fr ? "Erreur ENOENT npx." : "ENOENT npx error."}
          </strong>{" "}
          {fr ? (
            <>
              Cascade ne charge pas votre PATH shell. Mettez le chemin complet :{" "}
              <code>/usr/local/bin/npx</code> (macOS/Linux) ou{" "}
              <code>C:\Program Files\nodejs\npx.cmd</code> (Windows).
            </>
          ) : (
            <>
              Cascade does not inherit your shell PATH. Use the full path:{" "}
              <code>/usr/local/bin/npx</code> (macOS/Linux) or{" "}
              <code>C:\Program Files\nodejs\npx.cmd</code> (Windows).
            </>
          )}
        </li>
        <li>
          <strong>
            {fr ? "Modèle qui n’utilise pas les outils." : "Model not calling tools."}
          </strong>{" "}
          {fr
            ? "Certains modèles plus petits dans Cascade ignorent MCP. Basculez sur Claude Sonnet 4.5 ou GPT-4o dans les réglages Cascade."
            : "Some smaller models in Cascade ignore MCP. Switch to Claude Sonnet 4.5 or GPT-4o in Cascade settings."}
        </li>
      </ul>
    </DocsPage>
  );
}
