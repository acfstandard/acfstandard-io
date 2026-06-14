import { getTranslations } from "next-intl/server";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { TableOfContents } from "@/components/TableOfContents";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params;
  const tn = await getTranslations("nav");

  return (
    <>
      <Topbar
        labels={{
          github: tn("github"),
          docs: tn("docs"),
          tools: tn("tools"),
          signatures: tn("signatures"),
          whitepaper: tn("whitepaper"),
        }}
      />
      <div className="mx-auto flex max-w-page gap-10 px-6 lg:px-8">
        <Sidebar />
        <main className="min-w-0 flex-1 py-12">{children}</main>
        <TableOfContents />
      </div>
      <footer className="border-t border-bd bg-navy-800">
        <div className="mx-auto max-w-page px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-wider text-gr">
              © 2026 Agentic Commerce Framework® — Vincent Dorange
            </p>
            <div className="flex flex-wrap gap-6 font-mono text-[12px] text-gr">
              <a href="https://acfstandard.com" className="transition hover:text-gold">
                acfstandard.com
              </a>
              <a href="https://compliance.acfstandard.com" className="transition hover:text-gold">
                ACF Compliance
              </a>
              <a href="https://acf-score.com" className="transition hover:text-gold">
                ACF Score
              </a>
              <a
                href="https://github.com/acfstandard/acf-mcp"
                className="transition hover:text-gold"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
