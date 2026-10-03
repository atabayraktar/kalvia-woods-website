import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { PRODUCT_CATEGORIES, PRODUCT_SUBCATEGORIES } from '@/data/products';
import Surface from './Surface';

// Category / subcategory labels for the card's eyebrow — a small static lookup so the lean
// list props only need to carry the slugs.
const categoryLabel = (slug) => PRODUCT_CATEGORIES.find((c) => c.slug === slug)?.label;
const subcategoryLabel = (slug) => PRODUCT_SUBCATEGORIES.find((s) => s.slug === slug)?.label;

const TEXT = {
  new: { tr: 'Yeni' },
  outOfStock: { tr: 'Stokta Yok' },
  unavailable: { tr: 'Şu an temin edilemiyor' },
  view: { tr: 'İncele' },
};

export default function ProductCard({ product, priority = false }) {
  const { t } = useLanguage();

  // Out-of-stock products render as a dimmed, non-interactive card: on a static export
  // the detail page still exists at its URL, so the way to keep people out of it is simply
  // not linking there — a plain <div> instead of the <Link>.
  const inStock = product.inStock !== false;
  const catLabel = categoryLabel(product.category);
  const subLabel = subcategoryLabel(product.subcategory);

  const body = (
    <>
      <span className="product-card__image-wrap">
        <Image
          src={product.image}
          alt={t(product.name)}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          style={{ objectFit: 'cover' }}
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
        {/* Where the product sits in the catalog: "Duvar Dekoru › Aynalar". */}
        {catLabel && (
          <span className="product-card__category">
            {t(catLabel)}
            {subLabel && <> › {t(subLabel)}</>}
          </span>
        )}
        {inStock ? (
          <>
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
