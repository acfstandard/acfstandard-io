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

  // Currently only FR is shipped — EN is shown as "coming"
  const md = await readFile(
    path.join(process.cwd(), "content", "whitepaper", "fr.md"),
    "utf8",
  );
  const { html } = await renderMarkdown(md);

  return (
    <DocsPage
      title={fr ? "Livre blanc ACF® V2" : "ACF® Whitepaper V2"}
      description={
        fr
          ? "Édition juin 2026 — 4 principes, 4 couches, N0–N3, DDAO, 17 fiches méthodologiques, matrice 17×5, écosystème en neuf vecteurs, preuve cryptographique Ed25519. Version FR rendue ci-dessous, EN en cours de traduction."
          : "June 2026 edition — 4 principles, 4 layers, N0–N3, DDAO, 17 methodological cards, 17×5 standards mapping matrix, nine-vector ecosystem, Ed25519 cryptographic proof. FR version rendered below, EN translation in progress."
      }
      badge={fr ? "Document" : "Document"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Cette page rend la version Markdown source du livre blanc, telle qu’elle est
            servie par le serveur MCP <code>acf-mcp</code> à la ressource{" "}
            <code>acf://whitepaper/fr</code>. Le hash de contenu de cette ressource est
            signé Ed25519 et embarqué dans chaque release npm — voir{" "}
            <a href="/signatures">Signatures</a>.{" "}
            <a
              href="https://github.com/acfstandard/acf-mcp/blob/main/content/whitepaper/fr.md"
              target="_blank"
              rel="noopener"
            >
              Source Markdown sur GitHub ↗
            </a>
          </>
        ) : (
          <>
            This page renders the source Markdown of the whitepaper, exactly as the{" "}
            <code>acf-mcp</code> MCP server serves it at the resource{" "}
            <code>acf://whitepaper/fr</code>. The content hash of this resource is
            Ed25519-signed and embedded in every npm release — see{" "}
            <a href="/signatures">Signatures</a>.{" "}
            <a
              href="https://github.com/acfstandard/acf-mcp/blob/main/content/whitepaper/fr.md"
              target="_blank"
              rel="noopener"
            >
              Markdown source on GitHub ↗
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
