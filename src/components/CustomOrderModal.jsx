import { useEffect, useRef, useState } from 'react';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import usePresence from '@/hooks/usePresence';
import { useLanguage } from '@/context/LanguageContext';
import { contactSection, customOrderModal } from '@/data/homepageContent';
import { CUSTOM_ORDER_EVENT } from '@/lib/customOrder';
import Surface from './Surface';

// Small request form: collects name / phone / what the visitor wants and hands it to WhatsApp
// (same channel as the rest of the site). No uploads — photos and drawings are sent in the chat.
export default function CustomOrderModal() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const { mounted, closing } = usePresence(open, 300);
  useBodyScrollLock(open);
  const text = customOrderModal;
  const { form } = contactSection;

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CUSTOM_ORDER_EVENT, onOpen);
    return () => window.removeEventListener(CUSTOM_ORDER_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;
    const previouslyFocused = document.activeElement;
    dialogRef.current?.querySelector('input')?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [mounted]);

  if (!mounted) return null;

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = t(form.errors.nameRequired);
    if (!values.phone.trim()) next.phone = t(form.errors.phoneRequired);
    else if (!/^[+0-9()\s-]{7,}$/.test(values.phone.trim())) next.phone = t(form.errors.phoneInvalid);
    if (!values.message.trim()) next.message = t(text.messageRequired);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const message = [
      'Merhaba, Kalvia Woods web sitesinden özel sipariş / fason kesim talebi iletiyorum.',
      `Ad Soyad: ${values.name.trim()}`,
      `Telefon: ${values.phone.trim()}`,
      `Talep: ${values.message.trim()}`,
      '(Görsel / çizim dosyalarını bu sohbetten göndereceğim.)',
    ].join('\n');
    window.open(`${contactSection.whatsappHref}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
    setValues({ name: '', phone: '', message: '' });
    setErrors({});
  };

  return (
    <div
      className={`order-modal${closing ? ' is-closing' : ''}`}
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      ref={dialogRef}
    >
      <Surface className="order-modal__panel surface--calm" contentClassName="order-modal__content">
        <button type="button" className="order-modal__close" onClick={() => setOpen(false)} aria-label={t(text.close)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <span className="order-modal__eyebrow">{t(text.eyebrow)}</span>
        <h2 className="order-modal__title" id="order-modal-title">{t(text.title)}</h2>
        <p className="order-modal__lead">{t(text.lead)}</p>

        <form className="order-modal__form" onSubmit={onSubmit} noValidate>
          <div className="contact-section__field">
            <label htmlFor="order-name">{t(form.nameLabel)}</label>
            <input id="order-name" type="text" autoComplete="name" value={values.name} onChange={setField('name')} aria-invalid={Boolean(errors.name)} />
            <p className={`contact-section__error${errors.name ? ' is-visible' : ''}`} role={errors.name ? 'alert' : undefined}>{errors.name || ' '}</p>
          </div>
          <div className="contact-section__field">
            <label htmlFor="order-phone">{t(form.phoneLabel)}</label>
            <input id="order-phone" type="tel" autoComplete="tel" value={values.phone} onChange={setField('phone')} aria-invalid={Boolean(errors.phone)} />
            <p className={`contact-section__error${errors.phone ? ' is-visible' : ''}`} role={errors.phone ? 'alert' : undefined}>{errors.phone || ' '}</p>
          </div>
          <div className="contact-section__field">
            <label htmlFor="order-message">{t(text.messageLabel)}</label>
            <textarea id="order-message" rows={3} placeholder={t(text.placeholder)} value={values.message} onChange={setField('message')} aria-invalid={Boolean(errors.message)} />
            <p className={`contact-section__error${errors.message ? ' is-visible' : ''}`} role={errors.message ? 'alert' : undefined}>{errors.message || ' '}</p>
          </div>
          <p className="order-modal__note">{t(text.note)}</p>
          <Surface as="button" type="submit" className="order-modal__submit surface--cta" contentClassName="contact-section__submit-content">
            <span className="btn__label">{t(form.submit)}</span>
          </Surface>
        </form>
      </Surface>
    </div>
  );
}
