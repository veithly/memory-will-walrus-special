# J3 Judging: Buildability / Demo / Red-Team Judge

## Uploaded reference files
- `bounty_brief.md`
- `.hunter/pipeline-plan.md`
- `pitch/idea_tournament.md`
- `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/00-orchestration.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01-product-discovery.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01d-gpt-pro-research.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/02-stack-and-build.md`
- `C:/Users/Ricky/Documents/Project/SuiOverflow/_hoh-zone/fork/tracks/walrus.md`

## Role
You are a skeptical build and demo red-team judge. You care about whether the selected scene can be built as a real loop fast enough without fake success, deterministic theater, hidden local state, or unsupported claims.

Judge only the six-candidate slate in `pitch/idea_tournament.md`: S1 Agent Funeral / Memory Will, S2 Avatar Continuity Arena, S3 BidForge Memory, S4 Memory Tattoo Parlor, S5 Context Crash Test, S6 SponsorTape.

## Hard boundary
Do not invent new concepts. Do not rewrite candidates into new products. Do not write PRD, UIUX, stack plan, implementation plan, or final lock. Your output is judging evidence only.

## What to optimize for
Smallest real loop that can still win: fresh judge action, real mutable state, Walrus/MemWal write/read/restore/share/delegate proof, honest failure states, desktop/mobile UI, and a 5-second clip.

## Required scoring
Score each candidate 1 to 10 on:

- Build feasibility under hackathon constraints.
- Demo clarity.
- Real state path.
- Fake-success risk.
- Need for hard external integrations.
- Surprise/replan feasibility.
- Screenshot/video strength.
- Verification path.

Use this structure:

```md
# J3 Score Matrix
| Candidate | Feasibility | Demo clarity | Real state | Low fake risk | Low external dependency | Replan feasibility | Media strength | Verification | Total /80 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

# Candidate Notes
## S1 ...
- Smallest real loop that would prove it:
- Most likely fake-success trap:
- Missing data/API risk:
- Verification artifact needed:
- Fatal blocker, if any:
```

End with:

```md
# J3 Recommendation
- Advance strongest:
- Keep as backup:
- Kill:
- One question local concept lock must answer:
```
