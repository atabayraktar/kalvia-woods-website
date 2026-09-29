import { useLanguage } from '@/context/LanguageContext';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import Surface from './Surface';

const TEXT = {
  categories: { tr: 'Kategoriler', en: 'Categories', de: 'Kategorien' },
  reset: { tr: 'Sıfırla', en: 'Reset', de: 'Zurücksetzen' },
  all: { tr: 'Tümü', en: 'All', de: 'Alle' },
  filter: { tr: 'Filtrele', en: 'Filter', de: 'Filtern' },
  close: { tr: 'Kapat', en: 'Close', de: 'Schließen' },
};

export default function FilterPanel({ categories, active, onSelect, className = '' }) {
  const { t } = useLanguage();

  return (
    <div className={`filter-panel ${className}`}>
      <div className="filter-panel__head">
        <h2 className="filter-panel__title">{t(TEXT.categories)}</h2>
        {active && (
          <button type="button" className="filter-panel__reset" onClick={() => onSelect(null)}>
            {t(TEXT.reset)}
          </button>
        )}
      </div>

      <ul className="filter-panel__list">
        <li>
          <button
            type="button"
            className={`filter-panel__item${!active ? ' filter-panel__item--active' : ''}`}
            onClick={() => onSelect(null)}
          >
            {t(TEXT.all)}
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              type="button"
              className={`filter-panel__item${active === cat.slug ? ' filter-panel__item--active' : ''}`}
              onClick={() => onSelect(cat.slug)}
            >
              {t(cat.label)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Mobile: same list rendered inside a full-screen sheet — see FilterPanel.scss and the
// /urunler page for how the two variants are toggled. Picking a category closes the sheet
// immediately (like a native dropdown). Always mounted, shown/hidden via the Surface --veil
// opacity transition; closed it's inert + aria-hidden + pointer-events:none. React 18
// doesn't forward a boolean `inert`, hence the empty-string form.
export function FilterPanelSheet({ open, onClose, onSelect, ...props }) {
  const { t } = useLanguage();
  useBodyScrollLock(open);
  const handleSelect = (value) => {
    onSelect(value);
    onClose();
  };
  return (
    <div
      className={`filter-sheet__backdrop${open ? ' is-open' : ''}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      aria-hidden={!open}
      inert={open ? undefined : ''}
    >
      <Surface
        as="div"
        className={`filter-sheet surface--veil surface--calm${open ? ' is-open' : ''}`}
        contentClassName="filter-sheet__content"
      >
        <div className="filter-sheet__head">
          <span className="filter-sheet__heading">{t(TEXT.filter)}</span>
          <button type="button" className="filter-sheet__close" onClick={onClose} aria-label={t(TEXT.close)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <FilterPanel {...props} onSelect={handleSelect} />
      </Surface>
    </div>
  );
}
