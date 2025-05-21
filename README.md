# zoho-creator-starter-widget

Starter template for building Zoho Creator widgets with Tailwind CSS and pre-wired Zoho API access.

> ℹ️ Note: You must place `key.pem` and `cert.pem` in the project root to enable local HTTPS development via `zet run`.

## Usage

- `zet run` – Start local dev server with live reload.
- `zet pack` – Build and zip the widget for upload.
- `zet validate` – Run validation checks before deploying.

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

