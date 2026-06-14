import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Tabs } from "@/components/Tabs";

const NODE_CLIENT = `import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "acf-mcp"],
  env: { ACF_LOCALE: "en" },
});

const client = new Client(
  { name: "my-app", version: "1.0.0" },
  { capabilities: {} },
);
await client.connect(transport);

// 1. Discover tools
const { tools } = await client.listTools();
console.log("available:", tools.map((t) => t.name));

// 2. Call a tool
const result = await client.callTool({
  name: "acf.advisor",
  arguments: { case_description: "We are building a recruiting agent..." },
});
console.log(result.content);

// 3. Read a resource
const wp = await client.readResource({ uri: "acf://whitepaper/fr" });
console.log(wp.contents[0].text.slice(0, 200));

await client.close();`;

const PYTHON_CLIENT = `from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import asyncio

async def main():
    params = StdioServerParameters(
        command="npx",
        args=["-y", "acf-mcp"],
        env={"ACF_LOCALE": "en"},
    )
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # 1. Discover tools
            tools = await session.list_tools()
            print([t.name for t in tools.tools])

            # 2. Call a tool
            result = await session.call_tool(
                "acf.advisor",
                arguments={"case_description": "We are building a recruiting agent..."},
            )
            print(result.content)

            # 3. Read a resource
            wp = await session.read_resource("acf://whitepaper/fr")
            print(wp.contents[0].text[:200])

asyncio.run(main())`;

export default async function CustomClientPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Client MCP custom" : "Custom MCP client"}
      description={
        fr
          ? "Si aucun client MCP de l’écosystème ne couvre votre cas — bot Slack, backend SaaS, automatisation interne — vous pouvez parler à acf-mcp directement avec le SDK officiel @modelcontextprotocol/sdk (Node, Python, Go en cours)."
          : "If no MCP client in the ecosystem fits your case — Slack bot, SaaS backend, internal automation — you can talk to acf-mcp directly using the official @modelcontextprotocol/sdk (Node, Python, Go in progress)."
      }
      badge={fr ? "Intégration" : "Integration"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr
          ? "acf-mcp parle le Model Context Protocol stable v2025-12-11. Vous pouvez utiliser n’importe quel client conforme, pas seulement le SDK officiel."
          : "acf-mcp speaks the stable Model Context Protocol v2025-12-11. You can use any compliant client, not just the official SDK."}
      </Callout>

      <h2 id="install">{fr ? "Installer le SDK" : "Install the SDK"}</h2>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: (
              <CodeBlock code="npm install @modelcontextprotocol/sdk" language="bash" />
            ),
          },
          {
            label: "Python",
            content: <CodeBlock code="pip install mcp" language="bash" />,
          },
        ]}
      />

      <h2 id="connect-and-call">{fr ? "Se connecter, lister, appeler" : "Connect, list, call"}</h2>
      <p>
        {fr
          ? "Le pattern est identique entre les deux SDK : (1) ouvrir le transport stdio en lançant npx -y acf-mcp, (2) initialiser la session, (3) discover puis call."
          : "The pattern is identical across both SDKs: (1) open the stdio transport by spawning npx -y acf-mcp, (2) initialise the session, (3) discover then call."}
      </p>
      <Tabs
        tabs={[
          {
            label: "Node.js",
            content: <CodeBlock code={NODE_CLIENT} language="typescript" filename="client.ts" />,
          },
          {
            label: "Python",
            content: <CodeBlock code={PYTHON_CLIENT} language="python" filename="client.py" />,
          },
        ]}
      />

      <h2 id="server-info">{fr ? "Informations serveur exposées" : "Server-exposed info"}</h2>
      <ul>
        <li>
          <strong>Tools</strong> —{" "}
          {fr
            ? "12 outils (7 REASON + 5 READ). Voir la "
            : "12 tools (7 REASON + 5 READ). See the "}
          <a href={fr ? "/fr/tools" : "/tools"}>{fr ? "référence outils" : "tools reference"}</a>.
        </li>
        <li>
          <strong>Resources</strong> —{" "}
          {fr
            ? "34 ressources signées (whitepaper, 17 fiches, 5 guides régulateurs, glossaire). Voir la "
            : "34 signed resources (whitepaper, 17 cards, 5 regulator guides, glossary). See the "}
          <a href={fr ? "/fr/resources" : "/resources"}>{fr ? "référence ressources" : "resources reference"}</a>.
        </li>
        <li>
          <strong>Prompts</strong> —{" "}
          {fr
            ? "6 prompts problem-first prêts à l’emploi pour démarrer un audit ou une qualification."
            : "6 problem-first prompts ready to start an audit or a qualification."}
        </li>
      </ul>

      <h2 id="long-running">{fr ? "Sessions de longue durée" : "Long-running sessions"}</h2>
      <p>
        {fr
          ? "Pour un service backend qui ouvre la session une fois et la garde chaude, gardez une référence au transport et appelez ses méthodes au fur et à mesure. Pour un job batch, fermez explicitement (client.close()) à la fin pour libérer le sous-processus npx."
          : "For a backend service that opens the session once and keeps it warm, hold a reference to the transport and call its methods as needed. For a batch job, close explicitly (client.close()) at the end to release the npx subprocess."}
      </p>

      <h2 id="http-transport">{fr ? "Transport HTTP" : "HTTP transport"}</h2>
      <p>
        {fr ? (
          <>
            Si vous ne pouvez pas exécuter npx dans votre environnement, acf-mcp expose
            aussi un transport HTTP (<code>acf-mcp/transport/http</code>). À héberger
            vous-même derrière votre propre gateway d’authentification. Voir{" "}
            <a href="/fr/docs/authentication">Authentification</a>.
          </>
        ) : (
          <>
            If you cannot run npx in your environment, acf-mcp also exposes an HTTP
            transport (<code>acf-mcp/transport/http</code>). To self-host behind your own
            auth gateway. See <a href="/docs/authentication">Authentication</a>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
