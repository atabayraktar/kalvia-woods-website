import Head from 'next/head';
import HeroSlider from '@/components/HeroSlider';
import CategorySlider from '@/components/CategorySlider';
import AboutKalvia from '@/components/AboutKalvia';
import CustomOrderBanner from '@/components/CustomOrderBanner';
import ContactSection from '@/components/ContactSection';
import useScrollReveal from '@/hooks/useScrollReveal';
import { contactSection } from '@/data/homepageContent';

// Placeholder domain — replace with the real one before launch (also in
// scripts/generate-seo-files.mjs and the other two page files).
const SITE_URL = 'https://kalviawoods.example';
const TITLE = 'Kalvia Woods';
const TAB_TITLE = 'Kalvia Woods | Kişiye Özel Lazer Kesim';
const DESCRIPTION =
  'Kalvia Woods, kişiye özel lazer kesim ürünler üreten bir atölyedir. Hobi ve boya istasyonları, makyaj organizerleri, dekoratif aynalar ve duvar tabloları; isteğe göre ölçü, renk ve yazı.';

const TICKER_WORDS = ['Lazer kesim', 'Kişiye özel', 'Organizer', 'Ayna', 'Duvar tablosu', 'Hobi & boya', 'Hediyelik', 'Milimetrik hassasiyet'];

// Same placeholder handles ContactSection.jsx renders on the page.
const SOCIAL_LINKS = [contactSection.instagramHref];

// Kalvia Woods is its own manufacturer — plain Organization/LocalBusiness, no parent or
// distributor relationship.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kalvia Woods',
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  sameAs: [...SOCIAL_LINKS, contactSection.whatsappHref],
  areaServed: 'TR',
  description: 'Kalvia Woods, kişiye özel lazer kesim ürünler üreten bir atölyedir.',
};

const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Kalvia Woods',
  telephone: contactSection.phone,
  url: SITE_URL,
  image: `${SITE_URL}/images/placeholder-og.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Barbaros Mah. Kıbrıs Sk. No: 21 D:1',
    addressLocality: 'Çanakkale',
    addressCountry: 'TR',
  },
  hasMap: contactSection.mapHref,
  areaServed: 'TR',
  sameAs: SOCIAL_LINKS,
};

const BREADCRUMB_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Anasayfa',
      item: SITE_URL,
    },
  ],
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kalvia Woods nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kalvia Woods, lazer kesim teknolojisiyle kişiye özel ürünler üreten bir atölyedir; organizerlar, aynalar, duvar tabloları ve isteğe göre ölçü, renk ve yazı uygulanmış özel işler üretir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kalvia Woods ürünleri hakkında nasıl bilgi alabilirim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Ürün sayfalarındaki "WhatsApp ile Bilgi Al" butonu üzerinden veya ${contactSection.phone} numarasından Kalvia Woods ekibiyle doğrudan iletişime geçebilirsiniz.`,
      },
    },
  ],
};

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <Head>
        <title>{TAB_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        {/* The first slide's poster is the LCP candidate for a <video> — preload it. */}
        <link rel="preload" as="image" href="/images/placeholder-hero-1.webp" fetchpriority="high" />
        <link rel="alternate" hrefLang="tr" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kalvia Woods" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/images/placeholder-og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kalvia Woods" />
        <meta property="og:locale" content="tr_TR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/placeholder-og.png`} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      </Head>

      <main id="main-content">
        <HeroSlider />
        {/* Decorative ticker band — purely visual, hidden from assistive tech. */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[0, 1, 2, 3].map((copy) => (
              <ul className="ticker__list" key={copy}>
                {TICKER_WORDS.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <CategorySlider />
        <AboutKalvia />
        <CustomOrderBanner />
        <ContactSection />
      </main>
    </>
  );
}
