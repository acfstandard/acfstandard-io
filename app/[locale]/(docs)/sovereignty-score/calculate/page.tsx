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
      title={fr ? "Calculez votre ACF Sovereignty Score™" : "Calculate your ACF Sovereignty Score™"}
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
            (comité, DG, RSSI). Pour en faire un enregistrement gouverné et{" "}
            <strong>vérifiable indépendamment</strong> — porté par votre DDAO et inscrit
            au registre de décisions de votre organisation — deux chemins :
          </>
        ) : (
          <>
            The score you just estimated is useful for an internal conversation
            (committee, CEO, CISO). To turn it into a governed,{" "}
            <strong>independently verifiable</strong> record — carried by your DDAO and
            entered in your organisation’s decision register — two paths:
          </>
        )}
      </p>
      <ul>
        <li>
          {fr ? (
            <>
              Utilisez l’outil <code>acf.identify-governance-gaps</code> du serveur MCP{" "}
              <code>acf-mcp</code> — il retourne une analyse de gaps par dimension, un
              score de maturité et le rationale, authentifiés par la signature Ed25519
              de la doctrine ACF® (vérifiable hors-ligne). C’est la base à verser à votre
              registre ACF-08 ; la signature par votre DDAO et l’horodatage de
              l’enregistrement relèvent d’ACF Compliance, pas du serveur MCP.
            </>
          ) : (
            <>
              Use the <code>acf.identify-governance-gaps</code> tool from the{" "}
              <code>acf-mcp</code> MCP server — it returns a per-dimension gap analysis,
              a maturity score and the rationale, authenticated by ACF®’s Ed25519
              doctrine signature (verifiable offline). That’s the input for your ACF-08
              register; signing by your DDAO and timestamping of the record are handled
              by ACF Compliance, not the MCP server.
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
