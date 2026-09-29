import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { contactSection } from '@/data/homepageContent';
import Surface from './Surface';

const PHONE_ICON = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

// Real WhatsApp brand mark (same as WhatsAppFab.jsx), currentColor so it takes the
// WhatsApp green set in ContactSection.scss.
const WHATSAPP_ICON = (
  <svg viewBox="0 0 32 32" width="18" height="18" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.02 4C9.4 4 4 9.37 4 15.98c0 2.15.57 4.15 1.56 5.9L4 28l6.28-1.53a11.9 11.9 0 0 0 5.74 1.46h.01c6.62 0 12.01-5.37 12.01-11.98C28.04 9.37 22.65 4 16.02 4Zm0 21.6h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.75.92 1-3.66-.24-.38a9.86 9.86 0 0 1-1.53-5.3c0-5.47 4.46-9.92 9.95-9.92 2.66 0 5.15 1.03 7.03 2.9a9.85 9.85 0 0 1 2.91 7.03c0 5.47-4.46 9.92-9.95 10Z"
    />
    <path
      fill="currentColor"
      d="M22.4 18.68c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.37.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.22.05-.4-.03-.56-.08-.16-.72-1.75-.99-2.4-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.31 3.32.16.22 2.26 3.46 5.49 4.85.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.29-.22-.61-.38Z"
    />
  </svg>
);

// Monochrome line-icon versions of the social marks — third-party brand colours would
// clash with the single-accent palette, and the label text beside each already names it.
const INSTAGRAM_ICON = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
  </svg>
);

const ADDRESS_ICON = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function ContactSection() {
  const { t } = useLanguage();
  const [values, setValues] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const { form, labels } = contactSection;

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((v) => ({ ...v, [field]: value }));
    // Clear an error the moment its field looks fixed.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = t(form.errors.nameRequired);
    if (!values.phone.trim()) nextErrors.phone = t(form.errors.phoneRequired);
    else if (!/^[+0-9()\s-]{7,}$/.test(values.phone.trim())) nextErrors.phone = t(form.errors.phoneInvalid);
    if (!values.message.trim()) nextErrors.message = t(form.errors.messageRequired);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // No backend — the "submit" is a pre-filled WhatsApp deep link, same channel as every
    // other CTA on the site (WhatsApp is the sales channel).
    const text = [
      'Merhaba, Kalvia Woods web sitesindeki iletişim formundan yazıyorum.',
      `Ad Soyad: ${values.name.trim()}`,
      `Telefon: ${values.phone.trim()}`,
      `Mesaj: ${values.message.trim()}`,
    ].join('\n');
    window.open(`${contactSection.whatsappHref}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="contact-section container" id="iletisim">
      <h2 className="contact-section__title" data-reveal>{t(contactSection.title)}</h2>

      <div className="contact-section__grid" data-reveal>
        <div className="contact-section__map">
          <iframe
            className="contact-section__map-frame"
            src={`https://www.google.com/maps?q=${contactSection.mapCoords}&z=14&output=embed`}
            title="Kalvia Woods konum haritası (yer tutucu konum)"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Transparent overlay spanning the whole frame — an iframe is its own browsing
              context, so clicks land inside the embedded map instead of bubbling to a
              wrapping link; this catches them and sends the whole map to Google Maps. */}
          <a
            className="contact-section__map-overlay"
            href={contactSection.mapHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(labels.addressCta)}
          />
        </div>

        <Surface
          as="form"
          className="contact-section__form surface--calm"
          contentClassName="contact-section__form-content"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="contact-section__field">
            <label htmlFor="contact-name">{t(form.nameLabel)}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={setField('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {/* Always rendered — the space is reserved via min-height + opacity so switching
                into/out of error state never grows or shrinks the field. */}
            <p
              className={`contact-section__error${errors.name ? ' is-visible' : ''}`}
              id="contact-name-error"
              role={errors.name ? 'alert' : undefined}
            >
              {errors.name || ' '}
            </p>
          </div>
          <div className="contact-section__field">
            <label htmlFor="contact-phone">{t(form.phoneLabel)}</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={setField('phone')}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            />
            <p
              className={`contact-section__error${errors.phone ? ' is-visible' : ''}`}
              id="contact-phone-error"
              role={errors.phone ? 'alert' : undefined}
            >
              {errors.phone || ' '}
            </p>
          </div>
          <div className="contact-section__field">
            <label htmlFor="contact-message">{t(form.messageLabel)}</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={values.message}
              onChange={setField('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            <p
              className={`contact-section__error${errors.message ? ' is-visible' : ''}`}
              id="contact-message-error"
              role={errors.message ? 'alert' : undefined}
            >
              {errors.message || ' '}
            </p>
          </div>
          <Surface
            as="button"
            type="submit"
            className="contact-section__submit surface--cta"
            contentClassName="contact-section__submit-content"
          >
            <span className="btn__label">{t(form.submit)}</span>
          </Surface>
        </Surface>
      </div>

      <ul className="contact-section__info-row" data-reveal>
        <li>
          {/* Whole row is the link — icon and label are just as clickable as the value. */}
          <a className="contact-section__info-link" href={`tel:${contactSection.phone.replace(/\s/g, '')}`}>
            <span className="contact-section__info-icon">{PHONE_ICON}</span>
            <span className="contact-section__info-text">
              <span className="contact-section__info-label">{t(labels.phone)}</span>
              <span className="contact-section__info-value">{contactSection.phoneDisplay}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            className="contact-section__info-link"
            href={contactSection.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-section__info-icon">{INSTAGRAM_ICON}</span>
            <span className="contact-section__info-text">
              <span className="contact-section__info-label">{t(labels.instagram)}</span>
              <span className="contact-section__info-value">{contactSection.instagramHandle}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            className="contact-section__info-link"
            href={contactSection.mapHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-section__info-icon">{ADDRESS_ICON}</span>
            <span className="contact-section__info-text">
              <span className="contact-section__info-label">{t(labels.address)}</span>
              <span className="contact-section__info-value">{contactSection.address}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            className="contact-section__info-link"
            href={contactSection.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-section__info-icon contact-section__info-icon--whatsapp">{WHATSAPP_ICON}</span>
            <span className="contact-section__info-text">
              <span className="contact-section__info-label">WhatsApp</span>
              <span className="contact-section__info-value">{contactSection.phoneDisplay}</span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
