import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

const SAMPLE = `import base64
import json
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
from cryptography.hazmat.primitives.serialization import load_der_public_key
from cryptography.exceptions import InvalidSignature

PUBLIC_KEY_SPKI_B64 = (
    "MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s="
)

# 1. Decode the SPKI-encoded public key.
spki = base64.b64decode(PUBLIC_KEY_SPKI_B64)
public_key = load_der_public_key(spki)
assert isinstance(public_key, Ed25519PublicKey), (
    "Unexpected key type — acf-mcp uses Ed25519"
)

# 2. Load the signed tool output.
with open("tool-output.json", "r", encoding="utf-8") as f:
    signed = json.load(f)

# 3. The signed message is the doctrine_hash field as UTF-8.
message = signed["doctrine_hash"].encode("utf-8")

# 4. Strip "ed25519:" prefix, decode signature from base64.
sig_b64 = signed["doctrine_signature"].removeprefix("ed25519:")
signature = base64.b64decode(sig_b64)

# 5. Verify.
try:
    public_key.verify(signature, message)
    print("✓ signature valid")
except InvalidSignature:
    print("✗ signature INVALID")
`;

export default async function VerifyPythonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Vérifier en Python" : "Verify in Python"}
      description={
        fr
          ? "Vérifiez la signature Ed25519 d’une sortie acf-mcp en Python avec la bibliothèque cryptography (PyPI). Compatible avec un pipeline d’audit Python ou un job Airflow."
          : "Verify the Ed25519 signature of an acf-mcp output in Python with the cryptography library (PyPI). Compatible with a Python audit pipeline or an Airflow job."
      }
      badge={fr ? "Signatures" : "Signatures"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Une seule dépendance : <code>pip install cryptography</code>. Aucune
            connexion réseau. La vérification est constant-time grâce à
            l’implémentation libsodium derrière cryptography.
          </>
        ) : (
          <>
            One dependency: <code>pip install cryptography</code>. No network call.
            Verification is constant-time thanks to the libsodium implementation behind
            cryptography.
          </>
        )}
      </Callout>

      <h2 id="install">{fr ? "Installation" : "Installation"}</h2>
      <CodeBlock code="pip install 'cryptography>=42'" language="bash" />

      <h2 id="snippet">{fr ? "Snippet complet" : "Complete snippet"}</h2>
      <CodeBlock code={SAMPLE} language="python" filename="verify_doctrine.py" />

      <h2 id="ci-integration">{fr ? "Intégration CI" : "CI integration"}</h2>
      <p>
        {fr ? (
          <>
            Pour vérifier toutes les sorties archivées dans un job CI : wrappez ce script
            dans une fonction <code>verify(path: str) -&gt; bool</code> et appelez-la sur
            chaque fichier d’<code>./audit-trail/*.json</code>. La signature est
            déterministe, donc un test de régression pin-able sur <code>doctrine_hash</code>{" "}
            détecte immédiatement toute mutation silencieuse.
          </>
        ) : (
          <>
            To verify every archived output in a CI job: wrap this script as{" "}
            <code>verify(path: str) -&gt; bool</code> and call it on every file under{" "}
            <code>./audit-trail/*.json</code>. The signature is deterministic, so a
            regression test pinned on <code>doctrine_hash</code> immediately catches any
            silent mutation.
          </>
        )}
      </p>

      <h2 id="failure-modes">{fr ? "Modes d’échec" : "Failure modes"}</h2>
      <ul>
        <li>
          <code>InvalidSignature</code> —{" "}
          {fr
            ? "le contenu a été altéré OU la clé publique fournie n’est pas la bonne."
            : "the content was tampered with OR the wrong public key is in use."}
        </li>
        <li>
          <code>UnsupportedAlgorithm</code> —{" "}
          {fr
            ? "version de cryptography &lt; 2.6. Mettre à jour."
            : "cryptography &lt; 2.6. Upgrade."}
        </li>
        <li>
          <code>ValueError</code> sur base64 —{" "}
          {fr
            ? "la signature a perdu des caractères en copier-coller (paddings = manquants)."
            : "signature lost characters on copy-paste (missing = padding)."}
        </li>
      </ul>
    </DocsPage>
  );
}
