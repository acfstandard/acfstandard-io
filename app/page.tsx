import Link from "next/link";

export default function Home() {
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
              Dev docs
            </span>
          </div>
          <nav className="hidden gap-7 text-sm md:flex">
            <Link href="#quickstart" className="hover:text-gold">Quickstart</Link>
            <Link href="#tools" className="hover:text-gold">MCP tools</Link>
            <Link href="#signatures" className="hover:text-gold">Signatures</Link>
            <Link
              href="https://github.com/acfstandard/acf-mcp"
              target="_blank"
              rel="noopener"
              className="hover:text-gold"
            >
              GitHub ↗
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gold">
          Official developer documentation
        </p>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Build agentic systems
          <br />
          your auditor can verify.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-navy-50/80">
          <span className="font-semibold text-white">acf-mcp</span> is the official
          Model Context Protocol server of the{" "}
          <span className="font-semibold text-gold">Agentic Commerce Framework®</span>{" "}
          — the European standard for governing AI agents in production. Eight
          deterministic REASON tools, thirty-four signed resources, and a verifiable
          doctrine chain — directly inside Claude Desktop, Cursor, Windsurf, Continue.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="#quickstart"
            className="rounded border border-gold bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-400"
          >
            Quickstart →
          </Link>
          <Link
            href="https://github.com/acfstandard/acf-mcp"
            target="_blank"
            rel="noopener"
            className="rounded border border-white/20 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
          >
            View source on GitHub
          </Link>
        </div>
      </section>

      <section id="quickstart" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
            Quickstart · 30 seconds
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Install acf-mcp in Claude Desktop
          </h2>
          <p className="mt-4 max-w-2xl text-navy-50/70">
            Add this single block to your{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-gold">
              claude_desktop_config.json
            </code>{" "}
            (or equivalent for Cursor / Windsurf / Continue), restart the client, and
            the ACF® doctrine is available to your agent.
          </p>
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
          <p className="mt-6 text-sm text-navy-50/60">
            Latest version: <code className="font-mono text-gold">acf-mcp@1.1.0</code>{" "}
            · MCP registry identity:{" "}
            <code className="font-mono text-gold">io.github.acfstandard/acf-mcp</code>
          </p>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
          MCP tools
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Eight deterministic REASON tools
        </h2>
        <p className="mt-4 max-w-2xl text-navy-50/70">
          Each tool runs on a versioned, signed knowledge base — no internal LLM call.
          Every output ships with{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-gold">
            doctrine_version
          </code>
          ,{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-gold">
            doctrine_hash
          </code>
          ,{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-gold">
            doctrine_signature
          </code>{" "}
          and{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-gold">
            generated_at
          </code>
          . Every output is positioned as preliminary qualification, not legal advice.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            ["acf.advisor", "Structured advice from a generic case"],
            ["acf.classify-agent", "Preliminary agent qualification (10 enum fields)"],
            ["acf.assess-autonomy", "N0–N3 recommendation, go/no-go, kill switch design"],
            ["acf.identify-governance-gaps", "6-dim maturity + prioritised remediations"],
            ["acf.map-ai-act-obligations", "AI Act obligations ventilated by lifecycle phase"],
            ["acf.assign-ddao-controls", "DDAO controls per autonomy level and risk"],
            ["acf.evaluate-agent-mandate", "Eight-check audit of an existing mandate"],
            ["acf.map-to-standards", "ACF® × AI Act / ISO 42001 / NIST RMF / GDPR / COBIT"],
          ].map(([name, desc]) => (
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
            Doctrine signatures
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Cryptographically verifiable
          </h2>
          <p className="mt-4 max-w-2xl text-navy-50/70">
            Every release of <code className="font-mono text-gold">acf-mcp</code>{" "}
            embeds an Ed25519 signature over the content hash of the doctrine. The
            public key below is the current root of trust (valid from version 1.1.0
            onwards) — pin it in your audit pipeline and you can verify every reply
            offline without contacting any server.
          </p>
          <div className="mt-8 rounded-lg border border-gold/30 bg-gold/[0.04] p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              Doctrine public key (Ed25519, base64 SPKI)
            </p>
            <pre className="mt-3 overflow-x-auto font-mono text-sm leading-relaxed text-white">
              <code>MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s=</code>
            </pre>
            <p className="mt-4 text-sm text-navy-50/60">
              Verify any reply with{" "}
              <code className="font-mono text-gold">npm run verify-doctrine</code>{" "}
              from the repo, or implement Ed25519 verification in your own
              language — no private key needed.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">
          Resources
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">Further reading</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a
            href="https://github.com/acfstandard/acf-mcp/blob/main/content/whitepaper/fr.md"
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-gold/30"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              Whitepaper FR
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold">
              Le livre blanc ACF® V2
            </h3>
            <p className="mt-2 text-sm text-navy-50/70">
              Édition juin 2026 — 17 fiches, 4 niveaux d&apos;autonomie, matrice 17×5.
            </p>
          </a>
          <a
            href="https://github.com/acfstandard/acf-mcp"
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-gold/30"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              Source code
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold">
              github.com/acfstandard/acf-mcp
            </h3>
            <p className="mt-2 text-sm text-navy-50/70">
              MIT licence. PRs welcome on tooling and integration guides.
            </p>
          </a>
          <a
            href="https://github.com/acfstandard/acf-mcp/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-gold/30"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              Changelog
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold">
              Version history
            </h3>
            <p className="mt-2 text-sm text-navy-50/70">
              All releases, with doctrine hash and signature notes.
            </p>
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-navy-50/50">
            © 2026 Agentic Commerce Framework® — Vincent Dorange. ACF® is a registered
            trademark.
          </p>
          <div className="flex gap-6 font-mono text-xs text-navy-50/60">
            <Link href="https://acfstandard.com" className="hover:text-gold">
              acfstandard.com (vitrine)
            </Link>
            <Link href="https://compliance.acfstandard.com" className="hover:text-gold">
              ACF Compliance (SaaS)
            </Link>
            <Link href="https://acf-score.com" className="hover:text-gold">
              ACF Score
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
