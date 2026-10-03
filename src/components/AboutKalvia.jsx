import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { aboutKalvia } from '@/data/homepageContent';

// Line icons in the site's 1.6-stroke language, one per "why Kalvia" box. Placeholder
// set — swap for real brand icons when supplied.
const ICONS = {
  laser: (
    // laser beam hitting a sheet
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <path d="M12 3v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 6.5 12 12l3.5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15.5h16M4 19.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12.5" r="1.4" fill="currentColor" />
    </svg>
  ),
  design: (
    // pen nib + ruler
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <path d="m4 20 4.5-1.2L19 8.3a2 2 0 0 0 0-2.8l-.5-.5a2 2 0 0 0-2.8 0L5.2 15.5 4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m13.5 7.3 3.2 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    // shield with check
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <path d="M12 3.5 5 6v5.5c0 4.2 2.8 7.5 7 9 4.2-1.5 7-4.8 7-9V6l-7-2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  speed: (
    // stopwatch
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <circle cx="12" cy="13.5" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9.5v4l2.6 1.6M10 3.5h4M12 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  sparkle: (
    // four-point sparkle
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18.5 15.5v4M16.5 17.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export default function AboutKalvia() {
  const { t } = useLanguage();
  const { title, paragraph, image, boxes } = aboutKalvia;
  const [open, setOpen] = useState(-1);

  return (
    <section className="about-kw container" id="hakkimizda">
      <div className="about-kw__top" data-reveal>
        <div className="about-kw__figure">
          <div className="about-kw__image-wrap">
            <Image src={image} alt="Kalvia Woods atölyesi (yer tutucu görsel)" fill sizes="(max-width: 900px) 100vw, 55vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="about-kw__copy">
          <h2 className="about-kw__title">{t(title)}</h2>
          <p className="about-kw__paragraph">{t(paragraph)}</p>
        </div>
      </div>

      <div className="about-kw__acc" data-has-open={open >= 0 ? "" : undefined} data-reveal>
        {boxes.map((box, i) => {
          const isOpen = open === i;
          return (
            <div className={`about-kw__item${isOpen ? ' is-open' : ''}`} key={box.icon}>
              <h3 className="about-kw__item-head">
                <button
                  type="button"
                  className="about-kw__trigger"
                  id={`about-acc-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`about-acc-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="about-kw__box-icon" aria-hidden="true">
                    {ICONS[box.icon]}
                  </span>
                  {/* Desktop only, while no strip is open: photo preview above the title. */}
                  <span className="about-kw__thumb" aria-hidden="true">
                    <Image src={box.image} alt="" fill sizes="240px" style={{ objectFit: 'cover' }} />
                  </span>
                  <span className="about-kw__stat">{t(box.eyebrow)}</span>
                  <span className="about-kw__chevron" aria-hidden="true" />
                </button>
              </h3>
              <div
                className="about-kw__panel"
                id={`about-acc-panel-${i}`}
                role="region"
                aria-labelledby={`about-acc-btn-${i}`}
              >
                <div className="about-kw__panel-inner">
                  <div className="about-kw__panel-text">
                    <p className="about-kw__box-info">{t(box.info)}</p>
                    <ul className="about-kw__points">
                      {box.points.map((point, k) => (
                        <li key={k}>{t(point)}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="about-kw__box-image" aria-hidden="true">
                    <Image src={box.image} alt="" fill sizes="(max-width: 900px) 90vw, 30vw" style={{ objectFit: 'cover' }} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
