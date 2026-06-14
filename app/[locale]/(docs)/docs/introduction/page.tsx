import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";

export default async function IntroductionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Introduction" : "Introduction"}
      description={
        fr
          ? "ACF® (Agentic Commerce Framework®) est le standard européen ouvert de gouvernance des systèmes agentiques en production. acf-mcp est l’implémentation officielle de référence, exposée comme serveur Model Context Protocol."
          : "ACF® (Agentic Commerce Framework®) is the open European standard for governing agentic systems in production. acf-mcp is the official reference implementation, exposed as a Model Context Protocol server."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <h2 id="what-is-acf-mcp">{fr ? "Qu’est-ce qu’acf-mcp" : "What is acf-mcp"}</h2>
      <p>
        {fr ? (
          <>
            <code>acf-mcp</code> est un serveur <strong>Model Context Protocol</strong> qui
            expose la doctrine ACF® — 4 principes fondateurs, 4 niveaux d’autonomie
            (N0–N3), le rôle DDAO et les 17 fiches méthodologiques — comme ressources et
            outils natifs consommables par n’importe quel client MCP (Claude Desktop,
            Cursor, Windsurf, Continue, Zed, ou un client custom).
          </>
        ) : (
          <>
            <code>acf-mcp</code> is a <strong>Model Context Protocol</strong> server that
            exposes the ACF® doctrine — 4 founding principles, 4 autonomy levels (N0–N3),
            the DDAO role and the 17 methodological cards — as resources and tools that
            any MCP client (Claude Desktop, Cursor, Windsurf, Continue, Zed, or a custom
            client) can consume natively.
          </>
        )}
      </p>
      <h2 id="why-it-matters">{fr ? "Pourquoi ça compte" : "Why it matters"}</h2>
      <p>
        {fr
          ? "À partir du 2 décembre 2027, les obligations haut-risque de l’EU AI Act entrent en application. Les organisations qui exploitent des agents IA en production sans cadre de gouvernance opérationnel devront produire, sur demande d’un auditeur, la trace cryptographique complète de chaque décision agentique. acf-mcp donne à votre agent l’accès direct à un standard qui rend cette trace opposable."
          : "From December 2, 2027, the high-risk obligations of the EU AI Act enter into force. Organisations operating AI agents in production without an operational governance framework will have to produce, on request from an auditor, the complete cryptographic trace of every agentic decision. acf-mcp gives your agent direct access to a standard that makes this trace defensible."}
      </p>
      <h2 id="what-you-get">{fr ? "Ce que vous obtenez" : "What you get"}</h2>
      <ul>
        <li>
          {fr
            ? "8 outils REASON déterministes (classification, gap analysis, mapping AI Act, etc.) — sans appel LLM interne, output entièrement signé Ed25519"
            : "8 deterministic REASON tools (classification, gap analysis, AI Act mapping, etc.) — no internal LLM call, every output is Ed25519-signed"}
        </li>
        <li>
          {fr
            ? "5 outils READ (search, get-resource, list-fiches, regulation-article, glossary)"
            : "5 READ tools (search, get-resource, list-fiches, regulation-article, glossary)"}
        </li>
        <li>
          {fr
            ? "34 ressources MCP signées (whitepaper, 17 fiches, 5 guides régulateurs, glossaire)"
            : "34 signed MCP resources (whitepaper, 17 cards, 5 regulator guides, glossary)"}
        </li>
        <li>
          {fr
            ? "6 prompts MCP problem-first prêts à l’emploi pour démarrer un audit ou une qualification d’agent"
            : "6 problem-first MCP prompts ready to start an audit or agent qualification"}
        </li>
      </ul>
      <h2 id="next-steps">{fr ? "Étapes suivantes" : "Next steps"}</h2>
      <p>
        {fr ? (
          <>
            Continuez avec le <a href="/fr/docs/quickstart">démarrage rapide</a> pour
            installer <code>acf-mcp</code> dans votre client en 30 secondes, ou lisez la
            page <a href="/fr/docs/architecture">architecture</a> pour comprendre comment
            chaque outil produit une sortie déterministe et signée sans jamais appeler de
            LLM interne.
          </>
        ) : (
          <>
            Continue with the <a href="/docs/quickstart">quickstart</a> to install{" "}
            <code>acf-mcp</code> in your client in 30 seconds, or read the{" "}
            <a href="/docs/architecture">architecture</a> page to understand how each
            tool produces deterministic, signed output without ever calling an internal
            LLM.
          </>
        )}
      </p>
    </DocsPage>
  );
}
