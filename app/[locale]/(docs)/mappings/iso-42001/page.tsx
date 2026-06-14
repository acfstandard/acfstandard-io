import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { StandardView } from "@/components/StandardView";

export default async function Iso42001MappingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";
  return (
    <DocsPage
      title={fr ? "ACF® × ISO/IEC 42001" : "ACF® × ISO/IEC 42001"}
      description={
        fr
          ? "Mapping des 17 fiches ACF® sur la clause ou l’annexe ISO/IEC 42001:2023 correspondante. Pour les organisations visant la certification, ACF® fournit le matériau opérationnel qui alimente le système de management AI."
          : "Mapping of the 17 ACF® cards to the corresponding ISO/IEC 42001:2023 clause or annex. For organisations targeting certification, ACF® provides the operational material that feeds the AI management system."
      }
      badge={fr ? "Correspondance" : "Mapping"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr
          ? "ISO 42001 est certifiable. Un cabinet d’audit certifié peut auditer votre conformité. Le mapping ci-dessous est ce qu’un auditeur attend de voir produit comme preuve pour chaque clause."
          : "ISO 42001 is certifiable. A certified audit firm can audit your conformity. The mapping below is what an auditor expects to see produced as evidence for each clause."}
      </Callout>
      <StandardView standard="iso-42001" locale={fr ? "fr" : "en"} />
    </DocsPage>
  );
}
