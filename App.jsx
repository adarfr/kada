import React, { useState, useContext, createContext, useEffect } from "react";
import { Heart, Home, Info, ArrowRight, Mail, Phone, MapPin, ShieldCheck, Building2, Globe, Languages } from "lucide-react";

// ------------------------------------------------------------
// KADA Website — Single-file React app (EN/HE with RTL support)
// ULTRA-HARDENED FOR PREVIEW:
// Some sandboxes attempt to construct URL objects for anchors && hash-based
// routing, causing "Failed to construct 'URL': Invalid URL".
// This build removes ALL usage of react-router && ALL <a> tags.
// - Internal nav uses an in-memory router via useState (no URL writes).
// - External links open via window.open on button click.
// - Mail/Phone use window.location on button click only.
// This guarantees zero URL parsing at render time.
// ------------------------------------------------------------

// i18n context
const LangContext = createContext({ lang: "en", setLang: (l) => {} });
const useLang = () => useContext(LangContext);

const i18n = {
  en: {
    orgName: "KADA",
    tagline: "Families of Kfar Aza, rebuilding together.",
    missionLine:
      "We are families from Kfar Aza working to relocate && re-establish our community with dignity, safety, && long-term resilience.",
    navHome: "Home",
    navAbout: "About Us",
    navDonate: "Donate",
    donateNow: "Donate now",
    learnMore: "Learn more",
    safety: "Safety & Stability",
    safetyBody:
      "Establishing a permanent, secure home for families displaced from Kfar Aza, with access to essential services.",
    community: "Community",
    communityBody:
      "Preserving the social fabric by relocating together, ensuring mutual support, education continuity, && shared culture.",
    futureReady: "Future-ready",
    futureReadyBody:
      "Investing in resilient housing && community infrastructure to thrive for the long term.",
    howSupportHelps: "How your support helps",
    transparencyTitle: "Transparency & Accountability",
    transparencyBody:
      "KADA is committed to transparent reporting. We publish project milestones && financial summaries so donors can see progress end-to-end.",
    aboutTitle: "About KADA",
    aboutP1:
      "KADA was formed by families from Kfar Aza seeking a safe, permanent path forward after the events of October 7. Our goal is to relocate together, preserve our communal bonds, && build a future that honors our past while protecting our next generation.",
    objectives: "Our Objectives",
    projectPhases: "Project Phases",
    governance: "Governance",
    contact: "Contact",
    keyDocs: "Key Documents",
    supportKADA: "Support KADA",
    supportKADAP:
      "Your contribution helps families from Kfar Aza relocate together && rebuild a safe, thriving community.",
    giveOnlinePrimary: "Give online (primary)",
    donateOnline: "Donate online",
    bankTransfer: "Bank transfer (Israel)",
    unitedStates: "United States (501(c)(3) partner)",
    canada: "Canada (tax-receipt partner)",
    unitedKingdom: "United Kingdom (Gift Aid partner)",
    faqs: "FAQs",
    faq1q: "Will I receive a tax receipt?",
    faq1a:
      "Yes—when donating via our listed partners for your country (U.S., Canada, UK), you can receive a tax receipt according to their policies. For local bank transfers, we will issue an Israeli receipt upon request.",
    faq2q: "Can I dedicate a gift?",
    faq2a:
      "Absolutely. Please include dedication information in the donation form memo or email us your request.",
    faq3q: "How are funds used?",
    faq3a:
      "Funds support relocation due-diligence, interim services, permanent housing && core community infrastructure, && resilience programs.",
    talkFirst: "Prefer to talk first?",
    talkFirstP:
      "We’re happy to discuss partnership && major gifts. Please reach out && we’ll follow up quickly.",
    language: "Language",
    english: "English",
    hebrew: "עברית",
  },
  he: {
    orgName: "קאדה",
    tagline: "משפחות כפר עזה בונות מחדש – יחד.",
    missionLine:
      "אנחנו משפחות מכפר עזה הפועלות למעבר יישובי משותף ולהקמת קהילה בטוחה, מכבדת ובת-קיימא לטווח ארוך.",
    navHome: "דף הבית",
    navAbout: "עלינו",
    navDonate: "תרומה",
    donateNow: "לתרומה עכשיו",
    learnMore: "לפרטים נוספים",
    safety: "ביטחון ויציבות",
    safetyBody:
      "יצירת בית קבע בטוח למשפחות שהיו עקורות מכפר עזה, תוך נגישות לשירותים חיוניים.",
    community: "קהילה",
    communityBody:
      "שימור המרקם החברתי באמצעות מעבר יחד, תמיכה הדדית, רצף חינוכי ותרבות משותפת.",
    futureReady: "מוכנות לעתיד",
    futureReadyBody:
      "השקעה בדיור עמיד ובתשתיות קהילתיות לשגשוג ארוך טווח.",
    howSupportHelps: "איך התרומה שלכם מסייעת",
    transparencyTitle: "שקיפות ואחריותיות",
    transparencyBody:
      "בקאדה מחויבים לדיווח שקוף: נפרסם אבני דרך ותמונות מצב כספיות כדי שתוכלו לראות את ההתקדמות מקצה לקצה.",
    aboutTitle: "אודות קאדה",
    aboutP1:
      "קאדה הוקמה על ידי משפחות מכפר עזה המבקשות מסלול בטוח וקבוע קדימה לאחר אירועי 7 באוקטובר. מטרתנו לעבור יחד, לשמר את הקשרים הקהילתיים ולבנות עתיד בטוח לדורות הבאים.",
    objectives: "מטרותינו",
    projectPhases: "שלבי הפרויקט",
    governance: "ממשל וניהול",
    contact: "יצירת קשר",
    keyDocs: "מסמכים מרכזיים",
    supportKADA: "תמכו בקאדה",
    supportKADAP:
      "תרומתכם מסייעת למשפחות מכפר עזה לעבור יחד ולבנות קהילה בטוחה ושוקקת.",
    giveOnlinePrimary: "תרומה מקוונת (ראשית)",
    donateOnline: "תרומה מקוונת",
    bankTransfer: "העברה בנקאית (ישראל)",
    unitedStates: "ארה״ב (שותף 501(c)(3))",
    canada: "קנדה (שותף להנפקת קבלות מס)",
    unitedKingdom: "בריטניה (שותף Gift Aid)",
    faqs: "שאלות נפוצות",
    faq1q: "האם אקבל קבלה לצורכי מס?",
    faq1a:
      "כן. בתרומה דרך השותפים לפי מדינתכם (ארה״ב, קנדה, בריטניה) תוכלו לקבל קבלה לפי הנהלים שלהם. בהעברה בנקאית בישראל ננפיק קבלה ישראלית לפי בקשה.",
    faq2q: "אפשר להקדיש תרומה?",
    faq2a:
      "כמובן. נא לציין פרטי הקדשה בשדה ההערות בטופס או לשלוח לנו במייל.",
    faq3q: "איך נעשה שימוש בכספים?",
    faq3a:
      "הכספים מוקצים לבדיקות היתכנות ומעבר, שירותי גישור בתקופת המעבר, דיור קבע ותשתיות קהילתיות, ותוכניות חוסן.",
    talkFirst: "מעדיפים שיחה לפני כן?",
    talkFirstP:
      "נשמח לשוחח על שותפויות ותרומות משמעותיות. כתבו לנו ונחזור אליכם במהירות.",
    language: "שפה",
    english: "English",
    hebrew: "עברית",
  },
};

