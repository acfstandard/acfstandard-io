import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Steps, Step } from "@/components/Steps";

const CONTINUE_CONFIG = `{
  "experimental": {
    "modelContextProtocolServer": {
      "transport": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "acf-mcp"]
      }
    }
  }
}`;

const CONTINUE_CONFIG_ENV = `{
  "experimental": {
    "modelContextProtocolServer": {
      "transport": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "acf-mcp"],
        "env": {
          "ACF_LOG_LEVEL": "info"
        }
      }
    }
  }
}`;

export default async function ContinuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="Continue"
      description={
        fr
          ? "Connectez acf-mcp à Continue, l’extension open-source d’assistant IA pour VS Code et JetBrains."
          : "Wire acf-mcp into Continue, the open-source AI assistant extension for VS Code and JetBrains."
      }
      badge="Integration"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Continue</strong> est un assistant IA open-source en extension VS
            Code et JetBrains. Le support MCP est <strong>expérimental</strong> et limité
            à <strong>un seul serveur MCP par configuration</strong> à date — choisissez
            acf-mcp s’il s’agit de votre principal serveur de gouvernance.
          </>
        ) : (
          <>
            <strong>Continue</strong> is an open-source AI assistant available as a VS
            Code and JetBrains extension. MCP support is <strong>experimental</strong> and
            limited to <strong>a single MCP server per configuration</strong> as of today —
            pick acf-mcp if it is your primary governance server.
          </>
        )}
      </Callout>

      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            La clé <code>experimental.modelContextProtocolServer</code> est susceptible de
            changer (singulier → pluriel) dans les futures versions de Continue. Vérifiez{" "}
            <a
              href="https://docs.continue.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              docs.continue.dev
            </a>{" "}
            avant migration majeure.
          </>
        ) : (
          <>
            The <code>experimental.modelContextProtocolServer</code> key may change
            (singular → plural) in future Continue releases. Check{" "}
            <a
              href="https://docs.continue.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              docs.continue.dev
            </a>{" "}
            before any major upgrade.
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
          <strong>Continue</strong> —{" "}
          <a
            href="https://www.continue.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            continue.dev
          </a>{" "}
          ({fr ? "extension VS Code ou JetBrains" : "VS Code or JetBrains extension"})
        </li>
      </ul>

      <h2 id="install">{fr ? "Installation" : "Install"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Ouvrez le fichier de configuration Continue"
              : "Open the Continue config file"
          }
        >
          <p>
            {fr ? (
              <>
                Le fichier vit dans <code>~/.continue/config.json</code> sur macOS/Linux
                et <code>%USERPROFILE%\.continue\config.json</code> sur Windows.
                Raccourci dans l’extension : icône engrenage en bas → « Open config.json ».
              </>
            ) : (
              <>
                The file lives at <code>~/.continue/config.json</code> on macOS/Linux and{" "}
                <code>%USERPROFILE%\.continue\config.json</code> on Windows. Shortcut in
                the extension: gear icon at the bottom → “Open config.json”.
              </>
            )}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Ajoutez le bloc experimental.modelContextProtocolServer"
              : "Add the experimental.modelContextProtocolServer block"
          }
        >
          <p>
            {fr
              ? "Fusionnez avec votre configuration existante. Ne remplacez PAS tout le fichier."
              : "Merge with your existing config. Do NOT replace the whole file."}
          </p>
          <CodeBlock
            code={CONTINUE_CONFIG}
            language="json"
            filename="~/.continue/config.json"
          />
        </Step>
        <Step
          title={
            fr
              ? "Rechargez Continue"
              : "Reload Continue"
          }
        >
          <p>
            {fr
              ? "Cmd/Ctrl+Shift+P → « Continue: Reload Window » dans VS Code. Dans JetBrains, basculez la sidebar Continue OFF puis ON."
              : "Cmd/Ctrl+Shift+P → “Continue: Reload Window” in VS Code. In JetBrains, toggle the Continue sidebar OFF then ON."}
          </p>
        </Step>
      </Steps>

      <h2 id="verify">{fr ? "Vérifier" : "Verify"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Vérifiez que les outils sont disponibles"
              : "Check the tools are available"
          }
        >
          <p>
            {fr
              ? "Dans la sidebar Continue, tapez @ : les outils MCP du serveur acf doivent apparaître dans la liste contextuelle."
              : "In the Continue sidebar, type @: the acf server’s MCP tools should appear in the context picker."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Prompt de test"
              : "Test prompt"
          }
        >
          <p>
            {fr ? "Tapez :" : "Type:"}{" "}
            <em>
              {fr
                ? "« Utilise acf.advisor pour évaluer la gouvernance d’un agent qui qualifie des leads B2B »"
                : "“Use acf.advisor to assess governance of a B2B lead-qualification agent”"}
            </em>
            .
          </p>
          <p>
            {fr
              ? "La réponse de Continue doit citer la sortie de l’outil avec le footer signé (doctrine_hash, doctrine_signature, generated_at)."
              : "Continue’s reply must cite the tool output with the signed footer (doctrine_hash, doctrine_signature, generated_at)."}
          </p>
        </Step>
      </Steps>

      <h2 id="advanced-config">{fr ? "Configuration avancée" : "Advanced config"}</h2>
      <h3 id="env-vars">{fr ? "Variables d’environnement" : "Environment variables"}</h3>
      <CodeBlock
        code={CONTINUE_CONFIG_ENV}
        language="json"
        filename="~/.continue/config.json"
      />

      <h3 id="single-server">
        {fr ? "Limite à un seul serveur MCP" : "Single MCP server limit"}
      </h3>
      <p>
        {fr
          ? "Si vous avez besoin de plusieurs serveurs MCP en parallèle, restez sur Cursor, Windsurf ou Claude Desktop qui supportent un dictionnaire mcpServers. Continue contournera cette limite dans une release future."
          : "If you need multiple MCP servers in parallel, stick with Cursor, Windsurf or Claude Desktop which support an mcpServers dictionary. Continue will lift this limit in a future release."}
      </p>

      <h3 id="transport">{fr ? "Transport" : "Transport"}</h3>
      <p>
        {fr
          ? "Continue supporte stdio (transport.type = stdio) ou des transports custom selon la version. Pour la stabilité, gardez stdio sauf si vous avez impérativement besoin d’un endpoint distant."
          : "Continue supports stdio (transport.type = stdio) or custom transports depending on the version. For stability, keep stdio unless you absolutely need a remote endpoint."}
      </p>

      <h2 id="troubleshooting">{fr ? "Dépannage" : "Troubleshooting"}</h2>
      <ul>
        <li>
          <strong>
            {fr ? "@-mention n’affiche pas acf." : "@-mention does not show acf."}
          </strong>{" "}
          {fr
            ? "MCP est experimental → vérifiez la version Continue (≥ 0.9.x). Mettez à jour l’extension via le marketplace."
            : "MCP is experimental → check Continue version (≥ 0.9.x). Update the extension from the marketplace."}
        </li>
        <li>
          <strong>
            {fr ? "Erreur de parsing config.json." : "config.json parse error."}
          </strong>{" "}
          {fr
            ? "Continue n’accepte pas les commentaires JSON. Retirez tous les // et /* */."
            : "Continue does not accept JSON comments. Strip all // and /* */."}
        </li>
        <li>
          <strong>
            {fr ? "Le serveur démarre mais aucun outil n’est appelable." : "Server starts but no tool is callable."}
          </strong>{" "}
          {fr
            ? "Activez « tools » dans le mode utilisé (Chat → settings → Tools : ON). En mode autocomplete pur, MCP est ignoré."
            : "Enable “tools” in the current mode (Chat → settings → Tools: ON). Pure autocomplete mode ignores MCP."}
        </li>
        <li>
          <strong>
            {fr ? "Modèle local sans tool-use." : "Local model without tool-use."}
          </strong>{" "}
          {fr
            ? "Si vous utilisez un Llama/Mistral local sans support function-calling, MCP ne fonctionnera pas. Basculez sur Claude/GPT pour la conversation où vous voulez ACF."
            : "If you run a local Llama/Mistral without function-calling support, MCP won’t fire. Switch to Claude/GPT for the conversation where you want ACF."}
        </li>
        <li>
          <strong>
            {fr ? "Crash silencieux." : "Silent crash."}
          </strong>{" "}
          {fr ? (
            <>
              Ouvrez la Developer Console de VS Code (Help → Toggle Developer Tools) →
              onglet Console. Les erreurs MCP de Continue y sont loggées avec préfixe{" "}
              <code>[Continue MCP]</code>.
            </>
          ) : (
            <>
              Open VS Code Developer Console (Help → Toggle Developer Tools) → Console tab.
              Continue’s MCP errors land there with the <code>[Continue MCP]</code> prefix.
            </>
          )}
        </li>
      </ul>
    </DocsPage>
  );
}
