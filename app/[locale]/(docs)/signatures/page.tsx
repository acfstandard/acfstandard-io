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
          ? "La doctrine ACF® servie par acf-mcp est signée Ed25519, et chaque sortie d’outil de raisonnement porte l’empreinte et la signature de la doctrine qui l’a produite. Vérifiez hors ligne, avec la clé publique d’ACF®, que cette doctrine est bien celle qui a été publiée."
          : "The ACF® doctrine served by acf-mcp is Ed25519-signed, and every reasoning tool output carries the hash and signature of the doctrine that produced it. Verify offline, with the ACF® public key, that this doctrine is the one that was published."
      }
      badge={fr ? "Sécurité" : "Security"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            La vérification n’a besoin d’<strong>aucune connexion réseau</strong>: la clé
            publique est embarquée dans chaque release npm d’<code>acf-mcp</code>. Trois
            implémentations canoniques de référence sont fournies :{" "}
            <Link href="/signatures/verify-node">Node.js</Link>,{" "}
            <Link href="/signatures/verify-python">Python</Link>,{" "}
            <Link href="/signatures/verify-go">Go</Link>.
          </>
        ) : (
          <>
            Verification needs <strong>no network call</strong>: the public key is
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
          ? "Chaque sortie d’outil de raisonnement se termine par six champs de traçabilité. La signature porte sur l’empreinte du contenu de la doctrine, pas sur la sortie elle-même : elle prouve sur quelle doctrine le raisonnement s’est appuyé, pas que la sortie n’a pas été modifiée après coup."
          : "Every reasoning tool output ends with six traceability fields. The signature is taken over the doctrine content hash, not over the output itself: it proves which doctrine the reasoning relied on, not that the output was left unchanged afterwards."}
      </p>
      <CodeBlock
        language="json"
        filename="signed-footer.json"
        code={`{
  "doctrine_version": "ACF framework v1.0 / rules 2026-06",
  "doctrine_hash": "sha256:119819463363cde0649504ab8ed5a96982fdb8506441f2c5e76e7e3c3feb77f1",
  "doctrine_signature": "ed25519:3R0oIiqL3KgdVAemSy4oEprbUZnRWE4OEQQgD+2JnMzKhAL2xrmYjwrwbpkbew0T5B4YKvEYkycWFQ+paADFCQ==",
  "doctrine_archive_url": "https://acfstandard.io/archive/doctrine/v1.0/doctrine-v1.0.json",
  "regulatory_snapshot": "EU AI Act (Reg. 2024/1689, incl. Digital Omnibus deferral) + GDPR (Reg. 2016/679) + DORA (Reg. 2022/2554) + NIS2 (Dir. 2022/2555) + ISO 42001:2023: as of 2026-06-07",
  "generated_at": "2026-11-01T12:06:31.043Z"
}`}
      />

      <h2 id="two-properties">{fr ? "Les deux propriétés" : "The two properties"}</h2>
      <h3 id="ed25519">1. Ed25519</h3>
      <p>
        {fr
          ? "La signature est Ed25519 (RFC 8032), courbe elliptique sur Curve25519. Choix dicté par : (1) absence de paramètres faibles (pas de courbe NIST suspecte), (2) vérification déterministe et constant-time, (3) tailles compactes (32 octets pour la clé publique, 64 pour la signature). La clé publique d’ACF® est diffusée en encodage SPKI base64."
          : "The signature is Ed25519 (RFC 8032), elliptic-curve on Curve25519. Chosen for: (1) no suspect parameters (no NIST-suspected curves), (2) deterministic and constant-time verification, (3) compact sizes (32 bytes public key, 64 bytes signature). The ACF® public key ships in base64 SPKI encoding."}
      </p>

      <h3 id="content-hash">2. {fr ? "Empreinte SHA-256 de la doctrine" : "SHA-256 doctrine hash"}</h3>
      <p>
        {fr
          ? "L’empreinte (doctrine_hash) est un SHA-256 calculé sur l’ensemble des fichiers de contenu de la doctrine. Si une seule fiche, un guide ou une règle change, l’empreinte change et la signature ne vérifie plus : toute altération du corpus devient détectable."
          : "The hash (doctrine_hash) is a SHA-256 computed over all the doctrine content files. If a single card, guide or rule changes, the hash changes and the signature no longer verifies: any alteration of the corpus becomes detectable."}
      </p>


      <h2 id="public-key">{fr ? "La clé publique courante" : "The current public key"}</h2>
      <p>
        {fr ? (
          <>
            La clé publique de doctrine pour <code>acf-mcp ≥ 1.1.0</code>, inchangée en 2.0 :
          </>
        ) : (
          <>
            The doctrine public key for <code>acf-mcp ≥ 1.1.0</code>, unchanged in 2.0:
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
          ? "Une recommandation de gouvernance n’a de valeur que si l’on sait sur quel référentiel elle s’appuie. La signature permet à un auditeur de vérifier, sans dépendre de vous, que le raisonnement produit par acf-mcp repose sur la doctrine ACF® publiée et non sur une version modifiée. La signature des décisions elles-mêmes, dans le registre de l’organisation (ACF-09), relève d’ACF Compliance, pas du serveur MCP."
          : "A governance recommendation is only worth something if you know which framework it relies on. The signature lets an auditor check, without depending on you, that the reasoning produced by acf-mcp rests on the published ACF® doctrine and not on a modified version. Signing the decisions themselves, in the organisation’s register (ACF-09), is the job of ACF Compliance, not of the MCP server."}
      </p>
    </DocsPage>
  );
}
