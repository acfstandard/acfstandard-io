import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Steps, Step } from "@/components/Steps";

const REPORT_TEMPLATE = `Subject: [acf-mcp security] <short title>

Affected version : acf-mcp@<x.y.z>
Transport        : stdio | http
Severity (est.)  : low | medium | high | critical

Summary
-------
<one paragraph describing the issue>

Reproduction
------------
<minimal steps or PoC>

Impact
------
<what an attacker can do; what data/decision is affected>

Suggested fix (optional)
------------------------
<your idea, if any>`;

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Politique de sécurité" : "Security policy"}
      description={
        fr
          ? "Comment signaler une vulnérabilité acf-mcp, fenêtre de divulgation responsable, clé PGP et reconnaissance. Pas de bug bounty financier ; reconnaissance publique dans les release notes."
          : "How to report an acf-mcp vulnerability, responsible disclosure window, PGP key and recognition. No paid bug bounty; public recognition in the release notes."
      }
      badge={fr ? "Sécurité" : "Security"}
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Ne déposez pas une vulnérabilité dans le tracker public d’issues
            GitHub. Envoyez d’abord un email chiffré (voir ci-dessous), puis
            attendez accusé de réception sous 72 heures.
          </>
        ) : (
          <>
            Do not file a vulnerability in the public GitHub issue tracker.
            First send an encrypted email (see below), then wait for
            acknowledgement within 72 hours.
          </>
        )}
      </Callout>

      <h2 id="report">
        {fr ? "Signaler une vulnérabilité" : "Report a vulnerability"}
      </h2>
      <p>
        {fr ? (
          <>
            Envoyez un email à{" "}
            <a href="mailto:dorange.vincent@gmail.com">
              dorange.vincent@gmail.com
            </a>{" "}
            avec l’objet exact <code>[acf-mcp security]</code>. Chiffrez les
            détails sensibles avec la clé PGP du projet (cf. section dédiée).
            Utilisez le gabarit ci-dessous pour accélérer le triage.
          </>
        ) : (
          <>
            Send an email to{" "}
            <a href="mailto:dorange.vincent@gmail.com">
              dorange.vincent@gmail.com
            </a>{" "}
            with the exact subject <code>[acf-mcp security]</code>. Encrypt
            sensitive details with the project PGP key (see dedicated section).
            Use the template below to speed up triage.
          </>
        )}
      </p>
      <CodeBlock code={REPORT_TEMPLATE} language="text" filename="report-template.txt" />

      <h2 id="process">
        {fr ? "Processus de divulgation" : "Disclosure process"}
      </h2>
      <Steps>
        <Step
          title={
            fr
              ? "Soumission (jour 0)"
              : "Submission (day 0)"
          }
        >
          <p>
            {fr
              ? "Vous envoyez l’email chiffré. Tant que le mainteneur n’a pas répondu, ne discutez pas la vulnérabilité publiquement (réseaux sociaux, forums, chat)."
              : "You send the encrypted email. Until the maintainer has replied, do not discuss the vulnerability publicly (social media, forums, chat)."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Accusé de réception (sous 72 h)"
              : "Acknowledgement (within 72 h)"
          }
        >
          <p>
            {fr
              ? "Le mainteneur confirme la réception, ouvre un canal privé (issue privée GitHub ou thread chiffré) et propose une estimation de criticité."
              : "The maintainer confirms receipt, opens a private channel (GitHub private security advisory or encrypted thread) and proposes a severity estimate."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Investigation et correctif (jours 1 à 60)"
              : "Investigation and fix (days 1 to 60)"
          }
        >
          <p>
            {fr
              ? "Triage, reproduction, correctif. Pour les vulnérabilités touchant la signature de doctrine, une rotation de clé peut être nécessaire ; la fenêtre d’overlap est annoncée à ce moment."
              : "Triage, reproduction, fix. For vulnerabilities affecting doctrine signing, a key rotation may be required; the overlap window is announced at that point."}
          </p>
        </Step>
        <Step
          title={
            fr
              ? "Publication coordonnée (jour 90 max)"
              : "Coordinated disclosure (day 90 max)"
          }
        >
          <p>
            {fr
              ? "Fenêtre standard de divulgation responsable : 90 jours après la soumission. La version corrigée est publiée, suivie de l’advisory public et de votre reconnaissance dans les release notes (si vous le souhaitez)."
              : "Standard responsible disclosure window: 90 days after submission. The fixed release ships, followed by the public advisory and your recognition in the release notes (if you wish)."}
          </p>
        </Step>
      </Steps>

      <h2 id="pgp">
        {fr ? "Clé PGP du projet" : "Project PGP key"}
      </h2>
      <p>
        {fr ? (
          <>
            La clé PGP courante du projet est disponible sur demande à la même
            adresse email. Empreinte :{" "}
            <code>PGP key fingerprint: TBD — request via email</code>. Une
            distribution automatisée via <code>WKD</code> et{" "}
            <code>keys.openpgp.org</code> est planifiée.
          </>
        ) : (
          <>
            The current project PGP key is available on request from the same
            email address. Fingerprint:{" "}
            <code>PGP key fingerprint: TBD — request via email</code>.
            Automated distribution via <code>WKD</code> and{" "}
            <code>keys.openpgp.org</code> is planned.
          </>
        )}
      </p>

      <h2 id="scope">
        {fr ? "Périmètre" : "Scope"}
      </h2>
      <p>
        {fr
          ? "Sont dans le périmètre : le code du serveur acf-mcp, les schémas zod, le moteur de règles, la chaîne de signature et la publication npm. Sont hors périmètre : la sécurité de votre client MCP (Claude Desktop, Cursor, etc.) et celle de votre passerelle HTTP."
          : "In scope: the acf-mcp server code, the zod schemas, the rule engine, the signing chain and the npm publication. Out of scope: the security of your MCP client (Claude Desktop, Cursor, etc.) and the security of your HTTP gateway."}
      </p>

      <h2 id="bounty">
        {fr ? "Bug bounty" : "Bug bounty"}
      </h2>
      <p>
        {fr ? (
          <>
            Aucun programme rémunéré actuellement. Les reporters qui suivent ce
            processus sont crédités nominativement dans les release notes GitHub
            de la version corrigée, sauf demande explicite d’anonymat.
          </>
        ) : (
          <>
            No paid programme currently. Reporters who follow this process are
            credited by name in the GitHub release notes of the fixed release,
            unless they explicitly request anonymity.
          </>
        )}
      </p>

      <h2 id="thanks">
        {fr ? "Hall of fame" : "Hall of fame"}
      </h2>
      <p>
        {fr
          ? "Aucun rapport coordonné publié à ce jour. Cette liste apparaîtra ici dès la première divulgation."
          : "No coordinated report published yet. This list will appear here as soon as the first disclosure happens."}
      </p>
    </DocsPage>
  );
}
