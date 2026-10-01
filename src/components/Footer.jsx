import React from 'react';
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
      icon: <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.6875rem' }}>UK</span>,
    },
  ];

  return (
    <footer
      id="colophon"
      style={{
        position: 'relative',
        backgroundImage: "url('/images/footer-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#e8e0d4',
        paddingTop: '3.5rem',
        paddingBottom: '3rem',
        overflow: 'hidden',
        borderTop: '2px solid #3d2a1b',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(14,10,6,0.92)',
          backdropFilter: 'blur(3px)',
          pointerEvents: 'none',
        }}
      />

      <div className="site-container relative z-10">
        {/* Social Links */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#c9a84c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                textDecoration: 'none',
              }}
              title={link.title}
              aria-label={link.label}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c9a84c';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Author Brand Signature */}
        <div className="flex flex-col items-center justify-center mb-6 text-center select-none">
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: '#e8e0d4',
              textTransform: 'uppercase',
            }}
          >
            YISMAKE WORKU
          </div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              color: '#c9a84c',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}
          >
            {lang === 'am' ? 'ይስማዕከ ወርቁ — ይፋዊ የደራሲው ማህደር' : 'Official Author Dossier & Archive'}
          </div>
        </div>

        {/* Authenticity Disclaimer & Legal */}
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.75rem',
            color: '#8a7e70',
            lineHeight: 1.65,
          }}
        >
          <p
            style={{
              color: '#c9a84c',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              background: 'rgba(26,17,10,0.7)',
              border: '1px solid rgba(201,168,76,0.25)',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              marginBottom: '1.25rem',
            }}
          >
            {lang === 'am'
              ? 'ማሳሰቢያ፡ በይስማዕከ ወርቁ ስም የተከፈቱ ሀሰተኛ የማህበራዊ ሚዲያ ገጾችና ያልተፈቀዱ የፒዲኤፍ (PDF) ስርጭቶች እንዳሉ እናውቃለን። እባክዎ ህጋዊና የተፈረመባቸውን የመጽሐፍ ቅጂዎች ብቻ ይግዙ።'
              : 'Notice: We are aware of imposter online accounts and unauthorized digital copies posing as Yismake Worku. Please support genuine Ethiopian literature through verified editions.'}
          </p>

          <p
            style={{
              fontWeight: 700,
              color: '#c4bfb5',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            &copy; {new Date().getFullYear()} YISMAKE WORKU. ALL RIGHTS RESERVED.
          </p>

          <div style={{ fontSize: '0.6875rem', color: '#6b6058', lineHeight: 1.75 }}>
            <p>Dertogada, Ramatohara, Xantoxara, Yoratorad, Yotod &amp; characters &copy; Yismake Worku.</p>
            <p>"The Lost Spell" English translation &copy; Dr. Bethlehem Attfield; published by Henningham Family Press, London.</p>
            <p style={{ marginTop: '0.25rem' }}>DERTOGADA UNIVERSE is a registered literary trademark of Yismake Worku.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
