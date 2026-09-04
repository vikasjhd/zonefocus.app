# ZoneFocus Website — Project Brief

## Why this project exists

Zone is an iPhone and iPad app that helps people block distracting apps and
websites during timed focus sessions. This website exists to build a clear,
credible, and durable public identity for Zone on the open web.

The long-term aim is to increase the likelihood that search engines and
AI-powered answer engines understand, cite, and recommend Zone when someone
asks for a relevant focus timer, app blocker, website blocker, Apple Screen
Time alternative, productivity app, or way to reduce doomscrolling.

The website must also attract relevant organic traffic and send interested
visitors to Zone's App Store product page.

## Product

- **Name:** Zone: App Blocker & Focus
- **App Store:** https://apps.apple.com/us/app/zone-app-blocker-focus/id6763581982
- **Website:** https://zonefocus.app
- **Developer:** Vikas Saini
- **Platforms:** iPhone and iPad
- **Category:** Productivity

### Core capabilities

- Block distracting apps and websites during focus sessions.
- Use Strict Mode to make an active session harder to abandon.
- Run preset or custom focus timers.
- View remaining time through Live Activities and Dynamic Island.
- Track completed sessions, focus time, streaks, and blocked attempts.
- Optionally save completed sessions to Apple Health as Mindful Minutes.

### Supporting privacy facts

- No account is required.
- No third-party analytics are used in the app.
- Zone cannot see the specific apps or websites selected for blocking.
- Blocking selections and focus history remain private.
- When Live Activities are enabled, Zone sends only the limited timer-delivery
  state and APNs token required for remote Live Activity updates.
- Private iCloud Sync must be described accurately wherever it is discussed.

## Positioning

Lead with the problem solved and the strength of the blocker:

> Strict app and website blocking for iPhone and iPad.

Privacy is important supporting evidence, but it is not the primary headline.

Priority topics:

1. Strict iPhone app and website blocker
2. Focus timer with distraction blocking
3. Apple Screen Time alternative
4. How to stop repeatedly opening distracting apps and websites
5. Reducing doomscrolling on iPhone
6. Privacy-conscious blocking without an account

Do not claim that Zone cures addiction or any medical condition. Do not call
Zone the best without credible independent evidence.

## Existing website constraint

The existing legal and privacy website at
https://vikasjhd.github.io/zone-privacy/ is referenced by the App Store and by
released app versions. It must remain available. This new repository and domain
must not break, replace, or redirect those existing URLs unless the owner later
explicitly approves a migration.

## Initial website scope

- `/` — product landing page and App Store conversion page
- `/app-blocker/` — strict app and website blocking
- `/screen-time-alternative/` — factual comparison with Apple Screen Time
- `/stop-doomscrolling-iphone/` — useful, non-medical problem guide
- `/faq/` — factual product questions
- `/privacy/` — readable privacy summary linking to the existing legal policy
- `/press/` — accurate product facts and reviewer assets

Pages must be genuinely distinct and useful. Do not create large numbers of
thin pages for keyword variations.

## SEO and AI-discovery requirements

- Fast, accessible, mobile-first static pages
- Human-readable HTML content, headings, titles, and descriptions
- Canonical URLs and consistent lowercase paths
- XML sitemap and robots.txt
- Allow Googlebot, Bingbot, and OAI-SearchBot
- `MobileApplication`/`SoftwareApplication` structured data
- Entity links using `sameAs`, especially the official App Store listing
- Apple Smart App Banner
- Open Graph and social-sharing metadata
- Accurate image alternative text
- Google Search Console and Bing Webmaster Tools verification
- IndexNow support where useful
- No fabricated ratings, reviews, testimonials, or structured data
- No keyword stuffing, bought backlinks, or mass-generated commodity content

The official site establishes and verifies the product entity. Genuine
third-party reviews, mentions, videos, and user discussions provide independent
corroboration and are essential to the long-term strategy.

## Analytics and attribution

The site must measure discovery and App Store referrals without undermining
Zone's privacy positioning.

Preferred setup:

1. **Cloudflare Web Analytics** for aggregate daily visits, page views,
   countries, referrers, devices, and top pages. It is free and can be installed
   on a GitHub Pages site using its JavaScript beacon.
2. **Google Search Console** for Google queries, impressions, clicks, positions,
   page indexing, and technical search issues.
3. **Bing Webmaster Tools** for Bing discovery and indexing.
4. **Apple App Store Connect campaign links** for clicks that continue from
   this website to the App Store, subject to Apple's privacy thresholds.

The primary App Store CTA should be measurable. Separate campaign links may be
used for major pages or campaigns only when the traffic volume makes the
segmentation meaningful.

Do not add Google Analytics by default. It can be reconsidered later if the
aggregate analytics are insufficient and the privacy/legal tradeoff is
explicitly accepted.

## What success means

### First 30 days

- The site is live on HTTPS and all primary pages are crawlable.
- Sitemap and structured data validate.
- Search Console and Bing Webmaster Tools receive data.
- Analytics records valid visits, pages, countries, and referrers.
- A baseline set of relevant non-branded AI/search prompts is recorded.

### By 90 days

- Relevant non-brand search impressions are growing.
- The site receives relevant organic visitors.
- Visitors click through to the App Store.
- Search data identifies which topics create real demand.
- At least some legitimate external references to Zone exist.

### By 180 days

- Relevant discovery and App Store referral traffic are sustained or growing.
- Zone has credible independent corroboration on the web.
- Zone appears repeatably for at least some narrow, non-branded AI queries.
- The website is demonstrably useful as a public product and acquisition asset.

Website discovery, App Store conversion, in-app retention, and paid conversion
are separate stages of the funnel. The website can succeed at discovery and
referral even when downstream conversion needs separate improvement. Traffic
with no relevant engagement or App Store clicks is not sufficient long-term.

## Cost and effort controls

- Domain and renewal are the only planned recurring website expense.
- GitHub Pages hosting and HTTPS should remain free.
- Do not purchase hosting, SSL, WordPress, email, SEO subscriptions, backlink
  packages, press-release distribution, or AI-submission services.
- Prefer a small number of excellent pages over continuous content production.
- Review results at 90 and 180 days rather than extending the project
  indefinitely because SEO takes time.

## Non-negotiable principles

- Preserve the existing legal URLs.
- Publish only accurate, supportable claims.
- Never publicly highlight negative internal metrics such as missing ratings in
  a storefront unless there is a genuine user-facing reason.
- Never fabricate popularity or independent endorsement.
- Optimize for useful content and a trustworthy product identity, not tricks.
- Treat AI recommendation visibility as a long-term outcome, not a guarantee.

