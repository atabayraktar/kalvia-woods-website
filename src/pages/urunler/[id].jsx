import { useRouter } from 'next/router';
import Head from 'next/head';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductPoster from '@/components/ProductPoster';
import RelatedProducts from '@/components/RelatedProducts';
import { useLanguage } from '@/context/LanguageContext';
import { products, PRODUCT_CATEGORIES, PRODUCT_SUBCATEGORIES } from '@/data/products';
import useScrollReveal from '@/hooks/useScrollReveal';

const SITE_URL = 'https://kalviawoods.example';
const BACK_LABEL = { tr: 'Ürünlere geri dön' };

// Static export: every product must be known at build time (no on-demand rendering for an
// unknown id under `output: 'export'`).
export async function getStaticPaths() {
  return {
    paths: products.map((p) => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.id === params.id);
  // Same family (colour/size siblings) — see VariantPicker.jsx: each colour/size combination
  // is its own product row, so picking a variant links to that sibling's page.
  const siblings = products.filter(
    (p) => p.id !== product.id && p.category === product.category && p.name.tr === product.name.tr
  );
  // Everything else from the same category, for the "more from this category" rail.
  const siblingIds = new Set(siblings.map((p) => p.id));
  // Same subcategory first, then the rest of the category; one variant per colour family so
  // the rail doesn't fill up with five colours of the same piece. Capped for payload size.
  const seenFamilies = new Set();
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category && !siblingIds.has(p.id))
    .sort((a, b) => Number(b.subcategory === product.subcategory) - Number(a.subcategory === product.subcategory))
    .filter((p) => {
      const family = `${p.category}|${p.name.tr}`;
      if (seenFamilies.has(family)) return false;
      seenFamilies.add(family);
      return true;
    })
    .slice(0, 8);
  // Both lists only ever feed VariantPicker/ProductCard — trim to what those read.
  const leanProduct = ({ id, name, tagline, category, subcategory, color, size, isNew, inStock, image }) => ({
    id, name, tagline, category, subcategory, color, size, isNew, inStock, image,
  });
  return {
    props: {
      product,
      siblings: siblings.map(leanProduct),
      related: related.map(leanProduct),
      category: PRODUCT_CATEGORIES.find((c) => c.slug === product.category) ?? null,
      subcategory: PRODUCT_SUBCATEGORIES.find((s) => s.slug === product.subcategory) ?? null,
    },
  };
}

export default function ProductDetailPage({ product, siblings, related, category, subcategory }) {
  useScrollReveal();
  const { t } = useLanguage();
  const router = useRouter();

  // router.back() replays the actual browser history entry, which restores /urunler's
  // filtered list (it syncs filters into the URL) and scroll position. Only safe when the
  // previous entry is this site's own page; a shared product link falls back to /urunler.
  const goBack = () => {
    const cameFromListing =
      typeof window !== 'undefined' &&
      window.history.length > 1 &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin;
    if (cameFromListing) router.back();
    else router.push('/urunler');
  };
  const name = t(product.name);
  const url = `${SITE_URL}/urunler/${product.id}`;
  const title = `${name} | Kalvia Woods`;
  const description = t(product.description).split('\n\n')[0];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku: product.id,
    image: `${SITE_URL}${product.image}`,
    brand: { '@type': 'Brand', name: 'Kalvia Woods' },
    // Kalvia Woods manufactures its own products.
    manufacturer: { '@type': 'Organization', name: 'Kalvia Woods' },
    // schema.org wants a "Parent > Child" path for category.
    category: category ? [t(category.label), subcategory && t(subcategory.label)].filter(Boolean).join(' > ') : undefined,
    color: product.color ? t(product.color) : undefined,
    inLanguage: 'tr',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', name: 'Ürünler', item: `${SITE_URL}/urunler` },
      category && { '@type': 'ListItem', name: t(category.label), item: `${SITE_URL}/urunler?kategori=${category.slug}` },
      category && subcategory && {
        '@type': 'ListItem',
        name: t(subcategory.label),
        item: `${SITE_URL}/urunler?kategori=${category.slug}&altkategori=${subcategory.slug}`,
      },
      { '@type': 'ListItem', name, item: url },
    ]
      .filter(Boolean)
      .map((item, i) => ({ ...item, position: i + 1 })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="tr" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />

        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Kalvia Woods" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}${product.image}`} />
        <meta property="og:locale" content="tr_TR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}${product.image}`} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <main id="main-content">
        <section className="product-detail container">
          <button type="button" className="product-detail__back accent-hover" onClick={goBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t(BACK_LABEL)}
          </button>

          <div className="product-detail__gallery-info" data-reveal>
            <ProductGallery images={product.gallery} thumbs={product.galleryThumbs} video={product.video} alt={name} />
            <ProductInfo product={product} siblings={siblings} category={category} subcategory={subcategory} />
          </div>

          {/* Poster images/description come from src/data/products.js; ProductPoster only
              no-ops when both are empty. */}
          <ProductPoster
            productId={product.id}
            images={product.posterImages}
            video={product.video}
            description={product.posterDescription}
            alt={`${name} — ${t(product.tagline)}`}
          />

          <RelatedProducts products={related} />
        </section>
      </main>
    </>
  );
}
