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
      <div className="mx-auto flex max-w-7xl gap-8 px-6">
        <Sidebar />
        <main className="min-w-0 flex-1 py-10">{children}</main>
        <TableOfContents />
      </div>
      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-navy-50/50">
            © 2026 Agentic Commerce Framework® — Vincent Dorange
          </p>
          <div className="flex gap-6 font-mono text-xs text-navy-50/60">
            <a href="https://acfstandard.com" className="hover:text-gold">
              acfstandard.com
            </a>
            <a href="https://compliance.acfstandard.com" className="hover:text-gold">
              ACF Compliance
            </a>
            <a
              href="https://github.com/acfstandard/acf-mcp"
              className="hover:text-gold"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
