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

  // Primary Navigation according to user requirements: Home, Books, About, News, Contact
  const navItems = [
    { to: '/', en: 'Home', am: 'መነሻ' },
    { to: '/books', en: 'Books', am: 'መጻሕፍት' },
    { to: '/about', en: 'About', am: 'ስለ ደራሲው' },
    { to: '/news', en: 'News', am: 'ዜናዎች' },
    { to: '/contact', en: 'Contact', am: 'አድራሻና ግንኙነት' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* TOP AUDIENCE & DIRECT ADMIN BAR */}
      <div className="bg-[#141414] text-[#a0a0a0] py-2 px-4 text-xs font-sans select-none z-50 relative border-b border-white/5">
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
            <span className="text-[#555555] mx-1">|</span>
            {/* Direct Flow with Admin Indicator in Top Bar */}
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              title="Editorial & Admin Portal"
            >
              <span>🔐</span>
              <span>{lang === 'am' ? 'የአስተዳደር መግቢያ' : 'Admin Portal'}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-0.5 bg-[#222222] border border-[#333333] hover:border-[#666666] text-[#cccccc] hover:text-white transition-colors rounded-sm cursor-pointer text-[11px]"
              title="Toggle Language"
            >
              <span className={lang === 'en' ? 'text-white font-bold' : ''}>EN</span>
              <span className="text-[#555555]">/</span>
              <span className={`font-serif ${lang === 'am' ? 'text-white font-bold' : ''}`}>አማ</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-2.5 border-b border-[#e5e5e5] shadow-sm'
            : 'bg-white py-3.5 border-b border-[#efefef]'
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between">
            {/* Logo / Author Signature */}
            <Link
              to="/"
              className="font-serif text-xl sm:text-2xl font-bold text-[#111111] tracking-wider no-underline hover:opacity-90 flex items-center gap-2"
            >
              <span>{lang === 'am' ? 'ይስማዕከ ወርቁ' : 'YISMAKE WORKU'}</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`font-serif text-[15px] tracking-wide transition-all relative py-1 no-underline ${
                      active
                        ? 'text-[#111111] font-bold border-b-2 border-[#111111]'
                        : 'text-[#666666] hover:text-[#111111]'
                    }`}
                  >
                    {lang === 'am' ? item.am : item.en}
                  </Link>
                );
              })}

              {/* DIRECT FLOW WITH ADMIN BUTTON */}
              <Link
                to="/admin"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all no-underline shadow-sm ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-amber-400 text-black border-2 border-black'
                    : 'bg-[#111111] hover:bg-black text-amber-300 hover:text-amber-200'
                }`}
                title="Direct flow to administration panel"
              >
                <span>🔐</span>
                <span>{lang === 'am' ? 'አድሚን (Admin Flow)' : 'Admin Flow'}</span>
              </Link>
            </nav>

            {/* Mobile: Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/admin"
                className="px-2.5 py-1 bg-[#111111] text-amber-300 text-[11px] font-bold rounded-full mr-1"
              >
                🔐 Admin
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#111111] hover:bg-gray-100 rounded transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`h-0.5 w-full bg-[#111111] transition-all ${
                      mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 w-full bg-[#111111] transition-all ${
                      mobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`h-0.5 w-full bg-[#111111] transition-all ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 px-6 pt-4 pb-6 bg-white border-b-2 border-[#111111] shadow-xl animate-fade-in">
            <nav className="flex flex-col space-y-2.5">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`font-serif text-lg py-2 border-b border-gray-100 flex items-center justify-between no-underline ${
                      active
                        ? 'text-[#111111] font-bold pl-2 border-l-2 border-l-[#111111]'
                        : 'text-[#444444]'
                    }`}
                  >
                    <span>{lang === 'am' ? item.am : item.en}</span>
                    <span className="text-gray-400 text-xs">→</span>
                  </Link>
                );
              })}

              {/* Admin Flow in Mobile Menu */}
              <Link
                to="/admin"
                className="mt-3 py-2.5 px-4 bg-[#111111] text-amber-300 font-bold rounded-lg flex items-center justify-between text-sm shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span>🔐</span>
                  <span>{lang === 'am' ? 'የአስተዳደር ገጽ (Admin Flow)' : 'Direct Admin Flow'}</span>
                </div>
                <span>→</span>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
