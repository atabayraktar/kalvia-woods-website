import { useLanguage } from '@/context/LanguageContext';

const TEXT = {
  title: { tr: 'Sonuç bulunamadı' },
  info: {
    tr: 'Bu filtrelerle eşleşen ürün yok. Aramayı veya kategori seçimini değiştirmeyi deneyin.',
  },
  reset: { tr: 'Filtreleri değiştir' },
};

export default function EmptyState({ onReset }) {
  const { t } = useLanguage();
  return (
    <div className="empty-state">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="2" />
        <path d="M45 45 62 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 32h16M32 24v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </svg>
      <p className="empty-state__title">{t(TEXT.title)}</p>
      <p className="empty-state__info">{t(TEXT.info)}</p>
      <button type="button" className="empty-state__reset" onClick={onReset}>
        {t(TEXT.reset)}
      </button>
    </div>
  );
}
