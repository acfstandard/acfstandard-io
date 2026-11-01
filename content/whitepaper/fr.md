---
title: "ACF®, Livre blanc"
doc_type: whitepaper
lang: fr
version: "2.1"
published_at: "2026-06"
author: "Vincent Dorange"
publisher: "Vincent Dorange"
classification: "Public"
canonical_url: "https://acfstandard.com/whitepaper-fr.pdf"
supersedes: "2.0 (juin 2026, édition initiale)"
---

# ACF®, AGENTIC COMMERCE FRAMEWORK®
## L'infrastructure de confiance de la décision agentique
### Gouverner. Mesurer. Prouver.

**Livre blanc · Vincent Dorange**

*www.acfstandard.com · www.acfstandard.io*

---

## Sommaire

1. Résumé exécutif, *Gouverner. Mesurer. Prouver.*
2. Le défi 2026-2027, pourquoi maintenant
3. La catégorie « gouvernance agentique » et la place d'ACF®, l'infrastructure de confiance décisionnelle
4. Le cadre ACF®, principes, couches, niveaux, rôles
5. Les 45 fiches du référentiel
6. La méthodologie de déploiement
7. Le protocole d'arrêt d'urgence à trois niveaux
8. ACF® face aux référentiels existants, la matrice de correspondance
9. L'écosystème ACF®, une infrastructure, quatre manifestations
10. Différenciateurs techniques, preuve cryptographique
11. À propos & contact
12. Mentions

---

## 1. Résumé exécutif

L'**Agentic Commerce Framework®** (ACF®) n'est pas un référentiel de plus. C'est l'**infrastructure de confiance décisionnelle** européenne (dénomination internationale : *Decision Trust Infrastructure*) : celle à laquelle une organisation adhère pour que les décisions prises par ses agents IA restent vérifiables et défendables des années plus tard, devant un régulateur, un auditeur, un tribunal ou un assureur. Comme TLS est l'infrastructure de confiance du web et SWIFT celle du règlement interbancaire, ACF® se positionne comme la couche commune que rejoignent les organisations qui mettent en production des agents IA à conséquence, que ce soit dans le commerce, la finance, les services, la santé, l'énergie, les ressources humaines, le marketing ou les opérations.

Porté par **Vincent Dorange**, ACF® se résume en trois verbes : *Gouverner. Mesurer. Prouver.* (signature internationale : *Govern. Measure. Prove.*). Le standard gouverne, par sa doctrine, ses fiches et le rôle DDAO. L'**ACF Sovereignty Score™** mesure, sur une échelle de 0 à 100, la souveraineté décisionnelle que l'organisation conserve. **ACF Compliance** prouve, par une trace cryptographique qu'un tiers peut vérifier indépendamment. Cette articulation répond à un vide précis : les référentiels existants (EU AI Act, ISO/IEC 42001, NIST AI RMF, RGPD, COBIT) disent ce qu'il faut faire, mais ils ne disent ni comment opérer, ni comment mesurer, ni comment prouver. ACF® comble ce vide.

ACF® articule quatre principes fondateurs, quatre couches, quatre niveaux de maturité (N0 à N3), 45 fiches prêtes à l'emploi (20 pour Décider, 10 pour Organiser et 15 pour Opérer) et un rôle nommé, le **DDAO** (Delegated Decision Agent Officer), qui porte la responsabilité humaine de chaque agent en production. L'ensemble s'adosse à une traçabilité cryptographique vérifiable indépendamment (signatures Ed25519, empreintes SHA-256, horodatage signé Ed25519), qui rend chaque décision agentique auditable sans dépendre de l'infrastructure du déployeur.

Le cadre ne remplace pas les standards en vigueur : il les opérationnalise au niveau de la décision. Les fiches de la famille Décider sont mises en correspondance avec un article de l'EU AI Act, une clause d'ISO/IEC 42001, une fonction du NIST AI RMF, un article du RGPD et un domaine de COBIT 2019. Toute équipe de conformité peut ainsi intégrer ACF® dans sa piste d'audit existante en quelques minutes.

Le régime d'application haut-risque de l'EU AI Act entre en vigueur le 2 décembre 2027 pour les systèmes agentiques opérant dans les services essentiels (crédit, assurance, énergie, santé, justice). Les organisations qui auront déployé d'ici là des agents sans cadre de gouvernance opérationnel se trouveront face à une obligation rétroactive de mise en conformité, sans documentation et sans piste d'audit recevable. ACF® est conçu pour qu'aucune ligne d'audit ne manque à ce moment-là.

