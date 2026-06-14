import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

const WITHOUT_BULLETS: { fr: string; en: string }[] = [
  { fr: "À 3h14 du matin, votre agent de scoring crédit refuse 847 prêts en cascade, et personne ne peut reconstituer la décision le lendemain.", en: "At 3:14 AM, your credit-scoring agent refuses 847 loans in cascade, and no one can reconstruct the decision the next day." },
  { fr: "L'agent service client a promis un remboursement de 4 200 € à un client, puis le redéploiement a effacé la trace de la promesse.", en: "The customer service agent promised a 4,200 euros refund, then the redeploy wiped any trace of the commitment." },
  { fr: "Votre agent achats vient de signer un contrat de 540 000 € avec un fournisseur sous sanctions UE, sans contrôle préalable documenté.", en: "Your procurement agent just signed a 540,000 euros contract with an EU-sanctioned supplier, with no documented pre-screening." },
  { fr: "Quand l'auditeur demande qui répond civilement, la réponse part en boucle de blâme entre la DSI, le fournisseur du modèle et le métier.", en: "When the auditor asks who bears civil liability, the answer loops between IT, the model vendor, and the business unit." },
  { fr: "Aucune trace ne permet de démontrer que la décision a respecté l'AI Act, l'ISO 42001 ou les obligations de votre secteur.", en: "No trace exists to demonstrate the decision complied with the AI Act, ISO 42001, or your sector's obligations." },
];

const WITH_BULLETS: { fr: string; en: string }[] = [
  { fr: "La décision de 3h14 porte une signature Ed25519, un hash SHA-256 chaîné, et le nom du DDAO qui en répond civilement.", en: "The 3:14 AM decision carries an Ed25519 signature, a chained SHA-256 hash, and the name of the DDAO who bears civil liability." },
  { fr: "La promesse de remboursement déclenche le kill switch de niveau 2, mappé sur la fiche ACF-11, archivé avant tout redéploiement.", en: "The refund commitment triggers the level 2 kill switch, mapped to card ACF-11, archived before any redeploy." },
  { fr: "Le contrat fournisseur est classifié N1 et non N3, ce qui rend la fiche ACF-09 « screening sanctions » obligatoire avant signature.", en: "The supplier contract is classified N1 not N3, making the ACF-09 sanctions-screening card mandatory before signature." },
  { fr: "L'auditeur reçoit en 30 secondes un PDF signé, mappé sur AI Act, ISO 42001, NIST AI RMF, RGPD et COBIT.", en: "The auditor receives a signed PDF in 30 seconds, mapped to EU AI Act, ISO 42001, NIST AI RMF, GDPR, and COBIT." },
  { fr: "Votre ACF Sovereignty Score™ progresse de 34 à 78 en six mois, et chaque décision agentique reste opposable des années plus tard.", en: "Your ACF Sovereignty Score™ moves from 34 to 78 in six months, and every agentic decision remains opposable years later." },
];

