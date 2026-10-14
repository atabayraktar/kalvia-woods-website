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
    { href: '/kalvia-works', label: { tr: 'Kalvia Works' } },
  ],
};

export const heroSlides = [
  {
    id: 'hero-1',
    // Desktop only: the ship fills the lower-left, so the copy sits in the calm upper-left instead.
    copyAlign: 'top',
    media: {
      type: 'image',
      src: '/images/hero-gemi.webp',
      mobileSrc: '/images/hero-gemi-mobile.webp',
      alt: { tr: 'Lazer kesim parçalardan üretilmiş detaylı savaş gemisi maketi' },
    },
    title: { tr: 'Lazerle şekillenen ürünler.' },
    info: {
      tr: 'Kalvia Woods, kişiye özel lazer kesim ürünler üretir; maketlerden organizerlara, aynalardan duvar tablolarına her parça milimetrik hassasiyetle kendi atölyemizde şekillenir.',
    },
    cta: { tr: 'Ürünleri keşfedin' },
    href: '/urunler',
  },
  {
    id: 'hero-2',
    media: {
      type: 'image',
      src: '/images/hero-craftwall.webp',
      position: 'center top',
      mobileSrc: '/images/hero-craftwall-mobile.webp',
      alt: { tr: 'Duvara monte modüler lazer kesim atölye organizeri' },
    },
    title: { tr: 'Duvarınız da atölyeniz olsun.' },
    info: {
      tr: 'Modüler organizerlarla boyaları, kalemleri ve el aletlerini düzenli, ulaşılır ve göz önünde tutun.',
    },
    cta: { tr: 'Organizerlar' },
    href: '/urunler?kategori=organizer-workstation',
  },
  {
    id: 'hero-3',
    media: {
      type: 'image',
      src: '/images/hero-ayna.webp',
      position: 'center top',
      mobileSrc: '/images/hero-ayna-mobile.webp',
      alt: { tr: 'Lazer kesim şeritlerden oluşan avize' },
    },
    title: { tr: 'Işığın şekil aldığı yer.' },
    info: {
      tr: 'Lazerle kesilmiş ince detaylar, mekâna sıcak bir desen ve yumuşak bir ışık katar.',
    },
    cta: { tr: 'Duvar dekorları' },
    href: '/urunler?kategori=duvar-dekoru',
  },
  {
    id: 'hero-4',
    media: {
      type: 'image',
      src: '/images/hero-forgedesk.webp',
      mobileSrc: '/images/hero-forgedesk-mobile.webp',
      alt: { tr: 'Modüler lazer kesim hobi atölyesi masası' },
    },
    title: { tr: 'Hobiniz için ölçülü çözümler.' },
    info: {
      tr: 'Ölçüyü, düzeni ve ayrıntıyı siz seçin; fikrinizi birlikte tasarlayıp lazerle kesilmiş ürüne dönüştürelim.',
    },
    cta: { tr: 'Tüm ürünler' },
    href: '/urunler',
  },
  {
    id: 'hero-5',
    media: {
      type: 'image',
      src: '/images/hero-kartvizit.webp',
      mobileSrc: '/images/hero-kartvizit-mobile.webp',
      alt: { tr: 'Lazer kesim kartvizit örnekleri: delikli desenli, logolu ve isimli kartlar' },
    },
    title: { tr: 'Kartvizitiniz de lazerle şekillensin.' },
    info: {
      tr: 'Logonuzu, desenlerinizi ve ismi lazerle işletin; elden ele geçtiğinde akılda kalan, fark yaratan kartvizitler.',
    },
    cta: { tr: 'Kartvizit talebi' },
    action: 'custom-order',
  },
];

export const categorySection = {
  title: {
    tr: ['Her ihtiyaç için', 'lazer kesim ürünler.'],
  },
  // Four equal cards (the section's grid is 4-up from 960px). `slug` is a main category from
  // PRODUCT_CATEGORIES in src/data/products.js (optional `sub` = PRODUCT_SUBCATEGORIES slug);
  // each card deep-links to /urunler with those filters pre-applied. The photos carry no
  // captions — the title is rendered by the card itself.
  categories: [
    {
      slug: 'organizer-workstation',
      image: '/images/placeholder-category-1.webp',
      title: { tr: 'Organizer & Standlar' },
    },
    {
      slug: 'masaustu-dekor',
      image: '/images/placeholder-category-2.webp',
      title: { tr: 'Aksesuarlar' },
    },
    {
      slug: 'duvar-dekoru',
      image: '/images/placeholder-category-3.webp',
      title: { tr: 'Aynalar & Tablolar' },
    },
    {
      slug: 'aydinlatma',
      image: '/images/placeholder-category-4.webp',
      title: { tr: 'Avize & Aplikler' },
    },
  ],
};

export const aboutKalvia = {
  title: { tr: 'Kalvia Woods Hakkında' },
  paragraph: {
    tr: 'Kalvia Woods, lazer kesim teknolojisiyle kişiye özel ürünler üreten bir atölyedir. Organizerlardan aynalara, duvar tablolarından hediyelik parçalara kadar her ürün, tasarım dosyasından son rötuşa kadar kendi atölyemizde şekillenir. Hassas kesim, temiz kenarlar ve istediğiniz gibi üretim; işimizin merkezinde yer alır.',
  },
  image: '/images/placeholder-about.webp',
  boxes: [
    {
      icon: 'laser',
      image: '/images/hero-gemi.webp',
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
      image: '/images/hero-kartvizit.webp',
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
      image: '/images/hero-craftwall.webp',
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
      image: '/images/hero-forgedesk.webp',
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
  image: '/images/banner-fason.webp',
  // Portrait crop for mobile, swapped via a CSS breakpoint — see CustomOrderBanner.jsx.
  mobileImage: '/images/banner-fason-mobile.webp',
  tag: { tr: 'Fason & özel kesim' },
  title: { tr: 'Siz anlatın, biz keselim.' },
  text: {
    tr: 'Kendi çiziminiz, tasarımınız ya da sadece bir fikriniz yeterli. Ölçünüze göre lazerle hassas kesim yapıyoruz.',
  },
  cta: { tr: 'Talep oluştur' },
};

// Small request form opened by the banner above and the custom-order card on /urunler. It only
// collects text and hands it to WhatsApp; photos/drawings are sent in the chat itself.
export const customOrderModal = {
  eyebrow: { tr: 'Özel sipariş' },
  title: { tr: 'Ne kestirmek istiyorsunuz?' },
  lead: { tr: 'Kısaca anlatın, WhatsApp üzerinden size dönelim.' },
  messageLabel: { tr: 'Talebiniz' },
  placeholder: { tr: 'Ürün, ölçü, adet, varsa istediğiniz yazı veya desen…' },
  messageRequired: { tr: 'Lütfen talebinizi kısaca yazın.' },
  note: { tr: 'Görsel veya çizim dosyalarınızı butona bastıktan sonra WhatsApp sohbetinden iletebilirsiniz.' },
  close: { tr: 'Kapat' },
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
