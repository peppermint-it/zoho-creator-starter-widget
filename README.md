# zoho-creator-starter-widget

Starter template for building Zoho Creator widgets with a Vite-built frontend (vanilla) and pre-wired Zoho Creator JS API access.

## Start new project from template
```bash
# Clone the starter kit to a new folder
git clone <TEMPLATE_REPO_URL> my-new-widget
cd my-new-widget
# Remove the old git history and init a fresh repo
rm -rf .git
git init
git add .
git commit -m "Init from Zoho Creator widget starter"

# Point to your own remote
git branch -M main
git remote add origin <YOUR_NEW_REMOTE_URL>
git push -u origin main
```

## Setup
Install dependencies:

```bash
npm install
```

This repo uses npm workspaces, so a single install covers both the root tooling and `frontend/`.

> Note: `key.pem` and `cert.pem` in the repo root are required for local HTTPS via `zet run`.

To generate the keys, run the following command in your project root:
```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 \
  -keyout key.pem -out cert.pem \
  -subj "/CN=localhost"
```

Build the widget frontend into `app/` (required before packing):

```bash
npm run widget:build
```

## Usage

- `npm run widget:watch` – Rebuild the widget on changes (emits into `app/`).
- `npm run dev:host` – Serve the built widget from `app/` at `http://localhost:4173/widget.html`.
- `npm run zet:run` – Start ZET local HTTPS dev server (served from `app/`).
- `npm run zet:validate` – Validate the widget package/manifest.
- `npm run widget:pack` – Build and zip the widget for upload (`dist/`).
- `npm run zet:pack` – Pack without rebuilding (useful once `app/` is already built).
- `npm run widget:clean` – Remove generated build outputs in `app/` without deleting non-generated files.

Upload the resulting `.zip` from `dist/` to your Zoho Creator widget configuration.

## Development Modes

To interact with Zoho Creator data, the widget must run inside Zoho Creator (portal/app context). Choose the workflow that matches what you’re building:

### Method 1: Pack + upload to Zoho Creator (best for Page Variables)
1. Build + pack: `npm run widget:pack`
2. Upload the `.zip` from `dist/` to the widget source in your Creator app.

This is the only dev flow that reliably provides Page Variables, but it requires re-packaging/re-uploading to refresh the widget.

### Method 2: Externally hosted widget (fast iteration, no Page Variables)
Run both:

```bash
npm run dev:host
npm run widget:watch
```

Host `app/` somewhere reachable and point your Creator widget/frame URL to `https://your-domain/widget.html`. You can call Zoho Creator APIs, but Page Variables may not be available; simulate them via widget params/fallbacks in the frontend code.

### Method 3: Local UI-only (fastest, no Creator API)
Run the Vite dev server for UI work:

```bash
npm --prefix frontend run dev
```

## Frontend (Vite + Tailwind)

- Source lives in `frontend/` and builds into `app/` for ZET packaging.
- Tailwind is wired via the Vite plugin; add UI packages as needed.
- `app/` is not wiped by Vite; `npm run widget:clean` prevents old hashed assets from accumulating.

## Zoho API Integration

Default patterns for common Zoho Creator widget interactions are included:
- Centralized app/report config in the frontend.
- Record ID can be read from URL query params (e.g. `?recordId=...`) and/or widget params.

## Docs & References

- Zoho Widget JS API: https://www.zoho.com/creator/help/js-api/v2/
- Zoho Creator URL patterns: https://help.zoho.com/portal/en/kb/creator/developer-guide/others/url-patterns/articles/functionality-based-urls
