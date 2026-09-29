// Kalvia Woods product data — hand-written PLACEHOLDER catalog (two sample products) until
// a real product feed exists. Every image path points at a locally generated solid-colour
// placeholder (scripts/generate-placeholders.mjs). Shape per product:
//   id, name{tr,en,de}, category (slug from PRODUCT_CATEGORIES), tagline, description,
//   features[], price (TRY, number or null), color/size (only for sibling variants),
//   isNew, inStock, image, gallery[], galleryThumbs[], posterImages[], posterDescription,
//   video ({ mp4, webm?, poster? } or null).
// Products sharing the same name.tr + category are treated as colour/size siblings by
// /urunler/[id].jsx and surfaced through VariantPicker — none in this placeholder set.

export const PRODUCT_CATEGORIES = [
  { slug: 'ahsap-dekor', label: { tr: 'Ahşap Dekor', en: 'Wood Décor', de: 'Holzdekor' } },
  { slug: 'pvc-tabela', label: { tr: 'PVC Tabela', en: 'PVC Signage', de: 'PVC-Schilder' } },
  { slug: 'ahsap-kutu', label: { tr: 'Ahşap Kutu', en: 'Wooden Boxes', de: 'Holzboxen' } },
  { slug: 'ozel-kesim', label: { tr: 'Özel Kesim', en: 'Custom Cutting', de: 'Sonderanfertigung' } },
];

