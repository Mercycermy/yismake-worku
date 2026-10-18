import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  const socialLinks = [
    {
      href: 'https://t.me/yismakeworku',
      label: 'Telegram',
      title: 'Official Telegram Channel (18.6K+ subscribers)',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
    {
      href: 'https://www.goodreads.com/book/show/16133457-dertogada',
      label: 'Goodreads',
      title: 'Goodreads Author Profile',
      icon: <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.875rem' }}>g</span>,
    },
    {
      href: 'https://www.youtube.com/results?search_query=Yismake+Worku',
      label: 'YouTube',
      title: 'Interviews & Television Features',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 002.42 7.2 26.2 26.2 0 002 12c0 1.62.14 3.2.42 4.81a2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 001.76-1.77C21.86 15.2 22 13.62 22 12c0-1.62-.14-3.2-.42-4.81zM9.75 15.02V8.98l5.5 3.02-5.5 3.02z" />
        </svg>
      ),
    },
    {
      href: 'https://henninghamfamilypress.com/the-lost-spell/',
      label: 'Publisher',
      title: 'Henningham Family Press (UK Publisher)',
      icon: <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.8125rem' }}>H</span>,
    },
  ];

  const navLinks = [
    { to: '/', en: 'Home', am: 'መነሻ' },
    { to: '/books', en: 'Books', am: 'መጻሕፍት' },
    { to: '/about', en: 'About', am: 'ስለ ደራሲው' },
    { to: '/news', en: 'News', am: 'ዜናዎች' },
    { to: '/contact', en: 'Contact', am: 'አድራሻ' },
  ];

  return (
    <footer
      style={{
        background: '#120d09',
        color: '#d4cebe',
        padding: '3.5rem 0 2.5rem',
        borderTop: '2px solid #c9a84c',
      }}
    >
      <div className="site-container max-w-5xl mx-auto px-4">
        {/* Top: Brand signature & Social Channels */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#3d2a1b]/60">
          <div className="text-center md:text-left">
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#f5f0e6',
                letterSpacing: '0.04em',
                marginBottom: '0.2rem',
              }}
            >
              YISMAKE WORKU · ይስማዕከ ወርቁ
            </h3>
            <p className="text-xs text-[#a69c8e]">
              {lang === 'am' ? 'ይፋዊ የደራሲው ማህደርና የስነ-ጽሑፍ ቢሮ' : 'Official Author Archive & Literary Desk'}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                className="w-9 h-9 rounded-full bg-[#241a12] border border-[#4a3525] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#120d09] transition-all flex items-center justify-center text-xs"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle: Clean Navigation Links (replacing the book list directory) */}
        <div className="py-6 border-b border-[#3d2a1b]/40 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#a69c8e]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-[#c9a84c] transition-colors"
            >
              {lang === 'am' ? link.am : link.en}
            </Link>
          ))}
        </div>

        {/* Legal Copyright */}
        <div className="pt-6 text-center text-xs text-[#8a7e70] font-mono">
          <p>
            &copy; {new Date().getFullYear()} YISMAKE WORKU. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
