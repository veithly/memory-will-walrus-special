R0 Evidence-only research pack for Sui Overflow 2026 Special Walrus
Scope and source posture
This pack is intentionally evidence-only. It does not propose a project, a product concept, a winner pick, a PRD, UI/UX, or a build plan. It is bounded by the uploaded HackathonHunter references, which explicitly require a Required Construct Primer before ideation, a desire-led and audience-close market scan, and an autopsy-style research pack rather than brainstorming. fileciteturn0file2 fileciteturn0file3 fileciteturn0file4
The local Walrus track brief is clear about the contest noun and the acceptable surface area. It asks entrants to rethink agent systems with Walrus as AI’s verifiable data platform, and it explicitly calls for functional AI agents or agent workflows that demonstrate durable data and file access, shared context, portable memory, long-running workflows, multi-agent collaboration, artifact-driven workflows, or developer tools for Walrus or MemWal. The uploaded bounty brief independently restates the same focus and adds a first-minute proof seed: the judge changes input, a durable memory or artifact is written to Walrus, and the result can be reopened or inspected through a blob id or Sui proof object. fileciteturn0file5 fileciteturn0file0
Public Walrus product and docs sources align with that framing. Walrus positions itself as a verifiable data platform where stored blobs are content-addressed, availability can be proven, and stored blobs are also represented as objects on Sui so smart contracts can check availability windows, extend lifetime, or delete them. Walrus Memory then narrows that into an agent-memory product: portable memory across apps and sessions, owner-controlled access, shared memory spaces for agent coordination, and restore-from-Walrus behavior when the local index is lost. [1]
One limitation matters: the public DeepSurge page for Sui Overflow 2026 exposed only a loading shell during research, and the uploaded bounty brief itself says the participant handbook and final submission fields still need confirmation. That means event dates, track names, and the local Walrus framing are well-backed, but some form-level submission detail remains unconfirmed in public sources. The uploaded brief also flags a prize discrepancy between the local Walrus brief and DeepSurge event-level prize rows. [2] fileciteturn0file0
Required construct primer
Exact construct this track asks for
The construct is not merely “AI” or “storage.” It is a Walrus-backed AI agent or agent workflow that uses Walrus as verifiable data infrastructure, or a developer integration/tool that makes Walrus or MemWal easier to adopt inside agent systems. The local brief specifically names durable data and file access, shared context, portable memory, long-running stateful workflows, multi-agent collaboration, artifact-driven workflows, and developer tools as in-scope examples. fileciteturn0file5 fileciteturn0file0
What counts
Based on the official brief and Walrus docs, a submission counts when Walrus or Walrus Memory is on the critical path of agent state, rather than used as a decorative persistence layer. The strongest evidence pattern is: a user or judge initiates an action; the agent stores or updates durable state or artifacts on Walrus; the resulting memory, file, dataset, or execution object can later be reopened, recalled, restored, shared, delegated, or inspected through Walrus or Sui-linked state. This interpretation is supported by Walrus docs on content-addressed blobs, proofs of availability, Sui-represented blob objects, and programmable lifetimes, plus Walrus Memory docs on remember, recall, analyze, ask, delegate access, restore, and cross-app memory spaces. [3]
What does not count
The brief and docs together rule out a long list of near-misses. A project is off-pattern if Walrus is only an optional upload target, a static appendix, a hidden backup store, or a generic “we use storage” badge. Walrus itself says it is not optimized for small ephemeral app state, in-memory database roles, or pure archival use without verification needs. The uploaded HackathonHunter references also reject first-minute demos that are just chat, dashboards, reports, proof packets, or backstage operator boards with no judge-controlled state mutation. [4] fileciteturn0file3 fileciteturn0file4
First-minute demo proof
The strongest first-minute proof pattern, directly supported by the brief and the Walrus Memory docs, is not “look at this dashboard.” It is a before-and-after recall or reopen moment. The judge performs a simple action, such as giving a durable fact, creating a note/report, changing a preference, or triggering a memory write; then a later retrieval, fresh session, second agent, or restore path shows that the state persisted and changed subsequent behavior. Walrus Memory’s own verification guidance instructs users to ask what MCP tools are available, state a durable fact, confirm memwal_remember, and verify it is recalled in a later session; Walrus Memory docs also document memwal_restore for rebuilding a search index from durable Walrus blobs if recall is unexpectedly empty. fileciteturn0file0 [5]
Research evidence used
This primer is grounded in the uploaded Sui Overflow Walrus brief, the uploaded bounty brief, Walrus docs, Walrus Memory docs, Walrus Memory concepts and MCP docs, Walrus official example apps, official Walrus ecosystem case studies, and the Walrus research paper abstract. fileciteturn0file5 fileciteturn0file0 [6]
Prompt constraint to bind later ideation windows
Any later ideation window should be bound to this sentence: The judge must be able to cause a Walrus- or MemWal-backed state change in the first minute, and then reopen, recall, restore, share, delegate, or inspect the resulting durable object or memory without treating Walrus as optional backstage storage. This is a synthesis from the brief, Walrus blob-object behavior on Sui, and Walrus Memory’s remember/recall/restore/delegate model. fileciteturn0file0 fileciteturn0file5 [7]
Product-market arena
Required construct primer: The market opportunity is not “another chatbot” but “agents whose state survives time, tools, and providers, with user-visible proof.” Walrus markets this as provable, programmable, always-available data; Walrus Memory markets it as portable memory that works across agents, apps, and workflows under user control. [8]
Desire-led cool utility signals: The strongest cool-utility signal is not relief from a chore. It is a new user power: the ability to make an agent remember, recover, and act consistently across sessions and clients, or to make offchain outputs provable and reopenable later. Walrus Memory highlights portability, delegate access, restore, and cross-app continuity; OpenAI Projects centers “organize, revisit, and continue your work,” shared project context, saved response artifacts, and repeatable workflows; Claude Code centers persistent project instructions plus auto-generated learnings that carry across sessions. [9]
Voluntary behaviors: The repeated user behaviors visible in the sources are saving a fact, saving a note, saving a report, moving chats into a shared workspace, reusing uploaded files, reopening a project, continuing a conversation with inherited context, and restoring or recalling memory after interruption. These are all voluntary “come back tomorrow” behaviors rather than emergency-only workflows. [10]
User superpowers: The consistent superpower is continuity under context loss. Walrus Memory can rebuild an index from durable Walrus blobs; Temporal can recreate workflow state from event history and continue after crashes; LangGraph separates thread checkpoints from cross-thread stores; Claude Code lets knowledge survive through CLAUDE.md and auto memory; Zep turns business data and chat into a temporal knowledge graph with governed retrieval. [11]
Public flex artifacts: The artifacts people can reopen, inspect, or forward are more important than the raw chat. In the sources, those artifacts include saved sprint reports, encrypted notes, auditable click and impression trails, verifiable datasets anchored as Walrus blobs with blob IDs, full execution histories, shared project sources, draft pull requests, and deployable prototypes. [12]
Tuesday pull: The sources repeatedly reward products that are reopened when nothing is on fire: research continuation, codebase continuity, ongoing project work, repeated drafting, repeated note capture, and long-running background workflows. That “Tuesday pull” shows up in Walrus Researcher, ChatGPT Projects, Claude Code memory, LangGraph persistence, and v0’s ship-iterate-deploy loop. [13]
Serious value behind cool surfaces: The consumer-legible surface is continuity or “the agent remembers,” but the money surface is enterprise trust, compliance, team collaboration, regulated workflows, and durable execution. Walrus case studies stress auditable advertising reconciliation, verifiable exchange execution, enterprise agent data provenance, and independent auditability; OpenAI shared projects expose edit/chat roles and workspace controls; Mem0 OSS, Zep, and Temporal all position control and durability as production features rather than novelty. [14]
Pain and rescue traps: The biggest trap is turning the project into a backstage proof console, ops board, or “memory database demo.” The uploaded HackathonHunter rules directly reject dashboards, reports, proof packets, and demos that begin with builder narration; Walrus itself also warns that pure archival or tiny ephemeral state uses are not the platform’s target. Evidence repeatedly favors visible state mutation plus a reopenable result object. fileciteturn0file2 fileciteturn0file3 [15]
Audience proximity anchors: The most judge-legible, non-domain surface is not “trusted storage.” It is a familiar memory and continuity story: “I told it once; it remembered later,” “I can reopen the work on another client,” “another collaborator or agent picked up where I left off,” or “I can prove what this system acted on.” OpenAI Projects, Claude Code, Walrus MCP, and Walrus Memory directly expose those behaviors. [16]
Product ambition patterns: The best patterns are “wide product, sharp demo.” A narrow first beat proves memory, restore, artifact continuity, or verification. The broader product owns a recurring class of situations: cross-session coding memory, shared project workspaces, durable workflow execution, verifiable data provenance, or long-lived agent coordination. LangGraph, Temporal, ChatGPT Projects, Zep, Walrus Memory, and the Walrus case studies all show reusable engines rather than one-off incidents. [17]
Beachhead vs product examples: A single saved preference or note is the beachhead. The broader product is a memory space, event history, project workspace, shared knowledge base, or governed context layer that multiple threads, users, or agents return to. That distinction appears explicitly in Walrus Memory’s memory spaces, LangGraph’s checkpointers vs stores, and ChatGPT Projects’ project-only memory. [18]
Adjacent-case expansion patterns: The observed expansion pattern is consistent: note or preference memory expands into research memory, then into shared workspaces, then into multi-agent or multi-user workflows, then into auditable production data systems. Walrus docs and case studies show this ladder from memory apps to exchange logs and enterprise datasets; broader products show the same ladder from personal memory to team collaboration and production systems. [19]
Reusable engines observed: The durable engines are memory spaces and namespaces, delegate keys and access control, event histories, checkpoints, versioned datasets, saved project sources, stored notes, and replayable workflow traces. These are the durable objects that later product choices should treat as first-class. [20]
Narrowness traps: The most common narrowness trap is a single-turn “assistant with memory” that cannot share, reopen, restore, or be inspected independently. Another is a static multi-agent story without real shared state. Walrus OpenClaw, Walrus MCP, ChatGPT shared projects, and Temporal’s event history all suggest that memory only matters when there is a visible handoff, replay, or recovery path. [21]
Non-domain judge personal stakes: Judges can personally care about repeated context loss, file sprawl, lost project state, forgotten preferences, and not being able to trust what a system acted on. Those stakes are visible in mainstream products such as ChatGPT Memory, ChatGPT Projects, Claude Code memory, and v0. [22]
Familiar first-five-second desire or pressure hooks: The strongest first screen hook is: “tell it once, see it remembered later,” or “switch tools or sessions and it still knows.” The strongest enterprise hook is: “prove exactly what the system acted on.” Both come straight from the docs and case studies. [23]
Public demo hooks: Public hooks that a room can understand immediately include a later-session recall, a restore after a wiped index, a second agent reading the same memory space, a shared project chat picking up another person’s context, or an auditable blob/execution trail that can be rechecked. [24]
Retell lines: The most retellable lines in the evidence are plain-English: “the agent remembered me,” “another tool reopened the same memory,” “the log is verifiable, not just stored,” and “the workflow resumed after failure without losing its place.” Those lines are all supported by official docs or case studies, not by speculative market commentary. [25]
Industry buyers behind human-close arenas: The buyer side appears in enterprise team workspaces, compliance-sensitive data flows, DeFi, adtech reconciliation, and coding workflows. Walrus highlights AI and finance, while OpenAI, Anthropic, Temporal, Mem0, and Zep each expose team or enterprise control surfaces. [26]
Current attention, desire, and pain: The current attention vector is toward coding agents, project workspaces, shared memory, and durable agent execution. OpenAI is actively rolling out improved memory; Projects were updated days before research time; Walrus Memory is in beta but already supports MCP and multiple clients; recent research on agentic pull requests shows huge usage but persistent human-review and validation failure modes, which increases the value of durable traces and inspectable artifacts. [27]
Buyer, budget, or willingness to pay: The clearest WTP signals are enterprise-sharing controls, admin permissions, compliance framing, cloud and sales surfaces, and production-scale positioning. OpenAI shared projects include access levels and workspace controls; Temporal documents Cloud and production deployment; Mem0 OSS and Zep explicitly sell infrastructure control; Walrus case studies frame real-world revenue-critical and regulated workloads; v0 positions itself for teams, enterprise, and production deployment. [28]
Repeat behavior: Strong repeat loops are save, recall, continue, branch, share, restore, replay, and review. Those loops recur in Walrus Memory, ChatGPT Projects, Claude Code, LangGraph, Temporal, and v0. [29]
What judges can personally try: A judge can state a durable fact, save a note or report, move a chat into a project, or trigger a later-session recall. Walrus MCP literally tells the user to ask which MCP tools are available, state a durable fact, and verify it is remembered in a later session. [30]
Judge first action within thirty seconds: The cleanest first action in the corpus is not setup-heavy. It is “tell the system one durable fact or save one structured note, then ask again later or elsewhere.” Walrus MCP and the example apps make that pattern explicit. [31]
Five-second replayable clip: The replayable clip is a changed answer caused by remembered context, or a reopened artifact after a fresh session. Walrus Chatbot, Researcher, MCP, and OpenAI Projects all support this clip shape. [32]
What changes when the judge changes input: Different durable facts, namespaces, owner or delegate scopes, report contents, or project files visibly change what gets recalled, what gets shared, and what the agent can answer or reconstruct. This behavior is documented in Walrus Memory spaces, ownership/delegates, example apps, and OpenAI project-only memory boundaries. [33]
Shareable or comparable result: The strongest shareable result is not the chat transcript but the durable object: note, report, saved source, blob-backed dataset, auditable execution log, or draft PR. Those are comparable, reopenable, and team-visible. [34]
Nearest boring clone: The boring clone is always the same: a chatbot with hidden server memory, a dashboard that claims persistence, or an audit page detached from user action. The sources that feel strongest all avoid that by making the durable object or later-session consequence visible. fileciteturn0file3 fileciteturn0file4 [30]
Pattern mutation that makes it not boring: The repeated mutation pattern is: turn hidden memory into a judge-visible reopen or handoff object, or turn invisible verification into a public replay or independent check surface. That is the common move across Walrus Memory apps, Walrus MCP, Bluefin, Alkimi, and shared project workspaces. [35]
Backstage submission constraints
The uploaded Walrus brief and bounty brief define the top-level scope, but the uploaded HackathonHunter references add an important backstage discipline: proof, logs, metrics, and submission evidence matter, yet they must not become the project name or the first demo beat. The internal rules explicitly reject first 15–30 seconds that are just chat, reports, dashboards, proof packets, or operator lectures, and they reject deterministic fake-success paths, static “multi-agent theater,” and claims that are not backed by real state changes and inspectable results. fileciteturn0file5 fileciteturn0file0 fileciteturn0file2 fileciteturn0file3
The same references also imply what evidence later gates must preserve backstage. At full-mode G4 and later, the workflow expects product code, runtime reports, claim matrices, smoke checks, README consistency, and paste-ready submission facts. That means any Walrus project that advances later will need truthful inspection paths for runtime, claims, and public operation, but R0 should treat those as supporting evidence rather than a front-stage hook. fileciteturn0file1 fileciteturn0file2
The bounty brief adds a practical submission caveat: the actual DeepSurge project fields were still marked as “expected fields” pending registration or browser access, and the participant handbook had not yet been checked in the brief. So the minimum reliable stance is: repository URL, live URL, demo video, description, team, and track selection are likely, but not yet fully confirmed from public sources; prize rows also carry a discrepancy that should be treated carefully. fileciteturn0file0
Useful project autopsies
Walrus Memory Playground
Source URL: https://docs.wal.app/walrus-memory/examples/example-apps
User action: sign in, set up delegate keys and credentials, then run remember(), recall(), analyze(), restore(), or middleware flows from one place.
State change: a memory space gets written to, queried, or rebuilt from Walrus.
Result artifact: inspectable remembered items plus a restore path when recall fails.
Structural move: compress onboarding, live testing, and inspection into one environment so the durable state is immediately legible.
Clone trap: a static “SDK demo” or empty dashboard.
Later decision it constrains: onboarding and verification should expose a real write/read/restore loop, not only a narrative about the SDK. [36]
Walrus Memory Chatbot
Source URL: https://docs.wal.app/walrus-memory/examples/example-apps
User action: chat with memory enabled; the server wraps the model with withMemWal.
State change: relevant memories are recalled before generation and new context is auto-saved after each turn.
Result artifact: future responses reflect persisted context across sessions.
Structural move: hide persistence inside the chat loop so recall changes the answer, not just the storage layer.
Clone trap: a chat UI with hidden history in a normal database.
Later decision it constrains: memory must visibly alter later output, otherwise the Walrus layer is not demo-legible. [37]
Walrus Memory Noter
Source URL: https://docs.wal.app/walrus-memory/examples/example-apps
User action: write a note and run analyze() on it.
State change: note text is transformed into extracted facts and stored asynchronously as searchable memory.
Result artifact: encrypted, structured, later-recallable factual memories.
Structural move: convert a blob of text into atomic durable memory rather than storing raw prose only.
Clone trap: plain note-taking with search.
Later decision it constrains: “artifact-driven workflow” evidence is stronger when the artifact becomes reusable machine-readable state. [38]
Walrus Memory Researcher
Source URL: https://docs.wal.app/walrus-memory/examples/example-apps
User action: save a sprint report with references and later ask a recall query.
State change: a structured long-form report is written to Walrus Memory and then used to rebuild context in a fresh session.
Result artifact: saved sprint reports and relevant recalled findings.
Structural move: treat intermediate research as a durable reopenable object, not disposable chat context.
Clone trap: a one-shot research assistant that forgets after refresh.
Later decision it constrains: long-running workflows need a concrete artifact that can be reopened, not just “memory exists.” [39]
Walrus Memory MCP
Source URL: https://docs.wal.app/walrus-memory/mcp/overview
User action: install the MCP server or plugin, ask what tools are available, state a durable fact, and verify later recall; if recall breaks, run memwal_restore.
State change: the client writes durable memories and can rebuild its search index from Walrus.
Result artifact: later-session recall and a visible recovery path.
Structural move: make memory live where judges already use agents, instead of forcing a custom app.
Clone trap: “we support MCP” without showing a persistent state mutation and recall.
Later decision it constrains: a strong judge path can happen inside an existing agent client, but only if the later-session recall is explicit. [40]
NemoClaw and OpenClaw plugin
Source URL: https://docs.wal.app/walrus-memory/openclaw/overview
User action: run OpenClaw with the Walrus plugin.
State change: memories are recalled before each turn and new facts are captured after each turn, with separate namespaces per agent and optional explicit memory tools.
Result artifact: cross-app, cross-agent continuity with inspectable search and stats commands.
Structural move: add durable, portable memory to an existing agent runtime rather than rebuilding the runtime.
Clone trap: merely calling local files “memory.”
Later decision it constrains: developer-tool submissions should prove adoption by upgrading an existing agent loop, not by shipping a detached dashboard alone. [41]
Sui Archival System
Source URL: https://docs.wal.app/docs/examples/checkpoint-data
User action: the system subscribes to Sui checkpoints and uploads deterministic checkpoint blobs to Walrus.
State change: checkpoint blobs are archived, metadata is stored locally, and lifetime is extended as blobs approach expiration.
Result artifact: deterministically archived checkpoint data with continued availability.
Structural move: show that long-running stateful processes must handle expiration and renewal, not only initial writes.
Clone trap: “we stored a file once.”
Later decision it constrains: any long-running Walrus workflow should explicitly account for lifetime management and reopenability over time. [42]
Inflectiv on Walrus
Source URL: https://walrus.xyz/case-study/inflectiv/
User action: ingest raw files and datasets that AI agents will later act on.
State change: every raw file is anchored as an immutable Walrus blob, assigned a blob ID, and registered as an object on Sui to preserve chain of custody.
Result artifact: independently auditable dataset provenance for agent execution.
Structural move: move proof down to the raw material, not only the final answer.
Clone trap: agent memory with no trustworthy source provenance.
Later decision it constrains: if the claim is “verifiable agent memory,” later gates should ask what exact raw object is being anchored and how it is inspected. [43]
Bluefin Pro on Walrus
Source URL: https://walrus.xyz/case-study/bluefin/
User action: place, cancel, and match orders offchain while custody and settlement remain onchain.
State change: every execution action is logged to Walrus in real time, checkpoints are published every few seconds, and the orderbook state can be reproduced independently.
Result artifact: a public, verifiable audit trail for millisecond execution.
Structural move: separate execution from verification, then make verification reproducible from logged state.
Clone trap: fast offchain system that says “trust the operator.”
Later decision it constrains: for Walrus, the inspectable artifact does not need to be a UI file; it can be a reproducible event trail with public verification. [44]
Alkimi on Walrus
Source URL: https://walrus.xyz/case-study/alkimi/
User action: produce impressions, clicks, and settlement data for digital ads.
State change: full-fidelity execution data moves from centralized storage into durable distributed storage and auditable trails.
Result artifact: verifiable click and campaign reconciliation records.
Structural move: anchor a financially disputed workflow in tamper-evident stored artifacts.
Clone trap: analytics dashboards without independent auditability.
Later decision it constrains: the “artifact-driven workflow” interpretation of the track can be very strong when the artifact resolves trust disputes, not just storage convenience. [45]
Mature product and workflow autopsies
LangGraph persistence
Source URL: https://docs.langchain.com/oss/python/langgraph/persistence
User action: compile a graph with a checkpointer, a store, or both, then invoke it with a thread id.
State change: thread-scoped graph state is checkpointed while cross-thread durable data is stored separately.
Result artifact: resumable conversation or agent thread plus durable long-term facts and shared knowledge.
Structural move: separate short-term execution memory from long-term reusable state.
Clone trap: one undifferentiated “memory” bucket.
Later decision it constrains: a Walrus project should distinguish volatile run state from durable reusable objects. [46]
Temporal workflows
Source URL: https://docs.temporal.io/workflows
User action: start a workflow execution from code with some input.
State change: events are appended to workflow history; on failure or pause, Temporal replays history to rebuild the exact pre-failure state.
Result artifact: event history as the source of truth for a resumable long-running workflow.
Structural move: make replayable event history, not snapshots, the durable execution spine.
Clone trap: cron job plus ad hoc retries.
Later decision it constrains: long-running agent claims need a real recovery and replay story, not just “it can run for a while.” [47]
ChatGPT Memory
Source URL: https://help.openai.com/en/articles/8590148-memory-faq
Source note: page showed “Updated: 4 days ago” at research time.
User action: tell ChatGPT to remember something, or allow it to learn useful context from chats, files, and connected apps.
State change: saved memories and referenced chat-history context become part of future personalization until edited, deleted, or disabled.
Result artifact: a memory summary and later personalized replies with inspectable source explanations.
Structural move: make memory a first-class editable object rather than only an hidden prompt append.
Clone trap: hand-wavy “personalization” with no user controls.
Later decision it constrains: user-owned controls over remember, forget, and provenance are not optional if the memory claim is central. [48]
ChatGPT Projects
Source URL: https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt
Source note: page showed “Updated: 5 days ago” at research time.
User action: create a project, upload files, add instructions, save responses back into project sources, move chats into the project, and optionally share it.
State change: the project accumulates chats, files, instructions, saved response artifacts, and project-only memory boundaries.
Result artifact: a long-running workspace that others can reopen and continue.
Structural move: turn chat outputs into reusable project sources and make context collaborative.
Clone trap: isolated chats with no owned workspace object.
Later decision it constrains: the result should be an owned workspace or artifact people return to, not only an ephemeral answer. [49]
Claude Code memory
Source URL: https://code.claude.com/docs/en/memory
User action: add persistent project instructions in CLAUDE.md, let auto memory capture learnings, and inspect or edit memory with /memory.
State change: project-scoped memory files are read and updated across sessions, with repo-wide storage directories and plain markdown files.
Result artifact: editable instruction files and auto-generated memory files that can be audited.
Structural move: split explicit team-authored rules from automatically learned facts.
Clone trap: one opaque hidden memory store.
Later decision it constrains: later gates should ask whether durable state is user-editable, team-shareable, and inspectable, not merely retrievable. [50]
v0
Source URL: https://v0.app/docs
User action: prompt for an app or agent, iterate, deploy immediately, or open a pull request for review.
State change: a prompt becomes executable code, a live prototype, a deployment, or a PR-oriented review object.
Result artifact: real code and a shippable prototype, not just a design mock.
Structural move: make the agent generate the artifact users actually reopen or ship.
Clone trap: static UI generation with no deployable consequence.
Later decision it constrains: if a Walrus project is “artifact-driven,” the artifact must be something a judge can reopen, compare, or ship. [51]
Mem0 OSS
Source URL: https://docs.mem0.ai/open-source/overview
User action: self-host Mem0 as a library or server, bootstrap the stack, then run add or search loops.
State change: memory is stored in self-controlled infrastructure with vector and history stores, dashboard, API keys, and audit logs.
Result artifact: a controllable memory service with request logging and configurable components.
Structural move: treat memory as infrastructure with control and audit surfaces, not just a prompting trick.
Clone trap: “long-term memory” with no operational ownership model.
Later decision it constrains: devtool-oriented Walrus entries should clarify whether they are product features or infrastructure layers. [52]
CrewAI unified memory
Source URL: https://docs.crewai.com/en/concepts/memory
User action: call remember(), recall(), forget(), inspect the memory tree, or attach memory to crews, agents, and flows.
State change: content is analyzed, categorized, scored by semantic similarity plus recency and importance, and organized into a self-managed scope tree.
Result artifact: ranked recall results and an explorable memory tree.
Structural move: unify different memory classes behind one API, but keep explicit operations for save, recall, forget, and inspect.
Clone trap: vague “agent remembers more.”
Later decision it constrains: a Walrus project should expose the memory lifecycle, not just the final answer. [53]
Zep
Source URL: https://help.getzep.com/overview
User action: feed chat, business data, documents, or JSON into the system.
State change: Zep builds a temporal knowledge graph and serves token-efficient context from a governed context lake.
Result artifact: prompt-ready business and user context with enterprise retrieval behavior.
Structural move: memory becomes a temporal context graph rather than a flat vector recall surface.
Clone trap: semantic search sold as “memory.”
Later decision it constrains: some Walrus submissions may need graph- or relation-like durable state, not only chunk recall. [54]
AutoGen memory and RAG
Source URL: https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/memory.html
User action: add memory entries, query them, then let the agent update its own model context before a tool call.
State change: retrieved memory is inserted into the internal model context and changes subsequent tool behavior and final answers.
Result artifact: an execution trace that visibly shows MemoryQueryEvent, tool request, tool execution, and outcome.
Structural move: put memory retrieval directly before the consequential action, not as a separate stage users never see.
Clone trap: RAG that never visibly changes what the agent does.
Later decision it constrains: later evaluation should check whether memory visibly changes tool calls and outputs, not only the prose around them. [55]
Pattern extraction, borrowing menu, source rejections, and red-team
Pattern extraction matrix
Repeated user actions across the evidence are: state a durable fact, save a note, save a structured report, upload or attach source files, move work into a persistent workspace, delegate or share access, reopen later, restore after interruption, and inspect a replay or audit trail. That pattern appears in Walrus Memory apps and MCP, OpenAI Memory and Projects, Claude Code memory, CrewAI, and AutoGen. [56]
Repeated durable state objects are: memory spaces and namespaces; owner and delegate permissions; saved project sources and files; workflow event histories; checkpoints; versioned datasets and blob IDs; auditable click/order logs; markdown memory files; and deployable code artifacts. Those are the recurring “owned objects” in the corpus. [57]
Repeated result artifacts are: changed future answers, reopened reports, persistent notes, shared workspace context, queryable memories, replayable traces, draft pull requests, deployed prototypes, and independently auditable logs. The common thread is that the artifact survives the initial interaction and can be re-used or checked. [58]
Repeated first-minute hooks are: “I told it once and it remembered,” “I reopened the same work elsewhere,” “a second person or agent picked up the same context,” “the workflow resumed after failure,” and “here is the proof object or audit trail.” These hooks are far more consistent than any vertical-specific theme. [59]
Repeated proof and verification surfaces are: WAL/Walrus blob IDs and Sui objects; restore-after-loss behavior; event histories; saved memory summaries and sources; accessible project files and chats; edit and delegate permissions; and reproducible execution logs. The strongest Walrus-specific signature is that proof is tied to a durable object, not only to a signed statement in the UI. [60]
Repeated monetization and buyer signals are: enterprise sharing and admin controls, Cloud and sales surfaces, compliance-sensitive workloads, adtech reconciliation, DeFi execution, coding workflow productivity, and data infrastructure ownership. The corpus says buyers pay for reliability, governance, and collaboration around durable state, not only for “memory” as a novelty. [61]
Traps that would make a Walrus project boring are equally consistent: chatbot-first demos with hidden persistence, dashboard-first demos with no judge-controlled mutation, proof-centric demos detached from human stakes, one-off micro-agents with no durable owned object, and multi-agent claims without visible shared state. The uploaded HackathonHunter references say this directly, and the stronger public examples validate it. fileciteturn0file2 fileciteturn0file3 fileciteturn0file4 [62]
Product loop borrowing menu
Do not read this as a concept list. It is only a menu of reusable mechanics that the later ideation window may borrow individually:
Durable fact capture followed by later-session recall. [63]
Save-response-as-source so intermediate outputs become reusable artifacts. [64]
Namespace-based isolation for multiple agents, users, or deployments. [65]
Delegate-key or role-based sharing of memory or workspace state. [66]
Restore or replay after an interrupted run, wiped index, or failed session. [67]
Artifact-first long-running workflows where reports, notes, logs, or datasets are the owned result. [68]
Trace-as-proof, where the consequential output is paired with a reproducible event trail. [69]
Convert raw text into atomic durable facts that later retrieval can precisely use. [70]
Shared project or shared memory spaces where one actor can pick up another’s work without re-uploading everything. [66]
Turn generation into a shippable or reviewable artifact, not just a conversation. [71]
Weak source rejections
Several source classes were rejected or down-weighted.
First, unrelated academic or search noise around “WaLRUS” in machine learning sequence models was rejected because it refers to a different concept and would contaminate the track definition. That happened repeatedly in web search results. [72]
Second, the public DeepSurge event page was down-weighted for detailed event facts because it exposed only a loading shell during research. The uploaded bounty brief was therefore treated as the better source for event dates, track names, and the local Walrus framing. [2] fileciteturn0file0
Third, generic, non-primary market-summary pages were rejected where better primary documentation existed. For example, mainstream news about coding agents and NotebookLM was not used as the core product evidence when official docs or help-center material were available. [73]
Fourth, third-party summaries or encyclopedic pages were rejected when they duplicated official help content. Examples include generic Wikipedia or news summaries for Devpost, GitHub Copilot, NotebookLM, or Microsoft Copilot. [74]
Research red-team
The strongest reason a Walrus agent-memory project could still lose is that Walrus ends up being removable. If the same demo still works with a hidden local database, judges will read Walrus as decoration. Later gates should therefore collect proof that a judge-controlled action writes to Walrus or MemWal and that the later behavior, reopen path, or inspection path depends on that durable object. fileciteturn0file0 [75]
Another strong failure mode is that the demo is still just a chatbot or a memory dashboard. The internal rules explicitly warn against this, and the public examples that feel strongest all revolve around a changed later behavior, a saved artifact, or a replayable trace. Later gates should collect a real first-minute replay clip showing a changed output after a durable write. fileciteturn0file3 fileciteturn0file4 [76]
A third failure mode is that “portable memory” is claimed but not proven. Later gates should require one of the following hard checks: later-session recall, restore after index loss, second-client reuse, second-agent reuse, or delegate-based shared access. Without one of those, the portability claim is weak. [77]
A fourth failure mode is that verification never becomes human-visible. Bluefin, Alkimi, and Inflectiv all show that proof becomes compelling only when attached to economic or operational consequences. Later gates should collect evidence of what exact object is being verified, how a judge inspects it, and why that inspection changes trust in the workflow. [78]
A fifth failure mode is multi-agent theater. The Walrus brief allows multi-agent collaboration, but the proof bar should be real shared memory, shared artifact state, or real delegated permissions, not two boxes on a slide. Later gates should collect an actual shared namespace, shared object, or real handoff trace. fileciteturn0file5 [79]
A sixth failure mode is that the project becomes sponsor-correct but judge-cold. The evidence strongly suggests that non-domain judges care when the state change is personally legible: remembered facts, reopened work, shared context, or inspectable proof tied to a real artifact. Later gates should collect a testable first action that a tired judge can do in under thirty seconds, plus a five-second replay moment. fileciteturn0file2 fileciteturn0file3 [80]

