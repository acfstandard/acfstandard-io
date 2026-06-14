import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

const SAMPLE = `import { createPublicKey, verify } from "node:crypto";
import { readFileSync } from "node:fs";

// 1. Load the public key embedded in the acf-mcp release.
//    (For Node.js apps consuming the npm package, this lives at
//    node_modules/acf-mcp/dist/archive/doctrine-v1.0.json under
//    .meta.doctrine_public_key — the SPKI base64 form.)
const PUBLIC_KEY_SPKI_B64 =
  "MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s=";

const publicKey = createPublicKey({
  key: Buffer.from(PUBLIC_KEY_SPKI_B64, "base64"),
  format: "der",
  type: "spki",
});

// 2. Read the signed tool output (anything returned by an acf.* tool).
const signed = JSON.parse(readFileSync("./tool-output.json", "utf8"));

// 3. Recompute what was signed: the doctrine_hash field as raw UTF-8.
const message = Buffer.from(signed.doctrine_hash, "utf8");

// 4. Strip the "ed25519:" prefix and decode the signature from base64.
const sigB64 = signed.doctrine_signature.replace(/^ed25519:/, "");
const signature = Buffer.from(sigB64, "base64");

// 5. Verify.
const ok = verify(null, message, publicKey, signature);
console.log(ok ? "✓ signature valid" : "✗ signature INVALID");
`;

const VERIFY_FOOTER_LIB = `import { readFileSync } from "node:fs";
import { verifyDoctrineSignature } from "acf-mcp/lib/doctrine-signature";

const signed = JSON.parse(readFileSync("./tool-output.json", "utf8"));
const ok = verifyDoctrineSignature({
  contentHash: signed.doctrine_hash,
  signature: signed.doctrine_signature,
  publicKey: signed.doctrine_public_key,
});
console.log(ok ? "✓ signature valid" : "✗ signature INVALID");
`;

export default async function VerifyNodePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Vérifier en Node.js" : "Verify in Node.js"}
      description={
        fr
          ? "Vérifiez la signature Ed25519 d’une sortie acf-mcp avec uniquement le module crypto standard de Node — zéro dépendance externe."
          : "Verify the Ed25519 signature of an acf-mcp output using only Node’s standard crypto module — zero external dependencies."
      }
      badge={fr ? "Signatures" : "Signatures"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Le module <code>node:crypto</code> supporte Ed25519 nativement depuis Node 12.
            Aucune dépendance npm n’est requise. La clé publique est encodée en SPKI
            base64 (le format standard pour les clés Ed25519 publiques).
          </>
        ) : (
          <>
            The <code>node:crypto</code> module supports Ed25519 natively since Node 12.
            No npm dependency is required. The public key is encoded in SPKI base64 (the
            standard format for Ed25519 public keys).
          </>
        )}
      </Callout>

      <h2 id="quick-version">{fr ? "Version rapide" : "Quick version"}</h2>
      <p>
        {fr
          ? "Si vous utilisez déjà le package acf-mcp dans votre projet, importez la fonction de vérification embarquée :"
          : "If you already have the acf-mcp package in your project, import the embedded verification helper:"}
      </p>
      <CodeBlock code={VERIFY_FOOTER_LIB} language="typescript" filename="verify-quick.ts" />

      <h2 id="standalone">{fr ? "Version standalone (zéro dépendance)" : "Standalone (zero dependency)"}</h2>
      <p>
        {fr
          ? "Si vous voulez intégrer la vérification dans un pipeline d’audit qui ne dépend pas du package acf-mcp (par exemple un job CI qui audite des sorties archivées), le snippet ci-dessous suffit. Il utilise uniquement node:crypto."
          : "If you want to embed verification in an audit pipeline that does not depend on the acf-mcp package (e.g. a CI job auditing archived outputs), the snippet below is enough. It uses only node:crypto."}
      </p>
      <CodeBlock code={SAMPLE} language="typescript" filename="verify-doctrine.ts" />

      <h2 id="what-is-signed">{fr ? "Ce qui est signé" : "What is signed"}</h2>
      <p>
        {fr
          ? "La signature porte sur le hash de contenu (champ doctrine_hash, encodé sha256:hex) en tant que chaîne UTF-8. Ce hash est lui-même la somme SHA-256 du bundle de doctrine canonicalisé (fichiers triés par chemin, contenu brut, paths relatifs à la racine du contenu). Le code de calcul est dans le repo : scripts/build-archive-bundle.ts."
          : "The signature is taken over the content hash (the doctrine_hash field, sha256:hex encoded) as a UTF-8 string. That hash is itself the SHA-256 of the canonicalised doctrine bundle (files sorted by path, raw bytes, paths relative to the content root). The computation script is in the repo: scripts/build-archive-bundle.ts."}
      </p>

      <h2 id="failure-modes">{fr ? "Modes d’échec" : "Failure modes"}</h2>
      <ul>
        <li>
          <code>signature INVALID</code> —{" "}
          {fr
            ? "le contenu a été altéré OU la clé publique fournie n’est pas la bonne (mauvaise version d’acf-mcp). Re-télécharger la sortie de bout en bout et reverifier."
            : "the content was tampered with OR the wrong public key is in use (wrong acf-mcp version). Re-download the output end to end and re-verify."}
        </li>
        <li>
          <code>ERR_OSSL_EVP_DECODE_ERROR</code> —{" "}
          {fr
            ? "la signature ou la clé n’est pas du base64 valide. Vérifier qu’aucun caractère n’a été perdu en copier-coller."
            : "the signature or key is not valid base64. Check that no character was lost on copy-paste."}
        </li>
        <li>
          <code>UnsupportedKeyType</code> —{" "}
          {fr
            ? "Node < 12. Mettre à jour vers une version supportée par notre engine (node ≥ 18)."
            : "Node < 12. Upgrade to a supported version (node ≥ 18 per our engine)."}
        </li>
      </ul>
    </DocsPage>
  );
}
