import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { Steps, Step } from "@/components/Steps";

const DCO_LINE = `git commit -s -m "feat(tools): add NIST RMF mapping shortcut"
# the -s flag appends a Signed-off-by trailer (DCO)`;

const DEV_SETUP = `# Clone, install, run tests
git clone https://github.com/acfstandard/acf-mcp.git
cd acf-mcp
npm install
npm run lint
npm run test
npm run build`;

export default async function ContributingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Contribuer" : "Contributing"}
      description={
        fr
          ? "Comment ouvrir une issue, proposer une pull request et — séparément — proposer une modification de doctrine. Les contributions de tooling et de guides d’intégration sont les bienvenues. Les modifications de doctrine passent par une revue mainteneur dédiée."
          : "How to open an issue, propose a pull request and — separately — propose a doctrine modification. Tooling and integration-guide contributions are welcome. Doctrine modifications go through a dedicated maintainer review."
      }
      badge={fr ? "Communauté" : "Community"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Le code du serveur et les guides sont ouverts aux PR. La{" "}
            <strong>doctrine ACF®</strong> (4 principes, 4 niveaux d’autonomie,
            17 fiches méthodologiques) n’est pas modifiable par PR ouverte :
            elle passe par une procédure de revue mainteneur, décrite plus bas.
          </>
        ) : (
          <>
            The server code and the guides are open to PRs. The{" "}
            <strong>ACF® doctrine</strong> (4 principles, 4 autonomy levels, 17
            methodological cards) is not modifiable via open PR: it goes through
            a maintainer-review procedure, described below.
          </>
        )}
      </Callout>

      <h2 id="issues">
        {fr ? "Ouvrir une issue" : "Opening an issue"}
      </h2>
      <p>
        {fr ? (
          <>
            Issues sur{" "}
            <a
              href="https://github.com/acfstandard/acf-mcp/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/acfstandard/acf-mcp/issues
            </a>
            . Pour un bug, joignez : version d’acf-mcp, version de Node, client
            MCP utilisé, log JSON-RPC de l’appel fautif. Pour une feature, décrivez
            le cas d’usage avant la solution.
          </>
        ) : (
          <>
            Issues at{" "}
            <a
              href="https://github.com/acfstandard/acf-mcp/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/acfstandard/acf-mcp/issues
            </a>
            . For a bug, attach: acf-mcp version, Node version, MCP client in
            use, JSON-RPC log of the failing call. For a feature, describe the
            use case before the solution.
          </>
        )}
      </p>
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Les vulnérabilités de sécurité ne vont <em>pas</em> dans le tracker
            public. Voir <Link href="/security">politique de sécurité</Link>.
          </>
        ) : (
          <>
            Security vulnerabilities do <em>not</em> go in the public tracker.
            See <Link href="/security">security policy</Link>.
          </>
        )}
      </Callout>

      <h2 id="prs">
        {fr ? "Pull requests" : "Pull requests"}
      </h2>
      <p>
        {fr
          ? "Les PR de tooling, intégrations, exemples et corrections de docs sont les bienvenues. Suivez la procédure ci-dessous."
          : "Tooling, integration, example and docs-fix PRs are welcome. Follow the procedure below."}
      </p>

      <Steps>
        <Step
          title={
            fr
              ? "Ouvrir une issue d’abord (sauf trivial)"
              : "Open an issue first (unless trivial)"
          }
        >
          <p>
            {fr
              ? "Pour toute PR qui dépasse une faute de frappe ou un fix d’une ligne, ouvrez une issue pour valider la direction avant d’écrire le code."
              : "For any PR bigger than a typo or a one-line fix, open an issue first to validate the direction before writing code."}
          </p>
        </Step>
        <Step
          title={fr ? "Forker, brancher, coder" : "Fork, branch, code"}>
          <CodeBlock code={DEV_SETUP} language="bash" />
          <p>
            {fr
              ? "Code style : TypeScript strict, pas de any, formatage Prettier appliqué, tests vitest requis pour toute logique nouvelle ou changée."
              : "Code style: TypeScript strict, no any, Prettier-formatted, vitest tests required for any new or changed logic."}
          </p>
        </Step>
        <Step
          title={fr ? "Signer chaque commit (DCO)" : "Sign off every commit (DCO)"}
        >
          <p>
            {fr
              ? "Chaque commit doit porter un trailer Signed-off-by, obtenu via le flag -s. C’est la Developer Certificate of Origin — vous certifiez que vous avez le droit de soumettre le code."
              : "Every commit must carry a Signed-off-by trailer, obtained via the -s flag. This is the Developer Certificate of Origin — you certify you have the right to submit the code."}
          </p>
          <CodeBlock code={DCO_LINE} language="bash" />
        </Step>
        <Step
          title={
            fr
              ? "Ouvrir la PR, attendre la CI"
              : "Open the PR, wait for CI"
          }
        >
          <p>
            {fr
              ? "La CI exécute lint, typecheck, tests vitest, build et un test d’intégration MCP minimal. Une PR rouge n’est pas mergée."
              : "CI runs lint, typecheck, vitest tests, build and a minimal MCP integration test. A red PR is not merged."}
          </p>
        </Step>
        <Step
          title={fr ? "Revue mainteneur" : "Maintainer review"}
        >
          <p>
            {fr
              ? "Délai cible 7 jours. Les remarques portent sur la cohérence avec la doctrine, la conservation du déterminisme et la couverture de tests. Pas de revue purement stylistique — c’est le job de Prettier."
              : "Target window 7 days. Feedback focuses on doctrine consistency, determinism preservation and test coverage. No purely stylistic review — that’s Prettier’s job."}
          </p>
        </Step>
      </Steps>

      <h2 id="doctrine-changes">
        {fr ? "Modifications de doctrine" : "Doctrine modifications"}
      </h2>
      <p>
        {fr
          ? "La doctrine ACF® n’est pas un dépôt comme un autre : modifier un principe, un niveau d’autonomie ou une fiche méthodologique change la signification de la qualification produite par tous les serveurs en circulation. Toute proposition passe par une procédure dédiée."
          : "The ACF® doctrine is not just another repo: changing a principle, an autonomy level or a methodological card changes the meaning of the qualification produced by every server in circulation. Every proposal goes through a dedicated procedure."}
      </p>
      <ol>
        <li>
          {fr
            ? "Ouvrez une issue intitulée [doctrine] <résumé>. Argumentez le besoin avec un cas d’usage concret et la lacune actuelle."
            : "Open an issue titled [doctrine] <summary>. Argue the need with a concrete use case and the current gap."}
        </li>
        <li>
          {fr
            ? "Le mainteneur évalue l’impact (rétro-compatibilité, signature, fiches dépendantes)."
            : "The maintainer assesses the impact (backward compatibility, signing, dependent cards)."}
        </li>
        <li>
          {fr
            ? "Si accepté, la modification entre dans la prochaine version mineure ou majeure, avec rotation de clé de doctrine si requise."
            : "If accepted, the change lands in the next minor or major release, with a doctrine key rotation if required."}
        </li>
        <li>
          {fr
            ? "Les release notes sur GitHub publient la traçabilité complète."
            : "The GitHub release notes publish the full traceability."}
        </li>
      </ol>

      <h2 id="code-of-conduct">
        {fr ? "Code de conduite" : "Code of conduct"}
      </h2>
      <p>
        {fr
          ? "Discussions techniques et factuelles. Pas d’attaques personnelles. Respect des contributeurs et des reporters de sécurité. Tout débordement est arbitré par le mainteneur."
          : "Technical, factual discussion. No personal attacks. Respect for contributors and security reporters. Any overstep is arbitrated by the maintainer."}
      </p>

      <h2 id="see-also">
        {fr ? "Voir aussi" : "See also"}
      </h2>
      <ul>
        <li>
          <Link href="/security">
            {fr ? "Politique de sécurité" : "Security policy"}
          </Link>{" "}
          —{" "}
          {fr
            ? "voie privée pour les vulnérabilités."
            : "private channel for vulnerabilities."}
        </li>
        <li>
          <Link href="/legal">{fr ? "Licences et marques" : "Licences and trademarks"}</Link>{" "}
          — {fr ? "MIT, CC BY-NC-SA, marque ACF®." : "MIT, CC BY-NC-SA, ACF® trademark."}
        </li>
      </ul>
    </DocsPage>
  );
}
