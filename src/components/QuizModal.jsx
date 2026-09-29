import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import usePresence from '@/hooks/usePresence';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { useLanguage } from '@/context/LanguageContext';
import Surface from './Surface';

// PLACEHOLDER product-finder quiz. Three questions narrow the visitor down to one of the
// placeholder products or a category on /urunler. Questions, options and the routing
// table below are sample logic pending real Kalvia Woods copy — keep the structure, swap
// the content. Opens as a solid Surface panel over a dimmed (not blurred) backdrop.
const TEXT = {
  title: { tr: 'Ürün seçim anketi', en: 'Product finder', de: 'Produktfinder' },
  step: { tr: (i, n) => `Soru ${i} / ${n}`, en: (i, n) => `Question ${i} of ${n}`, de: (i, n) => `Frage ${i} von ${n}` },
  back: { tr: 'Geri', en: 'Back', de: 'Zurück' },
  close: { tr: 'Kapat', en: 'Close', de: 'Schließen' },
  restart: { tr: 'Baştan başla', en: 'Start over', de: 'Neu starten' },
  resultTitle: { tr: 'Size önerimiz', en: 'Our suggestion', de: 'Unsere Empfehlung' },
  resultCta: { tr: 'Ürüne git', en: 'View product', de: 'Zum Produkt' },
  resultCategoryCta: { tr: 'Kategoriyi gör', en: 'Browse category', de: 'Kategorie ansehen' },
  note: {
    tr: 'Bu anket örnek amaçlıdır; gerçek ürün eşleştirme mantığı henüz tanımlanmadı.',
    en: 'This quiz is a placeholder; the real product-matching logic has not been defined yet.',
    de: 'Dieser Fragebogen ist ein Platzhalter; die echte Produktzuordnung ist noch nicht definiert.',
  },
};

const QUESTIONS = [
  {
    id: 'material',
    prompt: { tr: 'Hangi malzemeyi tercih edersiniz?', en: 'Which material do you prefer?', de: 'Welches Material bevorzugen Sie?' },
    options: [
      { value: 'wood', label: { tr: 'Ahşap', en: 'Wood', de: 'Holz' } },
      { value: 'pvc', label: { tr: 'PVC', en: 'PVC', de: 'PVC' } },
      { value: 'any', label: { tr: 'Fark etmez', en: 'No preference', de: 'Egal' } },
    ],
  },
  {
    id: 'use',
    prompt: { tr: 'Ürünü nerede kullanacaksınız?', en: 'Where will you use it?', de: 'Wo werden Sie es verwenden?' },
    options: [
      { value: 'decor', label: { tr: 'Dekorasyon', en: 'Décor', de: 'Dekoration' } },
      { value: 'sign', label: { tr: 'Tabela / İşaret', en: 'Signage', de: 'Beschilderung' } },
      { value: 'gift', label: { tr: 'Hediye / Kutu', en: 'Gift / Box', de: 'Geschenk / Box' } },
    ],
  },
  {
    id: 'size',
    prompt: { tr: 'Yaklaşık ölçü?', en: 'Approximate size?', de: 'Ungefähre Größe?' },
    options: [
      { value: 'small', label: { tr: 'Küçük (30 cm altı)', en: 'Small (under 30 cm)', de: 'Klein (unter 30 cm)' } },
      { value: 'medium', label: { tr: 'Orta (30–60 cm)', en: 'Medium (30–60 cm)', de: 'Mittel (30–60 cm)' } },
      { value: 'custom', label: { tr: 'Özel ölçü', en: 'Custom size', de: 'Sondermaß' } },
    ],
  },
];

