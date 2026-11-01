---
title: "ACF®, White Paper"
doc_type: whitepaper
lang: en
version: "2.1"
published_at: "2026-06"
author: "Vincent Dorange"
publisher: "Vincent Dorange"
classification: "Public"
canonical_url: "https://acfstandard.com/whitepaper-en.pdf"
supersedes: "2.0 (June 2026, initial edition)"
---

# ACF®, AGENTIC COMMERCE FRAMEWORK®
## The Decision Trust Infrastructure for agentic decisioning
### Govern. Measure. Prove.

**White Paper · Vincent Dorange**

*www.acfstandard.com · www.acfstandard.io*

---

## Contents

1. Executive summary, *Govern. Measure. Prove.*
2. The 2026-2027 challenge, why now
3. The "agentic governance" category and where ACF® fits, *Decision Trust Infrastructure*
4. The ACF® framework, principles, layers, levels, roles
5. The 45 cards of the standard
6. Deployment methodology
7. The three-tier emergency stop protocol
8. ACF® against existing frameworks, the mapping matrix
9. The ACF® ecosystem, one infrastructure, four manifestations
10. Technical differentiators, cryptographic proof
11. About & contact
12. Notices

---

## 1. Executive summary

The **Agentic Commerce Framework®** (ACF®) is not yet another framework. It is the European **Decision Trust Infrastructure**: the trust infrastructure to which an organisation adheres so that the decisions made by its AI agents remain verifiable and defensible years later, before a regulator, an auditor, a court or an insurer. Just as TLS is the trust infrastructure of the web and SWIFT that of interbank settlement, ACF® positions itself as the common layer that organisations join when they put consequential AI agents into production, whether in commerce, finance, services, healthcare, energy, HR, marketing or operations.

Led by **Vincent Dorange**, ACF® is summed up in three verbs: *Govern. Measure. Prove.* The standard governs, through its doctrine, its cards and the DDAO role. The **ACF Sovereignty Score™** measures, on a 0-100 scale, the decisional sovereignty an organisation preserves. **ACF Compliance** proves, through a cryptographic trace that any third party can verify independently. This articulation answers a precise gap: existing frameworks (EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR, COBIT) state what must be done, but they state neither how to operate, nor how to measure, nor how to prove. ACF® closes that gap.

ACF® articulates four founding principles, four layers, four maturity levels (N0 to N3), 45 ready-to-use cards (20 Decide, 10 Organise and 15 Operate) and a named role, the **DDAO** (Delegated Decision Agent Officer), who bears human responsibility for every agent in production. The whole is backed by independently verifiable cryptographic traceability (Ed25519 signatures, SHA-256 fingerprints, Ed25519-signed timestamping), which makes every agentic decision auditable without depending on the deployer's infrastructure.

The framework does not replace existing standards: it operationalises them at the decision level. The Decide family cards are mapped to an EU AI Act article, an ISO/IEC 42001 clause, a NIST AI RMF function, a GDPR article and a COBIT 2019 domain. Any compliance team can therefore integrate ACF® into its existing audit trail within minutes.

The EU AI Act high-risk enforcement comes into force on 2 December 2027 for agentic systems operating in essential services (credit, insurance, energy, healthcare, justice). Organisations that have deployed agents by then without an operational governance framework will face a retroactive compliance obligation, with no documentation and no admissible audit trail. ACF® is designed so that no audit line is missing at that moment.

The ACF® ecosystem is organised around four manifestations of the trust infrastructure: the ACF Sovereignty Score™ (the metric), ACF Compliance (the proof), the `acf-mcp` MCP server (the execution engine), and the doctrine (the corpus: 45 cards, 4 layers, the N0-N3 scale). These are complemented by four freely accessible tools (ACF Score for self-diagnostics, ACF AI Act Checker, Compliance Flash Audit, Personalised Compliance Plan) and three complementary commercial products (ACF Auditor, ACF Control, ACF Certification). The MCP server, in turn, exposes the ACF® doctrine as a native resource to AI copilots (Claude, Cursor, Windsurf, Continue, Zed), with signed deterministic REASON tools.

---

## 2. The 2026-2027 challenge, why now

### 2.1. Agentic commerce, the vanguard of a general shift

In 2024-2025, agentic commerce played out in demonstrations. In 2026, it entered production. Seven competing protocols were published in eighteen months: MCP (Anthropic, November 2024), Operator (OpenAI, January 2025), Mariner (Google, December 2024), TAP (Visa, October 2025), Agent Pay (Mastercard, 2025), ACP (Stripe + OpenAI, 2025) and TACP (Forter, 2025). Walmart, Wells Fargo, Klarna, Expedia and Sephora have announced or deployed agents acting directly on real-value transactions. According to Bain & Company, one in five e-commerce purchases in the United States could be initiated by an autonomous agent by 2028.

