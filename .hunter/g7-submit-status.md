# G7 Submit Status

- Live Worker URL: https://memory-will-walrus-special.veithly.workers.dev
- Worker deployment: Cloudflare Workers, `memory-will-walrus-special`, version `d0db020f-93e0-4a58-b8ee-1935514b651b` then `37c755bf-5a8b-4fed-983a-9ba83a07c8fd`.
- Runtime storage: Cloudflare KV binding `MEMORY_WILL_STATE`.
- Sui testnet Move package: `0xdba62cf14673aba3fa797f0aef06be9e0e4b133ae4822d3743b9594f6cff1d2e`.
- Sui publish digest: `HaU5T3x5jvN9HzAzRC68iJEzWHtJqX7kxC7rGCQnz3xf`.
- Real chain/storage proof: public API smoke produced Walrus `ready`, Sui proof `ready`, and live successor replay.
- Runtime audit on Worker: Chromium, Firefox, and Pixel 7 targets pass; WebKit targets time out at `page.goto` against `workers.dev` in this local audit environment.
- YouTube upload: complete, https://youtu.be/JY0_hyjtelM.
- GitHub repo: https://github.com/veithly/memory-will-walrus-special.
- DeepSurge submission: blocked until browser extension/login is available; final submit click also requires explicit user confirmation per AGENTS.md.