// Sample routing table — answers -> a product page or a pre-filtered category.
function recommend(answers) {
  if (answers.size === 'custom') {
    return {
      href: '/urunler?kategori=ozel-kesim',
      isCategory: true,
      title: { tr: 'Özel Kesim', en: 'Custom Cutting', de: 'Sonderanfertigung' },
      info: {
        tr: 'Özel ölçü ve tasarımlar için özel kesim kategorisine göz atın; ölçülerinizi WhatsApp üzerinden iletebilirsiniz.',
        en: 'For custom sizes and designs, browse the custom-cutting category; send us your measurements over WhatsApp.',
        de: 'Für Sondermaße und Designs sehen Sie sich die Kategorie Sonderanfertigung an; Maße gern per WhatsApp.',
      },
    };
  }
  if (answers.use === 'sign' || answers.material === 'pvc') {
    return {
      href: '/urunler/kw-pvc-tabela-001',
      isCategory: false,
      title: { tr: 'Lazer Kesim PVC Tabela', en: 'Laser-Cut PVC Sign', de: 'Lasergeschnittenes PVC-Schild' },
      info: {
        tr: 'Dayanıklı, su ve UV ışığına dirençli PVC tabela — iç ve dış mekân için.',
        en: 'A durable, water- and UV-resistant PVC sign for indoors and outdoors.',
        de: 'Ein langlebiges, wasser- und UV-beständiges PVC-Schild für innen und außen.',
      },
    };
  }
  if (answers.use === 'gift') {
    return {
      href: '/urunler?kategori=ahsap-kutu',
      isCategory: true,
      title: { tr: 'Ahşap Kutu', en: 'Wooden Boxes', de: 'Holzboxen' },
      info: {
        tr: 'Hediye ve saklama için lazer kesim ahşap kutular.',
        en: 'Laser-cut wooden boxes for gifting and storage.',
        de: 'Lasergeschnittene Holzboxen zum Verschenken und Aufbewahren.',
      },
    };
  }
  return {
    href: '/urunler/kw-ahsap-dekor-001',
    isCategory: false,
    title: { tr: 'Lazer Kesim Ahşap Duvar Panosu', en: 'Laser-Cut Wooden Wall Panel', de: 'Lasergeschnittenes Holz-Wandpaneel' },
    info: {
      tr: 'Geometrik desenli, huş kontrplaktan kesilmiş dekoratif duvar panosu.',
      en: 'A decorative geometric wall panel cut from birch plywood.',
      de: 'Ein dekoratives geometrisches Wandpaneel aus Birkensperrholz.',
    },
  };
}

export default function QuizModal({ open, onClose }) {
  const { t, lang } = useLanguage();
  const { mounted, closing } = usePresence(open, 320);
  useBodyScrollLock(open);
  const dialogRef = useRef(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // Fresh quiz every time it opens.
  useEffect(() => {
    if (open) {
      setStep(0);
      setAnswers({});
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return undefined;
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const total = QUESTIONS.length;
  const done = step >= total;
  const question = QUESTIONS[step];
  const stepLabel = (TEXT.step[lang] ?? TEXT.step.tr)(Math.min(step + 1, total), total);
  const result = done ? recommend(answers) : null;

  const answer = (value) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    setStep((s) => s + 1);
  };

  const onNavClick = () => {
    if (done) {
      setStep(0);
      setAnswers({});
    } else {
      setStep((s) => s - 1);
    }
  };

  return (
    <div
      className={`quiz-modal__backdrop${closing ? ' is-closing' : ''}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <Surface
        as="div"
        ref={dialogRef}
        className={`quiz-modal surface--calm${closing ? ' is-closing' : ''}`}
        contentClassName="quiz-modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
        tabIndex={-1}
      >
        <div className="quiz-modal__head">
          <div>
            <p className="quiz-modal__eyebrow">{done ? t(TEXT.resultTitle) : stepLabel}</p>
            <h2 className="quiz-modal__title" id="quiz-modal-title">
              {done ? t(result.title) : t(question.prompt)}
            </h2>
          </div>
          <button type="button" className="quiz-modal__close" onClick={onClose} aria-label={t(TEXT.close)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {!done ? (
          <ul className="quiz-modal__options">
            {question.options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className={`quiz-modal__option${answers[question.id] === opt.value ? ' quiz-modal__option--active' : ''}`}
                  onClick={() => answer(opt.value)}
                >
                  {t(opt.label)}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="quiz-modal__result">
            <p className="quiz-modal__result-info">{t(result.info)}</p>
            <Surface
              as={Link}
              href={result.href}
              className="quiz-modal__result-cta surface--cta"
              contentClassName="quiz-modal__result-cta-content"
              onClick={onClose}
            >
              <span className="btn__label">{t(result.isCategory ? TEXT.resultCategoryCta : TEXT.resultCta)}</span>
            </Surface>
          </div>
        )}

        <div className="quiz-modal__foot">
          {step > 0 ? (
            <button type="button" className="quiz-modal__nav accent-hover" onClick={onNavClick}>
              {done ? t(TEXT.restart) : t(TEXT.back)}
            </button>
          ) : (
            <span />
          )}
          <p className="quiz-modal__note">{t(TEXT.note)}</p>
        </div>
      </Surface>
    </div>
  );
}