const ORG = {
  name: "KADA",
  tagline: i18n.en.tagline,
  missionLine: i18n.en.missionLine,
  email: "info@kada.org", // must be user@domain.tld
  phone: "+972-50-000-0000", // must start with country code
  address: "(TBD) Israel",
};

const DONATION_CONFIG = {
  donateUrlPrimary: "/donate-online", // internal logical route (stateful)
  bankWire: {
    accountName: "KADA Amuta (placeholder)",
    bankName: "Bank (placeholder)",
    branch: "000",
    accountNumber: "0000000",
    iban: "IL00 0000 0000 0000 0000 000",
    swift: "XXXXILIT",
    note: "Please include your email in the transfer reference for a receipt.",
  },
  us501c3: {
    partnerName: "(U.S. fiscal sponsor)",
    instructions: "For U.S. tax-deductible donations, please donate via our partner && indicate 'KADA' in the designation field.",
    partnerUrl: "https://kada.org.il/partner",
  },
  canada: {
    partnerName: "(Canada partner)",
    instructions: "For Canadian tax receipts, donate through our partner && add 'KADA' in memo.",
    partnerUrl: "https://kada.org.il/partner",
  },
  uk: {
    partnerName: "(UK partner)",
    instructions: "For UK Gift Aid eligibility, donate via our UK partner.",
    partnerUrl: "https://kada.org.il/partner",
  },
};

