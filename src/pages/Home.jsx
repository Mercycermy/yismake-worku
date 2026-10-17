import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import Icon from '../components/Icon';
import HeroSection from '../components/HeroSection';
import BookSlider from '../components/BookSlider';
import { verifiedBooks } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();
  const trilogyRef = useRef(null);

  const scrollToTrilogy = () => {
    trilogyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <HeroSection scrollToTrilogy={scrollToTrilogy} />

      {/* ══════════════════════════════════════════════════════════════
          2. ALL BOOKS CAROUSEL SLIDER (Masterpiece Series & Works)
          ══════════════════════════════════════════════════════════════ */}
      <section
        ref={trilogyRef}
        className="jkr-home-trilogy"
        style={{
          padding: '4rem 0 5rem',
          background: 'var(--bg-secondary)',
          position: 'relative',
        }}
      >
        <div className="site-container max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="jkr-gold-divider mb-3">
              <Icon name="spark" size={15} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              {lang === 'am' ? 'የይስማዕከ ወርቁ የስነ-ጽሑፍ ዓለማት' : 'The Literary Oeuvre of Yismake Worku'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#1a1714',
                lineHeight: 1.2,
                marginBottom: '0.85rem',
              }}
            >
              {lang === 'am' ? 'የመጻሕፍት ስብስብ' : 'The Masterpiece Series & Works'}
            </h2>
          </div>

          {/* Interactive Slide Carousel with All Books */}
          <BookSlider books={verifiedBooks} />

          {/* Bottom Link to Full Catalogue */}
          <div className="mt-12 text-center">
            <Link
              to="/books"
              className="jkr-home-trilogy__catalogue-link jkr-pill-btn-dark !py-3 !px-8 !text-sm shadow-xl inline-flex items-center gap-2"
            >
              <span>
                {lang === 'am'
                  ? 'ሁሉንም የይስማዕከ ወርቁ መጻሕፍት በካታሎግ ይመልከቱ'
                  : 'Explore All Masterpieces in the Full Catalogue'}
              </span>
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
