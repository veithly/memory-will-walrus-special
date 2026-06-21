# Packaging Status

## Deck

- Status: resolved.
- Workflow: `ppt-master`.
- Final PPTX: `projects/pitch/ppt-master/memory-will-deck_ppt169_20260621/exports/memory-will-deck_20260621_232345.pptx`.
- QA: `svg_quality_checker.py` passed 6/6 SVG pages with no warnings; PPTX export produced 6 slides and 6 speaker-note pages.

## Video

- Status: resolved.
- Workflow: HyperFrames with real browser recording and measured Mimo TTS.
- Final MP4: `artifacts/video/memory-will-demo-final.mp4`.
- Recording evidence: `artifacts/video/capture/recording-log.json`.
- TTS evidence: `artifacts/narration.json`, `artifacts/vo.wav`, `artifacts/captions.srt`.
- QA: 36.0s, 1920x1080, 30fps, H.264/AAC, ~5.5 Mbps, max AV delta 0.011s, no 2s black or silence segments.

## Remaining Submit Holds

- Do not submit the final hackathon form until the user explicitly approves.
- Replace the temporary tunnel with a stable deployment URL if the final platform requires long-lived availability.
- Upload the local deck and video files to final share URLs before form submission.