[1] [3] [4] [6] [7] [8] [15] [60] [75] Walrus | Walrus Docs
https://docs.wal.app/
[2] DeepSurge
https://www.deepsurge.xyz/hackathons/b587dc0c-4cb8-4e63-ada5-519df38103bf
[5] [23] [30] [31] [40] [59] [62] [63] [80] MCP | Walrus Docs
https://docs.wal.app/walrus-memory/mcp/overview
[9] [11] [24] [25] [67] [77] What is Walrus Memory? | Walrus Docs
https://docs.wal.app/walrus-memory/getting-started/what-is-walrus-memory
[10] [12] [13] [19] [29] [32] [34] [35] [36] [37] [38] [39] [56] [58] [68] [70] [76] Example Apps | Walrus Docs
https://docs.wal.app/walrus-memory/examples/example-apps
[14] [45] [78] How Alkimi Made Every Ad Click Verifiable | Walrus
https://walrus.xyz/case-study/alkimi/
[16] [28] [49] [61] [64] Projects in ChatGPT | OpenAI Help Center
https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt
[17] [46] Persistence - Docs by LangChain
https://docs.langchain.com/oss/python/langgraph/persistence
[18] [20] [33] [57] [65] Memory Space | Walrus Docs
https://docs.wal.app/walrus-memory/fundamentals/concepts/memory-space
[21] [41] NemoClaw/OpenClaw Plugin | Walrus Docs
https://docs.wal.app/walrus-memory/openclaw/overview
[22] [27] [48] Memory FAQ | OpenAI Help Center
https://help.openai.com/en/articles/8590148-memory-faq
[26] Verified Data for AI Development | Walrus
https://walrus.xyz/use-case/ai/
[42] Sui Archival System | Walrus Docs
https://docs.wal.app/docs/examples/checkpoint-data
[43] How Inflectiv Made AI Agent Data Trustworthy | Walrus
https://walrus.xyz/case-study/inflectiv/
[44] Discover Bluefin&#39;s blueprint for verifiable trading | Walrus
https://walrus.xyz/case-study/bluefin/
[47] [69] Temporal Workflow | Temporal Platform Documentation
https://docs.temporal.io/workflows
[50] How Claude remembers your project - Claude Code Docs
https://docs.anthropic.com/en/docs/claude-code/memory
[51] [71] What is v0? | v0 Docs
https://vercel.com/docs/v0
[52] Overview - Mem0
https://docs.mem0.ai/open-source/overview
[53] Memory - CrewAI
https://docs.crewai.com/concepts/memory
[54] Welcome to Zep! | Zep Documentation
https://help.getzep.com/overview
[55] Memory and RAG — AutoGen
https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/memory.html
[66] [79] Ownership and Delegates | Walrus Docs
https://docs.wal.app/walrus-memory/fundamentals/concepts/ownership-and-access
[72] W4S4: WaLRUS Meets S4 for Long-Range Sequence Modeling
https://arxiv.org/abs/2506.07920?utm_source=chatgpt.com
[73] GitHub&#39;s new AI coding agent can fix bugs for you
https://www.theverge.com/news/669339/github-ai-coding-agent-fix-bugs?utm_source=chatgpt.com
[74] Devpost
https://en.wikipedia.org/wiki/Devpost?utm_source=chatgpt.com