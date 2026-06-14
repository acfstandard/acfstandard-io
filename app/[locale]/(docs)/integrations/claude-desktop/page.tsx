import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Steps, Step } from "@/components/Steps";
import { Tabs } from "@/components/Tabs";

const CLAUDE_DESKTOP_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`;

const CLAUDE_DESKTOP_CONFIG_ENV = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"],
      "env": {
        "ACF_LOG_LEVEL": "info"
      }
    }
  }
}`;

const TAIL_LOGS_MAC = `tail -f ~/Library/Logs/Claude/mcp*.log`;
const TAIL_LOGS_WIN = `Get-Content -Path "$env:APPDATA\\Claude\\logs\\mcp*.log" -Wait`;

export default async function ClaudeDesktopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="Claude Desktop"
      description={
        fr
          ? "Branchez acf-mcp à Claude Desktop en une minute. Configuration locale via stdio, aucune clé API requise."
          : "Wire acf-mcp into Claude Desktop in under a minute. Local stdio config, no API key required."
      }
      badge="Integration"
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>Claude Desktop</strong> est l’application bureau officielle d’Anthropic
            (macOS et Windows). Elle supporte nativement MCP via un fichier JSON local.
            <code>acf-mcp</code> y tourne en <strong>stdio</strong> : Claude le démarre
            lui-même via <code>npx</code>, aucune route HTTP à provisionner.
          </>
        ) : (
          <>
            <strong>Claude Desktop</strong> is Anthropic’s official desktop app (macOS and
            Windows). It supports MCP natively through a local JSON file.
            <code>acf-mcp</code> runs there over <strong>stdio</strong>: Claude spawns it
            for you via <code>npx</code>, no HTTP endpoint to provision.
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
          <strong>Claude Desktop</strong> —{" "}
          <a
            href="https://claude.ai/download"
            target="_blank"
            rel="noopener noreferrer"
          >
            claude.ai/download
          </a>{" "}
          ({fr ? "macOS ou Windows" : "macOS or Windows"})
        </li>
      </ul>

      <h2 id="install">{fr ? "Installation" : "Install"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Ouvrez le fichier de configuration"
              : "Open the config file"
          }
        >
          <p>
            {fr
              ? "Le fichier est créé au premier lancement. S’il n’existe pas, créez-le."
              : "The file is created on first launch. If it’s missing, create it."}
          </p>
          <Tabs
            tabs={[
              {
                label: "macOS",
                content: (
                  <div className="p-5">
                    <CodeBlock
                      code="~/Library/Application Support/Claude/claude_desktop_config.json"
                      language="bash"
                    />
                    <p className="mt-3 text-[14px] text-navy-50/75">
                      {fr
                        ? "Raccourci dans l’app : Claude → Settings → Developer → Edit Config."
                        : "Shortcut in-app: Claude → Settings → Developer → Edit Config."}
                    </p>
                  </div>
                ),
              },
              {
                label: "Windows",
                content: (
                  <div className="p-5">
                    <CodeBlock
                      code="%APPDATA%\\Claude\\claude_desktop_config.json"
                      language="powershell"
                    />
                    <p className="mt-3 text-[14px] text-navy-50/75">
                      {fr
                        ? "Raccourci : File → Settings → Developer → Edit Config."
                        : "Shortcut: File → Settings → Developer → Edit Config."}
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </Step>
        <Step
          title={
            fr
              ? "Collez le bloc de configuration"
              : "Paste the configuration block"
          }
        >
          <p>
            {fr
              ? "Si le fichier contient déjà des serveurs MCP, ajoutez l’entrée acf à l’objet mcpServers existant."
              : "If the file already has MCP servers, add the acf entry to the existing mcpServers object."}
          </p>
          <CodeBlock
            code={CLAUDE_DESKTOP_CONFIG}
            language="json"
            filename="claude_desktop_config.json"
          />
        </Step>
        <Step
          title={
            fr
              ? "Quittez et relancez Claude Desktop"
              : "Quit and relaunch Claude Desktop"
          }
        >
          <p>
            {fr
              ? "Cmd+Q sur macOS, fermer toutes les fenêtres puis quitter via la barre des tâches sur Windows. Un simple rafraîchissement de fenêtre ne recharge pas la config MCP."
              : "Cmd+Q on macOS, close all windows then quit via the system tray on Windows. A window refresh does not reload the MCP config."}
          </p>
        </Step>
      </Steps>

      <h2 id="verify">{fr ? "Vérifier" : "Verify"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Cherchez l’icône MCP en bas du chat"
              : "Look for the MCP icon at the bottom of the chat"
          }
        >
          <p>
            {fr
              ? "Une petite icône marteau/outil apparaît sous la zone de saisie. Cliquez dessus : vous devez voir acf listé avec ses outils (acf.advisor, acf.search, etc.)."
              : "A small hammer/tool icon appears under the input box. Click it: you should see acf listed with its tools (acf.advisor, acf.search, etc)."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Demandez une preuve de vie signée"
              : "Ask for a signed smoke test"
          }
        >
          <p>
            {fr
              ? "Tapez :"
              : "Type:"}{" "}
            <em>
              {fr
                ? "« Utilise acf.advisor pour évaluer la gouvernance d’un agent qui qualifie des leads B2B »"
                : "“Use acf.advisor to assess governance of a B2B lead-qualification agent”"}
            </em>
            .
          </p>
          <p>
            {fr
              ? "La réponse doit contenir un footer signé avec doctrine_hash, doctrine_signature et generated_at."
              : "The reply must contain a signed footer with doctrine_hash, doctrine_signature and generated_at."}
          </p>
        </Step>
      </Steps>

      <h2 id="advanced-config">{fr ? "Configuration avancée" : "Advanced config"}</h2>
      <h3 id="env-vars">{fr ? "Variables d’environnement" : "Environment variables"}</h3>
      <p>
        {fr
          ? "Passez des variables via le champ env. Toutes sont optionnelles."
          : "Pass variables through the env field. All optional."}
      </p>
      <CodeBlock
        code={CLAUDE_DESKTOP_CONFIG_ENV}
        language="json"
        filename="claude_desktop_config.json"
      />
      <ul>
        <li>
          <code>ACF_LOG_LEVEL</code> —{" "}
          {fr
            ? "verbosité des logs (debug | info | warn | error). Par défaut info."
            : "log verbosity (debug | info | warn | error). Defaults to info."}
        </li>
      </ul>

      <h3 id="transport">{fr ? "Transport" : "Transport"}</h3>
      <p>
        {fr
          ? "Claude Desktop ne supporte que le transport stdio. Pour HTTP (multi-utilisateurs, auth API key), déployez acf-mcp derrière un proxy et utilisez un autre client (Cursor, Continue) — voir "
          : "Claude Desktop only supports stdio transport. For HTTP (multi-user, API-key auth), deploy acf-mcp behind a proxy and use another client (Cursor, Continue) — see "}
        <a href={fr ? "/fr/docs/authentication" : "/docs/authentication"}>
          /docs/authentication
        </a>
        .
      </p>

      <h2 id="troubleshooting">{fr ? "Dépannage" : "Troubleshooting"}</h2>
      <ul>
        <li>
          <strong>
            {fr ? "L’icône MCP n’apparaît pas." : "MCP icon does not appear."}
          </strong>{" "}
          {fr
            ? "Le JSON est invalide. Validez-le avec jq ou un linter ; une virgule manquante suffit à désactiver TOUS les serveurs MCP silencieusement."
            : "The JSON is invalid. Lint it with jq or any validator; a missing comma silently disables ALL MCP servers."}
        </li>
        <li>
          <strong>
            {fr ? "« Server disconnected » dans Developer logs." : "“Server disconnected” in Developer logs."}
          </strong>{" "}
          {fr
            ? "npx ne trouve pas Node. Sur macOS, lancez Claude depuis le Finder (pas depuis un terminal qui modifie PATH) et vérifiez que /usr/local/bin/node existe."
            : "npx cannot find Node. On macOS, launch Claude from Finder (not from a terminal that overrides PATH) and check that /usr/local/bin/node exists."}
        </li>
        <li>
          <strong>
            {fr ? "Tail des logs MCP." : "Tail the MCP logs."}
          </strong>{" "}
          {fr ? "macOS :" : "macOS:"}
          <CodeBlock code={TAIL_LOGS_MAC} language="bash" />
          {fr ? "Windows :" : "Windows:"}
          <CodeBlock code={TAIL_LOGS_WIN} language="powershell" />
        </li>
        <li>
          <strong>
            {fr ? "L’agent ignore l’outil." : "The agent ignores the tool."}
          </strong>{" "}
          {fr
            ? "Nommez explicitement l’outil dans le prompt (« utilise acf.advisor… »). Claude choisit ses outils ; il faut parfois l’y inviter au premier essai."
            : "Name the tool explicitly in the prompt (“use acf.advisor…”). Claude picks its tools; sometimes it needs a nudge on the first try."}
        </li>
        <li>
          <strong>
            {fr ? "Première exécution lente." : "First run is slow."}
          </strong>{" "}
          {fr
            ? "npx télécharge le paquet la première fois (~3–10 s). Les exécutions suivantes utilisent le cache."
            : "npx downloads the package on first run (~3–10 s). Subsequent runs hit the cache."}
        </li>
      </ul>
    </DocsPage>
  );
}
