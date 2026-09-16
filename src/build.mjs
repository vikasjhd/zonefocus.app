import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, pages, site } from './content.mjs';

const sourceDir = dirname(fileURLToPath(import.meta.url));
const rootDir = dirname(sourceDir);
const outputDir = join(rootDir, 'docs');
const analyticsToken = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.BING_SITE_VERIFICATION?.trim();

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const routeFor = (locale, slug = '') => {
  const prefix = locale.prefix ? `/${locale.prefix}` : '';
  return `${prefix}/${slug ? `${slug}/` : ''}`;
};

const pageFor = (key) => pages.find((page) => page.key === key);
const canonicalFor = (locale, slug) => `${site.origin}${routeFor(locale, slug)}`;
const asset = (path) => `/assets/${path}`;
const contactLabelFor = (locale) => ({ es: 'Contacto', 'es-mx': 'Contacto', 'pt-br': 'Contato', fr: 'Contact', de: 'Kontakt', it: 'Contatti' }[locale.prefix] || 'Contact');

const localeLinks = (currentLocale, slug) => Object.values(locales).map((locale) =>
  `<link rel="alternate" hreflang="${locale.hreflang}" href="${canonicalFor(locale, slug)}">`
).concat(`<link rel="alternate" hreflang="x-default" href="${site.origin}/${slug ? `${slug}/` : ''}">`).join('\n    ');

const schemaScript = (value) => `<script type="application/ld+json">${JSON.stringify(value).replaceAll('</', '<\\/')}</script>`;

function websiteSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Zone',
    url: site.origin,
    inLanguage: locale.hreflang,
    publisher: {
      '@type': 'Person',
      name: site.developer
    }
  };
}

function appSchema(locale, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: site.name,
    operatingSystem: 'iOS 18 or later; iPadOS 18 or later',
    applicationCategory: 'ProductivityApplication',
    description,
    url: canonicalFor(locale, ''),
    downloadUrl: site.appStoreUrl,
    image: `${site.origin}${asset('app-icon.png')}`,
    author: {
      '@type': 'Person',
      name: site.developer
    },
    sameAs: [site.appStoreUrl]
  };
}

function faqSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale.hreflang,
    mainEntity: locale.faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  };
}

function breadcrumbsSchema(locale, page, title) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale.nav.home,
        item: canonicalFor(locale, '')
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: canonicalFor(locale, page.slug)
      }
    ]
  };
}

function languageMenu(locale, slug) {
  return `<div class="locale-picker">
      <button class="locale-button" type="button" aria-expanded="false" aria-haspopup="true">
        ${escapeHtml(locale.shortLanguage)} <span aria-hidden="true">⌄</span><span class="visually-hidden">${escapeHtml(locale.nav.language)}</span>
      </button>
      <div class="locale-menu" hidden>
        ${Object.values(locales).map((option) => `<a href="${routeFor(option, slug)}" lang="${option.htmlLang}"${option === locale ? ' aria-current="true"' : ''}><span>${escapeHtml(option.languageName)}</span>${option === locale ? '<span aria-hidden="true">✓</span>' : ''}</a>`).join('')}
      </div>
    </div>`;
}

function header(locale, slug) {
  return `<header class="site-header">
    <div class="shell nav">
      <a class="brand" href="${routeFor(locale, '')}" aria-label="Zone — ${escapeHtml(locale.nav.home)}">
        <img src="${asset('app-icon.png')}" width="38" height="38" alt="">
        <span>Zone</span>
      </a>
      <nav class="nav-links" aria-label="${escapeHtml(locale.common.primaryNavigation)}">
        <a href="${routeFor(locale, pageFor('blocker').slug)}">${escapeHtml(locale.nav.blocker)}</a>
        <a href="${routeFor(locale, '')}#how-it-works">${escapeHtml(locale.nav.how)}</a>
        <a href="${routeFor(locale, pageFor('privacy').slug)}">${escapeHtml(locale.nav.privacy)}</a>
        <a href="${routeFor(locale, pageFor('faq').slug)}">${escapeHtml(locale.nav.faq)}</a>
        <a class="button primary" href="${site.appStoreUrl}" data-app-store-link data-placement="navigation">${escapeHtml(locale.nav.download)}</a>
      </nav>
      ${languageMenu(locale, slug)}
      <button class="menu-button" type="button" aria-label="${escapeHtml(locale.nav.menu)}" aria-expanded="false"></button>
    </div>
  </header>`;
}

