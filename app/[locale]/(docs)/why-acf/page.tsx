import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

const WITHOUT_BULLETS: { fr: string; en: string }[] = [
  { fr: "À 3h14 du matin, votre agent de scoring crédit refuse 847 prêts en cascade, et personne ne peut reconstituer la décision le lendemain.", en: "At 3:14 AM, your credit-scoring agent refuses 847 loans in cascade, and no one can reconstruct the decision the next day." },
  { fr: "L'agent service client a promis un remboursement de 4 200 € à un client, puis le redéploiement a effacé la trace de la promesse.", en: "The customer service agent promised a 4,200 euros refund, then the redeploy wiped any trace of the commitment." },
  { fr: "Votre agent achats vient de signer un contrat de 540 000 € avec un fournisseur sous sanctions UE, sans contrôle préalable documenté.", en: "Your procurement agent just signed a 540,000 euros contract with an EU-sanctioned supplier, with no documented pre-screening." },
  { fr: "Quand l'auditeur demande qui répond civilement, la réponse part en boucle de blâme entre la DSI, le fournisseur du modèle et le métier.", en: "When the auditor asks who bears civil liability, the answer loops between IT, the model vendor, and the business unit." },
  { fr: "Votre assureur D&O relève la prime de 38 % au 2 décembre 2027, faute de pouvoir évaluer le risque agentique de manière indépendante.", en: "Your D&O insurer raises the premium by 38 percent on December 2, 2027, unable to assess agentic risk independently." },
];

const WITH_BULLETS: { fr: string; en: string }[] = [
  { fr: "La décision de 3h14 porte une signature Ed25519, un hash SHA-256 chaîné, et le nom du DDAO qui en répond civilement.", en: "The 3:14 AM decision carries an Ed25519 signature, a chained SHA-256 hash, and the name of the DDAO who bears civil liability." },
  { fr: "La promesse de remboursement déclenche le kill switch de niveau 2, mappé sur la fiche ACF-11, archivé avant tout redéploiement.", en: "The refund commitment triggers the level 2 kill switch, mapped to card ACF-11, archived before any redeploy." },
  { fr: "Le contrat fournisseur est classifié N1 et non N3, ce qui rend la fiche ACF-09 « screening sanctions » obligatoire avant signature.", en: "The supplier contract is classified N1 not N3, making the ACF-09 sanctions-screening card mandatory before signature." },
  { fr: "L'auditeur reçoit en 30 secondes un PDF signé, mappé sur AI Act, ISO 42001, NIST AI RMF, RGPD et COBIT.", en: "The auditor receives a signed PDF in 30 seconds, mapped to EU AI Act, ISO 42001, NIST AI RMF, GDPR, and COBIT." },
  { fr: "Votre Sovereignty Score passe de 34 à 78 en six mois, et l'assureur D&O maintient la prime au niveau de 2026.", en: "Your Sovereignty Score moves from 34 to 78 in six months, and the D&O insurer holds the premium at 2026 levels." },
];

const THREE_ANSWERS = [
  { levelFr: "Niveau 1 — Le silence", levelEn: "Level 1 — Silence", answerFr: "« On va voir avec les équipes d'ingénierie et on vous revient. »", answerEn: "“We'll check with the engineering team and get back to you.”", consequenceFr: "Amende AI Act jusqu'à 35 M€ ou 7 % du chiffre d'affaires mondial, Les Echos sous 72 heures, démission du DPO la semaine suivante.", consequenceEn: "EU AI Act fine up to 35 million euros or 7 percent of global turnover, front page of Les Echos within 72 hours, DPO resignation the following week.", band: "red" },
  { levelFr: "Niveau 2 — Les logs applicatifs", levelEn: "Level 2 — Application logs", answerFr: "« Nous avons des logs applicatifs, on peut vous les exporter. »", answerEn: "“We have application logs, we can export them for you.”", consequenceFr: "Logs inopposables au titre de l'article 1366 du Code civil, audit forensique imposé à 400 K€, dossier de défense de 18 mois.", consequenceEn: "Logs inadmissible under article 1366 of the French Civil Code, forced forensic audit at 400,000 euros, 18-month defense file.", band: "yellow" },
  { levelFr: "Niveau 3 — La preuve cryptographique", levelEn: "Level 3 — Cryptographic proof", answerFr: "« Voici le PDF signé Ed25519, vous pouvez le vérifier indépendamment avec la clé publique. »", answerEn: "“Here is the Ed25519-signed PDF, you can verify it independently with the public key.”", consequenceFr: "Dossier clos en 12 minutes au lieu de 12 semaines, aucune provision comptable, prime D&O maintenue par l'assureur.", consequenceEn: "Case closed in 12 minutes instead of 12 weeks, zero accounting provision, D&O premium held by the insurer.", band: "green" },
] as const;