Commerce serves here as a laboratory, not as a boundary. It is the first field where agents commit the organisation on real transactions, because the loop between decision, execution and money is at its shortest there; for that very reason, it reveals in advance what awaits the other sectors. The same movement is already at work wherever a decision is delegated: support for credit scoring and arbitration in banking and insurance, screening and shortlisting of applications in HR, decision support and patient triage in healthcare, case handling in the public sector. The standard owns this origin: the Agentic Commerce Framework® was born on that first field, and its ambition now covers any decision delegated to an agent.

For any European organisation deploying consequential agents, the topic is therefore no longer prospective. It is competitive and regulatory.

### 2.2. The silent risk: the absence of an operational framework

None of these protocols states who supervises the agent, against which criteria, with what traceability. All of them assume that an internal team will rebuild that layer on top. For an SME, a mid-cap or a European group, that reconstruction is not sustainable, because it presupposes an ongoing dialogue between IT, the DPO, the CISO, compliance, business and legal, with no shared reading grid and no template documentation.

The result is visible in the field. On a sample of cases observed by the author in late 2025-early 2026 (under confidentiality cover, as the organisations concerned cannot be named), out of ten companies operating an agent in production:

- 8 out of 10 have no individually named owner of the agent's decisions;
- 9 out of 10 have no cryptographically signed log of agentic decisions;
- 10 out of 10 cannot produce, on an auditor's request, the full trace of a specific decision made by the agent on a Tuesday at 2:12 p.m.

These three combined gaps constitute what the EU AI Act calls, in Article 14 and Article 26(6), a failure of human oversight and a failure to maintain event logs. From 2 December 2027 onwards, high-risk enforcement applies and these failures become sanctionable, with fines of up to 35 million euros or 7% of worldwide annual turnover.

### 2.3. An 18-month window for action

The calendar is now settled. Between June 2026 and December 2027, organisations have roughly 18 months to structure their agentic governance: name a responsible officer, document each agent, build the decision log, formalise an emergency stop mechanism (kill switch), and demonstrate to internal governance bodies (audit committee, risk committee, board) that a framework is in place.

ACF® was designed to make those 18 months workable without starting from scratch. The framework is a set of executed gestures, not a statement of intent.

---

## 3. The "agentic governance" category and where ACF® fits

### 3.1. Every domain has its dominant framework

The domains of digital governance have crystallised around a structuring framework:

| Domain | Dominant framework |
| --- | --- |
| Cybersecurity | ISO/IEC 27001 |
| Privacy | GDPR |
| Artificial intelligence | ISO/IEC 42001 |
| Regulated AI | EU AI Act |
| **Agentic governance** | **ACF®** |

ISO 27001 did not replace existing security practices; it made them readable, certifiable and comparable. GDPR did not invent data protection, it turned it into a universal obligation across the Union. In the same way, ISO/IEC 42001 equips AI management with a certifiable management system it previously lacked, and the EU AI Act frames the high-risk uses of a technology it did not create.

ACF® belongs to that lineage. System autonomy is not a sub-topic of AI: it is a domain in its own right, with its own risks (drift, operational hallucination, uncontrolled escalation), its dedicated role (the DDAO) and its safeguards, from the kill switch to the N0-N3 maturity levels and the cryptographic decision registry.

### 3.2. ACF® is not a challenger to existing standards. It is their execution layer.

Existing frameworks govern AI. ACF® governs decisions made by autonomous systems.

The EU AI Act tells you that the AI system is regulated. ISO/IEC 42001 tells you how to manage your AI portfolio. The NIST AI RMF tells you which risks to surface. GDPR tells you who must consent. But the moment an agent acts (sets a price, grants credit, books a flight, calls an API), none of these frameworks tells you who signed that specific decision, against which agentic constitution, with which stop mechanism, audited by whom, and retained for how long.

That is the layer ACF® formalises. The 45 cards of the standard are its operational vocabulary.

### 3.3. ACF® as Decision Trust Infrastructure

One more word is needed, because it changes the strategic reading. ACF® is not a framework you deploy in the sense that you deploy software: it is a trust infrastructure to which an organisation adheres, in the same way that TLS is one for the web or SWIFT is one for interbank settlement. No one rewrites TLS in their back office; they plug into it. No one reinvents SWIFT to issue a cross-border transfer; they join the network. ACF® positions itself as the same layer for agentic decisioning: a public, open, cryptographically signed infrastructure on which organisations rely to make their agentic decisions verifiable and defensible years later.

This is what we call a **Decision Trust Infrastructure**. The distinction is more than editorial. The standard does not live in your servers; it lives in the capacity of any third party (regulator, auditor, insurer, court) to independently verify, years later, that an agentic decision did take place, who carried it by name, under which signed doctrine, and against which applicable frameworks.

Three properties characterise a Decision Trust Infrastructure, and all three are already implemented by ACF®.

