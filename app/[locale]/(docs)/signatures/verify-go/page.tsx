import { setRequestLocale } from "next-intl/server";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

const SAMPLE = `package main

import (
	"crypto/ed25519"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

const publicKeySPKIB64 = "MCowBQYDK2VwAyEAojtKfh20SGGV63LMETjZBXRWo2tY0viAYziG/y3/L0s="

type Signed struct {
	DoctrineHash      string ` + "`json:\"doctrine_hash\"`" + `
	DoctrineSignature string ` + "`json:\"doctrine_signature\"`" + `
}

func main() {
	// 1. Decode the SPKI public key.
	spki, err := base64.StdEncoding.DecodeString(publicKeySPKIB64)
	if err != nil {
		fmt.Println("invalid public key encoding:", err)
		os.Exit(1)
	}
	pubAny, err := x509.ParsePKIXPublicKey(spki)
	if err != nil {
		fmt.Println("cannot parse public key:", err)
		os.Exit(1)
	}
	pub, ok := pubAny.(ed25519.PublicKey)
	if !ok {
		fmt.Println("public key is not Ed25519")
		os.Exit(1)
	}

	// 2. Load the signed tool output.
	bytesIn, err := os.ReadFile("tool-output.json")
	if err != nil {
		fmt.Println("cannot read tool output:", err)
		os.Exit(1)
	}
	var signed Signed
	if err := json.Unmarshal(bytesIn, &signed); err != nil {
		fmt.Println("cannot parse tool output:", err)
		os.Exit(1)
	}

	// 3. Recompute the signed message.
	message := []byte(signed.DoctrineHash)

	// 4. Decode the signature (strip "ed25519:" prefix, base64-decode).
	sigB64 := strings.TrimPrefix(signed.DoctrineSignature, "ed25519:")
	signature, err := base64.StdEncoding.DecodeString(sigB64)
	if err != nil {
		fmt.Println("invalid signature encoding:", err)
		os.Exit(1)
	}

	// 5. Verify.
	if ed25519.Verify(pub, message, signature) {
		fmt.Println("✓ signature valid")
	} else {
		fmt.Println("✗ signature INVALID")
		os.Exit(1)
	}
}
`;

export default async function VerifyGoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Vérifier en Go" : "Verify in Go"}
      description={
        fr
          ? "Vérifiez la signature Ed25519 d’une sortie acf-mcp en Go avec uniquement la bibliothèque standard — crypto/ed25519 et crypto/x509. Aucune dépendance externe."
          : "Verify the Ed25519 signature of an acf-mcp output in Go using only the standard library — crypto/ed25519 and crypto/x509. No external dependency."
      }
      badge={fr ? "Signatures" : "Signatures"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Aucune dépendance Go modules. <code>crypto/ed25519</code> est dans la stdlib
            depuis Go 1.13. Compilez avec <code>go build -trimpath</code> pour un binaire
            reproductible utilisable en CI ou comme outil CLI d’audit.
          </>
        ) : (
          <>
            Zero Go modules dependency. <code>crypto/ed25519</code> is in the stdlib
            since Go 1.13. Build with <code>go build -trimpath</code> for a reproducible
            binary usable in CI or as an audit CLI tool.
          </>
        )}
      </Callout>

      <h2 id="snippet">{fr ? "Snippet complet" : "Complete snippet"}</h2>
      <CodeBlock code={SAMPLE} language="go" filename="verify_doctrine.go" />

      <h2 id="package-it">{fr ? "L’empaqueter en CLI" : "Package it as a CLI"}</h2>
      <CodeBlock
        code={`go build -trimpath -ldflags="-s -w" -o acf-verify ./verify_doctrine.go
# Use:
./acf-verify  # reads ./tool-output.json
echo "exit=$?"`}
        language="bash"
        filename="build.sh"
      />

      <h2 id="failure-modes">{fr ? "Modes d’échec" : "Failure modes"}</h2>
      <ul>
        <li>
          <code>signature INVALID</code> + exit 1 —{" "}
          {fr
            ? "altération de contenu ou mauvaise clé publique. Rejouer la sortie de bout en bout."
            : "content tampered with or wrong public key. Re-run the output end to end."}
        </li>
        <li>
          <code>public key is not Ed25519</code> —{" "}
          {fr
            ? "la chaîne SPKI passée n’encode pas une clé Ed25519. Vérifier la version d’acf-mcp et la copie de la clé."
            : "the SPKI string does not encode an Ed25519 key. Check the acf-mcp version and the copy of the key."}
        </li>
        <li>
          <code>cannot parse public key</code> —{" "}
          {fr
            ? "le base64 n’est pas du DER valide. Vérifier qu’aucun retour à la ligne n’a été inséré."
            : "the base64 is not valid DER. Check that no newline was inserted."}
        </li>
      </ul>
    </DocsPage>
  );
}
