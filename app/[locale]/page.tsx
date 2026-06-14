import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Topbar } from "@/components/Topbar";

type Params = { locale: string };

export default async function Home({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  const tt = await getTranslations("tools");

  const rich = {
    code: (chunks: React.ReactNode) => (
      <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.875em] font-medium text-gold">
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

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Gold grid backdrop */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.05) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-page px-6 pb-20 pt-24 md:pt-32 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-bd bg-gold-dim px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            {t("tagline")}
          </div>
          <h1 className="display-h1 mt-6 text-[clamp(40px,5vw,72px)] text-white">
            {t("title1")}
            <br />
            <span className="text-gold">{t("title2")}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.8] text-gr-2">
            {t.rich("intro_p1", rich)}
          </p>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-gr-2">
            {t.rich("intro_p2", rich)}
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <Link
              href="/docs/quickstart"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 font-display text-[14px] font-bold text-navy-900 transition hover:bg-gold-light hover:shadow-[0_8px_30px_var(--gold-glow)]"
            >
              {t("cta_primary")}
            </Link>
            <a
              href="https://github.com/acfstandard/acf-mcp"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.18] px-7 py-3.5 font-display text-[14px] font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              {t("cta_secondary")}
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-2 overflow-hidden rounded-xl border border-bd bg-navy-700/50 md:grid-cols-4">
            {[
              { value: "12", label: locale === "fr" ? "Outils MCP" : "MCP tools" },
              { value: "34", label: locale === "fr" ? "Ressources signées" : "Signed resources" },
              { value: "17×5", label: locale === "fr" ? "Matrice de mapping" : "Mapping matrix" },
              { value: "Ed25519", label: locale === "fr" ? "Doctrine signée" : "Signed doctrine" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-3 py-5 text-center transition hover:bg-gold-dim ${i < 3 ? "border-r border-bd" : ""} ${i >= 2 ? "border-t border-bd md:border-t-0" : ""}`}
              >
                <div className="font-display text-[28px] font-extrabold leading-none text-gold md:text-[32px]">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-gr">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOVEREIGNTY SCORE™ HIGHLIGHT ═══ */}
      <section className="border-y border-bd bg-gradient-to-b from-navy-800 to-navy-900">
        <div className="mx-auto max-w-page px-6 py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow mb-4">
                {locale === "fr" ? "Le KPI manquant" : "The missing KPI"}
              </p>
              <h2 className="display-h2 text-[clamp(28px,3.5vw,46px)] text-white">
                Sovereignty Score
                <span className="ml-1 align-super font-mono text-[0.5em] text-gold">™</span>
              </h2>
              <div className="mt-3.5 h-[3px] w-11 bg-gradient-to-r from-gold to-transparent" />
              <p className="mt-7 max-w-xl text-[16px] leading-[1.75] text-gr-2">
                {locale === "fr"
                  ? "Tout le monde mesure son ROI, son NPS, son CAC. Personne ne mesure la souveraineté décisionnelle conservée sur ses agents IA. C’est exactement ce sur quoi les régulateurs vont demander des comptes à partir de décembre 2027."
                  : "Every organisation measures its ROI, NPS, CAC. None measures the decisional sovereignty retained over its AI agents. That is exactly what regulators will start asking for from December 2027."}
              </p>
              <p className="mt-3 max-w-xl text-[16px] leading-[1.75] text-gr-2">
                {locale === "fr" ? (
                  <>
                    Le <strong className="font-semibold text-white">Sovereignty Score™</strong>{" "}
                    est la première métrique 0-100 conçue pour cette conversation —
                    six dimensions pondérées, calibrées sur les fiches ACF® et les
                    obligations AI Act.
                  </>
                ) : (
                  <>
                    The <strong className="font-semibold text-white">Sovereignty Score™</strong>{" "}
                    is the first 0-100 metric designed for that conversation — six
                    weighted dimensions, calibrated on the ACF® cards and the AI Act
                    obligations.
                  </>
                )}
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <Link
                  href="/sovereignty-score/calculate"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 font-display text-[14px] font-bold text-navy-900 transition hover:bg-gold-light hover:shadow-[0_8px_30px_var(--gold-glow)]"
                >
                  {locale === "fr" ? "Calculer le mien →" : "Calculate mine →"}
                </Link>
                <Link
                  href="/sovereignty-score"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.18] px-7 py-3.5 font-display text-[14px] font-semibold text-white transition hover:border-gold hover:text-gold"
                >
                  {locale === "fr" ? "La méthodologie" : "The methodology"}
                </Link>
              </div>
            </div>

            {/* Mini score gauge */}
            <div className="relative mx-auto w-full max-w-md rounded-2xl border border-gold/30 bg-gold-dim p-10 text-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                {locale === "fr" ? "Exemple — agent de scoring crédit" : "Example — credit-scoring agent"}
              </p>
              <div className="mt-6 font-display text-[110px] font-black leading-none text-gold">
                47
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gr-2">/ 100</p>
              <p className="mt-5 font-display text-[15px] font-bold text-gold">
                {locale === "fr" ? "Contrôle fragile" : "Fragile control"}
              </p>
              <p className="mt-4 font-mono text-[10.5px] leading-relaxed text-gr">
                {locale === "fr"
                  ? "Kill switch présent mais jamais testé · pas de DDAO nommé · journal non-signé"
                  : "Kill switch exists but never tested · no named DDAO · unsigned log"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUICKSTART ═══ */}
      <section id="quickstart" className="border-y border-bd-neutral bg-navy-800">
        <div className="mx-auto max-w-page px-6 py-24 lg:px-8">
          <p className="eyebrow mb-4">{t("quickstart_eyebrow")}</p>
          <h2 className="display-h2 text-[clamp(28px,3.5vw,46px)] text-white">
            {t("quickstart_title")}
          </h2>
          <div className="mt-3.5 h-[3px] w-11 bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.75] text-gr-2">
            {t.rich("quickstart_body", rich)}
          </p>
          <pre className="mt-8 overflow-x-auto rounded-xl border border-bd-neutral bg-black/40 p-6 font-mono text-[13.5px] leading-relaxed text-gr-2">
            <code>{`{
  "mcpServers": {
    "acf": {
      "command": "npx",
      "args": ["-y", "acf-mcp"]
    }
  }
}`}</code>
          </pre>
          <p className="mt-6 font-mono text-[12px] text-gr">
            {t.rich("quickstart_meta", rich)}
          </p>
        </div>
      </section>

      {/* ═══ TOOLS ═══ */}
      <section id="tools">
        <div className="mx-auto max-w-page px-6 py-24 lg:px-8">
          <p className="eyebrow mb-4">{t("tools_eyebrow")}</p>
          <h2 className="display-h2 text-[clamp(28px,3.5vw,46px)] text-white">
            {t("tools_title")}
          </h2>
          <div className="mt-3.5 h-[3px] w-11 bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.75] text-gr-2">
            {t.rich("tools_body", rich)}
          </p>
          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {tools.map(([name, desc]) => (
              <Link
                key={name}
                href={`/tools/${name}` as never}
                className="group rounded-xl border border-bd-neutral bg-navy-700 p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_50px_rgba(0,0,0,.3)]"
              >
                <div className="flex items-center justify-between">
                  <code className="font-mono text-[13.5px] font-bold text-gold">{name}</code>
                  <span className="rounded border border-gold/30 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gold/80">
                    REASON
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-[1.65] text-gr-2">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SIGNATURES ═══ */}
      <section id="signatures" className="border-y border-bd-neutral bg-navy-800">
        <div className="mx-auto max-w-page px-6 py-24 lg:px-8">
          <p className="eyebrow mb-4">{t("signatures_eyebrow")}</p>
          <h2 className="display-h2 text-[clamp(28px,3.5vw,46px)] text-white">
            {t("signatures_title")}
          </h2>
          <div className="mt-3.5 h-[3px] w-11 bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.75] text-gr-2">
            {t.rich("signatures_body", rich)}
          </p>
          <div className="mt-10 rounded-xl border border-bd bg-gold-dim p-7">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
              {t("signatures_pubkey_label")}
            </p>
            <pre className="mt-3 overflow-x-auto font-mono text-[14px] leading-relaxed text-white">
              <code>MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s=</code>
            </pre>
            <p className="mt-4 text-[14px] text-gr-2">
              {t.rich("signatures_pubkey_note", rich)}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ RESOURCES ═══ */}
      <section>
        <div className="mx-auto max-w-page px-6 py-24 lg:px-8">
          <p className="eyebrow mb-4">{t("resources_eyebrow")}</p>
          <h2 className="display-h2 text-[clamp(28px,3.5vw,46px)] text-white">
            {t("resources_title")}
          </h2>
          <div className="mt-3.5 h-[3px] w-11 bg-gradient-to-r from-gold to-transparent" />
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            <Link
              href={"/whitepaper" as never}
              className="group rounded-xl border border-bd-neutral bg-navy-700 p-7 transition hover:-translate-y-1 hover:border-gold"
            >
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-gold">
                {t("resources_whitepaper_label")}
              </p>
              <h3 className="mt-3 font-display text-[18px] font-bold text-white">
                {t("resources_whitepaper_title")}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-gr-2">
                {t("resources_whitepaper_body")}
              </p>
            </Link>
            <a
              href="https://github.com/acfstandard/acf-mcp"
              target="_blank"
              rel="noopener"
              className="group rounded-xl border border-bd-neutral bg-navy-700 p-7 transition hover:-translate-y-1 hover:border-gold"
            >
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-gold">
                {t("resources_source_label")}
              </p>
              <h3 className="mt-3 font-display text-[18px] font-bold text-white">
                {t("resources_source_title")}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-gr-2">
                {t("resources_source_body")}
              </p>
            </a>
            <Link
              href={"/mappings" as never}
              className="group rounded-xl border border-bd-neutral bg-navy-700 p-7 transition hover:-translate-y-1 hover:border-gold"
            >
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-gold">
                {t("resources_matrix_label")}
              </p>
              <h3 className="mt-3 font-display text-[18px] font-bold text-white">
                {t("resources_matrix_title")}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-gr-2">
                {t("resources_matrix_body")}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-bd bg-navy-800">
        <div className="mx-auto max-w-page px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gr">
              {t("footer_copyright")}
            </p>
            <div className="flex flex-wrap gap-6 font-mono text-[12px] text-gr">
              <a href="https://acfstandard.com" className="transition hover:text-gold">
                acfstandard.com
              </a>
              <a
                href="https://compliance.acfstandard.com"
                className="transition hover:text-gold"
              >
                ACF Compliance
              </a>
              <a href="https://acf-score.com" className="transition hover:text-gold">
                ACF Score
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
