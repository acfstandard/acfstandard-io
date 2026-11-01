import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

// Real responses of acf-mcp 2.0.1.
const VALIDATION_ERROR = `{
  "jsonrpc": "2.0",
  "id": 2,
  "error": {
    "code": -32603,
    "message": "[\\n  {\\n    \\"received\\": \\"N2\\",\\n    \\"code\\": \\"invalid_enum_value\\",\\n    \\"options\\": [\\n      \\"suggestive\\",\\n      \\"co_decision\\",\\n      \\"supervised_autonomous\\",\\n      \\"autonomous\\"\\n    ],\\n    \\"path\\": [\\n      \\"autonomy_level\\"\\n    ],\\n    \\"message\\": \\"Invalid enum value. Expected 'suggestive' | 'co_decision' | 'supervised_autonomous' | 'autonomous', received 'N2'\\"\\n  }\\n]"
  }
}`;

const NOT_FOUND_ERROR = `{
  "jsonrpc": "2.0",
  "id": 4,
  "error": {
    "code": -32603,
    "message": "Fiche ACF-00 not found in any locale chain for en"
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
      title={fr ? "Erreurs" : "Errors"}
      description={
        fr
          ? "Ce que renvoie acf-mcp quand un appel échoue : une erreur JSON-RPC dont le message dit précisément ce qui ne va pas. Le serveur ne devine jamais une valeur à votre place."
          : "What acf-mcp returns when a call fails: a JSON-RPC error whose message states precisely what is wrong. The server never guesses a value for you."
      }
      badge={fr ? "Référence" : "Reference"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr
          ? "Toutes les erreurs arrivent avec le code JSON-RPC -32603. Il n’y a pas de code d’erreur propre à ACF® : c’est le texte du message qui distingue les cas et il est fait pour être lu par un agent comme par un humain."
          : "All errors arrive with JSON-RPC code -32603. There is no ACF®-specific error code: the message text tells the cases apart, and it is written to be read by an agent as well as by a human."}
      </Callout>

      <h2 id="validation">{fr ? "Paramètres invalides" : "Invalid parameters"}</h2>
      <p>
        {fr
          ? "Chaque outil valide ses entrées contre son schéma avant tout calcul. Une valeur hors énumération, un champ manquant ou une longueur hors bornes fait échouer l’appel ; le message est la liste des problèmes, chacun avec le champ en cause (path), la valeur reçue et les valeurs admises."
          : "Every tool validates its inputs against its schema before any computation. A value outside an enum, a missing field or an out-of-range length makes the call fail; the message is the list of issues, each with the offending field (path), the received value and the allowed values."}
      </p>
      <CodeBlock code={VALIDATION_ERROR} language="json" filename="validation-error.json" />
      <p>
        {fr ? (
          <>
            Cas fréquent depuis la 2.0.0 : l’ancien <code>acf_level</code> (N0 à N3) est refusé ; le champ
            s’appelle <code>autonomy_level</code> et prend les 4 niveaux d’autonomie déléguée. Voir{" "}
            <Link href="/doctrine/autonomy-levels">Autonomie et maturité</Link>.
          </>
        ) : (
          <>
            A frequent case since 2.0.0: the former <code>acf_level</code> (N0 to N3) is rejected; the field
            is called <code>autonomy_level</code> and takes the 4 delegated autonomy levels. See{" "}
            <Link href="/doctrine/autonomy-levels">Autonomy and maturity</Link>.
          </>
        )}
      </p>

      <h2 id="not-found">{fr ? "Ressource introuvable" : "Resource not found"}</h2>
      <p>
        {fr
          ? "Un code ou un terme valide en forme mais absent du corpus produit un message explicite :"
          : "A code or term that is well-formed but absent from the corpus produces an explicit message:"}
      </p>
      <CodeBlock code={NOT_FOUND_ERROR} language="json" filename="not-found.json" />
      <ul>
        <li>
          <code>Fiche ACF-XX not found in any locale chain</code>
          {fr ? " : fiche absente, par exemple l’ancien ACF-00." : ": card absent, for instance the former ACF-00."}
        </li>
        <li>
          <code>Glossary entry not found: …</code>
          {fr ? " : terme hors glossaire ; passez par acf.search." : ": term not in the glossary; go through acf.search."}
        </li>
        <li>
          <code>Article … not found. Available articles for …</code>
          {fr ? " : article non couvert ; le message liste ceux qui le sont." : ": article not covered; the message lists the covered ones."}
        </li>
        <li>
          <code>Invalid scheme: expected acf://</code>, <code>Unknown ACF URI</code>
          {fr ? " : URI mal formée ; récupérez-la avec resources/list ou acf.search." : ": malformed URI; get it from resources/list or acf.search."}
        </li>
        <li>
          <code>Unknown tool: …</code>
          {fr ? " : nom d’outil inconnu ; la liste des 13 outils se lit avec tools/list." : ": unknown tool name; the list of the 13 tools comes from tools/list."}
        </li>
      </ul>

      <h2 id="recovery">{fr ? "Que faire" : "What to do"}</h2>
      <ul>
        <li>
          {fr
            ? "Corrigez la valeur indiquée par le message et rappelez l’outil : aucun appel n’a d’effet de bord, il peut être rejoué sans risque."
            : "Fix the value the message points to and call the tool again: no call has side effects, it can be replayed safely."}
        </li>
        <li>
          {fr
            ? "Quand un outil répond mais avec confidence à low, ce n’est pas une erreur : lisez assumptions et gaps_to_validate, puis complétez l’entrée."
            : "When a tool answers with confidence at low, it is not an error: read assumptions and gaps_to_validate, then complete the input."}
        </li>
        <li>
          {fr ? (
            <>Vérifiez la version installée (<code>npx acf-mcp@latest</code>) si une fiche ou un outil attendu manque.</>
          ) : (
            <>Check the installed version (<code>npx acf-mcp@latest</code>) if an expected card or tool is missing.</>
          )}
        </li>
      </ul>

      <h2 id="see-also">{fr ? "Voir aussi" : "See also"}</h2>
      <ul>
        <li>
          <Link href="/tools">{fr ? "Référence des outils" : "Tools reference"}</Link>
        </li>
        <li>
          <Link href="/resources">{fr ? "Référence des ressources" : "Resources reference"}</Link>
        </li>
      </ul>
    </DocsPage>
  );
}