const THREE_ANSWERS = [
  { levelFr: "Niveau 1 — Le silence", levelEn: "Level 1 — Silence", answerFr: "« On va voir avec les équipes d'ingénierie et on vous revient. »", answerEn: "“We'll check with the engineering team and get back to you.”", consequenceFr: "Enquête réglementaire ouverte, exposition à une sanction AI Act pouvant atteindre 35 M€ ou 7 % du chiffre d'affaires mondial, mise en cause de la responsabilité dirigeante, incertitude juridique prolongée.", consequenceEn: "Regulatory investigation opened, exposure to an AI Act sanction of up to 35 million euros or 7 percent of global turnover, executive accountability triggered, prolonged legal uncertainty.", band: "red" },
  { levelFr: "Niveau 2 — Les logs applicatifs", levelEn: "Level 2 — Application logs", answerFr: "« Nous avons des logs applicatifs, on peut vous les exporter. »", answerEn: "“We have application logs, we can export them for you.”", consequenceFr: "Logs réputés non probants au titre de l'article 1366 du Code civil, audit forensique externe imposé, contradictoire de plusieurs mois, défense par construction reconstituée a posteriori.", consequenceEn: "Logs deemed non-probative under article 1366 of the French Civil Code, external forensic audit imposed, multi-month adversarial process, defense reconstructed after the fact.", band: "yellow" },
  { levelFr: "Niveau 3 — La preuve cryptographique", levelEn: "Level 3 — Cryptographic proof", answerFr: "« Voici le PDF signé Ed25519, vous pouvez le vérifier indépendamment avec la clé publique. »", answerEn: "“Here is the Ed25519-signed PDF, you can verify it independently with the public key.”", consequenceFr: "Trace opposable produite immédiatement, vérifiable par l'auditeur sans dépendre de vos systèmes, conformité démontrée sur cinq référentiels (AI Act, ISO 42001, NIST AI RMF, RGPD, COBIT).", consequenceEn: "Opposable trace produced immediately, verifiable by the auditor independently of your systems, compliance demonstrated across five frameworks (AI Act, ISO 42001, NIST AI RMF, GDPR, COBIT).", band: "green" },
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

      <h2 id="flow-diagram">
        {fr ? "Le flux d'une décision agentique" : "The flow of an agentic decision"}
      </h2>
      <p>
        {fr
          ? "Sans cadre de gouvernance, une décision agentique passe directement de l'agent à l'action. Avec ACF, deux étapes s'intercalent — une gouvernance préalable et une signature — et une étape s'ajoute après : la vérification réplicable des années plus tard. Trois boîtes en plus suffisent à rendre la décision opposable."
          : "Without a governance frame, an agentic decision flows straight from the agent to the action. With ACF, two steps are inserted upstream — governance and signature — and one is added downstream: replicable verification, years later. Three extra boxes are enough to make the decision opposable."}
      </p>
      <div className="not-prose my-8 grid gap-6 lg:grid-cols-2">
        {/* WITHOUT */}
        <div className="rounded-xl border border-red-400/40 bg-red-400/[0.04] p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-red-300">
            {fr ? "Sans ACF" : "Without ACF"}
          </p>
          <div className="mt-5 space-y-2">
            {[
              fr ? "Agent" : "Agent",
              fr ? "Décision" : "Decision",
              fr ? "Action" : "Action",
              fr ? "Enquête" : "Investigation",
            ].map((step, i, arr) => (
              <div key={step}>
                <div className="rounded-lg border border-white/[0.08] bg-navy-900 px-4 py-3 text-center font-display text-[14px] font-bold text-white">
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <div className="flex justify-center py-1.5 text-gr/60">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* WITH */}
        <div className="rounded-xl border border-gold/40 bg-gold/[0.04] p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            {fr ? "Avec ACF" : "With ACF"}
          </p>
          <div className="mt-5 space-y-2">
            {[
              { label: fr ? "Agent" : "Agent",                accent: false },
              { label: fr ? "Gouvernance" : "Governance",      accent: true  },
              { label: fr ? "Signature" : "Signature",         accent: true  },
              { label: fr ? "Décision" : "Decision",           accent: false },
              { label: fr ? "Vérification" : "Verification",   accent: true  },
            ].map((step, i, arr) => (
              <div key={step.label}>
                <div
                  className={`rounded-lg border px-4 py-3 text-center font-display text-[14px] font-bold ${
                    step.accent
                      ? "border-gold/50 bg-gold-dim text-gold"
                      : "border-white/[0.08] bg-navy-900 text-white"
                  }`}
                >
                  {step.label}
                </div>
                {i < arr.length - 1 && (
                  <div className="flex justify-center py-1.5 text-gold/60">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 id="trust-infrastructure">
        {fr ? "ACF est une Decision Trust Infrastructure" : "ACF is a Decision Trust Infrastructure"}
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

      <h2 id="closing">{fr ? "La vraie question" : "The real question"}</h2>
      <div className="not-prose my-8 rounded-xl border border-gold/40 bg-gold/[0.04] p-8">
        <p className="font-display text-[20px] font-bold leading-[1.4] text-white md:text-[24px]">
          {fr
            ? "La question n'est plus de savoir si les agents IA prendront des décisions."
            : "The question is no longer whether AI agents will make decisions."}
        </p>
        <p className="mt-3 font-display text-[20px] font-bold leading-[1.4] text-gold md:text-[24px]">
          {fr
            ? "La question est de savoir si ces décisions resteront opposables des années plus tard."
            : "The question is whether those decisions will still be defensible years later."}
        </p>
      </div>
      <p>
        {fr
          ? "ACF® est l'infrastructure qui répond oui à cette deuxième question, par construction et non par chance — du jour de la décision au jour où un tiers la conteste."
          : "ACF® is the infrastructure that answers yes to that second question, by construction and not by luck — from the day the decision is made to the day a third party challenges it."}
      </p>

      <div className="not-prose my-10 flex flex-wrap gap-4">
        <Link
          href="/sovereignty-score/calculate"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 font-display text-[14px] font-bold text-navy-900 transition hover:bg-gold-light hover:shadow-[0_8px_30px_var(--gold-glow)]"
        >
          {fr ? "Calculer notre ACF Sovereignty Score™" : "Calculate our ACF Sovereignty Score™"}
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
