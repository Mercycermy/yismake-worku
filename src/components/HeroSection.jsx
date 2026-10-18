import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import Icon from './Icon';

export default function HeroSection({ scrollToTrilogy }) {
  const { lang } = useLanguage();

  return (
    <section className="hero-masterpiece-section">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-atmosphere__glow" />
        <div className="hero-atmosphere__grain" />
      </div>

      <div className="site-container hero-shell">
        <div className="hero-editorial-grid">
          <div className="hero-copy">
            <h1>
              {lang === 'am' ? (
                <><span>ይስማዕከ</span><span className="hero-copy__accent">ወርቁ</span></>
              ) : (
                <><span>Yismake</span><span className="hero-copy__accent">Worku</span></>
              )}
            </h1>

            <p className="hero-role">
              {lang === 'am' ? 'ልቦለድ ደራሲ · መምህር' : 'NOVELIST · LECTURER'}
            </p>
            <p className="hero-intro">
              {lang === 'am'
                ? 'ጥንታዊ የኢትዮጵያ ጥበብን ከዘመናዊ ሳይንስና ምናብ ጋር የሚያገናኙ ታሪኮች።'
                : 'Stories where Ethiopian heritage meets speculative science and imagination.'}
            </p>
          </div>

          <div className="hero-proofpoints" aria-label={lang === 'am' ? 'የደራሲ ስኬቶች' : 'Author highlights'}>
            <div className="hero-proofpoint">
              <strong>500,000+</strong>
              <span>{lang === 'am' ? 'የተሸጡ ቅጂዎች' : 'Copies sold'}</span>
            </div>
            <div className="hero-proofpoint">
              <strong>10×</strong>
              <span>{lang === 'am' ? 'በመጀመሪያው ዓመት እትሞች' : 'First-year reprints'}</span>
            </div>
            <div className="hero-proofpoint">
              <strong>15+</strong>
              <span>{lang === 'am' ? 'የታተሙ መጻሕፍት' : 'Published books'}</span>
            </div>
          </div>

          <div className="hero-actions">
            <button type="button" onClick={scrollToTrilogy} className="hero-action hero-action--primary">
              <span>{lang === 'am' ? 'መጻሕፍቱን ያስሱ' : 'Explore the books'}</span>
              <Icon name="arrowDown" size={15} />
            </button>
            <Link to="/books" className="hero-action hero-action--secondary">
              <Icon name="book" size={15} />
              <span>{lang === 'am' ? 'ሁሉንም ያንብቡ' : 'View all books'}</span>
            </Link>
          </div>

          <div className="hero-artwork" aria-label={lang === 'am' ? 'የደራሲው ምስል' : 'Author portrait'}>
            <div className="hero-artwork__frame">
              <img
                className="hero-artwork__portrait"
                src="/images/yismake-portrait.jpg"
                alt={lang === 'am' ? 'የደራሲ ይስማዕከ ወርቁ ፎቶ' : 'Author Yismake Worku'}
                fetchPriority="high"
              />
              <div className="hero-artwork__veil" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
