import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { StandardView } from "@/components/StandardView";

export default async function NistMappingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";
  return (
    <DocsPage
      title={fr ? "ACF® × NIST AI RMF" : "ACF® × NIST AI RMF"}
      description={
        fr
          ? "Mapping des 17 fiches ACF® sur les fonctions et sous-fonctions du NIST AI Risk Management Framework 1.0 (GOVERN, MAP, MEASURE, MANAGE)."
          : "Mapping of the 17 ACF® cards to the functions and sub-functions of the NIST AI Risk Management Framework 1.0 (GOVERN, MAP, MEASURE, MANAGE)."
      }
      badge={fr ? "Correspondance" : "Mapping"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr
          ? "Le NIST AI RMF est volontaire mais largement utilisé comme baseline contractuelle, notamment dans les marchés publics américains et chez les grands intégrateurs. ACF® rend l’adhésion concrète : chaque sous-fonction NIST correspond à une fiche pré-remplissable plutôt qu’à un workshop à recommencer."
          : "The NIST AI RMF is voluntary but widely used as a contractual baseline, notably in US federal procurement and at large integrators. ACF® makes adherence concrete: every NIST sub-function maps to a pre-fillable card, not a workshop to redo."}
      </Callout>
      <StandardView standard="nist-rmf" locale={fr ? "fr" : "en"} />
    </DocsPage>
  );
}
