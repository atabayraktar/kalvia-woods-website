import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Courier_Prime, Fraunces } from 'next/font/google';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '@/styles/main.scss';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import ScrollTopButton from '@/components/ScrollTopButton';

// Self-hosted via next/font (built at compile time, no external request at runtime).
// Exactly two families. latin-ext is required for Turkish (ş ğ İ ı).
// Courier Prime = typewriter voice (headings, nav, labels, prices, codes); Fraunces = soft
// warm serif for reading copy.
const courierPrime = Courier_Prime({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-courier',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Page fade-out -> swap -> fade-in, with scroll restored while the page is invisible.
  //  1. routeChangeStart (real navigation, not a shallow query sync): ready=false, so the
  //     current page fades to opacity 0 (FADE_OUT_MS).
  //  2. routeChangeComplete: Next has already rendered the new route into this component,
  //     but we keep showing the OLD page (`shown`) until the fade-out has finished, then
  //     swap to the latest Component/pageProps under a fresh key (new wrapper mounts at
  //     opacity 0 — no flash of unfaded content).
  //  3. The swap effect restores scroll, then ready=true fades the new page in.
  const FADE_OUT_MS = 200;
  const [ready, setReady] = useState(true);
  const [shown, setShown] = useState({ Component, pageProps, key: 0 });
  const latestRef = useRef({ Component, pageProps });
  latestRef.current = { Component, pageProps };
  const startRef = useRef(0);
  const swapTimerRef = useRef(0);
  const swappedRef = useRef(false);
  // Scroll position is only restored on browser back/forward; a normal link click always opens at the top.
  const popRef = useRef(false);
  const restoreRef = useRef(false);
  const lenisRef = useRef(null);
  const jumpTo = (y) => {
    if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true, force: true });
    window.scrollTo(0, y);
  };

  useEffect(() => {
    const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onStart = (url, { shallow } = {}) => {
      if (shallow) return;
      clearTimeout(swapTimerRef.current);
      startRef.current = performance.now();
      setReady(false);
    };
    const onComplete = (url, { shallow } = {}) => {
      if (shallow) return;
      const wait = reduce() ? 0 : Math.max(0, FADE_OUT_MS - (performance.now() - startRef.current));
      clearTimeout(swapTimerRef.current);
      swapTimerRef.current = window.setTimeout(() => {
        swappedRef.current = true;
        restoreRef.current = popRef.current;
        popRef.current = false;
        setShown((prev) => ({ ...latestRef.current, key: prev.key + 1 }));
      }, wait);
    };
    const onError = () => {
      clearTimeout(swapTimerRef.current);
      setReady(true);
    };
    router.beforePopState(() => {
      popRef.current = true;
      return true;
    });
    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onComplete);
    router.events.on('routeChangeError', onError);
    return () => {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onComplete);
      router.events.off('routeChangeError', onError);
      clearTimeout(swapTimerRef.current);
    };
  }, [router.events]);

  // Runs only after a swap (never on first load or shallow updates).
  useEffect(() => {
    if (!swappedRef.current) return undefined;
    swappedRef.current = false;
    const key = `scrollpos:${router.asPath}`;
    const saved = restoreRef.current ? sessionStorage.getItem(key) : null;
    sessionStorage.removeItem(key);

    let raf = 0;
    let cancelled = false;

    if (saved !== null) {
      const target = Number(saved);
      // Poll until the document is tall enough for `target` (client-hydrated content may not
      // have grown yet), capped on wall-clock time so a throttled tab still reveals.
      const deadline = Date.now() + 1500;
      const waitForHeight = () => {
        if (cancelled) return;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll >= target || Date.now() >= deadline) {
          sessionStorage.removeItem(key);
          jumpTo(target);
          setReady(true);
        } else {
          raf = requestAnimationFrame(waitForHeight);
        }
      };
      raf = requestAnimationFrame(waitForHeight);
    } else {
      raf = requestAnimationFrame(() => {
        jumpTo(0);
        setReady(true);
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown.key]);

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
    lenisRef.current = lenis;
    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`${courierPrime.variable} ${fraunces.variable} font-root`}>
      <LanguageProvider>
        <a href="#main-content" className="skip-link">
          Ana içeriğe geç
        </a>
        {/* Persistent chrome — Header/Footer/WhatsAppFab/ScrollTopButton live HERE, as
            siblings of the keyed page-transition div below, never inside it, so client-side
            navigation never unmounts/remounts them. None of these take props. */}
        <Header />
        {/* Keyed to the swap counter; see the fade logic above. Opacity-only (no transform:
            page content can contain fixed modals). */}
        <div key={shown.key} className={`page-transition${ready ? ' is-visible' : ''}`}>
          <shown.Component {...shown.pageProps} />
        </div>
        <Footer />
        <WhatsAppFab />
        <ScrollTopButton />
      </LanguageProvider>
    </div>
  );
}
