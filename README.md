# ANC 2B01 – Commissioner Andrew DeFrank

Website for **Andrew DeFrank**, elected Advisory Neighborhood Commissioner for ANC 2B01 (North Dupont Circle, Washington, DC).

**Live site:** [anc2b01.org](https://anc2b01.org)

---

## Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` | Home / Welcome |
| `about-me.html` | `/about-me.html` | Commissioner bio |
| `about-ancs.html` | `/about-ancs.html` | What is an ANC? |
| `anc-2b01.html` | `/anc-2b01.html` | District info + OpenANC map |
| `actions.html` | `/actions.html` | Initiatives tracker (Google Sheets embed) |
| `news.html` | `/news.html` | Newsletter + Bluesky feed |
| `contact.html` | `/contact.html` | Subscribe (GovDelivery) + contact form (Formspree) |
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
| Formspree (`formspree.io/f/mblyzged`) | Contact form submission | `contact.html` |
| GovDelivery (`public.govdelivery.com`) | Newsletter/SMS signup | `contact.html` |
| OpenANC (`openanc.org`) | Interactive district map embed | `anc-2b01.html` |
| Google Sheets | Actions/initiatives tracker | `actions.html` |
| Google Docs | Newsletter embed | `news.html` |
| Bluesky embed (`cdn.jsdelivr.net/npm/bsky-embed`) | Social feed | `news.html` |

---

## Images

All images are in `/images/`:

| File | Usage |
|------|-------|
| `anc-headshot.jpg` | Commissioner photo (index, about-me) |
| `anc-map.png` | DC ANC map (about-ancs) |
| `favicon-96x96.png`, `favicon.svg`, `favicon.ico` | Browser favicons |
| `apple-touch-icon.png` | iOS home screen icon |
| `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png` | PWA icons |
| `header-text-desktop.png`, `header-text-mobile.png` | (Unused — can be deleted) |

> **Performance note:** `anc-headshot.jpg` (~1.5 MB) and `anc-map.png` (~1.9 MB) are large. Converting to WebP would improve load times significantly.

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
