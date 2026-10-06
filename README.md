# ZARELLE

Complete source and images for the published ZARELLE fashion site.

Live site: https://velmora-design.sylviemailletb107185.chatgpt.site/

## Run locally

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000/. Serve `dist` as the site root so `/assets`, scripts and styles resolve correctly. No build step or package installation is required.

## Files

- `dist/index.html`: site entry point and metadata
- `dist/app.js`: all pages, navigation, shopping bag and styling tools
- `dist/style.css`: desktop and mobile layouts, gradient and motion styling
- `dist/motion.js`: trust icons, reveal animations and auto-scrolling products
- `dist/assets/`: complete local fashion imagery
- `dist/favicon.svg`: brand icon
- `.openai/hosting.json`: existing Sites deployment configuration

Shopping and styling data uses browser storage. Checkout is a local demonstration and does not process payments or send orders. AI guidance is predefined. Those limitations match the current live site.

Icons: Lucide, ISC license, https://lucide.dev.
