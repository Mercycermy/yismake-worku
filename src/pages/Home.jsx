import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import Icon from '../components/Icon';
import HeroSection from '../components/HeroSection';
import { verifiedBooks } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const total = verifiedBooks.length;
  const currentBook = verifiedBooks[activeIndex] || verifiedBooks[0];

  const scrollToTrilogy = () => {
    carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation when user presses ArrowLeft or ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;
    if (isLeftSwipe) {
      goNext();
    } else if (isRightSwipe) {
      goPrev();
    }
  };

  // Helper to extract category route
  const getCategorySlug = (book) => {
    if (['dertogada', 'ramatohara', 'xantoxara', 'yoratorad', 'yotod'].includes(book.slug)) {
      return 'dertogada';
    }
    if (['kebur-dengay', 'dehinetu', 'yeogaden-demetoch'].includes(book.slug)) {
      return 'kibur-dingay';
    }
    if (['telmid', 'tekerchem', 'zamra', 'melos', 'gefuan'].includes(book.slug)) {
      return 'other-novels';
    }
    return 'poetry';
  };

  // Safely get book text description/tagline without awkward hyphens
  const getBookText = (book, l) => {
    if (book.tagline) {
      const tag = typeof book.tagline === 'object' ? (book.tagline[l] || book.tagline.en) : book.tagline;
      if (tag) return tag;
    }
    if (book.description) {
      const desc = typeof book.description === 'object' ? (book.description[l] || book.description.en) : book.description;
      if (desc) return desc;
    }
    return l === 'am' ? (book.summaryAm || book.descriptionAm || '') : (book.summaryEn || book.descriptionEn || '');
  };

  // Indices for center card and flanking left/right preview cards
  const prevIdx2 = (activeIndex - 2 + total) % total;
  const prevIdx1 = (activeIndex - 1 + total) % total;
  const nextIdx1 = (activeIndex + 1) % total;
  const nextIdx2 = (activeIndex + 2) % total;

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <HeroSection scrollToTrilogy={scrollToTrilogy} />

      {/* ══════════════════════════════════════════════════════════════
          2. ANIMATED BOOK CAROUSEL (Inspired by Uploaded Reference Image)
          ══════════════════════════════════════════════════════════════ */}
      <section
        ref={carouselRef}
        className="home-book-carousel-section"
        style={{
          padding: '3.5rem 0 5rem',
          background: 'var(--bg-secondary)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #edeae4',
          borderBottom: '1px solid #edeae4',
        }}
      >
        <div className="site-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}>
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
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
              {lang === 'am' ? 'የተሟላ የመጻሕፍት ስብስብ' : 'The Masterpiece Collection'}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                color: '#6b655d',
                marginTop: '0.5rem',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              {lang === 'am'
                ? 'ከዴርቶጋዳ አምስቱ ተከታታይ ቅጾች እስከ ክቡር ድንጋይ፣ ፍልስፍናዊ ልቦለዶች እና የግጥም መድበሎች ድረስ ያሉትን ሁሉንም 15 መጻሕፍት ያስሱ።'
                : 'Slide through all 15 published works, from the monumental five Dertogada sagas to the acclaimed Kebur Dengay thrillers, philosophical masterworks, and poetry collections.'}
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              STUDIO STAGE FRAME (Directly modeled after Reference Image)
              ══════════════════════════════════════════════════════════════ */}
          <div
            className="relative rounded-3xl p-5 sm:p-8 md:p-12 overflow-hidden shadow-sm transition-all"
            style={{
              background: '#dbe4e8',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Author / Series tag on left, Counter and Arrows on right */}
            <div className="flex items-center justify-between mb-6 sm:mb-10 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase inline-block"
                  style={{
                    background: 'rgba(26,23,20,0.08)',
                    color: '#1a1714',
                    letterSpacing: '0.14em',
                  }}
                >
                  {lang === 'am' ? 'ይስማዕከ ወርቁ · ይፋዊ ማህደር' : 'YISMAKE WORKU · CANONICAL OEUVRE'}
                </span>
              </div>

              {/* Counter 1/15 & Arrow Controls (Identical to 1/29 in reference image) */}
              <div className="flex items-center gap-4">
                <div
                  className="text-right select-none"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    letterSpacing: '0.04em',
                    color: '#1a1714',
                  }}
                >
                  <span className="text-2xl sm:text-3xl font-bold">{activeIndex + 1}</span>
                  <span className="text-base sm:text-lg opacity-40 font-light">/{total}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-xs p-1 rounded-full border border-black/5 shadow-2xs">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous book"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white text-[#1a1714] transition-colors cursor-pointer"
                  >
                    <Icon name="chevronLeft" size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next book"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white text-[#1a1714] transition-colors cursor-pointer"
                  >
                    <Icon name="chevronRight" size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                CENTERPIECE DISPLAY: Flanking Books + Dominant Center Book
                ══════════════════════════════════════════════════════════════ */}
            <div className="relative my-4 sm:my-8 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[380px] md:min-h-[420px]">
              <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-7 w-full max-w-4xl mx-auto select-none">
                
                {/* Flanking Card Far Left (Desktop only) */}
                <div
                  onClick={() => setActiveIndex(prevIdx2)}
                  className="hidden md:flex flex-col items-center cursor-pointer scale-70 opacity-40 hover:opacity-75 transition-all duration-500 ease-out z-0"
                  style={{ filter: 'grayscale(25%) drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }}
                  title={lang === 'am' ? verifiedBooks[prevIdx2].titleAm : verifiedBooks[prevIdx2].titleEn}
                >
                  <div className="w-[120px] lg:w-[140px] aspect-[1/1.45] rounded-lg overflow-hidden border border-white/60 bg-white shadow-inner">
                    <img
                      src={verifiedBooks[prevIdx2].coverImage}
                      alt={verifiedBooks[prevIdx2].titleEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Flanking Card Immediate Left */}
                <div
                  onClick={() => setActiveIndex(prevIdx1)}
                  className="hidden xs:flex flex-col items-center cursor-pointer scale-80 opacity-60 hover:opacity-90 transition-all duration-500 ease-out z-10"
                  style={{ filter: 'grayscale(15%) drop-shadow(0 10px 18px rgba(0,0,0,0.15))' }}
                  title={lang === 'am' ? verifiedBooks[prevIdx1].titleAm : verifiedBooks[prevIdx1].titleEn}
                >
                  <div className="w-[130px] sm:w-[170px] md:w-[190px] aspect-[1/1.45] rounded-xl overflow-hidden border-2 border-white/70 bg-white shadow-inner">
                    <img
                      src={verifiedBooks[prevIdx1].coverImage}
                      alt={verifiedBooks[prevIdx1].titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-[10px] sm:text-[11px] font-bold text-[#3a352e] truncate max-w-[120px] text-center">
                    {lang === 'am' ? verifiedBooks[prevIdx1].titleAm : verifiedBooks[prevIdx1].titleEn}
                  </span>
                </div>

                {/* Center Dominant Book (Scale 100%, 3D drop shadow, focal point) */}
                <div
                  className="flex flex-col items-center scale-100 opacity-100 z-20 transition-all duration-500 ease-out"
                  style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.25))' }}
                >
                  <Link
                    to={`/books/${currentBook.slug}`}
                    className="w-[170px] sm:w-[230px] md:w-[270px] aspect-[1/1.45] rounded-2xl overflow-hidden border-3 border-white bg-white shadow-2xl block hover:scale-[1.02] transition-transform duration-300"
                  >
                    <img
                      src={currentBook.coverImage}
                      alt={currentBook.titleEn}
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                    />
                  </Link>
                </div>

                {/* Flanking Card Immediate Right */}
                <div
                  onClick={() => setActiveIndex(nextIdx1)}
                  className="hidden xs:flex flex-col items-center cursor-pointer scale-80 opacity-60 hover:opacity-90 transition-all duration-500 ease-out z-10"
                  style={{ filter: 'grayscale(15%) drop-shadow(0 10px 18px rgba(0,0,0,0.15))' }}
                  title={lang === 'am' ? verifiedBooks[nextIdx1].titleAm : verifiedBooks[nextIdx1].titleEn}
                >
                  <div className="w-[130px] sm:w-[170px] md:w-[190px] aspect-[1/1.45] rounded-xl overflow-hidden border-2 border-white/70 bg-white shadow-inner">
                    <img
                      src={verifiedBooks[nextIdx1].coverImage}
                      alt={verifiedBooks[nextIdx1].titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-[10px] sm:text-[11px] font-bold text-[#3a352e] truncate max-w-[120px] text-center">
                    {lang === 'am' ? verifiedBooks[nextIdx1].titleAm : verifiedBooks[nextIdx1].titleEn}
                  </span>
                </div>

                {/* Flanking Card Far Right (Desktop only) */}
                <div
                  onClick={() => setActiveIndex(nextIdx2)}
                  className="hidden md:flex flex-col items-center cursor-pointer scale-70 opacity-40 hover:opacity-75 transition-all duration-500 ease-out z-0"
                  style={{ filter: 'grayscale(25%) drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }}
                  title={lang === 'am' ? verifiedBooks[nextIdx2].titleAm : verifiedBooks[nextIdx2].titleEn}
                >
                  <div className="w-[120px] lg:w-[140px] aspect-[1/1.45] rounded-lg overflow-hidden border border-white/60 bg-white shadow-inner">
                    <img
                      src={verifiedBooks[nextIdx2].coverImage}
                      alt={verifiedBooks[nextIdx2].titleEn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                BOTTOM EDITORIAL TEXT & ACTIONS (Under the Center Card)
                ══════════════════════════════════════════════════════════════ */}
            <div className="mt-6 sm:mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#70685e]">
                  <span>{currentBook.year}</span>
                  <span>•</span>
                  <span className="text-[#b8860b]">{currentBook.series || 'Masterpiece'}</span>
                  {currentBook.pageCount && (
                    <>
                      <span>•</span>
                      <span>{currentBook.pageCount} {lang === 'am' ? 'ገጾች' : 'pages'}</span>
                    </>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                    fontWeight: 800,
                    color: '#1a1714',
                    lineHeight: 1.15,
                    marginBottom: '0.65rem',
                  }}
                >
                  {lang === 'am' ? currentBook.titleAm : currentBook.titleEn}
                </h3>

                {/* Editorial text like "Hard work beats talent..." in reference image */}
                <p
                  className="text-xs sm:text-sm text-[#4a453d] line-clamp-2"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}
                >
                  {getBookText(currentBook, lang)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  to={`/books/${currentBook.slug}`}
                  className="jkr-pill-btn-dark !py-3 !px-6 !text-xs shadow-md inline-flex items-center gap-2 flex-1 sm:flex-initial justify-center"
                >
                  <span>{lang === 'am' ? 'የመጽሐፍ ዝርዝርና ቅምሻ' : 'Book Details & Sample'}</span>
                  <Icon name="arrowRight" size={14} />
                </Link>

                <Link
                  to={`/books?category=${getCategorySlug(currentBook)}`}
                  className="jkr-pill-btn !py-3 !px-5 !text-xs border border-black/15 shadow-2xs inline-flex items-center gap-2 flex-1 sm:flex-initial justify-center hover:bg-white"
                >
                  <span>{lang === 'am' ? 'ተከታታዩን ይመልከቱ' : 'Explore Series'}</span>
                  <Icon name="external" size={13} />
                </Link>
              </div>
            </div>

            {/* Quick-Access Filmstrip Strip with all 15 Books */}
            <div className="mt-8 pt-5 border-t border-black/8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#70685e]">
                  {lang === 'am' ? 'ሁሉንም 15 መጻሕፍት በፍጥነት ይምረጡ' : 'Browse All 15 Books'}
                </span>
                <span className="text-[10px] font-mono text-[#8a857d]">
                  {activeIndex + 1} / {total}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth select-none hide-scrollbar">
                {verifiedBooks.map((b, idx) => {
                  const isCur = idx === activeIndex;
                  return (
                    <button
                      key={b.id || idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`shrink-0 rounded-md overflow-hidden transition-all duration-200 cursor-pointer p-0.5 border-2 ${
                        isCur
                          ? 'border-[#1a1714] scale-110 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                      title={`${idx + 1}. ${b.titleEn} (${b.year})`}
                    >
                      <div className="w-[36px] sm:w-[44px] aspect-[1/1.45] bg-white rounded-sm overflow-hidden">
                        <img src={b.coverImage} alt={b.titleEn} className="w-full h-full object-cover" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Catalog Action Link to Books Page */}
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

