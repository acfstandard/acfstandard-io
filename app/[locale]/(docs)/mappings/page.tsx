import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { MappingMatrix } from "@/components/MappingMatrix";

export default async function MappingsOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Matrice de correspondance" : "Standards mapping matrix"}
      description={
        fr
          ? "Chaque fiche méthodologique ACF® est cartographiée sur cinq référentiels majeurs : EU AI Act, ISO/IEC 42001, NIST AI RMF, RGPD, COBIT 2019. Le mapping est conservateur — seul l’article principal est cité. La matrice complète, machine-lisible, est exposée par l’outil acf.regulation.article du serveur MCP."
          : "Every ACF® methodological card is mapped to five major standards: EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, COBIT 2019. The mapping is conservative — only the principal article is cited. The full machine-readable matrix is exposed via the acf.regulation.article MCP tool."
      }
      badge={fr ? "Référence" : "Reference"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Tapez dans le filtre pour réduire la matrice à une fiche, un article ou un
            mot-clé (« kill switch », « art. 22 », « audit »…). Cliquez sur n’importe
            quelle cellule pour la mettre en évidence. Toggle les colonnes de référentiel
            pour comparer deux standards côte à côte.
          </>
        ) : (
          <>
            Type into the filter to narrow the matrix to a fiche, an article, or a
            keyword (“kill switch”, “art. 22”, “audit”…). Click any cell to highlight
            it. Toggle the standard columns to compare two frameworks side by side.
          </>
        )}
      </Callout>

      <MappingMatrix />

      <h2 id="how-to-read">{fr ? "Comment lire la matrice" : "How to read the matrix"}</h2>
      <p>
        {fr
          ? "La fiche ACF-08 (Registre des Décisions Agentiques) implémente directement l’obligation de l’article 12 de l’EU AI Act sur l’enregistrement automatique des évènements et l’article 26(6) sur la conservation des logs pendant au moins six mois par le déployeur. Côté ISO/IEC 42001, elle relève de la clause 9.1 (monitoring, measurement, analysis, evaluation). Côté NIST AI RMF de la fonction MEASURE-2. Côté RGPD de l’article 30 (registre des activités de traitement). Côté COBIT de l’objectif MEA-01."
          : "ACF-08 (Agentic Decision Register) directly implements the EU AI Act Art. 12 obligation on automatic event logging and Art. 26(6) on six-month log retention by the deployer. ISO/IEC 42001-side, it falls under clause 9.1 (monitoring, measurement, analysis, evaluation). NIST AI RMF-side, MEASURE-2. GDPR-side, Art. 30 (record of processing activities). COBIT-side, MEA-01."}
      </p>
      <p>
        {fr
          ? "Une équipe conformité qui déploie ACF-08 produit en même temps les pièces que ces cinq référentiels exigent. C’est l’économie d’échelle que la matrice rend opérationnelle."
          : "A compliance team that deploys ACF-08 produces, in one motion, the artifacts that all five standards demand. That is the economy of scale the matrix makes operational."}
      </p>

      <h2 id="api-access">{fr ? "Accès programmatique" : "Programmatic access"}</h2>
      <p>
        {fr
          ? "Cette matrice est dérivée du même JSON que celui consommé par le serveur MCP. Pour la consommer dans un agent IA, utilisez l’outil acf.regulation.article et passez un identifiant d’article (par exemple AI Act Art. 9) ; vous obtenez le texte vérifié + la liste des fiches ACF® qui l’opérationnalisent + leurs cellules de mapping pour les quatre autres référentiels."
          : "This matrix is derived from the same JSON consumed by the MCP server. To consume it inside an AI agent, use the acf.regulation.article tool and pass an article identifier (e.g. AI Act Art. 9); you get the verified text + the list of ACF® fiches operationalising it + their mapping cells for the other four standards."}
      </p>

      <h2 id="versioning">{fr ? "Versionnage" : "Versioning"}</h2>
      <p>
        {fr ? (
          <>
            Le mapping est versionné avec la doctrine. La version courante est intégrée à
            chaque <code>doctrine_hash</code> émis par <code>acf-mcp</code>. Quand un
            standard évolue (ex. amendement de l’AI Act), une nouvelle{" "}
            <code>doctrine_version</code> est émise et la signature change. Les versions
            antérieures restent vérifiables.
          </>
        ) : (
          <>
            The mapping is versioned with the doctrine. The current version is embedded
            in every <code>doctrine_hash</code> emitted by <code>acf-mcp</code>. When a
            standard evolves (e.g. AI Act amendment), a new <code>doctrine_version</code>{" "}
            ships and the signature changes. Prior versions stay verifiable.
          </>
        )}
      </p>
    </DocsPage>
  );
}
