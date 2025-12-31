import { useState, useEffect } from 'react';
import { detectLanguage, getTranslation, type Language } from '../i18n/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language | null;
      return saved || detectLanguage();
    }
    return 'de';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return { language, setLanguage, t };
};


