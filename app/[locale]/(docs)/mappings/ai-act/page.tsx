import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { StandardView } from "@/components/StandardView";

export default async function AiActMappingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";
  return (
    <DocsPage
      title={fr ? "ACF® × EU AI Act" : "ACF® × EU AI Act"}
      description={
        fr
          ? "Mapping conservateur des 17 fiches méthodologiques ACF® sur l’article principal de l’EU AI Act qu’elles opérationnalisent. Pour la vue multi-référentiel et le filtre interactif, voir /mappings."
          : "Conservative mapping of the 17 ACF® methodological cards to the principal EU AI Act article they operationalise. For the multi-standard view and interactive filter, see /mappings."
      }
      badge={fr ? "Correspondance" : "Mapping"}
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr
          ? "L’enforcement haut-risque entre en vigueur le 2 décembre 2027 pour les systèmes Annex III. Une organisation qui exploite un agent dans les services essentiels (crédit, assurance, énergie, santé, justice) doit pouvoir produire à cette date la trace cryptographique complète de chaque décision agentique. ACF® est conçu pour qu’aucune ligne d’audit ne manque à ce moment-là."
          : "High-risk enforcement starts December 2, 2027 for Annex III systems. An organisation operating an agent in essential services (credit, insurance, energy, health, justice) must, by that date, be able to produce the complete cryptographic trace of every agentic decision. ACF® is designed so that no audit line is missing on that date."}
      </Callout>
      <StandardView standard="ai-act" locale={fr ? "fr" : "en"} />
    </DocsPage>
  );
}