1. **Signed identity.** Every agentic decision carries an Ed25519 signature and the name of the civilly engaged DDAO. No anonymous autonomy is admitted by the standard.
2. **Replicable verification.** The SHA-256 chain and the signed resources of the `acf-mcp` server allow a third party, years later, to replay the verification without depending on the deployer.
3. **Verifiable trace.** The 17 × 5 matrix mapping to EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR and COBIT turns the trace into independently verifiable legal proof, not a mere technical log.

---

## 4. The ACF® framework, principles, layers, levels, roles

### 4.1. The 4 founding principles

ACF® rests on four founding principles, independent of the underlying technical protocol.

**P1, Decision Sovereignty.** Critical strategic decisions are never delegated to autonomous agents. The agent may execute; it may not decide alone on a contractual commitment, a financial exposure beyond a threshold, an international data transfer or an irreversible action on a real asset. Such decisions stay human or suspended: they are listed as non-delegable zones in each organisation's agentic constitution (card ACF-04), whatever the agent's maturity level.

**P2, Governance by Design.** Governance frameworks are defined before deployment, not after: constitution (ACF-04), mandate (ACF-13), criticality matrix (ACF-03) and stop mechanism (ACF-07) exist before go-live. The framework then evolves with agent capabilities: a formal review at least quarterly (cards ACF-06 and ACF-11) adjusts target maturity levels, delegated autonomy levels, escalation thresholds and non-delegable zones.

**P3, Ultimate Human Control.** Every agentic system must preserve the ability for human intervention. Every action can be interrupted at any moment via an operational stop mechanism (card ACF-07) whose effectiveness is tested.

**P4, Traceable Accountability.** Every autonomous action must be auditable and attributable. Every agentic action is journalled in a signed registry (card ACF-09), which shows who authorised the decision and on which rule.

### 4.2. The 4 layers of the framework

ACF® deploys across four layers whose order is normative: you never start with the agent, you always start with the decision.

1. **Governance and Sovereignty.** Who really decides, and in the name of what. This layer sets the non-negotiable principles, the responsibilities and the forbidden zones; it is where the agentic sovereignty charter, the governance committee, the organisational RACI matrix and the DDAO designation live.
2. **Decision Policy.** The translation of principles into operable rules: thresholds, priorities, human escalation conditions, financial limits, weighted objectives per agent and automatic arbitration rules.
3. **Agent System.** Each agent receives a precise mandate (card ACF-13), a defined interaction perimeter, explicit constraints and an identified human owner, and is classified by criticality level (card ACF-03). The standard admits no unlimited autonomous entity.
4. **Execution and Supervision.** Decision logs, dashboards operable by the DDAO and their team, multi-tier alerts, real-time sovereignty indicators, adaptive authorisation control, anomaly detection and stop mechanisms.

Each layer covers a distinct risk. Without the first, the organisation drifts for lack of direction; without the second, decisions become inconsistent; without the third, agents operate in disorder; without the fourth, the organisation is blind.

### 4.3. The 4 maturity levels, N0 to N3

ACF® classifies agents by maturity level. Maturity is a property of the agent: each agent in production carries one value, and only one. Level N2 is the recommended target for the majority of production use cases in 2026-2027.

- **N0, Classical automation.** Fixed rules execute without deciding anything. Any change goes through a human change.
- **N1, Assisted agents.** The agent proposes, the human validates. The agent analyses, prioritises and recommends; the final decision remains systematically human.
- **N2, Governed agents.** Real autonomy, but strictly framed: agentic constitution, locked non-delegable zones, tested stop mechanism, signed registry. This is the default target level for consequential agents in production.
- **N3, Supervised autonomy.** The agent acts largely alone, under continuous surveillance, and may learn. Reserved for specific cases, this level requires the most mature governance posture: monthly review, dual DDAO, semi-annual external audit.

The recommended progression is N0 → N1 → N2 → N3. Each step up triggers the controls of card ACF-01 (Sovereignty Score). Maturity is not measured by what you delegate, but by the quality with which you govern it; aiming straight for the highest level, as if maturity were the same thing as the degree of autonomy, is a misreading.

Maturity must not be confused with delegated autonomy, which is a property of the decision, not of the agent. ACF® distinguishes four levels of delegated autonomy, defined decision by decision in the agent's mandate (cards ACF-02 and ACF-05): suggestive (the agent proposes and executes nothing), co-decision (the agent prepares, the human decides), supervised autonomous (the agent decides, the human controls after the fact) and autonomous (the agent decides and executes within its perimeter). A single agent therefore carries several levels of delegated autonomy, one per decision in its mandate, and a single maturity value.

### 4.4. The DDAO role, Delegated Decision Agent Officer

The **DDAO** (Delegated Decision Agent Officer) is the central human function that ACF® recommends creating: the individual or collegial body designated by name as responsible for an agent, or a portfolio of agents, in production.

The DDAO is not the Chief Data & AI Officer (CDAIO). The CDAIO creates value from AI, from strategy to scaling. The DDAO answers for the decisions an agent makes on its own and keeps them traceable, bounded and interruptible. Conflating the two would hand the brake to the person tasked with pressing the accelerator, exactly what the GDPR avoided by keeping the DPO independent from the data controller. A DDAO may report to a CDAIO, provided it keeps its independence of judgement.

