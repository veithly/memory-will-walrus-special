# Demo Interaction Plan

This plan describes the locked first-minute scene. It is not a PRD, UIUX spec, or build plan.

## Hero Path

| Step | Route / Surface | Judge Action | System Response | Durable State Changed | Proof Shown |
| --- | --- | --- | --- | --- | --- |
| 1 | Workbench | Open demo | Predecessor research agent is mid-comparison with visible sources, findings, and incomplete next step. | Draft task checkpoint exists in memory state. | "Checkpoint ready" indicator with inspect option. |
| 2 | Kill control | Click `Kill Agent` | Agent flatlines and app declares local context unavailable. | Memory Will draft is prepared from latest checkpoint. | Local context meter drops to zero. |
| 3 | Successor chooser | Select finance, legal, designer, or operator | App writes scoped Memory Will with allowed memories and role policy. | Memory Will object, delegation policy, redaction log, and source bundle are written to Walrus/MemWal. | Memory Will pointer/object id appears. |
| 4 | Cold successor | Click `Open Successor` | New successor agent starts blank, fetches Memory Will, shows allowed memory scopes, and resumes comparison. | Successor replay trace and restored checkpoint are created. | Output states which memories were inherited and which were unavailable. |
| 5 | Surprise mutation | Block a memory category or switch successor role | Successor replans, narrows output, or asks for missing scope instead of hallucinating. | Redaction log and revised successor trace update. | Diff shows allowed vs blocked memory effect. |
| 6 | Receipt | Open Memory Will Receipt | App shows before-death state, scoped will, successor output, replay timeline, and inspect links. | Final comparison artifact is saved. | Shareable receipt with Walrus/MemWal pointer and replay. |

## Required 5-Second Clip

Agent flatlines -> Memory Will stamped -> local context cleared -> successor opens scoped will -> successor continues with chosen role.

## State Objects

- Memory Will: durable object with task id, source ids, checkpoint id, allowed memory scopes, redactions, successor role, and created timestamp.
- Task checkpoint: latest work-in-progress facts, open questions, and next planned step.
- Evidence bundle: source snippets or files used by the predecessor agent.
- Delegation policy: role-specific allow/deny rules.
- Successor replay trace: restore event, recall event, redaction checks, next action, final output.
- Memory Will Receipt: human-readable share/replay artifact.

## Tool Calls To Expose

- `remember_checkpoint`
- `write_memory_will`
- `delegate_memory_scope`
- `restore_successor_context`
- `verify_redactions`
- `render_will_receipt`

## Failure States

- Walrus/MemWal write fails: show the task can be killed but cannot be safely inherited; do not fake success.
- Memory Will pointer missing: successor starts blank and cannot continue.
- Redacted scope required: successor produces a narrower result and names the missing memory.
- Restore returns stale checkpoint: show stale warning and ask judge whether to restore older state.

## Inspection Requirements

- The receipt must show a durable pointer or object id for the Memory Will.
- The successor view must show it starts without predecessor local state.
- Changing successor role must change delegated memory and output.
- Blocking a memory category must change output and proof.
- The demo must never claim success from seeded local-only fallback.
