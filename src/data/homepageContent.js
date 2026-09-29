// Homepage copy for Kalvia Woods (Turkish is the source of truth; English/German fields
// remain for content still keyed by locale even though the site only renders Turkish).
// Every media path here points at a locally generated solid-colour placeholder
// (scripts/generate-placeholders.mjs) until real photography/video is supplied — swap the
// file, keep the path.

export const header = {
  nav: [
    { href: '/urunler', label: { tr: 'Ürünler', en: 'Products', de: 'Produkte' } },
    { href: '#hakkimizda', label: { tr: 'Hakkımızda', en: 'About', de: 'Über uns' } },
    { href: '#iletisim', label: { tr: 'İletişim', en: 'Contact', de: 'Kontakt' } },
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
      en: 'Wood and PVC, shaped by laser.',
      de: 'Holz und PVC, per Laser geformt.',
    },
    info: {
      tr: 'Kalvia Woods, ahşap ve PVC malzemeleri lazer kesim makinesiyle milimetrik hassasiyette işler; dekor, tabela, kutu ve özel tasarım ürünler üretir.',
      en: 'Kalvia Woods laser-cuts wood and PVC to millimetre precision — décor pieces, signage, boxes and fully custom designs.',
      de: 'Kalvia Woods schneidet Holz und PVC millimetergenau per Laser – Dekor, Beschilderung, Boxen und individuelle Designs.',
    },
    cta: { tr: 'Ürünleri keşfedin', en: 'Explore products', de: 'Produkte entdecken' },
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
      en: 'Precise cuts, natural texture.',
      de: 'Präziser Schnitt, natürliche Textur.',
    },
    info: {
      tr: 'Ahşabın sıcaklığını lazer kesimin temiz hatlarıyla buluşturuyoruz. Her parça, tasarımdan üretime kendi atölyemizde şekilleniyor.',
      en: 'We pair the warmth of wood with the clean lines of laser cutting. Every piece takes shape in our own workshop, from design to production.',
      de: 'Wir verbinden die Wärme des Holzes mit den klaren Linien des Laserschnitts. Jedes Stück entsteht in unserer eigenen Werkstatt.',
    },
    cta: { tr: 'Ahşap dekorlar', en: 'Wood décor', de: 'Holzdekor' },
    href: '/urunler?kategori=ahsap-dekor',
  },
  {
    id: 'hero-3',
    media: {
      type: 'image',
      src: '/images/placeholder-hero-3.webp',
      mobileSrc: '/images/placeholder-hero-3-mobile.webp',
      alt: {
        tr: 'Lazer kesim PVC tabela örnekleri (yer tutucu görsel)',
        en: 'Laser-cut PVC signage samples (placeholder image)',
        de: 'Lasergeschnittene PVC-Schilder (Platzhalterbild)',
      },
    },
    title: {
      tr: 'PVC tabela ve işaretler.',
      en: 'PVC signage and markers.',
      de: 'PVC-Schilder und Markierungen.',
    },
    info: {
      tr: 'İşletmeniz için dayanıklı, net okunan ve istediğiniz ölçüde üretilen PVC tabelalar — iç ve dış mekân için.',
      en: 'Durable, legible PVC signs made to the exact size you need — for indoor and outdoor use.',
      de: 'Langlebige, gut lesbare PVC-Schilder in genau Ihrem Maß – für innen und außen.',
    },
    cta: { tr: 'PVC tabelalar', en: 'PVC signage', de: 'PVC-Schilder' },
    href: '/urunler?kategori=pvc-tabela',
  },
];