The DDAO carries four operational missions:

1. validating the critical decisions that the agent is designed to escalate;
2. arbitrating unforeseen escalations (out-of-mandate situation, drift behaviour, alert signal from the registry);
3. monitoring drift over time (model drift, case distribution drift, cost drift);
4. conducting periodic reviews over the assigned perimeter.

The DDAO role draws on two functions already recognised in law and organisational practice: the DPO (Data Protection Officer, GDPR articles 37-39) and the CISO (Chief Information Security Officer). Like them, the DDAO is independent from the hierarchical chain of the agent supervised, has direct access to governance bodies, and engages the legal responsibility of the company. The role is defined by card **ACF-13** (Agent Mandate) and instrumented by simulation **ACF-20** (Governance Simulation).

---

## 5. The 45 cards of the standard

ACF® is not a theoretical doctrine. The standard is deployed through 45 cards, designed to be printed, filled in, signed and then archived. Each card is a dated, signed governance artefact that can be produced as is before an auditor. They fall into 3 complementary families: 20 Decide cards (ACF-01 to ACF-20), used to design the governance; 10 Organise cards (ACF-O1 to ACF-O10), which embed it in the organisation; and 15 Operate cards (ACF-P1 to ACF-P15), which keep it alive once the agent is in production. The first answer the question "how do we decide what the agent is allowed to do"; the second "how do we embed this governance in the organisation"; the last "how do we keep this commitment day after day".

### 5.1. The 20 Decide cards: designing the governance

| Code | Title | Purpose |
| --- | --- | --- |
| ACF-01 | Sovereignty Score | Measure your exposure before automating |
| ACF-02 | Decision Map | Map your decisions and their level of autonomy |
| ACF-03 | Criticality Matrix | Which decisions can be delegated to an agent? |
| ACF-04 | Agentic Constitution | The rules, limits and responsibilities of the agent |
| ACF-05 | Agent Card | Frame every deployed agent |
| ACF-06 | Supervision & Governance | Monitor, measure and keep the agent compliant |
| ACF-07 | Kill Switch | Emergency shutdown protocol |
| ACF-08 | First Agent Dossier | Document, frame and prepare the deployment of your first agent |
| ACF-09 | Agentic Decisions Register | Log significant decisions and incidents to ensure traceability and compliance |
| ACF-10 | Action Plan & Improvement | Steer corrective actions and continuous improvement of your agents |
| ACF-11 | 30-Day Governance Audit | Assess the maturity of your agentic governance and build a 30-day action plan |
| ACF-12 | Agentic Risk Assessment | Identify, assess and prioritize risks tied to your AI agents to control them more effectively |
| ACF-13 | Agent Mandate | Define the scope, limits and responsibilities of every deployed agent |
| ACF-14 | Responsibility by Design | Responsibility by Design · embedding accountability from inception |
| ACF-15 | Objective and Counter-Metric | Judging the target against an out-of-reach figure |
| ACF-16 | Supervision Test | Testing the arrangement, never the person |
| ACF-17 | Validity Review | Judging whether a mandate still holds |
| ACF-18 | Guided Case Study | Apply the ACF® framework to a real-world scenario, step by step |
| ACF-19 | Instructor's Guide | Facilitate, grade and evaluate agentic governance workshops |
| ACF-20 | Governance Simulation | Train to decide, arbitrate and supervise in real-world conditions |

### 5.2. The 10 Organise cards: embedding governance in the organisation

A designed governance stays theoretical until it is distributed across real roles. Cards ACF-O1 to ACF-O10 organise how responsibilities are shared between humans and agents:

| Code | Title | Purpose |
| --- | --- | --- |
| ACF-O1 | Human · AI · Agent Matrix | Who acts, who is accountable, which rule, who stays in the loop |
| ACF-O2 | Hybrid Organisation Map | Placing humans, agents and rules, domain by domain |
| ACF-O3 | Critical Skills to Keep | Keeping the ability to judge your agents |
| ACF-O4 | AI Policy | The text that says what is done with AI, before the first agent |
| ACF-O5 | Shadow AI, Undeclared Usage | The tools nobody approved and everybody uses |
| ACF-O6 | Shadow Agents, Undeclared Agents | The ones the organisation never deployed, already deciding in its name |
| ACF-O7 | The Shift of Power | Who lost a decision, who gained it, with nobody deciding it |
| ACF-O8 | The Exceptions Register | What was allowed once, and has lasted ever since |
| ACF-O9 | Governing the Fleet | Governing twenty agents is not governing one agent twenty times |
| ACF-O10 | Affected People and Their Appeal | Whoever bears the decision must be able to challenge it before someone |

### 5.3. The 15 Operate cards: running the governance day to day

