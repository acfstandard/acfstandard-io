import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { SovereigntyCalculator } from "@/components/SovereigntyCalculator";

export default async function CalculatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Calculez votre ACF Sovereignty Score™" : "Calculate your ACF Sovereignty Score™"}
      description={
        fr
          ? "Notez chacune des 4 dimensions de dépendance de la fiche ACF-01, de 0 à 25, en vous aidant de ses deux questions. L’indice et sa zone se mettent à jour à chaque réglage. Aucune donnée ne quitte votre navigateur."
          : "Score each of the 4 dependency dimensions of card ACF-01, from 0 to 25, using its two questions. The index and its zone update with every change. No data leaves your browser."
      }
      badge={fr ? "Outil interactif" : "Interactive tool"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr
          ? "Conseil : réunissez les responsables technique, commerce, opérations et finance avant de coter, puisque chacun connaît la dépendance de son terrain."
          : "Tip: bring the technology, sales, operations and finance leads together before scoring, since each knows the dependence on their own ground."}
      </Callout>

      <SovereigntyCalculator />

      <h2 id="next">{fr ? "Et ensuite ?" : "What's next?"}</h2>
      <p>
        {fr ? (
          <>
            Reportez l’indice et les notes par dimension sur la fiche ACF-01 imprimable, puis
            fixez trois actions sur la dimension la plus dépendante. L’étape suivante du
            toolkit est la Carte Décisionnelle (ACF-02), suivie de la Matrice de Criticité
            (ACF-03). Voir les <Link href="/doctrine/fiches">45 fiches</Link>.
          </>
        ) : (
          <>
            Record the index and the per-dimension scores on the printable ACF-01 card, then
            set three actions on the most dependent dimension. The next step in the toolkit
            is the Decision Map (ACF-02), followed by the Criticality Matrix (ACF-03). See
            the <Link href="/doctrine/fiches">45 cards</Link>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
