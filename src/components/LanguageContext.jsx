import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('yismake_lang');
      return saved === 'am' ? 'am' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('yismake_lang', lang);
      document.documentElement.lang = lang === 'am' ? 'am' : 'en';
      document.body.classList.toggle('lang-am', lang === 'am');
      document.body.classList.toggle('lang-en', lang === 'en');
    } catch (e) {
      console.error(e);
    }
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'am' : 'en'));
  };

  /**
   * Helper translation function:
   * Accepts either:
   * 1. t({ en: "Hello", am: "ሰላም" })
   * 2. t("Hello", "ሰላም")
   */
  const t = (enVal, amVal) => {
    if (typeof enVal === 'object' && enVal !== null) {
      return lang === 'am' ? (enVal.am || enVal.en) : (enVal.en || enVal.am);
    }
    return lang === 'am' ? (amVal || enVal) : enVal;
  };

  const isAm = lang === 'am';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isAm }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
