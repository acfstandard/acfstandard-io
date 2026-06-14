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

const CURSOR_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`;

const WINDSURF_CONFIG = `{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`;

const CONTINUE_CONFIG = `{
  "experimental": {
    "modelContextProtocolServer": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`;

const VERIFY_CMD = `# Verify the server is reachable
npx -y acf-mcp --version`;

export default async function QuickstartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Démarrage rapide" : "Quickstart"}
      description={
        fr
          ? "Installez acf-mcp dans votre client IA en 30 secondes. Aucune clé API, aucun compte, aucun service distant : tout tourne en local via npx."
          : "Install acf-mcp in your AI client in 30 seconds. No API key, no account, no remote service — everything runs locally via npx."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <code>acf-mcp</code> est un <strong>serveur local stdio</strong> : votre
            client IA le lance à la demande via <code>npx</code>. Pas de proxy, pas de
            point d’entrée HTTP à provisionner, pas de variables d’environnement
            obligatoires. Si vous voulez un endpoint MCP-over-HTTP (multi-utilisateurs,
            authentification par clé), voyez la page <code>/docs/authentication</code>.
          </>
        ) : (
          <>
            <code>acf-mcp</code> is a <strong>local stdio server</strong>: your AI
            client launches it on demand via <code>npx</code>. No proxy, no HTTP entry
            point to provision, no required environment variables. If you want an
            MCP-over-HTTP endpoint (multi-user, API-key authenticated), see the{" "}
            <code>/docs/authentication</code> page.
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
          {fr ? "Un client MCP compatible :" : "An MCP-compatible client:"} Claude
          Desktop, Cursor, Windsurf, Continue, Zed,{" "}
          {fr ? "ou tout autre client implémentant le MCP" : "or any other client implementing MCP"}
        </li>
      </ul>

      <h2 id="install">{fr ? "Installation" : "Installation"}</h2>
      <p>
        {fr
          ? "Choisissez votre client ci-dessous et copiez le bloc de configuration."
          : "Pick your client below and copy the configuration block."}
      </p>

      <Tabs
        tabs={[
          {
            label: "Claude Desktop",
            content: (
              <div className="p-5">
                <p className="mb-3 text-[14px] text-navy-50/75">
                  {fr ? (
                    <>
                      Ouvrez <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) ou{" "}
                      <code>%APPDATA%\Claude\claude_desktop_config.json</code> (Windows) et ajoutez :
                    </>
                  ) : (
                    <>
                      Open <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) or{" "}
                      <code>%APPDATA%\Claude\claude_desktop_config.json</code> (Windows) and add:
                    </>
                  )}
                </p>
                <CodeBlock
                  code={CLAUDE_DESKTOP_CONFIG}
                  language="json"
                  filename="claude_desktop_config.json"
                />
              </div>
            ),
          },
          {
            label: "Cursor",
            content: (
              <div className="p-5">
                <p className="mb-3 text-[14px] text-navy-50/75">
                  {fr ? (
                    <>
                      Cursor → <strong>Settings → Features → MCP Servers</strong> →{" "}
                      <strong>Add new server</strong>, ou éditez <code>~/.cursor/mcp.json</code> :
                    </>
                  ) : (
                    <>
                      Cursor → <strong>Settings → Features → MCP Servers</strong> →{" "}
                      <strong>Add new server</strong>, or edit <code>~/.cursor/mcp.json</code>:
                    </>
                  )}
                </p>
                <CodeBlock code={CURSOR_CONFIG} language="json" filename="~/.cursor/mcp.json" />
              </div>
            ),
          },
          {
            label: "Windsurf",
            content: (
              <div className="p-5">
                <p className="mb-3 text-[14px] text-navy-50/75">
                  {fr ? (
                    <>
                      Windsurf → <strong>Cascade → Settings → MCP Servers</strong> → ajoutez
                      le bloc ci-dessous à <code>~/.codeium/windsurf/mcp_config.json</code> :
                    </>
                  ) : (
                    <>
                      Windsurf → <strong>Cascade → Settings → MCP Servers</strong> → add the
                      block below to <code>~/.codeium/windsurf/mcp_config.json</code>:
                    </>
                  )}
                </p>
                <CodeBlock
                  code={WINDSURF_CONFIG}
                  language="json"
                  filename="mcp_config.json"
                />
              </div>
            ),
          },
          {
            label: "Continue",
            content: (
              <div className="p-5">
                <p className="mb-3 text-[14px] text-navy-50/75">
                  {fr ? (
                    <>
                      Éditez <code>~/.continue/config.json</code> et ajoutez :
                    </>
                  ) : (
                    <>
                      Edit <code>~/.continue/config.json</code> and add:
                    </>
                  )}
                </p>
                <CodeBlock code={CONTINUE_CONFIG} language="json" filename="config.json" />
              </div>
            ),
          },
        ]}
      />

      <h2 id="verify">{fr ? "Vérifier l’installation" : "Verify the install"}</h2>
      <Steps>
        <Step
          title={
            fr
              ? "Redémarrez votre client IA"
              : "Restart your AI client"
          }
        >
          <p>
            {fr
              ? "Quittez complètement Claude Desktop / Cursor / Windsurf / Continue (Cmd+Q sur macOS, fermer toutes les fenêtres sur Windows) puis relancez-le."
              : "Fully quit Claude Desktop / Cursor / Windsurf / Continue (Cmd+Q on macOS, close all windows on Windows), then relaunch it."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Demandez à votre agent une preuve de vie"
              : "Ask your agent for a smoke test"
          }
        >
          <p>
            {fr
              ? "Tapez dans le chat :"
              : "Type into the chat:"}{" "}
            <em>
              {fr
                ? "« Utilise l’outil acf.advisor pour me donner trois conseils de gouvernance pour un agent qui qualifie des leads B2B »"
                : "“Use the acf.advisor tool to give me three governance tips for an agent that qualifies B2B leads”"}
            </em>
            .
          </p>
          <p>
            {fr
              ? "Votre agent doit appeler l’outil, recevoir une réponse signée (avec doctrine_hash, doctrine_signature, generated_at) et la formuler en langage naturel."
              : "Your agent should call the tool, receive a signed reply (with doctrine_hash, doctrine_signature, generated_at), and rephrase it in natural language."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "(Optionnel) Vérifiez la version du serveur en CLI"
              : "(Optional) Check the server version from CLI"
          }
        >
          <CodeBlock code={VERIFY_CMD} language="bash" />
        </Step>
      </Steps>

      <h2 id="whats-next">{fr ? "Et après ?" : "What's next?"}</h2>
      <ul>
        <li>
          <a href={fr ? "/fr/tools" : "/tools"}>
            {fr ? "Explorez les 13 outils MCP" : "Explore the 13 MCP tools"}
          </a>{" "}
          —{" "}
          {fr
            ? "8 REASON (raisonnement déterministe signé) + 5 READ (lecture des ressources)."
            : "8 REASON (deterministic signed reasoning) + 5 READ (resource lookup)."}
        </li>
        <li>
          <a href={fr ? "/fr/docs/architecture" : "/docs/architecture"}>
            {fr ? "Comprenez l’architecture" : "Understand the architecture"}
          </a>{" "}
          —{" "}
          {fr
            ? "comment chaque outil produit une sortie déterministe et signée sans appel LLM interne."
            : "how each tool produces deterministic, signed output without an internal LLM call."}
        </li>
        <li>
          <a href={fr ? "/fr/signatures" : "/signatures"}>
            {fr ? "Vérifiez la signature de doctrine" : "Verify the doctrine signature"}
          </a>{" "}
          —{" "}
          {fr
            ? "épinglez la clé publique Ed25519 et vérifiez chaque réponse hors-ligne."
            : "pin the Ed25519 public key and verify every reply offline."}
        </li>
      </ul>
    </DocsPage>
  );
}
