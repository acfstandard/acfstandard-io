import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "FAQ" : "FAQ"}
      description={
        fr
          ? "Réponses courtes et directes aux questions les plus fréquentes sur acf-mcp : déterminisme, signature, plateformes supportées, extensions, et limites assumées."
          : "Short, direct answers to the most frequent questions about acf-mcp: determinism, signing, supported platforms, extensions, and stated boundaries."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr
          ? "Si une réponse ne couvre pas votre cas, ouvrez une issue (cf. page contributing). Le but est de garder cette FAQ courte et factuelle, pas exhaustive."
          : "If an answer doesn’t cover your case, open an issue (see contributing page). The goal is to keep this FAQ short and factual, not exhaustive."}
      </Callout>

      <h2 id="determinism">
        {fr ? "Déterminisme et architecture" : "Determinism and architecture"}
      </h2>

      <h3 id="q-internal-llm">
        {fr
          ? "acf-mcp appelle-t-il un LLM en interne ?"
          : "Does acf-mcp call an LLM internally?"}
      </h3>
      <p>
        {fr
          ? "Non. Aucun appel LLM, jamais. Le moteur est un pattern matcher déterministe sur une base de connaissances signée. Même entrée canonique ⇒ même sortie, byte-pour-byte. C’est la propriété qui rend la trace opposable à un auditeur."
          : "No. No LLM call, ever. The engine is a deterministic pattern matcher over a signed knowledge base. Same canonical input ⇒ same output, byte-for-byte. That property is what makes the trace defensible to an auditor."}
      </p>

      <h3 id="q-no-llm-why">
        {fr ? "Pourquoi pas de LLM interne ?" : "Why no internal LLM?"}
      </h3>
      <p>
        {fr
          ? "Parce que la valeur du serveur est précisément l’auditabilité de sa sortie. Un LLM produit des sorties non reproductibles. La doctrine ACF® a besoin d’une chaîne de causalité vérifiable entre l’entrée d’un agent et la qualification produite. C’est incompatible avec un LLM."
          : "Because the server’s value is precisely the auditability of its output. An LLM produces non-reproducible outputs. The ACF® doctrine needs a verifiable chain of causality between an agent’s input and the qualification produced. That is incompatible with an LLM."}
      </p>

      <h3 id="q-doctrine-versioned">
        {fr
          ? "La doctrine est-elle identique entre versions ?"
          : "Is the doctrine the same across versions?"}
      </h3>
      <p>
        {fr
          ? "Non. La doctrine est versionnée, chaînée par hash et signée Ed25519. Chaque release publie un doctrine_version, un doctrine_hash et une signature. Voir la page changelog pour l’historique."
          : "No. The doctrine is versioned, hash-chained and Ed25519-signed. Every release publishes a doctrine_version, a doctrine_hash and a signature. See the changelog page for the history."}
      </p>

      <h2 id="signing">
        {fr ? "Signature et cryptographie" : "Signing and cryptography"}
      </h2>

      <h3 id="q-ed25519-vs-rsa">
        {fr ? "Pourquoi Ed25519 et pas RSA ?" : "Why Ed25519 and not RSA?"}
      </h3>
      <p>
        {fr
          ? "Trois raisons : (1) compacité — 32 octets pour la clé publique, 64 pour la signature ; (2) vérification en temps constant, ce qui élimine une classe d’attaques par canal auxiliaire ; (3) aucun paramètre suspect (pas de courbe NIST contestée)."
          : "Three reasons: (1) compactness — 32 bytes public key, 64 bytes signature; (2) constant-time verification, which removes a class of side-channel attacks; (3) no suspect parameters (no contested NIST curve)."}
      </p>

      <h3 id="q-key-rotation">
        {fr ? "Les clés vont-elles tourner ?" : "Will the keys rotate?"}
      </h3>
      <p>
        {fr ? (
          <>
            Oui. Les rotations sont annoncées au moins une version mineure à
            l’avance, avec un overlap pendant lequel les deux clés vérifient.
            L’historique complet est sur{" "}
            <Link href="/signatures/public-key">signatures / public key</Link>.
          </>
        ) : (
          <>
            Yes. Rotations are announced at least one minor version ahead, with
            an overlap window during which both keys verify. The full history
            lives at <Link href="/signatures/public-key">signatures / public key</Link>.
          </>
        )}
      </p>

      <h2 id="usage">
        {fr ? "Usage et clients" : "Usage and clients"}
      </h2>

      <h3 id="q-without-claude">
        {fr
          ? "Peut-on utiliser acf-mcp sans Claude Desktop ?"
          : "Can I use acf-mcp without Claude Desktop?"}
      </h3>
      <p>
        {fr
          ? "Oui. Tout client implémentant le MCP fonctionne : Cursor, Windsurf, Continue, Zed, ou un client custom. Voir la page quickstart pour les blocs de configuration."
          : "Yes. Any client implementing MCP works: Cursor, Windsurf, Continue, Zed, or a custom client. See the quickstart page for configuration blocks."}
      </p>

      <h3 id="q-platforms">
        {fr
          ? "Fonctionne sur Windows / Linux / macOS ?"
          : "Does it run on Windows / Linux / macOS?"}
      </h3>
      <p>
        {fr
          ? "Oui, partout où Node.js ≥ 18 tourne. Pas de binaire natif, pas de dépendance plateforme."
          : "Yes, anywhere Node.js ≥ 18 runs. No native binary, no platform-specific dependency."}
      </p>

      <h3 id="q-saas">
        {fr ? "Y a-t-il un SaaS acf-mcp ?" : "Is there a SaaS for acf-mcp?"}
      </h3>
      <p>
        {fr
          ? "Non. Le transport stdio est local-first par construction. Le transport HTTP existe, mais vous l’hébergez derrière votre propre passerelle. Voir la page authentication."
          : "No. The stdio transport is local-first by construction. The HTTP transport exists, but you host it behind your own gateway. See the authentication page."}
      </p>

      <h3 id="q-self-host-registry">
        {fr
          ? "Peut-on auto-héberger le registre ?"
          : "Can I self-host the registry?"}
      </h3>
      <p>
        {fr ? (
          <>
            Oui. Mirroir l’archive de doctrine signée et pointez la variable{" "}
            <code>ACF_DOCTRINE_ARCHIVE_URL</code> vers votre URL. La signature
            reste valide tant que le fichier n’est pas modifié.
          </>
        ) : (
          <>
            Yes. Mirror the signed doctrine archive and point the{" "}
            <code>ACF_DOCTRINE_ARCHIVE_URL</code> variable at your URL. The
            signature remains valid as long as the file is not modified.
          </>
        )}
      </p>

      <h2 id="boundaries">
        {fr ? "Limites et extensibilité" : "Boundaries and extensibility"}
      </h2>

      <h3 id="q-legal-advice">
        {fr ? "Est-ce un avis juridique ?" : "Is this legal advice?"}
      </h3>
      <p>
        {fr
          ? "Non. acf-mcp produit une qualification préliminaire opposable. La décision finale appartient au DDAO (Designated Deployer of Autonomous Operations) ou au juriste compétent."
          : "No. acf-mcp produces a defensible preliminary qualification. The final decision belongs to the DDAO (Designated Deployer of Autonomous Operations) or the competent counsel."}
      </p>

      <h3 id="q-custom-tools">
        {fr
          ? "Puis-je étendre avec mes propres outils ?"
          : "Can I extend with my own tools?"}
      </h3>
      <p>
        {fr
          ? "Le serveur est open-source. Fork ou pull request — pas de mécanisme de plugin externe pour préserver le déterminisme et la signature. Voir contributing."
          : "The server is open-source. Fork or pull request — no external plugin mechanism, to preserve determinism and signing. See contributing."}
      </p>

      <h3 id="q-custom-doctrine">
        {fr
          ? "Et si j’ai besoin d’une doctrine custom ?"
          : "What if I need a custom doctrine?"}
      </h3>
      <p>
        {fr
          ? "Hors périmètre du serveur. La doctrine ACF® est versionnée et signée par un mainteneur ; une dérivée signée par une autre clé n’est plus ACF®. Si votre cas justifie un changement de doctrine, ouvrez une issue."
          : "Out of the server’s scope. The ACF® doctrine is versioned and signed by a maintainer; a derivative signed by another key is no longer ACF®. If your case warrants a doctrine change, open an issue."}
      </p>
    </DocsPage>
  );
}
