import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Params = { locale: string };

export default async function Home({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  const tt = await getTranslations("tools");

  const rich = {
    code: (chunks: React.ReactNode) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-gold">
        {chunks}
      </code>
    ),
    strong: (chunks: React.ReactNode) => (
      <strong className="font-semibold text-white">{chunks}</strong>
    ),
  };

  const tools: [string, string][] = [
    ["acf.advisor", tt("advisor")],
    ["acf.classify-agent", tt("classifyAgent")],
    ["acf.assess-autonomy", tt("assessAutonomy")],
    ["acf.identify-governance-gaps", tt("identifyGovernanceGaps")],
    ["acf.map-ai-act-obligations", tt("mapAiActObligations")],
    ["acf.assign-ddao-controls", tt("assignDdaoControls")],
    ["acf.evaluate-agent-mandate", tt("evaluateAgentMandate")],
    ["acf.map-to-standards", tt("mapToStandards")],
  ];

  return (
    <main className="min-h-screen bg-navy text-navy-50">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded border border-gold/40 bg-gold/10 font-display text-sm font-bold text-gold">
              ACF
            </div>
            <span className="font-display text-base font-semibold tracking-wide">
              acfstandard.io
            </span>
            <span className="ml-2 rounded border border-gold/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold/80">
              {tn("openSource")}
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#quickstart" className="hover:text-gold">
              {tn("quickstart")}
            </a>
            <a href="#tools" className="hover:text-gold">
              {tn("tools")}
            </a>
            <a href="#signatures" className="hover:text-gold">
              {tn("signatures")}
            </a>
            <a
              href="https://github.com/acfstandard/acf-mcp"
              target="_blank"
              rel="noopener"
              className="hover:text-gold"
            >
              {tn("github")} ↗
            </a>
            <Link
              href="/"
              locale={locale === "en" ? "fr" : "en"}
              className="rounded border border-white/20 px-2 py-0.5 font-mono text-xs uppercase tracking-wider hover:border-gold hover:text-gold"
            >
              {locale === "en" ? "FR" : "EN"}
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gold">
          {t("tagline")}
        </p>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          {t("title1")}
          <br />
          {t("title2")}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-navy-50/80">
          {t.rich("intro_p1", rich)}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-50/80">
          {t.rich("intro_p2", rich)}
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="#quickstart"
            className="rounded border border-gold bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-400"
          >
            {t("cta_primary")}
          </a>
          <a
            href="https://github.com/acfstandard/acf-mcp"
            target="_blank"
            rel="noopener"
            className="rounded border border-white/20 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
          >
            {t("cta_secondary")}
          </a>
        </div>
      </section>

      <section id="quickstart" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
            {t("quickstart_eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {t("quickstart_title")}
          </h2>
          <p className="mt-4 max-w-2xl text-navy-50/70">{t.rich("quickstart_body", rich)}</p>
          <pre className="mt-8 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-6 font-mono text-sm leading-relaxed text-navy-50/90">
            <code>{`{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`}</code>
          </pre>
          <p className="mt-6 text-sm text-navy-50/60">{t.rich("quickstart_meta", rich)}</p>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
          {t("tools_eyebrow")}
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("tools_title")}</h2>
        <p className="mt-4 max-w-2xl text-navy-50/70">{t.rich("tools_body", rich)}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {tools.map(([name, desc]) => (
            <div
              key={name}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5 hover:border-gold/30"
            >
              <code className="font-mono text-sm font-semibold text-gold">{name}</code>
              <p className="mt-2 text-sm text-navy-50/70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="signatures" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
            {t("signatures_eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {t("signatures_title")}
          </h2>
          <p className="mt-4 max-w-2xl text-navy-50/70">{t.rich("signatures_body", rich)}</p>
          <div className="mt-8 rounded-lg border border-gold/30 bg-gold/[0.04] p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {t("signatures_pubkey_label")}
            </p>
            <pre className="mt-3 overflow-x-auto font-mono text-sm leading-relaxed text-white">
              <code>MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s=</code>
            </pre>
            <p className="mt-4 text-sm text-navy-50/60">
              {t.rich("signatures_pubkey_note", rich)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
          {t("resources_eyebrow")}
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">{t("resources_title")}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a
            href={
              locale === "fr"
                ? "https://github.com/acfstandard/acf-mcp/blob/main/content/whitepaper/fr.md"
                : "https://github.com/acfstandard/acf-mcp/blob/main/content/whitepaper/en.md"
            }
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-gold/30"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {t("resources_whitepaper_label")}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold">
              {t("resources_whitepaper_title")}
            </h3>
            <p className="mt-2 text-sm text-navy-50/70">{t("resources_whitepaper_body")}</p>
          </a>
          <a
            href="https://github.com/acfstandard/acf-mcp"
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-gold/30"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {t("resources_source_label")}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold">
              {t("resources_source_title")}
            </h3>
            <p className="mt-2 text-sm text-navy-50/70">{t("resources_source_body")}</p>
          </a>
          <a
            href="https://github.com/acfstandard/acf-mcp/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-gold/30"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {t("resources_changelog_label")}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold">
              {t("resources_changelog_title")}
            </h3>
            <p className="mt-2 text-sm text-navy-50/70">{t("resources_changelog_body")}</p>
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-navy-50/50">{t("footer_copyright")}</p>
          <div className="flex gap-6 font-mono text-xs text-navy-50/60">
            <a href="https://acfstandard.com" className="hover:text-gold">
              acfstandard.com
            </a>
            <a href="https://compliance.acfstandard.com" className="hover:text-gold">
              ACF Compliance
            </a>
            <a href="https://acf-score.com" className="hover:text-gold">
              ACF Score
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