function Container({ children }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function T({ k }) {
  const { lang } = useLang();
  const dict = i18n[lang] || i18n.en;
  return dict[k] ?? i18n.en[k] ?? k;
}

// --- Helpers ---------------------------------------------------------------
function safeMailValue(email) {
  const ok = /^(?:[^\\s@]+)@(?:[^\\s@]+)\\.[^\\s@]+$/.test(email || "");
  return ok ? email : undefined;
}
function safePhoneValue(phone) {
  const cleaned = String(phone || "").replace(/[^0-9+]/g, "");
  const ok = /^\\+?[0-9]{6,}$/.test(cleaned);
  return ok ? cleaned : undefined;
}

// ---------------- In-memory router (no react-router, no hashes) ------------
const RouterContext = createContext({ route: "/", navigate: (to) => {} });
const useRouter = () => useContext(RouterContext);

function SafeLink({ to, className = "", children, ariaLabel }) {
  const { navigate } = useRouter();
  return (
    <button
      type="button"
      role="link"
      aria-label={ariaLabel || `Go to ${to}`}
      data-to={to}
      onClick={() => navigate(to)}
      className={className}
    >
      {children}
    </button>
  );
}

// Action links for mail/phone: buttons that trigger navigation without <a> --
function ActionLink({ kind, value, className = "", children }) {
  const mail = kind === "mailto" ? safeMailValue(value) : undefined;
  const tel = kind === "tel" ? safePhoneValue(value) : undefined;
  const disabled = (kind === "mailto" && !mail) || (kind === "tel" && !tel);
  const label = children || value;
  const handle = () => {
    try {
      if (kind === "mailto" && mail) window.location.href = `mailto:${mail}`;
      if (kind === "tel" && tel) window.location.href = `tel:${tel}`;
    } catch {}
  };
  return (
    <button
      type="button"
      role="link"
      data-kind={kind}
      data-value={mail || tel || ""}
      onClick={handle}
      disabled={disabled}
      className={`${className} ${disabled ? "opacity-60 cursor-not-allowed" : "underline"}`}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
}

function ExternalLinkButton({ href, className = "", children, ariaLabel }) {
  const isHttps = typeof href === "string" && /^https:\\/\\//i.test(href);
  const handle = () => {
    if (!isHttps) return;
    try { window.open(href, "_blank", "noopener,noreferrer"); } catch {}
  };
  return (
    <button
      type="button"
      role="link"
      aria-label={ariaLabel || href}
      data-external={isHttps ? "https" : "invalid"}
      onClick={handle}
      disabled={!isHttps}
      className={`${className} ${!isHttps ? "opacity-60 cursor-not-allowed" : ""}`}
      aria-disabled={!isHttps}
    >
      {children}
    </button>
  );
}

// Inline SVG logo prevents any URL parsing for images -----------------------
function KadaLogo({ className = "h-9 w-9" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" className={className} aria-hidden="true">
      <rect width="96" height="96" rx="16" fill="#0a5c4a" />
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="36" fill="white">K</text>
    </svg>
  );
}

function SiteHeader() {
  const { route } = useRouter();
  const { lang, setLang } = useLang();
  const rtl = lang === "he";
  const isHome = route === "/";
  const isAbout = route.startsWith("/about");
  const isDonate = route.startsWith("/donate");
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
      <Container>
        <div className="flex items-center justify-between py-3">
          <SafeLink to="/" className="flex items-center gap-3" ariaLabel="Go to home">
            <KadaLogo className="h-9 w-9" />
            <span className="text-xl font-semibold tracking-tight"><T k="orgName" /></span>
          </SafeLink>
          <nav className="hidden md:flex items-center gap-2">
            <SafeLink
              to="/"
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition hover:bg-gray-100 ${isHome ? "bg-gray-100" : ""}`}
              ariaLabel="Go to Home"
            >
              <Home className="w-4 h-4" /> <T k="navHome" />
            </SafeLink>
            <SafeLink
              to="/about"
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition hover:bg-gray-100 ${isAbout ? "bg-gray-100" : ""}`}
              ariaLabel="Go to About"
            >
              <Info className="w-4 h-4" /> <T k="navAbout" />
            </SafeLink>
            <SafeLink
              to="/donate"
              className={`ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-black text-white hover:opacity-90 ${isDonate ? "ring-2 ring-black/10" : ""}`}
              ariaLabel="Go to Donate"
            >
              <Heart className="w-4 h-4" /> <T k="navDonate" />
            </SafeLink>
            <button
              onClick={() => setLang(rtl ? "en" : "he")}
              className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-2xl text-sm border hover:bg-gray-50"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" /> {rtl ? i18n.en.english : i18n.he.hebrew}
            </button>
          </nav>
        </div>
      </Container>
    </header>
  );
}

