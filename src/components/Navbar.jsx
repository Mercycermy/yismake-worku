import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import ThemeToggle from './ThemeToggle';

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
            className="jkr-navbar-brand flex items-center gap-2.5 group text-decoration-none py-1"
            style={{ textDecoration: 'none' }}
          >
            <div className="flex flex-col">
              <span className="group-hover:text-[#c9a84c] navbar-author-name transition-colors font-serif font-black tracking-wider text-base text-[#1a1714]">
                {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'YISMAKE WORKU'}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8a857d] font-mono -mt-0.5 hidden sm:block">
                {lang === 'am' ? 'ይፋዊ የስነ-ጽሑፍ ማህደር' : 'Official Author Archive'}
              </span>
            </div>
          </Link>

          {/* One theme control stays in sync across responsive layouts. */}
          <div className="jkr-navbar-controls flex items-center gap-2 sm:gap-5 lg:gap-8">
            <nav className="jkr-navbar-links hidden lg:flex items-center gap-7" aria-label={lang === 'am' ? 'ዋና ማሰሻ' : 'Main navigation'}>
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`jkr-navbar-link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{lang === 'am' ? item.am : item.en}</span>
                  </Link>
                );
              })}
            </nav>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="jkr-navbar-menu-toggle lg:hidden p-2 text-[#1a1714] bg-transparent border-none cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? (lang === 'am' ? 'ማሰሻውን ዝጋ' : 'Close navigation menu') : (lang === 'am' ? 'ማሰሻውን ክፈት' : 'Open navigation menu')}
              aria-expanded={mobileMenuOpen}
            >
              <div style={{ width: '22px', height: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span
                  style={{
                    height: '2px',
                    width: '100%',
                    background: 'currentColor',
                    transition: 'all 0.3s',
                    borderRadius: '2px',
                    transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                  }}
                />
                <span
                  style={{
                    height: '2px',
                    width: '100%',
                    background: 'currentColor',
                    transition: 'all 0.3s',
                    borderRadius: '2px',
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    height: '2px',
                    width: '100%',
                    background: 'currentColor',
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
          className="jkr-mobile-navigation lg:hidden animate-fade-in"
          style={{
            marginTop: '0',
          }}
        >
          <nav className="jkr-mobile-navigation__links flex flex-col gap-2" aria-label={lang === 'am' ? 'ዋና ማሰሻ' : 'Main navigation'}>
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`jkr-mobile-navigation__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{lang === 'am' ? item.am : item.en}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
