import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

const CURRENT_KEY = "MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s=";

export default async function PublicKeyHistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Historique des clés publiques" : "Public key history"}
      description={
        fr
          ? "ACF® considère sa racine de confiance comme une obligation publique. Toute rotation est annoncée ici, datée, et la version d’acf-mcp à laquelle elle s’applique est explicite."
          : "ACF® treats its root of trust as a public obligation. Every rotation is announced here, dated, and tied to the explicit acf-mcp version it applies to."
      }
      badge={fr ? "Signatures" : "Signatures"}
    >
      <Callout variant="warning" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Une rotation de racine <strong>n’invalide pas</strong> les versions
            antérieures. Une sortie produite avec une <code>doctrine_version</code> &lt;
            1.1.0 reste vérifiable avec sa clé d’origine. Cette page est l’index officiel
            des clés actives par plage de versions.
          </>
        ) : (
          <>
            A root rotation does <strong>not</strong> invalidate prior versions. An
            output produced with <code>doctrine_version</code> &lt; 1.1.0 remains
            verifiable against its original key. This page is the official index of
            active keys per version range.
          </>
        )}
      </Callout>

      <h2 id="current">{fr ? "Clé courante (1.1.0+)" : "Current key (1.1.0+)"}</h2>
      <p>
        {fr
          ? "Émise le 14 juin 2026. Générée et contrôlée directement par Vincent Dorange ; la clé privée est stockée hors-ligne. Toute sortie acf-mcp depuis la version 1.1.0 se vérifie contre cette clé."
          : "Issued on June 14, 2026. Generated and controlled directly by Vincent Dorange; the private key is held off-line. Every acf-mcp output from version 1.1.0 onward verifies against this key."}
      </p>
      <CodeBlock language="text" filename="acf-doctrine-pubkey-v2.txt" code={CURRENT_KEY} />

      <h2 id="legacy">{fr ? "Clé legacy (1.0.x)" : "Legacy key (1.0.x)"}</h2>
      <p>
        {fr
          ? "Les versions 1.0.0 → 1.0.3 ont été signées avec une racine antérieure générée durant le bootstrap du serveur. Les sorties d’époque restent vérifiables contre leur clé d’origine, embarquée dans le champ doctrine_public_key de chacune. La rotation vers la clé courante est un changement de racine forward-only, pas une révocation rétroactive."
          : "Versions 1.0.0 → 1.0.3 were signed with an earlier root generated during server bootstrap. Outputs from that era remain verifiable against their original key, which is embedded in the doctrine_public_key field of each. The rotation to the current key is a forward-only root change, not a retroactive revocation."}
      </p>
      <p>
        {fr ? (
          <>
            Pour vérifier une sortie 1.0.x, lisez directement la clé du champ{" "}
            <code>doctrine_public_key</code> de la sortie — c’est la seule source qui fait
            foi pour cette époque.
          </>
        ) : (
          <>
            To verify a 1.0.x output, read the key directly from the output’s{" "}
            <code>doctrine_public_key</code> field — that is the only authoritative
            source for that era.
          </>
        )}
      </p>

      <h2 id="rotation-policy">{fr ? "Politique de rotation" : "Rotation policy"}</h2>
      <ul>
        <li>
          {fr
            ? "Une rotation est déclarée à minor bump (1.1.0, 1.2.0, …), jamais à patch."
            : "A rotation is declared at minor bumps (1.1.0, 1.2.0, …), never at patch level."}
        </li>
        <li>
          {fr
            ? "La page CHANGELOG.md documente la motivation de chaque rotation."
            : "CHANGELOG.md documents the motivation behind every rotation."}
        </li>
        <li>
          {fr
            ? "La clé privée est conservée hors-ligne dans un coffre sous contrôle direct de l’éditeur d’ACF® (Vincent Dorange)."
            : "The private key is held offline in a vault under direct control of the ACF® publisher (Vincent Dorange)."}
        </li>
        <li>
          {fr
            ? "En cas de compromission présumée, l’annonce sur cette page est sous 24 h ; une rotation d’urgence est shippée sous 72 h."
            : "On suspected compromise, this page is updated within 24 h; an emergency rotation ships within 72 h."}
        </li>
      </ul>
    </DocsPage>
  );
}
