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

> Official developer documentation for the Agentic Commerce Framework® (ACF®), a governance framework for AI agents in production. Covers the acf-mcp Model Context Protocol server, REASON tools, doctrine signatures (Ed25519), and integration with Claude Desktop, Cursor, Windsurf, Continue and Zed.

## Background

acf-mcp is the official MCP server of the Agentic Commerce Framework® (ACF®), a governance framework for AI agents in production. It exposes 13 tools (8 deterministic REASON tools with no internal LLM call, 5 READ tools) and 79 resources covering the 45 ACF® toolkit cards, 5 regulatory guides (EU AI Act, GDPR, DORA, NIS2, ISO/IEC 42001), the white paper, the toolkit manual, the deck and a glossary. The doctrine is Ed25519-signed over its content hash; every reasoning output carries that hash and signature and is positioned as preliminary qualification, not legal advice. Delegated autonomy is set decision by decision on 4 levels (advisory, co-decision, supervised autonomous, autonomous); N0 to N3 is the maturity of the agent.

Latest stable version: acf-mcp@2.0.1 (November 2026).
MCP registry identity: io.github.acfstandard/acf-mcp.
Source: https://github.com/acfstandard/acf-mcp.
White paper: https://acfstandard.com/en/whitepaper

${sections}

## Other surfaces

- Vitrine: https://acfstandard.com
- Compliance platform: https://compliance.acfstandard.com
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
