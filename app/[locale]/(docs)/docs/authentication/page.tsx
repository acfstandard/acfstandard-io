import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

const BEARER_EXAMPLE = `POST /mcp HTTP/1.1
Host: acf.internal.example.com:3000
Authorization: Bearer acfk_4f9b2c8e1d6a3b7f0c5d8e2a9b4c7f1d
Content-Type: application/json

{ "jsonrpc": "2.0", "method": "tools/call", "params": { ... } }`;

const GATEWAY_SKETCH = `# Example: a thin Caddy reverse proxy in front of acf-mcp HTTP
acf.internal.example.com {
  @authed header Authorization "Bearer {env.ACF_INTERNAL_KEY}"
  handle @authed {
    reverse_proxy 127.0.0.1:3000
  }
  respond 401
}`;

export default async function AuthenticationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Authentification" : "Authentication"}
      description={
        fr
          ? "En mode stdio (le défaut), acf-mcp n’a pas d’authentification — le client local est la frontière de confiance. En mode HTTP, vous apportez votre propre passerelle d’authentification. La signature Ed25519 du pied de page est le mécanisme de confiance de la SORTIE, pas de l’appel."
          : "In stdio mode (the default), acf-mcp has no authentication — the local client is the trust boundary. In HTTP mode, you bring your own authentication gateway. The Ed25519 signature in the footer is the trust mechanism for the OUTPUT, not for the call."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            La signature de doctrine prouve que <em>ce que le serveur a produit</em>
            n’a pas été altéré. Elle ne prouve <em>pas</em> que l’appel est
            légitime. Pour cela, utilisez stdio (local) ou une passerelle HTTP
            authentifiée.
          </>
        ) : (
          <>
            The doctrine signature proves that <em>what the server produced</em>
            has not been tampered with. It does <em>not</em> prove that the call
            is legitimate. For that, use stdio (local) or an authenticated HTTP
            gateway.
          </>
        )}
      </Callout>

      <h2 id="stdio-mode">
        {fr ? "Mode stdio (local)" : "stdio mode (local)"}
      </h2>
      <p>
        {fr
          ? "Le transport par défaut. Le client MCP lance le binaire acf-mcp comme processus enfant et lui parle via stdin/stdout. Il n’y a pas d’authentification parce qu’il n’y a pas de réseau : seul un processus qui a déjà accès au shell de l’utilisateur peut atteindre le serveur. Le modèle de confiance est celui du système d’exploitation."
          : "The default transport. The MCP client launches the acf-mcp binary as a child process and talks to it via stdin/stdout. There is no authentication because there is no network: only a process that already has access to the user’s shell can reach the server. The trust model is the operating system’s."}
      </p>
      <p>
        {fr
          ? "C’est le mode recommandé pour les déploiements mono-utilisateur (un développeur, un client IA, une machine)."
          : "This is the recommended mode for single-user deployments (one developer, one AI client, one machine)."}
      </p>

      <h2 id="http-mode">
        {fr ? "Mode HTTP (multi-utilisateurs)" : "HTTP mode (multi-user)"}
      </h2>
      <p>
        {fr
          ? "Le transport HTTP est opt-in (cf. configuration). Il expose un endpoint MCP-over-HTTP, conçu pour être placé derrière votre propre passerelle d’authentification. Le serveur lui-même n’embarque actuellement pas de magasin de clés — vous apportez le vôtre."
          : "The HTTP transport is opt-in (see configuration). It exposes an MCP-over-HTTP endpoint, intended to sit behind your own authentication gateway. The server itself currently ships no key store — you bring your own."}
      </p>

      <h3 id="bearer-header">
        {fr ? "En-tête Authorization: Bearer" : "Authorization: Bearer header"}
      </h3>
      <p>
        {fr
          ? "L’usage attendu, conforme aux pratiques MCP-over-HTTP, est de transmettre une clé API dans l’en-tête Authorization."
          : "The expected usage, in line with MCP-over-HTTP practices, is to pass an API key in the Authorization header."}
      </p>
      <CodeBlock code={BEARER_EXAMPLE} language="http" />

      <h3 id="byo-gateway">
        {fr ? "Votre passerelle, vos clés" : "Bring your own gateway"}
      </h3>
      <p>
        {fr
          ? "L’approche officiellement supportée aujourd’hui : placez un reverse-proxy authentifié (Caddy, nginx, Cloudflare Access, Tailscale, etc.) devant acf-mcp HTTP et terminez l’authentification là. Le serveur n’a aucune notion d’utilisateur ; il fait juste son travail déterministe et signe la sortie."
          : "The officially supported approach today: place an authenticated reverse proxy (Caddy, nginx, Cloudflare Access, Tailscale, etc.) in front of acf-mcp HTTP and terminate authentication there. The server has no notion of user; it just does its deterministic job and signs the output."}
      </p>
      <CodeBlock code={GATEWAY_SKETCH} language="caddyfile" filename="Caddyfile" />

      <h3 id="keygen-planned">
        {fr
          ? "Génération de clés intégrée (prévue)"
          : "Built-in key generation (planned)"}
      </h3>
      <p>
        {fr ? (
          <>
            Une commande <code>npx acf-mcp keygen</code> est planifiée pour
            émettre des clés API au format <code>acfk_…</code>, persistées
            localement, vérifiables sans dépendance externe. En attendant, votre
            passerelle (au-dessus) reste le point d’entrée d’authentification.
          </>
        ) : (
          <>
            A <code>npx acf-mcp keygen</code> command is planned to mint API
            keys in the <code>acfk_…</code> format, persisted locally,
            verifiable without an external dependency. Until then, your gateway
            (above) remains the authentication entry point.
          </>
        )}
      </p>

      <h2 id="rate-limits">
        {fr ? "Limites de débit" : "Rate limits"}
      </h2>
      <p>
        {fr
          ? "En mode HTTP, le serveur applique un rate-limit par défaut de 60 appels par minute et par IP. C’est une protection minimale contre les boucles d’agents mal cadrées ; ce n’est pas une stratégie anti-DDoS. Placez un WAF ou Cloudflare devant pour un trafic exposé sur l’internet public."
          : "In HTTP mode the server applies a default rate limit of 60 calls per minute per IP. It is a minimal guard against runaway agent loops; it is not an anti-DDoS strategy. Place a WAF or Cloudflare in front for traffic exposed to the public internet."}
      </p>

      <h2 id="signed-output">
        {fr ? "La signature reste la racine de confiance" : "The signature remains the root of trust"}
      </h2>
      <p>
        {fr ? (
          <>
            Quel que soit le transport, chaque sortie embarque{" "}
            <code>doctrine_hash</code>, <code>doctrine_signature</code> et{" "}
            <code>doctrine_public_key</code>. Un consommateur en aval peut donc
            valider l’authenticité de la doctrine et son intégrité même s’il ne
            fait pas confiance au transport. Voir{" "}
            <Link href="/signatures">signatures de doctrine</Link>.
          </>
        ) : (
          <>
            Whatever the transport, every output embeds{" "}
            <code>doctrine_hash</code>, <code>doctrine_signature</code> and{" "}
            <code>doctrine_public_key</code>. A downstream consumer can
            therefore validate doctrine authenticity and integrity even without
            trusting the transport. See{" "}
            <Link href="/signatures">doctrine signatures</Link>.
          </>
        )}
      </p>
    </DocsPage>
  );
}