export const categorySection = {
  title: {
    tr: ['Her ihtiyaç için', 'lazer kesim ürünler.'],
    en: ['Laser-cut products', 'for every need.'],
    de: ['Lasergeschnittene Produkte', 'für jeden Bedarf.'],
  },
  // Slugs must match PRODUCT_CATEGORIES in src/data/products.js — every card deep-links to
  // /urunler with that filter pre-applied.
  categories: [
    {
      slug: 'ahsap-dekor',
      image: '/images/placeholder-category-1.webp',
      title: { tr: 'Ahşap Dekor', en: 'Wood Décor', de: 'Holzdekor' },
    },
    {
      slug: 'pvc-tabela',
      image: '/images/placeholder-category-2.webp',
      title: { tr: 'PVC Tabela', en: 'PVC Signage', de: 'PVC-Schilder' },
    },
    {
      slug: 'ahsap-kutu',
      image: '/images/placeholder-category-3.webp',
      title: { tr: 'Ahşap Kutu', en: 'Wooden Boxes', de: 'Holzboxen' },
    },
    {
      slug: 'ozel-kesim',
      image: '/images/placeholder-category-4.webp',
      title: { tr: 'Özel Kesim', en: 'Custom Cutting', de: 'Sonderanfertigung' },
    },
  ],
};

export const aboutKalvia = {
  title: { tr: 'Kalvia Woods Hakkında', en: 'About Kalvia Woods', de: 'Über Kalvia Woods' },
  paragraph: {
    tr: 'Kalvia Woods, ahşap ve PVC malzemeleri lazer kesim teknolojisiyle işleyen bir üretim atölyesidir. Dekoratif duvar panolarından tabelalara, hediyelik kutulardan özel ölçü parçalara kadar her ürün, tasarım dosyasından son rötuşa kadar kendi atölyemizde şekillenir. Hassas kesim, temiz kenarlar ve doğal malzeme dokusu; işimizin merkezinde yer alır.',
    en: 'Kalvia Woods is a production workshop that shapes wood and PVC with laser-cutting technology. From decorative wall panels to signage, gift boxes to made-to-measure parts, every product takes form in our own workshop — from design file to final finish. Precise cuts, clean edges and the natural texture of the material sit at the centre of what we do.',
    de: 'Kalvia Woods ist eine Produktionswerkstatt, die Holz und PVC mit Laserschneidtechnik bearbeitet. Von dekorativen Wandpaneelen über Beschilderung bis hin zu Geschenkboxen und Maßanfertigungen entsteht jedes Produkt in unserer eigenen Werkstatt – von der Designdatei bis zum letzten Schliff. Präzise Schnitte, saubere Kanten und die natürliche Textur des Materials stehen im Mittelpunkt unserer Arbeit.',
  },
  image: '/images/placeholder-about.webp',
  boxes: [
    {
      icon: 'laser',
      eyebrow: { tr: 'Hassas', en: 'Precise', de: 'Präzise' },
      info: {
        tr: 'Hassas lazer kesim: milimetrik ölçü, temiz kenar.',
        en: 'Precision laser cutting: millimetre accuracy, clean edges.',
        de: 'Präziser Laserschnitt: millimetergenau, saubere Kanten.',
      },
    },
    {
      icon: 'design',
      eyebrow: { tr: 'Özel', en: 'Custom', de: 'Individuell' },
      info: {
        tr: 'Özel tasarım: kendi çiziminiz ya da bizim tasarımımız.',
        en: 'Custom design: your own drawing or one of ours.',
        de: 'Individuelles Design: Ihre Zeichnung oder unser Entwurf.',
      },
    },
    {
      icon: 'material',
      eyebrow: { tr: '2 Malzeme', en: '2 Materials', de: '2 Materialien' },
      info: {
        tr: 'Ahşap ve PVC: her kullanım için doğru malzeme.',
        en: 'Wood and PVC: the right material for every use.',
        de: 'Holz und PVC: das richtige Material für jeden Zweck.',
      },
    },
    {
      icon: 'speed',
      eyebrow: { tr: 'Hızlı', en: 'Fast', de: 'Schnell' },
      info: {
        tr: 'Hızlı üretim: onaydan teslimata kısa süre.',
        en: 'Fast production: short lead time from approval to delivery.',
        de: 'Schnelle Produktion: kurze Zeit von Freigabe bis Lieferung.',
      },
    },
    {
      icon: 'workshop',
      eyebrow: { tr: 'Atölye', en: 'Workshop', de: 'Werkstatt' },
      info: {
        tr: 'Kendi atölyemizde, kendi ellerimizle üretim.',
        en: 'Made in our own workshop, by our own hands.',
        de: 'In unserer eigenen Werkstatt, von eigener Hand gefertigt.',
      },
    },
  ],
};