function footer(locale) {
  return `<footer class="site-footer">
    <div class="shell">
      <div class="footer-main">
        <div class="footer-brand">
          <a class="brand" href="${routeFor(locale, '')}"><img src="${asset('app-icon.png')}" width="38" height="38" alt=""><span>Zone</span></a>
          <p>${escapeHtml(locale.common.footerText)}</p>
        </div>
        <div class="footer-group">
          <strong>${escapeHtml(locale.common.product)}</strong>
          <div class="footer-links">
            <a href="${routeFor(locale, pageFor('blocker').slug)}">${escapeHtml(locale.nav.blocker)}</a>
            <a href="${routeFor(locale, pageFor('faq').slug)}">${escapeHtml(locale.nav.faq)}</a>
            <a href="${site.appStoreUrl}" data-app-store-link data-placement="footer">App Store</a>
          </div>
        </div>
        <div class="footer-group">
          <strong>${escapeHtml(locale.common.guides)}</strong>
          <div class="footer-links">
            <a href="${routeFor(locale, pageFor('screenTime').slug)}">${escapeHtml(locale.common.screenTimeGuide)}</a>
            <a href="${routeFor(locale, pageFor('doomscrolling').slug)}">${escapeHtml(locale.common.doomscrollingGuide)}</a>
          </div>
        </div>
        <div class="footer-group">
          <strong>${escapeHtml(locale.common.company)}</strong>
          <div class="footer-links">
            <a href="${routeFor(locale, pageFor('privacy').slug)}">${escapeHtml(locale.nav.privacy)}</a>
            <a href="${routeFor(locale, pageFor('press').slug)}">${escapeHtml(locale.common.press)}</a>
            <a href="${routeFor(locale, pageFor('contact').slug)}">${escapeHtml(contactLabelFor(locale))}</a>
            <a href="${site.legalBaseUrl}/${locale.legalLocale}/privacy.html">${escapeHtml(locale.common.legalPolicy)}</a>
          </div>
        </div>
      </div>
      <div class="footer-base">
        <span>${escapeHtml(locale.common.copyright)}</span>
        <span>${escapeHtml(locale.common.appleNote)}</span>
      </div>
    </div>
  </footer>`;
}

function appStoreButton(locale, placement = 'body') {
  return `<a class="button primary" href="${site.appStoreUrl}" data-app-store-link data-placement="${placement}">${escapeHtml(locale.common.appStore)}</a>`;
}

function cta(locale) {
  return `<section class="section tight">
    <div class="shell">
      <div class="cta-panel">
        <h2>${escapeHtml(locale.common.ctaTitle)}</h2>
        <p>${escapeHtml(locale.common.ctaBody)}</p>
        <div class="page-actions">${appStoreButton(locale, 'final-cta')}</div>
      </div>
    </div>
  </section>`;
}

function documentShell({ locale, page, title, description, body, schemas = [] }) {
  const canonical = canonicalFor(locale, page.slug);
  const analytics = analyticsToken
    ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: analyticsToken })}'></script>`
    : '';
  const verification = [
    googleVerification ? `<meta name="google-site-verification" content="${escapeHtml(googleVerification)}">` : '',
    bingVerification ? `<meta name="msvalidate.01" content="${escapeHtml(bingVerification)}">` : ''
  ].filter(Boolean).join('\n  ');
  return `<!doctype html>
<html lang="${locale.htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#05070b">
  <meta name="apple-itunes-app" content="app-id=${site.appStoreId}">
${verification ? `  ${verification}\n` : ''}  <link rel="canonical" href="${canonical}">
  ${localeLinks(locale, page.slug)}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Zone">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.origin}${asset('social/zonefocus-og.png')}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${site.origin}${asset('social/zonefocus-og.png')}">
  <link rel="icon" href="${asset('app-icon.png')}" sizes="any">
  <link rel="apple-touch-icon" href="${asset('app-icon.png')}">
${page.key === 'home' ? `  <link rel="preload" as="image" type="image/webp" imagesrcset="${asset(`screens/${locale.prefix || 'en'}/timer-330.webp`)} 1x, ${asset(`screens/${locale.prefix || 'en'}/timer-660.webp`)} 2x" fetchpriority="high">\n` : ''}  <link rel="stylesheet" href="${asset('styles.css')}">
  ${schemas.map(schemaScript).join('\n  ')}${analytics ? `\n  ${analytics}` : ''}
</head>
<body data-page="${page.key}">
  <a class="skip-link" href="#main">${escapeHtml(locale.common.skipContent)}</a>
  ${header(locale, page.slug)}
  <main id="main">${body}</main>
  ${footer(locale)}
  <script src="${asset('site.js')}" defer></script>
</body>
</html>`;
}

