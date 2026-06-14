import { docsNav } from "@/lib/docs-nav";

const BASE = "https://acfstandard.io";

export function GET() {
  const sections = docsNav
    .map((group) => {
      const lines = group.items.map((i) => `- [${i.title.en}](${BASE}${i.href})`);
      return `## ${group.title.en}\n\n${lines.join("\n")}`;
    })
    .join("\n\n");

  const body = `# ACF® Developer Documentation

> Official developer documentation for the Agentic Commerce Framework® (ACF®) — the European standard for governing AI agents in production. Covers the acf-mcp Model Context Protocol server, REASON tools, doctrine signatures (Ed25519), and integration with Claude Desktop, Cursor, Windsurf, Continue and Zed.

## Background

acf-mcp is the official MCP server of the Agentic Commerce Framework® (ACF®), the European standard for agentic governance. It exposes eight deterministic REASON tools (no internal LLM call) and thirty-four signed resources covering the 17 ACF® methodological cards, five regulator guides (EU AI Act, GDPR, DORA, NIS2, ISO/IEC 42001), and a glossary. Every output ships with a cryptographic doctrine signature (Ed25519 over the content hash) and is positioned as preliminary qualification, not legal advice.

Latest stable version: acf-mcp@1.1.0 (June 2026).
MCP registry identity: io.github.acfstandard/acf-mcp.
Source: https://github.com/acfstandard/acf-mcp.
Whitepaper: https://github.com/acfstandard/acf-mcp/blob/main/content/whitepaper/fr.md

${sections}

## Other surfaces

- Vitrine: https://acfstandard.com
- SaaS: https://compliance.acfstandard.com
- Free diagnostic: https://acf-score.com
- Source code: https://github.com/acfstandard/acf-mcp
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
