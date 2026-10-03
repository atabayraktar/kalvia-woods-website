// Homepage copy for Kalvia Woods (Turkish is the source of truth; English/German fields
// remain for content still keyed by locale even though the site only renders Turkish).
// Every media path here points at a locally generated solid-colour placeholder
// (scripts/generate-placeholders.mjs) until real photography/video is supplied — swap the
// file, keep the path.

export const header = {
  nav: [
    { href: '/urunler', label: { tr: 'Ürünler' } },
    { href: '#hakkimizda', label: { tr: 'Hakkımızda' } },
    { href: '#iletisim', label: { tr: 'İletişim' } },
  ],
};

export const heroSlides = [
  {
    id: 'hero-1',
    media: {
      type: 'video',
      mp4: '/videos/placeholder-hero-1.mp4',
      // Portrait crop for mobile — swapped in via a <source media> query in HeroSlider.jsx.
      mobileMp4: '/videos/placeholder-hero-1-mobile.mp4',
      poster: '/images/placeholder-hero-1.webp',
      mobilePoster: '/images/placeholder-hero-1-mobile.webp',
    },
    title: {
      tr: 'Lazerle şekillenen ahşap ve PVC.',
    },
    info: {
      tr: 'Kalvia Woods, ahşap ve PVC malzemeleri lazer kesim makinesiyle milimetrik hassasiyette işler; dekor, tabela, kutu ve özel tasarım ürünler üretir.',
    },
    cta: { tr: 'Ürünleri keşfedin' },
    href: '/urunler',
  },
  {
    id: 'hero-2',
    media: {
      type: 'video',
      mp4: '/videos/placeholder-hero-2.mp4',
      mobileMp4: '/videos/placeholder-hero-2-mobile.mp4',
      poster: '/images/placeholder-hero-2.webp',
      mobilePoster: '/images/placeholder-hero-2-mobile.webp',
    },
    title: {
      tr: 'Hassas kesim, doğal doku.',
    },
    info: {
      tr: 'Ahşabın sıcaklığını lazer kesimin temiz hatlarıyla buluşturuyoruz. Her parça, tasarımdan üretime kendi atölyemizde şekilleniyor.',
    },
    cta: { tr: 'Duvar dekorları' },
    href: '/urunler?kategori=duvar-dekoru',
  },
  {
    id: 'hero-3',
    media: {
      type: 'image',
      src: '/images/placeholder-hero-3.webp',
      mobileSrc: '/images/placeholder-hero-3-mobile.webp',
      alt: {
        tr: 'Lazer kesim PVC tabela örnekleri (yer tutucu görsel)',
      },
    },
    title: {
      tr: 'PVC tabela ve işaretler.',
    },
    info: {
      tr: 'İşletmeniz için dayanıklı, net okunan ve istediğiniz ölçüde üretilen PVC tabelalar — iç ve dış mekân için.',
    },
    cta: { tr: 'Tüm ürünler' },
    href: '/urunler',
  },
];

export const categorySection = {
  title: {
    tr: ['Her ihtiyaç için', 'lazer kesim ürünler.'],
  },
  // Four equal cards (the section's grid is 4-up from 960px). `slug` is a main category from
  // PRODUCT_CATEGORIES in src/data/products.js and `sub` an optional PRODUCT_SUBCATEGORIES
  // slug — each card deep-links to /urunler with those filters pre-applied. Only two main
  // categories have products so far, so the cards are their four populated subcategories
  // (the parent category shows as the card's eyebrow). Swap in main categories here once the
  // other ones from the sheet get products.
  categories: [
    {
      slug: 'organizer-workstation',
      sub: 'hobi-boya-istasyonu',
      image: '/images/placeholder-category-1.webp',
      eyebrow: { tr: 'Organizer & Workstation' },
      title: { tr: 'Hobi / Boya İstasyonu' },
    },
    {
      slug: 'organizer-workstation',
      sub: 'makeup-organizer',
      image: '/images/placeholder-category-2.webp',
      eyebrow: { tr: 'Organizer & Workstation' },
      title: { tr: 'Makeup Organizer' },
    },
    {
      slug: 'duvar-dekoru',
      sub: 'aynalar',
      image: '/images/placeholder-category-3.webp',
      eyebrow: { tr: 'Duvar Dekoru' },
      title: { tr: 'Aynalar' },
    },
    {
      slug: 'duvar-dekoru',
      sub: 'tablolar',
      image: '/images/placeholder-category-4.webp',
      eyebrow: { tr: 'Duvar Dekoru' },
      title: { tr: 'Tablolar' },
    },
  ],
};

