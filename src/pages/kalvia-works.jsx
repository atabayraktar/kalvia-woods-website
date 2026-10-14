import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { kalviaWorks as kw } from '@/data/kalviaWorksContent';
import Surface from '@/components/Surface';
import KalviaEmblem from '@/components/KalviaEmblem';
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
  whatsapp: (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.02 4C9.4 4 4 9.37 4 15.98c0 2.15.57 4.15 1.56 5.9L4 28l6.28-1.53a11.9 11.9 0 0 0 5.74 1.46h.01c6.62 0 12.01-5.37 12.01-11.98C28.04 9.37 22.65 4 16.02 4Zm0 21.6h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.75.92 1-3.66-.24-.38a9.86 9.86 0 0 1-1.53-5.3c0-5.47 4.46-9.92 9.95-9.92 2.66 0 5.15 1.03 7.03 2.9a9.85 9.85 0 0 1 2.91 7.03c0 5.47-4.46 9.92-9.95 10Z"
      />
      <path
        fill="currentColor"
        d="M22.4 18.68c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.37.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.22.05-.4-.03-.56-.08-.16-.72-1.75-.99-2.4-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.31 3.32.16.22 2.26 3.46 5.49 4.85.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.29-.22-.61-.38Z"
      />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

export default function KalviaWorksPage() {
  const { t } = useLanguage();
  useScrollReveal();
  const [activeService, setActiveService] = useState(0);
  const { hero, statement, services, projects, process, faq, contact } = kw;

  const channels = [
    { icon: 'phone', label: 'Telefon', value: kw.phoneDisplay, href: `tel:${kw.phone.replace(/\s/g, '')}` },
    { icon: 'mail', label: 'E-posta', value: kw.email, href: `mailto:${kw.email}` },
    { icon: 'instagram', label: 'Instagram', value: kw.instagramHandle, href: kw.instagramHref, external: true },
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
        {/* Opening spread: the emblem + wordmark lockup against an overlapping pair of prints. */}
        <section className="kw-hero">
          <div className="kw-hero__inner container">
            <div className="kw-hero__copy">
              <span className="kw-hero__stamp">{t(hero.stamp)}</span>
              <h1 className="kw-hero__lockup">
                <KalviaEmblem className="kw-hero__emblem" />
                <span className="kw-hero__wordmark">{hero.wordmark}</span>
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

        {/* Statement: a print on the left, an editorial pull quote on the right. */}
        <section className="kw-statement">
          <div className="container kw-statement__inner">
            <figure className="kw-statement__print" data-reveal>
              <div className="kw-statement__photo">
                <Image src={statement.image} alt={t(statement.imageAlt)} fill sizes="(max-width: 900px) 80vw, 30vw" style={{ objectFit: 'cover' }} />
              </div>
              <figcaption>{t(statement.imageCaption)}</figcaption>
            </figure>

            <div className="kw-statement__body" data-reveal>
              <span className="kw-statement__mark" aria-hidden="true">“</span>
              <blockquote className="kw-statement__quote">{t(statement.quote)}</blockquote>
              <p className="kw-statement__attribution">{t(statement.attribution)}</p>
              <p className="kw-statement__text">{t(statement.text)}</p>
              <ul className="kw-statement__pillars">
                {statement.pillars.map((pillar) => (
                  <li key={pillar.word.tr}>
                    <strong>{t(pillar.word)}</strong>
                    <span>{t(pillar.note)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Services: big terms on the left, a sticky print on the right that follows the pointer. */}
        <section className="kw-services container">
          <div className="kw-services__head" data-reveal>
            <span className="kw-eyebrow">{t(services.eyebrow)}</span>
            <h2>{t(services.title)}</h2>
            <p>{t(services.intro)}</p>
          </div>

          <div className="kw-services__body">
            <ul className="kw-services__list">
              {services.items.map((item, i) => (
                <li
                  className={`kw-services__row${activeService === i ? ' is-active' : ''}`}
                  key={item.title.tr}
                  onMouseEnter={() => setActiveService(i)}
                  data-reveal
                >
                  <div className="kw-services__thumb">
                    <Image src={item.image} alt={t(item.alt)} width={item.width} height={item.height} sizes="(max-width: 700px) 30vw, 0px" />
                  </div>
                  <div className="kw-services__text">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.text)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="kw-services__stage" aria-hidden="true">
              <div className="kw-services__frame">
                {services.items.map((item, i) => (
                  <Image
                    key={item.image}
                    className={activeService === i ? 'is-active' : undefined}
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 0px, 34vw"
                    style={{ objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects: asymmetric contact-sheet, prints at mixed sizes and offsets. */}
        <section className="kw-projects">
          <div className="container">
            <div className="kw-projects__head" data-reveal>
              <div className="kw-projects__title">
                <span className="kw-eyebrow">{t(projects.label)}</span>
                <h2>
                  <span>{t(projects.titleTop)}</span>
                  <em>{t(projects.titleBottom)}</em>
                </h2>
              </div>
              <div className="kw-projects__aside">
                <p>{t(projects.intro)}</p>
                <a className="kw-link" href={waLink(projects.ctaMessage)} target="_blank" rel="noopener noreferrer">
                  {t(projects.cta)} ↗
                </a>
              </div>
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

        {/* FAQ: a sticky aside with a quick way out on the left, the answers on the right. */}
        <section className="kw-faq container">
          <aside className="kw-faq__aside" data-reveal>
            <h2 className="kw-faq__title">{t(faq.title)}</h2>
            <p className="kw-faq__intro">{t(faq.intro)}</p>
            <Surface
              as="a"
              href={waLink(faq.ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="surface--cta kw-faq__cta"
              contentClassName="kw-btn"
            >
              <span className="btn__label">{t(faq.cta)}</span>
              {ARROW}
            </Surface>
            <figure className="kw-faq__print">
              <div className="kw-faq__photo">
                <Image src={faq.image} alt={t(faq.imageAlt)} fill sizes="(max-width: 900px) 90vw, 28vw" style={{ objectFit: 'cover' }} />
              </div>
              <figcaption>{t(faq.imageCaption)}</figcaption>
            </figure>
          </aside>
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

        {/* Contact: the promise up front, channels as one ruled card. */}
        <section className="kw-contact">
          <div className="container kw-contact__inner">
            <div className="kw-contact__lead" data-reveal>
              <h2>{t(contact.title)}</h2>
              <p className="kw-contact__promise">
                <span>{t(contact.promiseTop)}</span>
                <em>{t(contact.promiseBottom)}</em>
              </p>
              <p className="kw-contact__note">{t(contact.note)}</p>
              <div className="kw-contact__actions">
                <Surface
                  as="a"
                  href={waLink(contact.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface--cta"
                  contentClassName="kw-btn"
                >
                  <span className="kw-contact__wa-icon">{ICONS.whatsapp}</span>
                  <span className="btn__label">{t(contact.whatsapp)}</span>
                </Surface>
                <a className="kw-link" href={kw.siteHref} target="_blank" rel="noopener noreferrer">
                  {t(contact.site)} ↗
                </a>
              </div>
            </div>

            <div className="kw-contact__card" data-reveal>
              <ul className="kw-contact__channels">
                {channels.map((row) => (
                  <li key={row.label}>
                    <a
                      className="kw-contact__channel"
                      href={row.href}
                      {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="kw-contact__icon">{ICONS[row.icon]}</span>
                      <span className="kw-contact__channel-text">
                        <span className="kw-contact__label">{row.label}</span>
                        <span className="kw-contact__value">{row.value}</span>
                      </span>
                      <span className="kw-contact__go" aria-hidden="true">{ARROW}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="kw-contact__atelier">
                <span className="kw-contact__icon">{ICONS.pin}</span>
                <div>
                  <span className="kw-contact__label">{t(contact.atelier)}</span>
                  <address className="kw-contact__address">{kw.address}</address>
                  <p className="kw-contact__hours">{t(kw.hours)}</p>
                  <a className="kw-link" href={contact.mapHref} target="_blank" rel="noopener noreferrer">
                    {t(contact.mapLabel)} ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
