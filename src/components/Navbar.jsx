import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import AuthorSignature from './AuthorSignature';

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

  // J.K. Rowling navigation structure
  const navItems = [
    { to: '/', en: 'Home', am: 'መነሻ' },
    { to: '/news', en: 'News', am: 'ዜናዎች' },
    { to: '/in-his-own-words', en: 'In His Own Words', am: 'በራሱ አንደበት' },
    { to: '/on-writing', en: 'On Writing', am: 'ስለ አጻጻፍ' },
    { to: '/books', en: 'Books', am: 'መጻሕፍት' },
    { to: '/about', en: 'About', am: 'ስለ ደራሲው' },
    { to: '/enquiries', en: 'Enquiries', am: 'ጥያቄዎችና አድራሻ' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ----------------------------------------------------------------------
          TOP AUDIENCE BAR (Matching J.K. Rowling's #header-bar exactly)
          ---------------------------------------------------------------------- */}
      <div className="bg-[#111111] text-[#999999] py-2 px-4 text-xs font-sans select-none z-50 relative">
        <div className="site-container flex items-center justify-between">
          <ul className="flex items-center gap-6 list-none m-0 p-0 text-[11px] sm:text-xs">
            <li className="font-semibold text-white">
              <Link to="/" className="text-white hover:text-white">
                {lang === 'am' ? 'ለአዋቂ አንባቢዎች (Grown-Ups)' : 'Grown-Ups'}
              </Link>
            </li>
            <li>
              <Link
                to="/universe"
                className="text-[#999999] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>{lang === 'am' ? 'የዴርቶጋዳ ዓለም (Younger Readers)' : 'Younger Readers'}</span>
                <span className="text-[10px] text-[#aaaaaa]">↗</span>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3 text-[11px]">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-0.5 bg-[#222222] border border-[#333333] hover:border-[#666666] text-[#cccccc] hover:text-white transition-colors rounded-sm cursor-pointer"
              title="Toggle Language"
            >
              <span className={lang === 'en' ? 'text-white font-bold' : ''}>EN</span>
              <span className="text-[#555555]">/</span>
              <span className={`font-serif ${lang === 'am' ? 'text-white font-bold' : ''}`}>አማ</span>
            </button>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          MAIN SITE HEADER (Pristine White Background matching jkrowling.com)
          ---------------------------------------------------------------------- */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 bg-white ${
          isScrolled
            ? 'py-3 border-b border-[#e5e5e5] shadow-sm'
            : 'py-4 sm:py-5 border-b border-[#efefef]'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* Left: Author Brand / Signature in Black */}
          <Link to="/" className="flex items-center group text-decoration-none shrink-0 py-1">
            <AuthorSignature className="h-9 sm:h-11 w-auto text-[#111111]" light={false} />
          </Link>

          {/* Center: Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`font-serif text-[15px] tracking-wide transition-all relative py-1 text-decoration-none ${
                    active
                      ? 'text-[#111111] font-bold border-b-2 border-[#111111]'
                      : 'text-[#444444] hover:text-[#000000]'
                  }`}
                >
                  {lang === 'am' ? item.am : item.en}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search / Telegram & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/yismakeworku"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#111111] hover:text-[#d4af37] px-3 py-1.5 rounded-full border border-[#cccccc] hover:border-[#111111] transition-all"
            >
              <span>Telegram</span>
              <span className="text-[10px]">↗</span>
            </a>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#111111] hover:bg-gray-100 rounded transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-[#111111] transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 w-full bg-[#111111] transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-[#111111] transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 px-6 pt-4 pb-6 bg-white border-b-2 border-[#111111] shadow-xl animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`font-serif text-lg py-2 border-b border-gray-100 flex items-center justify-between ${
                      active ? 'text-[#111111] font-bold pl-2 border-l-2 border-l-[#111111]' : 'text-[#444444]'
                    }`}
                  >
                    <span>{lang === 'am' ? item.am : item.en}</span>
                    <span className="text-gray-400 text-xs">→</span>
                  </Link>
                );
              })}

              <Link
                to="/universe"
                className="font-serif text-lg py-2 text-[#491763] flex items-center justify-between font-bold"
              >
                <span>{lang === 'am' ? 'የዴርቶጋዳ ዓለም (ፖርታል)' : 'The Dertogada Universe'}</span>
                <span className="text-xs">❖</span>
              </Link>
            </nav>

            <div className="mt-5 pt-3 flex items-center justify-between text-xs font-sans text-gray-500 border-t border-gray-100">
              <span>Official Channel</span>
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-black hover:underline"
              >
                @yismakeworku (18.6K+)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
