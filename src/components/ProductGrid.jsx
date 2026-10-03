import Link from 'next/link';
import ProductCard from './ProductCard';

// First row's worth of cards (the desktop layout's own column count — see ProductGrid.scss)
// get `priority` so the actual LCP candidate isn't sitting behind next/image's default
// lazy-load: a Lighthouse run on /urunler flagged the LCP image as lazy-loaded, since
// ProductCard never opted any card into eager loading.
const EAGER_COUNT = 4;

// The custom-order card is always the first item of every page of results.
export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.length > 0 && (
        <Link href="/#iletisim" className="product-grid__custom">
          <span className="product-grid__custom-eyebrow">Özel sipariş</span>
          <span className="product-grid__custom-title">Aradığınızı bulamadınız mı?</span>
          <span className="product-grid__custom-text">
            Ölçü ve tasarımınızı iletin, atölyemizde sizin için kesilsin.
          </span>
          <span className="product-grid__custom-cta">Bize yazın →</span>
        </Link>
      )}
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < EAGER_COUNT} />
      ))}
    </div>
  );
}
