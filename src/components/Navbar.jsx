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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', labelEn: 'Home', labelAm: 'መነሻ' },
    { to: '/universe', labelEn: 'The Universe', labelAm: 'የልቦለድ ዓለም' },
    { to: '/books', labelEn: 'Books', labelAm: 'መጻሕፍት' },
    { to: '/author', labelEn: 'The Author', labelAm: 'ደራሲው' },
    { to: '/archive', labelEn: 'Archive', labelAm: 'ማህደር' },
    { to: '/sources', labelEn: 'Sources', labelAm: 'ማጣቀሻዎች' },
    { to: '/contact', labelEn: 'Contact', labelAm: 'ግንኙነት' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080b11]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#080b11]/95 via-[#080b11]/70 to-transparent py-4'
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Brand Logo & Author Name */}
        <Link to="/" className="flex items-center gap-3 group text-decoration-none shrink-0">
          <div className="author-seal transition-transform duration-300 group-hover:scale-105">
            <span>ይ</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-bold tracking-wider text-white font-['Cinzel'] group-hover:text-[#d4af37] transition-colors">
              YISMAKE WORKU
            </span>
            <span className="text-xs text-[#d4af37] font-semibold font-['Noto_Serif_Ethiopic'] tracking-wider -mt-1">
              ይስማዕከ ወርቁ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 text-decoration-none ${
                  active
                    ? 'text-[#00f0ff] bg-cyan-500/10 border border-cyan-500/30'
                    : 'text-[#e5dec9] hover:text-white hover:bg-white/5'
                }`}
              >
                {lang === 'am' ? link.labelAm : link.labelEn}
              </Link>
            );
          })}
        </nav>

        {/* Right Utility: Telegram & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Telegram Channel Link (Desktop) */}
          <a
            href="https://t.me/yismakeworku"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:border-[#00f0ff]/40 text-[#c7d2e5] hover:text-[#00f0ff] transition-all"
            title="Official Telegram Community (18.6K+ subscribers)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.63 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 3.98-1.73 6.64-2.88 7.97-3.44 3.8-1.58 4.59-1.86 5.11-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.22-.04.38z" />
            </svg>
            <span>@yismakeworku</span>
          </a>

          {/* Primary Language Switcher (Always Visible Everywhere) */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4af37]/15 hover:bg-[#d4af37]/25 border border-[#d4af37]/40 text-[#e5c358] text-xs font-bold transition-all cursor-pointer"
            aria-label="Switch Language"
            title="Toggle between English and Amharic"
          >
            <span className={lang === 'en' ? 'text-white font-black' : 'opacity-40'}>EN</span>
            <span className="opacity-30">/</span>
            <span className={`font-['Noto_Serif_Ethiopic'] ${lang === 'am' ? 'text-white font-black' : 'opacity-40'}`}>አማ</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#00f0ff] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-4 pb-6 bg-[#0c111c]/98 border-b border-white/15 shadow-2xl">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-cyan-500/15 text-[#00f0ff] border border-cyan-500/30'
                      : 'text-[#e5dec9] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{lang === 'am' ? link.labelAm : link.labelEn}</span>
                    <span className="text-xs text-white/40 font-mono">
                      {lang === 'am' ? link.labelEn : link.labelAm}
                    </span>
                  </div>
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#00f0ff]"
              >
                <span>Telegram: @yismakeworku (18.6K+)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
