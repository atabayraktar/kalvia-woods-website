import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { heroSlides } from '@/data/homepageContent';
import Surface from './Surface';

// Slow, unhurried autoplay — pauses the moment someone touches the slider (hover, focus,
// drag) and never fights a manual nav. Video slides get longer so a clip shows itself.
const AUTOPLAY_MS = 8000;
const VIDEO_AUTOPLAY_MS = 12000;

const autoplayDurationFor = (slide) =>
  slide.media.type === 'video' ? VIDEO_AUTOPLAY_MS : AUTOPLAY_MS;

export default function HeroSlider() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const touchStartX = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    setLoaded((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, [index]);

  const total = heroSlides.length;
  const go = (next) => setIndex(((next % total) + total) % total);

  // Re-armed on every index change — autoplay tick, swipe, drag or dot click alike — so the
  // next auto-advance is always a full duration after the *most recent* slide change.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % total);
    }, autoplayDurationFor(heroSlides[index]));

    return () => clearInterval(timer);
  }, [index, total]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const onTouchStart = (event) => {
    pause();
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      go(delta > 0 ? index - 1 : index + 1);
    }
    touchStartX.current = null;
    resume();
  };

  // Mouse-drag swipe — listens on window between mousedown/mouseup so the drag still
  // resolves correctly if the pointer leaves the slider before release.
  const onMouseDown = (event) => {
    if (event.button !== 0) return;
    pause();
    const startX = event.clientX;

    const onWindowMouseUp = (upEvent) => {
      const delta = upEvent.clientX - startX;
      if (Math.abs(delta) > 40) {
        go(delta > 0 ? index - 1 : index + 1);
      }
      window.removeEventListener('mouseup', onWindowMouseUp);
      resume();
    };

    window.addEventListener('mouseup', onWindowMouseUp);
  };

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Öne çıkan ürünler"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        className="hero-slider__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="hero-slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {heroSlides.map((slide, i) => (
            <div
              className="hero-slider__slide"
              key={slide.id}
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${total}`}
            >
              <div className="hero-slider__media">
                {slide.media.type === 'video' ? (
                  loaded.has(i) && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={slide.media.poster}
                      preload={i === 0 ? 'auto' : 'metadata'}
                    >
                      {/* Mobile sources are a portrait crop supplied separately — the media
                          query has to come first: a <video> picks the first <source> that
                          both matches its media query (if any) and has a playable type. */}
                      {slide.media.mobileMp4 && (
                        <source media="(max-width: 640px)" src={slide.media.mobileMp4} type="video/mp4" />
                      )}
                      {slide.media.mobileWebm && (
                        <source media="(max-width: 640px)" src={slide.media.mobileWebm} type="video/webm" />
                      )}
                      <source src={slide.media.mp4} type="video/mp4" />
                      {slide.media.webm && <source src={slide.media.webm} type="video/webm" />}
                    </video>
                  )
                ) : (
                  <>
                    {/* Same art-direction split as the video slides, done with a plain CSS
                        breakpoint swap (see HeroSlider.scss) rather than matchMedia. */}
                    {slide.media.mobileSrc && (
                      <Image
                        src={slide.media.mobileSrc}
                        alt={t(slide.media.alt)}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="hero-slider__media-mobile"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    <Image
                      src={slide.media.src}
                      alt={t(slide.media.alt)}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className={slide.media.mobileSrc ? 'hero-slider__media-desktop' : undefined}
                      style={{ objectFit: 'cover' }}
                    />
                  </>
                )}
                <div className="hero-slider__scrim" aria-hidden="true" />
              </div>

              <div className="hero-slider__copy">
                {/* Only the active slide gets the real <h1> — all slides are always in the
                    DOM for the sliding transition, and a page must have exactly one h1. */}
                {i === index ? (
                  <h1 className="hero-slider__title">{t(slide.title)}</h1>
                ) : (
                  <p className="hero-slider__title">{t(slide.title)}</p>
                )}
                <p className="hero-slider__info">{t(slide.info)}</p>
                <Surface
                  as={Link}
                  href={slide.href}
                  className="hero-slider__cta surface--cta"
                  contentClassName="hero-slider__cta-content"
                >
                  <span className="btn__label">{t(slide.cta)}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Surface>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-slider__dots">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={`hero-slider__dot${i === index ? ' hero-slider__dot--active' : ''}`}
            aria-label={`${i + 1}. slayta git`}
            aria-current={i === index}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
