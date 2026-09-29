import { createContext, useContext } from 'react';

// Site is Turkish-only — no switcher, no persistence. `t()` is kept as the read API so
// every field in the tr/en/de content data still resolves without touching every caller.
const value = {
  lang: 'tr',
  setLang: () => {},
  t: (field) => {
    if (typeof field === 'string') return field;
    if (!field) return '';
    return field.tr ?? '';
  },
};

const LanguageContext = createContext(value);

export function LanguageProvider({ children }) {
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