const TRUST_PROPERTIES = [
  { titleFr: "Identité signée", titleEn: "Signed identity", bodyFr: "Chaque décision agentique est signée Ed25519 et porte le nom du DDAO qui en répond civilement ; aucune autonomie anonyme n'est admise par le standard.", bodyEn: "Every agentic decision is Ed25519-signed and carries the name of the DDAO who bears civil liability; no anonymous autonomy is permitted by the standard." },
  { titleFr: "Vérification réplicable", titleEn: "Replicable verification", bodyFr: "Le chaînage SHA-256 et les 34 ressources signées par acf-mcp permettent à un tiers, des années plus tard, de rejouer la vérification sans dépendre de vous.", bodyEn: "The SHA-256 hash chain and the 34 signed acf-mcp resources let a third party, years later, replay the verification without depending on you." },
  { titleFr: "Trace opposable", titleEn: "Opposable trace", bodyFr: "Le mapping 17 × 5 sur AI Act, ISO 42001, NIST AI RMF, RGPD et COBIT transforme la trace en preuve juridique opposable, pas en simple log technique.", bodyEn: "The 17 by 5 mapping across EU AI Act, ISO 42001, NIST AI RMF, GDPR, and COBIT turns the trace into an opposable legal proof, not a mere technical log." },
];

const BAND_STYLES = {
  red:    { border: "border-red-400/40",     bg: "bg-red-400/[0.05]",     label: "text-red-300",     levelFont: "text-red-300"     },
  yellow: { border: "border-yellow-400/40",  bg: "bg-yellow-400/[0.05]",  label: "text-yellow-300",  levelFont: "text-yellow-300"  },
  green:  { border: "border-emerald-400/40", bg: "bg-emerald-400/[0.05]", label: "text-emerald-300", levelFont: "text-emerald-300" },
};