A designed but unused governance remains a document. Cards ACF-P1 to ACF-P15 equip the day-to-day operation of an agent once it is in production:

| Code | Title | Purpose |
| --- | --- | --- |
| ACF-P1 | Agent Configuration Grid | Setting the agent's six dials |
| ACF-P2 | Acceptance Protocol | Proving every dial before the first customer |
| ACF-P3 | Go-Live Ramp | Pilot → steps → rollback |
| ACF-P4 | Weekly Supervision Log | The four rhythms that keep hold of the agent |
| ACF-P5 | Role Allocation | Who does what, on the ground |
| ACF-P6 | Escalation & Confidence Card | Knowing when, and how, to hand over |
| ACF-P7 | Stop Mechanism Test | The kill switch proven every quarter |
| ACF-P8 | Incident Log | Detect → root cause → fix |
| ACF-P9 | Permissions & Data Review | Least privilege, reviewed |
| ACF-P10 | Vendor Assessment Grid | The five questions before buying an agent |
| ACF-P11 | Foundation Dependency Map | What stops if access stops |
| ACF-P12 | Degraded Mode and Exit Plan | Deciding without them, then leaving |
| ACF-P13 | Model Version Log | What reopens the mandate |
| ACF-P14 | Holding the Record | Evidence you can still produce |
| ACF-P15 | Blind Spot Statement | What the framework does not establish |

