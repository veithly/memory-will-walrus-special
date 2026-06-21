# Visual Build Contract: Memory Will

This visual build contract records the G3 decision surface before G4 real-loop implementation. It inherits `pitch/project_prd.md`, `pitch/uiux_interaction_plan.md`, and the three low-fidelity mockups in `docs/ui-mockups/`.

## Design Read

Reading this as: product UI for hackathon judges and AI-workflow builders, with a tense forensic operations language, leaning toward Radix Themes / Radix UI primitives plus bespoke Memory Will state components.

Dial values from design-taste-frontend: DESIGN_VARIANCE 5, MOTION_INTENSITY 5, VISUAL_DENSITY 7. This is an app workbench, not a marketing landing page.

Physical scene from impeccable: a judge is at a laptop under deadline pressure, killing a live agent and checking whether the successor can inherit only allowed memory. The scene calls for restrained dark-on-light contrast with one moss signal color and one danger accent.

## Visual System And Component Libraries

- Visual style lane: cinematic operations console with editorial restraint and a clear physical kill/restore beat.
- Primary UI library: Radix Themes / Radix UI primitives.
- Supporting UI library: lucide-react icons with custom Memory Will stage components.
- Component-system lock: use Radix for accessible overlays, tabs, tooltips, dialogs, and theme reset; build the death stage, scoped-memory ledger, receipt, and inspect rail as custom components.
- Official docs checked: https://www.radix-ui.com/themes/docs/components/theme and https://www.radix-ui.com/primitives.
- Install commands: `pnpm add @radix-ui/themes @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-tooltip lucide-react`.
- Tailwind/shadcn rejection note: Tailwind utilities can carry spacing and responsive layout, but a shadcn-only card surface would look like a generic AI dashboard.
- Non-tailwind visual signature: split living/dead successor stage, flatline meter, stamped Memory Will pointer, scoped-memory ledger, and receipt proof rail.

## Reference Screen And Anti-Template

- Reference screen worth borrowing: incident command consoles where status, action, and recovery are visible in one glance.
- Forbidden template face: centered AI landing page with purple/blue gradient, three feature cards, generic chat preview, or blockchain proof dashboard.
- Forbidden lookalikes: ChatGPT clone, Vercel AI template, explorer page, admin analytics dashboard, pitch-deck hero.
- Visual differentiation note: the hero surface is a working succession scene. The proof rail is visible but not the product.
- Signature frame to earn: flatline -> Memory Will stamp -> context zero -> cold successor restore -> receipt pointer.

## Mockup Trace

- Mockup trace source: `docs/ui-mockups/01-hero.png`, `docs/ui-mockups/02-app-workbench.png`, and `docs/ui-mockups/04-mobile-qr.png`.
- Mockup-to-build: first screen becomes the actual workbench route, not a separate landing page.
- Hero composition: full workbench frame with live predecessor left, scope/proof rail right, and one destructive `Kill Agent` action centered.
- QR mobile access plan: receipt page exposes a QR affordance for phone reopen after the desktop hero action.
- Mobile primary flow: bottom-sheet kill/scope/restore with proof behind disclosure and receipt as final screen.
- Desktop parity plan: desktop and mobile both expose kill, role mutation, redaction, receipt, and inspect proof.

## First-Glance Clarity

- What is this: Kill an agent, restore only the memory you allowed.
- How to use it: Step 1 kill the predecessor, step 2 choose successor scope, step 3 open the cold successor, step 4 inspect the receipt.
- First action: `Kill Agent`.
- Result after action: a Memory Will receipt with allowed memory, unavailable memory, successor output, and durable pointer.
- Naive user retell line: I killed one AI, wrote a memory will, and another AI continued only from the memories I allowed.

## Layout And Contrast Math

- Hero math: first viewport is one grid with a 58/42 desktop split, H1 width under 18 words, primary stage min-height `min(760px, 100dvh - 48px)`, and no nested card shells.
- H1 width and line-limit: H1 must stay at two lines on desktop and four lines on mobile. It uses fixed rem sizing, not viewport-width scaling.
- AIDA coverage: Attention is the live/dead stage, Interest is the scoped memory list, Desire is controlled inheritance, Action is `Kill Agent`.
- CTA contrast check: destructive CTA uses dark danger fill with white text and visible focus ring; secondary receipt CTA uses bordered neutral with high contrast.
- Button contrast: no transparent primary, no white-on-white, no icon-only critical action.
- Cheap-label sweep: remove tiny meta labels, decorative uppercase strips, section numbers, generic badges, and label sweep clutter unless the label names real state.

## Motion Plan

- Motion plan: state-change choreography, not decorative page entrance.
- Engine: CSS keyframes for the flatline/stamp beat, with room to upgrade to Motion only if G4 needs timeline coordination.
- Entrance choreography: static content is readable before animation; state panels settle within 250ms.
- Primary CTA emphasis: tactile press and danger confirmation only.
- State/result transition: predecessor pulse stops, stamp lands, successor restore rail sweeps once, receipt CTA appears.
- Signature moment: flatline to stamped Memory Will pointer.
- Reduced-motion fallback: `@media (prefers-reduced-motion: reduce)` disables motion and shows the final state instantly.

## Skill Evidence

- design-taste-frontend workflow source path visual direction anti-template: `C:/Users/Ricky/.skills-manager/skills/design-taste-frontend/SKILL.md`; used to reject AI-purple hero, generic cards, decorative labels, and landing-page-first composition.
- impeccable setup register color strategy audit notes: `C:/Users/Ricky/.skills-manager/skills/impeccable/SKILL.md`; product register is `PRODUCT.md`; color strategy is restrained OKLCH with moss primary, danger accent, sharp radii, AA contrast, and motion fallback.
- logo-generator source: `C:/Users/Ricky/.skills-manager/skills/logo-generator/SKILL.md`; output is `pitch/logo-showcase/memory-will-logo-showcase.html` plus `public/brand/` SVG files.

## Asset Contract

- Generated image assets: not applicable because product-native screenshots and receipt states carry the surface.
- image_minimalism_reason: no decorative imagery; the product is a stateful workbench where data panels, pointer receipts, and proof surfaces are the content.
- Cutout plan: no cutout assets for P0; if a later deck needs them, use `scripts/cutout_assets.mjs` to write `public/art/cutouts` and `cutout-manifest.json`.
- Brand asset pack: `public/brand/logomark.svg`, `public/brand/wordmark.svg`, `public/brand/logo-mono.svg`, and `public/brand/og.png`.

## Build Markers Required In Source

- Top product shell must include `data-visual-lane="cinematic operations console with editorial restraint and a clear physical kill/restore beat."`.
- Top product shell must include `data-hero-composition="split living/dead successor stage"`.
- Entry H1 must include `data-hero-text`.
- Primary CTA must include `data-cta-primary`.
- Post-action or receipt CTA must include `data-next-step-cta`.
