import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import Icon from './Icon';

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
    <footer className="author-footer">
      <div className="site-container">
        <div className="author-footer__top">
          <div className="author-footer__invitation">
            <span className="editorial-eyebrow">{lang === 'am' ? 'ታሪኩ ይቀጥላል' : 'THE STORY CONTINUES'}</span>
            <h2>{lang === 'am' ? 'ቀጣዩ ዓለምዎ እየጠበቀዎት ነው።' : 'Another world is waiting.'}</h2>
            <p>{lang === 'am' ? 'ልቦለዶች፣ ግጥሞችና ለማሰብ የሚጋብዙ ታሪኮች።' : 'Novels, poetry, and stories that stay with you.'}</p>
            <Link to="/books" className="collection-button collection-button--gold">{lang === 'am' ? 'መጻሕፍቱን ያስሱ' : 'Explore the books'}<Icon name="arrowRight" size={16} /></Link>
          </div>
          <nav className="author-footer__links" aria-label={lang === 'am' ? 'የግርጌ ማሰሻ' : 'Footer navigation'}>
            <h3>{lang === 'am' ? 'ያስሱ' : 'Explore'}</h3>
            {navLinks.map(link => <Link key={link.to} to={link.to}>{lang === 'am' ? link.am : link.en}<Icon name="arrowRight" size={13} /></Link>)}
          </nav>
          <div className="author-footer__links author-footer__social">
            <h3>{lang === 'am' ? 'ይከተሉ' : 'Stay connected'}</h3>
            {socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" title={link.title}><span className="author-footer__social-icon">{link.icon}</span><span>{link.label}</span><Icon name="external" size={13} /></a>)}
          </div>
        </div>
        <div className="author-footer__signature">
          <Link to="/">Yismake Worku<span>ይስማዕከ ወርቁ</span></Link>
          <span>{lang === 'am' ? 'ይፋዊ የደራሲው ድረ-ገጽ' : 'THE OFFICIAL AUTHOR WEBSITE'}</span>
        </div>
        <div className="author-footer__bottom">
          <p>&copy; {new Date().getFullYear()} Yismake Worku. {lang === 'am' ? 'መብቱ በሕግ የተጠበቀ ነው።' : 'All rights reserved.'}</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{lang === 'am' ? 'ወደ ላይ' : 'Back to top'}<Icon name="arrowRight" size={14} /></button>
        </div>
      </div>
    </footer>
  );
}