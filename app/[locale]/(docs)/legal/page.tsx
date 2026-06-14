import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocsPage } from "@/components/DocsPage";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

const MIT_NOTICE = `MIT License

Copyright (c) Vincent Dorange

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, [...]`;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  return (
    <DocsPage
      title={fr ? "Mentions légales et licences" : "Legal notice and licences"}
      description={
        fr
          ? "Le code acf-mcp est sous licence MIT. La doctrine et les supports pédagogiques sont sous Creative Commons BY-NC-SA. Les marques ACF®, Agentic Commerce Framework® et Souveraineté Agentique® appartiennent à Vincent Dorange — l’usage commercial du nom requiert une autorisation écrite."
          : "The acf-mcp code is MIT-licensed. The doctrine and the pedagogical materials are Creative Commons BY-NC-SA. The trademarks ACF®, Agentic Commerce Framework® and Souveraineté Agentique® belong to Vincent Dorange — commercial use of the name requires written permission."
      }
      badge={fr ? "Mentions légales" : "Legal notice"}
    >
      <Callout variant="info" locale={fr ? "fr" : "en"}>
        {fr ? (
          <>
            Deux licences distinctes coexistent : <strong>MIT</strong> pour le
            code du serveur (utilisation commerciale libre) et{" "}
            <strong>CC BY-NC-SA 4.0</strong> pour la doctrine et le matériel
            pédagogique (usage éducatif et recherche, partage à l’identique,
            usage commercial nécessitant autorisation).
          </>
        ) : (
          <>
            Two distinct licences coexist: <strong>MIT</strong> for the server
            code (commercial use is free) and <strong>CC BY-NC-SA 4.0</strong>{" "}
            for the doctrine and the pedagogical material (educational and
            research use, share-alike, commercial use requires written
            permission).
          </>
        )}
      </Callout>

      <h2 id="code-licence">
        {fr ? "Licence du code (MIT)" : "Code licence (MIT)"}
      </h2>
      <p>
        {fr
          ? "Le code source d’acf-mcp est publié sous licence MIT. Vous pouvez utiliser, modifier, redistribuer et vendre des produits qui l’incorporent. Préservez l’avis de copyright et la mention de licence dans toute redistribution substantielle."
          : "The acf-mcp source code is published under the MIT licence. You may use, modify, redistribute and sell products that embed it. Preserve the copyright notice and the licence statement in any substantial redistribution."}
      </p>
      <CodeBlock code={MIT_NOTICE} language="text" filename="LICENSE" />

      <h2 id="doctrine-licence">
        {fr ? "Licence de la doctrine (CC BY-NC-SA 4.0)" : "Doctrine licence (CC BY-NC-SA 4.0)"}
      </h2>
      <p>
        {fr ? (
          <>
            Le whitepaper ACF®, les 17 fiches méthodologiques et l’ensemble des
            supports pédagogiques sont distribués sous{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Commons Attribution — Non Commercial — Share Alike 4.0
              International
            </a>
            . Trois obligations : attribution explicite, pas d’usage commercial
            sans autorisation, partage à l’identique des œuvres dérivées.
          </>
        ) : (
          <>
            The ACF® whitepaper, the 17 methodological cards and all
            pedagogical materials are distributed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Commons Attribution — Non Commercial — Share Alike 4.0
              International
            </a>
            . Three obligations: explicit attribution, no commercial use without
            permission, share-alike on derivative works.
          </>
        )}
      </p>

      <h2 id="trademarks">
        {fr ? "Marques déposées" : "Registered trademarks"}
      </h2>
      <p>
        {fr
          ? "Les noms suivants sont des marques déposées de Vincent Dorange à l’INPI :"
          : "The following names are trademarks of Vincent Dorange registered with INPI (France):"}
      </p>
      <ul>
        <li>
          <strong>ACF®</strong>{" "}
          {fr
            ? "et"
            : "and"}{" "}
          <strong>Agentic Commerce Framework®</strong>
        </li>
        <li>
          <strong>Souveraineté Agentique®</strong>
        </li>
      </ul>
      <p>
        {fr
          ? "Vous pouvez mentionner ces noms à des fins descriptives ou pour décrire votre adoption du standard (par exemple : « agent conforme ACF® v1.0 »). Tout usage commercial du nom ACF® dans une offre, un produit, un service ou une marque dérivée requiert une autorisation écrite préalable."
          : "You may mention these names for descriptive purposes or to describe your adoption of the standard (e.g. “ACF® v1.0-compliant agent”). Any commercial use of the ACF® name in an offer, a product, a service or a derivative mark requires prior written permission."}
      </p>
      <p>
        {fr
          ? "Un moteur d’aide à la décision propriétaire est par ailleurs protégé par brevet INPI déposé en France. Aucun détail technique de ce moteur n’est diffusé publiquement."
          : "A proprietary decision-support engine is also protected by an INPI patent filed in France. No technical detail of that engine is disclosed publicly."}
      </p>

      <h2 id="warranty">
        {fr ? "Garantie et responsabilité" : "Warranty and liability"}
      </h2>
      <p>
        {fr
          ? "Le serveur acf-mcp produit une qualification préliminaire opposable, pas un avis juridique et pas une certification de conformité. La décision finale appartient au DDAO (Designated Deployer of Autonomous Operations) ou au juriste compétent. Aucune garantie n’est accordée au-delà de ce que prévoit la licence MIT."
          : "The acf-mcp server produces a defensible preliminary qualification, not legal advice and not a compliance certification. The final decision belongs to the DDAO (Designated Deployer of Autonomous Operations) or the competent counsel. No warranty is granted beyond what the MIT licence provides."}
      </p>

      <h2 id="contact">
        {fr ? "Contact et éditeur" : "Contact and editor"}
      </h2>
      <ul>
        <li>
          <strong>{fr ? "Éditeur" : "Editor"}</strong>: Vincent Dorange
        </li>
        <li>
          <strong>{fr ? "Contact" : "Contact"}</strong>:{" "}
          <a href="mailto:dorange.vincent@gmail.com">dorange.vincent@gmail.com</a>
        </li>
        <li>
          <strong>{fr ? "Sécurité" : "Security"}</strong>:{" "}
          <Link href="/security">{fr ? "voir politique dédiée" : "see dedicated policy"}</Link>
        </li>
        <li>
          <strong>{fr ? "Contributions" : "Contributions"}</strong>:{" "}
          <Link href="/contributing">{fr ? "voir page contribuer" : "see contributing page"}</Link>
        </li>
      </ul>
    </DocsPage>
  );
}
