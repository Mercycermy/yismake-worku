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
    { to: '/books', num: '01', en: 'BOOKS', am: 'መጻሕፍት' },
    { to: '/universe', num: '02', en: 'UNIVERSE', am: 'የዴርቶጋዳ ዓለም' },
    { to: '/author', num: '03', en: 'THE AUTHOR', am: 'ደራሲው' },
    { to: '/archive', num: '04', en: 'ARCHIVE', am: 'ማህደር' },
    { to: '/sources', num: '05', en: 'SOURCES', am: 'ማጣቀሻዎች' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'scrolled py-3' : 'py-4 sm:py-5'
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Left: Editorial Monogram & Author Identifier */}
        <Link to="/" className="flex items-center gap-3.5 group text-decoration-none shrink-0">
          <div className="author-seal">
            <span>ይ</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-bold tracking-[0.18em] text-[var(--text-vellum)] font-['Cinzel'] group-hover:text-[var(--highland-gold)] transition-colors">
                Y.W.
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase">
                11°56′N 37°18′E
              </span>
            </div>
            <span className="text-xs font-semibold text-[var(--highland-gold)] font-['Noto_Serif_Ethiopic'] tracking-wide -mt-0.5">
              ይስማዕከ ወርቁ
            </span>
          </div>
        </Link>

        {/* Center: Editorial Index Navigation (01 BOOKS · 02 UNIVERSE...) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-baseline gap-1.5 py-1 text-xs font-mono tracking-[0.16em] transition-all ${
                  active
                    ? 'text-[var(--text-vellum)] border-b border-[var(--highland-gold)]'
                    : 'text-[var(--text-stone)] hover:text-[var(--text-vellum)]'
                }`}
              >
                <span className={`text-[10px] transition-colors ${active ? 'text-[var(--highland-gold)] font-bold' : 'text-[var(--text-muted)] group-hover:text-[var(--highland-gold)]'}`}>
                  {item.num}
                </span>
                <span className={lang === 'am' ? "font-['Noto_Serif_Ethiopic'] text-xs font-medium" : ""}>
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
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-widest text-[var(--text-stone)] hover:text-[var(--highland-gold)] border border-[var(--rule-line-subtle)] hover:border-[var(--rule-line)] transition-all"
            title="Official Telegram Dispatch (18.6K+ subscribers)"
          >
            <span>TG</span>
            <span className="text-[var(--highland-gold)]">↗</span>
          </a>

          {/* Minimalist Editorial Language Switch */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono border border-[var(--rule-line)] hover:border-[var(--highland-gold)] text-[var(--text-vellum)] transition-colors cursor-pointer"
            aria-label="Switch Language"
            title="Toggle between English and Amharic"
          >
            <span className={lang === 'en' ? 'text-[var(--highland-gold)] font-bold' : 'text-[var(--text-muted)]'}>EN</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className={`font-['Noto_Serif_Ethiopic'] ${lang === 'am' ? 'text-[var(--highland-gold)] font-bold' : 'text-[var(--text-muted)]'}`}>አማ</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 border border-[var(--rule-line)] text-[var(--text-vellum)] hover:text-[var(--highland-gold)] transition-colors cursor-pointer"
            aria-label="Toggle Archival Index"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">
              {mobileMenuOpen ? 'CLOSE' : 'INDEX'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Archival Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-6 pt-6 pb-8 bg-[#0a0c0f] border-b border-[var(--rule-line-strong)] animate-fade-in">
          <div className="mb-4 pb-2 border-b border-[var(--rule-line-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
            <span>ARCHIVAL INDEX</span>
            <span>GOJJAM · LAKE TANA</span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`index-row ${active ? 'border-[var(--highland-gold)] text-[var(--highland-gold)]' : 'text-[var(--text-vellum)]'}`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="index-num">{item.num}</span>
                    <span className="font-serif-latin text-base tracking-wider">{item.en}</span>
                  </div>
                  <span className="font-['Noto_Serif_Ethiopic'] text-xs text-[var(--text-stone)]">
                    {item.am}
                  </span>
                </Link>
              );
            })}

            <Link
              to="/contact"
              className="index-row text-[var(--text-vellum)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="index-num">06</span>
                <span className="font-serif-latin text-base tracking-wider">DISPATCH & CONTACT</span>
              </div>
              <span className="font-['Noto_Serif_Ethiopic'] text-xs text-[var(--text-stone)]">
                ግንኙነት
              </span>
            </Link>
          </nav>

          <div className="mt-6 pt-4 border-t border-[var(--rule-line-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-stone)]">
            <a
              href="https://t.me/yismakeworku"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--highland-gold)] transition-colors flex items-center gap-1.5"
            >
              <span>TELEGRAM @YISMAKEWORKU</span>
              <span className="text-[var(--highland-gold)]">↗</span>
            </a>
            <span className="text-[var(--text-muted)] text-[10px]">18.6K+ READERS</span>
          </div>
        </div>
      )}
    </header>
  );
}
