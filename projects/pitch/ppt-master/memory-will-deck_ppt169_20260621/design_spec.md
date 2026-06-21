# Memory Will - Design Spec

> Human-readable design narrative. The execution contract is `spec_lock.md`.

## I. Project Information

| Item | Value |
| ---- | ----- |
| Project Name | Memory Will |
| Canvas Format | PPT 16:9 (1280x720) |
| Page Count | 6 |
| Design Style | narrative + dark-tech |
| Target Audience | Sui Overflow judges reviewing Special - Walrus submissions asynchronously |
| Use Case | Short pitch deck for the final submission package |
| Content Strategy | Balanced: restructure the source into a tight pitch, keep all claims sourced, and do not add unsupported chain or publish claims. |
| Created Date | 2026-06-21 |

## II. Canvas Specification

| Property | Value |
| -------- | ----- |
| Format | PPT 16:9 |
| Dimensions | 1280x720 |
| viewBox | `0 0 1280 720` |
| Margins | 56px left/right, 44px top/bottom |
| Content Area | 1168x632 |

## III. Visual Theme

### Theme Style

- Mode: narrative
- Visual style: dark-tech
- Theme: Dark
- Tone: precise, product-led, proof-aware

### Color Scheme

| Role | HEX | Purpose |
| ---- | --- | ------- |
| Background | `#0B0F14` | Page field |
| Secondary bg | `#121A24` | Panels and device frames |
| Primary | `#4EC5F1` | Walrus/Sui proof accents |
| Accent | `#73F0B8` | Success and certified states |
| Secondary accent | `#F7B955` | Caution and boundary notes |
| Body text | `#EAF1F7` | Main text |
| Secondary text | `#A8B6C6` | Captions and metadata |
| Tertiary text | `#667789` | Footers |
| Border/divider | `#2B3A4B` | Rules and frames |
| Success | `#73F0B8` | Ready state |
| Warning | `#F7B955` | Not-published boundary |
| Surface | `#121A24` | Raised panels |
| Grid | `#223143` | Technical grid |
| Overlay | `#071018` | Legibility overlays |

### Gradient Scheme

Use radial glows sparingly with primary or accent color at 0.10 to 0.22 opacity. Do not use full-slide blue gradients.

## IV. Typography System

### Font Plan

Typography direction: clean product sans with monospace labels.

| Role | Chinese | English | Fallback tail |
| ---- | ------- | ------- | ------------- |
| Title | Microsoft YaHei | Aptos Display | Arial, sans-serif |
| Body | Microsoft YaHei | Aptos | Arial, sans-serif |
| Emphasis | Microsoft YaHei | Aptos Display | Arial, sans-serif |
| Code | - | Consolas, Courier New | monospace |

Per-role font stacks:

- Title: `"Aptos Display", "Microsoft YaHei", Arial, sans-serif`
- Body: `Aptos, "Microsoft YaHei", Arial, sans-serif`
- Emphasis: `"Aptos Display", "Microsoft YaHei", Arial, sans-serif`
- Code: `Consolas, "Courier New", monospace`

### Font Size Hierarchy

Baseline body font size: 18px.

| Purpose | Ratio to body | Use |
| ------- | ------------- | --- |
| Cover title | 3.2-4.5x | 58-82px |
| Section title | 2.0-2.6x | 36-47px |
| Page title | 1.7-2.2x | 31-40px |
| Subtitle | 1.2-1.5x | 22-27px |
| Body content | 1x | 18px |
| Caption | 0.75-0.9x | 14-16px |
| Footer | 0.6-0.7x | 11-13px |

## V. Layout Principles

### Page Structure

- Header area: 56-96px. Use a small system label plus a high-contrast title.
- Content area: 520-575px. Use stage panels, proof diagrams, screenshot crops, and direct labels.
- Footer area: 32-44px. Use source/limit notes and slide numbers only.

### Layout Pattern Library

