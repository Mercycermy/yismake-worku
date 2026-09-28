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

  const navItems = [
    { to: '/', en: 'Home', am: 'መነሻ' },
    { to: '/news', en: 'News', am: 'ዜናዎች' },
    { to: '/in-his-own-words', en: 'In His Own Words', am: 'በራሱ አንደበት' },
    { to: '/on-writing', en: 'On Writing', am: 'ስለ አጻጻፍ' },
    { to: '/books', en: 'Books', am: 'መጻሕፍት' },
    { to: '/about', en: 'About', am: 'ስለ ደራሲው' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* TOP AUDIENCE BAR */}
      <div className="bg-[#1a1a1a] text-[#999999] py-2 px-4 text-xs font-sans select-none z-50 relative">
        <div className="site-container flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <Link to="/" className="text-white font-semibold hover:text-white">
              {lang === 'am' ? 'ለአዋቂ አንባቢዎች' : 'Grown-Ups'}
            </Link>
            <span className="text-[#555555] mx-1">|</span>
            <Link
              to="/universe"
              className="text-[#999999] hover:text-white transition-colors"
            >
              {lang === 'am' ? 'ዴርቶጋዳ ዓለም' : 'Younger Readers'}
            </Link>
          </div>

          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#222222] border border-[#333333] hover:border-[#666666] text-[#cccccc] hover:text-white transition-colors rounded-sm cursor-pointer text-[11px]"
            title="Toggle Language"
          >
            <span className={lang === 'en' ? 'text-white font-bold' : ''}>EN</span>
            <span className="text-[#555555]">/</span>
            <span className={`font-serif ${lang === 'am' ? 'text-white font-bold' : ''}`}>አማ</span>
          </button>
        </div>
      </div>

      {/* MAIN HEADER with desk background */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-2 border-b border-[#e5e5e5] shadow-sm'
            : 'bg-white py-3 border-b border-[#efefef]'
        }`}
      >
        <div className="site-container">
          {/* Navigation Links - Centered */}
          <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`font-serif text-[15px] tracking-wide transition-all relative py-1 no-underline ${
                    active
                      ? 'text-[#111111] font-bold'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                  style={active ? { borderBottom: '2px solid #111111' } : {}}
                >
                  {lang === 'am' ? item.am : item.en}
                </Link>
              );
            })}
          </nav>

          {/* Mobile: Logo + Hamburger */}
          <div className="lg:hidden flex items-center justify-between">
            <Link to="/" className="font-serif text-lg font-bold text-[#111111] tracking-wide no-underline">
              {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku'}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:bg-gray-100 rounded transition-colors cursor-pointer"
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
                    className={`font-serif text-lg py-2 border-b border-gray-100 flex items-center justify-between no-underline ${
                      active ? 'text-[#111111] font-bold pl-2 border-l-2 border-l-[#111111]' : 'text-[#444444]'
                    }`}
                  >
                    <span>{lang === 'am' ? item.am : item.en}</span>
                    <span className="text-gray-400 text-xs">→</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
