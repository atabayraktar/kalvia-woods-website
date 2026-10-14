// Copy for /kalvia-works — the sister brand (home decoration: wall panels, lambri, façade
// cladding). Facts are adapted from https://www.kalviaworks.com/; the page itself is designed
// in this site's own voice. Turkish only, `{ tr }` objects read through t().

const PHOTOS = '/images/kalvia-works';

export const kalviaWorks = {
  siteHref: 'https://www.kalviaworks.com/',
  instagramHref: 'https://www.instagram.com/kalviaworks/',
  instagramHandle: '@kalviaworks',
  whatsappHref: 'https://wa.me/905524733545',
  phone: '+90 552 473 35 45',
  phoneDisplay: '0552 473 3545',
  email: 'info@kalviaworks.com',
  address: 'İsmetpaşa Mah. 60. Sk. No:6/2B, Merkez, Çanakkale',
  hours: { tr: 'Pzt–Per & Cmt–Paz 07:30–22:00, Cuma kapalı' },

  hero: {
    stamp: { tr: 'Kalvia Woods’un kardeş markası' },
    wordmark: 'Kalvia Works',
    lead: { tr: 'Mekânınıza karakter katan duvar paneli, lambri ve cephe kaplama.' },
    text: { tr: 'Çanakkale’de ev dekorasyonu ve iç mekân uygulaması. Ölçüden montaja her adım tek elde.' },
    cta: { tr: 'Ücretsiz keşif iste' },
    ctaMessage: 'Merhaba, Kalvia Works lambri/panel uygulaması için ücretsiz keşif ve bilgi almak istiyorum.',
    secondary: { tr: 'kalviaworks.com' },
    imageMain: `${PHOTOS}/salon-mermer-tv-duvari-1.webp`,
    imageMainAlt: { tr: 'Mermer desenli panel ve lambri ile kaplanmış, gizli LED aydınlatmalı salon TV duvarı' },
    imageSecond: `${PHOTOS}/galeri-antre-gold.webp`,
    imageSecondAlt: { tr: 'Altın damarlı taş doku panel, lambri bordür ve gizli LED aydınlatmalı antre duvarı' },
    caption: { tr: 'Salon TV duvarı, Çanakkale' },
  },

  statement: {
    quote: { tr: 'Her detay, mekânın hikâyesini anlatır.' },
    attribution: { tr: 'Kalvia Works' },
    text: {
      tr: 'Modern cephe ve duvar paneli sistemlerinde uzmanlaşmış bir uygulama atölyesiyiz. Amacımız yüzeyi kaplamak değil; yaşadığınız ve çalıştığınız mekâna karakter katmak.',
    },
    image: `${PHOTOS}/salon-tas-panel-2.webp`,
    imageAlt: { tr: 'Taş dokulu panel ve lambri ile kaplanmış salon duvarı' },
    imageCaption: { tr: 'Taş panel salon, Çanakkale' },
    pillars: [
      { word: { tr: 'Tasarla' }, note: { tr: 'Ölçü, ışık ve doku birlikte planlanır.' } },
      { word: { tr: 'Uygula' }, note: { tr: 'Milimetrik kesim, temiz montaj.' } },
      { word: { tr: 'Fark yarat' }, note: { tr: 'Mekân kendi karakterini bulur.' } },
    ],
  },

  services: {
    eyebrow: { tr: 'Hizmetler' },
    title: { tr: 'Duvardan cepheye.' },
    intro: { tr: 'Panel, lambri ve cephe kaplama; tasarımdan montaja tek ekip.' },
    items: [
      {
        title: { tr: 'Duvar paneli' },
        text: { tr: 'Salon, yatak odası, ofis ya da mağaza; mekâna göre doku ve ton seçilen derzsiz duvarlar.' },
        image: `${PHOTOS}/galeri-yesil-mermer-gold.webp`,
        width: 900,
        height: 1600,
        alt: { tr: 'Yeşil mermer desenli duvar paneli ve altın çerçeveli oval aynalar' },
      },
      {
        title: { tr: 'Lambri uygulaması' },
        text: { tr: 'Mekâna sıcaklık taşıyan, kolay bakımlı, uzun ömürlü kaplama.' },
        image: `${PHOTOS}/oluklu-ahsap.webp`,
        width: 1200,
        height: 900,
        alt: { tr: 'Oluklu lambri panel örnekleri' },
      },
      {
        title: { tr: 'Cephe kaplama' },
        text: { tr: 'Hava koşullarına dirençli, dayanıklı ve estetik dış cephe sistemleri.' },
        image: `${PHOTOS}/galeri-flora-cephe.webp`,
        width: 1200,
        height: 1600,
        alt: { tr: 'Antrasit lambri ile kaplanmış çiçekçi dükkânı cephesi' },
      },
      {
        title: { tr: 'Akustik panel' },
        text: { tr: 'Yankıyı azaltan, ritmik çizgileriyle mekâna karakter veren çözümler.' },
        image: `${PHOTOS}/galeri-siyah-lambri-led.webp`,
        width: 1199,
        height: 1600,
        alt: { tr: 'Siyah lambri ve LED şeritli oturma alanı duvarı' },
      },
      {
        title: { tr: 'Tasarım ve danışmanlık' },
        text: { tr: 'Ölçü, ışık, doku ve bitişi projenizin hedefiyle birlikte planlıyoruz.' },
        image: `${PHOTOS}/galeri-restoran.webp`,
        width: 900,
        height: 1600,
        alt: { tr: 'Oluklu lambri ve mermer desenli panelle tasarlanmış restoran iç mekânı' },
      },
      {
        title: { tr: 'Profesyonel montaj' },
        text: { tr: 'Milimetrik kesim ve birleşim; çoğu zaman mevcut duvarın üzerine, kırım ve moloz olmadan.' },
        image: `${PHOTOS}/galeri-tas-panel-led.webp`,
        width: 1200,
        height: 1600,
        alt: { tr: 'Taş dokulu panel nişi ve gizli LED aydınlatma' },
      },
    ],
  },

  projects: {
    titleTop: { tr: 'Gerçek mekânlar,' },
    titleBottom: { tr: 'gerçek montaj.' },
    label: { tr: 'Uygulamalarımız' },
    intro: { tr: 'Her kare bizim uygulamamız. Beğendiğiniz işin fotoğrafını gönderin, benzerini mekânınız için fiyatlandıralım.' },
    cta: { tr: 'Fotoğraf gönder' },
    ctaMessage: 'Merhaba, Kalvia Works sitesindeki bir uygulamanın benzerini mekânım için fiyatlandırmanızı istiyorum.',
    items: [
      {
        key: 'a',
        image: `${PHOTOS}/kuyumcu-magaza-1.webp`,
        width: 1200,
        height: 1600,
        tag: { tr: 'Ticari' },
        title: { tr: 'Kuyumcu mağaza' },
        text: { tr: 'Beyaz-gold mermer desenli paneller ve LED şeritlerle komple dönüşüm.' },
      },
      {
        key: 'b',
        image: `${PHOTOS}/muzik-magazasi-2.webp`,
        width: 1400,
        height: 1114,
        tag: { tr: 'Ticari' },
        title: { tr: 'Müzik mağazası sergi duvarı' },
        text: { tr: 'Antrasit oluklu lambri: enstrümanları öne çıkaran koyu, ritmik fon.' },
      },
      {
        key: 'c',
        image: `${PHOTOS}/restoran-ic-mekan-1.webp`,
        width: 900,
        height: 1600,
        tag: { tr: 'Ticari' },
        title: { tr: 'Restoran iç mekân' },
        text: { tr: 'Bej oluklu lambri yarım duvar ve mermer desenli panellerle sıcak bir atmosfer.' },
      },
      {
        key: 'd',
        image: `${PHOTOS}/banyo-panel-1.webp`,
        width: 1200,
        height: 1600,
        tag: { tr: 'Konut' },
        title: { tr: 'Banyo dönüşümü' },
        text: { tr: 'Eski fayansın üzerine derzsiz panel. Kırım yok, moloz yok.' },
      },
      {
        key: 'e',
        image: `${PHOTOS}/kis-bahcesi-2.webp`,
        width: 1055,
        height: 1600,
        tag: { tr: 'Ticari' },
        title: { tr: 'Restoran kış bahçesi' },
        text: { tr: 'Beyaz dikey panel, antrasit taş panel ve amber ışıkla dört mevsim kullanılan avlu.' },
      },
      {
        key: 'f',
        image: `${PHOTOS}/tiny-house-cephe-1.webp`,
        width: 1400,
        height: 1050,
        tag: { tr: 'Dış cephe' },
        title: { tr: 'Tiny house cephesi' },
        text: { tr: 'Dikey cephe lambirisiyle tekerlekli ev kaplaması; UV ve darbeye dayanıklı.' },
      },
      {
        key: 'g',
        image: `${PHOTOS}/salon-tas-panel-2.webp`,
        width: 1200,
        height: 1600,
        tag: { tr: 'Konut' },
        title: { tr: 'Taş panel salon duvarı' },
        text: { tr: 'Taş dokulu panel ve lambri; yüzer TV ünitesiyle salonun odak duvarı.' },
      },
    ],
  },

  process: {
    title: { tr: 'İş emri' },
    steps: [
      { title: { tr: 'Keşif' }, text: { tr: 'Mekânı yerinde görür, ölçeriz. Çanakkale ve çevresinde ücretsiz.' } },
      { title: { tr: 'Teklif' }, text: { tr: 'Seri ve yerleşim planlanır, net fiyat verilir.' } },
      { title: { tr: 'Seçim' }, text: { tr: 'Doku ve ton, mekânın amacına göre birlikte seçilir.' } },
      { title: { tr: 'Montaj' }, text: { tr: 'Kesim, birleşim ve bitiş çizgileri milimetrik uygulanır.' } },
    ],
  },

  faq: {
    title: { tr: 'Aklınıza takılanlar' },
    intro: { tr: 'Cevabı burada yoksa mekânınızın fotoğrafını gönderin; aynı gün dönelim.' },
    cta: { tr: 'WhatsApp’tan sor' },
    ctaMessage: 'Merhaba, Kalvia Works hakkında bir sorum var.',
    image: `${PHOTOS}/galeri-antre-gold.webp`,
    imageAlt: { tr: 'Altın damarlı taş doku panel, lambri bordür ve gizli LED aydınlatmalı antre duvarı' },
    imageCaption: { tr: 'Antre duvarı, altın taş doku' },
    items: [
      {
        q: { tr: 'Uygulama ne kadar sürer?' },
        a: { tr: 'Mekânın büyüklüğüne ve panel tipine göre değişir. Tek bir oda genellikle 1–2 günde tamamlanır; keşifte net süreyi söyleriz.' },
      },
      {
        q: { tr: 'Hangi mekânlarda kullanılır?' },
        a: { tr: 'Salon, yatak odası, ofis, kafe, mağaza, dış cephe ve nemli alanlar dahil pek çok yerde. Kullanım alanına göre uygun ürünü öneririz.' },
      },
      {
        q: { tr: 'Ücretsiz keşif var mı?' },
        a: { tr: 'Evet. Çanakkale ve çevresinde keşif, ölçüm ve fiyat teklifi ücretsiz. WhatsApp veya telefonla randevu alabilirsiniz.' },
      },
      {
        q: { tr: 'Bakımı zor mu?' },
        a: { tr: 'Hayır. Leke ve kir tutmaz, nemli bezle temizlenir. Boya, çatlama ya da dökülme sorunu yaşanmaz.' },
      },
      {
        q: { tr: 'Eski duvarın üzerine uygulanır mı?' },
        a: { tr: 'Çoğu durumda evet. Yüzey hazırlandıktan sonra mevcut duvarın üzerine montaj yapılır; kırım ve döküm zahmeti olmaz.' },
      },
      {
        q: { tr: 'Çanakkale dışına hizmet veriyor musunuz?' },
        a: { tr: 'Montaj Çanakkale ve ilçelerinde geçerli. Panel ve lambri ürünlerini Türkiye’nin her yerine adetli veya toptan gönderiyoruz; ürünü WhatsApp’tan yazmanız yeterli.' },
      },
      {
        q: { tr: 'Fiyat neye göre belirlenir?' },
        a: { tr: 'Yüzeyin metrekaresine, seçilen panel tipine ve işçilik detayına göre. Net teklif için mekânın fotoğrafını göndermeniz yeterli.' },
      },
    ],
  },

  contact: {
    title: { tr: 'Projenizi konuşalım.' },
    promiseTop: { tr: 'Mekânınızın fotoğrafını gönderin,' },
    promiseBottom: { tr: 'aynı gün fiyat aralığıyla dönelim.' },
    note: { tr: 'Çanakkale’de keşif ücretsiz. Panel ve lambri ürünleri Türkiye geneline gönderilir.' },
    whatsapp: { tr: 'WhatsApp’tan yaz' },
    whatsappMessage: 'Merhaba, Kalvia Works lambri/panel uygulaması için bilgi almak istiyorum.',
    site: { tr: 'Kalvia Works sitesi' },
    mapLabel: { tr: 'Haritada aç' },
    mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('İsmetpaşa Mah. 60. Sk. No:6/2B, Çanakkale')}`,
    atelier: { tr: 'Atölye' },
  },
};
