# ANC 2B01 – Former Commissioner Andrew DeFrank

Website for **Andrew DeFrank**, who served as Advisory Neighborhood Commissioner for ANC 2B01 (North Dupont Circle, Washington, DC) from June 2025 to May 2026. This site is maintained as a personal archive.

**Live site:** [anc2b01.org](https://anc2b01.org)

> **Archive:** This site is no longer actively maintained for current commissioner business. For current ANC 2B01 matters, contact the current commissioner at `2b01@anc.dc.gov`.

---

## Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` | Home / archive welcome |
| `about-me.html` | `/about-me.html` | Bio (past tense) |
| `about-ancs.html` | `/about-ancs.html` | What is an ANC? (informational) |
| `anc-2b01.html` | `/anc-2b01.html` | District info + OpenANC map |
| `actions.html` | `/actions.html` | Static record of initiatives worked on during term |
| `news.html` | `/news.html` | Newsletter archive + Bluesky feed (account dormant) |
| `contact.html` | `/contact.html` | Archive notice pointing to current commissioner |
| `404.html` | *(on 404)* | Custom 404 error page |

---

## Tech Stack

Pure static HTML/CSS/JS. No build system, no framework, no npm dependencies.

- **Hosting:** GitHub Pages (auto-deploys from `main` branch)
- **Domain:** `CNAME` file points to `anc2b01.org`
- **Styles:** `css/style.css` (single file, ~920 lines)
- **Scripts:** `js/main.js` (single file, loaded on every page)
- **Fonts:** Google Fonts — Montserrat (400, 600, 700)

---

## How to Edit

1. Edit HTML, CSS, or JS files directly
2. Push to `main` branch — GitHub Pages deploys automatically (usually within 1–2 minutes)
3. To preview locally: `python3 -m http.server` then open `http://localhost:8000`

---

## External Dependencies

| Service | Used For | File(s) |
|---------|----------|---------|
| Google Fonts | Montserrat typeface | All pages (`<head>`) |
| OpenANC (`openanc.org`) | Interactive district map embed | `anc-2b01.html` |
| Google Docs | Past newsletter editions (linked) | `news.html` |
| Bluesky embed (`cdn.jsdelivr.net/npm/bsky-embed`) | Social feed (dormant account) | `news.html` |

---

## Images

All images are in `/images/`:

| File | Usage |
|------|-------|
| `anc-headshot.jpeg` | Commissioner photo (index, about-me) |
| `anc-map.png` | DC ANC map (about-ancs) |
| `favicon-96x96.png`, `favicon.svg`, `favicon.ico` | Browser favicons |
| `apple-touch-icon.png` | iOS home screen icon |
| `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png` | PWA icons |
| `header-text-desktop.png`, `header-text-mobile.png` | Unused — can be deleted |

> **Performance note:** `anc-headshot.jpeg` (~1.5 MB) and `anc-map.png` (~1.9 MB) are large. Converting to WebP would improve load times significantly.

---

## CI / Automation

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and PR to `main`:
- HTML validation via `html-validate`
- Link checking via `lychee`

---

## Notes for Future Development

- **Custom map:** `anc-2b01-map.html` and `map/index.html` were removed. To add a custom boundary map, either:
  1. Download the ANC 2B01 GeoJSON from [DC Open Data](https://opendata.dc.gov/) and rebuild with Leaflet
  2. Use the existing OpenANC iframe embed already on `anc-2b01.html`
- **CSP headers:** GitHub Pages does not support custom HTTP headers. If Content Security Policy headers are needed, route traffic through Cloudflare or move to Netlify.
- **Image optimization:** Use `cwebp`, Squoosh, or ImageOptim to convert images to WebP format.
