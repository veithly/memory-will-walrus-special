Scoring note: higher is better. “Low fake risk” means harder to fake. “Low external dependency” means fewer hard integrations beyond model + Walrus/MemWal. I judged against the uploaded Walrus bar: judge-triggered state change, durable Walrus/MemWal write, reopen/restore/share/delegate/inspect proof, no local-only success path, and no deterministic theater. 

01-10x10-deep-research-response

 

02-stack-and-build

J3 Score Matrix
Candidate	Feasibility	Demo clarity	Real state	Low fake risk	Low external dependency	Replan feasibility	Media strength	Verification	Total /80
S1 Agent Funeral / Memory Will	8	9	10	8	8	9	9	9	70
S2 Avatar Continuity Arena	8	9	7	5	8	6	9	6	58
S3 BidForge Memory	6	7	8	6	6	8	7	7	55
S4 Memory Tattoo Parlor	9	8	8	7	9	8	9	7	65
S5 Context Crash Test	9	7	10	9	9	9	7	10	70
S6 SponsorTape	6	7	7	4	4	6	8	5	47
Candidate Notes
S1 Agent Funeral / Memory Will

Smallest real loop that would prove it: Judge presses Kill Agent, chooses successor role, predecessor writes a Memory Will, local context is unavailable to successor, successor restores only scoped Walrus/MemWal memory and resumes with visible redactions/delegation. This maps cleanly to the slate’s stated first action, artifact, input mutation, and Walrus criticality. 

idea_tournament

Most likely fake-success trap: “Agent dies” becomes a theatrical summary card generated from still-available local state. If successor can continue without proving local context was cleared or inaccessible, the core trick collapses.

Missing data/API risk: Moderate. No vertical API is needed, but it needs a real memory write/read/delegate path and a real model/tool trace. Static role labels or prewritten successor responses are not enough.

Verification artifact needed: Memory Will object with delegated memory list, redactions, successor replay, compare mode, and inspectable Walrus/MemWal pointer. The judge must be able to verify that the successor’s output depends on the scoped durable object, not hidden app state.

Fatal blocker, if any: Fatal if restore/delegation is not inspectable. Without that, it is just a dramatic summarizer.

S2 Avatar Continuity Arena

Smallest real loop that would prove it: Judge chooses Save Dragon or Steal Crown; the choice writes a Companion Memory Card; a second mini-world opens and the sidekick’s relationship/dialogue/quest state changes from that stored memory. The slate already defines the card, blob id, replay, and cross-world continuity claim. 

idea_tournament

Most likely fake-success trap: Two-world story is scripted: choice A always reveals canned callback A, choice B always reveals canned callback B. This is the slate’s own main risk: judges may not believe Walrus is load-bearing if the second world feels pre-authored. 

idea_tournament

Missing data/API risk: Low. It does not need hard external APIs, but it does need a real persistence boundary between worlds.

Verification artifact needed: Companion Memory Card with choice, relationship shift, callback, blob id, and replay. Stronger if a fresh second-world load can independently fetch the card.

Fatal blocker, if any: Fatal if the second world can run from local props or deterministic script without reading the memory object. This candidate is media-strong but proof-fragile.

S3 BidForge Memory

Smallest real loop that would prove it: Judge drags budget or toggles Water damage found, presses Rebid, and sees scope, exclusions, price confidence, margin warning, saved job evidence, and reopened homeowner bid version. The candidate’s real state path is strong because bid assumptions, evidence, margin history, and homeowner versions are supposed to be durable product objects. 

idea_tournament

Most likely fake-success trap: It becomes a contractor estimating form with AI-flavored copy and a storage receipt. If pricing/margin confidence is hardcoded or generic, judges will see fake domain intelligence.

Missing data/API risk: High relative to the slate. Real contractor pricing, historical margins, supplier costs, insurance/financing signals, and photo evidence can all become unsupported claims fast. A hackathon build can prove the state loop, but not deep estimating credibility.

Verification artifact needed: Homeowner bid card with uploaded/created evidence, assumptions, exclusions, price-confidence rationale, saved job memory, version pointer, and reopen path.

