import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

export default async function SignaturesOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Signatures de doctrine" : "Doctrine signatures"}
      description={
        fr
          ? "Chaque sortie d’un outil acf-mcp est cryptographiquement signée. Vérifiez-la hors-ligne avec la clé publique Ed25519 d’ACF® et pin-la dans votre pipeline d’audit pour avoir une racine de confiance opposable."
          : "Every acf-mcp tool output is cryptographically signed. Verify it offline against the ACF® Ed25519 public key and pin it in your audit pipeline for a defensible root of trust."
      }
      badge={fr ? "Sécurité" : "Security"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            La vérification n’a besoin d’<strong>aucune connexion réseau</strong> — la clé
            publique est embarquée dans chaque release npm d’<code>acf-mcp</code>. Trois
            implémentations canoniques de référence sont fournies :{" "}
            <Link href="/signatures/verify-node">Node.js</Link>,{" "}
            <Link href="/signatures/verify-python">Python</Link>,{" "}
            <Link href="/signatures/verify-go">Go</Link>.
          </>
        ) : (
          <>
            Verification needs <strong>no network call</strong> — the public key is
            embedded in every <code>acf-mcp</code> npm release. Three canonical reference
            implementations are provided:{" "}
            <Link href="/signatures/verify-node">Node.js</Link>,{" "}
            <Link href="/signatures/verify-python">Python</Link>,{" "}
            <Link href="/signatures/verify-go">Go</Link>.
          </>
        )}
      </Callout>

      <h2 id="anatomy">{fr ? "Anatomie d’une sortie signée" : "Anatomy of a signed output"}</h2>
      <p>
        {fr
          ? "Chaque sortie d’outil embarque sept champs de traçabilité. La signature porte sur le hash de contenu, pas sur la sortie complète — ainsi un client peut signaler le rationale et l’audit-trail séparément sans réémettre la signature."
          : "Every tool output ships with seven traceability fields. The signature is taken over the content hash, not the full output — so a client can render the rationale and the audit trail separately without re-emitting the signature."}
      </p>
      <CodeBlock
        language="json"
        filename="signed-footer.json"
        code={`{
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:bf0b6d8e4731ebdc58f6d6338702c5b74af47874cf0ad3dc958cde5c5b30b9dc",
  "doctrine_signature": "ed25519:7c9f3a2b8e1d4f6a9b2c5e8d1f4a7b3c6e9d2f5a8b1c4e7d0a3b6c9e2f5a8b1c4e7d0a3b6c9e2f5a8b1c4e7d0a3b6c9e2f5a8b1c4e7d0a==",
  "doctrine_public_key": "MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s=",
  "doctrine_archive_url": "https://acfstandard.io/doctrine/v1.0/archive.json",
  "regulatory_snapshot": "EU AI Act 2024/1689 · GDPR 2016/679 · ISO 42001:2023 · NIST AI RMF 1.0 · COBIT 2019 — frozen 2026-06",
  "generated_at": "2026-06-14T11:47:22.318Z"
}`}
      />

      <h2 id="three-properties">{fr ? "Les trois propriétés" : "The three properties"}</h2>
      <h3 id="ed25519">1. Ed25519</h3>
      <p>
        {fr
          ? "La signature est Ed25519 (RFC 8032) — courbe elliptique sur Curve25519. Choix dicté par : (1) absence de paramètres faibles (pas de courbe NIST suspecte), (2) vérification déterministe et constant-time, (3) tailles compactes (32 octets pour la clé publique, 64 pour la signature). La clé publique d’ACF® est diffusée en encodage SPKI base64."
          : "The signature is Ed25519 (RFC 8032) — elliptic-curve on Curve25519. Chosen for: (1) no suspect parameters (no NIST-suspected curves), (2) deterministic and constant-time verification, (3) compact sizes (32 bytes public key, 64 bytes signature). The ACF® public key ships in base64 SPKI encoding."}
      </p>

      <h3 id="hash-chain">2. {fr ? "Chaîne de hachage SHA-256" : "SHA-256 hash chain"}</h3>
      <p>
        {fr
          ? "À l’intérieur du registre de décisions (fiche ACF-08), chaque entrée intègre le hash SHA-256 de l’entrée précédente. Réécrire une entrée passée détecte immédiatement une rupture de chaîne en recalculant. C’est ce qui rend le registre opposable à un auditeur ou un tribunal."
          : "Inside the decision register (fiche ACF-08), each entry embeds the SHA-256 of the previous entry. Rewriting a past entry breaks the chain immediately on recompute. That is what makes the register defensible to an auditor or a court."}
      </p>

      <h3 id="rfc-3161">3. {fr ? "Horodatage qualifié RFC 3161" : "RFC 3161 qualified timestamping"}</h3>
      <p>
        {fr
          ? "Chaque entrée du registre est horodatée par une Time Stamp Authority qualifiée eIDAS (par exemple Universign PSCE référencée par l’ANSSI). Cela donne à chaque décision une date opposable, vérifiable indépendamment du déployeur."
          : "Each register entry is timestamped by an eIDAS-qualified Time Stamp Authority (e.g. Universign PSCE referenced by France’s ANSSI). This gives every decision a defensible date, verifiable independently of the deployer."}
      </p>

      <h2 id="public-key">{fr ? "La clé publique courante" : "The current public key"}</h2>
      <p>
        {fr ? (
          <>
            La clé publique de doctrine pour <code>acf-mcp ≥ 1.1.0</code> :
          </>
        ) : (
          <>
            The doctrine public key for <code>acf-mcp ≥ 1.1.0</code>:
          </>
        )}
      </p>
      <CodeBlock
        language="text"
        filename="acf-doctrine-pubkey.txt"
        code="MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s="
      />
      <p>
        {fr ? (
          <>
            Voir{" "}
            <Link href="/signatures/public-key">l’historique complet</Link> (rotations de
            racine, versions antérieures).
          </>
        ) : (
          <>
            See <Link href="/signatures/public-key">the full history</Link> (root
            rotations, prior versions).
          </>
        )}
      </p>

      <h2 id="why-it-matters">{fr ? "Pourquoi cela compte" : "Why this matters"}</h2>
      <p>
        {fr
          ? "L’EU AI Act (article 12, article 26(6)) impose la conservation par le déployeur de journaux d’évènements pendant au moins six mois. Sans signature cryptographique et chaîne de hachage, un journal peut être réécrit avant remise à l’auditeur — ce qui le rend inopposable. ACF® rend la signature et la chaîne opt-out (par défaut activées) pour fermer cet angle d’attaque."
          : "The EU AI Act (Art. 12, Art. 26(6)) requires the deployer to retain event logs for at least six months. Without a cryptographic signature and hash chain, a log can be rewritten before the auditor sees it — making it undefensible. ACF® makes signing and chaining opt-out (on by default) to close that attack surface."}
      </p>
    </DocsPage>
  );
}
