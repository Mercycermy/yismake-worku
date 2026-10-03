import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import Icon from './Icon';

const featuredBooks = [
  {
    id: 'dertogada',
    slug: 'dertogada',
    titleAm: 'ዴርቶጋዳ',
    titleEn: 'Dertogada',
    year: '2009',
    coverImage: '/images/Dertogada Sequels/images (17) (17)(1)(1).jpg',
  },
  {
    id: 'ramatohara',
    slug: 'ramatohara',
    titleAm: 'ራማቶሓራ',
    titleEn: 'Ramatohara',
    year: '2010',
    coverImage: '/images/Dertogada Sequels/images (17) (18).jpeg',
  },
  {
    id: 'kebur-dengay',
    slug: 'kebur-dengay',
    titleAm: 'ክቡር ድንጋይ',
    titleEn: 'Kebur Dengay',
    year: '2013',
    coverImage: '/images/Kibur Dingay sequels/28999868.jpg',
  },
];

export default function HeroSection({ scrollToTrilogy }) {
  const { lang } = useLanguage();
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  const activeBook = featuredBooks[activeBookIndex];

  return (
    <section className="hero-masterpiece-section">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-atmosphere__glow" />
        <div className="hero-atmosphere__grain" />
      </div>

      <div className="site-container hero-shell">
        <div className="hero-editorial-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              {lang === 'am' ? 'ልቦለዶች፤ ከኢትዮጵያ ዓለም የተነሱ' : 'FICTION ROOTED IN ETHIOPIAN WORLDS'}
            </span>

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
              <strong>{lang === 'am' ? 'አማርኛ' : 'Amharic'}</strong>
              <span>{lang === 'am' ? 'የመጀመሪያ ቋንቋ' : 'Original language'}</span>
            </div>
          </div>

          <div className="hero-actions">
            <button type="button" onClick={scrollToTrilogy} className="hero-action hero-action--primary">
              <span>{lang === 'am' ? 'መጻሕፍቱን ያስሱ' : 'Explore the books'}</span>
              <Icon name="arrowDown" size={15} />
            </button>
            <Link to={`/read-sample/${activeBook.slug}`} className="hero-action hero-action--secondary">
              <Icon name="book" size={15} />
              <span>{lang === 'am' ? 'ናሙና ያንብቡ' : 'Read a sample'}</span>
            </Link>
          </div>

          <div className="hero-artwork" aria-label={lang === 'am' ? 'የደራሲው ምስልና መጻሕፍት' : 'Author portrait and featured books'}>
            <div className="hero-artwork__frame">
              <img
                className="hero-artwork__portrait"
                src="/images/yismake-portrait.jpg"
                alt={lang === 'am' ? 'የደራሲ ይስማዕከ ወርቁ ፎቶ' : 'Author Yismake Worku'}
                fetchPriority="high"
              />
              <div className="hero-artwork__veil" />
            </div>

            <div className="hero-book-feature">
              <div className="hero-book-feature__eyebrow">
                {lang === 'am' ? 'የተመረጠ መጽሐፍ' : 'FEATURED WORK'}
                <span>{activeBook.year}</span>
              </div>
              <div className="hero-book-feature__covers" aria-hidden="true">
                {featuredBooks.map((book, index) => {
                  const offset = index - 1;
                  return (
                    <div
                      key={book.id}
                      className={`hero-book-cover${index === activeBookIndex ? ' is-active' : ''}`}
                      style={{
                        transform: `translateX(calc(-50% + ${offset * 42}px)) rotate(${offset * 6}deg) scale(${index === activeBookIndex ? 1.06 : 0.88}) translateY(${index === activeBookIndex ? '-5px' : '8px'})`,
                        zIndex: index === activeBookIndex ? 3 : 1,
                      }}
                    >
                      <img src={book.coverImage} alt="" loading="eager" />
                    </div>
                  );
                })}
              </div>
              <div className="hero-book-feature__title">
                <strong>{lang === 'am' ? activeBook.titleAm : activeBook.titleEn}</strong>
                <Link to={`/books/${activeBook.slug}`} aria-label={lang === 'am' ? `${activeBook.titleAm} ዝርዝር` : `View ${activeBook.titleEn}`}>
                  <Icon name="arrowRight" size={16} />
                </Link>
              </div>
              <div className="hero-book-switcher" role="group" aria-label={lang === 'am' ? 'ተለይተው የቀረቡ መጻሕፍት' : 'Featured books'}>
                {featuredBooks.map((book, index) => (
                  <button
                    type="button"
                    key={book.id}
                    onClick={() => setActiveBookIndex(index)}
                    aria-pressed={activeBookIndex === index}
                    aria-label={lang === 'am' ? book.titleAm : book.titleEn}
                  >
                    {book.titleAm}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
