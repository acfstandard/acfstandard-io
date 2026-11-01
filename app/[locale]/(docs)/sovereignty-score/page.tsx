import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { DIMENSIONS, SCORING_GUIDE } from "@/lib/sovereignty-score";

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
          ? "L’indice 0-100 de la fiche ACF-01. Il mesure la dépendance d’une organisation sur 4 dimensions notées chacune de 0 à 25 : technologique, acquisition, décisionnelle et financière. Plus il est élevé, plus l’organisation est exposée."
          : "The 0-100 index of card ACF-01. It measures an organisation's dependence across 4 dimensions, each scored from 0 to 25: technological, acquisition, decisional and financial. The higher it is, the more exposed the organisation."
      }
      badge={fr ? "KPI" : "KPI"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            On ne gouverne bien que ce que l'on a d'abord mesuré. Le{" "}
            <strong>ACF Sovereignty Score™</strong> ouvre le toolkit ACF® : avant d’agentifier
            quoi que ce soit, il dit jusqu’où l’organisation a déjà cédé du terrain, de sorte
            que la gouvernance précède l’automatisation.
          </>
        ) : (
          <>
            You can only govern well what you have first measured. The{" "}
            <strong>ACF Sovereignty Score™</strong> opens the ACF® toolkit: before agentifying
            anything, it shows how much ground the organisation has already ceded, so that
            governance comes before automation.
          </>
        )}
      </Callout>

      <h2 id="why">{fr ? "Ce qu'il mesure" : "What it measures"}</h2>
      <p>
        {fr
          ? "Le score ne mesure pas la modernité de l’organisation mais sa dépendance. Une organisation qui confie ses modèles à un seul fournisseur, ses clients à une marketplace, ses arbitrages à des systèmes non supervisés et son chiffre à quelques acteurs a déjà perdu une part de sa souveraineté, avant même son premier agent. L’indice est donc l’inverse de la souveraineté : plus il est haut, plus l’exposition est forte."
          : "The score measures dependence, not modernity. An organisation that entrusts its models to a single provider, its customers to a marketplace, its trade-offs to unsupervised systems and its revenue to a handful of players has already lost part of its sovereignty, before its first agent. The index is therefore the inverse of sovereignty: the higher it is, the greater the exposure."}
      </p>

      <h2 id="formula">{fr ? "La formule" : "The formula"}</h2>
      <p>
        {fr
          ? "Chaque dimension est notée de 0 (pleinement autonome) à 25 (totalement dépendant). L’indice est leur somme :"
          : "Each dimension is scored from 0 (fully autonomous) to 25 (fully dependent). The index is their sum:"}
      </p>
      <pre className="my-6 overflow-x-auto rounded-xl border border-bd-neutral bg-black/40 p-6 font-mono text-[14px] leading-relaxed text-gr-2">
        <code>{fr
          ? `Indice de dépendance = technologique + acquisition + décisionnelle + financière

chaque dimension de 0 à 25, indice de 0 à 100`
          : `Dependence index = technological + acquisition + decisional + financial

each dimension 0 to 25, index 0 to 100`}</code>
      </pre>

      <h2 id="dimensions">{fr ? "Les 4 dimensions de dépendance" : "The 4 dimensions of dependence"}</h2>
      <div className="not-prose my-6 space-y-3">
        {DIMENSIONS.map((d) => (
          <div key={d.id} className="rounded-xl border border-bd-neutral bg-navy-700 p-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-[16px] font-bold text-white">{fr ? d.labelFr : d.labelEn}</h3>
              <span className="font-mono text-[11px] uppercase tracking-wider text-gold">/ 25</span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-gr-2">{fr ? d.definitionFr : d.definitionEn}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-gr-2">
              {(fr ? d.questionsFr : d.questionsEn).map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p>
        {fr
          ? "Repère de cotation de la fiche : pour chaque dimension, comptez les questions auxquelles vous répondez « oui »."
          : "Scoring guide printed on the card: for each dimension, count the questions you answer “yes” to."}
      </p>
      <ul>
        {SCORING_GUIDE.map((g) => (
          <li key={g.range}>
            <strong>{g.range}</strong> · {fr ? g.fr : g.en}
          </li>
        ))}
      </ul>

      <h2 id="reading">{fr ? "Lecture de l'indice" : "Reading the index"}</h2>
      <div className="not-prose my-6 overflow-x-auto rounded-xl border border-bd-neutral">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-bd-neutral bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold">
                {fr ? "Indice" : "Index"}
              </th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold">
                {fr ? "Zone" : "Zone"}
              </th>
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-gold">
                {fr ? "Conduite à tenir" : "What to do"}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { range: "0-33", band: fr ? "Souveraineté maîtrisée" : "Sovereignty under control", note: fr ? "Agentification possible avec une gouvernance légère. Avancez vers ACF-02." : "Agentification is possible with light-touch governance. Proceed to ACF-02." },
              { range: "34-66", band: fr ? "Exposition modérée" : "Moderate exposure", note: fr ? "Gouvernez et réduisez les dépendances avant d’élargir l’autonomie des agents." : "Govern and reduce dependencies before expanding agent autonomy." },
              { range: "67-100", band: fr ? "Dépendance critique" : "Critical dependence", note: fr ? "Réduisez l’exposition avant toute nouvelle automatisation. Priorité absolue." : "Reduce your exposure before any further automation. Top priority." },
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
      <p>
        {fr
          ? "La dimension la plus dépendante est celle où se joue la souveraineté : la fiche demande d’y fixer trois actions concrètes, avec une échéance, avant de cartographier les décisions clés avec ACF-02 et d’évaluer leur criticité avec ACF-03."
          : "The most dependent dimension is where sovereignty is at stake: the card asks for three concrete actions on it, with a deadline, then for the key decisions to be mapped with ACF-02 and their criticality assessed with ACF-03."}
      </p>

      <h2 id="calculate">{fr ? "Calculez le vôtre" : "Calculate yours"}</h2>
      <p>
        {fr ? (
          <>
            La page <Link href="/sovereignty-score/calculate">/sovereignty-score/calculate</Link>{" "}
            reprend les 4 dimensions et les questions de la fiche. Le calcul se fait dans votre
            navigateur ; la fiche ACF-01 imprimable, téléchargeable sur acfstandard.com, sert à
            le consigner. Le serveur MCP expose la fiche par l’URI <code>acf://fiche/ACF-01</code>.
          </>
        ) : (
          <>
            The <Link href="/sovereignty-score/calculate">/sovereignty-score/calculate</Link>{" "}
            page takes the 4 dimensions and the questions of the card. The calculation runs in
            your browser; the printable ACF-01 card, downloadable on acfstandard.com, is where
            you record it. The MCP server exposes the card at <code>acf://fiche/ACF-01</code>.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Le score ne se confond pas avec l’ACF Score® d’acf-score.com, qui est un diagnostic de gouvernance agentique (maturité agentique, gouvernance et souveraineté, politique de décision, système d’agents, exécution et supervision, dépendances externes)."
          : "The score is distinct from the ACF Score® of acf-score.com, which is an agentic governance diagnostic (agentic maturity, governance and sovereignty, decision policy, agent system, execution and supervision, external dependencies)."}
      </p>
    </DocsPage>
  );
}
