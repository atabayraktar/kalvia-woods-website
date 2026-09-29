import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Surface from './Surface';

const TEXT = {
  new: { tr: 'Yeni', en: 'New', de: 'Neu' },
  outOfStock: { tr: 'Stokta Yok', en: 'Out of Stock', de: 'Nicht auf Lager' },
  askPrice: { tr: "Fiyat için WhatsApp'tan ulaşın", en: 'Contact us on WhatsApp for pricing', de: 'Preis auf Anfrage über WhatsApp' },
  unavailable: { tr: 'Şu an temin edilemiyor', en: 'Currently unavailable', de: 'Derzeit nicht verfügbar' },
  view: { tr: 'İncele', en: 'View', de: 'Ansehen' },
};

// Prices are stored as plain TRY numbers in src/data/products.js; formatted per locale
// here. A product with no price falls back to the WhatsApp-inquiry line.
const PRICE_LOCALE = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE' };
export function formatPrice(price, lang) {
  return new Intl.NumberFormat(PRICE_LOCALE[lang] ?? 'tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product, priority = false }) {
  const { t, lang } = useLanguage();

  // Out-of-stock products render as a dimmed, non-interactive card: on a static export
  // the detail page still exists at its URL, so the way to keep people out of it is simply
  // not linking there — a plain <div> instead of the <Link>.
  const inStock = product.inStock !== false;
  const hasPrice = typeof product.price === 'number';

  const body = (
    <>
      <span className="product-card__image-wrap">
        <Image
          src={product.image}
          alt={t(product.name)}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          style={{ objectFit: 'contain' }}
          priority={priority}
        />
        {product.isNew && inStock && <span className="product-card__badge">{t(TEXT.new)}</span>}
        {/* Text label, not just dimming — stock state must not be conveyed by opacity alone. */}
        {!inStock && <span className="product-card__badge product-card__badge--stock">{t(TEXT.outOfStock)}</span>}
      </span>
      <span className="product-card__body">
        <span className="product-card__name">{t(product.name)}</span>
        {/* Sibling variants share a name and differ only by colour/size — show which. */}
        {(product.color || product.size) && (
          <span className="product-card__variant">{product.color ? t(product.color) : product.size}</span>
        )}
        {inStock ? (
          <>
            <span className={`product-card__price${hasPrice ? ' product-card__price--amount' : ''}`}>
              {hasPrice ? formatPrice(product.price, lang) : t(TEXT.askPrice)}
            </span>
            <Surface
              as="span"
              className="product-card__cta surface--cta"
              contentClassName="product-card__cta-content"
            >
              <span className="btn__label">{t(TEXT.view)}</span>
            </Surface>
          </>
        ) : (
          <span className="product-card__price">{t(TEXT.unavailable)}</span>
        )}
      </span>
    </>
  );

  if (!inStock) {
    return <div className="product-card product-card--out-of-stock">{body}</div>;
  }

  return (
    // No data-reveal here: useScrollReveal's IntersectionObserver only scans once at mount,
    // but this grid re-renders a different set of cards on every search/filter/sort/page
    // change — cards added after that initial scan would stay stuck at opacity:0.
    <Link href={`/urunler/${product.id}`} className="product-card">
      {body}
    </Link>
  );
}
