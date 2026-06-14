import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { ParamGroup, Param } from "@/components/Param";

const ERROR_SHAPE = `{
  "jsonrpc": "2.0",
  "id": 42,
  "error": {
    "code": -32602,
    "message": "InvalidEnumValue: autonomy_level must be one of N0, N1, N2, N3",
    "data": {
      "kind": "InvalidEnumValue",
      "field": "autonomy_level",
      "received": "N4",
      "allowed": ["N0", "N1", "N2", "N3"],
      "hint": "Use N3 for fully autonomous agents acting without human-in-the-loop."
    }
  }
}`;

export default async function ErrorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Codes d’erreur" : "Error codes"}
      description={
        fr
          ? "acf-mcp utilise les codes d’erreur MCP/JSON-RPC standards. Chaque erreur embarque un champ kind (machine-readable), une description humaine et un hint d’action. Cette page liste les erreurs courantes et leur résolution."
          : "acf-mcp uses standard MCP/JSON-RPC error codes. Every error embeds a kind field (machine-readable), a human description and an action hint. This page lists the common errors and how to fix them."
      }
      badge={fr ? "Démarrer" : "Get started"}
    >
      <Callout variant="tip" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Toutes les erreurs incluent un champ <code>hint</code> dans{" "}
            <code>data</code>. Quand votre agent reçoit une erreur, lisez le
            hint en priorité — il est calibré pour donner l’action de
            remédiation la plus courte.
          </>
        ) : (
          <>
            Every error includes a <code>hint</code> field inside{" "}
            <code>data</code>. When your agent receives an error, read the hint
            first — it is calibrated to give the shortest remediation action.
          </>
        )}
      </Callout>

      <h2 id="shape">
        {fr ? "Forme d’une erreur" : "Error shape"}
      </h2>
      <p>
        {fr
          ? "Les erreurs suivent la spécification JSON-RPC 2.0 : un code numérique, un message court, un champ data structuré. Le champ data.kind est l’identifiant machine stable que vous devez matcher pour brancher votre logique de récupération."
          : "Errors follow the JSON-RPC 2.0 spec: a numeric code, a short message, a structured data field. The data.kind field is the stable, machine-readable identifier you should match to branch your recovery logic."}
      </p>
      <CodeBlock code={ERROR_SHAPE} language="json" filename="error-example.json" />

      <h2 id="common-errors">
        {fr ? "Erreurs courantes" : "Common errors"}
      </h2>
      <ParamGroup>
        <Param name="InvalidEnumValue" type="-32602">
          {fr
            ? "Levée par les outils REASON quand un champ enum (autonomy_level, principle_id, role, etc.) ne correspond pas à la liste canonique de la doctrine. Le hint indique la valeur la plus probable au vu de l’entrée."
            : "Raised by REASON tools when an enum field (autonomy_level, principle_id, role, etc.) is not in the canonical doctrine list. The hint indicates the most likely intended value given the input."}
        </Param>
        <Param name="InputTooShort" type="-32602">
          {fr
            ? "Levée quand un champ texte (typiquement description ou use_case_domain) fait moins de 20 caractères. Le moteur refuse les entrées trop pauvres pour produire une qualification opposable."
            : "Raised when a text field (typically description or use_case_domain) is shorter than 20 characters. The engine refuses inputs too thin to produce a defensible qualification."}
        </Param>
        <Param name="DoctrineSnapshotMismatch" type="-32602">
          {fr
            ? "Levée quand l’appel demande un doctrine_version qui n’est pas la version actuellement chargée par le serveur. Mettez à jour le serveur (npx -y acf-mcp@latest) ou retirez le paramètre pour utiliser la version courante."
            : "Raised when the call requests a doctrine_version that is not the one currently loaded by the server. Update the server (npx -y acf-mcp@latest) or drop the parameter to use the current version."}
        </Param>
        <Param name="ResourceNotFound" type="-32601">
          {fr
            ? "Levée par les outils READ quand l’URI acf://… demandée n’existe pas dans le corpus chargé. Vérifiez l’orthographe canonique via list-fiches ou search."
            : "Raised by READ tools when the requested acf://… URI is not in the loaded corpus. Check the canonical spelling via list-fiches or search."}
        </Param>
        <Param name="RateLimitExceeded" type="-32000">
          {fr
            ? "Mode HTTP uniquement. L’IP appelante a dépassé 60 appels/minute (défaut). Réessayez après le retry-after indiqué dans data."
            : "HTTP mode only. The calling IP has exceeded 60 calls/minute (default). Retry after the retry-after value in data."}
        </Param>
      </ParamGroup>

      <h2 id="parse-and-protocol">
        {fr ? "Erreurs de parsing et de protocole" : "Parse and protocol errors"}
      </h2>
      <ParamGroup>
        <Param name="ParseError" type="-32700">
          {fr
            ? "Le client a envoyé du JSON invalide. Vérifiez votre sérialiseur."
            : "The client sent invalid JSON. Check your serializer."}
        </Param>
        <Param name="InvalidRequest" type="-32600">
          {fr
            ? "Le message JSON-RPC est mal formé (jsonrpc != 2.0, méthode manquante, etc.)."
            : "The JSON-RPC message is malformed (jsonrpc != 2.0, missing method, etc.)."}
        </Param>
        <Param name="MethodNotFound" type="-32601">
          {fr
            ? "Méthode inconnue. Utilisez tools/list et resources/list pour découvrir les méthodes supportées."
            : "Unknown method. Use tools/list and resources/list to discover supported methods."}
        </Param>
        <Param name="InternalError" type="-32603">
          {fr
            ? "Erreur interne inattendue côté serveur. Ouvrez une issue en joignant les logs (cf. contributing)."
            : "Unexpected internal server error. Open an issue with logs attached (see contributing)."}
        </Param>
      </ParamGroup>

      <h2 id="recovery">
        {fr ? "Stratégies de récupération" : "Recovery strategies"}
      </h2>
      <ul>
        <li>
          <strong>InvalidEnumValue / InputTooShort</strong> —{" "}
          {fr
            ? "demandez à l’utilisateur de préciser, ou rappelez-vous des valeurs canoniques via la ressource glossary."
            : "ask the user to clarify, or recall the canonical values via the glossary resource."}
        </li>
        <li>
          <strong>DoctrineSnapshotMismatch</strong> —{" "}
          {fr
            ? "informez l’utilisateur que la version de doctrine demandée n’est plus chargée ; proposez la version courante."
            : "tell the user the requested doctrine version is no longer loaded; propose the current version."}
        </li>
        <li>
          <strong>ResourceNotFound</strong> —{" "}
          {fr
            ? "utilisez search ou list-fiches pour proposer une URI proche."
            : "use search or list-fiches to propose a near-match URI."}
        </li>
        <li>
          <strong>RateLimitExceeded</strong> —{" "}
          {fr
            ? "implémentez un backoff exponentiel ; vérifiez que vos appels ne sont pas en boucle."
            : "implement an exponential backoff; check your calls are not in a loop."}
        </li>
      </ul>

      <h2 id="see-also">
        {fr ? "Voir aussi" : "See also"}
      </h2>
      <ul>
        <li>
          <Link href="/docs/configuration">
            {fr ? "Configuration" : "Configuration"}
          </Link>{" "}
          —{" "}
          {fr
            ? "comment ajuster les limites de débit en mode HTTP."
            : "how to tune rate limits in HTTP mode."}
        </li>
        <li>
          <Link href="/docs/faq">{fr ? "FAQ" : "FAQ"}</Link> —{" "}
          {fr
            ? "questions fréquentes sur le comportement du serveur."
            : "frequent questions about the server’s behaviour."}
        </li>
      </ul>
    </DocsPage>
  );
}
