import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { DIMENSIONS } from "@/lib/sovereignty-score";

export default async function SovereigntyScorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title="ACF Sovereignty Score™"
      description={
        fr
          ? "Le KPI manquant de la gouvernance agentique. Une mesure 0-100 de la souveraineté décisionnelle effectivement conservée par votre organisation sur ses agents IA en production. Six dimensions pondérées, calibrées sur les fiches ACF® et les obligations EU AI Act."
          : "The missing KPI of agentic governance. A 0-100 measure of the decisional sovereignty your organisation actually retains over its production AI agents. Six weighted dimensions, calibrated on the ACF® cards and the EU AI Act obligations."
      }
      badge={fr ? "KPI" : "KPI"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Tout le monde mesure son ROI, son NPS, son CAC. Personne ne mesure la
            <strong> souveraineté décisionnelle</strong> sur ses agents IA — et c’est
            exactement ce sur quoi les régulateurs vont demander des comptes à partir du
            2 décembre 2027. Le <strong>ACF Sovereignty Score™</strong> est conçu pour entrer
            dans la conversation DAF / RSSI / DDAO comme un nombre qui se discute.
          </>
        ) : (
          <>
            Every organisation measures ROI, NPS, CAC. None measures the
            <strong> decisional sovereignty</strong> retained over its AI agents — and
            that is exactly what regulators will start asking for on December 2, 2027.
            The <strong>ACF Sovereignty Score™</strong> is designed to enter the CFO / CISO
            / DDAO conversation as a number that can be discussed.
          </>
        )}
      </Callout>

      <h2 id="why">{fr ? "Pourquoi un nouveau KPI" : "Why a new KPI"}</h2>
      <p>
        {fr
          ? "Une organisation déploie un agent qui qualifie ses leads, fixe ses prix, ouvre des crédits ou réserve des vols. La question stratégique n’est pas « combien fait-il économiser » — la réponse est facile et évolue chaque trimestre. La question stratégique est : combien de souveraineté décisionnelle avons-nous gardée sur lui ?"
          : "An organisation deploys an agent that qualifies leads, sets prices, opens credit lines or books flights. The strategic question is not “how much money does it save” — that answer is easy and shifts every quarter. The strategic question is: how much decisional sovereignty have we kept over it?"}
      </p>
      <p>
        {fr
          ? "Le ACF Sovereignty Score™ rend cette question quantifiable et comparable. Comme NPS l’a fait pour la satisfaction client en 2003, comme l’eNPS l’a fait pour l’engagement collaborateur, le ACF Sovereignty Score™ donne aux comités de gouvernance, aux conseils d’administration et aux régulateurs un nombre unique sur lequel raisonner."
          : "The ACF Sovereignty Score™ makes that question quantifiable and comparable. The way NPS did for customer satisfaction in 2003, the way eNPS did for employee engagement, the ACF Sovereignty Score™ gives governance committees, boards and regulators a single number to reason about."}
      </p>

      <h2 id="formula">{fr ? "La formule" : "The formula"}</h2>
      <p>
        {fr ? (
          <>
            Score composite, échelle 0-100, calculé sur six dimensions pondérées. Chaque
            dimension est ancrée à une <Link href="/doctrine/17-fiches">fiche ACF®</Link>{" "}
            et notée 0-100. Le score final est la moyenne pondérée :
          </>
        ) : (
          <>
            Composite score, 0-100 scale, computed across six weighted dimensions. Each
            dimension is anchored to an{" "}
            <Link href="/doctrine/17-fiches">ACF® card</Link> and rated 0-100. The final
            score is the weighted mean:
          </>
        )}
      </p>
      <pre className="my-6 overflow-x-auto rounded-xl border border-bd-neutral bg-black/40 p-6 font-mono text-[14px] leading-relaxed text-gr-2">
        <code>{`ACF Sovereignty Score™ = Σ ( weight_i × dimension_i )

where Σ weight_i = 1.00`}</code>
      </pre>

      <h2 id="dimensions">{fr ? "Les six dimensions" : "The six dimensions"}</h2>
      <div className="not-prose my-6 space-y-3">
        {DIMENSIONS.map((d) => (
          <div
            key={d.id}
            className="rounded-xl border border-bd-neutral bg-navy-700 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <code className="font-mono text-[11px] uppercase tracking-wider text-gold">
                    {d.ficheRef}
                  </code>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gr">
                    weight {(d.weight * 100).toFixed(0)}%
                  </span>
                </div>
                <h3 className="mt-1 font-display text-[16px] font-bold text-white">
                  {fr ? d.labelFr : d.labelEn}
                </h3>
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-gr-2">
              {fr ? d.questionFr : d.questionEn}
            </p>
          </div>
        ))}
      </div>

      <h2 id="reading">{fr ? "Lecture des scores" : "Reading the scores"}</h2>
      <div className="not-prose my-6 overflow-x-auto rounded-xl border border-bd-neutral">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-bd-neutral bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold">
                Score
              </th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold">
                {fr ? "Bande" : "Band"}
              </th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold">
                {fr ? "Interprétation" : "Reading"}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { range: "0–19",  band: fr ? "Exposition critique" : "Critical exposure",   note: fr ? "Aucun cadre. Risque AI Act et RGPD majeur."             : "No frame. Major AI Act and GDPR risk." },
              { range: "20–39", band: fr ? "Souveraineté faible"  : "Weak sovereignty",   note: fr ? "Bouts de fiches isolés. Pas de DDAO actif."             : "Scattered cards. No active DDAO." },
              { range: "40–59", band: fr ? "Contrôle fragile"     : "Fragile control",    note: fr ? "Cadre en construction. Audit blanc imminent recommandé." : "Frame under construction. Blind audit recommended." },
              { range: "60–79", band: fr ? "Souveraineté contrôlée":"Controlled sovereignty",note: fr ? "Niveau N2 cible atteint. Optimisations possibles."     : "N2 target reached. Optimisations possible." },
              { range: "80–100",band: fr ? "Souveraineté pleine"  : "Full sovereignty",   note: fr ? "Niveau de référence ACF® — éligible à la certification Level 2/3." : "ACF® reference level — eligible for Level 2/3 certification." },
            ].map((row, i) => (
              <tr key={i} className="border-b border-bd-neutral/50 last:border-0">
                <td className="px-4 py-3 align-top font-mono text-[12px] text-white">{row.range}</td>
                <td className="px-4 py-3 align-top font-display text-[13px] font-bold text-white">{row.band}</td>
                <td className="px-4 py-3 align-top text-[13px] text-gr-2">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="calculate">{fr ? "Calculez le vôtre" : "Calculate yours"}</h2>
      <p>
        {fr ? (
          <>
            La page <Link href="/sovereignty-score/calculate">/sovereignty-score/calculate</Link>{" "}
            propose un calculateur interactif avec les six dimensions. C’est un outil
            d’estimation rapide — pour un score opposable signé par le DDAO, utilisez
            l’outil MCP <code>acf.identify-governance-gaps</code> qui retourne en plus
            le rationale par dimension et la signature Ed25519.
          </>
        ) : (
          <>
            The <Link href="/sovereignty-score/calculate">/sovereignty-score/calculate</Link>{" "}
            page offers an interactive calculator across the six dimensions. It’s a
            quick estimation tool — for an opposable, DDAO-signed score, use the MCP
            tool <code>acf.identify-governance-gaps</code>, which also returns the
            per-dimension rationale and the Ed25519 signature.
          </>
        )}
      </p>

      <h2 id="benchmark">{fr ? "Le Sovereignty Index" : "The Sovereignty Index"}</h2>
      <p>
        {fr ? (
          <>
            Le <Link href="/sovereignty-index">Sovereignty Index</Link> publie chaque
            année les scores médians par secteur (banque, assurance, retail, santé,
            services publics…) à partir d’un échantillon anonymisé d’organisations qui
            ont calculé leur score via l’outil MCP. Premier rapport prévu pour Q4 2026.
          </>
        ) : (
          <>
            The <Link href="/sovereignty-index">Sovereignty Index</Link> publishes the
            median scores per industry (banking, insurance, retail, healthcare, public
            services…) every year, from an anonymised sample of organisations who have
            scored themselves via the MCP tool. First report scheduled for Q4 2026.
          </>
        )}
      </p>
    </DocsPage>
  );
}
