export const site = {
  origin: 'https://zonefocus.app',
  appStoreUrl: 'https://apps.apple.com/app/id6763581982',
  legalBaseUrl: 'https://vikasjhd.github.io/zone-privacy',
  name: 'Zone: App Blocker & Focus',
  developer: 'Vikas Saini',
  appStoreId: '6763581982'
};

export const pages = [
  { key: 'home', slug: '' },
  { key: 'blocker', slug: 'app-blocker' },
  { key: 'screenTime', slug: 'screen-time-alternative' },
  { key: 'doomscrolling', slug: 'stop-doomscrolling-iphone' },
  { key: 'faq', slug: 'faq' },
  { key: 'privacy', slug: 'privacy' },
  { key: 'press', slug: 'press' }
];

const en = {
  htmlLang: 'en',
  hreflang: 'en-US',
  prefix: '',
  languageName: 'English (US)',
  shortLanguage: 'EN',
  legalLocale: 'en',
  nav: {
    blocker: 'App blocker',
    how: 'How it works',
    privacy: 'Privacy',
    faq: 'FAQ',
    download: 'Get Zone',
    menu: 'Open menu',
    language: 'Language',
    home: 'Home'
  },
  common: {
    appStore: 'Download on the App Store',
    learnMore: 'Learn how Zone blocks distractions',
    available: 'For iPhone and iPad · Requires iOS 18 or later',
    kicker: 'Zone for iPhone and iPad',
    footerText: 'Strict app and website blocking for focused time.',
    product: 'Product',
    guides: 'Guides',
    company: 'Company',
    legalPolicy: 'Full privacy policy',
    copyright: '© 2026 Vikas Saini. All rights reserved.',
    appleNote: 'Apple, iPhone, iPad, Screen Time, Dynamic Island and Live Activities are trademarks of Apple Inc.',
    skipContent: 'Skip to content',
    primaryNavigation: 'Primary navigation',
    screenTimeGuide: 'Screen Time alternative',
    doomscrollingGuide: 'Stop doomscrolling',
    press: 'Press',
    onThisPage: 'On this page',
    related: 'Related guide',
    ctaTitle: 'Make the next hour yours.',
    ctaBody: 'Choose what to block, set a timer, and give your attention one clear place to go.',
    factsOnly: 'Product information is based on the current shipping version of Zone.'
  },
  home: {
    metaTitle: 'Zone — Strict App & Website Blocker for iPhone',
    metaDescription: 'Block distracting apps and websites during timed focus sessions. Zone is a strict, private focus timer for iPhone and iPad.',
    eyebrow: 'Strict focus, by design',
    title: 'Block the noise.',
    titleAccent: 'Enter your zone.',
    intro: 'Zone is a focus timer that blocks distracting apps and websites on your iPhone and iPad—so a moment of impulse does not become an hour of scrolling.',
    secondaryCta: 'See how blocking works',
    proofOneTitle: 'Strict Mode',
    proofOneBody: 'Make a running session harder to quit',
    proofTwoTitle: 'Private by default',
    proofTwoBody: 'No account. Your selections stay private.',
    signals: [
      ['Apps + websites', 'Block both in one focus session'],
      ['Strict Mode', 'Add friction when willpower fades'],
      ['Live Activities', 'See the timer without reopening Zone'],
      ['Private design', 'No account or in-app ad tracking']
    ],
    featureLabel: 'Distraction blocking',
    featureTitle: 'A timer that changes what your phone can do.',
    featureIntro: 'Ordinary timers count minutes. Zone pairs the countdown with real restrictions, helping you protect the time you intended to focus.',
    blockerTitle: 'Pick the distractions',
    blockerBody: 'Choose the apps and website categories you want unavailable during the session. Zone cannot see the specific items you select.',
    timerTitle: 'Choose your time',
    timerBody: 'Start a preset or custom session, then follow the remaining time from Zone, the Lock Screen, or Dynamic Island.',
    strictTitle: 'Add real commitment',
    strictBody: 'Strict Mode is built for the moment when you are tempted to end a session early.',
    strictRows: ['App and website shielding', 'Preset or custom timers', 'Optional Strict Mode'],
    privacyTitle: 'Focus without surveillance',
    privacyBody: 'Zone is designed to do its job without building an advertising profile around your attention.',
    privacyPoints: ['No account required', 'No third-party app analytics', 'Private blocking selections', 'Focus history stays yours'],
    flowLabel: 'How it works',
    flowTitle: 'Three steps between intention and focus.',
    flow: [
      ['Choose', 'Select the apps and websites that tend to pull you away.'],
      ['Commit', 'Pick a duration and turn on Strict Mode when you need more friction.'],
      ['Focus', 'Zone applies the restrictions and keeps the remaining time visible.']
    ],
    insightLabel: 'See the effort',
    insightTitle: 'Turn focused minutes into a pattern you can understand.',
    insightIntro: 'Review completed sessions, focused time, streaks, and blocked attempts. You can also choose to save completed sessions to Apple Health as Mindful Minutes.',
    insightRows: [
      ['Session history', 'See when and how long you focused.'],
      ['Streaks and insights', 'Notice consistency without turning focus into noise.'],
      ['Optional Apple Health support', 'Save completed sessions as Mindful Minutes when you choose.']
    ],
    quote: 'Your phone should protect the decision you already made—not keep asking you to make it again.',
    quoteBy: 'The idea behind Zone',
    timerAlt: 'Zone focus timer running on iPhone',
    appPickerAlt: 'Selecting apps to block in Zone',
    insightsAlt: 'Focus session insights in Zone',
    faqLabel: 'Quick answers',
    faqTitle: 'Before you start a session',
    faqIntro: 'The practical details people usually want to know first.'
  },
  faqs: [
    ['What does Zone block?', 'Zone can restrict selected apps and websites while a focus session is active. Apple’s Screen Time frameworks apply the restrictions on the device.'],
    ['Can Zone see which apps or websites I select?', 'No. Apple provides Zone with opaque selections, so the app can apply your choices without learning which specific apps or websites you picked.'],
    ['Can I end a focus session early?', 'Normal sessions can be ended early. Strict Mode is designed to make that choice harder, so use it only when you are comfortable committing to the selected duration.'],
    ['Does Zone require an account?', 'No. You can use Zone without creating an account.'],
    ['Which devices are supported?', 'Zone is available for compatible iPhone and iPad devices running iOS or iPadOS 18 or later.'],
    ['Does Zone work with Apple Health?', 'Optionally. If you grant permission, Zone can save completed focus sessions as Mindful Minutes.'],
    ['Is Zone an addiction treatment?', 'No. Zone is a productivity tool that adds practical friction around distracting apps and websites; it is not medical treatment.']
  ],
  articles: {
    blocker: {
      metaTitle: 'Strict App & Website Blocker for iPhone — Zone',
      metaDescription: 'Learn how Zone blocks selected apps and websites during timed focus sessions on iPhone and iPad, with optional Strict Mode.',
      eyebrow: 'App and website blocker',
      title: 'Put distractions out of reach for a while.',
      intro: 'Zone combines a focus timer with app and website restrictions. You decide what is blocked, how long the session runs, and whether to add Strict Mode.',
      sections: [
        { id: 'what', title: 'What Zone blocks', paragraphs: ['Zone can shield selected apps and websites while a focus session is active. You choose the distractions that matter for your situation—social feeds, video, shopping, news, or anything else available through Apple’s selection interface.'], bullets: ['Selected iPhone and iPad apps', 'Selected websites and website categories', 'The combination you save as a reusable preset'] },
        { id: 'how', title: 'How blocking works on iPhone', paragraphs: ['Zone uses Apple’s Screen Time frameworks to request restrictions on your device. The system gives Zone an opaque representation of your choices. That lets the app apply the shield without revealing the specific apps or websites you selected.', 'When the timer finishes, Zone removes the restrictions for that session. Because iOS controls enforcement, Zone does not need to inspect your browsing history or watch which apps you open.'] },
        { id: 'strict', title: 'What Strict Mode changes', paragraphs: ['A blocker is most useful at the exact moment you want to override it. Strict Mode adds commitment to a timed session by making early escape deliberately harder.', 'Use it for a duration you are prepared to honor. For lighter sessions, keep Strict Mode off so you retain the option to stop early.'], callout: ['Use deliberately', 'Strict Mode is a commitment feature, not a punishment. Start with a realistic duration and increase it only when the pattern works for you.'] },
        { id: 'setup', title: 'A simple setup', steps: ['Choose the apps and websites that distract you.', 'Select a preset or custom focus duration.', 'Decide whether this session needs Strict Mode.', 'Start the session and leave Zone in the background.'] },
        { id: 'privacy', title: 'Blocking without a list of your habits', paragraphs: ['Zone cannot see the specific apps or websites in your blocking selection. No account is required, and the app does not include third-party analytics. Your blocking choices and focus history remain private.'] }
      ]
    },
    screenTime: {
      metaTitle: 'A Focused Apple Screen Time Alternative — Zone',
      metaDescription: 'Compare Zone with Apple Screen Time when you want timed app blocking, website blocking, focus sessions, and optional Strict Mode.',
      eyebrow: 'Screen Time alternative',
      title: 'Screen Time is broad. Zone is built for a focus session.',
      intro: 'Apple Screen Time is a system-wide collection of usage reports, limits, and family controls. Zone uses Apple’s frameworks for a narrower job: protecting a timed block of focused work.',
      sections: [
        { id: 'difference', title: 'The practical difference', paragraphs: ['Use Screen Time when you want general device limits, Downtime schedules, content restrictions, or family controls. Use Zone when you want to pick distractions, start a timer, and focus now.'], comparison: [
          ['Need', 'Zone', 'Apple Screen Time'],
          ['Timed focus sessions', 'Core workflow', 'Possible through limits and Downtime'],
          ['Selected app and website blocking', 'Session-based', 'Limit- and schedule-based'],
          ['Strict commitment option', 'Optional Strict Mode', 'Different passcode and limit controls'],
          ['Usage reporting', 'Focus sessions and blocked attempts', 'Broad device activity reports'],
          ['Family controls', 'Not the purpose of Zone', 'Built in']
        ] },
        { id: 'choose', title: 'When Zone is the better fit', bullets: ['You want a start-and-finish focus ritual.', 'You want the blocker and countdown in one interface.', 'You want to reuse different blocking presets for work, study, reading, or sleep.', 'You want Live Activities or Dynamic Island to show the remaining session time.'] },
        { id: 'together', title: 'You do not have to choose only one', paragraphs: ['Zone does not replace every Screen Time feature. You can keep long-term Screen Time limits and use Zone for deliberate, timed focus sessions. The tools solve overlapping but different problems.'] },
        { id: 'accurate', title: 'Built on Apple’s controls', paragraphs: ['Zone depends on the Screen Time access you approve and on Apple’s supported frameworks. It does not bypass iOS, inspect your activity, or promise an impossible lock that the operating system cannot enforce.'] }
      ]
    },
    doomscrolling: {
      metaTitle: 'How to Stop Doomscrolling on iPhone — A Practical Guide',
      metaDescription: 'A practical, non-medical guide to reduce doomscrolling on iPhone by changing cues, adding friction, and using timed app and website blocking.',
      eyebrow: 'Practical focus guide',
      title: 'Stop relying on willpower to stop scrolling.',
      intro: 'Doomscrolling often begins as a tiny automatic action: unlock, tap, refresh. The most useful intervention is to change what happens before that loop gathers momentum.',
      sections: [
        { id: 'pattern', title: 'Make the loop visible', paragraphs: ['Notice the cue, not just the total screen time. You may reach for a feed after a difficult task, during a transition, in bed, or whenever a notification creates uncertainty.', 'For one day, note the situation immediately before you open the distracting app. A short list of triggers is more useful than blaming yourself for a weekly hour total.'] },
        { id: 'friction', title: 'Add friction before the first swipe', bullets: ['Remove high-trigger apps from your first Home Screen.', 'Disable notifications that do not require timely action.', 'Log out of services you open automatically.', 'Use a timed blocker during predictable high-risk periods.'], callout: ['Why friction helps', 'You are not trying to make distraction impossible forever. You are creating enough time for the intentional choice to catch up with the automatic one.'] },
        { id: 'window', title: 'Protect a small window first', paragraphs: ['Start with a focus window you can finish: 20 minutes of reading, 30 minutes of work, or the first 45 minutes after waking. Long, dramatic restrictions tend to fail when they do not match your day.', 'In Zone, choose only the apps and websites that break this specific window. Start the timer, and use Strict Mode only when you genuinely want the extra commitment.'] },
        { id: 'replace', title: 'Give the impulse somewhere else to go', paragraphs: ['Blocking removes an option; it does not choose the next action for you. Put the intended activity in sight: open the document, place the book nearby, or write the one task that matters on paper before the session begins.'] },
        { id: 'review', title: 'Review the pattern, not your worth', paragraphs: ['At the end of a week, look for the focus windows you completed and the moments that still broke through. Adjust the environment or the duration. This is a design problem, not a character verdict.', 'If your use feels dangerous, causes serious distress, or is connected to a mental-health concern, a productivity app is not a substitute for qualified professional support.'] }
      ]
    },
    faq: {
      metaTitle: 'Zone FAQ — App Blocking, Strict Mode & Privacy',
      metaDescription: 'Answers about Zone’s iPhone and iPad app blocking, website blocking, Strict Mode, privacy, Live Activities, and Apple Health support.',
      eyebrow: 'Frequently asked questions',
      title: 'Clear answers before you block distractions.',
      intro: 'How Zone works, what it can access, and what to expect from a focus session.',
      sections: []
    },
    privacy: {
      metaTitle: 'Zone Privacy — App & Website Blocking Without an Account',
      metaDescription: 'A plain-language overview of how Zone handles blocking selections, focus history, Apple Health, iCloud, and Live Activity data.',
      eyebrow: 'Privacy overview',
      title: 'Your focus choices should stay yours.',
      intro: 'Zone is designed to block distractions without learning the private list of apps and websites you chose.',
      sections: [
        { id: 'summary', title: 'The short version', bullets: ['No account is required.', 'Zone cannot see the specific apps or websites in your blocking selection.', 'Your focus history and blocking choices remain private.', 'The app does not include third-party analytics or advertising trackers.'] },
        { id: 'screen-time', title: 'Screen Time selections', paragraphs: ['Apple gives Zone opaque tokens for the apps and websites you select. Zone can use those tokens to apply restrictions, but the tokens do not reveal the specific selections to the developer.'] },
        { id: 'health', title: 'Apple Health', paragraphs: ['Saving completed sessions as Mindful Minutes is optional. Zone requests Health access only if you choose to use that feature, and the permission remains under your control in iOS settings.'] },
        { id: 'icloud', title: 'Private iCloud Sync', paragraphs: ['Zone Sync stores your focus history and supported preferences only in your private iCloud account. Zone does not send this sync data to an external server. It helps restore your data after reinstalling Zone and keeps supported data available on devices using the same Apple Account.'] },
        { id: 'live', title: 'Live Activities', paragraphs: ['If you enable remote Live Activity updates, Zone sends the APNs token and limited timer-delivery state needed to update the activity. It does not send your app or website selection.'] },
        { id: 'policy', title: 'Read the full policy', paragraphs: ['This page is a readable product summary, not a replacement for the legal privacy policy. The existing published policy remains the authoritative document.'], link: ['Open the full privacy policy', 'legal'] }
      ]
    },
    press: {
      metaTitle: 'Zone Press Kit — Product Facts & App Screenshots',
      metaDescription: 'Accurate product facts, positioning, App Store link, developer information, and downloadable assets for Zone.',
      eyebrow: 'Press and reviewers',
      title: 'The essential facts about Zone.',
      intro: 'A concise, factual reference for writers, reviewers, creators, and anyone evaluating Zone.',
      sections: [
        { id: 'summary', title: 'Product summary', paragraphs: ['Zone: App Blocker & Focus is an iPhone and iPad productivity app by independent developer Vikas Saini. It combines timed focus sessions with selected app and website restrictions, optional Strict Mode, Live Activities, Dynamic Island support, and private focus insights.'] },
        { id: 'facts', title: 'Quick facts', facts: [['Product', 'Zone: App Blocker & Focus'], ['Developer', 'Vikas Saini'], ['Platforms', 'iPhone and iPad'], ['Requirement', 'iOS or iPadOS 18 or later'], ['Category', 'Productivity'], ['Account', 'Not required']] },
        { id: 'angles', title: 'What makes Zone distinct', bullets: ['The focus timer and blocker are one workflow.', 'Strict Mode adds commitment for sessions that should not be easy to abandon.', 'Blocking selections are opaque to the app and developer.', 'Live Activities keep the countdown visible without reopening the app.'] },
        { id: 'assets', title: 'Official assets', paragraphs: ['The app icon and localized product screenshots on this site may be used when accurately covering or reviewing Zone. Do not imply endorsement or alter the icon.'], link: ['View Zone on the App Store', 'appstore'] },
        { id: 'contact', title: 'Contact', paragraphs: ['For product questions, reviews, or press inquiries, contact the developer through the support channel linked from the App Store listing.'] }
      ]
    }
  }
};

const englishVariant = ({ hreflang, prefix, languageName, shortLanguage, legalLocale }) => ({
  ...en,
  htmlLang: hreflang,
  hreflang,
  prefix,
  languageName,
  shortLanguage,
  legalLocale
});

export const locales = {
  en,
  enGB: englishVariant({ hreflang: 'en-GB', prefix: 'en-gb', languageName: 'English (UK)', shortLanguage: 'UK', legalLocale: 'en-gb' }),
  enCA: englishVariant({ hreflang: 'en-CA', prefix: 'en-ca', languageName: 'English (Canada)', shortLanguage: 'CA', legalLocale: 'en-ca' }),
  enAU: englishVariant({ hreflang: 'en-AU', prefix: 'en-au', languageName: 'English (Australia)', shortLanguage: 'AU', legalLocale: 'en-au' }),
  es,
  esMX,
  ptBR,
  fr,
  de,
  it
};
import { de } from './locales/de.mjs';
import { es, esMX } from './locales/es.mjs';
import { fr } from './locales/fr.mjs';
import { it } from './locales/it.mjs';
import { ptBR } from './locales/pt-br.mjs';
