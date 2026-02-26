# MEMORY.md — Claude Project Context for anc-2b01-site

This file provides persistent context for Claude Code sessions working on this repository.

---

## Project Overview

**Site:** anc2b01.org — civic website for ANC 2B01 Commissioner Andrew DeFrank (North Dupont Circle, Washington DC)
**Repo:** github.com/defrank1/anc-2b01-site
**Stack:** Pure static HTML/CSS/JS, GitHub Pages, no build system
**Deployment:** Push to `main` branch → GitHub Pages auto-deploys

---

## File Architecture

```
/
├── index.html          # Home page
├── about-me.html       # Commissioner bio
├── about-ancs.html     # What is an ANC?
├── anc-2b01.html       # District info + OpenANC map embed
├── actions.html        # Google Sheets initiatives tracker
├── news.html           # Newsletter (Google Docs) + Bluesky feed
├── contact.html        # GovDelivery subscribe + Formspree contact form
├── 404.html            # Custom 404 page (GitHub Pages serves automatically)
├── sitemap.xml         # Sitemap for search engines
├── robots.txt          # Crawler instructions
├── CNAME               # Domain: anc2b01.org
├── css/
│   └── style.css       # Single CSS file (~920 lines), organized by section
├── js/
│   └── main.js         # Single JS file, all logic in DOMContentLoaded
├── images/             # All static assets (favicons, headshot, map)
└── .github/
    └── workflows/
        └── ci.yml      # HTML validation + link checking on push/PR
```

---

## CSS Architecture (style.css)

Organized with section comments numbered 1–12:
1. CSS Variables (colors, spacing, typography)
2. Reset / Global
3. Typography
4. Layout / Container
5. Header
6. Main Content (headshot, map, buttons)
7. Forms (GovDelivery subscribe + Formspree contact)
8. Iframes (Google Sheets, Docs, newsletter)
9. Footer
10. Accessibility (skip-nav, sr-only, focus styles)
11. Reduced Motion (`@media prefers-reduced-motion`)
12. Print Styles (`@media print`)
13. Mobile Responsive (`@media max-width: 1150px`)

Key CSS variables:
- `--primary-blue: #1A4063`
- `--action-red: #A12334`
- `--accent-green: #7db597`
- `--white: #edebed`
- Mobile breakpoint: `1150px`

---

## JS Architecture (main.js)

All code inside a single `DOMContentLoaded` listener. Sections in order:
1. Header spacer height sync (throttled resize)
2. Copyright year auto-update (`#copyright-year` span)
3. External links → `target="_blank" rel="noopener noreferrer"`
4. Hamburger menu toggle + close on link click + Escape key + resize auto-close
5. GovDelivery form type toggle (email ↔ SMS) — guarded by `#GD-snippet-form`
6. Smooth scroll for anchor links + prefers-reduced-motion support

**Key selector:** Nav menu uses `id="primary-menu"` on the `<ul>` — accessed via `document.getElementById('primary-menu')`.

---

## HTML Page Template Pattern

Every page follows this structure:
1. `<head>`: charset, viewport, description (page-specific), title, canonical, favicons, manifest, Google Fonts, style.css, preload (only images actually used on that page), SEO meta (keywords on index only), OG tags, Twitter Card tags, JSON-LD (index only)
2. `<body>`:
   - Skip nav link → `#main-content`
   - `<header class="site-header">` with `.left` (h1/h2) and `<nav class="right">` (hamburger + `<ul id="primary-menu">`)
   - `<div class="header-spacer">` (height set by JS)
   - `<main id="main-content">` with sections using `.section-band.bg-lighter`
   - `<footer>` with `<span id="copyright-year">2025</span>` (updated by JS)
   - `<script src="js/main.js">`

---

## Preload Image Rules

Only preload images that are actually displayed above the fold on that specific page:
- `index.html`: preloads `anc-headshot.jpg` only
- `about-me.html`: preloads `anc-headshot.jpg` only
- `about-ancs.html`: preloads `anc-map.png` only
- All other pages: no preload tags

---

## External Services

| Service | Notes |
|---------|-------|
| Formspree | `https://formspree.io/f/mblyzged` — contact form |
| GovDelivery | `public.govdelivery.com/accounts/DCWASHOANC` — newsletter + SMS |
| OpenANC | Embedded as `https://openanc.org/?embed=true` iframe in anc-2b01.html |
| Google Sheets | Actions tracker — embedded as pubhtml iframe |
| Google Docs | Newsletter — embedded as pub iframe |
| Bluesky embed | `bsky-embed` npm package via jsDelivr CDN, pinned to specific version |

---

## Deployment Notes

- GitHub Pages serves `404.html` automatically for missing pages
- `sitemap.xml` lists all 7 main pages (not 404.html)
- `robots.txt` allows all crawlers and references the sitemap
- HTTPS is enforced by GitHub Pages (ensure "Enforce HTTPS" is checked in repo settings)
- No server-side processing — forms go directly to Formspree and GovDelivery

---

## Known Quirks / Gotchas

- The GovDelivery form toggle (email ↔ SMS) logic lives in `main.js`, guarded by `if (document.getElementById('GD-snippet-form'))` so it only runs on contact.html
- The newsletter iframe in news.html uses negative margins to clip the Google Docs header — fragile if Google changes their embed layout
- The OpenANC map iframe has a fallback text inside it for no-iframe browsers
- `header-text-desktop.png` and `header-text-mobile.png` exist in `/images/` but are not used in any HTML file

---

## Completed Improvements (from 2026 audit)

- Added `.gitignore`, untracked `.DS_Store` and `.code-workspace`
- Standardized all page titles to `[Page] – Commissioner Andrew DeFrank`
- Removed unused `<a id="top">` anchors and `.bg-light` CSS class
- Auto-updating copyright year via JS
- Deleted unused `map/` directory (OpenANC open-source copy) and `anc-2b01-map.html` (broken Leaflet stub)
- Fixed mobile hamburger menu (selector bug, Escape key, close-on-link-click, resize auto-close)
- Migrated GovDelivery inline script from contact.html to main.js
- Removed unnecessary preload tags from pages that don't use those images
- Pinned Bluesky embed to specific version
- Added Open Graph + Twitter Card tags to all pages with page-specific descriptions
- Added JSON-LD Schema.org GovernmentOffice markup to index.html
- Created sitemap.xml and robots.txt
- Added prefers-reduced-motion and print stylesheets to style.css
- Added aria-label to all embedded iframes
- Fixed unclosed `<p>` tag in news.html
- Created custom 404.html
- Added privacy notices near forms in contact.html
- Added GitHub Actions CI (HTML validation + link checking)