Use a dark product-stage frame, thin luminous rules, screenshot crops inside device-like frames, and technical labels. Dense pages may use flat panels. Breathing pages use one dominant idea with one artifact.

### Spacing Specification

| Element | Current Project |
| ------- | --------------- |
| Safe margin from canvas edge | 56px |
| Content block gap | 28px |
| Icon-text gap | 10px |
| Card gap | 22px |
| Card padding | 24px |
| Card border radius | 8px |

## VI. Icon Usage Specification

### Source

- Built-in icon library: `tabler-outline`
- Stroke width: 2
- Usage method: SVG placeholder `<use data-icon="tabler-outline/name" .../>`

### Recommended Icon List

| Purpose | Icon Path | Page |
| ------- | --------- | ---- |
| Kill action | `tabler-outline/skull` | P01, P03 |
| Receipt | `tabler-outline/receipt` | P01, P06 |
| Certificate | `tabler-outline/file-certificate` | P02, P05 |
| Proof | `tabler-outline/shield-check` | P04, P05 |
| Walrus storage | `tabler-outline/database` | P04 |
| Publisher/Aggregator | `tabler-outline/cloud` | P04 |
| Route | `tabler-outline/route` | P03, P04 |
| Boundary | `tabler-outline/lock` | P02, P05 |
| Link | `tabler-outline/link` | P06 |
| Server | `tabler-outline/server` | P04 |
| Flow arrow | `tabler-outline/arrow-right` | P03, P04 |
| Success | `tabler-outline/check` | P02, P06 |
| Warning | `tabler-outline/alert-triangle` | P05 |
| CLI/build | `tabler-outline/terminal` | P05 |
| Code/contract | `tabler-outline/braces` | P05 |

## VII. Visualization Reference List

Catalog read: 71 templates

| Page | Template | Path | Summary-quote (verbatim from `charts_index.json`) | Usage |
| ---- | -------- | ---- | ------------------------------------------------- | ----- |
| P03 | process_flow | `templates/charts/process_flow.svg` | "Pick for 3-8 sequential steps connected by simple arrows — approval workflows, customer onboarding, request handling, lifecycle stages. Skip if cyclical (use circular_stages) or stages produce named outputs (use pipeline_with_stages)." | Kill Agent -> Write Memory Will -> Open Cold Successor -> Inspect Proof |
| P04 | pipeline_with_stages | `templates/charts/pipeline_with_stages.svg` | "Pick for 3-5 horizontal pipeline stages, each = title + 1-line description + output artifact, connected by arrows (data pipelines, ETL, build pipelines). Skip if any stage lacks an artifact (use process_flow or numbered_steps)." | Publisher write, Aggregator read, Sui metadata, proof panel |

Runners-up considered:

- numbered_steps | rejected for P03: the slide needs connector arrows and a restore gate, not just numbered labels.
- client_server_flow | rejected for P04: the product flow is storage and proof pipeline, not a left-client/right-server request map.
- layered_architecture | rejected for P04: there are clear stage outputs, not stable horizontal architecture layers.

## VIII. Image Resource List

| Filename | Dimensions | Ratio | Purpose | Type | Layout pattern | Acquire Via | Status | Reference | text_policy | page_role |
| -------- | ---------- | ----- | ------- | ---- | -------------- | ----------- | ------ | --------- | ----------- | --------- |
| desktop-proof.png | 1440x1698 | 0.85 | Runtime desktop proof screenshot for result and product run pages | Screenshot | side-by-side product artifact crop | user | Existing | `.hunter/runtime-artifacts/g5-public-desktop-proof.png` | none | local |
| mobile-proof.png | 1170x14589 | 0.08 | Mobile smoke proof, used only as a narrow evidence strip if needed | Screenshot | accent strip | user | Existing | `.hunter/runtime-artifacts/g5-public-mobile-proof.png` | none | local |

## IX. Content Outline