The cards are public for teachers, trainers, researchers and training institutions, under a Pedagogical Use Charter. For organisations in deployment, they come with the ACF® Toolkit manual, an introductory deck and calibrated pedagogical cases with their model answer keys. The English edition of the manual runs to 168 pages and covers five academic tracks (business school, engineering school, MBA, EMBA, AI master's); the French edition, more advanced, runs to 168 pages and adds a political science and public affairs track. The whole is traceable and citable.

---

## 6. Deployment methodology

### 6.1. Three phases over 6 to 18 months

An ACF® deployment is structured in three phases. Each phase produces dated deliverables, signed by the DDAO and by the functions concerned, that the organisation can produce as-is in an audit.

**Phase 1, Scoping (months 1 to 3).** The organisation calculates its initial Sovereignty Score (ACF-01), maps the decisions of existing or planned agents (ACF-02), builds the criticality matrix (ACF-03) and drafts its agentic constitution (ACF-04). It designates the DDAO and formalises the governance committee.

**Phase 2, Deployment (months 4 to 9).** For each agent, the team drafts the first agent dossier (ACF-08), produces the agent card (ACF-05), puts the mandate in place (ACF-13), implements and tests the stop mechanism (ACF-07), connects the signed registry (ACF-09), then conducts the initial 30-day governance audit (ACF-11).

**Phase 3, Steady state (months 10 to 18).** The organisation enters continuous improvement: action plan (ACF-10), continuous risk assessment (ACF-12), quarterly governance simulation (ACF-20) and annual review. It prepares for the external audit and then, if it so wishes, for ACF® certification (Level 1, 2 or 3).

A point of scale matters here. This timeline is that of the organisational transformation: installing a DDAO, writing the constitution, setting the mandates, testing the stop mechanisms and anchoring the reviews engages people, not just documents. It should not be confused with the time the ACF Compliance tool needs to produce the regulatory artefacts, which is counted in weeks: system inventory, regulatory classification and signature-ready documentation are produced in roughly four weeks, because that part is tooled. Installing a governance that holds takes longer, precisely because a governance is not a document filed in a drawer; confusing the two timescales is the very mistake the standard seeks to avoid.

### 6.2. The six key people of a deployment

An ACF® deployment typically mobilises six internal functions coordinated by the DDAO:

- executive management (sponsor, signs off the agentic constitution),
- IT (instruments the signed registry and the stop mechanism),
- the CISO (signs off the cryptographic architecture),
- the DPO (verifies the GDPR articulation, in particular Article 22),
- legal (oversees EU AI Act compliance and mandate drafting),
- the business sponsor (describes the use case, signs off escalation thresholds).

The agent itself is not a member of the committee.

---

## 7. The three-tier emergency stop protocol

An effective agentic stop mechanism is not a simple switch. ACF® specifies three tiers of interruption, with defined response times and escalation procedures. Card **ACF-07** (Kill Switch) documents their implementation; card **ACF-20** (Governance Simulation) mandates a quarterly exercise.

**Tier 1, Operational pause.** In under 30 seconds, the agent suspends its non-critical operations: it completes ongoing actions but initiates no new ones. Triggering is automatic (on a registry alert signal) or manual (DDAO or first-line operator).

**Tier 2, Decisional stop.** In under 5 seconds, all decision-making is suspended and pending decisions are redirected to human operators. Triggering belongs to the DDAO or a member of the governance committee.

**Tier 3, Total system stop.** In under 1 second, all agentic systems are interrupted and the organisation falls back to its manual backup processes. This tier is reserved for the governance committee or executive management.

Each tier is tested through quarterly simulation exercises. A documented but untested stop mechanism is not a stop mechanism.

---

## 8. ACF® against existing frameworks, the mapping matrix

The matrix maps 17 cards of the Decide family to the five major frameworks: EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR and COBIT 2019. The mapping is deliberately conservative: when a card concerns several articles, only the primary article is cited. The complete mapping, with secondary references, is reproduced in the ACF® Toolkit manual and exposed in machine-readable form by the `acf-mcp` MCP server.

| ACF® card | EU AI Act | ISO/IEC 42001 | NIST AI RMF | GDPR | COBIT 2019 |
| --- | --- | --- | --- | --- | --- |
| ACF-01 Sovereignty Score | Art. 9 | 6.1.2 | MAP-3 | Art. 35 | EDM-01 |
| ACF-02 Decision Map | Art. 14 | 8.4 / A.6 | GOVERN-1.1 | Art. 22 | EDM-03 |
| ACF-03 Criticality Matrix | Art. 6 + Ann. III | 6.1.2 | MAP-2 | Art. 35 | APO-12 |
| ACF-04 Agentic Constitution | Art. 5 + 26 | 5.2 | GOVERN-2 | Art. 25 | EDM-01 |
| ACF-05 Agent Card | Art. 11 + 26(6) | 7.5 + 8.1 | MAP-1 | Art. 30 | BAI-09 |
| ACF-06 Supervision & Governance | Art. 14 + 26(5) | 5.3 + 9.1 | GOVERN-3 / MANAGE-2.3 | Art. 22 + 37-39 | MEA-02 |
| ACF-07 Kill Switch | Art. 14(4) + 26(5) | 8.3 | MANAGE-4 | Art. 22(3) | DSS-02 |
| ACF-08 First Agent Dossier | Art. 11-13 + 17 | 8.1 + 6.2 | MAP-2 + GOVERN-4 | Art. 30 + 35 | BAI-01 |
| ACF-09 Agentic Decisions Register | Art. 12 + 19 + 26(6) | 9.1 + 7.5.3 | MEASURE-2 | Art. 30 | MEA-01 |
| ACF-10 Action Plan & Improvement | Art. 9(4) + 17 | 10.1 + 10.2 | MANAGE-2 | Art. 24 + 32 | BAI-08 |
| ACF-11 30-Day Governance Audit | Art. 17 + 71 | 9.2 + 9.3 | GOVERN-5 + MANAGE-3.1 | Art. 32 | MEA-02 + MEA-03 |
| ACF-12 Agentic Risk Assessment | Art. 9 | 6.1.2 | MAP-3 + MAP-4 | Art. 35 | APO-12 |
| ACF-13 Agent Mandate | Art. 16 + 17 + 26 | 5.3 | GOVERN-3 + GOVERN-6 | Art. 28 + 24 | APO-05 |
| ACF-14 Responsibility by Design | Art. 5 + 13 + 16(b) | 5.2 | GOVERN-1 + MANAGE-1 | Art. 5(2) + 24 + 25 | EDM-01 |
| ACF-18 Guided Case Study | Art. 6 + 13 | 7.2 + 7.3 | MAP-2 | Art. 22 | BAI-05 |
| ACF-19 Instructor's Guide | Art. 4 | 7.2 + 7.3 | GOVERN-1.6 + GOVERN-6 | Art. 39 | APO-07 |
| ACF-20 Governance Simulation | Art. 9 + 57-63 | 9.1 + 6.2 | MANAGE-3 + MEASURE-3 | Art. 32 | BAI-06 |

**Reading.** Card ACF-09 (Registry of Agentic Decisions) directly implements the obligation of Article 12 of the EU AI Act on automatic event logging and Article 26(6) on the deployer's six-month log retention; on the ISO/IEC 42001 side it falls under clause 9.1 (monitoring, measurement, analysis, evaluation); on the NIST AI RMF side under function MEASURE-2 (Performance & Trustworthiness); on the GDPR side under Article 30 (record of processing activities); and on the COBIT side under objective MEA-01 (Performance Monitoring). A compliance team that deploys ACF-09 simultaneously produces the artefacts required by those five frameworks.

---

## 9. The ACF® ecosystem, one infrastructure, four manifestations

ACF® is not a product. It is a trust infrastructure that manifests through four distinctly named components, each answering a precise verb:

| Verb | Component | Role |
|---|---|---|
| **Govern** | ACF® (the doctrine) | The framework: 4 principles, 4 layers, N0-N3, DDAO, 45 cards |
| **Measure** | **ACF Sovereignty Score™** | The metric: a 0-100 index across four dependency dimensions |
| **Prove** | **ACF Compliance** | The proof: Ed25519-signed registry, SHA-256 chain, Ed25519-signed timestamping |
| **Run** | **`acf-mcp`** | The engine: open-source MCP server that exposes the doctrine to AI copilots |

This backbone is complemented by free entry tools (ACF AI Act Checker, Flash Audit, Compliance Plan) and complementary commercial products (ACF Auditor, ACF Control, ACF Certification). An organisation can enter ACF® through any door; it ends up touching all four components.

### Free tools

#### 9.1. ACF Sovereignty Score™, the reference metric

The ACF Sovereignty Score™ is the 0-100 metric of the decisional sovereignty that an organisation preserves over its AI agents. It rests on card ACF-01 and measures the organisation's degree of dependency across 4 dimensions, each scored from 0 to 25: **technological** dependency, meaning real command of its models, infrastructure and data; **acquisition** dependency, the share of customers that flows through channels the company does not own; **decisional** dependency, which records the decisions already delegated to systems without human governance; and **financial** dependency, the concentration of revenue or funding on a small number of players. Their sum gives a dependency index out of 100, of which sovereignty is the inverse. The reading order is deliberate: you govern before you automate. The tool is freely accessible, requires no registration, and the score is computable in under 15 minutes. Above 60, the organisation sits in *controlled sovereignty*; above 80, in *full sovereignty*. Target audience: executive management, IT, CRSO, DPO seeking a first diagnostic comparable to a public benchmark.

The ACF Sovereignty Score™ is to agentic governance what NPS is to customer satisfaction: a single, shareable number that an executive committee can reason on without opening a fifty-page report.

#### 9.2. ACF AI Act Checker, AI Act compliance verification

Rapid verification of a system's exposure to the EU AI Act: risk classification (prohibited / high-risk / limited risk / minimal risk), applicable articles and associated obligations. Freely accessible tool. Target audience: legal, compliance, DPO at first reading. `www.acfstandard.com/fr/compliance-checker`.

#### 9.3. Compliance Flash Audit, 15-minute diagnostic

Compact diagnostic, structured on the critical axes of agentic governance (human oversight, traceability, stop mechanism, DDAO role, decision registry). Immediate output as a downloadable report. Target audience: business team, project sponsor, CRSO, DPO seeking to frame a file before an audit or a committee. `compliance.acfstandard.com/fr/start`.

#### 9.4. Personalised Compliance Plan, roadmap

Based on the Flash Audit results, generation of a compliance roadmap prioritised over three phases (scoping / deployment / steady state), articulated on the ACF® cards and distributed by internal function (executive management, IT, CISO, DPO, legal, business). Free tool. Target audience: incoming DDAO, transformation team, project steering committee.

### Commercial products

#### 9.5. ACF Auditor, guided audit

Guided audit platform assessing an organisation's digital and agentic maturity across seven weighted dimensions (sector calibration available). Generates an Agentic Readiness Score, a detailed Sovereignty Score and a three-phase roadmap. Target audience: IT and transformation functions.

#### 9.6. ACF Control, governance dashboard

Real-time console that monitors sovereignty indicators, with adaptive authorisation control and automated escalation. Audit logs signed with Ed25519 and chained with SHA-256: any alteration becomes detectable. Target audience: IT/CISO teams in operations.

#### 9.7. ACF Compliance, the independently verifiable cryptographic proof

The platform of the ecosystem, available at `compliance.acfstandard.com`. This is the component that proves: the platform produces the independently verifiable cryptographic trace of every agentic decision (Ed25519 signature, SHA-256 chain, Ed25519-signed timestamping), implements each of the mappings between ACF® and the frameworks as a multi-tenant registry, and allows any third party to verify the registry's integrity with the organisation's public key. Several plans are offered according to organisation size, from free to custom quote; the detailed pricing grid is published at `compliance.acfstandard.com`. Target audience: CRSO, DPO, legal, compliance teams, and any organisation that must be able to answer a regulator without delay, evidence in hand.

#### 9.8. ACF Certification, independent attestation

Independent certification programme in three tiers (Level 1, 2, 3). Publicly verifiable badge, annual renewal, continuous monitoring. Target audience: organisations seeking to render their governance posture independently verifiable by third parties (clients, regulators, insurers).

### Open-source MCP server

#### 9.9. acf-mcp, Model Context Protocol server

ACF®'s official MCP server, released open source under the MIT licence. Developer documentation, the integration manual, reference literature and installation instructions are kept up to date on `acfstandard.io`. The server exposes the ACF® doctrine as native MCP resources consumable by Claude Desktop, Cursor, Windsurf and Continue: the 4 principles, the 4 delegated autonomy levels, the DDAO role, the 45 toolkit cards and their manual, five regulatory guides (AI Act, GDPR, DORA, NIS2, ISO 42001), the glossary and this white paper.

The server ships with a family of deterministic reasoning tools (REASON tools), built on a versioned and signed knowledge base, with no internal LLM call:

1. `acf.advisor`: structured advice from a generic case
2. `acf.classify-agent`: preliminary qualification of an agent from ten enumerated fields
3. `acf.assess-autonomy`: recommended delegated autonomy level for a decision (suggestive, co-decision, supervised autonomous or autonomous), go/no-go opinion and stop mechanism design
4. `acf.identify-governance-gaps`: coverage score across the 4 principles and prioritised remediations
5. `acf.map-ai-act-obligations`: set of EU AI Act obligations distributed by lifecycle phase
6. `acf.assign-ddao-controls`: recommended DDAO controls per level and risk
7. `acf.evaluate-agent-mandate`: eight-check audit of an existing mandate
8. `acf.map-to-standards`: the EU AI Act, GDPR, DORA, NIS2 and ISO/IEC 42001 articles each ACF® card connects to, and the reverse
8. `acf.map-to-standards`: ACF® × existing frameworks correspondence for a given case

Every REASON tool output is signed (`doctrine_version`, `doctrine_hash`, `doctrine_archive_url`, `regulatory_snapshot`, `generated_at`) and explicitly positioned as preliminary qualification, not legal advice: `requires_human_review: true` is constant.

---

## 10. Technical differentiators, cryptographic proof

ACF® is not only a reading grid. It is a proof infrastructure whose three founding mechanisms are public and reproducible.

### 10.1. Ed25519 signature of every decision

Every agentic decision recorded in the registry (card ACF-09) is signed by an Ed25519 key pair controlled by the organisation. The public key is publishable. Any signature is independently verifiable, with no access to the deployer's infrastructure.

### 10.2. SHA-256 fingerprints

Each registry entry carries a SHA-256 fingerprint: any retroactive modification becomes detectable. An auditor, a regulator or a judge can redo the computation themselves, without going through the deployer. The registry is thus designed to be admissible as a beginning of written proof (French Civil Code, art. 1362 and 1366), ultimate enforceability being left to the judge's assessment.

### 10.3. Ed25519-signed timestamping

Each registry entry is timestamped, then sealed with an Ed25519 signature and chained. This gives every decision a date verifiable independently of the deployer and its infrastructure provider. For deployments that require it, ACF® plans external third-party timestamping as an option.

### 10.4. Registry export

The registry can be exported for presentation to an auditor or a supervisory authority. The export carries the signed entries, their fingerprints and their timestamps, which allows the recipient to verify its integrity with the organisation's public key, with no access to the deployer's infrastructure.

---

## 11. About & contact

The **Agentic Commerce Framework®** is created and led by **Vincent Dorange**. The standard grew out of his experience of online commerce and his observation of autonomous agents entering real transactions.

ACF® is published by Vincent Dorange. The documentary standard (principles, cards, doctrine) is released under an open licence. The free tools (ACF Sovereignty Score™, ACF AI Act Checker, Flash Audit, Compliance Plan) and the commercial products (ACF Auditor, ACF Control, ACF Compliance, ACF Certification) are accessible at the URLs below. The `acf-mcp` MCP server is open source (MIT licence); its installation instructions are documented on `acfstandard.io`.

**Agentic Commerce Framework®**, **ACF®** and **Souveraineté Agentique®** are trademarks registered by Vincent Dorange at the French Industrial Property Office (INPI).

**Contact**
Official site: `www.acfstandard.com`
AI Act Checker (free): `www.acfstandard.com/fr/compliance-checker`
Flash Audit & Compliance Plan (free): `compliance.acfstandard.com/fr/start`
ACF Compliance (platform): `compliance.acfstandard.com`
ACF Sovereignty Score™ (free diagnostic): via `www.acfstandard.com`
Developer documentation & MCP: `acfstandard.io`
ACF® Standard

---

## 12. Notices

**Agentic Commerce Framework®**, **ACF®** and **Souveraineté Agentique®** are trademarks of Vincent Dorange registered at the French Industrial Property Office (INPI). The methodology (cards, doctrine, schemas) is protected and released under an open licence for pedagogical, research and internal compliance use. Any commercial use of the ACF® name or its derived trademarks in a third-party product or service requires prior written agreement from the publisher.

The full set of mappings to EU AI Act, ISO/IEC 42001, NIST AI RMF, GDPR and COBIT 2019 published in this document is deliberately conservative. The complete mapping, including secondary references and interpretive notes, is reproduced in the ACF® Toolkit manual and exposed in machine-readable form by the `acf-mcp` server (tool `acf.map-to-standards`).

This document is a white paper. It is not intended to substitute for legal, accounting or regulatory advice. Any operational implementation must be adapted to the organisation's context and validated by the competent internal functions.

© 2026 Agentic Commerce Framework®, Vincent Dorange.
All rights reserved. ACF® is a registered trademark.

---

*Sources: EU AI Act (Regulation (EU) 2024/1689) · ISO/IEC 42001:2023 · NIST AI RMF 1.0 (2023) · GDPR (Regulation (EU) 2016/679) · COBIT 2019. Sector data: Bain & Company, Gartner, Forrester, IFOP, official communications from the publishers cited (Visa, Mastercard, Stripe, OpenAI, Anthropic, Google, Walmart, Wells Fargo, Klarna, Expedia, Sephora), state as of 1 June 2026.*
