import React from 'react';
import { useLanguage } from './LanguageContext';

/**
 * Premium bilingual toggle — variants: light (navbar), dark (sticky bars), compact (mobile)
 */
export default function LanguageToggle({ variant = 'light', size = 'md', className = '' }) {
  const { lang, setLang } = useLanguage();

  const isDark = variant === 'dark';
  const isCompact = size === 'sm' || variant === 'compact';

  return (
    <div
      className={`lang-toggle lang-toggle--${variant} lang-toggle--${size} ${className}`}
      role="group"
      aria-label={lang === 'am' ? 'ቋንቋ ቀይር' : 'Switch language'}
    >
      <div className="lang-toggle__track">
        <span
          className="lang-toggle__indicator"
          style={{ transform: lang === 'en' ? 'translateX(0)' : 'translateX(100%)' }}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`lang-toggle__btn ${lang === 'en' ? 'lang-toggle__btn--active' : ''}`}
          aria-pressed={lang === 'en'}
        >
          {!isCompact && <span className="lang-toggle__globe" aria-hidden="true">◉</span>}
          <span>EN</span>
        </button>
        <button
          type="button"
          onClick={() => setLang('am')}
          className={`lang-toggle__btn lang-toggle__btn--am ${lang === 'am' ? 'lang-toggle__btn--active' : ''}`}
          aria-pressed={lang === 'am'}
        >
          {!isCompact && <span className="lang-toggle__globe" aria-hidden="true">◉</span>}
          <span>{isCompact ? 'አማ' : 'አማርኛ'}</span>
        </button>
      </div>
      {!isCompact && (
        <span className={`lang-toggle__label ${isDark ? 'lang-toggle__label--dark' : ''}`}>
          {lang === 'am' ? 'ቋንቋ' : 'Language'}
        </span>
      )}
    </div>
  );
}
