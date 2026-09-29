import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { customOrderBanner } from '@/data/homepageContent';
import Surface from './Surface';
import QuizModal from './QuizModal';

// Full-width banner (title + button over a wide image). The button opens the product-finder
// quiz pop-up (QuizModal.jsx) — a solid panel over a dimmed backdrop.
export default function CustomOrderBanner() {
  const { t } = useLanguage();
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <section className="order-banner">
      <div className="order-banner__frame" data-reveal>
        {/* Portrait crop for mobile, plain CSS breakpoint swap — see CustomOrderBanner.scss. */}
        {customOrderBanner.mobileImage && (
          <Image
            src={customOrderBanner.mobileImage}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="order-banner__image-mobile"
            style={{ objectFit: 'cover' }}
          />
        )}
        <Image
          src={customOrderBanner.image}
          alt="Kalvia Woods lazer kesim atölyesi (yer tutucu görsel)"
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          className={customOrderBanner.mobileImage ? 'order-banner__image-desktop' : undefined}
          style={{ objectFit: 'cover' }}
        />
        <Surface as="div" className="order-banner__panel surface--calm" contentClassName="order-banner__panel-content">
          <h2 className="order-banner__title">{t(customOrderBanner.title)}</h2>
          <Surface
            as="button"
            type="button"
            className="order-banner__cta surface--cta"
            contentClassName="order-banner__cta-content"
            onClick={() => setQuizOpen(true)}
            aria-haspopup="dialog"
          >
            <span className="btn__label">{t(customOrderBanner.cta)}</span>
          </Surface>
        </Surface>
      </div>

      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  );
}
