import { setRequestLocale } from "next-intl/server";
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
      title={fr ? "Calculez votre Sovereignty Score™" : "Calculate your Sovereignty Score™"}
      description={
        fr
          ? "Ajustez les six curseurs en suivant la question posée pour chaque dimension. Le score composite et sa décomposition se mettent à jour en temps réel. Aucune donnée n’est envoyée à un serveur — le calcul tourne entièrement dans votre navigateur."
          : "Move the six sliders following the question for each dimension. The composite score and its breakdown update in real time. No data leaves your browser — the calculation runs entirely client-side."
      }
      badge={fr ? "Outil interactif" : "Interactive tool"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr
          ? "Conseil : commencez par la dimension qui vous fait le plus douter. Le score initial est positionné à 50 partout — il bouge dès le premier ajustement."
          : "Tip: start with the dimension you feel least sure about. The initial score sits at 50 across the board — it moves as soon as you make a first adjustment."}
      </Callout>

      <SovereigntyCalculator />

      <h2 id="next">{fr ? "Et ensuite ?" : "What's next?"}</h2>
      <p>
        {fr ? (
          <>
            Le score que vous venez d’estimer est utile pour une conversation interne
            (comité, DG, RSSI). Pour le rendre <strong>opposable</strong>, c’est-à-dire
            signé par un DDAO et inscrit au registre cryptographique de votre
            organisation, deux chemins :
          </>
        ) : (
          <>
            The score you just estimated is useful for an internal conversation
            (committee, CEO, CISO). To make it <strong>opposable</strong> — that is,
            signed by a DDAO and recorded in your organisation’s cryptographic register
            — two paths:
          </>
        )}
      </p>
      <ul>
        <li>
          {fr ? (
            <>
              Utilisez l’outil <code>acf.identify-governance-gaps</code> du serveur MCP{" "}
              <code>acf-mcp</code> — il retourne le score, le rationale par dimension,
              et la signature Ed25519 prêts à être inscrits au registre ACF-08.
            </>
          ) : (
            <>
              Use the <code>acf.identify-governance-gaps</code> tool from the{" "}
              <code>acf-mcp</code> MCP server — it returns the score, the per-dimension
              rationale and the Ed25519 signature, ready to be recorded in the ACF-08
              register.
            </>
          )}
        </li>
        <li>
          {fr
            ? "Faites un audit blanc avec une organisation certifiée ACF® — voir la page Certification (à venir)."
            : "Run a blind audit with an ACF®-certified organisation — see the Certification page (coming)."}
        </li>
      </ul>
    </DocsPage>
  );
}
