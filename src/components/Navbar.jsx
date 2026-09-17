import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { to: '/books', num: '01', geez: '፩', en: 'BOOKS', am: 'መጻሕፍት' },
    { to: '/universe', num: '02', geez: '፪', en: 'UNIVERSE', am: 'የዴርቶጋዳ ዓለም' },
    { to: '/author', num: '03', geez: '፫', en: 'THE AUTHOR', am: 'ደራሲው' },
    { to: '/archive', num: '04', geez: '፬', en: 'ARCHIVE', am: 'ማህደር' },
    { to: '/sources', num: '05', geez: '፭', en: 'SOURCES', am: 'ማጣቀሻዎች' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d1517]/95 backdrop-blur-md py-3 border-b border-[var(--border-hairline)] shadow-[0_4px_24px_rgba(0,0,0,0.85)]'
          : 'bg-[#0d1517] py-4 sm:py-5 border-b border-[var(--border-hairline)]'
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Left: Editorial Monogram & Author Identifier */}
        <Link to="/" className="flex items-center gap-3.5 group text-decoration-none shrink-0">
          <div className="w-10 h-10 flex items-center justify-center bg-[#132427] border border-[var(--border-hairline)] group-hover:border-[var(--primary)] text-[var(--secondary)] group-hover:text-[var(--primary)] font-serif text-lg font-bold transition-all shadow-[0_0_12px_-4px_rgba(45,212,191,0.2)]">
            <span>ይ</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-bold tracking-[0.18em] text-[var(--on-surface)] font-serif group-hover:text-[var(--primary)] transition-colors">
                Y.W.
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] text-[var(--outline)] tracking-widest uppercase">
                11°56′N 37°18′E
              </span>
            </div>
            <span className="text-xs font-semibold text-[var(--secondary)] font-serif tracking-wide -mt-0.5">
              ይስማዕከ ወርቁ
            </span>
          </div>
        </Link>

        {/* Center: Editorial Index Navigation with Ge'ez Lockups */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-baseline gap-1.5 py-1 text-xs font-mono tracking-[0.14em] transition-all relative ${
                  active
                    ? 'text-[var(--primary)] border-b-2 border-[var(--primary-container)]'
                    : 'text-[var(--on-surface-variant)] hover:text-[var(--primary)]'
                }`}
              >
                <span className={`text-[10px] font-bold ${active ? 'text-[var(--secondary)]' : 'text-[var(--outline)] group-hover:text-[var(--secondary)]'}`}>
                  {item.geez}·{item.num}
                </span>
                <span className={lang === 'am' ? 'font-serif text-xs font-medium' : ''}>
                  {lang === 'am' ? item.am : item.en}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Restrained Archival Tools (Language Switch + Telegram Link + Mobile Toggle) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Telegram Dispatch Link */}
          <a
            href="https://t.me/yismakeworku"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono tracking-widest text-[var(--on-surface-variant)] hover:text-[var(--primary)] bg-[#0e1a1d] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-all"
            title="Official Telegram Dispatch (18.6K+ subscribers)"
          >
            <span>TG</span>
            <span className="text-[var(--primary)]">↗</span>
          </a>

          {/* Minimalist Editorial Language Switch */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-1 text-[11px] font-mono bg-[#132427] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] text-[var(--on-surface)] transition-colors cursor-pointer"
            aria-label="Switch Language"
            title="Toggle between English and Amharic"
          >
            <span className={lang === 'en' ? 'text-[var(--primary)] font-bold' : 'text-[var(--outline)]'}>EN</span>
            <span className="text-[var(--outline-variant)]">/</span>
            <span className={`font-serif ${lang === 'am' ? 'text-[var(--secondary)] font-bold' : 'text-[var(--outline)]'}`}>አማ</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden px-2.5 py-1.5 bg-[#0e1a1d] border border-[var(--border-hairline)] text-[var(--on-surface)] hover:text-[var(--primary)] hover:border-[var(--primary-container)] transition-colors cursor-pointer"
            aria-label="Toggle Archival Index"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">
              {mobileMenuOpen ? 'CLOSE ✕' : 'INDEX ☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Archival Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-6 pt-6 pb-8 bg-[#0b1315] border-b border-[var(--border-hairline)] shadow-[0_12px_36px_rgba(0,0,0,0.9)] animate-fade-in">
          <div className="mb-4 pb-2 border-b border-[var(--border-hairline)] flex items-center justify-between text-[10px] font-mono text-[var(--outline)] tracking-widest uppercase">
            <span>ARCHIVAL INDEX</span>
            <span className="text-[var(--primary)]">GOJJAM · LAKE TANA</span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`archival-index-row ${active ? 'border-[var(--primary-container)] text-[var(--primary)]' : 'text-[var(--on-surface)]'}`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="archival-index-counter">{item.geez}</span>
                    <span className="font-mono text-[11px] text-[var(--outline)]">{item.num}</span>
                    <span className="font-serif text-base tracking-wider">{item.en}</span>
                  </div>
                  <span className="font-serif text-xs text-[var(--on-surface-variant)]">
                    {item.am}
                  </span>
                </Link>
              );
            })}

            <Link
              to="/contact"
              className="archival-index-row text-[var(--on-surface)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="archival-index-counter">፮</span>
                <span className="font-mono text-[11px] text-[var(--outline)]">06</span>
                <span className="font-serif text-base tracking-wider">DISPATCH & CONTACT</span>
              </div>
              <span className="font-serif text-xs text-[var(--on-surface-variant)]">
                ግንኙነት
              </span>
            </Link>
          </nav>

          <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono text-[var(--on-surface-variant)]">
            <a
              href="https://t.me/yismakeworku"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)] transition-colors flex items-center gap-1.5"
            >
              <span>TELEGRAM @YISMAKEWORKU</span>
              <span className="text-[var(--primary)]">↗</span>
            </a>
            <span className="text-[var(--outline)] text-[10px]">18.6K+ READERS</span>
          </div>
        </div>
      )}
    </header>
  );
}