function SiteFooter() {
  const { lang } = useLang();
  const dict = i18n[lang] || i18n.en;
  return (
    <footer className="mt-20 border-t">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 py-10">
          <div>
            <div className="flex items-center gap-3">
              <KadaLogo className="h-8 w-8" />
              <span className="font-semibold">{dict.orgName}</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">{dict.tagline}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2"><T k="contact" /></h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> <ActionLink kind="mailto" value={ORG.email}>{ORG.email}</ActionLink></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> <ActionLink kind="tel" value={ORG.phone}>{ORG.phone}</ActionLink></li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {ORG.address}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick links</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><SafeLink to="/"><T k="navHome" /></SafeLink></li>
              <li><SafeLink to="/about"><T k="navAbout" /></SafeLink></li>
              <li><SafeLink to="/donate"><T k="navDonate" /></SafeLink></li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between py-4 text-xs text-gray-500 border-t">
          <p>© {new Date().getFullYear()} {dict.orgName}. All rights reserved.</p>
          <p>Crafted with care for community rebuilding.</p>
        </div>
      </Container>
    </footer>
  );
}

function Hero() {
  const { lang } = useLang();
  const dict = i18n[lang] || i18n.en;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-white to-emerald-50 border">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 py-14 px-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {lang === "he" ? "בונים חיים מחדש." : "Rebuilding life together."}
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-700 max-w-prose">
              {dict.missionLine}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SafeLink
                to="/donate"
                className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-5 py-3 text-sm font-semibold hover:opacity-90"
              >
                <T k="donateNow" /> <ArrowRight className="w-4 h-4" />
              </SafeLink>
              <SafeLink
                to="/about"
                className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold hover:bg-gray-50"
              >
                <T k="learnMore" />
              </SafeLink>
            </div>
            <ul className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { label: lang === "he" ? "משפחות" : "Families", value: "30+" },
                { label: lang === "he" ? "יעד: בתים" : "Goal: Homes", value: lang === "he" ? "מימון מלא" : "100% funded" },
                { label: lang === "he" ? "מתנדבים" : "Volunteers", value: lang === "he" ? "רבים" : "Many" },
              ].map((it) => (
                <li key={it.label} className="rounded-2xl border p-4">
                  <div className="text-2xl font-bold">{it.value}</div>
                  <div className="text-xs text-gray-600">{it.label}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[260px]">
            <div className="absolute inset-0 rounded-3xl border bg-white shadow-sm grid place-items-center p-6">
              <div className="text-center max-w-sm">
                <Building2 className="w-12 h-12 mx-auto" />
                <p className="mt-4 text-gray-700">
                  {lang === "he"
                    ? "הוסיפו כאן תמונת פרויקט/תכנון/מפה"
                    : "Add a project photo or illustration here (e.g., proposed site plan, community gathering, or map)."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function HomePage() {
  const { lang } = useLang();
  return (
    <main className="mt-10">
      <Hero />
      <Container>
        <section className="mt-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: <T k="safety" />,
                body: <T k="safetyBody" />,
                icon: <ShieldCheck className="w-6 h-6" />,
              },
              {
                title: <T k="community" />,
                body: <T k="communityBody" />,
                icon: <Globe className="w-6 h-6" />,
              },
              {
                title: <T k="futureReady" />,
                body: <T k="futureReadyBody" />,
                icon: <Home className="w-6 h-6" />,
              },
            ].map((c, i) => (
              <div key={i} className="rounded-3xl border p-6 bg-white">
                <div className="flex items-center gap-3">
                  {c.icon}
                  <h3 className="font-semibold">{c.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-700">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl border p-6">
            <h3 className="text-xl font-semibold"><T k="howSupportHelps" /></h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-700 list-disc list-inside">
              <li>{lang === "he" ? "תכנון ובדיקות היתכנות למעבר (אתרים, היתרים, תכנון)." : "Planning && due diligence for relocation (sites, permits, design)."}</li>
              <li>{lang === "he" ? "דיור זמני ושירותים חיוניים בתקופת המעבר." : "Temporary housing && essential services during transition."}</li>
              <li>{lang === "he" ? "בתי קבע ומתקנים קהילתיים מרכזיים." : "Permanent homes && core community facilities."}</li>
              <li>{lang === "he" ? "תוכניות קהילתיות מותאמות-טראומה ותמיכה בנוער." : "Trauma-informed community programs && youth support."}</li>
            </ul>
            <SafeLink to="/donate" className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-90">
              <T k="donateNow" /> <ArrowRight className="w-4 h-4" />
            </SafeLink>
          </div>
          <div className="rounded-3xl border p-6">
            <h3 className="text-xl font-semibold"><T k="transparencyTitle" /></h3>
            <p className="mt-2 text-sm text-gray-700">
              <T k="transparencyBody" />
            </p>
            <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
              <li>{lang === "he" ? "פיקוח פרויקט ייעודי עם נציגות הקהילה." : "Dedicated project oversight with community representation."}</li>
              <li>{lang === "he" ? "ביקורות עצמאיות ושותפים מבקרים לפי הצורך." : "Independent reviews && partner audits where applicable."}</li>
              <li>{lang === "he" ? "עדכונים שוטפים לתומכים." : "Regular updates to supporters."}</li>
            </ul>
          </div>
        </section>
      </Container>
    </main>
  );
}

function AboutPage() {
  const { lang } = useLang();
  return (
    <main className="mt-10">
      <Container>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight"><T k="aboutTitle" /></h1>
            <p className="mt-4 text-gray-700">
              <T k="aboutP1" />
            </p>
            <h2 className="mt-8 text-xl font-semibold"><T k="objectives" /></h2>
            <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2">
              <li>{lang === "he" ? "איתור אתר מתאים והשלמת האישורים הדרושים." : "Secure a suitable relocation site && complete required approvals."}</li>
              <li>{lang === "he" ? "פיתוח דיור קבע ותשתיות קהילתיות חיוניות." : "Develop permanent housing && essential community infrastructure."}</li>
              <li>{lang === "he" ? "תמיכה בחינוך, שירותים חברתיים וחיים קהילתיים." : "Support education, social services, && communal life."}</li>
              <li>{lang === "he" ? "ניהול שקוף בשיתוף נציגי הקהילה." : "Ensure transparent governance with community participation."}</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold"><T k="projectPhases" /></h2>
            <ol className="mt-3 list-decimal list-inside text-gray-700 space-y-2">
              <li>{lang === "he" ? "מיפוי ותכנון: ניתוח צרכים, בחירת אתר, מפת רגולציה ותקציב." : <><span className="font-semibold">Assessment & Planning:</span> needs analysis, site selection, regulatory roadmap, budget.</>}</li>
              <li>{lang === "he" ? "תמיכת גישור: דיור זמני, תחבורה ושירותי בסיס." : <><span className="font-semibold">Bridge Support:</span> temporary housing, transportation, && basic services.</>}</li>
              <li>{lang === "he" ? "בנייה ומעבר: הקמת בתים ומתקנים; אכלוס מדורג." : <><span className="font-semibold">Build & Relocate:</span> permanent homes && facilities; phased move-in.</>}</li>
              <li>{lang === "he" ? "תוכניות קהילה: חוסן, נוער, תרבות ותעסוקה." : <><span className="font-semibold">Community Programs:</span> resilience, youth, culture, && livelihoods.</>}</li>
            </ol>

            <h2 className="mt-8 text-xl font-semibold"><T k="governance" /></h2>
            <p className="mt-2 text-gray-700">
              {lang === "he"
                ? "קאדה פועלת במסגרת ממוקדת-קהילה עם תפקידים ברורים לנציגים, יועצים מקצועיים וארגוני שותף. המדיניות נותנת עדיפות לבטיחות, הכלה ושקיפות."
                : "KADA operates under a community-centered framework with clear roles for representatives, professional advisors, && partner organizations. Policies prioritize safety, inclusion, && accountability."}
            </p>
          </div>
          <aside className="space-y-4">
            <div className="rounded-3xl border p-5">
              <h3 className="font-semibold"><T k="contact" /></h3>
              <ul className="mt-2 text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> <ActionLink kind="mailto" value={ORG.email}>{ORG.email}</ActionLink></li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> <ActionLink kind="tel" value={ORG.phone}>{ORG.phone}</ActionLink></li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {ORG.address}</li>
              </ul>
            </div>
            <div className="rounded-3xl border p-5">
              <h3 className="font-semibold"><T k="keyDocs" /></h3>
              <ul className="mt-2 text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li><SafeLink to="/placeholder" className="underline">{lang === "he" ? "תקציר מנהלים (PDF)" : "Executive Summary (PDF)"}</SafeLink></li>
                <li><SafeLink to="/placeholder" className="underline">{lang === "he" ? "תקציב מסכם" : "Budget Overview"}</SafeLink></li>
                <li><SafeLink to="/placeholder" className="underline">{lang === "he" ? "שאלות ותשובות לשותפים" : "FAQ for Partners"}</SafeLink></li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}

function DonateCard({ title, children, cta, href }) {
  const { navigate } = useRouter();
  const isInternal = typeof href === "string" && href.startsWith("/");
  const isExternal = typeof href === "string" && /^https?:\\/\\//i.test(href);
  return (
    <div className="rounded-3xl border p-6 bg-white">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="mt-2 text-sm text-gray-700 space-y-2">{children}</div>
      {isInternal && (
        <button
          type="button"
          role="link"
          onClick={() => navigate(href)}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          {cta || "Donate"} <ArrowRight className="w-4 h-4" />
        </button>
      )}
      {isExternal && (
        <ExternalLinkButton
          href={href}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-black text-white px-4 py-2 text-sm font-semibold hover:opacity-90"
        >
          {cta || "Donate"} <ArrowRight className="w-4 h-4" />
        </ExternalLinkButton>
      )}
    </div>
  );
}

function DonatePage() {
  const { lang } = useLang();
  const dict = i18n[lang] || i18n.en;
  const [openFAQ, setOpenFAQ] = useState(null);
  const faqs = [
    { q: dict.faq1q, a: dict.faq1a },
    { q: dict.faq2q, a: dict.faq2a },
    { q: dict.faq3q, a: dict.faq3a },
  ];

  return (
    <main className="mt-10">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight"><T k="supportKADA" /></h1>
          <p className="mt-4 text-gray-700">
            <T k="supportKADAP" />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <DonateCard title={<T k="giveOnlinePrimary" />} href={DONATION_CONFIG.donateUrlPrimary} cta={<T k="donateOnline" />}>

            <p>
              {lang === "he"
                ? "תרומה מאובטחת דרך מעבד התרומות הראשי. ניתן לבצע תרומה חד-פעמית או חודשית."
                : "Secure online giving through our primary donation processor. You can make a one-time or monthly gift."}
            </p>
          </DonateCard>

          <DonateCard title={<T k="bankTransfer" />}>

            <ul className="list-disc list-inside">
              <li><span className="font-medium">{lang === "he" ? "שם חשבון:" : "Account name:"}</span> {DONATION_CONFIG.bankWire.accountName}</li>
              <li><span className="font-medium">{lang === "he" ? "בנק:" : "Bank:"}</span> {DONATION_CONFIG.bankWire.bankName}</li>
              <li><span className="font-medium">{lang === "he" ? "סניף:" : "Branch:"}</span> {DONATION_CONFIG.bankWire.branch}</li>
              <li><span className="font-medium">{lang === "he" ? "מס' חשבון:" : "Account #:"}</span> {DONATION_CONFIG.bankWire.accountNumber}</li>
              <li><span className="font-medium">IBAN:</span> {DONATION_CONFIG.bankWire.iban}</li>
              <li><span className="font-medium">SWIFT:</span> {DONATION_CONFIG.bankWire.swift}</li>
            </ul>
            <p className="text-gray-600 text-sm">{DONATION_CONFIG.bankWire.note}</p>
          </DonateCard>

          <DonateCard title={<T k="unitedStates" />} href={DONATION_CONFIG.us501c3.partnerUrl} cta={`${lang === "he" ? "תרומה דרך" : "Give via"} ${DONATION_CONFIG.us501c3.partnerName || (lang === "he" ? "שותף בארה״ב" : "U.S. partner")}`}>

            <p>{DONATION_CONFIG.us501c3.instructions}</p>
          </DonateCard>

          <DonateCard title={<T k="canada" />} href={DONATION_CONFIG.canada.partnerUrl} cta={`${lang === "he" ? "תרומה דרך" : "Give via"} ${DONATION_CONFIG.canada.partnerName || (lang === "he" ? "שותף בקנדה" : "Canadian partner")}`}>

            <p>{DONATION_CONFIG.canada.instructions}</p>
          </DonateCard>

          <DonateCard title={<T k="unitedKingdom" />} href={DONATION_CONFIG.uk.partnerUrl} cta={`${lang === "he" ? "תרומה דרך" : "Give via"} ${DONATION_CONFIG.uk.partnerName || (lang === "he" ? "שותף בבריטניה" : "UK partner")}`}>

            <p>{DONATION_CONFIG.uk.instructions}</p>
          </DonateCard>
        </div>

        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold"><T k="faqs" /></h2>
          <div className="mt-4 divide-y rounded-2xl border">
            {faqs.map((f, idx) => (
              <button
                key={idx}
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full text-left p-4 hover:bg-gray-50"
                aria-expanded={openFAQ === idx}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{f.q}</span>
                  <span className="text-sm text-gray-500">{openFAQ === idx ? "–" : "+"}</span>
                </div>
                {openFAQ === idx && <p className="mt-2 text-sm text-gray-700">{f.a}</p>}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border p-6">
          <h2 className="text-xl font-semibold"><T k="talkFirst" /></h2>
          <p className="mt-2 text-gray-700">
            <T k="talkFirstP" />
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <ActionLink kind="mailto" value={ORG.email}>{ORG.email}</ActionLink>
            <span className="text-gray-400">•</span>
            <ActionLink kind="tel" value={ORG.phone}>{ORG.phone}</ActionLink>
          </div>
        </section>
      </Container>
    </main>
  );
}

function DonateOnlinePage() {
  const { lang } = useLang();
  const { navigate } = useRouter();
  return (
    <main className="mt-10">
      <Container>
        <div className="rounded-3xl border p-6 bg-white">
          <h1 className="text-2xl font-semibold">{lang === "he" ? "תרומה מקוונת" : "Online Donation"}</h1>
          <p className="mt-2 text-gray-700">
            {lang === "he"
              ? "כאן יופיע טופס התרומה המאובטח. ניתן להחליף מסך זה בקישור חיצוני לספק התרומות שלכם."
              : "This is a placeholder for the secure donation form. Replace this with your external processor or embed when ready."}
          </p>
          <div className="mt-4">
            <button onClick={() => navigate('/donate')} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50">
              <ArrowRight className="w-4 h-4" /> {lang === "he" ? "חזרה לעמוד התרומה" : "Back to Donate"}
            </button>
          </div>
        </div>
      </Container>
    </main>
  );
}

function PlaceholderPage() {
  const { lang } = useLang();
  const { navigate } = useRouter();
  return (
    <main className="mt-10">
      <Container>
        <div className="rounded-3xl border p-6 bg-white">
          <h1 className="text-2xl font-semibold">{lang === "he" ? "דף בהכנה" : "Placeholder"}</h1>
          <p className="mt-2 text-gray-700">{lang === "he" ? "דף זה יתווסף בהמשך." : "This page will be added soon."}</p>
          <button onClick={() => navigate('/donate')} className="mt-4 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50">
            <ArrowRight className="w-4 h-4" /> {lang === "he" ? "חזרה לתרומה" : "Back to Donate"}
          </button>
        </div>
      </Container>
    </main>
  );
}

// ---------------------- App Shell + In-memory Router -----------------------
function AppShell() {
  const [lang, setLang] = useState("en");
  const [route, setRoute] = useState("/");
  const rtl = lang === "he";

  // Self-tests (run once at mount) — no URL parsing required
  useEffect(() => {
    try {
      // Assert there are no anchors
      const anchors = Array.from(document.querySelectorAll('a'));
      console.assert(anchors.length === 0, `Expected 0 anchors, found: ${anchors.map(a=>a.getAttribute('href')).join(', ')}`);

      // Partner URLs must be absolute https
      [DONATION_CONFIG.us501c3.partnerUrl, DONATION_CONFIG.canada.partnerUrl, DONATION_CONFIG.uk.partnerUrl].forEach((u) => {
        console.assert(/^https:\\/\\//.test(u), 'partner URL must be absolute https');
      });

      // ActionLink buttons (mailto/tel) expose sanitized values
      setTimeout(() => {
        const mailBtn = document.querySelector('button[data-kind="mailto"]');
        const telBtn = document.querySelector('button[data-kind="tel"]');
        console.assert(mailBtn && /@/.test(mailBtn.getAttribute('data-value')||''), 'mailto value missing or invalid');
        console.assert(telBtn && /^\\+?[0-9]{6,}$/.test(telBtn.getAttribute('data-value')||''), 'tel value missing or invalid');
      }, 0);
    } catch (e) {
      console.warn('Self-tests warning:', e);
    }
  }, []);

  const navigate = (to) => {
    // Only allow known routes
    const allowed = ["/", "/about", "/donate", "/donate-online", "/placeholder"];
    setRoute(allowed.includes(to) ? to : "/");
  };

  const routerValue = { route, navigate };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <RouterContext.Provider value={routerValue}>
        <div
          className={`min-h-screen bg-white text-gray-900 ${rtl ? "[direction:rtl]" : "[direction:ltr]"}`}
          dir={rtl ? "rtl" : "ltr"}
          data-app-root="true"
        >
          <SiteHeader />
          {route === "/" && <HomePage />}
          {route === "/about" && <AboutPage />}
          {route === "/donate" && <DonatePage />}
          {route === "/donate-online" && <DonateOnlinePage />}
          {route === "/placeholder" && <PlaceholderPage />}
          <SiteFooter />
        </div>
      </RouterContext.Provider>
    </LangContext.Provider>
  );
}

export default function App() {
  return <AppShell />;
}
