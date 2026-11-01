import { setRequestLocale } from "next-intl/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { renderMarkdown } from "@/lib/markdown";

export default async function WhitepaperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  const file = fr ? "fr.md" : "en.md";
  let raw: string;
  try {
    raw = await readFile(
      path.join(process.cwd(), "content", "whitepaper", file),
      "utf8",
    );
  } catch {
    raw = await readFile(
      path.join(process.cwd(), "content", "whitepaper", "fr.md"),
      "utf8",
    );
  }
  const { html } = await renderMarkdown(raw);

  return (
    <DocsPage
      title={fr ? "Livre blanc ACF® V2.1" : "ACF® Whitepaper V2.1"}
      description={
        fr
          ? "Govern. Measure. Prove. Decision Trust Infrastructure pour la décision agentique : 4 principes, 4 couches, autonomie déléguée et maturité N0 à N3, DDAO, 45 fiches, correspondance avec cinq référentiels, ACF Sovereignty Score™, signature Ed25519."
          : "Govern. Measure. Prove. Decision Trust Infrastructure for agentic decisions: 4 principles, 4 layers, delegated autonomy and N0 to N3 maturity, DDAO, 45 cards, mapping to five standards, ACF Sovereignty Score™, Ed25519 signature."
      }
      badge={fr ? "Document" : "Document"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Cette page rend la version Markdown source du livre blanc, telle qu’elle est
            servie par le serveur MCP <code>acf-mcp</code> à la ressource{" "}
            <code>acf://whitepaper?lang=fr</code>. Il fait partie de la doctrine dont
            l’empreinte est signée Ed25519 dans chaque version npm : voir{" "}
            <a href="/fr/signatures">Signatures</a>.{" "}
            <a
              href="https://acfstandard.com/fr/whitepaper"
              target="_blank"
              rel="noopener"
            >
              Le livre blanc sur acfstandard.com ↗
            </a>
          </>
        ) : (
          <>
            This page renders the source Markdown of the whitepaper, exactly as the{" "}
            <code>acf-mcp</code> MCP server serves it at the resource{" "}
            <code>acf://whitepaper?lang=en</code>. It is part of the doctrine whose hash
            is Ed25519-signed in every npm release: see{" "}
            <a href="/signatures">Signatures</a>.{" "}
            <a
              href="https://acfstandard.com/en/whitepaper"
              target="_blank"
              rel="noopener"
            >
              The white paper on acfstandard.com ↗
            </a>
          </>
        )}
      </Callout>

      <div
        className="docs-content prose-doc-rendered mt-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </DocsPage>
  );
}
