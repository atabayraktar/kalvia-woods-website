import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '@/styles/main.scss';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import ScrollTopButton from '@/components/ScrollTopButton';

// Self-hosted via next/font (built at compile time, no external request at runtime).
// axes:['wdth'] pulls in Archivo's width axis for the wide display headings; Hanken
// Grotesk on Google Fonts only exposes wght, so its wdth setting elsewhere in the CSS is a
// harmless no-op fallback.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  axes: ['wdth'],
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

// Third, narrowly-scoped utility face: data-like labels only (price, product code, spec
// lines, pagination numbers, counters — see the mono-label mixin in _marks.scss). Static
// family, so the weights are listed explicitly.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Page-reveal + scroll restoration, coordinated so a "blink" never happens: the incoming
  // page stays invisible (opacity:0, see .page-transition/.is-visible in globals.scss)
  // until we've positioned its scroll correctly, THEN it fades in already-settled.
  //
  // `ready` starts true (covers the very first load: server-rendered markup and the
  // client's initial hydration pass agree, so there's nothing to hide or restore).
  // `isFirstPathRef` skips the hide/restore dance on that same first run of the effect.
  const [ready, setReady] = useState(true);
  const isFirstPathRef = useRef(true);

  // Keyed to router.pathname (not asPath) so shallow query-only updates on the same page
  // (/urunler's filter/sort/page syncing) never trigger this — only a real navigation does.
  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return undefined;
    }

    setReady(false);
    const key = `scrollpos:${router.asPath}`;
    const saved = sessionStorage.getItem(key);

    let raf = 0;
    let cancelled = false;

    if (saved !== null) {
      const target = Number(saved);
      // Poll until the document is actually tall enough for `target` (the destination
      // page's client-hydrated content may not have grown yet), capped on wall-clock time
      // so a throttled background tab still reveals within ~1.5s.
      const deadline = Date.now() + 1500;
      const waitForHeight = () => {
        if (cancelled) return;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll >= target || Date.now() >= deadline) {
          sessionStorage.removeItem(key);
          window.scrollTo(0, target);
          setReady(true);
        } else {
          raf = requestAnimationFrame(waitForHeight);
        }
      };
      raf = requestAnimationFrame(waitForHeight);
    } else {
      raf = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        setReady(true);
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  // Saved on every real navigation-away (routeChangeStart), keyed to the exact URL being
  // left (query included) so distinct filtered views each restore correctly.
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(`scrollpos:${router.asPath}`, String(window.scrollY));
    };
    router.events.on('routeChangeStart', saveScroll);
    return () => router.events.off('routeChangeStart', saveScroll);
  }, [router.asPath, router.events]);

  // Inertia smooth-scroll for wheel/trackpad input. respectReducedMotion defaults to true
  // in Lenis itself. anchors:true covers the header nav's in-page "#hakkimizda"/"#iletisim"
  // links; clearance under the fixed header is handled via CSS scroll-margin-top on the
  // target sections. autoRaf:true — without it Lenis intercepts input but never ticks.
  useEffect(() => {
    const lenis = new Lenis({ anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return (
    <div className={`${archivo.variable} ${hankenGrotesk.variable} ${plexMono.variable} font-root`}>
      <LanguageProvider>
        <a href="#main-content" className="skip-link">
          Ana içeriğe geç
        </a>
        {/* Persistent chrome — Header/Footer/WhatsAppFab/ScrollTopButton live HERE, as
            siblings of the keyed page-transition div below, never inside it, so client-side
            navigation never unmounts/remounts them. None of these take props. */}
        <Header />
        {/* Keyed to the route pattern (not full asPath, so filter/sort/page query changes
            on the same page don't retrigger it) — remounting this wrapper on every real
            navigation replays the fade-in. `ready` gates the actual fade. Opacity-only,
            deliberately no transform: per-page content can contain fixed descendants
            (modals), and a transforming ancestor would become their containing block. */}
        <div key={router.pathname} className={`page-transition${ready ? ' is-visible' : ''}`}>
          <Component {...pageProps} />
        </div>
        <Footer />
        <WhatsAppFab />
        <ScrollTopButton />
      </LanguageProvider>
    </div>
  );
}
