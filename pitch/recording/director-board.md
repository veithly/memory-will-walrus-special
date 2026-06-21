# Demo Director Board: Memory Will

## Source Of Truth

- Product sentence: `A research lead uses Memory Will to turn a killed predecessor agent into scoped Walrus memory that a cold successor can reopen.`
- Hero moment: `Click Kill Agent, write the Memory Will, and open the cold successor.`
- Result artifact: `Memory Will Receipt plus role-specific successor output.`
- Inspection path: `/?will=latest` then the receipt inspection panel.
- Live URL: `https://memory-will-walrus-special.veithly.workers.dev`
- Demo URL: `https://memory-will-walrus-special.veithly.workers.dev`
- Delivery mode: `combined-pitch-demo`
- Composition: product-led combined pitch/demo composition.

## Roadshow Video Gate

| Requirement | Evidence | Result |
| --- | --- | --- |
| Pitch/deck first, real browser demo second | `pitch/draft.md` sets the slide order; browser demo starts with the live workbench and receipt path | locked |
| Required TTS provider is used with no fallback | `TTS_PROVIDER=mimo`, `mimo-v2.5-tts`, voice `Chloe`; no fallback | locked |
| Stale TTS chunks were regenerated | regenerate voice chunks after any narration change before final render | locked |
| Demo is a real browser/app recording | capture the live URL in a browser into app-demo footage and recorder log; no screenshot slideshow | locked |
| Recorder fails on broken actions | failed clicks or empty scenes stop the recording | locked |
| Timing uses measured narration durations | scene waits use measured `duration_ms` from TTS output | locked |
| Audio/video sync is within 0.5s | require `max_av_delta <= 0.5s` from ffprobe checks | locked |
| UI is readable in final encode | H.264/AAC, 1080p, 30fps, video bitrate >= 2.5 Mbps | locked |
| No blank/silence segment over 2s | require blackdetect and silencedetect logs before publishing | locked |

## First 30 Seconds Gate

| Time | Must be visible | Failure if missing | Result |
| ---: | --- | --- | --- |
| 0-5 s | Memory Will name and the receipt result | Viewer cannot say what the product does. | locked |
| 5-12 s | Research lead loses agent context but keeps control of approved memory | Sounds like a generic AI category. | locked |
| 12-22 s | Live `Kill Agent` click and Walrus write starts | Video is only slides. | locked |
| 22-30 s | Cold successor output and receipt inspection preview | Inspection is deferred. | locked |

## Scene Board

| Scene | Seconds | Why this scene exists | Judge belief | Screen action | Result artifact | Inspection path | Public copy line | Evidence source | Primary treatment | What to cut if slow | QA frame |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `00_cold_open` | 5 | Open with a shipped surface. | This is a working product. | Show live URL, README result image, and submission draft. | public package | README + live URL | A cold successor replay shows only approved memory. | README + public smoke | artifact_stack_3d | decorative package montage | qa frame 00 |
| `01_hero` | 16 | Make the outcome clear before details. | The product has a concrete result. | Show Memory Will workbench and receipt rail. | Memory Will Receipt | `/?will=latest` | A killed agent leaves scoped Walrus memory. | public-copy facts | marker sweep | extra floating card | qa frame 01 |
| `02_first_action` | 24 | Prove a fresh reviewer can run it. | I can trigger the state change. | Click `Kill Agent`, choose role, write the will. | Walrus pointer certified | runtime route | Start with Kill Agent. | public run record | cursor choreography | lower third | qa frame 02 |
| `03_result` | 28 | Show the action worked. | The successor continued from scoped memory. | Click `Open Cold Successor`. | role-specific successor output | verified row C2 | The cold successor uses only approved memory. | screenshot + run record | component_lift | second zoom | qa frame 03 |
| `04_inspect` | 14 | Remove the trust gap. | I can check the storage anchor. | Open receipt and inspect it. | receipt_montage | receipt inspection route | Inspect the receipt, not a claim. | verified row C3 | receipt_montage | repeated link animation | qa frame 04 |
| `05_mechanism` | 24 | Explain why Walrus matters. | The sponsor primitive is load-bearing. | Reveal write, restore, and receipt routes. | mechanism diagram | repo paths + run record | Walrus is the restore gate. | stack lock + source routes | architecture reveal | decorative 3D tilt | qa frame 05 |
| `06_ask` | 12 | Give one next action. | I know how to try it. | Show live URL and receipt path. | URL lockup | live URL + `/?will=latest` | Try Kill Agent, then inspect the receipt. | SUBMISSION.md | outro lockup | extra contact list | qa frame 06 |

## Treatment Rules

- Each scene chooses one primary treatment.
- Captions and lower-thirds are supporting UI, not extra treatments.
- If a treatment does not make the result artifact easier to understand or inspect, delete it.
- Do not stack component lift, marker sweep, burst lines, 3D tilt, and captions at the same timestamp.
- QA frames must be readable as product launch frames, not plain screen shares with stickers.

## QA Frames To Extract

- [x] 00:05 cold open complete package.
- [x] first belief checkpoint.
- [x] first action begins.
- [x] result artifact peak frame.
- [x] inspection path open.
- [ ] mechanism full state.
- [ ] outro lockup.

Reject and rerender if any QA frame:

- looks like a plain screen share with stickers;
- contains technical dumps as the main result;
- has unreadable text;
- clips a floating card or lifted component;
- lets captions cover the active UI;
- uses effects that do not clarify the judge belief.
