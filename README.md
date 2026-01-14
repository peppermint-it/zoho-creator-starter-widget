# zoho-creator-starter-widget

Starter template for building Zoho Creator widgets with Tailwind CSS and pre-wired Zoho API access.

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
> ℹ️ Note: You must place `key.pem` and `cert.pem` in the project root to enable local HTTPS development via `zet run`.

To generate the keys, run the following command in your project root:
```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 \
  -keyout key.pem -out cert.pem \
  -subj "/CN=localhost"
```

Install the packages: `npm install`.

## Usage

- `npm run zet:run` – Start local dev server with live reload.
- `npm run zet:pack` – Build and zip the widget for upload.
- `npm run zet:validate` – Run validation checks before deploying.

Upload the resulting `.zip` from `dist/` to your Zoho Creator widget configuration.

## Tailwind

Write styles in `app/input.css` using Tailwind utility classes.

In a separate terminal, run:

- `zet dev:css` – Watch for changes in HTML and CSS and rebuild output.
- `zet build:css` – Compile final `app/output.css` before packaging.

The compiled `output.css` is automatically linked in `widget.html`.

## Zoho API Integration

Default patterns for common Zoho Creator widget interactions are included:
- `CONFIG.APP_NAME` and `CONFIG.REPORT_NAME` centralize app/report setup.
- URL parameter `recordId` is auto-parsed on load.

