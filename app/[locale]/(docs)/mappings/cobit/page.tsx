import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { StandardView } from "@/components/StandardView";

export default async function CobitMappingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";
  return (
    <DocsPage
      title={fr ? "ACF® × COBIT 2019" : "ACF® × COBIT 2019"}
      description={
        fr
          ? "Mapping des 17 fiches ACF® sur les objectifs de gouvernance et de management COBIT 2019. C’est le pont entre la gouvernance agentique et l’audit IT classique de votre organisation."
          : "Mapping of the 17 ACF® cards to the COBIT 2019 governance and management objectives. This is the bridge between agentic governance and your organisation’s classical IT audit."
      }
      badge={fr ? "Correspondance" : "Mapping"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr
          ? "Si votre fonction d’audit interne est outillée COBIT, ACF® s’y branche naturellement : EDM-01 pour la charte agentique, MEA-01 pour le registre signé, BAI-09 pour la fiche agent, DSS-02 pour le kill switch. Aucune réécriture du référentiel d’audit n’est nécessaire — ACF® documente ses livrables dans le vocabulaire que vos auditeurs connaissent déjà."
          : "If your internal audit function runs on COBIT, ACF® plugs into it naturally: EDM-01 for the agentic charter, MEA-01 for the signed register, BAI-09 for the agent card, DSS-02 for the kill switch. No rewrite of the audit framework is needed — ACF® documents its artifacts in the vocabulary your auditors already use."}
      </Callout>
      <StandardView standard="cobit" locale={fr ? "fr" : "en"} />
    </DocsPage>
  );
}
