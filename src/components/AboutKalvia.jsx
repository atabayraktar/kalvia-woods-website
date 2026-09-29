import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { aboutKalvia } from '@/data/homepageContent';
import Surface from './Surface';

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
  material: (
    // two stacked sheets (wood + PVC)
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <path d="m12 4 8 4.5-8 4.5-8-4.5L12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m4 13.5 8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  speed: (
    // stopwatch
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <circle cx="12" cy="13.5" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9.5v4l2.6 1.6M10 3.5h4M12 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  workshop: (
    // workshop roof + door
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
      <path d="M3.5 10.5 12 4l8.5 6.5V20h-17v-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 20v-6h5v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
};

export default function AboutKalvia() {
  const { t } = useLanguage();
  const { title, paragraph, image, boxes } = aboutKalvia;

  return (
    <section className="about-kw container" id="hakkimizda">
      <div className="about-kw__top" data-reveal>
        <div className="about-kw__image-wrap">
          <Image src={image} alt="Kalvia Woods atölyesi (yer tutucu görsel)" fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="about-kw__copy">
          <h2 className="about-kw__title">{t(title)}</h2>
          <p className="about-kw__paragraph">{t(paragraph)}</p>
        </div>
      </div>

      <div className="about-kw__boxes">
        {boxes.map((box) => (
          <Surface
            as="div"
            className="about-kw__box surface--calm"
            contentClassName="about-kw__box-content"
            key={box.icon}
            data-reveal
          >
            <div className="about-kw__box-head">
              <span className="about-kw__stat accent-hover">{t(box.eyebrow)}</span>
              <span className="about-kw__box-icon" aria-hidden="true">
                {ICONS[box.icon]}
              </span>
            </div>
            <p className="about-kw__box-info">{t(box.info)}</p>
          </Surface>
        ))}
      </div>
    </section>
  );
}
