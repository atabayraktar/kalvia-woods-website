import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { contactSection } from '@/data/homepageContent';
import Surface from './Surface';
import VariantPicker from './VariantPicker';

const WHATSAPP_MESSAGE = {
  tr: (name) => `Merhaba, ${name} hakkında bilgi almak istiyorum.`,
};
const CTA_LABEL = { tr: 'WhatsApp ile Bilgi Al' };
const FEATURES_LABEL = { tr: 'Özellikler' };
const DIMENSIONS_LABEL = { tr: 'Ölçü' };
const CATEGORY_NAV_LABEL = { tr: 'Kategori' };

const SIZE_RE = /^(\d[\d.,]*(?:\s*[×x]\s*\d[\d.,]*)*(?:\s*(?:cm|mm|m))?)\.?(?:\s+[–-]\s+(.+))?$/;

// The sheet's free-text size cell -> ledger rows. Lines split on \n; a line holding several
// "Label: value" pairs is split on " / ". Plain sizes become {value, note}; anything else is a note.
function parseDimensions(text) {
  const rows = [];
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const parts = line.split(' / ');
      const pairs = parts.length > 1 && parts.every((p) => p.includes(':')) ? parts : [line];
      pairs.forEach((part) => {
        const colon = part.indexOf(':');
        const label = colon > 0 ? part.slice(0, colon).trim() : '';
        const rest = (colon > 0 ? part.slice(colon + 1) : part).trim();
        const size = rest.match(SIZE_RE);
        if (size) rows.push({ label, value: size[1].trim(), note: size[2] || '' });
        else if (label && /\d/.test(rest)) rows.push({ label, value: rest, note: '' });
        else rows.push({ label: '', value: '', note: part });
      });
    });
  return rows;
}

// `category` / `subcategory` are the resolved PRODUCT_CATEGORIES / PRODUCT_SUBCATEGORIES rows
// (or undefined) — rendered as links back into the filtered listing.
export default function ProductInfo({ product, siblings, category, subcategory }) {
  const { t, lang } = useLanguage();

  // The page's primary action: a pre-filled WhatsApp message carrying the product name.
  const whatsappMessage = (WHATSAPP_MESSAGE[lang] ?? WHATSAPP_MESSAGE.tr)(t(product.name));
  const whatsappHref = `${contactSection.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`;
  const features = product.features || [];

  return (
    <div className="product-info">
      {category && (
        <nav className="product-info__category" aria-label={t(CATEGORY_NAV_LABEL)}>
          <Link href={`/urunler?kategori=${category.slug}`} className="product-info__category-link accent-hover">
            {t(category.label)}
          </Link>
          {subcategory && (
            <>
              <span className="product-info__category-sep" aria-hidden="true">›</span>
              <Link
                href={`/urunler?kategori=${category.slug}&altkategori=${subcategory.slug}`}
                className="product-info__category-link accent-hover"
              >
                {t(subcategory.label)}
              </Link>
            </>
          )}
        </nav>
      )}
      <h1 className="product-info__name">{t(product.name)}</h1>
      <p className="product-info__tagline">{t(product.tagline)}</p>


      {siblings.length > 0 && <VariantPicker current={product} siblings={siblings} />}

      {/* Free-text size cell from the catalog sheet, laid out as a spec ledger. */}
      {product.dimensions && (
        <div className="product-info__dimensions">
          <p className="product-info__dimensions-label">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="m3.5 16.5 13-13 4 4-13 13-4-4Z M7 13l2 2 M10 10l2 2 M13 7l2 2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            {t(DIMENSIONS_LABEL)}
          </p>
          <ul className="product-info__dimensions-list">
            {parseDimensions(product.dimensions).map((row, i) =>
              row.value ? (
                <li key={i} className={`product-info__dimension${row.label ? ' has-label' : ''}`}>
                  {row.label && <span className="product-info__dimension-name">{row.label}</span>}
                  {row.label && <span className="product-info__dimension-leader" aria-hidden="true" />}
                  <span className="product-info__dimension-value">{row.value}</span>
                  {row.note && <span className="product-info__dimension-note">{row.note}</span>}
                </li>
              ) : (
                <li key={i} className="product-info__dimension product-info__dimension--text">
                  {row.note}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Descriptions are \n\n-separated paragraphs — rendered as separate <p>s. */}
      {t(product.description)
        .split('\n\n')
        .map((paragraph, i) => (
          <p key={i} className="product-info__description">
            {paragraph}
          </p>
        ))}

      {features.length > 0 && (
        <div className="product-info__features">
          <p className="product-info__features-label">{t(FEATURES_LABEL)}</p>
          <ul className="product-info__features-list">
            {features.map((feature, i) => (
              <li key={i}>{t(feature)}</li>
            ))}
          </ul>
        </div>
      )}

      <Surface
        as="a"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="product-info__cta surface--cta"
        contentClassName="product-info__cta-content"
      >
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.02 4C9.4 4 4 9.37 4 15.98c0 2.15.57 4.15 1.56 5.9L4 28l6.28-1.53a11.9 11.9 0 0 0 5.74 1.46h.01c6.62 0 12.01-5.37 12.01-11.98C28.04 9.37 22.65 4 16.02 4Zm0 21.6h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.75.92 1-3.66-.24-.38a9.86 9.86 0 0 1-1.53-5.3c0-5.47 4.46-9.92 9.95-9.92 2.66 0 5.15 1.03 7.03 2.9a9.85 9.85 0 0 1 2.91 7.03c0 5.47-4.46 9.92-9.95 10Z"
          />
          <path
            fill="currentColor"
            d="M22.4 18.68c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.37.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.22.05-.4-.03-.56-.08-.16-.72-1.75-.99-2.4-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.31 3.32.16.22 2.26 3.46 5.49 4.85.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.29-.22-.61-.38Z"
          />
        </svg>
        <span className="btn__label">{t(CTA_LABEL)}</span>
      </Surface>
    </div>
  );
}
