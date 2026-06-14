import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

export default async function SovereigntyIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="Sovereignty Index"
      description={
        fr
          ? "Le benchmark sectoriel annuel des ACF Sovereignty Score™ — médianes par industrie, distribution, tendances. Premier rapport prévu Q4 2026."
          : "The annual sector benchmark of ACF Sovereignty Score™ — medians per industry, distribution, trends. First report scheduled Q4 2026."
      }
      badge={fr ? "Benchmark" : "Benchmark"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Le <strong>Sovereignty Index</strong> publiera chaque année la distribution
            des <Link href="/sovereignty-score">ACF Sovereignty Scores™</Link> observés par
            secteur sur un échantillon anonymisé d’organisations. Inscrivez-vous pour
            recevoir le premier rapport.
          </>
        ) : (
          <>
            The <strong>Sovereignty Index</strong> will publish, every year, the
            distribution of <Link href="/sovereignty-score">ACF Sovereignty Scores™</Link>{" "}
            observed by sector on an anonymised sample of organisations. Sign up to
            receive the first report.
          </>
        )}
      </Callout>

      <h2 id="what-it-is">{fr ? "Ce qu’il publie" : "What it publishes"}</h2>
      <ul>
        <li>
          {fr
            ? "Score médian de souveraineté décisionnelle par secteur (banque, assurance, retail, santé, services publics, industrie, télécoms, transport)."
            : "Median decisional sovereignty score per sector (banking, insurance, retail, healthcare, public services, industry, telecoms, transport)."}
        </li>
        <li>
          {fr
            ? "Distribution 10ᵉ / 50ᵉ / 90ᵉ percentile — pour situer son organisation."
            : "10th / 50th / 90th percentile distribution — so you can locate your own organisation."}
        </li>
        <li>
          {fr
            ? "Par dimension : laquelle est la plus faible en moyenne, laquelle progresse le plus année après année."
            : "Per dimension: which one is the weakest on average, which one progresses the most year over year."}
        </li>
        <li>
          {fr
            ? "Lecture par taille (PME, ETI, groupe coté) et par juridiction (FR, DE, UK, IT, NL, US, autres)."
            : "Reading by company size (SMB, mid-market, listed group) and by jurisdiction (FR, DE, UK, IT, NL, US, others)."}
        </li>
      </ul>

      <h2 id="how-it-is-built">{fr ? "Comment il est construit" : "How it is built"}</h2>
      <p>
        {fr ? (
          <>
            La source unique est l’outil MCP <code>acf.identify-governance-gaps</code>,
            qui produit un ACF Sovereignty Score™ signé Ed25519 à chaque appel. Les
            organisations qui souhaitent contribuer publient leur score (et son
            doctrine_hash) au registre public sectoriel — sans révéler leur identité.
            L’index agrège ces signatures anonymes et calcule médiane et percentiles.
          </>
        ) : (
          <>
            The single source is the <code>acf.identify-governance-gaps</code> MCP tool,
            which produces an Ed25519-signed ACF Sovereignty Score™ on every call.
            Organisations who choose to contribute publish their score (and its
            doctrine_hash) to the sector public register — without revealing their
            identity. The index aggregates these anonymous signatures and computes
            median and percentiles.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Aucun consultant n’a accès à la donnée brute. La signature Ed25519 garantit qu’un score publié ne peut pas être altéré ; l’anonymisation est faite côté client avant publication."
          : "No consultant has access to the raw data. The Ed25519 signature guarantees a published score cannot be tampered with; anonymisation happens client-side before publication."}
      </p>

      <h2 id="why-it-matters">{fr ? "Pourquoi c’est important" : "Why it matters"}</h2>
      <p>
        {fr
          ? "Une métrique sans benchmark n’est qu’un nombre. Avec le Sovereignty Index, votre score 67/100 devient « 67/100 — en dessous du 75ᵉ percentile de votre secteur ». Le calibrage transforme la donnée en décision."
          : "A metric without a benchmark is just a number. With the Sovereignty Index, your 67/100 score becomes “67/100 — below the 75th percentile of your sector”. The calibration turns data into a decision."}
      </p>

      <h2 id="first-report">{fr ? "Premier rapport" : "First report"}</h2>
      <p>
        {fr ? (
          <>
            Le premier <strong>State of Agentic Sovereignty 2026</strong> est attendu
            pour le <strong>Q4 2026</strong>. La fenêtre de contribution ouvre en
            septembre 2026. Pour recevoir l’avis de publication, contactez l’éditeur à{" "}
            <code>dorange.vincent@gmail.com</code> avec le sujet « Sovereignty Index — opt-in ».
          </>
        ) : (
          <>
            The first <strong>State of Agentic Sovereignty 2026</strong> is expected for{" "}
            <strong>Q4 2026</strong>. The contribution window opens in September 2026.
            To receive the publication notice, contact the editor at{" "}
            <code>dorange.vincent@gmail.com</code> with the subject “Sovereignty Index — opt-in”.
          </>
        )}
      </p>
    </DocsPage>
  );
}
