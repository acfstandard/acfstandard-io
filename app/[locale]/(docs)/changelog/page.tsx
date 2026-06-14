import { setRequestLocale } from "next-intl/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { renderMarkdown } from "@/lib/markdown";

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  const md = await readFile(
    path.join(process.cwd(), "content", "CHANGELOG.md"),
    "utf8",
  );
  const { html } = await renderMarkdown(md);

  return (
    <DocsPage
      title="Changelog"
      description={
        fr
          ? "Historique des versions du serveur MCP acf-mcp. Auto-importé du fichier CHANGELOG.md du repo. Chaque release est versionnée sémantiquement et signée — un changement de racine de confiance Ed25519 est documenté à minor bump (1.1.0, 1.2.0…), jamais à patch."
          : "Version history of the acf-mcp MCP server. Auto-imported from the repo CHANGELOG.md. Each release is semver-tagged and signed — an Ed25519 root-of-trust rotation is documented on minor bumps (1.1.0, 1.2.0…), never on patch."
      }
      badge={fr ? "Référence" : "Reference"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            La version courante publiée sur npm est <code>acf-mcp@1.1.0</code>. Pour
            installer la dernière, voir <a href="/docs/quickstart">Démarrage rapide</a>.
            La version courante est synchronisée avec le tag git <code>v1.1.0</code> sur
            le repo. <a
              href="https://github.com/acfstandard/acf-mcp/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener"
            >
              Source sur GitHub ↗
            </a>
          </>
        ) : (
          <>
            The current version published on npm is <code>acf-mcp@1.1.0</code>. To install
            the latest, see <a href="/docs/quickstart">Quickstart</a>. The current version
            is synchronised with the git tag <code>v1.1.0</code> on the repo.{" "}
            <a
              href="https://github.com/acfstandard/acf-mcp/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener"
            >
              Source on GitHub ↗
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