function renderFaqs(locale, limit) {
  return `<div class="faq-list">${locale.faqs.slice(0, limit).map(([question, answer]) => `<details class="faq-item"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}</div>`;
}

function renderHome(locale) {
  const page = pageFor('home');
  const copy = locale.home;
  const body = `
  <section class="hero">
    <div class="shell hero-grid">
      <div>
        <div class="eyebrow">${escapeHtml(copy.eyebrow)}</div>
        <h1>${escapeHtml(copy.title)} <span class="accent">${escapeHtml(copy.titleAccent)}</span></h1>
        <p class="hero-copy">${escapeHtml(copy.intro)}</p>
        <div class="hero-actions">
          ${appStoreButton(locale, 'hero')}
          <a class="button" href="${routeFor(locale, pageFor('blocker').slug)}">${escapeHtml(copy.secondaryCta)}</a>
        </div>
        <p class="availability">${escapeHtml(locale.common.available)}</p>
      </div>
      <div class="phone-stage" aria-label="Zone focus timer shown on iPhone">
        <div class="phone-glow"></div>
        <div class="proof-card top"><div class="proof-icon" aria-hidden="true">◇</div><div><strong>${escapeHtml(copy.proofOneTitle)}</strong><span>${escapeHtml(copy.proofOneBody)}</span></div></div>
        <div class="phone"><picture><source type="image/webp" srcset="${asset(`screens/${locale.prefix || 'en'}/timer-330.webp`)} 1x, ${asset(`screens/${locale.prefix || 'en'}/timer-660.webp`)} 2x"><img src="${asset(`screens/${locale.prefix || 'en'}/timer.png`)}" width="660" height="1434" fetchpriority="high" alt="${escapeHtml(copy.timerAlt)}"></picture></div>
        <div class="proof-card bottom"><div class="proof-icon" aria-hidden="true">✓</div><div><strong>${escapeHtml(copy.proofTwoTitle)}</strong><span>${escapeHtml(copy.proofTwoBody)}</span></div></div>
      </div>
    </div>
    <div class="shell signal-strip">${copy.signals.map(([title, detail]) => `<div class="signal"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></div>`).join('')}</div>
  </section>
  <section class="section">
    <div class="shell">
      <div class="section-label">${escapeHtml(copy.featureLabel)}</div>
      <h2 class="section-heading">${escapeHtml(copy.featureTitle)}</h2>
      <p class="section-intro">${escapeHtml(copy.featureIntro)}</p>
      <div class="bento">
        <article class="card copy-card span-7">
          <h3>${escapeHtml(copy.blockerTitle)}</h3><p>${escapeHtml(copy.blockerBody)}</p>
          <div class="block-visual" aria-hidden="true"><div class="app-tile blocked">Aa</div><div class="app-tile blocked">▶</div><div class="app-tile blocked">#</div><div class="app-tile blocked">◎</div></div>
        </article>
        <article class="card copy-card span-5">
          <h3>${escapeHtml(copy.timerTitle)}</h3><p>${escapeHtml(copy.timerBody)}</p>
          <div class="timer-orbit" aria-hidden="true"><span>42:18</span></div>
        </article>
        <article class="card copy-card span-5">
          <h3>${escapeHtml(copy.strictTitle)}</h3><p>${escapeHtml(copy.strictBody)}</p>
          <div class="mode-list">${copy.strictRows.map((row) => `<div class="mode-row"><span>${escapeHtml(row)}</span><em></em></div>`).join('')}</div>
        </article>
        <article class="card copy-card span-7">
          <h3>${escapeHtml(copy.privacyTitle)}</h3><p>${escapeHtml(copy.privacyBody)}</p>
          <div class="privacy-list">${copy.privacyPoints.map((point) => `<div class="privacy-point"><span class="check">✓</span><strong>${escapeHtml(point)}</strong></div>`).join('')}</div>
        </article>
      </div>
    </div>
  </section>
  <section class="section" id="how-it-works">
    <div class="shell">
      <div class="section-label">${escapeHtml(copy.flowLabel)}</div>
      <h2 class="section-heading">${escapeHtml(copy.flowTitle)}</h2>
      <div class="flow">${copy.flow.map(([title, detail]) => `<article class="flow-step"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(detail)}</p></article>`).join('')}</div>
    </div>
  </section>
  <section class="section">
    <div class="shell split">
      <div class="screen-stack" aria-label="Zone blocking selection and focus insight screens">
        <div class="screen-shot"><img src="${asset(`screens/${locale.prefix || 'en'}/app-picker.png`)}" width="660" height="1434" loading="lazy" alt="${escapeHtml(copy.appPickerAlt)}"></div>
        <div class="screen-shot"><img src="${asset(`screens/${locale.prefix || 'en'}/insights.png`)}" width="660" height="1434" loading="lazy" alt="${escapeHtml(copy.insightsAlt)}"></div>
      </div>
      <div>
        <div class="section-label">${escapeHtml(copy.insightLabel)}</div>
        <h2 class="section-heading">${escapeHtml(copy.insightTitle)}</h2>
        <p class="section-intro">${escapeHtml(copy.insightIntro)}</p>
        <div class="feature-list">${copy.insightRows.map(([title, detail]) => `<div class="feature-row"><span class="tick">✓</span><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></div></div>`).join('')}</div>
      </div>
    </div>
  </section>
  <section class="section tight"><div class="shell"><div class="quote"><div><p>${escapeHtml(copy.quote)}</p><span>${escapeHtml(copy.quoteBy)}</span></div></div></div></section>
  <section class="section">
    <div class="shell split">
      <div><div class="section-label">${escapeHtml(copy.faqLabel)}</div><h2 class="section-heading">${escapeHtml(copy.faqTitle)}</h2><p class="section-intro">${escapeHtml(copy.faqIntro)}</p><a class="text-link" href="${routeFor(locale, pageFor('faq').slug)}">${escapeHtml(locale.nav.faq)} →</a></div>
      ${renderFaqs(locale, 4)}
    </div>
  </section>
  ${cta(locale)}`;
  return documentShell({
    locale,
    page,
    title: copy.metaTitle,
    description: copy.metaDescription,
    body,
    schemas: [websiteSchema(locale), appSchema(locale, copy.metaDescription), faqSchema(locale)]
  });
}

function renderSection(locale, section) {
  const paragraphs = section.paragraphs?.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('') ?? '';
  const bullets = section.bullets ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : '';
  const steps = section.steps ? `<ol>${section.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>` : '';
  const callout = section.callout ? `<div class="info-box"><strong>${escapeHtml(section.callout[0])}</strong>${escapeHtml(section.callout[1])}</div>` : '';
  const comparison = section.comparison ? `<div class="comparison-wrap"><table class="comparison">${section.comparison.map((row, index) => `<tr>${row.map((cell) => `<${index === 0 ? 'th' : 'td'}>${escapeHtml(cell)}</${index === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</table></div>` : '';
  const facts = section.facts ? `<div class="fact-grid">${section.facts.map(([label, value]) => `<div class="fact"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`).join('')}</div>` : '';
  const downloads = section.downloads ? `<div class="download-grid">${section.downloads.map(([label, file]) => {
    const isIcon = file === 'app-icon.png';
    const path = isIcon ? file : `screens/${locale.prefix || 'en'}/${file}`;
    const downloadName = isIcon ? 'zone-app-icon.png' : `zone-${locale.prefix || 'en'}-${file}`;
    return `<a class="download-card" href="${asset(path)}" download="${downloadName}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(section.downloadLabel)} ↓</span></a>`;
  }).join('')}</div>` : '';
  const email = section.emailLabel ? `<p><a class="button" href="mailto:${escapeHtml(site.contactEmail)}">${escapeHtml(section.emailLabel)} →</a></p><p class="contact-address">${escapeHtml(site.contactEmail)}</p>` : '';
  let link = '';
  if (section.link) {
    const href = section.link[1] === 'legal' ? `${site.legalBaseUrl}/${locale.legalLocale}/privacy.html` : site.appStoreUrl;
    link = `<p><a class="button" href="${href}"${section.link[1] === 'appstore' ? ' data-app-store-link data-placement="article"' : ''}>${escapeHtml(section.link[0])} →</a></p>`;
  }
  return `<section aria-labelledby="${section.id}"><h2 id="${section.id}">${escapeHtml(section.title)}</h2>${paragraphs}${bullets}${steps}${comparison}${facts}${downloads}${callout}${email}${link}</section>`;
}

function renderArticle(locale, page) {
  const article = locale.articles[page.key];
  const isFaq = page.key === 'faq';
  const sections = [...article.sections];
  if (page.key === 'privacy' && analyticsToken) {
    sections.splice(-1, 0, { id: 'website-analytics', title: locale.common.webAnalytics[0], paragraphs: [locale.common.webAnalytics[1]] });
  }
  const bodyContent = isFaq ? renderFaqs(locale) : sections.map((section) => renderSection(locale, section)).join('');
  const nav = isFaq ? '' : `<aside class="article-nav"><strong>${escapeHtml(locale.common.onThisPage)}</strong>${sections.map((section) => `<a href="#${section.id}">${escapeHtml(section.title)}</a>`).join('')}</aside>`;
  const body = `
    <section class="page-hero">
      <div class="shell">
        <div class="breadcrumbs"><a href="${routeFor(locale, '')}">${escapeHtml(locale.nav.home)}</a> / ${escapeHtml(article.eyebrow)}</div>
        <div class="eyebrow">${escapeHtml(article.eyebrow)}</div>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="lede">${escapeHtml(article.intro)}</p>
        <div class="page-actions">${appStoreButton(locale, 'page-hero')}</div>
      </div>
    </section>
    <section class="section">
      <div class="shell article-layout">
        ${nav}
        <article class="prose">${bodyContent}</article>
      </div>
    </section>
    ${cta(locale)}`;
  const schemas = [websiteSchema(locale), appSchema(locale, article.metaDescription), breadcrumbsSchema(locale, page, article.title)];
  if (isFaq) schemas.push(faqSchema(locale));
  return documentShell({ locale, page, title: article.metaTitle, description: article.metaDescription, body, schemas });
}

async function writePage(path, html) {
  const target = join(outputDir, path, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

async function build() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await cp(join(rootDir, 'assets'), join(outputDir, 'assets'), { recursive: true });
  await writeFile(join(outputDir, 'assets/styles.css'), await readFile(join(sourceDir, 'styles.css')));
  await writeFile(join(outputDir, 'assets/site.js'), await readFile(join(sourceDir, 'site.js')));

  const urls = [];
  for (const locale of Object.values(locales)) {
    for (const page of pages) {
      const route = routeFor(locale, page.slug);
      const path = route === '/' ? '' : route.slice(1, -1);
      const html = page.key === 'home' ? renderHome(locale) : renderArticle(locale, page);
      await writePage(path, html);
      urls.push(canonicalFor(locale, page.slug));
    }
  }

  const now = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${now}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(join(outputDir, 'sitemap.xml'), sitemap);
  await writeFile(join(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
  await writeFile(join(outputDir, 'llms.txt'), `# Zone: App Blocker & Focus\n\n> Zone is an iPhone and iPad focus timer that blocks selected apps and websites during timed sessions.\n\nOfficial website: ${site.origin}\nApp Store: ${site.appStoreUrl}\nDeveloper: ${site.developer}\nContact: ${site.contactEmail}\nPlatforms: iPhone and iPad, iOS/iPadOS 18 or later\n\n## Official pages\n${pages.map((page) => `- ${site.origin}${routeFor(locales.en, page.slug)}`).join('\n')}\n\n## Core facts\n- Zone combines a focus timer with app and website blocking.\n- Strict Mode can make a running session harder to abandon.\n- No account is required.\n- Zone cannot see the specific apps or websites selected for blocking.\n- Zone supports Live Activities, Dynamic Island, focus insights, streaks, and optional Apple Health Mindful Minutes.\n- Zone is a productivity tool, not medical treatment.\n`);
  await writeFile(join(outputDir, 'CNAME'), 'zonefocus.app\n');
  await writeFile(join(outputDir, '.nojekyll'), '');
  console.log(`Built ${urls.length} pages in ${outputDir}`);
}

await build();
