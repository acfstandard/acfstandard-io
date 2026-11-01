import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { FAMILIES, FICHES } from "@/lib/fiches";

export default async function FichesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Les 45 fiches du toolkit" : "The 45 toolkit cards"}
      description={
        fr
          ? "Le toolkit ACF® compte 45 fiches en 3 familles : Décider (ACF-01 à ACF-20), Organiser (ACF-O1 à ACF-O10) et Opérer (ACF-P1 à ACF-P15). Chacune s’imprime, se remplit, se date et se signe ; le serveur MCP les expose sous l’URI acf://fiche/ACF-XX."
          : "The ACF® toolkit has 45 cards in three families: Decide (ACF-01 to ACF-20), Organise (ACF-O1 to ACF-O10) and Operate (ACF-P1 to ACF-P15). Each one is printed, filled in, dated and signed; the MCP server exposes them at acf://fiche/ACF-XX."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les fiches vierges se téléchargent gratuitement sur acfstandard.com, en français et
            en anglais. Elles sont accompagnées du <em>manuel ACF® Toolkit</em> (331 pages) et
            d'un deck d'introduction.
          </>
        ) : (
          <>
            The blank cards are free to download on acfstandard.com, in French and English.
            They ship alongside the <em>ACF® Toolkit Manual</em> (331 pages) and an
            introduction deck.
          </>
        )}
      </Callout>

      {FAMILIES.map((fam) => (
        <section key={fam.id}>
          <h2 id={fam.id}>
            {fr ? fam.fr : fam.en} · {fam.first} {fr ? "à" : "to"} {fam.last}
          </h2>
          <div className="not-prose my-6 space-y-3">
            {FICHES.filter((f) => f.family === fam.id).map((f) => (
              <div key={f.code} className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <code className="font-mono text-sm font-semibold text-gold">{f.code}</code>
                  <h3 className="m-0 font-display text-base font-semibold text-white">
                    {fr ? f.titleFr : f.titleEn}
                  </h3>
                  <a
                    href={fr ? f.pdfFr : f.pdfEn}
                    className="ml-auto font-mono text-[11px] text-navy-50/50 hover:text-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PDF ↗
                  </a>
                </div>
                <p className="mt-1 text-[13px] italic text-navy-50/60">{fr ? f.subtitleFr : f.subtitleEn}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-50/75">
                  {fr ? f.objectiveFr : f.objectiveEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <h2 id="how-to-use">{fr ? "Comment les utiliser" : "How to use them"}</h2>
      <ul>
        <li>
          {fr ? (
            <>
              Côté <strong>déploiement</strong> : ACF-01 (Score de Souveraineté) → ACF-02 (Carte
              Décisionnelle) → ACF-03 (Matrice de Criticité) → ACF-04 (Constitution Agentique) →
              ACF-05 (Fiche Agent) → ACF-13 (Mandat d'Agent) → ACF-07 (Kill Switch) → ACF-09
              (Registre des Décisions Agentiques).
            </>
          ) : (
            <>
              For <strong>deployment</strong>: ACF-01 (Sovereignty Score) → ACF-02 (Decision Map)
              → ACF-03 (Criticality Matrix) → ACF-04 (Agentic Constitution) → ACF-05 (Agent Card)
              → ACF-13 (Agent Mandate) → ACF-07 (Kill Switch) → ACF-09 (Agentic Decisions Register).
            </>
          )}
        </li>
        <li>
          {fr ? (
            <>
              Côté <strong>formation</strong> : ACF-18 (Cas Pratique Guidé) puis ACF-19 (Guide
              Enseignant), et ACF-20 (Simulation de Gouvernance) pour s’entraîner en situation.
            </>
          ) : (
            <>
              For <strong>training</strong>: ACF-18 (Guided Case Study) then ACF-19 (Instructor's
              Guide), and ACF-20 (Governance Simulation) to practise in a realistic setting.
            </>
          )}
        </li>
        <li>
          {fr ? (
            <>
              Côté <strong>audit</strong> : ACF-11 (Audit Gouvernance 30 jours), ACF-12
              (Évaluation des Risques Agentiques), puis ACF-16 (Épreuve de la Supervision) et
              ACF-17 (Revue de Validité) pour vérifier que le dispositif et le mandat tiennent.
            </>
          ) : (
            <>
              For <strong>audit</strong>: ACF-11 (30-Day Governance Audit), ACF-12 (Agentic Risk
              Assessment), then ACF-16 (Supervision Test) and ACF-17 (Validity Review) to check
              that the setup and the mandate still hold.
            </>
          )}
        </li>
      </ul>

      <h2 id="programmatic">{fr ? "Accès programmatique" : "Programmatic access"}</h2>
      <p>
        {fr ? (
          <>
            Chaque fiche est exposée par le serveur MCP sous l’URI <code>acf://fiche/ACF-XX</code>,
            en français et en anglais. L'outil{" "}
            <Link href="/tools/acf.fiche.lookup">acf.fiche.lookup</Link> la retourne par son code,
            avec son contenu, son URI et le lien de la fiche imprimable. La correspondance de
            chaque fiche avec les référentiels se lit dans la{" "}
            <Link href="/mappings">matrice de correspondance</Link>.
          </>
        ) : (
          <>
            Each card is exposed by the MCP server at <code>acf://fiche/ACF-XX</code>, in French
            and English. The <Link href="/tools/acf.fiche.lookup">acf.fiche.lookup</Link> tool
            returns it by code, with its content, its URI and the link to the printable card. The
            mapping of each card to the standards is in the{" "}
            <Link href="/mappings">mapping matrix</Link>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
