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
    <>
      {/* SLIM TOP BAR */}
      <div
        style={{
          background: '#1a1714',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontSize: '11px',
          color: '#9e9888',
          fontFamily: 'var(--font-sans)',
          position: 'relative',
          zIndex: 50,
        }}
      >
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" style={{ color: '#e8e0d4', fontWeight: 700, fontSize: '11px' }}>
              {lang === 'am' ? 'ለአዋቂ አንባቢዎች' : 'Grown-Ups'}
            </Link>
            <span style={{ color: '#3d3a35' }}>·</span>
            <Link to="/universe" style={{ color: '#9e9888', fontSize: '11px' }}>
              {lang === 'am' ? 'ዴርቶጋዳ ዓለም' : 'Younger Readers'}
            </Link>
            <span style={{ color: '#3d3a35' }}>·</span>
            <Link
              to="/admin"
              style={{
                color: '#c9a84c',
                fontWeight: 700,
                fontSize: '11px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="Editorial & Admin Portal"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>{lang === 'am' ? 'አድሚን' : 'Admin'}</span>
            </Link>
          </div>

          <button
            onClick={toggleLang}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 10px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#c4bfb5',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s',
            }}
            title="Toggle Language"
          >
            <span style={{ fontWeight: lang === 'en' ? 800 : 400, color: lang === 'en' ? '#fff' : '#9e9888' }}>EN</span>
            <span style={{ color: '#3d3a35', margin: '0 1px' }}>/</span>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: lang === 'am' ? 800 : 400,
              color: lang === 'am' ? '#fff' : '#9e9888'
            }}>አማ</span>
          </button>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          background: isScrolled ? 'rgba(253,252,250,0.97)' : '#fdfcfa',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          padding: isScrolled ? '10px 0' : '16px 0',
          borderBottom: isScrolled ? '1px solid #e8e4de' : '1px solid #f0ece6',
          boxShadow: isScrolled ? '0 2px 16px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo / Author Signature */}
            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isScrolled ? '1.25rem' : '1.5rem',
                fontWeight: 800,
                color: '#1a1714',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{lang === 'am' ? 'ይስማዕከ ወርቁ' : 'YISMAKE WORKU'}</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden lg:flex">
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      fontWeight: active ? 700 : 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: active ? '#1a1714' : '#8a857d',
                      textDecoration: 'none',
                      position: 'relative',
                      padding: '4px 0',
                      transition: 'color 0.25s',
                      borderBottom: active ? '2px solid #c9a84c' : '2px solid transparent',
                    }}
                  >
                    {lang === 'am' ? item.am : item.en}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile: Hamburger Button */}
            <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  padding: '8px',
                  color: '#1a1714',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'background 0.2s',
                }}
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

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden animate-fade-in"
            style={{
              marginTop: '8px',
              padding: '16px 24px 24px',
              background: '#fdfcfa',
              borderBottom: '2px solid #c9a84c',
              boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.125rem',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: 'none',
                      fontWeight: active ? 700 : 400,
                      color: active ? '#1a1714' : '#5a564e',
                      background: active ? '#f5f3ef' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span>{lang === 'am' ? item.am : item.en}</span>
                    <span style={{ color: '#c4bfb5', fontSize: '0.75rem' }}>→</span>
                  </Link>
                );
              })}

              {/* Admin Flow in Mobile Menu */}
              <Link
                to="/admin"
                style={{
                  marginTop: '8px',
                  padding: '12px 16px',
                  background: '#1a1714',
                  color: '#c9a84c',
                  fontWeight: 700,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>{lang === 'am' ? 'አድሚን' : 'Admin Portal'}</span>
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