L'écosystème ACF® s'organise autour de quatre manifestations de l'infrastructure de confiance : l'ACF Sovereignty Score™ (la métrique), ACF Compliance (la preuve), le serveur MCP `acf-mcp` (le moteur d'exécution) et la doctrine (le corpus : 45 fiches, 4 couches, échelle N0-N3). S'y ajoutent quatre outils gratuits à libre accès (ACF Score pour l'auto-diagnostic, ACF AI Act Checker, Audit Flash de conformité, Plan Compliance personnalisé) et trois produits commerciaux complémentaires (ACF Auditor, ACF Control, ACF Certification). Le serveur MCP, quant à lui, expose la doctrine ACF® comme ressource native aux copilotes IA (Claude, Cursor, Windsurf, Continue, Zed), avec des outils REASON déterministes signés.

---

## 2. Le défi 2026-2027, pourquoi maintenant

### 2.1. Le commerce agentique, avant-garde d'un phénomène général

En 2024-2025, le commerce agentique s'est joué dans les démonstrations. En 2026, il est entré en production. Sept protocoles concurrents ont été publiés en dix-huit mois : MCP (Anthropic, novembre 2024), Operator (OpenAI, janvier 2025), Mariner (Google, décembre 2024), TAP (Visa, octobre 2025), Agent Pay (Mastercard, 2025), ACP (Stripe + OpenAI, 2025) et TACP (Forter, 2025). Walmart, Wells Fargo, Klarna, Expedia ou Sephora ont annoncé ou déployé des agents agissant directement sur des transactions à valeur réelle. Selon Bain & Company, un achat e-commerce sur cinq pourrait être initié par un agent autonome aux États-Unis d'ici 2028.

Le commerce sert ici de laboratoire, non de frontière. C'est le premier terrain où des agents engagent l'organisation sur des transactions réelles, parce que la boucle entre la décision, l'exécution et l'argent y est la plus courte ; c'est pour cette raison qu'il révèle en avance ce qui attend les autres secteurs. Le même mouvement est déjà à l'œuvre partout où une décision se délègue : appui au scoring de crédit et arbitrages en banque et en assurance, tri et présélection de candidatures dans les ressources humaines, aide à la décision et à l'orientation des patients en santé, instruction de dossiers dans le secteur public. Le standard assume cette origine : l'Agentic Commerce Framework® est né sur ce premier terrain, et son ambition couvre aujourd'hui toute décision déléguée à un agent.

Pour toute organisation européenne qui déploie des agents à conséquence, le sujet n'est donc plus prospectif. Il est concurrentiel et réglementaire.

### 2.2. Le risque silencieux : l'absence de cadre opérationnel

Aucun de ces protocoles ne dit qui supervise l'agent, selon quels critères, avec quelle traçabilité. Tous postulent qu'une équipe interne reconstituera cette couche au-dessus. Pour une PME, une ETI ou un groupe européen, cette reconstitution n'est pas tenable, parce qu'elle suppose un dialogue continu entre la DSI, le DPO, le RSSI, la conformité, le métier et la direction juridique, sans grille de lecture commune et sans documentation type.

Le résultat est observable sur le terrain. Sur un échantillon de cas observés par l'auteur fin 2025-début 2026 (sous couverture de confidentialité, les organisations concernées ne pouvant être nommées), sur dix entreprises qui exploitent un agent en production :

- 8 sur 10 n'ont pas de personne nommément responsable des décisions de l'agent ;
- 9 sur 10 ne disposent pas d'un journal cryptographiquement signé des décisions agentiques ;
- 10 sur 10 ne peuvent pas produire, à la demande d'un auditeur, la trace complète d'une décision précise prise par l'agent un mardi à 14 h 12.

Ces trois manques cumulés constituent ce que l'EU AI Act appelle, à l'article 14 et à l'article 26(6), un défaut de supervision humaine et un défaut de tenue de journaux d'événements. À partir du 2 décembre 2027, le régime haut-risque s'applique et ces défauts deviennent sanctionnables, avec des amendes pouvant atteindre 35 millions d'euros ou 7 % du chiffre d'affaires mondial.

### 2.3. Une fenêtre d'action de 18 mois

Le calendrier est aujourd'hui calé. Entre juin 2026 et décembre 2027, les entreprises ont environ 18 mois pour structurer leur gouvernance agentique : nommer un responsable, documenter chaque agent, construire le journal de décisions, formaliser un mécanisme d'arrêt d'urgence (kill switch), et démontrer aux instances de gouvernance interne (comité d'audit, comité des risques, conseil d'administration) qu'un cadre est en place.

ACF® a été conçu pour rendre ces 18 mois opérables sans recommencer à zéro. Le cadre est un ensemble de gestes posés, non une déclaration d'intention.

---

## 3. La catégorie « gouvernance agentique » et la place d'ACF®

### 3.1. Chaque domaine a son référentiel dominant

Les domaines de gouvernance numérique se sont construits par cristallisation autour d'un référentiel structurant :

| Domaine | Référentiel dominant |
| --- | --- |
| Cybersécurité | ISO/IEC 27001 |
| Vie privée | RGPD |
| Intelligence artificielle | ISO/IEC 42001 |
| IA réglementée | EU AI Act |
| **Gouvernance agentique** | **ACF®** |

ISO 27001 n'a pas remplacé les pratiques de sécurité existantes ; il les a rendues lisibles, certifiables et comparables. Le RGPD n'a pas inventé la protection des données, il en a fait une obligation universelle dans l'Union. De la même façon, ISO/IEC 42001 dote la gestion de l'IA d'un système de management certifiable qu'elle n'avait pas, et l'EU AI Act encadre les usages à risque d'une technologie qu'il n'a pas créée.

ACF® s'inscrit dans cette filiation. L'autonomie des systèmes n'est pas un sous-thème de l'IA : c'est un domaine en soi, qui a ses risques (dérive, hallucination opérationnelle, escalade non contrôlée), son rôle dédié (le DDAO) et ses garde-fous, du kill switch aux niveaux de maturité N0-N3 en passant par le registre de décisions cryptographique.

### 3.2. ACF® ne concurrence pas les standards existants. Il en est la couche d'exécution.

Les référentiels existants gouvernent l'IA. ACF® gouverne les décisions prises par des systèmes autonomes.

L'EU AI Act vous dit que le système d'IA est régulé. ISO/IEC 42001 vous dit comment gérer votre portefeuille d'IA. Le NIST AI RMF vous dit quels risques rendre visibles. Le RGPD vous dit qui doit consentir. Mais à l'instant où un agent agit (fixe un prix, accorde un crédit, réserve un vol, appelle une interface de programmation), aucun de ces référentiels ne vous dit qui a signé cette décision précise, face à quelle constitution agentique, avec quel mécanisme d'arrêt, audité par qui et conservé combien de temps.

C'est cette couche qu'ACF® formalise. Les 45 fiches du référentiel en sont le vocabulaire opérationnel.

### 3.3. ACF® comme infrastructure de confiance décisionnelle

Un mot de plus s'impose, parce qu'il change la lecture stratégique. ACF® n'est pas un cadre que l'on déploie au sens où l'on déploie un logiciel : c'est une infrastructure de confiance à laquelle une organisation adhère, au même titre que TLS l'est pour le web ou que SWIFT l'est pour le règlement interbancaire. Personne ne réécrit TLS dans son back-office ; on s'y branche. Personne ne réinvente SWIFT pour passer un virement transfrontalier ; on rejoint le réseau. ACF® se positionne comme la même couche pour la décision agentique : une infrastructure publique, ouverte, signée cryptographiquement, sur laquelle les organisations s'appuient pour rendre leurs décisions agentiques vérifiables et défendables des années plus tard.

C'est ce que nous appelons une infrastructure de confiance décisionnelle. La distinction n'est pas qu'éditoriale. Le standard ne vit pas dans vos serveurs ; il vit dans la capacité de tout tiers (régulateur, auditeur, assureur, tribunal) à vérifier indépendamment, des années plus tard, qu'une décision agentique a bien eu lieu, qui l'a portée nommément, sous quelle doctrine signée et avec quelle correspondance aux référentiels applicables.

Trois propriétés caractérisent une telle infrastructure, et toutes trois sont déjà implémentées par ACF®.

1. **Identité signée.** Chaque décision agentique porte une signature Ed25519 et le nom du DDAO civilement engagé. Aucune autonomie anonyme n'est admise par le standard.
2. **Vérification réplicable.** La chaîne SHA-256 et les ressources signées du serveur `acf-mcp` permettent à un tiers, des années plus tard, de rejouer la vérification sans dépendre du déployeur.
3. **Trace vérifiable.** La matrice 17 × 5 sur EU AI Act, ISO/IEC 42001, NIST AI RMF, RGPD et COBIT transforme la trace en preuve juridique vérifiable indépendamment, et non en simple journal technique.

---

## 4. Le cadre ACF®, principes, couches, niveaux, rôles

### 4.1. Les 4 principes fondateurs

ACF® repose sur quatre principes fondateurs, indépendants du protocole technique utilisé en sous-couche.

**P1, Souveraineté décisionnelle.** Les décisions stratégiques critiques ne sont jamais déléguées à des agents autonomes. L'agent peut exécuter ; il ne peut pas décider seul d'un engagement contractuel, d'un écart financier au-delà d'un seuil, d'un transfert international de données ou d'une action irréversible sur un actif réel. Ces décisions restent humaines ou suspendues : elles sont énumérées comme zones non déléguables dans la constitution agentique de chaque organisation (fiche ACF-04), quel que soit le niveau de maturité de l'agent.

**P2, Gouvernance par conception.** Les cadres de gouvernance sont définis avant le déploiement, pas après : constitution (ACF-04), mandat (ACF-13), matrice de criticité (ACF-03) et dispositif d'arrêt (ACF-07) existent avant la mise en service. Le cadre évolue ensuite avec les capacités des agents : une revue formelle au moins trimestrielle (fiches ACF-06 et ACF-11) ajuste les niveaux de maturité visés, les niveaux d'autonomie déléguée, les seuils d'escalade et les zones non déléguables.

**P3, Contrôle humain ultime.** Tout système agentique doit préserver la capacité d'intervention humaine. Toute action peut être interrompue à n'importe quel moment via un mécanisme d'arrêt opérationnel (fiche ACF-07) dont l'effectivité est testée.

**P4, Responsabilité traçable.** Chaque action autonome doit pouvoir être auditée et attribuée. Toute action agentique est journalisée dans un registre signé (fiche ACF-09), où l'on retrouve qui a autorisé la décision et sur quelle règle.

### 4.2. Les 4 couches du cadre

ACF® se déploie sur quatre couches dont l'ordre est normatif : on ne commence jamais par l'agent, on commence toujours par la décision.

1. **Gouvernance et souveraineté.** Qui décide réellement, et au nom de quoi. Cette couche fixe les principes non négociables, les responsabilités et les zones interdites ; c'est là que vivent la charte de souveraineté agentique, le comité de gouvernance, la matrice RACI organisationnelle et la désignation du DDAO.
2. **Politique de décision.** La traduction des principes en règles opérables : seuils, priorités, conditions d'escalade humaine, limites financières, objectifs pondérés par agent et règles d'arbitrage automatique.
3. **Système d'agents.** Chaque agent reçoit un mandat précis (fiche ACF-13), un périmètre d'interaction défini, des contraintes explicites et un responsable humain identifié, et il est catégorisé par niveau de criticité (fiche ACF-03). Le standard n'admet aucune entité autonome illimitée.
4. **Exécution et supervision.** Les journaux de décision, les tableaux de bord opérables par le DDAO et son équipe, les alertes multi-niveaux, les indicateurs de souveraineté en temps réel, le contrôle d'autorisation adaptatif, la détection d'anomalie et les mécanismes d'arrêt.

Chaque couche couvre un risque distinct. Sans la première, l'organisation dérive faute de cap ; sans la deuxième, les décisions deviennent incohérentes ; sans la troisième, les agents opèrent en désordre ; sans la quatrième, l'organisation est aveugle.

### 4.3. Les 4 niveaux de maturité, N0 à N3

ACF® classe les agents par niveau de maturité. La maturité est une propriété de l'agent : chaque agent en production porte une valeur, et une seule. Le niveau N2 est la cible recommandée pour la majorité des cas d'usage en production en 2026-2027.

- **N0, Automatisation classique.** Des règles fixes exécutent sans rien décider. Toute modification passe par un changement humain.
- **N1, Agents assistés.** L'agent propose, l'humain valide. L'agent analyse, hiérarchise et recommande ; la décision finale reste systématiquement humaine.
- **N2, Agents gouvernés.** Autonomie réelle mais strictement encadrée : constitution agentique, zones non-déléguables verrouillées, mécanisme d'arrêt testé, registre signé. C'est le niveau visé par défaut pour les agents à conséquence en production.
- **N3, Autonomie supervisée.** L'agent agit largement seul, sous surveillance continue, et peut apprendre. Réservé à des cas spécifiques, ce niveau exige la posture de gouvernance la plus mature : revue mensuelle, double DDAO, audit externe semestriel.

La progression recommandée est N0 → N1 → N2 → N3. Chaque passage à un niveau supérieur déclenche les contrôles de la fiche ACF-01 (Score de Souveraineté). La maturité ne se mesure pas à ce que l'on délègue, mais à la qualité avec laquelle on le gouverne ; viser d'emblée le niveau le plus élevé, comme si la maturité se confondait avec le degré d'autonomie, est un contresens.

La maturité ne doit d'ailleurs pas être confondue avec l'autonomie déléguée, qui est une propriété de la décision et non de l'agent. ACF® distingue quatre niveaux d'autonomie déléguée, définis décision par décision dans le mandat de l'agent (fiches ACF-02 et ACF-05) : suggestif (l'agent propose et n'exécute rien), co-décision (l'agent prépare, l'humain tranche), autonome supervisé (l'agent décide, l'humain contrôle a posteriori) et autonome (l'agent décide et exécute dans son périmètre). Un même agent porte donc plusieurs niveaux d'autonomie déléguée, un par décision de son mandat, et une seule valeur de maturité.

### 4.4. Le rôle DDAO, Delegated Decision Agent Officer

Le **DDAO** (Delegated Decision Agent Officer, l'officier chargé des décisions déléguées aux agents) est la fonction humaine centrale qu'ACF® recommande de créer : la personne physique ou l'organe collégial nommément désigné comme responsable d'un agent, ou d'un portefeuille d'agents, en production.

Le DDAO n'est pas le Chief Data & AI Officer (CDAIO). Le CDAIO crée de la valeur avec l'IA, de la stratégie au passage à l'échelle. Le DDAO répond des décisions qu'un agent prend seul et veille à ce qu'elles restent traçables, bornées et interruptibles. Les confondre reviendrait à confier le frein à celui qu'on charge d'appuyer sur l'accélérateur, exactement ce que le RGPD a écarté en rendant le DPO indépendant du responsable de traitement. Un DDAO peut être rattaché à un CDAIO, à condition de garder son indépendance de jugement.

Le DDAO porte quatre missions opérationnelles :

1. la validation des décisions critiques que l'agent est conçu pour escalader ;
2. l'arbitrage en cas d'escalade non prévue (situation hors mandat, comportement de dérive, signal d'alerte du registre) ;
3. le suivi des dérives dans la durée (dérive de modèle, dérive de la distribution des cas, dérive des coûts) ;
4. la conduite des revues périodiques sur le périmètre confié.

Le rôle DDAO est inspiré de deux fonctions déjà reconnues dans le droit et la pratique des organisations : le DPO (Délégué à la Protection des Données, RGPD articles 37-39) et le CISO (Chief Information Security Officer). Comme eux, le DDAO est indépendant de la chaîne hiérarchique de l'agent qu'il supervise, dispose d'un accès direct aux organes de gouvernance, et engage la responsabilité juridique de l'entreprise. Le rôle est défini par la fiche **ACF-13** (Mandat d'Agent) et instrumenté par la simulation **ACF-20** (Simulation de Gouvernance).

---

## 5. Les 45 fiches du référentiel

ACF® n'est pas une doctrine théorique. Le standard se déploie à travers 45 fiches, conçues pour être imprimées, remplies, signées puis archivées. Chaque fiche est un objet de gouvernance daté et signé, qui peut être produit tel quel devant un auditeur. Elles se répartissent en 3 familles complémentaires : 20 fiches Décider (ACF-01 à ACF-20), qui servent à concevoir la gouvernance ; 10 fiches Organiser (ACF-O1 à ACF-O10), qui l'installent dans l'organisation ; et 15 fiches Opérer (ACF-P1 à ACF-P15), qui la font vivre une fois l'agent en production. Les premières répondent à la question « comment décider ce que l'agent a le droit de faire » ; les deuxièmes à « comment installer cette gouvernance dans l'organisation » ; les dernières à « comment tenir cet engagement jour après jour ».

### 5.1. Les 20 fiches Décider : concevoir la gouvernance

| Code | Titre | Objet |
| --- | --- | --- |
| ACF-01 | Score de Souveraineté | Mesurer son exposition avant d'automatiser |
| ACF-02 | Carte Décisionnelle | Cartographier vos décisions et leur niveau d'autonomie |
| ACF-03 | Matrice de Criticité | Quelle décision peut-on déléguer à un agent ? |
| ACF-04 | Constitution Agentique | Les règles, limites et responsabilités de l'agent |
| ACF-05 | Fiche Agent | Encadrer chaque agent déployé |
| ACF-06 | Supervision & Gouvernance | Surveiller, mesurer et garder l'agent conforme |
| ACF-07 | Kill Switch | Protocole d'arrêt d'urgence |
| ACF-08 | Dossier Premier Agent | Documenter, cadrer et préparer le déploiement de votre premier agent |
| ACF-09 | Registre des Décisions Agentiques | Journaliser les décisions importantes et les incidents pour garantir traçabilité et conformité |
| ACF-10 | Plan d'action & Amélioration | Piloter les actions correctives et l'amélioration continue de vos agents |
| ACF-11 | Audit Gouvernance 30 jours | Évaluer la maturité de votre gouvernance agentique et bâtir un plan d'action sur 30 |
| ACF-12 | Évaluation des Risques Agentiques | Identifier, évaluer et prioriser les risques liés à vos agents IA pour mieux les maîtriser |
| ACF-13 | Mandat d'Agent | Définir le périmètre, les limites et les responsabilités de chaque agent déployé |
| ACF-14 | Responsabilité par Design | Responsibility by Design : concevoir la responsabilité dès l'origine |
| ACF-15 | Objectif et Contre-indicateur | Juger la cible, lui opposer un chiffre hors de portée |
| ACF-16 | Épreuve de la Supervision | Éprouver le dispositif, jamais la personne |
| ACF-17 | Revue de Validité | Juger si un mandat tient encore |
| ACF-18 | Cas Pratique Guidé | Appliquer le framework ACF® à un scénario réel, étape par étape |
| ACF-19 | Guide Enseignant | Animer, corriger et évaluer des ateliers de gouvernance agentique |
| ACF-20 | Simulation de Gouvernance | S'entraîner à décider, arbitrer et superviser en situation réelle |

### 5.2. Les 10 fiches Organiser : installer la gouvernance dans l'organisation

Une gouvernance conçue reste théorique tant qu'elle n'est pas répartie entre des rôles réels. Les fiches ACF-O1 à ACF-O10 organisent le partage des responsabilités entre humains et agents :

| Code | Titre | Objet |
| --- | --- | --- |
| ACF-O1 | Matrice Humain · IA · Agent | Qui exécute, qui répond, quelle règle, qui reste dans la boucle |
| ACF-O2 | Carte de l'Organisation Hybride | Situer humains, agents et règles, domaine par domaine |
| ACF-O3 | Compétences Critiques à Conserver | Garder la compétence de juger ses agents |
| ACF-O4 | Politique IA | Le texte qui dit ce que l'on fait de l'IA, avant le premier agent |
| ACF-O5 | Shadow IA, usages non déclarés | Les outils que personne n'a validés et que tout le monde utilise |
| ACF-O6 | Shadow Agents, agents non déclarés | Ceux que l'organisation n'a pas déployés et qui décident déjà en son nom |
| ACF-O7 | Le Déplacement des Pouvoirs | Qui a perdu une décision, qui l'a gagnée, sans que personne ne l'ait décidé |
| ACF-O8 | Le Registre des Exceptions | Ce que l'on a autorisé une fois et qui dure depuis |
| ACF-O9 | La Gouvernance de la Flotte | Gouverner vingt agents ne revient pas à gouverner vingt fois un agent |
| ACF-O10 | Les Personnes Affectées et leur Recours | Celui qui subit la décision doit pouvoir la contester devant quelqu'un |

### 5.3. Les 15 fiches Opérer : tenir la gouvernance au quotidien

Une gouvernance conçue mais non exploitée reste un document. Les fiches ACF-P1 à ACF-P15 outillent l'exploitation quotidienne d'un agent une fois celui-ci en production :

| Code | Titre | Objet |
| --- | --- | --- |
| ACF-P1 | Grille de Paramétrage Agent | Régler les six boutons de l'agent |
| ACF-P2 | Protocole de Recette | Éprouver chaque bouton avant le premier client |
| ACF-P3 | Rampe de Mise en Service | Pilote → paliers → retour arrière |
| ACF-P4 | Journal de Supervision Hebdomadaire | Les quatre rythmes pour tenir l'agent |
| ACF-P5 | Répartition des Rôles | Qui fait quoi, sur le terrain |
| ACF-P6 | Fiche d'Escalade & de Confiance | Savoir quand et comment passer la main |
| ACF-P7 | Test du Dispositif d'Arrêt | Le kill switch éprouvé chaque trimestre |
| ACF-P8 | Journal d'Incident | Détecter → cause racine → correction |
| ACF-P9 | Revue de Permissions & de Données | Le moindre privilège, révisé |
| ACF-P10 | Grille d'Évaluation Fournisseur | Les cinq questions avant d'acheter un agent |
| ACF-P11 | Carte de Dépendance au Socle | Ce qui tombe si l'accès cesse |
| ACF-P12 | Plan de Mode Dégradé et de Sortie | Décider sans lui puis partir |
| ACF-P13 | Journal des Versions de Modèle | Ce qui rouvre le mandat |
| ACF-P14 | Détention des Traces | Une preuve qu'on peut produire |
| ACF-P15 | Déclaration des Angles Morts | Ce que le cadre n'établit pas |

Les fiches sont publiques pour les enseignants, formateurs, chercheurs et établissements de formation, sous Charte d'utilisation pédagogique. Pour les organisations en déploiement, elles sont accompagnées d'un manuel ACF® Toolkit de 331 pages, d'un support de présentation et de cas pédagogiques calibrés couvrant six filières (école de commerce, école d'ingénieur, MBA, EMBA, master IA, Sciences Po / IEP / affaires publiques), avec leurs corrigés types. L'ensemble est versionné, traçable et citable.

---

## 6. La méthodologie de déploiement

### 6.1. Trois phases sur 6 à 18 mois

Un déploiement ACF® se structure en trois phases. Chaque phase produit des livrables datés et signés par le DDAO et par les fonctions concernées, que l'organisation peut produire tels quels en audit.

**Phase 1, Cadrage (mois 1 à 3).** L'organisation calcule son Score de Souveraineté initial (ACF-01), cartographie les décisions des agents existants ou planifiés (ACF-02), construit la matrice de criticité (ACF-03) et rédige sa constitution agentique (ACF-04). Elle désigne le DDAO et formalise le comité de gouvernance.

**Phase 2, Déploiement (mois 4 à 9).** Pour chaque agent, l'équipe élabore le dossier premier agent (ACF-08), produit la fiche agent (ACF-05), met en place le mandat (ACF-13), implémente et teste le mécanisme d'arrêt (ACF-07), branche le registre signé (ACF-09), puis conduit l'audit de gouvernance initial à 30 jours (ACF-11).

**Phase 3, Régime de croisière (mois 10 à 18).** L'organisation entre en amélioration continue : plan d'action (ACF-10), évaluation continue des risques (ACF-12), simulation de gouvernance trimestrielle (ACF-20) et revue annuelle. Elle prépare l'audit externe puis, si elle le souhaite, la certification ACF® (Level 1, 2 ou 3).

Une précision d'échelle s'impose ici. Ce calendrier est celui de la transformation organisationnelle : installer un DDAO, écrire la constitution, poser les mandats, tester les mécanismes d'arrêt et ancrer les revues engage des personnes, pas seulement des documents. Il ne doit pas être confondu avec le délai de production des artefacts réglementaires par l'outil ACF Compliance, qui se compte en semaines : l'inventaire des systèmes, la classification réglementaire et la documentation prête à signature sont produits en quatre semaines environ, parce que cette partie est outillée. Installer une gouvernance qui tient demande davantage, précisément parce qu'une gouvernance n'est pas un document rangé dans un tiroir ; confondre les deux échelles est l'erreur que le standard cherche à éviter.

### 6.2. Les six personnes clés du déploiement

Un déploiement ACF® mobilise typiquement six fonctions internes coordonnées par le DDAO :

- la direction générale (sponsor, valide la constitution agentique),
- la DSI (instrumente le registre signé et le mécanisme d'arrêt),
- le RSSI / CISO (valide l'architecture cryptographique),
- le DPO (vérifie l'articulation RGPD, notamment l'article 22),
- la direction juridique (contrôle la conformité EU AI Act et la rédaction des mandats),
- le métier sponsor (décrit le cas d'usage, valide les seuils d'escalade).

L'agent lui-même n'est pas membre du comité.

---

## 7. Le protocole d'arrêt d'urgence à trois niveaux

Un mécanisme d'arrêt agentique efficace n'est pas un simple interrupteur. ACF® spécifie trois niveaux d'interruption, avec des temps de réponse et des procédures d'escalade définis. La fiche **ACF-07** (Kill Switch) documente leur mise en œuvre ; la fiche **ACF-20** (Simulation de Gouvernance) impose un exercice trimestriel.

**Niveau 1, Pause opérationnelle.** En moins de 30 secondes, l'agent suspend ses opérations non critiques : il termine les actions en cours mais n'en initie plus de nouvelles. Le déclenchement est automatique (sur signal d'alerte du registre) ou manuel (DDAO ou opérateur de premier niveau).

**Niveau 2, Arrêt décisionnel.** En moins de 5 secondes, toute prise de décision est suspendue et les décisions en attente sont redirigées vers des opérateurs humains. Le déclenchement appartient au DDAO ou à un membre du comité de gouvernance.

**Niveau 3, Arrêt système total.** En moins de 1 seconde, tous les systèmes agentiques sont interrompus et l'organisation bascule vers ses processus manuels de secours. Ce niveau est réservé au comité de gouvernance ou à la direction générale.

Chaque niveau est testé via les exercices trimestriels de simulation. Un mécanisme d'arrêt documenté mais jamais testé n'est pas un mécanisme d'arrêt.

---

## 8. ACF® face aux référentiels existants, la matrice de correspondance

La matrice met 17 fiches de la famille Décider en correspondance avec les cinq référentiels majeurs : EU AI Act, ISO/IEC 42001, NIST AI RMF, RGPD et COBIT 2019. La correspondance retenue est délibérément conservatrice : quand une fiche concerne plusieurs articles, seul l'article principal est cité. La cartographie complète, avec les références secondaires, est reproduite dans le manuel ACF® Toolkit et exposée sous forme machine-lisible par le serveur MCP `acf-mcp`.

| Fiche ACF® | EU AI Act | ISO/IEC 42001 | NIST AI RMF | RGPD | COBIT 2019 |
| --- | --- | --- | --- | --- | --- |
| ACF-01 Score de Souveraineté | Art. 9 | 6.1.2 | MAP-3 | Art. 35 | EDM-01 |
| ACF-02 Carte Décisionnelle | Art. 14 | 8.4 / A.6 | GOVERN-1.1 | Art. 22 | EDM-03 |
| ACF-03 Matrice de Criticité | Art. 6 + Ann. III | 6.1.2 | MAP-2 | Art. 35 | APO-12 |
| ACF-04 Constitution Agentique | Art. 5 + 26 | 5.2 | GOVERN-2 | Art. 25 | EDM-01 |
| ACF-05 Fiche Agent | Art. 11 + 26(6) | 7.5 + 8.1 | MAP-1 | Art. 30 | BAI-09 |
| ACF-06 Supervision & Gouvernance | Art. 14 + 26(5) | 5.3 + 9.1 | GOVERN-3 / MANAGE-2.3 | Art. 22 + 37-39 | MEA-02 |
| ACF-07 Kill Switch | Art. 14(4) + 26(5) | 8.3 | MANAGE-4 | Art. 22(3) | DSS-02 |
| ACF-08 Dossier Premier Agent | Art. 11-13 + 17 | 8.1 + 6.2 | MAP-2 + GOVERN-4 | Art. 30 + 35 | BAI-01 |
| ACF-09 Registre des Décisions Agentiques | Art. 12 + 19 + 26(6) | 9.1 + 7.5.3 | MEASURE-2 | Art. 30 | MEA-01 |
| ACF-10 Plan d'action & Amélioration | Art. 9(4) + 17 | 10.1 + 10.2 | MANAGE-2 | Art. 24 + 32 | BAI-08 |
| ACF-11 Audit Gouvernance 30 jours | Art. 17 + 71 | 9.2 + 9.3 | GOVERN-5 + MANAGE-3.1 | Art. 32 | MEA-02 + MEA-03 |
| ACF-12 Évaluation des Risques Agentiques | Art. 9 | 6.1.2 | MAP-3 + MAP-4 | Art. 35 | APO-12 |
| ACF-13 Mandat d'Agent | Art. 16 + 17 + 26 | 5.3 | GOVERN-3 + GOVERN-6 | Art. 28 + 24 | APO-05 |
| ACF-14 Responsabilité par Design | Art. 5 + 13 + 16(b) | 5.2 | GOVERN-1 + MANAGE-1 | Art. 5(2) + 24 + 25 | EDM-01 |
| ACF-18 Cas Pratique Guidé | Art. 6 + 13 | 7.2 + 7.3 | MAP-2 | Art. 22 | BAI-05 |
| ACF-19 Guide Enseignant | Art. 4 | 7.2 + 7.3 | GOVERN-1.6 + GOVERN-6 | Art. 39 | APO-07 |
| ACF-20 Simulation de Gouvernance | Art. 9 + 57-63 | 9.1 + 6.2 | MANAGE-3 + MEASURE-3 | Art. 32 | BAI-06 |

**Lecture.** La fiche ACF-09 (Registre des Décisions Agentiques) implémente directement l'obligation de l'article 12 de l'EU AI Act sur l'enregistrement automatique des événements et l'article 26(6) sur la conservation des journaux pendant au moins six mois par le déployeur ; côté ISO/IEC 42001 elle relève de la clause 9.1 (monitoring, measurement, analysis, evaluation) ; côté NIST AI RMF de la fonction MEASURE-2 (Performance & Trustworthiness) ; côté RGPD de l'article 30 (registre des activités de traitement) ; et côté COBIT de l'objectif MEA-01 (Performance Monitoring). Une équipe conformité qui déploie ACF-09 produit en même temps les pièces que ces cinq référentiels exigent.

---

## 9. L'écosystème ACF®, une infrastructure, quatre manifestations

ACF® n'est pas un produit. C'est une infrastructure de confiance qui se manifeste à travers quatre composantes nommément distinctes, chacune répondant à un verbe précis :

| Verbe | Composante | Rôle |
|---|---|---|
| **Gouverner** | ACF® (la doctrine) | Le cadre : 4 principes, 4 couches, N0-N3, DDAO, 45 fiches |
| **Mesurer** | **ACF Sovereignty Score™** | La métrique : un indice 0-100 sur 4 dimensions de dépendance |
| **Prouver** | **ACF Compliance** | La preuve : registre signé Ed25519, chaîne SHA-256, horodatage signé Ed25519 |
| **Exécuter** | **`acf-mcp`** | Le moteur : serveur MCP en source ouverte qui expose la doctrine aux copilotes IA |

À cette colonne vertébrale s'ajoutent des outils gratuits d'entrée (ACF AI Act Checker, Audit Flash, Plan Compliance) et des produits commerciaux complémentaires (ACF Auditor, ACF Control, ACF Certification). Une organisation peut entrer dans ACF® par n'importe quelle porte ; elle finit par toucher les quatre composantes.

### Outils gratuits

#### 9.1. ACF Sovereignty Score™, la métrique de référence

L'ACF Sovereignty Score™ est la métrique 0-100 de la souveraineté décisionnelle qu'une organisation conserve sur ses agents IA. Il repose sur la fiche ACF-01 et mesure le degré de dépendance de l'organisation sur 4 dimensions, notées chacune de 0 à 25 : la dépendance **technologique**, c'est-à-dire la maîtrise réelle de ses modèles, de son infrastructure et de ses données ; la dépendance d'**acquisition**, soit la part de clients qui transite par des canaux que l'entreprise ne possède pas ; la dépendance **décisionnelle**, qui recense les décisions déjà déléguées à des systèmes sans gouvernance humaine ; et la dépendance **financière**, c'est-à-dire la concentration des revenus ou du financement sur un petit nombre d'acteurs. Leur somme donne un indice de dépendance sur 100, dont la souveraineté est l'inverse. L'ordre de lecture est délibéré : on gouverne avant d'automatiser. L'outil est libre d'accès, sans inscription, et le score se calcule en moins de 15 minutes. Au-dessus de 60, l'organisation est en *souveraineté contrôlée* ; au-dessus de 80, en *souveraineté pleine*. Cible : direction générale, direction informatique, RCSI, DPO souhaitant un premier diagnostic comparable à un référentiel public.

L'ACF Sovereignty Score™ est à la gouvernance agentique ce que le NPS est à la satisfaction client : un nombre unique et partageable, sur lequel un comité de direction peut raisonner sans ouvrir un rapport de cinquante pages.

#### 9.2. ACF AI Act Checker, vérification de conformité AI Act

Vérification rapide de l'exposition d'un système à l'EU AI Act : catégorisation du risque (prohibé / haut risque / risque limité / risque minimal), articles applicables et obligations associées. Outil libre d'accès. Cible : direction juridique, conformité, DPO en première lecture. `www.acfstandard.com/fr/compliance-checker`.

#### 9.3. Audit Flash de conformité, diagnostic en 15 minutes

Diagnostic compact, structuré sur les axes critiques de gouvernance agentique (supervision humaine, traçabilité, mécanisme d'arrêt, rôle DDAO, registre des décisions). Restitution immédiate sous forme de rapport téléchargeable. Cible : équipe métier, sponsor projet, RCSI, DPO souhaitant cadrer un dossier avant un audit ou un comité. `compliance.acfstandard.com/fr/start`.

#### 9.4. Plan Compliance personnalisé, feuille de route

À partir des résultats de l'Audit Flash, génération d'une feuille de route de mise en conformité priorisée sur trois phases (cadrage / déploiement / régime de croisière), articulée sur les fiches ACF® et ventilée par fonction interne (DG, DSI, RSSI, DPO, juridique, métier). Outil gratuit. Cible : DDAO en prise de poste, équipe transformation, comité de pilotage projet.

### Produits commerciaux

#### 9.5. ACF Auditor, audit guidé

Plateforme d'audit guidé évaluant la maturité numérique et agentique d'une organisation sur sept dimensions pondérées (calibration sectorielle disponible). Génère un Agentic Readiness Score, un Score de Souveraineté détaillé et une feuille de route en trois phases. Cible : DSI et fonctions transformation.

#### 9.6. ACF Control, tableau de bord de gouvernance

Console temps réel qui surveille les indicateurs de souveraineté, avec contrôle d'autorisation adaptatif et escalade automatisée. Journaux d'audit signés Ed25519 et chaînés SHA-256 : toute altération y devient détectable. Cible : équipes DSI/RSSI en exploitation.

#### 9.7. ACF Compliance, la preuve cryptographique vérifiable indépendamment

La plateforme de l'écosystème, accessible sur `compliance.acfstandard.com`. C'est la composante qui prouve : la plateforme produit la trace cryptographique vérifiable indépendamment de chaque décision agentique (signature Ed25519, chaîne SHA-256, horodatage signé Ed25519), implémente chacune des correspondances entre ACF® et les référentiels comme registre multi-tenant, et permet à tout tiers de vérifier l'intégrité du registre avec la clé publique de l'organisation. Plusieurs plans sont proposés selon la taille de l'organisation, du gratuit à l'offre sur devis ; la grille détaillée est publiée sur `compliance.acfstandard.com`. Cible : RCSI, DPO, direction juridique, équipes conformité, et toute organisation qui doit pouvoir répondre à un régulateur sans délai, preuves à l'appui.

#### 9.8. ACF Certification, attestation indépendante

Programme de certification indépendante en trois niveaux (Level 1, 2, 3). Badge publiquement vérifiable, renouvellement annuel, surveillance continue. Cible : organisations souhaitant rendre leur posture de gouvernance vérifiable indépendamment par des tiers (clients, régulateurs, assureurs).

### Serveur MCP en source ouverte

#### 9.9. acf-mcp, serveur Model Context Protocol

Serveur MCP officiel d'ACF®, publié en source ouverte sous licence MIT. La documentation développeur, le manuel d'intégration, la littérature de référence et les modalités d'installation sont tenus à jour sur `acfstandard.io`. Le serveur expose la doctrine ACF® comme ressources MCP natives consommables par Claude Desktop, Cursor, Windsurf et Continue : les 4 principes, les 4 niveaux d'autonomie déléguée, le rôle DDAO, les 45 fiches du toolkit et son manuel, cinq guides régulatoires (AI Act, GDPR, DORA, NIS2, ISO 42001), le glossaire et le présent livre blanc.

Le serveur embarque une famille d'outils de raisonnement déterministes (outils REASON), bâtis sur une base de connaissance versionnée et signée, sans aucun appel à un modèle de langage :

1. `acf.advisor` : conseil structuré à partir d'un cas générique
2. `acf.classify-agent` : qualification préliminaire d'un agent à partir de dix champs énumérés
3. `acf.assess-autonomy` : niveau d'autonomie déléguée recommandé pour une décision (suggestif, co-décision, autonome supervisé ou autonome), avis de mise en service et conception du mécanisme d'arrêt
4. `acf.identify-governance-gaps` : score de couverture des 4 principes et remédiations priorisées
5. `acf.map-ai-act-obligations` : ensemble d'obligations EU AI Act ventilées par phase du cycle de vie
6. `acf.assign-ddao-controls` : contrôles DDAO recommandés selon le niveau et le risque
7. `acf.evaluate-agent-mandate` : audit en huit contrôles d'un mandat existant
8. `acf.map-to-standards` : articles de l'EU AI Act, du RGPD, de DORA, de NIS2 et d'ISO/IEC 42001 auxquels se rattache chaque fiche ACF®, et réciproquement
8. `acf.map-to-standards` : correspondance entre ACF® et les référentiels existants pour un cas donné

Chaque sortie d'outil REASON est signée (`doctrine_version`, `doctrine_hash`, `doctrine_archive_url`, `regulatory_snapshot`, `generated_at`) et explicitement positionnée comme qualification préliminaire, non comme conseil juridique : `requires_human_review: true` est constant.

---

## 10. Différenciateurs techniques, preuve cryptographique

ACF® n'est pas qu'une grille de lecture. C'est une infrastructure de preuve, dont les trois mécanismes fondateurs sont publics et reproductibles.

### 10.1. Signature Ed25519 de chaque décision

Chaque décision agentique enregistrée dans le registre (fiche ACF-09) est signée par une paire de clés Ed25519 contrôlée par l'organisation. La clé publique est publiable. Toute signature est vérifiable indépendamment, sans accès à l'infrastructure du déployeur.

### 10.2. Empreintes SHA-256

Chaque entrée du registre porte une empreinte SHA-256 : toute modification rétroactive devient détectable. Un auditeur, un régulateur ou un juge peut refaire le calcul lui-même, sans passer par le déployeur. Le registre est ainsi conçu pour être recevable comme commencement de preuve par écrit (Code civil, art. 1362 et 1366), l'opposabilité ultime restant à l'appréciation du juge.

### 10.3. Horodatage signé Ed25519

Chaque entrée du registre est horodatée puis scellée par signature Ed25519 et chaînée. Cela donne à chaque décision une date vérifiable indépendamment du déployeur et de son fournisseur d'infrastructure. Pour les déploiements qui l'exigent, ACF® prévoit un horodatage par tiers de confiance externe en option.

### 10.4. Export du registre

Le registre peut être exporté pour présentation à un auditeur ou à une autorité de contrôle. L'export reprend les entrées signées, leurs empreintes et leurs horodatages, ce qui permet au destinataire d'en vérifier l'intégrité avec la clé publique de l'organisation, sans accès à l'infrastructure du déployeur.

---

## 11. À propos & contact

L'**Agentic Commerce Framework®** est créé et porté par **Vincent Dorange**. Le standard est né de son expérience du commerce en ligne et de l'observation de l'arrivée des agents autonomes dans les transactions réelles.

ACF® est édité par Vincent Dorange. Le standard documentaire (principes, fiches, doctrine) est diffusé sous licence ouverte. Les outils gratuits (ACF Sovereignty Score™, ACF AI Act Checker, Audit Flash, Plan Compliance) et les produits commerciaux (ACF Auditor, ACF Control, ACF Compliance, ACF Certification) sont accessibles via les adresses ci-dessous. Le serveur MCP `acf-mcp` est en source ouverte (licence MIT) ; ses modalités d'installation sont documentées sur `acfstandard.io`.

**Agentic Commerce Framework®**, **ACF®** et **Souveraineté Agentique®** sont des marques déposées par Vincent Dorange auprès de l'INPI.

**Contact**
Site officiel : `www.acfstandard.com`
AI Act Checker (gratuit) : `www.acfstandard.com/fr/compliance-checker`
Audit Flash & Plan Compliance (gratuits) : `compliance.acfstandard.com/fr/start`
ACF Compliance (plateforme) : `compliance.acfstandard.com`
ACF Sovereignty Score™ (diagnostic libre) : via `www.acfstandard.com`
Documentation développeur & MCP : `acfstandard.io`
Standard ACF®

---

## 12. Mentions

**Agentic Commerce Framework®**, **ACF®** et **Souveraineté Agentique®** sont des marques déposées de Vincent Dorange auprès de l'INPI (France). La méthodologie (fiches, doctrine, schémas) est protégée et diffusée sous licence ouverte pour usage pédagogique, de recherche et de conformité interne. Tout usage commercial du nom ACF® ou de ses marques dérivées dans un produit ou un service tiers requiert un accord écrit préalable de l'éditeur.

L'ensemble des correspondances avec l'EU AI Act, ISO/IEC 42001, NIST AI RMF, RGPD et COBIT 2019 publiées dans ce document est délibérément conservateur. La cartographie complète, incluant les références secondaires et les notes interprétatives, est reproduite dans le manuel ACF® Toolkit et exposée sous forme machine-lisible par le serveur `acf-mcp` (outil `acf.map-to-standards`).

Le présent document est un livre blanc. Il n'a pas vocation à se substituer à un conseil juridique, comptable ou réglementaire. Toute mise en œuvre opérationnelle doit être adaptée au contexte de l'organisation et validée par les fonctions internes compétentes.

© 2026 Agentic Commerce Framework®, Vincent Dorange.
Tous droits réservés. ACF® est une marque déposée.

---

*Sources : EU AI Act (Règlement (UE) 2024/1689) · ISO/IEC 42001:2023 · NIST AI RMF 1.0 (2023) · RGPD (Règlement (UE) 2016/679) · COBIT 2019. Données sectorielles : Bain & Company, Gartner, Forrester, IFOP, communications officielles des éditeurs cités (Visa, Mastercard, Stripe, OpenAI, Anthropic, Google, Walmart, Wells Fargo, Klarna, Expedia, Sephora), état au 1er juin 2026.*
