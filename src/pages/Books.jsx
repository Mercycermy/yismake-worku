import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import ModalInspectionFolio from '../components/ModalInspectionFolio';
import Icon from '../components/Icon';

export default function Books() {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryQuery = searchParams.get('category');
  const [inspectionBook, setInspectionBook] = useState(null);

  const bookCategories = [
    {
      id: 'dertogada',
      titleEn: 'Dertogada Sequels',
      titleAm: 'የዴርቶጋዳ ተከታታይ መጻሕፍት',
      tagEn: 'THE DERTOGADA SAGA · 5 VOLUMES',
      tagAm: 'የዴርቶጋዳ 5 ተከታታይ ቅጾች',
      subtitleEn: 'The monumental 5-part speculative saga exploring Ethiopian heritage, science, and subterranean secrets.',
      subtitleAm: 'በኢትዮጵያ ስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት የፈጠሩት አምስቱ ተከታታይ የሳይንስና የስለላ ልቦለዶች።',
      stageBg: '#dbe4e8',
      accentColor: '#c9a84c',
      bookSlugs: ['dertogada', 'ramatohara', 'xantoxara', 'yoratorad', 'yotod'],
    },
    {
      id: 'kibur-dingay',
      titleEn: 'Kibur Dingay Sequels',
      titleAm: 'የክቡር ድንጋይ ተከታታይ መጻሕፍት',
      tagEn: 'KIBUR DINGAY SERIES · 3 NOVELS',
      tagAm: 'የክቡር ድንጋይ ተከታታይ · 3 ልቦለዶች',
      subtitleEn: 'The internationally acclaimed masterpiece and its gripping geopolitical thrillers.',
      subtitleAm: 'በእንግሊዝ አገር የታጨው «ክቡር ድንጋይ»፣ «ደህንነቱ» እና «የኦጋዴን ድመቶች»።',
      stageBg: '#e6ded4',
      accentColor: '#b8793b',
      bookSlugs: ['kebur-dengay', 'dehinetu', 'yeogaden-demetoch'],
    },
    {
      id: 'other-novels',
      titleEn: 'Other Novels',
      titleAm: 'ሌሎች ልቦለዶች',
      tagEn: 'INDEPENDENT WORKS · 5 MASTERPIECES',
      tagAm: 'ራሳቸውን የቻሉ 5 ድንቅ ስራዎች',
      subtitleEn: 'Independent masterworks of philosophy, human struggle, and incisive sociopolitical critique.',
      subtitleAm: 'ተልሚድ፣ ተከርቸም፣ ዘምራ፣ ሜሎስ እና ግፉዓን የተሰኙ የተለያዩ ማህበራዊና ፍልስፍናዊ ድንቅ ልቦለዶች።',
      stageBg: '#e2dbe6',
      accentColor: '#8a529e',
      bookSlugs: ['telmid', 'tekerchem', 'zamra', 'melos', 'gefuan'],
    },
    {
      id: 'poetry',
      titleEn: 'Poetry Books',
      titleAm: 'የግጥም መጻሕፍት',
      tagEn: 'POETRY COLLECTIONS · 2 VOLUMES',
      tagAm: 'የግጥም መድበሎች · 2 ቅጾች',
      subtitleEn: 'Poignant verses, cultural reflections, and early artistic masterpieces.',
      subtitleAm: 'የደራሲው የወጣትነት የግጥም መድበሎችና ማህበራዊ ምጸቶች።',
      stageBg: '#eae6d6',
      accentColor: '#8f7b2c',
      bookSlugs: ['yewond-mit', 'yekend-awta-nuro'],
    },
  ];

  const activeCategory = bookCategories.find((c) => c.id === selectedCategoryQuery);

  const selectCategory = (catId) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="jkr-books-page"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        minHeight: '100vh',
      }}
    >
      {/* Editorial Page Header without background image */}
      <section className="pt-12 sm:pt-16 pb-8 border-b border-[#e8e2d5]/60 text-center">
        <div className="site-container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-4">
            <Icon name="spark" size={13} />
            <span>{lang === 'am' ? 'የተሟላ የመጻሕፍት ማህደር' : 'Official Canonical Folios'}</span>
            <Icon name="spark" size={13} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {activeCategory
              ? (lang === 'am' ? activeCategory.titleAm : activeCategory.titleEn)
              : (lang === 'am' ? 'የይስማዕከ ወርቁ መጻሕፍት' : 'The Canonical Works')}
          </h1>

          <p
            className="max-w-2xl mx-auto text-sm sm:text-base text-[#6e685f]"
            style={{
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {activeCategory
              ? (lang === 'am' ? activeCategory.subtitleAm : activeCategory.subtitleEn)
              : (lang === 'am'
                  ? 'የዴርቶጋዳ ተከታታይ፣ የክቡር ድንጋይ ስብስብ፣ ፍልስፍናዊ ልቦለዶችና የግጥም መድበሎች በአራት ዋና ዘርፎች።'
                  : 'Four distinct literary categories: The Dertogada speculative saga, Kibur Dingay thrillers, independent social novels, and early poetry.')}
          </p>
          <div className="w-16 h-0.5 bg-[#c9a84c] mx-auto mt-4 rounded-full" />

          {/* Category Quick Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => selectCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !activeCategory
                  ? 'bg-[#1a1714] text-[#f5f1eb] shadow-sm'
                  : 'bg-white border border-[#e8e2d5] text-[#5a564e] hover:border-[#c9a84c]'
              }`}
            >
              {lang === 'am' ? 'ሁሉም 4 ዘርፎች' : 'All 4 Categories'}
            </button>
            {bookCategories.map((cat) => {
              const isSelected = activeCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1714] text-[#c9a84c] shadow-sm ring-1 ring-[#c9a84c]'
                      : 'bg-white border border-[#e8e2d5] text-[#5a564e] hover:border-[#c9a84c]'
                  }`}
                >
                  {lang === 'am' ? cat.titleAm : cat.titleEn}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Dedicated Category Page OR 4 Animated Slider Stages */}
      <div className="site-container max-w-6xl mx-auto py-10 sm:py-16 px-4">
        {activeCategory ? (
          /* ══════════════════════════════════════════════════════════════
             DEDICATED CATEGORY PAGE (Directed when user clicks category)
             ══════════════════════════════════════════════════════════════ */
          <DedicatedCategoryView
            category={activeCategory}
            lang={lang}
            verifiedBooks={verifiedBooks}
            onBack={() => selectCategory(null)}
            setInspectionBook={setInspectionBook}
          />
        ) : (
          /* ══════════════════════════════════════════════════════════════
             4 CATEGORIES SHOWCASE WITH ANIMATED SLIDERS (Like Image)
             ══════════════════════════════════════════════════════════════ */
          <div className="space-y-16 sm:space-y-24">
            {bookCategories.map((cat, idx) => (
              <AnimatedCategoryStage
                key={cat.id}
                category={cat}
                categoryIndex={idx}
                lang={lang}
                verifiedBooks={verifiedBooks}
                onOpenCategory={() => selectCategory(cat.id)}
                setInspectionBook={setInspectionBook}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Inspection Modal */}
      {inspectionBook && (
        <ModalInspectionFolio
          book={inspectionBook}
          isOpen={Boolean(inspectionBook)}
          onClose={() => setInspectionBook(null)}
        />
      )}
    </div>
  );
}

/**
 * Animated Book Slider Stage modeled directly after the user's uploaded image:
 * - Studio background frame (#dbe4e8 style soft background)
 * - Category / Author top label (e.g. TIM NOTKE style)
 * - Top-right counter (e.g. 1/5)
 * - Large center active book cover with 3D drop shadow
 * - Flanking smaller preview book covers on left and right
 * - Elegant typography quote / book description below
 * - Next / Prev controls and smooth transition
 * - Direct link button to dedicate category page
 */
function AnimatedCategoryStage({ category, categoryIndex, lang, verifiedBooks, onOpenCategory, setInspectionBook }) {
  const books = category.bookSlugs
    .map((slug) => verifiedBooks.find((b) => b.slug === slug))
    .filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const total = books.length;
  const currentBook = books[activeIndex] || books[0];

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

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
    if (distance > 45) {
      goNext();
    } else if (distance < -45) {
      goPrev();
    }
  };

  const getBookSnippet = (b, l) => {
    if (b.tagline) {
      const tag = typeof b.tagline === 'object' ? (b.tagline[l] || b.tagline.en) : b.tagline;
      if (tag) return tag;
    }
    if (b.description) {
      const desc = typeof b.description === 'object' ? (b.description[l] || b.description.en) : b.description;
      if (desc) return desc;
    }
    return l === 'am' ? (b.summaryAm || b.descriptionAm || '') : (b.summaryEn || b.descriptionEn || '');
  };

  if (!books.length) return null;

  return (
    <section className="category-stage-section">
      {/* Category Stage Frame — Soft Studio Card */}
      <div
        className="relative rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-sm transition-all"
        style={{
          background: category.stageBg,
          border: '1px solid rgba(0,0,0,0.06)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header Row inside the Studio Stage */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCategory}
              className="text-left group cursor-pointer bg-transparent border-none p-0"
            >
              <span
                className="px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase inline-block group-hover:bg-[#1a1714] group-hover:text-[#c9a84c] transition-colors"
                style={{
                  background: 'rgba(26,23,20,0.08)',
                  color: '#1a1714',
                  letterSpacing: '0.15em',
                }}
              >
                {lang === 'am' ? category.tagAm : category.tagEn}
              </span>
            </button>
          </div>

          {/* Counter (e.g. 1/5) like the top right of the user image */}
          <div className="flex items-center gap-4">
            <div
              className="text-right"
              style={{
                fontFamily: 'var(--font-serif)',
                letterSpacing: '0.05em',
                color: '#1a1714',
              }}
            >
              <span className="text-2xl sm:text-3xl font-bold">{activeIndex + 1}</span>
              <span className="text-base sm:text-lg opacity-40 font-light">/{total}</span>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs p-1 rounded-full border border-black/5 shadow-2xs">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous book"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#1a1714] transition-colors cursor-pointer"
              >
                <Icon name="chevronLeft" size={16} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next book"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#1a1714] transition-colors cursor-pointer"
              >
                <Icon name="chevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SLIDER STAGE (Center Active Book + Flanking Books like Image)
            ══════════════════════════════════════════════════════════════ */}
        <div className="relative my-4 sm:my-8 flex items-center justify-center overflow-hidden min-h-[340px] sm:min-h-[420px]">
          
          {/* Books Row */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 w-full max-w-4xl mx-auto select-none">
            {books.map((b, idx) => {
              const isCenter = idx === activeIndex;
              const isPrev = idx === (activeIndex - 1 + total) % total;
              const isNext = idx === (activeIndex + 1) % total;
              const isVisible = isCenter || isPrev || isNext;

              // On small screens, hide non-immediate items to keep it clean
              if (!isVisible && total > 3) return null;

              return (
                <div
                  key={b.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`transition-all duration-500 ease-out cursor-pointer flex flex-col items-center ${
                    isCenter
                      ? 'scale-100 opacity-100 z-20 translate-y-0'
                      : 'scale-75 sm:scale-80 opacity-60 hover:opacity-90 z-10 hidden xs:flex'
                  }`}
                  style={{
                    filter: isCenter ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.22))' : 'grayscale(15%) drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                  }}
                >
                  <div className="w-[170px] sm:w-[220px] md:w-[250px] aspect-[1/1.45] rounded-xl overflow-hidden border-2 border-white/60 bg-white shadow-inner">
                    <img
                      src={b.coverImage}
                      alt={b.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>
                  {!isCenter && (
                    <span className="mt-2 text-[11px] font-bold text-[#3a352e] truncate max-w-[120px] text-center">
                      {lang === 'am' ? b.titleAm : b.titleEn}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM EDITORIAL TEXT & ACTIONS (Under the center book)
            ══════════════════════════════════════════════════════════════ */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#70685e]">
              <span>{currentBook.year}</span>
              <span>•</span>
              <span className="text-[#b8860b]">{currentBook.subtitleEn || 'Canonical Edition'}</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
                fontWeight: 800,
                color: '#1a1714',
                lineHeight: 1.15,
                marginBottom: '0.65rem',
              }}
            >
              {lang === 'am' ? currentBook.titleAm : currentBook.titleEn}
            </h3>

            {/* Quote / Hook text like "Hard work beats talent..." in image */}
            <p
              className="text-xs sm:text-sm text-[#4a453d] line-clamp-2"
              style={{
                fontFamily: 'var(--font-serif)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              {getBookSnippet(currentBook, lang)}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center flex-wrap gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to={`/books/${currentBook.slug}`}
              className="jkr-pill-btn-dark !py-3 !px-6 !text-xs shadow-md inline-flex items-center gap-2 flex-1 sm:flex-initial justify-center"
            >
              <span>{lang === 'am' ? 'የመጽሐፍ ዝርዝርና ቅምሻ' : 'Book Details & Sample'}</span>
              <Icon name="arrowRight" size={14} />
            </Link>

            {/* Direct button to open dedicated category page with ALL books */}
            <button
              type="button"
              onClick={onOpenCategory}
              className="px-5 py-3 rounded-full text-xs font-bold bg-white text-[#1a1714] border border-black/10 hover:border-[#c9a84c] hover:bg-[#faf8f4] transition-all shadow-2xs inline-flex items-center gap-2 flex-1 sm:flex-initial justify-center cursor-pointer"
            >
              <span>
                {lang === 'am'
                  ? `ሁሉንም ${total} የዚህ ዘርፍ መጻሕፍት ክፈት`
                  : `View All ${total} Books in this Saga`}
              </span>
              <span className="text-[#c9a84c] font-bold">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Dedicated Category Page View:
 * Shown when user clicks into a category (e.g. Dertogada Sequels)
 * Displays all books in that specific series with rich cards, synopsis, verified tags, and read sample actions.
 */
function DedicatedCategoryView({ category, lang, verifiedBooks, onBack, setInspectionBook }) {
  const books = category.bookSlugs
    .map((slug) => verifiedBooks.find((b) => b.slug === slug))
    .filter(Boolean);

  return (
    <div className="animate-fade-in">
      {/* Return to All 4 Categories Button */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8a857d] hover:text-[#1a1714] transition-colors cursor-pointer"
        >
          <Icon name="arrowLeft" size={15} />
          <span>{lang === 'am' ? '← ወደ 4ቱ ዘርፎች ተመለስ' : '← Back to All 4 Categories'}</span>
        </button>

        <span className="text-xs font-mono font-bold text-[#c9a84c]">
          {books.length} {lang === 'am' ? 'መጻሕፍት ተመዝግበዋል' : 'Verified Books'}
        </span>
      </div>

      {/* Category Banner Highlight */}
      <div
        className="p-8 sm:p-10 rounded-3xl mb-12 relative overflow-hidden"
        style={{
          background: category.stageBg,
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#b8860b] block mb-2">
          {lang === 'am' ? category.tagAm : category.tagEn}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: '#1a1714',
            marginBottom: '0.75rem',
          }}
        >
          {lang === 'am' ? category.titleAm : category.titleEn}
        </h2>
        <p
          className="max-w-3xl text-sm sm:text-base text-[#4a453d]"
          style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.7 }}
        >
          {lang === 'am' ? category.subtitleAm : category.subtitleEn}
        </p>
      </div>

      {/* Grid of all books in this category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book, idx) => (
          <article
            key={book.id}
            className="group bg-white rounded-2xl border border-[#e8dfc8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Cover Stage */}
              <div className="p-6 bg-[#f8f6f0] flex items-center justify-center border-b border-[#e8dfc8]/60 relative">
                <span className="absolute top-4 left-4 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/80 text-[#8a857d] border border-black/5">
                  #{idx + 1}
                </span>

                <div className="w-[140px] sm:w-[160px] aspect-[1/1.48] rounded-lg overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                  <BookCover book={book} size="lg" />
                </div>
              </div>

              {/* Book Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8a857d] mb-1.5">
                  <span>{book.year}</span>
                  <span>•</span>
                  <span>{book.pages ? `${book.pages} pages` : 'Official Edition'}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#1a1714',
                    lineHeight: 1.25,
                    marginBottom: '0.5rem',
                  }}
                  className="group-hover:text-[#c9a84c] transition-colors"
                >
                  {lang === 'am' ? book.titleAm : book.titleEn}
                </h3>

                <p
                  className="text-xs text-[#5e584f] line-clamp-3 mb-4"
                  style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.65 }}
                >
                  {(() => {
                    if (book.tagline) {
                      const t = typeof book.tagline === 'object' ? (book.tagline[lang] || book.tagline.en) : book.tagline;
                      if (t) return t;
                    }
                    if (book.description) {
                      const d = typeof book.description === 'object' ? (book.description[lang] || book.description.en) : book.description;
                      if (d) return d;
                    }
                    return lang === 'am' ? (book.summaryAm || book.descriptionAm || '') : (book.summaryEn || book.descriptionEn || '');
                  })()}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 border-t border-transparent flex items-center justify-between gap-3">
              <Link
                to={`/books/${book.slug}`}
                className="jkr-pill-btn-dark !py-2.5 !px-5 !text-xs flex-1 text-center inline-flex items-center justify-center gap-2"
              >
                <span>{lang === 'am' ? 'ሙሉ መረጃ' : 'Read Folio'}</span>
                <Icon name="arrowRight" size={13} />
              </Link>

              <button
                type="button"
                onClick={() => setInspectionBook(book)}
                className="p-2.5 rounded-full border border-[#e8dfc8] hover:border-[#c9a84c] text-[#8a857d] hover:text-[#1a1714] transition-colors cursor-pointer"
                title={lang === 'am' ? 'ፈጣን ምርመራ' : 'Quick inspect'}
              >
                <Icon name="spark" size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