export const aboutKalvia = {
  title: { tr: 'Kalvia Woods Hakkında' },
  paragraph: {
    tr: 'Kalvia Woods, ahşap ve PVC malzemeleri lazer kesim teknolojisiyle işleyen bir üretim atölyesidir. Dekoratif duvar panolarından tabelalara, hediyelik kutulardan özel ölçü parçalara kadar her ürün, tasarım dosyasından son rötuşa kadar kendi atölyemizde şekillenir. Hassas kesim, temiz kenarlar ve doğal malzeme dokusu; işimizin merkezinde yer alır.',
  },
  image: '/images/placeholder-about.webp',
  boxes: [
    {
      icon: 'laser',
      image: '/images/products/asterion-led-mandala-duvar-tablosu/1.webp',
      eyebrow: { tr: "Hassas Kesim" },
      info: { tr: "Her ürün lazerle milimetrik hassasiyette kesilir. İnce desenler, keskin köşeler ve temiz kenarlar ilk üretimde elde edilir; parçalar birbirine tam oturur." },
      points: [
        { tr: "Milimetrik ölçü toleransı" },
        { tr: "Pürüzsüz, temiz kenarlar" },
        { tr: "Karmaşık desenlerde net detay" },
      ],
    },
    {
      icon: 'design',
      image: '/images/products/elara-makeup-organizer/1.webp',
      eyebrow: { tr: "Kişiye Özel" },
      info: { tr: "Ürünleri ölçünüze, renginize ve ihtiyacınıza göre uyarlıyoruz. Kendi fikrinizi anlatın ya da hazır modellerimizden birini kişiselleştirin." },
      points: [
        { tr: "İsteğe göre ölçü ve renk" },
        { tr: "İsim ve yazı uygulaması" },
        { tr: "Üretim öncesi onay" },
      ],
    },
    {
      icon: 'shield',
      image: '/images/products/xl-tasinabilir-boya-hobi-istasyonu-cekmeceli-ahsap-boyama-cantasi/1.webp',
      eyebrow: { tr: "Sağlam" },
      info: { tr: "Günlük kullanıma dayanacak şekilde tasarlanır ve üretilir. Geçmeli yapılar ve doğru malzeme kalınlığı sayesinde ürünler yıllarca formunu korur." },
      points: [
        { tr: "Geçmeli, sağlam birleşimler" },
        { tr: "Doğru malzeme kalınlığı" },
        { tr: "Uzun ömürlü kullanım" },
      ],
    },
    {
      icon: 'speed',
      image: '/images/products/colordock-26-boya-sisesi-firca-organizeri/1.webp',
      eyebrow: { tr: "Hızlı Üretim" },
      info: { tr: "Tasarım onaylandığında lazer kesim hemen başlar. Onaydan teslimata kısa bir süre geçer; hazır modellerde teslimat daha da hızlıdır." },
      points: [
        { tr: "Onaydan sonra hemen üretim" },
        { tr: "Hazır modellerde kısa teslim" },
        { tr: "WhatsApp ile hızlı iletişim" },
      ],
    },
    {
      icon: 'sparkle',
      image: '/images/products/aurelia-mandala-aynali-duvar-saati/1.webp',
      eyebrow: { tr: "Şık Tasarım" },
      info: { tr: "Dekoratif ve işlevsel: ürünlerimiz evinizde, atölyenizde ya da iş yerinizde hem düzen hem de görsel zenginlik katar." },
      points: [
        { tr: "Özgün, katmanlı desenler" },
        { tr: "Dekor ve düzen bir arada" },
        { tr: "Hediye olarak da ideal" },
      ],
    },
  ],
};

export const customOrderBanner = {
  image: '/images/placeholder-banner.webp',
  // Portrait crop for mobile, swapped via a CSS breakpoint — see CustomOrderBanner.jsx.
  mobileImage: '/images/placeholder-banner-mobile.webp',
  // The one product this banner promotes (id from src/data/products.js). The banner links to
  // /urunler/<featuredProductId>; the headline is the product's own name.
  featuredProductId: 'kw-dd-002', // Elora Mandala Ayna
  tag: { tr: 'Öne çıkan ürün' },
  cta: {
    tr: 'Ürünü incele',
  },
};

export const contactSection = {
  title: { tr: 'İletişim' },
  // All contact details below are obvious placeholders — replace with real values.
  mapHref: 'https://maps.app.goo.gl/XQXQxq1o7Q8qX9Qv6',
  mapCoords: '40.1405278,26.4069977',
  address: 'Barbaros Mah. Kıbrıs Sk. No: 21 D:1, Çanakkale',
  phone: '+90 552 473 35 45',
  phoneDisplay: '0552 473 3545',
  whatsappHref: 'https://wa.me/905524733545',
  instagramHref: 'https://www.instagram.com/kalviawoods/',
  instagramHandle: '@kalviawoods',
  // No backend — this form composes a WhatsApp message and hands off to wa.me
  // (see ContactSection.jsx), matching the rest of the site's WhatsApp-first contact model.
  form: {
    nameLabel: { tr: 'Ad Soyad' },
    phoneLabel: { tr: 'Telefon' },
    messageLabel: { tr: 'Mesajınız' },
    submit: { tr: "WhatsApp'tan Gönder" },
    errors: {
      nameRequired: { tr: 'Lütfen adınızı girin.' },
      phoneRequired: { tr: 'Lütfen telefon numaranızı girin.' },
      phoneInvalid: { tr: 'Lütfen geçerli bir telefon numarası girin.' },
      messageRequired: { tr: 'Lütfen mesajınızı girin.' },
    },
  },
  labels: {
    address: { tr: 'Adres' },
    addressCta: { tr: 'Haritada görüntüle' },
    phone: { tr: 'Telefon' },
    instagram: { tr: 'Instagram' },
  },
};

export const footer = {
  rights: {
    tr: 'Tüm hakları saklıdır.',
  },
};
