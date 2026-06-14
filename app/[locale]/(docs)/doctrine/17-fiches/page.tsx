import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { MAPPING } from "@/lib/mapping-matrix";

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
      title={fr ? "Les 17 fiches méthodologiques" : "The 17 methodological cards"}
      description={
        fr
          ? "ACF® se déploie à travers dix-sept fiches méthodologiques numérotées ACF-00 à ACF-16, prêtes à être imprimées, remplies, signées, archivées. Chaque fiche est un objet de gouvernance opposable, accessible via le serveur MCP par l’URI acf://fiche/ACF-XX."
          : "ACF® deploys through seventeen methodological cards numbered ACF-00 to ACF-16, ready to be printed, filled in, signed, archived. Each card is a defensible governance object, accessible via the MCP server at acf://fiche/ACF-XX."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les fiches sont publiques pour les enseignants, formateurs, chercheurs et
            établissements de formation, sous Charte d’utilisation pédagogique. Pour les
            organisations en déploiement, elles sont accompagnées du <em>manuel ACF®
            Toolkit</em> (130 pages), d’un deck d’introduction et de cinq cas
            pédagogiques calibrés.
          </>
        ) : (
          <>
            The cards are public for teachers, trainers, researchers, and training
            institutions, under an Educational Use Charter. For organisations in
            deployment, they ship alongside the <em>ACF® Toolkit Manual</em> (130 pages),
            an introduction deck, and five calibrated case studies.
          </>
        )}
      </Callout>

      <h2 id="index">{fr ? "Index complet" : "Full index"}</h2>
      <div className="not-prose my-6 space-y-3">
        {MAPPING.map((row) => (
          <div
            key={row.fiche.code}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <code className="font-mono text-sm font-semibold text-gold">
                {row.fiche.code}
              </code>
              <h3 className="m-0 font-display text-base font-semibold text-white">
                {fr ? row.fiche.titleFr : row.fiche.titleEn}
              </h3>
              <code className="ml-auto font-mono text-[11px] text-navy-50/40">
                acf://fiche/{row.fiche.code}
              </code>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-navy-50/75">
              {fr ? row.fiche.summaryFr : row.fiche.summaryEn}
            </p>
          </div>
        ))}
      </div>

      <h2 id="how-to-use">{fr ? "Comment les utiliser" : "How to use them"}</h2>
      <ul>
        <li>
          {fr ? (
            <>
              Côté <strong>déploiement</strong> : suivez la séquence ACF-00 (Score) →
              ACF-01 (Carte) → ACF-02 (Criticité) → ACF-03 (Constitution) → ACF-04 (Fiche
              Agent) → ACF-12 (Mandat) → ACF-06 (Kill Switch) → ACF-08 (Registre). Voir
              la <em>méthodologie de déploiement</em> sur 6-18 mois.
            </>
          ) : (
            <>
              For <strong>deployment</strong>: follow the sequence ACF-00 (Score) → ACF-01
              (Map) → ACF-02 (Criticality) → ACF-03 (Constitution) → ACF-04 (Agent Card) →
              ACF-12 (Mandate) → ACF-06 (Kill Switch) → ACF-08 (Register). See the{" "}
              <em>deployment methodology</em> on the 6-18 month horizon.
            </>
          )}
        </li>
        <li>
          {fr ? (
            <>
              Côté <strong>formation</strong> : suivez ACF-13 (Cas Pratique Guidé) →
              ACF-14 (Guide Enseignant) avec les cinq cas pédagogiques sectoriels.
            </>
          ) : (
            <>
              For <strong>training</strong>: follow ACF-13 (Guided Practical Case) →
              ACF-14 (Teacher Guide) with the five sector-calibrated cases.
            </>
          )}
        </li>
        <li>
          {fr ? (
            <>
              Côté <strong>audit</strong> : ACF-10 (Audit 30 jours) puis ACF-11
              (Évaluation des Risques) puis ACF-15 (Simulation trimestrielle).
            </>
          ) : (
            <>
              For <strong>audit</strong>: ACF-10 (30-day Audit) then ACF-11 (Risk
              Assessment) then ACF-15 (Quarterly Simulation).
            </>
          )}
        </li>
      </ul>

      <h2 id="programmatic">{fr ? "Accès programmatique" : "Programmatic access"}</h2>
      <p>
        {fr ? (
          <>
            Chaque fiche est exposée par le serveur MCP sous l’URI{" "}
            <code>acf://fiche/ACF-XX</code> (ressource MCP signée). Pour l’interrogation
            avec contexte, utilisez l’outil <code>acf.fiche.lookup</code> qui retourne en
            plus les principes activés, la cellule de la matrice de correspondance et
            les fiches liées.
          </>
        ) : (
          <>
            Each card is exposed by the MCP server at <code>acf://fiche/ACF-XX</code>{" "}
            (signed MCP resource). For context-aware retrieval, use the{" "}
            <code>acf.fiche.lookup</code> tool, which additionally returns the activated
            principles, the matrix mapping cell, and the related cards.
          </>
        )}
      </p>
    </DocsPage>
  );
}
