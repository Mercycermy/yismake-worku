import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import BookCover from '../components/BookCover';
import Icon from '../components/Icon';
import HeroSection from '../components/HeroSection';
import { verifiedBooks } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();
  const trilogyRef = useRef(null);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollToTrilogy = () => {
    trilogyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      checkScrollButtons();
      slider.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        slider.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 340;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <HeroSection scrollToTrilogy={scrollToTrilogy} />

      {/* ══════════════════════════════════════════════════════════════
          2. ALL MASTERPIECES — HORIZONTAL SLIDER (No categories, all books)
          ══════════════════════════════════════════════════════════════ */}
      <section
        ref={trilogyRef}
        style={{
          padding: '4rem 0 5rem',
          background: 'var(--bg-secondary)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #edeae4',
          borderBottom: '1px solid #edeae4',
        }}
      >
        <div className="site-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-3">
                <Icon name="spark" size={13} />
                <span>{lang === 'am' ? 'የተሟላ የስነ-ጽሑፍ ማህደር' : 'THE COMPLETE OEUVRE'}</span>
                <Icon name="spark" size={13} />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                {lang === 'am' ? 'ተከታታይ እና የተመረጡ መጻሕፍት' : 'The Masterpiece Series & Works'}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  color: '#6b655d',
                  maxWidth: '650px',
                  marginTop: '0.5rem',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                {lang === 'am'
                  ? 'ከዴርቶጋዳ አምስቱ ተከታታይ ቅጾች እስከ ክቡር ድንጋይ፣ ፍልስፍናዊ ልቦለዶች እና የግጥም መድበሎች ድረስ ያሉትን ሁሉንም መጻሕፍት በግራና ቀኝ በማንሸራተት ያስሱ።'
                  : 'Slide through all published works—from the monumental five Dertogada sagas to the acclaimed Kebur Dengay thrillers, philosophical masterworks, and poetry collections.'}
              </p>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollSlider('left')}
                disabled={!canScrollLeft}
                aria-label="Slide left"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border"
                style={{
                  background: canScrollLeft ? '#1a1714' : 'rgba(26,23,20,0.06)',
                  color: canScrollLeft ? '#c9a84c' : '#a8a29e',
                  borderColor: canScrollLeft ? '#c9a84c' : 'rgba(0,0,0,0.08)',
                  cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                  boxShadow: canScrollLeft ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <Icon name="chevronLeft" size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider('right')}
                disabled={!canScrollRight}
                aria-label="Slide right"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border"
                style={{
                  background: canScrollRight ? '#1a1714' : 'rgba(26,23,20,0.06)',
                  color: canScrollRight ? '#c9a84c' : '#a8a29e',
                  borderColor: canScrollRight ? '#c9a84c' : 'rgba(0,0,0,0.08)',
                  cursor: canScrollRight ? 'pointer' : 'not-allowed',
                  boxShadow: canScrollRight ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <Icon name="chevronRight" size={18} />
              </button>
            </div>
          </div>

          {/* Horizontal Sliding Books Track */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth select-none hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {verifiedBooks.map((book, idx) => (
              <article
                key={book.id || idx}
                className="group shrink-0 w-[270px] sm:w-[290px] bg-white rounded-2xl border border-[#e8dfc8] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Stage */}
                  <div className="p-5 bg-[#faf8f4] flex items-center justify-center border-b border-[#e8dfc8]/60 relative">
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#8a857d] border border-black/5">
                      {book.year}
                    </span>

                    <div className="w-[140px] aspect-[1/1.48] rounded-md overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                      <BookCover book={book} size="md" />
                    </div>
                  </div>

                  {/* Book Card Info */}
                  <div className="p-5">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#c9a84c] block mb-1">
                      {book.series || 'Masterpiece'}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#1a1714',
                        lineHeight: 1.25,
                        marginBottom: '0.45rem',
                      }}
                      className="group-hover:text-[#c9a84c] transition-colors truncate"
                      title={lang === 'am' ? book.titleAm : book.titleEn}
                    >
                      {lang === 'am' ? book.titleAm : book.titleEn}
                    </h3>

                    <p
                      className="text-xs text-[#6e685f] line-clamp-2 leading-relaxed"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {lang === 'am'
                        ? (book.summaryAm || book.descriptionAm)
                        : (book.summaryEn || book.descriptionEn)}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-5 pt-0">
                  <Link
                    to={`/books/${book.slug}`}
                    className="w-full jkr-pill-btn-dark !py-2.5 !text-xs text-center inline-flex items-center justify-center gap-2 shadow-xs group-hover:bg-[#1a1714]"
                  >
                    <span>{lang === 'am' ? 'ሙሉ መረጃና ቅምሻ' : 'Book Details & Sample'}</span>
                    <Icon name="arrowRight" size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Catalog Action */}
          <div className="mt-12 text-center pt-8 border-t border-[#edeae4]">
            <Link
              to="/books"
              className="jkr-pill-btn-dark !py-3.5 !px-8 !text-xs uppercase tracking-widest font-bold shadow-lg inline-flex items-center gap-2"
            >
              <span>{lang === 'am' ? 'ሁሉንም 4 ዘርፎች በዝርዝር ይመልከቱ' : 'Explore All 4 Categories in Books'}</span>
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
