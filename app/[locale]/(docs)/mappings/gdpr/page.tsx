import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { StandardView } from "@/components/StandardView";

export default async function GdprMappingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";
  return (
    <DocsPage
      title={fr ? "ACF® × RGPD" : "ACF® × GDPR"}
      description={
        fr
          ? "Mapping des 17 fiches ACF® sur les articles RGPD pivots pour les systèmes agentiques — notamment Art. 22 (décision automatisée individuelle), Art. 30 (registre), Art. 35 (AIPD), Art. 37-39 (DPO)."
          : "Mapping of the 17 ACF® cards to the GDPR articles pivotal for agentic systems — notably Art. 22 (automated individual decisions), Art. 30 (records), Art. 35 (DPIA), Art. 37-39 (DPO)."
      }
      badge={fr ? "Correspondance" : "Mapping"}
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr
          ? "L’article 22 du RGPD interdit en principe les décisions individuelles entièrement automatisées produisant des effets juridiques ou similaires. Toute architecture agentique qui s’en approche doit pouvoir démontrer (a) le consentement explicite, OU (b) la nécessité contractuelle, OU (c) une habilitation par le droit national — et dans tous les cas, le droit à intervention humaine est non-négociable. La fiche ACF-01 (Carte Décisionnelle) est conçue précisément pour ce test."
          : "GDPR Art. 22 prohibits, in principle, individual decisions made entirely by automated means that produce legal or similarly significant effects. Any agentic architecture that approaches this must demonstrate (a) explicit consent, OR (b) contractual necessity, OR (c) authorisation by Member-State law — and in every case, the right to human intervention is non-negotiable. Card ACF-01 (Decision Map) is designed precisely for this test."}
      </Callout>
      <StandardView standard="gdpr" locale={fr ? "fr" : "en"} />
    </DocsPage>
  );
}
