# SGYN Website V2 — the real site lives in this folder

Preview: start the `sgyn-v2` preview (or `npx http-server C:\Users\glori\sgyn-website-v2 -p 4525`) and open **http://localhost:4525/site/**

## What's in here

| File | Page |
|---|---|
| `index.html` | Homepage — drifting photo-columns hero, programs, Media Lab, events, partners, team, join funnels |
| `media-lab.html` | Media Lab with category filters (all pieces are labeled placeholders for now) |
| `programs.html` | Programs overview |
| `silk-road-roundtable.html` / `language-across-borders.html` / `literary-salon.html` / `talent-pipeline.html` | One page per program |
| `events.html` | Event dashboard — filter by category, click any card for the full story |
| `team.html` | Core leadership + city leads |
| `partner.html` | Partner / sponsor pitch with all six ways to work with SGYN |
| `css/main.css` | All the styling (colors, fonts, components) in one place |
| `js/main.js` | Shared behaviors (mobile menu, scroll animations, counters) |
| `assets/` | All photos + logos, already compressed for the web |

## How to update things (no coding needed beyond copy-paste)

- **Add an event:** open `events.html`, find `var EVENTS=[` near the bottom, copy one event block `{...},` and edit its text. Newest goes first.
- **Change a metric:** search for `data-count` in any page — the number in `data-count="8"` is what gets displayed.
- **Replace a Media Lab placeholder:** in `media-lab.html`, each piece is an `<article>` — swap the image, title, and contributor line, and delete the `Placeholder` label.
- **Swap the logo:** replace `assets/SGYNBannerNavy.svg` (navy version, used in the top bar on white) or `assets/SGYNBannerSmallFooter.svg` (white version, used in the navy footer). `SGYNBannerNavy.svg` was generated from the official banner by recoloring the white lettering to brand navy — replace it if a designer makes an official one. Both files are compressed; if you drop in a new one from a designer, it may be much larger, so ask Claude to re-compress it.
- **Swap the browser-tab icon:** replace `assets/favicon.png` — a 48×48 picture of the mountain mark on a navy square (the full wordmark is unreadable at tab size, so only the mountain is used).
- Anything marked with a small orange **PLACEHOLDER** chip on the pages needs real content before launch.

## Before going live

1. Real member count (currently "500+ [placeholder]"), real Media Lab pieces, final team bios, partner logo files.
2. Pick a host (Netlify drag-and-drop of this `site` folder works) and point sinogulfyouthnetwork.com at it.
3. Photos are already compressed (the six 8–10 MB originals are down to ~0.2–0.3 MB each). Originals remain in `..\assets\`.

Built 2026-07-06 · design: "Network Wall" direction with the drifting-columns hero Gloria picked.
