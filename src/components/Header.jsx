import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLanguage } from '@/context/LanguageContext';
import { header } from '@/data/homepageContent';
import Surface from './Surface';

export default function Header() {
  const { t } = useLanguage();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  // The mobile menu closes by picking a nav item, pressing its own X, or Escape (the
  // keyboard equivalent of the X button) — not by tapping outside.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // The header is a persistent singleton in _app.jsx (never unmounted on client-side
  // navigation), so closing the mobile menu on navigation has to be explicit.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);

  // "Reacts to scroll" cue for the flush bar — its material shadow appears once there's
  // page content passing beneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Already on the homepage: the logo just scrolls back to the top instead of reloading.
  const onLogoClick = (event) => {
    if (router.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // "Hakkımızda" and "İletişim" are in-page anchors to homepage-only sections — off the
  // homepage they need the leading "/" to actually navigate there first; on the homepage
  // itself the bare hash keeps the Lenis-eased in-page scroll (see _app.jsx).
  const resolveNavHref = (href) => (href.startsWith('#') && router.pathname !== '/' ? `/${href}` : href);

  // Real-page nav items render as next/link (client-side navigation); hash items stay
  // plain <a> so the homepage keeps its eased in-page scroll and "/#section" loads scroll
  // to the section natively.
  const NavAnchor = ({ href, ...rest }) => (href.startsWith('#') || href.startsWith('/#') ? <a href={href} {...rest} /> : <Link href={href} {...rest} />);

  // Clears a section's hash from the URL once you've scrolled fully past it. Homepage-only;
  // plain history.replaceState so this never touches Next's router.
  useEffect(() => {
    if (router.pathname !== '/') return undefined;

    const hashIds = header.nav
      .map((item) => item.href)
      .filter((href) => href.startsWith('#'))
      .map((href) => href.slice(1));
    const sections = hashIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && window.location.hash === `#${entry.target.id}`) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      });
    });
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [router.pathname]);

  return (
    <Surface
      as="header"
      ref={headerRef}
      className={`site-header surface--flush surface--calm${scrolled ? ' is-scrolled' : ''}`}
      contentClassName="site-header__content"
    >
      <div className="site-header__brand">
        <Link href="/" className="site-header__logo-link" aria-label="Kalvia Woods — anasayfa" onClick={onLogoClick}>
          <Image src="/images/logo-with-text.webp" alt="Kalvia Woods" width={290} height={240} priority className="site-header__logo" />
        </Link>
      </div>

      <div className="site-header__nav-group">
        <nav className="site-header__nav" aria-label="Ana menü">
          <ul>
            {header.nav.map((item) => (
              <li key={item.href}>
                <NavAnchor href={resolveNavHref(item.href)} className="accent-hover">
                  {t(item.label)}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__right">
          <button
            type="button"
            className="nav__burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Always mounted, shown/hidden via the Surface --veil opacity/transform transition.
          While closed it's inert + aria-hidden + pointer-events:none, so it's invisible to
          keyboard, screen readers and taps. React 18 doesn't forward a boolean `inert`,
          hence the empty-string form. */}
      <Surface
        as="div"
        id="mobile-nav"
        className={`site-header__mobile-menu surface--veil surface--calm${menuOpen ? ' is-open' : ''}`}
        contentClassName="site-header__mobile-menu-content"
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : ''}
      >
        <nav aria-label="Mobil menü">
          <ul>
            {header.nav.map((item) => (
              <li key={item.href}>
                <NavAnchor href={resolveNavHref(item.href)} className="accent-hover" onClick={() => setMenuOpen(false)}>
                  {t(item.label)}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </nav>
      </Surface>
    </Surface>
  );
}
