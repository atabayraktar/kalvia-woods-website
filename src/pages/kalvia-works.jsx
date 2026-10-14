import Head from 'next/head';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { kalviaWorks as kw } from '@/data/kalviaWorksContent';
import Surface from '@/components/Surface';
import useScrollReveal from '@/hooks/useScrollReveal';

const SITE_URL = 'https://kalviawoods.example';
const TITLE = 'Kalvia Works | Duvar Paneli, Lambri ve Cephe Kaplama — Çanakkale';
const DESCRIPTION =
  'Kalvia Works, Kalvia Woods’un kardeş markası: Çanakkale’de ev dekorasyonu için duvar paneli, lambri, akustik panel ve cephe kaplama uygulaması. Ücretsiz keşif.';

const waLink = (message) => `${kw.whatsappHref}?text=${encodeURIComponent(message)}`;

const BREADCRUMB_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Kalvia Works', item: `${SITE_URL}/kalvia-works` },
  ],
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: kw.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q.tr,
    acceptedAnswer: { '@type': 'Answer', text: item.a.tr },
  })),
};

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  phone: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

export default function KalviaWorksPage() {
  const { t } = useLanguage();
  useScrollReveal();
  const { hero, statement, services, projects, process, faq, contact } = kw;

  const infoRows = [
    { icon: 'phone', label: 'Telefon', value: kw.phoneDisplay, href: `tel:${kw.phone.replace(/\s/g, '')}` },
    { icon: 'mail', label: 'E-posta', value: kw.email, href: `mailto:${kw.email}` },
    { icon: 'instagram', label: 'Instagram', value: kw.instagramHandle, href: kw.instagramHref, external: true },
    { icon: 'pin', label: 'Adres', value: kw.address, note: t(kw.hours) },
  ];

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/kalvia-works`} />
        <link rel="alternate" hrefLang="tr" href={`${SITE_URL}/kalvia-works`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/kalvia-works`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kalvia Woods" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/kalvia-works`} />
        <meta property="og:image" content={`${SITE_URL}${hero.imageMain}`} />
        <meta property="og:locale" content="tr_TR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      </Head>

      <main id="main-content" className="kw-page">
        {/* Opening spread: oversized two-line title against an overlapping pair of prints. */}
        <section className="kw-hero">
          <div className="kw-hero__inner container">
            <div className="kw-hero__copy">
              <span className="kw-hero__stamp">{t(hero.stamp)}</span>
              <h1 className="kw-hero__title">
                <span>{hero.titleTop}</span>
                <span className="kw-hero__title-indent">{hero.titleBottom}</span>
              </h1>
              <p className="kw-hero__lead">{t(hero.lead)}</p>
              <p className="kw-hero__text">{t(hero.text)}</p>
              <div className="kw-hero__actions">
                <Surface
                  as="a"
                  href={waLink(hero.ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface--cta"
                  contentClassName="kw-btn"
                >
                  <span className="btn__label">{t(hero.cta)}</span>
                  {ARROW}
                </Surface>
                <a className="kw-link" href={kw.siteHref} target="_blank" rel="noopener noreferrer">
                  {t(hero.secondary)} ↗
                </a>
              </div>
            </div>

            <div className="kw-hero__prints">
              <figure className="kw-hero__print kw-hero__print--main">
                <Image src={hero.imageMain} alt={t(hero.imageMainAlt)} fill priority sizes="(max-width: 900px) 70vw, 32vw" style={{ objectFit: 'cover' }} />
              </figure>
              <figure className="kw-hero__print kw-hero__print--second">
                <Image src={hero.imageSecond} alt={t(hero.imageSecondAlt)} fill sizes="(max-width: 900px) 46vw, 20vw" style={{ objectFit: 'cover' }} />
              </figure>
              <span className="kw-hero__caption">{t(hero.caption)}</span>
            </div>
          </div>
        </section>

        {/* Pull quote on the tinted paper. */}
        <section className="kw-statement">
          <div className="container kw-statement__inner" data-reveal>
            <blockquote className="kw-statement__quote">{t(statement.quote)}</blockquote>
            <div className="kw-statement__side">
              <p>{t(statement.text)}</p>
              <span className="kw-statement__motto">{t(statement.motto)}</span>
            </div>
          </div>
        </section>

        {/* Services: a ruled index, each entry a big typewriter term with its note. */}
        <section className="kw-services container">
          <div className="kw-services__head" data-reveal>
            <h2>{t(services.title)}</h2>
            <p>{t(services.intro)}</p>
          </div>
          <ul className="kw-services__list">
            {services.items.map((item) => (
              <li className="kw-services__row" key={item.title.tr} data-reveal>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects: asymmetric contact-sheet, prints at mixed sizes and offsets. */}
        <section className="kw-projects">
          <div className="container">
            <div className="kw-projects__head" data-reveal>
              <h2>{t(projects.title)}</h2>
              <p>{t(projects.intro)}</p>
            </div>
            <div className="kw-projects__grid">
              {projects.items.map((item) => (
                <figure className={`kw-project kw-project--${item.key}`} key={item.key} data-reveal>
                  <div className="kw-project__photo">
                    <Image
                      src={item.image}
                      alt={`${t(item.title)} — Kalvia Works uygulaması`}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 767px) 86vw, 40vw"
                    />
                  </div>
                  <figcaption>
                    <span className="kw-project__tag">{t(item.tag)}</span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.text)}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Work order: one ruled strip, four stops. */}
        <section className="kw-process container">
          <h2 className="kw-process__title" data-reveal>{t(process.title)}</h2>
          <ol className="kw-process__strip" data-reveal>
            {process.steps.map((step) => (
              <li key={step.title.tr}>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="kw-faq container">
          <h2 className="kw-faq__title" data-reveal>{t(faq.title)}</h2>
          <div className="kw-faq__list" data-reveal>
            {faq.items.map((item) => (
              <details className="kw-faq__item" key={item.q.tr}>
                <summary>
                  <span>{t(item.q)}</span>
                  <span className="kw-faq__chevron" aria-hidden="true" />
                </summary>
                <p>{t(item.a)}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact: same ledger language as the home page's contact section. */}
        <section className="kw-contact">
          <div className="container">
            <div className="kw-contact__head" data-reveal>
              <h2>{t(contact.title)}</h2>
              <div className="kw-contact__side">
              <p>{t(contact.text)}</p>
              <div className="kw-contact__actions">
                <Surface
                  as="a"
                  href={waLink(contact.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface--cta"
                  contentClassName="kw-btn"
                >
                  <span className="btn__label">{t(contact.whatsapp)}</span>
                  {ARROW}
                </Surface>
                <a className="kw-link" href={kw.siteHref} target="_blank" rel="noopener noreferrer">
                  {t(contact.site)} ↗
                </a>
              </div>
              </div>
            </div>
            <ul className="kw-contact__ledger" data-reveal>
              {infoRows.map((row) => {
                const body = (
                  <>
                    <span className="kw-contact__icon">{ICONS[row.icon]}</span>
                    <span className="kw-contact__label">{row.label}</span>
                    <span className="kw-contact__value">{row.value}</span>
                    {row.note && <span className="kw-contact__note">{row.note}</span>}
                  </>
                );
                return (
                  <li key={row.label}>
                    {row.href ? (
                      <a
                        className="kw-contact__entry"
                        href={row.href}
                        {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="kw-contact__entry">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
