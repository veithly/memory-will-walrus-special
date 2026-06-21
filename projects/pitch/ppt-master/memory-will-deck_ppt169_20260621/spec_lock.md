## canvas
- viewBox: 0 0 1280 720
- format: PPT 16:9

## mode
- mode: narrative

## visual_style
- visual_style: dark-tech

## colors
- bg: #0B0F14
- secondary_bg: #121A24
- primary: #4EC5F1
- accent: #73F0B8
- secondary_accent: #F7B955
- text: #EAF1F7
- text_secondary: #A8B6C6
- text_tertiary: #667789
- border: #2B3A4B
- success: #73F0B8
- warning: #F7B955
- surface: #121A24
- grid: #223143
- overlay: #071018

## typography
- font_family: Aptos, "Microsoft YaHei", Arial, sans-serif
- title_family: "Aptos Display", "Microsoft YaHei", Arial, sans-serif
- emphasis_family: "Aptos Display", "Microsoft YaHei", Arial, sans-serif
- code_family: Consolas, "Courier New", monospace
- body: 18
- title: 36
- subtitle: 24
- annotation: 14
- cover_title: 72
- hero_label: 16

## icons
- library: tabler-outline
- stroke_width: 2
- inventory: skull, file-certificate, shield-check, database, cloud, route, lock, link, server, receipt, arrow-right, check, alert-triangle, terminal, braces

## images
- desktop-proof: images/desktop-proof.png | no-crop
- mobile-proof: images/mobile-proof.png | no-crop

## page_rhythm
- P01: anchor
- P02: dense
- P03: dense
- P04: dense
- P05: breathing
- P06: anchor

## page_charts
- P03: process_flow
- P04: pipeline_with_stages

## forbidden
- Mixing icon libraries
- rgba()
- `<style>`, `class`, `<foreignObject>`, `textPath`, `@font-face`, `<animate*>`, `<script>`, `<iframe>`, `<symbol>`+`<use>`
- `<g opacity>` (set opacity on each child element individually)
- HTML named entities in text