### Part 1: The succession event

#### Slide 01 - Killed agent, scoped receipt

- Cover impact: the hook is a visible agent death followed by a receipt. Composition: split dark stage with a kill action on the left and certified receipt on the right.
- Layout: large title left, receipt card right, thin route line across the lower third.
- Title: Memory Will
- Subtitle: Kill one agent. Reopen scoped Walrus memory by receipt.
- Core message: The product starts with a judge action, not a storage dashboard.
- Content: Click Kill Agent. The predecessor dies, local context drops to zero, and the result becomes a Memory Will Receipt.

#### Slide 02 - Handoff without leakage

- Layout: two-panel contrast, allowed memory versus unavailable memory, with one caution boundary.
- Title: The successor needs memory and restraint.
- Core message: The user decides what survives before any successor runs.
- Content:
  - Allowed: vendor shortlist, source findings, open questions, next step.
  - Blocked: private budget notes and unverified hunches.
  - The cold successor names unavailable memory instead of leaking it.

#### Slide 03 - Product run

- Layout: process flow across the center with screenshot crop anchored on the right.
- Title: One run: kill, write, restore, inspect.
- Core message: A fresh reviewer can execute the full loop from the public URL.
- Visualization: process_flow
- Content:
  - Kill Agent.
  - Write Memory Will.
  - Wait for Walrus pointer certified.
  - Open Cold Successor.
  - Inspect Proof and reopen `/?will=latest`.

### Part 2: Why Walrus matters

#### Slide 04 - Walrus is the restore gate

- Layout: pipeline with stages. Each stage has a route, action, and output.
- Title: Walrus is on the critical path.
- Core message: The successor output appears only after a Walrus read succeeds.
- Visualization: pipeline_with_stages
- Content:
  - `/api/memory-wills` writes the Memory Will JSON through the Walrus Publisher API.
  - `/api/successor/restore` reads the blob through the Aggregator before asking the successor model.
  - `/api/proof/[willId]` reads Walrus again and inspects the Sui object metadata.
  - Failed write or read returns no-success.

#### Slide 05 - Sui proof, without overclaiming

- Layout: proof boundary board with one built/tested lane and one not-published lane.
- Title: Sui proof is present, and the boundary is explicit.
- Core message: The repo contains real Move registry work, but the public demo does not fake a published transaction.
- Content:
  - Move package: `move/sources/memory_will_registry.move`.
  - Anchor object fields: will id, Walrus blob id, object id, checkpoint hash, policy hash, redaction hash, successor role.
  - Verified: `pnpm sui:build`, `pnpm sui:test`.
  - Boundary: built/tested, not published unless package id and server signer are configured.

### Part 3: Try it

#### Slide 06 - Try it, then inspect it

- Closing impact: the reviewer leaves with one URL and one receipt path. Composition: large URL lockup plus a receipt strip and proof checklist.
- Layout: full-width call to action, two compact evidence chips below.
- Title: Try Kill Agent, then inspect the receipt.
- Core message: The judge can rerun the same product story without builder help.
- Content:
  - Live URL: `https://frozen-hamilton-admit-franklin.trycloudflare.com`
  - Reopen path: `/?will=latest`
  - Proof paths: runtime report, desktop/mobile screenshots, Move build/test, Sui/Walrus proof doc.

## X. Speaker Notes Requirements

One speaker note file per page, saved under `notes/`. Notes should be spoken as plain English narration, with no bracketed stage directions.

## XI. Technical Constraints Reminder

1. viewBox: `0 0 1280 720`
2. Background uses `<rect>`.
3. Text wrapping uses `<tspan>`.
4. Transparency uses `fill-opacity` and `stroke-opacity`.
5. Forbidden: `mask`, `<style>`, `class`, `<foreignObject>`, `textPath`, `animate*`, `script`.
6. Icons use the approved `tabler-outline` inventory only.
7. Images reference files listed in Section VIII only.

