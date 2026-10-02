import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { customOrderBanner } from '@/data/homepageContent';
import { products } from '@/data/products';
import Surface from './Surface';

// Full-width image banner promoting ONE product. Set `featuredProductId` in
// homepageContent.js; falls back to the first product. The whole banner is the link; the
// button is its visual affordance.
export default function CustomOrderBanner() {
  const { t } = useLanguage();
  const product = products.find((p) => p.id === customOrderBanner.featuredProductId) || products[0];
  if (!product) return null;

  return (
    <section className="order-banner">
      <Link href={`/urunler/${product.id}`} className="order-banner__frame" data-reveal>
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
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className={customOrderBanner.mobileImage ? 'order-banner__image-desktop' : undefined}
          style={{ objectFit: 'cover' }}
        />
        <div className="order-banner__scrim" aria-hidden="true" />
        <div className="order-banner__content">
          <span className="order-banner__tag">{t(customOrderBanner.tag)}</span>
          <h2 className="order-banner__title">{t(product.name)}</h2>
          <Surface
            as="span"
            className="order-banner__cta surface--cta"
            contentClassName="order-banner__cta-content"
          >
            <span className="btn__label">{t(customOrderBanner.cta)}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Surface>
        </div>
      </Link>
    </section>
  );
}
