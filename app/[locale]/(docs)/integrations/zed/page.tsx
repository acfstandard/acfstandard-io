import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Steps, Step } from "@/components/Steps";
import { Tabs } from "@/components/Tabs";

const ZED_CONFIG = `{
  "context_servers": {
    "acf": {
      "command": {
        "path": "npx",
        "args": ["-y", "acf-mcp"]
      }
    }
  }
}`;

const ZED_CONFIG_ENV = `{
  "context_servers": {
    "acf": {
      "command": {
        "path": "npx",
        "args": ["-y", "acf-mcp"],
        "env": {
          "ACF_LOG_LEVEL": "info"
        }
      }
    }
  }
}`;

export default async function ZedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="Zed"
      description={
        fr
          ? "Branchez acf-mcp à Zed via le système context_servers. Configuration minimaliste, alignée sur la philosophie de l’éditeur."
          : "Wire acf-mcp into Zed through the context_servers system. Minimal config, aligned with the editor’s philosophy."
      }
      badge="Integration"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Zed</strong> est un éditeur natif (Rust) avec un agent intégré.
            Depuis fin 2025, il supporte MCP via la clé <code>context_servers</code> du
            fichier <code>~/.config/zed/settings.json</code> (macOS/Linux) ou{" "}
            <code>%APPDATA%\Zed\settings.json</code> (Windows). Le mappage interne traduit{" "}
            <code>context_servers</code> en serveurs MCP — la sémantique est identique.
          </>
        ) : (
          <>
            <strong>Zed</strong> is a native (Rust) editor with a built-in agent. Since
            late 2025 it supports MCP through the <code>context_servers</code> key of{" "}
            <code>~/.config/zed/settings.json</code> (macOS/Linux) or{" "}
            <code>%APPDATA%\Zed\settings.json</code> (Windows). Internally{" "}
            <code>context_servers</code> maps to MCP servers — the semantics are
            identical.
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
          <strong>Zed</strong> —{" "}
          <a href="https://zed.dev" target="_blank" rel="noopener noreferrer">
            zed.dev
          </a>{" "}
          ({fr ? "macOS, Linux, preview Windows" : "macOS, Linux, Windows preview"})
        </li>
      </ul>

      <h2 id="install">{fr ? "Installation" : "Install"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Ouvrez settings.json"
              : "Open settings.json"
          }
        >
          <p>
            {fr
              ? "Cmd/Ctrl+, (virgule) ouvre les réglages. Cliquez sur le lien « Open settings.json » en haut."
              : "Cmd/Ctrl+, (comma) opens settings. Click the “Open settings.json” link at the top."}
          </p>
          <Tabs
            tabs={[
              {
                label: "macOS / Linux",
                content: (
                  <div className="p-5">
                    <CodeBlock
                      code="~/.config/zed/settings.json"
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
                      code="%APPDATA%\\Zed\\settings.json"
                      language="powershell"
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
              ? "Ajoutez le bloc context_servers"
              : "Add the context_servers block"
          }
        >
          <p>
            {fr
              ? "Fusionnez avec vos réglages existants. La forme est { command: { path, args, env? } } — pas { command: \"npx\", args: [...] } comme dans Cursor/Claude Desktop."
              : "Merge with your existing settings. Shape is { command: { path, args, env? } } — not { command: \"npx\", args: [...] } as in Cursor/Claude Desktop."}
          </p>
          <CodeBlock code={ZED_CONFIG} language="json" filename="settings.json" />
        </Step>
        <Step
          title={
            fr
              ? "Rechargez le projet"
              : "Reload the project"
          }
        >
          <p>
            {fr
              ? "Zed recharge settings.json à chaque sauvegarde. Si l’Assistant Panel ne voit pas le serveur, faites Cmd/Ctrl+Shift+P → « workspace: reload »."
              : "Zed reloads settings.json on save. If the Assistant Panel does not see the server, run Cmd/Ctrl+Shift+P → “workspace: reload”."}
          </p>
        </Step>
      </Steps>

      <h2 id="verify">{fr ? "Vérifier" : "Verify"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Ouvrez l’Assistant Panel"
              : "Open the Assistant Panel"
          }
        >
          <p>
            {fr
              ? "Cmd/Ctrl+? (ou icône étincelle dans la barre latérale). Tapez / pour voir les slash commands : les outils acf doivent y figurer en tant que /acf.advisor, /acf.search, etc."
              : "Cmd/Ctrl+? (or sparkle icon in the sidebar). Type / to see the slash commands: acf tools should be there as /acf.advisor, /acf.search, etc."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Smoke test"
              : "Smoke test"
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
              ? "La réponse insérée par l’assistant doit contenir le footer signé (doctrine_hash, doctrine_signature, generated_at) — Zed n’altère pas la sortie de l’outil."
              : "The assistant’s inserted reply must contain the signed footer (doctrine_hash, doctrine_signature, generated_at) — Zed does not alter the tool output."}
          </p>
        </Step>
      </Steps>

      <h2 id="advanced-config">{fr ? "Configuration avancée" : "Advanced config"}</h2>
      <h3 id="env-vars">{fr ? "Variables d’environnement" : "Environment variables"}</h3>
      <CodeBlock
        code={ZED_CONFIG_ENV}
        language="json"
        filename="settings.json"
      />

      <h3 id="transport">{fr ? "Transport" : "Transport"}</h3>
      <p>
        {fr
          ? "Zed ne supporte que le transport stdio pour les context_servers à date. Pour HTTP, utilisez un autre client ou attendez la stabilisation MCP côté Zed."
          : "Zed only supports the stdio transport for context_servers today. For HTTP, use another client or wait for the MCP stabilization in Zed."}
      </p>

      <h3 id="slash-commands">{fr ? "Slash commands" : "Slash commands"}</h3>
      <p>
        {fr
          ? "Zed expose chaque outil MCP comme slash command dans l’Assistant Panel. C’est la façon idiomatique de les invoquer en raccourci : tapez /acf et complétez."
          : "Zed exposes each MCP tool as a slash command in the Assistant Panel. That’s the idiomatic shortcut: type /acf and tab-complete."}
      </p>

      <h2 id="troubleshooting">{fr ? "Dépannage" : "Troubleshooting"}</h2>
      <ul>
        <li>
          <strong>
            {fr ? "Schéma command incorrect." : "Wrong command schema."}
          </strong>{" "}
          {fr ? (
            <>
              Erreur la plus fréquente. Zed exige <code>command: {`{ path, args }`}</code>{" "}
              imbriqué, pas <code>command: \"npx\", args: [...]</code> au même niveau.
            </>
          ) : (
            <>
              Most frequent mistake. Zed requires nested{" "}
              <code>command: {`{ path, args }`}</code>, not{" "}
              <code>command: \"npx\", args: [...]</code> at the same level.
            </>
          )}
        </li>
        <li>
          <strong>
            {fr ? "Slash command absente." : "Slash command missing."}
          </strong>{" "}
          {fr
            ? "Le serveur est probablement démarré mais sans outils. Reloadez la fenêtre. Si le problème persiste, lancez `zed --foreground` dans un terminal pour voir les logs en clair."
            : "Server is likely started but tool-less. Reload the window. If it persists, run `zed --foreground` from a terminal to see plain logs."}
        </li>
        <li>
          <strong>
            {fr ? "Zed ne lit pas la config." : "Zed does not pick up the config."}
          </strong>{" "}
          {fr
            ? "Vérifiez que vous éditez settings.json (réglages user) et pas project-settings.json. Les context_servers ne s’appliquent qu’au niveau user."
            : "Make sure you edit settings.json (user settings) and not project-settings.json. context_servers only apply at the user level."}
        </li>
        <li>
          <strong>
            {fr ? "JSON5 vs JSON strict." : "JSON5 vs strict JSON."}
          </strong>{" "}
          {fr
            ? "Zed accepte JSON5 (commentaires, trailing commas) — mais le parser est strict sur les chaînes échappées. Préférez un éditeur qui colore JSON5 pour éviter les pièges."
            : "Zed accepts JSON5 (comments, trailing commas) — but the parser is strict on escaped strings. Use a JSON5-aware editor to avoid pitfalls."}
        </li>
        <li>
          <strong>
            {fr ? "Modèle sans tool-use." : "Model without tool-use."}
          </strong>{" "}
          {fr
            ? "L’Assistant Panel doit être configuré sur un modèle qui supporte les outils (Claude Sonnet 4.5, GPT-4o). Les modèles legacy sans function-calling ignoreront acf-mcp."
            : "The Assistant Panel must run a tool-capable model (Claude Sonnet 4.5, GPT-4o). Legacy models without function-calling will ignore acf-mcp."}
        </li>
      </ul>
    </DocsPage>
  );
}