export const products = [
  {
    id: 'kw-ahsap-dekor-001',
    name: {
      tr: 'Lazer Kesim Ahşap Duvar Panosu (Örnek Ürün)',
      en: 'Laser-Cut Wooden Wall Panel (Sample Product)',
      de: 'Lasergeschnittenes Holz-Wandpaneel (Musterprodukt)',
    },
    category: 'ahsap-dekor',
    tagline: {
      tr: 'Geometrik desenli dekoratif pano',
      en: 'Decorative panel with a geometric pattern',
      de: 'Dekoratives Paneel mit geometrischem Muster',
    },
    description: {
      tr: 'Yer tutucu ürün açıklaması. 6 mm huş kontrplaktan lazerle kesilen geometrik desenli duvar panosu; salon, ofis ve mağaza duvarları için tasarlanmıştır.\n\nKenarlar lazer kesim sonrası zımparalanır ve doğal ahşap dokusu korunur. Askı aparatı ürünle birlikte gönderilir.',
      en: 'Placeholder product description. A geometric wall panel laser-cut from 6 mm birch plywood, designed for living rooms, offices and retail walls.\n\nEdges are sanded after cutting and the natural wood grain is preserved. A hanging bracket is included.',
      de: 'Platzhalter-Produktbeschreibung. Ein geometrisches Wandpaneel, lasergeschnitten aus 6 mm Birkensperrholz, für Wohnzimmer, Büros und Ladenwände.\n\nDie Kanten werden nach dem Schnitt geschliffen, die natürliche Maserung bleibt erhalten. Aufhängung im Lieferumfang.',
    },
    features: [
      { tr: 'Malzeme: 6 mm huş kontrplak', en: 'Material: 6 mm birch plywood', de: 'Material: 6 mm Birkensperrholz' },
      { tr: 'Ölçü: 60 × 40 cm', en: 'Size: 60 × 40 cm', de: 'Maße: 60 × 40 cm' },
      { tr: 'Kesim: CO₂ lazer, zımparalı kenar', en: 'Cut: CO₂ laser, sanded edges', de: 'Schnitt: CO₂-Laser, geschliffene Kanten' },
      { tr: 'Askı aparatı dahil', en: 'Hanging bracket included', de: 'Aufhängung inklusive' },
    ],
    price: 450,
    color: null,
    size: null,
    isNew: true,
    inStock: true,
    image: '/images/placeholder-product-1.webp',
    gallery: ['/images/placeholder-product-1.webp', '/images/placeholder-product-1-2.webp'],
    galleryThumbs: ['/images/placeholder-product-1-thumb.webp', '/images/placeholder-product-1-2-thumb.webp'],
    posterImages: ['/images/placeholder-product-1-poster-1.webp', '/images/placeholder-product-1-poster-2.webp'],
    posterDescription: {
      tr: 'Yer tutucu poster metni. Pano, tek parça halinde kesilir ve desen boşlukları duvar rengini geçirerek derinlik hissi yaratır.\n\nÖneri:\nDoğrudan güneş ışığından uzak, kuru iç mekânlarda kullanın.',
      en: 'Placeholder poster copy. The panel is cut as a single piece; the pattern openings let the wall colour show through for a sense of depth.\n\nTip:\nUse in dry interiors away from direct sunlight.',
      de: 'Platzhalter-Postertext. Das Paneel wird aus einem Stück geschnitten; die Musteröffnungen lassen die Wandfarbe durchscheinen und erzeugen Tiefe.\n\nTipp:\nIn trockenen Innenräumen, fern von direktem Sonnenlicht verwenden.',
    },
    video: null,
  },
  {
    id: 'kw-pvc-tabela-001',
    name: {
      tr: 'Lazer Kesim PVC Tabela (Örnek Ürün)',
      en: 'Laser-Cut PVC Sign (Sample Product)',
      de: 'Lasergeschnittenes PVC-Schild (Musterprodukt)',
    },
    category: 'pvc-tabela',
    tagline: {
      tr: 'İç ve dış mekân için dayanıklı tabela',
      en: 'Durable signage for indoors and outdoors',
      de: 'Langlebiges Schild für innen und außen',
    },
    description: {
      tr: 'Yer tutucu ürün açıklaması. 5 mm PVC köpük levhadan lazerle kesilen, yazı ve logonuza göre şekillendirilen tabela. Suya ve UV ışığına dayanıklıdır.\n\nİstenen ölçü, yazı ve renk seçenekleri WhatsApp üzerinden belirlenir.',
      en: 'Placeholder product description. A sign laser-cut from 5 mm PVC foam board and shaped to your text and logo. Water- and UV-resistant.\n\nSize, lettering and colour options are agreed over WhatsApp.',
      de: 'Platzhalter-Produktbeschreibung. Ein Schild, lasergeschnitten aus 5 mm PVC-Hartschaumplatte und nach Ihrem Text und Logo geformt. Wasser- und UV-beständig.\n\nMaße, Beschriftung und Farboptionen werden über WhatsApp abgestimmt.',
    },
    features: [
      { tr: 'Malzeme: 5 mm PVC köpük levha', en: 'Material: 5 mm PVC foam board', de: 'Material: 5 mm PVC-Hartschaum' },
      { tr: 'Ölçü: 50 × 25 cm (özel ölçü mümkün)', en: 'Size: 50 × 25 cm (custom sizes available)', de: 'Maße: 50 × 25 cm (Sondermaße möglich)' },
      { tr: 'Su ve UV dayanımı', en: 'Water- and UV-resistant', de: 'Wasser- und UV-beständig' },
      { tr: 'Montaj delikleri hazır', en: 'Pre-drilled mounting holes', de: 'Montagelöcher vorgebohrt' },
    ],
    price: 780,
    color: null,
    size: null,
    isNew: false,
    inStock: true,
    image: '/images/placeholder-product-2.webp',
    gallery: ['/images/placeholder-product-2.webp', '/images/placeholder-product-2-2.webp'],
    galleryThumbs: ['/images/placeholder-product-2-thumb.webp', '/images/placeholder-product-2-2-thumb.webp'],
    posterImages: ['/images/placeholder-product-2-poster-1.webp', '/images/placeholder-product-2-poster-2.webp'],
    posterDescription: {
      tr: 'Yer tutucu poster metni. Tabela yüzeyi mat beyazdır; yazı ve logo istenirse ayrı renkte PVC katmandan kesilerek üzerine uygulanır.\n\nÖnemli not:\nDış mekân kullanımında paslanmaz vida ile montaj önerilir.',
      en: 'Placeholder poster copy. The sign face is matte white; lettering and logo can be cut from a second colour of PVC and layered on top.\n\nImportant:\nFor outdoor use, mount with stainless-steel screws.',
      de: 'Platzhalter-Postertext. Die Schildfläche ist mattweiß; Schrift und Logo können aus einer zweiten PVC-Farbe geschnitten und aufgesetzt werden.\n\nWichtiger Hinweis:\nFür den Außenbereich mit Edelstahlschrauben montieren.',
    },
    video: null,
  },
];
