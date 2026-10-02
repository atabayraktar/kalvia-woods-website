import Link from 'next/link';
import ProductCard from './ProductCard';

// First row's worth of cards (the desktop layout's own column count — see ProductGrid.scss)
// get `priority` so the actual LCP candidate isn't sitting behind next/image's default
// lazy-load: a Lighthouse run on /urunler flagged the LCP image as lazy-loaded, since
// ProductCard never opted any card into eager loading.
const EAGER_COUNT = 4;

// A short catalogue leaves the row half empty: close it with a custom-order card.
const FILLER_BELOW = 4;

export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < EAGER_COUNT} />
      ))}
      {products.length > 0 && products.length < FILLER_BELOW && (
        <Link href="/#iletisim" className="product-grid__custom">
          <span className="product-grid__custom-eyebrow">Özel sipariş</span>
          <span className="product-grid__custom-title">Aradığınızı bulamadınız mı?</span>
          <span className="product-grid__custom-text">
            Ölçü ve tasarımınızı iletin, atölyemizde sizin için kesilsin.
          </span>
          <span className="product-grid__custom-cta">Bize yazın →</span>
        </Link>
      )}
    </div>
  );
}