export const customOrderBanner = {
  image: '/images/placeholder-banner.webp',
  // Portrait crop for mobile, swapped via a CSS breakpoint — see CustomOrderBanner.jsx.
  mobileImage: '/images/placeholder-banner-mobile.webp',
  title: {
    tr: 'Size uygun ürünü birlikte bulalım.',
    en: "Let's find the right product for you.",
    de: 'Finden wir gemeinsam das passende Produkt.',
  },
  cta: {
    tr: 'Ürün seçim anketi',
    en: 'Product finder quiz',
    de: 'Produktfinder',
  },
};

export const contactSection = {
  title: { tr: 'İletişim', en: 'Contact', de: 'Kontakt' },
  // All contact details below are obvious placeholders — replace with real values.
  mapHref: 'https://maps.google.com/?q=%C3%96rnek+Mah.+%C3%96rnek+Cad.+No:1+%C4%B0stanbul',
  mapCoords: '41.0082,28.9784',
  address: 'Örnek Mah. Örnek Cad. No:1, İstanbul',
  phone: '+90 5xx xxx xx xx',
  phoneDisplay: '0 5xx xxx xx xx',
  whatsappHref: 'https://wa.me/905000000000',
  instagramHref: 'https://www.instagram.com/kalviawoods.placeholder',
  facebookHref: 'https://www.facebook.com/kalviawoods.placeholder',
  instagramHandle: '@kalviawoods.placeholder',
  // No backend — this form composes a WhatsApp message and hands off to wa.me
  // (see ContactSection.jsx), matching the rest of the site's WhatsApp-first contact model.
  form: {
    nameLabel: { tr: 'Ad Soyad', en: 'Full name', de: 'Name' },
    phoneLabel: { tr: 'Telefon', en: 'Phone', de: 'Telefon' },
    messageLabel: { tr: 'Mesajınız', en: 'Message', de: 'Nachricht' },
    submit: { tr: "WhatsApp'tan Gönder", en: 'Send via WhatsApp', de: 'Über WhatsApp senden' },
    errors: {
      nameRequired: { tr: 'Lütfen adınızı girin.', en: 'Please enter your name.', de: 'Bitte geben Sie Ihren Namen ein.' },
      phoneRequired: { tr: 'Lütfen telefon numaranızı girin.', en: 'Please enter your phone number.', de: 'Bitte geben Sie Ihre Telefonnummer ein.' },
      phoneInvalid: { tr: 'Lütfen geçerli bir telefon numarası girin.', en: 'Please enter a valid phone number.', de: 'Bitte geben Sie eine gültige Telefonnummer ein.' },
      messageRequired: { tr: 'Lütfen mesajınızı girin.', en: 'Please enter your message.', de: 'Bitte geben Sie Ihre Nachricht ein.' },
    },
  },
  labels: {
    address: { tr: 'Adres', en: 'Address', de: 'Adresse' },
    addressCta: { tr: 'Haritada görüntüle', en: 'View on map', de: 'Auf der Karte ansehen' },
    phone: { tr: 'Telefon', en: 'Phone', de: 'Telefon' },
    instagram: { tr: 'Instagram', en: 'Instagram', de: 'Instagram' },
  },
};

export const footer = {
  rights: {
    tr: 'Tüm hakları saklıdır.',
    en: 'All rights reserved.',
    de: 'Alle Rechte vorbehalten.',
  },
};
