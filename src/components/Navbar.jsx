import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const { lang } = useLanguage();
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

  // Primary Navigation: Home, Books, About, News, Contact
  const navItems = [
    { to: '/', en: 'Home', am: 'መነሻ' },
    { to: '/books', en: 'Books', am: 'መጻሕፍት' },
    { to: '/about', en: 'About', am: 'ስለ ደራሲው' },
    { to: '/news', en: 'News', am: 'ዜናዎች' },
    { to: '/contact', en: 'Contact', am: 'አድራሻ' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 navbar-header ${isScrolled ? 'is-scrolled' : ''}`}
      style={{
        background: isScrolled ? 'rgba(253,252,250,0.96)' : '#fdfcfa',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid #e8e4de' : '1px solid #f0ece6',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div className="site-container">
        <div className="flex items-center justify-between">
          {/* Logo / Author Signature */}
          <Link
            to="/"
            className="flex items-center gap-2 group text-decoration-none"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex flex-col">
              <span className="group-hover:text-[#c9a84c] navbar-author-name">
                {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'YISMAKE WORKU'}
              </span>
            </div>
          </Link>

          {/* Desktop Right Side: Nav Links + Translation Toggle (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-7">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      fontWeight: active ? 700 : 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: active ? '#1a1714' : '#736d65',
                      textDecoration: 'none',
                      position: 'relative',
                      padding: '6px 0',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = '#c9a84c';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = '#736d65';
                    }}
                  >
                    <span>{lang === 'am' ? item.am : item.en}</span>
                    {active && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, #c9a84c, #b8860b)',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <LanguageToggle variant="light" size="md" />
          </div>

          {/* Mobile Right Controls: Translation Toggle + Hamburger (STRICTLY lg:hidden) */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageToggle variant="compact" size="sm" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1a1714] bg-transparent border-none cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <div style={{ width: '22px', height: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span
                  style={{
                    height: '2px',
                    width: '100%',
                    background: '#1a1714',
                    transition: 'all 0.3s',
                    borderRadius: '2px',
                    transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                  }}
                />
                <span
                  style={{
                    height: '2px',
                    width: '100%',
                    background: '#1a1714',
                    transition: 'all 0.3s',
                    borderRadius: '2px',
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    height: '2px',
                    width: '100%',
                    background: '#1a1714',
                    transition: 'all 0.3s',
                    borderRadius: '2px',
                    transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer (STRICTLY lg:hidden) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden animate-fade-in"
          style={{
            marginTop: '12px',
            padding: '16px 20px 24px',
            background: '#fdfcfa',
            borderBottom: '2px solid #c9a84c',
            boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
          }}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.0625rem',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#1a1714' : '#5a564e',
                    background: active ? '#f5f3ef' : 'transparent',
                    borderLeft: active ? '3px solid #c9a84c' : '3px solid transparent',
                  }}
                >
                  <span>{lang === 'am' ? item.am : item.en}</span>
                  <span style={{ color: active ? '#c9a84c' : '#c4bfb5', fontSize: '0.875rem' }}>→</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