Fatal blocker, if any: Not fatal if scoped honestly to bid-memory proof. Fatal if it claims contractor-grade pricing accuracy without real data or if the first minute feels like back-office software rather than the money-risk shock the slate says it needs. 

idea_tournament

S4 Memory Tattoo Parlor

Smallest real loop that would prove it: Judge inks one brand/taste rule onto an agent, agent is wiped/reincarnated, then the blank successor recalls the tattoo and rewrites the artifact correctly, with before/after diff and memory pointer. This matches the slate’s wipe/reopen proof and Tattoo Card artifact. 

idea_tournament

Most likely fake-success trap: “Tattoo” is just a visible settings toggle or prompt prefix. If the agent could obey the rule from local state, URL params, or a frontend variable, Walrus is decorative.

Missing data/API risk: Low. It only needs one real user-provided rule, one generated artifact, a real memory write, and a hard wipe/reopen proof. This is why it scores highest on feasibility.

Verification artifact needed: Tattoo Card with before/after, tattooed rules, memory pointer, handoff/replay, and contradiction warning if the new instruction conflicts with stored memory.

Fatal blocker, if any: Fatal if wipe/reincarnation is not real. “Looks like memory” is not enough; the proof must show the successor only behaves correctly after recalling Walrus/MemWal memory.

S5 Context Crash Test

Smallest real loop that would prove it: Judge presses Nuke Context during a visible task; local memory clears; restore pulls a Walrus/MemWal checkpoint; the agent resumes at the right step; Crash Receipt shows before-nuke state, restored checkpoint, resumed artifact, object pointer, and replay trace. This candidate has the cleanest direct match to restore-after-loss and checkpoint proof. 

idea_tournament

Most likely fake-success trap: The “crash” is cosmetic: the task state is still in server session, localStorage, seeded arrays, or hidden app state. Another trap is making the first beat logs instead of visible destruction/recovery, which the slate flags. 

idea_tournament

Missing data/API risk: Low. It needs model/tool execution plus Walrus/MemWal checkpoint write/read, not a vertical data source.

Verification artifact needed: Crash Receipt with checkpoint ID/blob/object pointer, before/after state, replay trace, nuke timing, and proof that a different nuke timing restores a different checkpoint.

Fatal blocker, if any: Fatal if restore does not come from durable checkpoint/state objects. This is the strongest J3 build/proof candidate because the failure mode is binary and inspectable.

S6 SponsorTape

Smallest real loop that would prove it: Judge edits campaign metric or brand category, refreshes sponsor kit, and sees rate card, brand-fit list, claim confidence, evidence receipts, brand boundaries, and delegated sponsor view change. The slate gives it a real artifact, but also names the generic media-kit risk. 

idea_tournament

Most likely fake-success trap: It becomes a media-kit generator with made-up metrics and decorative proof links. Creator metrics are easy to seed and hard for judges to trust.

Missing data/API risk: Very high. Real proof wants platform analytics, campaign history, clips, sponsor-safe boundaries, and possibly delegated sponsor access. Without those, the most valuable claims are unsupported.

Verification artifact needed: Sponsor kit version with rate rationale, campaign proof, brand-fit recommendations, delegated sponsor view, and a visible proof history pointer.

Fatal blocker, if any: Fatal for J3 if real metrics/proof are not available. A polished sponsor kit is not enough; Walrus must carry proof history and delegated views, not just store generated copy.

J3 Recommendation

Advance strongest: S5 Context Crash Test on the J3 buildability/proof lens. It has the smallest honest real loop, lowest external dependency, clearest verification path, and the hardest-to-fake Walrus criticality: crash recovery is impossible without durable checkpoints. 

idea_tournament

Keep as backup: S1 Agent Funeral / Memory Will if final selection needs a more memorable human scene, and S4 Memory Tattoo Parlor if polish speed becomes the deciding constraint.

Kill: S6 SponsorTape first because hard metric/proof integrations make fake success too likely; S2 Avatar Continuity Arena unless the second-world recall is demonstrably unscripted; S3 BidForge Memory unless the lock narrows claims to durable bid evidence/versioning rather than estimating accuracy.

One question local concept lock must answer: After local state is intentionally destroyed or made inaccessible, what exact Walrus/MemWal object can the judge independently reopen, and what visible output would be impossible without that object?