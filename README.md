# zonefocus.app

Official multilingual website for **Zone: App Blocker & Focus**.

Read [`PROJECT.md`](PROJECT.md) before changing strategy, copy, claims, URLs,
analytics, or site structure.

## Local development

```bash
npm run build
npm run check
npm run preview
```

Open <http://localhost:8017>. The generated GitHub Pages site is in `docs/`.

## Locales and pages

The build generates seven crawlable pages for each of ten storefront locales:

- English: US, UK, Canada, Australia
- Spanish: Spain, Mexico
- Portuguese: Brazil
- French, German, Italian

Routes are translated below `/en-gb/`, `/en-ca/`, `/en-au/`, `/es/`,
`/es-mx/`, `/pt-br/`, `/fr/`, `/de/`, and `/it/`. US English uses `/`.

## Analytics setup

The site supports Cloudflare Web Analytics and search-engine verification
without storing their values in Git. For local builds, set:

```bash
CLOUDFLARE_WEB_ANALYTICS_TOKEN=your-token npm run build
```

For deployment, add these optional repository variables under **Settings →
Secrets and variables → Actions → Variables**:

- `CLOUDFLARE_WEB_ANALYTICS_TOKEN`
- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`

The published site should also be verified in Google Search Console and Bing
Webmaster Tools. Add their verification values only after the accounts supply
them. Do not add GA4 by default.

Use an App Store Connect campaign link for the primary CTA once its campaign
token has been created. The current URL is the official region-independent App
Store product URL.

## Publishing

The repository includes a GitHub Pages workflow. After the first push:

1. Open repository **Settings → Pages**.
2. Select **GitHub Actions** as the source if GitHub has not selected it.
3. Add `zonefocus.app` as the custom domain.
4. Configure the DNS records shown by GitHub in Spaceship.
5. Wait for GitHub’s certificate, then enable **Enforce HTTPS**.

The `CNAME` file is generated automatically. The old
`vikasjhd.github.io/zone-privacy` website must remain online because released
app versions and the App Store still link to it.
