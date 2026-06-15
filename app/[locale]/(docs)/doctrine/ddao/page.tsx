import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

export default async function DdaoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Le rôle DDAO" : "The DDAO role"}
      description={
        fr
          ? "DDAO — Delegated Decision Agent Officer. Pierre angulaire humaine d’ACF®. Personne physique (ou organe collégial) nommément désignée comme responsable d’un agent (ou d’un portefeuille d’agents) en production. Inspirée du DPO (RGPD art. 37-39) et du CISO."
          : "DDAO — Delegated Decision Agent Officer. The human cornerstone of ACF®. A named individual (or collegial body) responsible for an agent (or a portfolio of agents) in production. Inspired by the DPO (GDPR art. 37-39) and the CISO."
      }
      badge={fr ? "Doctrine" : "Doctrine"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr
          ? "Le DDAO n’est pas un titre marketing ni un rôle décoratif. C’est une personne identifiable nommément, qui engage la responsabilité juridique de l’entreprise pour les décisions de l’agent qu’elle supervise. Pour cette raison, ACF® impose que le DDAO soit indépendant de la chaîne hiérarchique de l’agent — comme le DPO l’est du Directeur du marketing."
          : "DDAO is not a marketing title nor a decorative role. It is a named, identifiable person who engages the legal liability of the company for the decisions of the agent they supervise. For that reason, ACF® requires the DDAO to be independent from the agent’s reporting chain — as the DPO is independent from the Director of Marketing."}
      </Callout>

      <h2 id="missions">{fr ? "Les quatre missions" : "The four missions"}</h2>
      <ol>
        <li>
          <strong>{fr ? "Validation des décisions critiques" : "Validation of critical decisions"}</strong>{" "}
          —{" "}
          {fr
            ? "que l’agent est conçu pour escalader (seuils ACF-12)."
            : "that the agent is designed to escalate (ACF-12 thresholds)."}
        </li>
        <li>
          <strong>{fr ? "Arbitrage en cas d’escalade non prévue" : "Arbitration on unplanned escalation"}</strong>{" "}
          —{" "}
          {fr
            ? "situation hors mandat, comportement de dérive, signal d’alerte du registre."
            : "off-mandate situation, drift behaviour, alert from the register."}
        </li>
        <li>
          <strong>{fr ? "Suivi des dérives" : "Drift monitoring"}</strong> —{" "}
          {fr
            ? "drift de modèle, drift de distribution des cas, drift de coûts."
            : "model drift, case distribution drift, cost drift."}
        </li>
        <li>
          <strong>{fr ? "Conduite des revues périodiques" : "Periodic reviews"}</strong>{" "}
          —{" "}
          {fr
            ? "trimestrielles a minima, sur le périmètre confié, avec rapport au comité de gouvernance."
            : "quarterly at least, on the assigned perimeter, with a report to the governance committee."}
        </li>
      </ol>

      <h2 id="profile">{fr ? "Profil attendu" : "Expected profile"}</h2>
      <p>
        {fr
          ? "Le DDAO est typiquement issu d’un des trois viviers suivants : (1) un DPO existant qui élargit son périmètre, (2) un CISO ou directeur d’audit interne, (3) un responsable conformité produit ou un product manager senior qui passe en posture de gouvernance. Aucun de ces profils n’est natif d’ACF® — la formation au cadre est explicite, via les fiches ACF-13 (Cas Pratique Guidé) et ACF-14 (Guide Enseignant)."
          : "The DDAO typically comes from one of three pools: (1) an existing DPO expanding their perimeter, (2) a CISO or internal audit director, (3) a product compliance lead or a senior product manager moving into a governance posture. None of these profiles is native to ACF® — formal training is explicit, via cards ACF-13 (Guided Practical Case) and ACF-14 (Teacher Guide)."}
      </p>

      <h2 id="independence">{fr ? "Indépendance" : "Independence"}</h2>
      <p>
        {fr
          ? "Le DDAO ne peut pas reporter au même responsable que l’agent qu’il supervise. Pour un agent de qualification de leads, le DDAO ne peut pas reporter au CMO. Pour un agent de scoring crédit, le DDAO ne peut pas reporter au directeur des risques crédit. L’architecture cible est un report direct à la direction générale, au DPO, ou au comité d’audit du conseil. Ce point est durci dans la fiche ACF-12 (Mandat d’Agent)."
          : "The DDAO cannot report to the same manager as the agent they supervise. For a lead-qualification agent, the DDAO cannot report to the CMO. For a credit-scoring agent, the DDAO cannot report to the head of credit risk. Target architecture is a direct report to general management, to the DPO, or to the board audit committee. This is hardened in card ACF-12 (Agent Mandate)."}
      </p>

      <h2 id="liability">{fr ? "Engagement de responsabilité" : "Liability"}</h2>
      <p>
        {fr
          ? "Comme pour le DPO RGPD, le DDAO ne porte pas la responsabilité juridique en lieu et place de l’entreprise — c’est l’entreprise qui répond. Mais le DDAO porte une responsabilité fonctionnelle : c’est lui qui doit pouvoir produire, à la demande, la trace cryptographique d’une décision précise, justifier les choix de seuils, et démontrer la conduite des revues. En cas d’audit AI Act, c’est lui (ou elle) qui est convoqué·e par le régulateur."
          : "As with the GDPR DPO, the DDAO does not bear legal liability in place of the company — the company answers for itself. But the DDAO carries functional liability: they must be able to produce, on request, the cryptographic trace of a specific decision, justify the threshold choices, and demonstrate that reviews were conducted. On an AI Act audit, they are the one summoned by the regulator."}
      </p>

      <h2 id="instrumentation">{fr ? "Instrumentation MCP" : "MCP instrumentation"}</h2>
      <p>
        {fr ? (
          <>
            Trois outils du serveur <code>acf-mcp</code> sont spécifiquement conçus pour
            le DDAO : <code>acf.assign-ddao-controls</code> (assigner les contrôles),{" "}
            <code>acf.evaluate-agent-mandate</code> (auditer un mandat existant),
            <code>acf.identify-governance-gaps</code> (identifier les manques avant audit
            externe). Un DDAO outillé peut conduire une revue trimestrielle en quelques
            heures plutôt qu’en quelques jours.
          </>
        ) : (
          <>
            Three <code>acf-mcp</code> tools are specifically designed for the DDAO:{" "}
            <code>acf.assign-ddao-controls</code> (assign controls),{" "}
            <code>acf.evaluate-agent-mandate</code> (audit an existing mandate),
            <code>acf.identify-governance-gaps</code> (find gaps before external audit).
            A tooled DDAO can run a quarterly review in hours instead of days.
          </>
        )}
      </p>
    </DocsPage>
  );
}
