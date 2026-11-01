import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { FICHES } from "@/lib/fiches";

export default async function FichesResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Ressources : les 45 fiches" : "Resources: the 45 cards"}
      description={
        fr
          ? "Les 45 fiches du toolkit ACF® exposées comme ressources MCP, une par fiche, sous l'URI acf://fiche/ACF-XX : Décider (ACF-01 à ACF-20), Organiser (ACF-O1 à ACF-O10), Opérer (ACF-P1 à ACF-P15). Chaque fiche est servie en Markdown, en français et en anglais."
          : "The 45 ACF® toolkit cards exposed as MCP resources, one per card, at acf://fiche/ACF-XX: Decide (ACF-01 to ACF-20), Organise (ACF-O1 to ACF-O10), Operate (ACF-P1 to ACF-P15). Each card is served as Markdown, in French and English."
      }
      badge={fr ? "Ressources" : "Resources"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Une fiche est une recette opérationnelle : elle se remplit, se date et se signe.
            Pour savoir laquelle mobiliser sur un cas, l'outil{" "}
            <Link href={"/tools/acf.advisor" as never}>
              <code>acf.advisor</code>
            </Link>{" "}
            propose une séquence de fiches à partir d'une description en texte libre.
          </>
        ) : (
          <>
            A card is an operational recipe: it is filled in, dated and signed. To know which
            one to use on a case, the{" "}
            <Link href={"/tools/acf.advisor" as never}>
              <code>acf.advisor</code>
            </Link>{" "}
            tool proposes a sequence of cards from a free-text description.
          </>
        )}
      </Callout>

      <h2 id="what-this-contains">{fr ? "Ce que cette catégorie contient" : "What this contains"}</h2>
      <p>
        {fr
          ? "45 ressources, une par fiche, de type text/markdown. Chaque fiche reprend le titre, le sous-titre, l'objectif et les sections de la fiche imprimable publiée sur acfstandard.com, avec le lien de téléchargement. L'outil acf.fiche.lookup renvoie le même contenu avec le lien du PDF et, sur demande, les métadonnées."
          : "45 resources, one per card, of type text/markdown. Each card carries the title, subtitle, purpose and sections of the printable card published on acfstandard.com, with the download link. The acf.fiche.lookup tool returns the same content with the PDF link and, on request, the metadata."}
      </p>

      <h2 id="list">
        {fr ? "Liste exhaustive" : "Exhaustive list"}{" "}
        <span className="ml-2 font-mono text-base text-gold/70">×{FICHES.length}</span>
      </h2>
      <div className="not-prose mt-4 space-y-2">
        {FICHES.map((f) => (
          <div key={f.code} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <code className="font-mono text-[13px] font-semibold text-gold">acf://fiche/{f.code}</code>
              <span className="rounded border border-emerald-400/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300/80">
                Markdown
              </span>
              <span className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-navy-50/65">
                FR + EN
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy-50/50">
              {f.code} · {fr ? f.titleFr : f.titleEn}
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-navy-50/75">{fr ? f.subtitleFr : f.subtitleEn}</p>
          </div>
        ))}
      </div>

      <h2 id="fetching-this-category">{fr ? "Récupérer une fiche" : "Fetching a card"}</h2>
      <p>
        {fr
          ? "Un appel resources/read sur l'URI de la fiche. La langue se choisit avec le paramètre ?lang=fr ou ?lang=en, sinon avec la variable d'environnement ACF_MCP_LOCALE, l'anglais par défaut. La réponse commence par un en-tête qui indique la langue effectivement servie."
          : "A resources/read call on the card URI. The language is chosen with the ?lang=fr or ?lang=en parameter, otherwise with the ACF_MCP_LOCALE environment variable, English by default. The response starts with a header stating the language actually served."}
      </p>
      <CodeBlock
        language="ts"
        filename="fetch-fiche.ts"
        code={`// Read ACF-13, Agent Mandate, in French
const { contents } = await client.readResource({
  uri: "acf://fiche/ACF-13?lang=fr",
});

console.log(contents[0].mimeType); // "text/markdown"
console.log(contents[0].text);
// ---
// served_locale: fr
// is_fallback: false
// ---
//
// # Mandat d'Agent
//
// *Définir le périmètre, les limites et les responsabilités de chaque agent déployé*
// ...`}
      />
    </DocsPage>
  );
}