export default async function WhyAcfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={
        fr
          ? "Pourquoi ACF existe en 90 secondes"
          : "Why ACF exists in 90 seconds"
      }
      description={
        fr
          ? "Pour les comités exécutifs, pas pour les architectes. La question que votre auditeur posera le 2 décembre 2027, les trois réponses possibles, et l'infrastructure de confiance qui vous met en Niveau 3 par construction."
          : "Written for executive committees, not architects. The question your auditor will ask on December 2, 2027, the three possible answers, and the trust infrastructure that puts you at Level 3 by construction."
      }
      badge={fr ? "Pour dirigeants" : "For executives"}
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            <strong>« Montrez-moi, maintenant, la trace cryptographique de la décision
            prise par votre agent IA à 3h14, lorsqu'il a révoqué la ligne de crédit du
            client Dupont-Mercier ; je veux le hash, la signature, le modèle, le prompt,
            et le nom de la personne physique qui en porte la responsabilité civile. »</strong>{" "}
            — Votre auditeur, le 17 mars 2027, 14h12.
            <br />
            <br />
            Ce n'est pas une hypothèse : l'application des obligations « haut risque » de
            l'AI Act européen commence le <strong>2 décembre 2027</strong>.
          </>
        ) : (
          <>
            <strong>“Show me, right now, the cryptographic trace of the decision your AI
            agent took at 3:14 AM when it revoked the credit line of customer
            Dupont-Mercier; I want the hash, the signature, the model, the prompt, and
            the name of the natural person bearing civil liability.”</strong>{" "}
            — Your auditor, March 17, 2027, 2:12 PM.
            <br />
            <br />
            This is not hypothetical: EU AI Act high-risk enforcement begins{" "}
            <strong>December 2, 2027</strong>.
          </>
        )}
      </Callout>

      <h2 id="two-pictures">
        {fr ? "Deux photos au 2 décembre 2027" : "Two snapshots on December 2, 2027"}
      </h2>
      <div className="not-prose my-8 grid gap-6 md:grid-cols-2">
        {/* Without ACF */}
        <div className="rounded-xl border border-red-400/40 bg-red-400/[0.05] p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-red-300">
            {fr ? "Sans ACF" : "Without ACF"}
          </p>
          <h3 className="mt-2 font-display text-[20px] font-bold text-white">
            {fr ? "Sans ACF, le 2 décembre 2027" : "Without ACF, on December 2, 2027"}
          </h3>
          <ul className="mt-5 space-y-3.5">
            {WITHOUT_BULLETS.map((b, i) => (
              <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-gr-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                <span>{fr ? b.fr : b.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* With ACF */}
        <div className="rounded-xl border border-gold/40 bg-gold/[0.05] p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {fr ? "Avec ACF" : "With ACF"}
          </p>
          <h3 className="mt-2 font-display text-[20px] font-bold text-white">
            {fr ? "Avec ACF, le même 2 décembre 2027" : "With ACF, on the same December 2, 2027"}
          </h3>
          <ul className="mt-5 space-y-3.5">
            {WITH_BULLETS.map((b, i) => (
              <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-gr-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                <span>{fr ? b.fr : b.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 id="three-answers">
        {fr ? "Trois réponses possibles" : "Three possible answers"}
      </h2>
      <p>
        {fr
          ? "L'auditeur pose la question. Vous avez trois réponses possibles, dans l'ordre croissant de défendabilité — et trois conséquences financières correspondantes."
          : "The auditor asks. You have three possible answers, in increasing order of defensibility — and three matching financial consequences."}
      </p>
      <div className="not-prose my-8 space-y-4">
        {THREE_ANSWERS.map((a, i) => {
          const s = BAND_STYLES[a.band];
          return (
            <div key={i} className={`rounded-xl border ${s.border} ${s.bg} p-6`}>
              <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${s.label}`}>
                {fr ? a.levelFr : a.levelEn}
              </p>
              <p className="mt-3 font-display text-[16px] italic text-white">
                {fr ? a.answerFr : a.answerEn}
              </p>
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gr">
                  {fr ? "Conséquence" : "Consequence"}
                </p>
                <p className={`mt-1 text-[14px] leading-relaxed ${s.levelFont}`}>
                  {fr ? a.consequenceFr : a.consequenceEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h2 id="trust-infrastructure">
        {fr ? "ACF est une infrastructure de confiance" : "ACF is a trust infrastructure"}
      </h2>
      <p>
        {fr
          ? "ACF n'est pas un framework que vous déployez. C'est une infrastructure de confiance à laquelle vous adhérez, au même titre que TLS l'est pour le web ou SWIFT pour le règlement interbancaire. Le standard ne vit pas dans vos serveurs : il vit dans la capacité de tout tiers à vérifier, des années plus tard, qu'une décision agentique a bien eu lieu, qui l'a portée, et selon quelle doctrine."
          : "ACF is not a framework you deploy. It is a trust infrastructure you join, the way TLS exists for the web or SWIFT for interbank settlement. The standard does not live in your servers; it lives in any third party's ability to verify, years later, that an agentic decision occurred, who carried it, and under which doctrine."}
      </p>
      <div className="not-prose my-8 grid gap-4 md:grid-cols-3">
        {TRUST_PROPERTIES.map((p, i) => (
          <div key={i} className="rounded-xl border border-bd-neutral bg-navy-700 p-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-display text-[16px] font-bold text-white">
              {fr ? p.titleFr : p.titleEn}
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-gr-2">
              {fr ? p.bodyFr : p.bodyEn}
            </p>
          </div>
        ))}
      </div>

      <h2 id="closing">{fr ? "Le choix au 2 décembre 2027" : "The choice on December 2, 2027"}</h2>
      <p>
        {fr
          ? "Au 2 décembre 2027, deux groupes d'entreprises coexisteront : celles qui auront tenté de construire seules leur audit trail, lentes et contestées à chaque inspection, et celles qui auront rejoint la couche de confiance et seront opposables en 12 minutes. ACF vous met dans le second groupe par construction, et non par chance."
          : "By December 2, 2027, two groups of companies will coexist: those who tried to build their audit trail alone, slow and contested at every inspection, and those who joined the trust layer and stand opposable in 12 minutes. ACF puts you in the second group by construction, not by luck."}
      </p>

      <div className="not-prose my-10 flex flex-wrap gap-4">
        <Link
          href="/sovereignty-score/calculate"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 font-display text-[14px] font-bold text-navy-900 transition hover:bg-gold-light hover:shadow-[0_8px_30px_var(--gold-glow)]"
        >
          {fr ? "Calculer notre Sovereignty Score™" : "Calculate our Sovereignty Score™"}
        </Link>
        <Link
          href="/docs/introduction"
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.18] px-7 py-3.5 font-display text-[14px] font-semibold text-white transition hover:border-gold hover:text-gold"
        >
          {fr ? "Voir la méthodologie" : "See the methodology"}
        </Link>
      </div>

      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Pour vos équipes techniques : la signature Ed25519, la chaîne SHA-256, et le
            protocole d'horodatage RFC 3161 sont documentés sur la page{" "}
            <Link href="/signatures">/signatures</Link>. La cartographie 17 × 5 sur les
            cinq référentiels est sur la page <Link href="/mappings">/mappings</Link>.
          </>
        ) : (
          <>
            For your technical teams: the Ed25519 signature, the SHA-256 hash chain, and
            the RFC 3161 timestamping protocol are documented on the{" "}
            <Link href="/signatures">/signatures</Link> page. The 17 × 5 mapping across
            the five frameworks is on the <Link href="/mappings">/mappings</Link> page.
          </>
        )}
      </Callout>
    </DocsPage>
  );
}
