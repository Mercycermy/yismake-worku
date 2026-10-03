import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import BookCover from '../components/BookCover';
import Icon from '../components/Icon';
import { verifiedBooks, authorData, authorHighlights } from '../data/yismakeData';

const bookExcerpt = (copy, maxLength = 290) => {
  const text = (copy || '').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}…`;
};

export default function Home() {
  const { lang } = useLanguage();
  const bioRef = useRef(null);
  const trilogyRef = useRef(null);

  const scrollToBio = () => {
    bioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTrilogy = () => {
    trilogyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 4 Canonical Book Categories as requested:
  // 1: Dertogada Sequels (5 books)
  // 2: Kibur Dingay Sequels (3 books)
  // 3: Other Novels (4 books)
  // 4: Poetry Books (2 books)
  const [activeCategory, setActiveCategory] = useState('dertogada');

  const bookCategories = [
    {
      id: 'dertogada',
      titleEn: 'Dertogada Sequels',
      titleAm: 'የዴርቶጋዳ ተከታታይ መጻሕፍት',
      count: 5,
      badgeEn: '5 SAGA BOOKS',
      badgeAm: '5 ተከታታይ ቅጾች',
      subtitleEn: 'The monumental 5-part speculative saga: Dertogada, Ramatohara, Zhantozhara, Yoratorad, and Yotod.',
      subtitleAm: 'በኢትዮጵያ ስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት የፈጠሩት አምስቱ ተከታታይ የሳይንስና የስለላ ልቦለዶች።',
      bookSlugs: ['dertogada', 'ramatohara', 'xantoxara', 'yoratorad', 'yotod']
    },
    {
      id: 'kibur-dingay',
      titleEn: 'Kibur Dingay Sequels',
      titleAm: 'የክቡር ድንጋይ ተከታታይ መጻሕፍት',
      count: 3,
      badgeEn: '3 MASTERPIECES',
      badgeAm: '3 ድንቅ ስራዎች',
      subtitleEn: 'The internationally acclaimed masterpiece and its gripping geopolitical thrillers.',
      subtitleAm: 'በእንግሊዝ አገር የታጨው «ክቡር ድንጋይ»፣ «ደህንነቱ» እና «የኦጋዴን ድመቶች»።',
      bookSlugs: ['kebur-dengay', 'dehinetu', 'yeogaden-demetoch']
    },
    {
      id: 'other-novels',
      titleEn: 'Other Novels',
      titleAm: 'ሌሎች ልቦለዶች',
      count: 4,
      badgeEn: '4 VISIONARY NOVELS',
      badgeAm: '4 ልቦለዶች',
      subtitleEn: 'Independent masterworks of philosophy, human struggle, and social satire.',
      subtitleAm: 'ተልሚድ፣ ተከርቸም፣ ዘምራ እና ሜሎስ — የተለያዩ ማህበራዊና ፍልስፍናዊ ድንቅ ልቦለዶች።',
      bookSlugs: ['telmid', 'tekerchem', 'zamra', 'melos']
    },
    {
      id: 'poetry',
      titleEn: 'Poetry Books',
      titleAm: 'የግጥም መጻሕፍት',
      count: 2,
      badgeEn: '2 POETRY ANTHOLOGIES',
      badgeAm: '2 የግጥም መድበሎች',
      subtitleEn: 'Poignant verses, cultural reflections, and early artistic masterpieces.',
      subtitleAm: 'የደራሲው የወጣትነት የግጥም መድበሎችና ማህበራዊ ምጸቶች፡ «የወንድ ምጥ» እና «የቀንድ አውጣ ኑሮ»።',
      bookSlugs: ['yewond-mit', 'yekend-awta-nuro']
    }
  ];

  const currentCategory = bookCategories.find((c) => c.id === activeCategory) || bookCategories[0];
  const activeBooks = currentCategory.bookSlugs
    .map((slug) => verifiedBooks.find((b) => b.slug === slug))
    .filter(Boolean);

  return (
    <div style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO SECTION: Grand Ethiopian Author Aesthetic
          ══════════════════════════════════════════════════════════════ */}
      <section
        className="jkr-home-landing-hero"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: "url('/images/writers-desk.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Deep atmospheric overlay with gold tint */}
        <div
          className="jkr-home-landing-hero__content"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, rgba(20,15,10,0.65) 0%, rgba(14,10,6,0.92) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '5rem 1.5rem 4.5rem',
            textAlign: 'center',
          }}
        >
          {/* Author Badge */}
          <div className="jkr-home-landing-hero__badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border shadow-lg"
            style={{
              background: 'rgba(201,168,76,0.12)',
              borderColor: 'rgba(201,168,76,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Icon name="spark" size={14} className="text-[#c9a84c]" />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#e8e0d4',
              }}
            >
              {lang === 'am'
                ? 'የዘመናዊው የኢትዮጵያ ሳይንስና ምናባዊ ልቦለድ ፈር-ቀዳጅ'
                : 'Ethiopian Novelist · Creator of the Dertogada Universe'}
            </span>
            <Icon name="spark" size={14} className="text-[#c9a84c]" />
          </div>

          {/* Hero Name Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 5.5vw, 4.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.08,
              letterSpacing: '0.04em',
              marginBottom: '1rem',
              textShadow: '0 4px 24px rgba(0,0,0,0.6)',
              textTransform: 'uppercase',
            }}
          >
            {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'YISMAKE WORKU'}
          </h1>

          {/* Hero Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
              color: 'rgba(240,235,225,0.92)',
              lineHeight: 1.65,
              maxWidth: '680px',
              margin: '0 auto 2rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              fontWeight: 400,
            }}
          >
            {lang === 'am'
              ? 'በዴርቶጋዳ ዓለም ውስጥ የገዳማዊ ባህል፣ የስለላ ታሪኮችና የወደፊት ሳይንስ ይገናኛሉ።'
              : 'In the Dertogada universe, Ethiopian monastic traditions meet espionage, speculative science, and bold visions of the future.'}
          </p>

          {/* Quick Accolades Grid */}
          <div
            className="jkr-home-landing-stats grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-12 sm:mb-12"
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            {authorHighlights.map((stat) => (
              <div key={stat.value} className="text-center p-1">
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#c9a84c',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.625rem',
                    color: '#d4cebe',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginTop: '2px',
                    fontWeight: 600,
                  }}
                >
                  {lang === 'am' ? stat.labelAm : stat.labelEn}
                </div>
              </div>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="jkr-home-landing-actions flex flex-wrap items-center justify-center gap-4 mt-6 sm:mt-4">
            <button
              onClick={scrollToTrilogy}
              className="jkr-pill-btn"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #b8860b)',
                color: '#1a1714',
                border: 'none',
                boxShadow: '0 6px 24px rgba(201,168,76,0.35)',
                fontWeight: 800,
                cursor: 'pointer',
                padding: '0.75rem 2rem',
                fontSize: '0.875rem',
              }}
            >
              <span>{lang === 'am' ? 'የይስማዕከ ወርቁን መጻሕፍት አስስ' : 'Explore All Series & Books'}</span>
              <Icon name="arrowDown" size={15} />
            </button>

            <button
              onClick={scrollToBio}
              className="jkr-pill-btn"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                padding: '0.75rem 1.75rem',
                fontSize: '0.875rem',
              }}
            >
              <span>{lang === 'am' ? 'ስለ ደራሲው ያንብቡ' : 'About Yismake'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. ABOUT ME SECTION: Author Profile & Philosophy
          ══════════════════════════════════════════════════════════════ */}
      <section
        ref={bioRef}
        style={{
          padding: '5rem 0 4rem',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid #edeae4',
        }}
      >
        <div className="site-container max-w-4xl mx-auto">
          {/* Gold Decorative Header */}
          <div className="text-center mb-10">
            <div className="jkr-gold-divider mb-3">
              <Icon name="spark" size={15} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.5rem',
              }}
            >
              {lang === 'am' ? 'ስለ ደራሲ ይስማዕከ ወርቁ' : 'About Yismake Worku'}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                color: '#8a857d',
                fontStyle: 'italic',
              }}
            >
              {lang === 'am'
                ? 'የደብረ ማርቆስ ዩኒቨርሲቲ መምህር፣ የሳይንስ ልቦለድ ፈር-ቀዳጅና የባህል ተመራማሪ'
                : 'Debre Markos University Lecturer, Speculative Fiction Pioneer & Cultural Researcher'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-12">
            {/* Polaroid Photo Stack */}
            <div className="md:col-span-5 flex justify-center">
              <div className="jkr-polaroid-stack">
                <div className="jkr-polaroid-back-1">
                  <div style={{ width: '100%', height: '224px', overflow: 'hidden', background: '#edeae4' }}>
                    <img src="/images/library-bg.jpg" alt="Archival notes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div className="jkr-polaroid-back-2">
                  <div style={{ width: '100%', height: '224px', overflow: 'hidden', background: '#edeae4' }}>
                    <img src="/images/dertogada-art.jpg" alt="Dertogada Universe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div className="jkr-polaroid-front shadow-2xl">
                  <div style={{ width: '100%', height: '256px', overflow: 'hidden', background: '#1a1714', marginBottom: '12px' }}>
                    <img src={authorData.portrait} alt="Yismake Worku" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 700, color: '#1a1714' }}>
                    Yismake Worku
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#8a857d', fontWeight: 500 }}>
                    Gojjam &amp; Addis Ababa, Ethiopia
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative & Philosophy */}
            <div className="md:col-span-7 space-y-4 text-[#3d3a35]">
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', lineHeight: 1.8 }}>
                {lang === 'am' ? authorData.bio.am : authorData.bio.en}
              </p>

              {/* Author Quote Box */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  background: 'var(--bg-secondary)',
                  borderLeft: '4px solid #c9a84c',
                  borderRadius: '0 8px 8px 0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.9375rem',
                    fontStyle: 'italic',
                    color: '#4a443b',
                    lineHeight: 1.7,
                  }}
                >
                  {lang === 'am'
                    ? '«ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም።»'
                    : '“Where ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind.”'}
                </p>
                <span
                  style={{
                    display: 'block',
                    marginTop: '8px',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#c9a84c',
                  }}
                >
                  — Yismake Worku (ይስማዕከ ወርቁ)
                </span>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1a1714] hover:text-[#c9a84c] transition-colors"
                >
                  <span>{lang === 'am' ? 'የተሟላ የህይወትና የደራሲነት ጉዞን ያንብቡ' : 'Read Full Literary Journey & Milestones'}</span>
                  <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. MASTERPIECES & SEQUELS BY CATEGORY
          ══════════════════════════════════════════════════════════════ */}
      <section
        ref={trilogyRef}
        className="jkr-home-trilogy"
        style={{
          padding: '5rem 0 6rem',
          background: 'var(--bg-secondary)',
          position: 'relative',
        }}
      >
        <div className="site-container jkr-home-trilogy__inner max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="jkr-home-trilogy__header text-center mb-10">
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
              {lang === 'am' ? 'ተከታታይ እና የተመረጡ መጻሕፍት' : 'The Masterpiece Series & Works'}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.0625rem',
                color: '#6b655d',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              {lang === 'am'
                ? 'ከዴርቶጋዳ አምስቱ ተከታታይ ቅጾች እስከ ክቡር ድንጋይ፣ ፍልስፍናዊ ልቦለዶች እና የግጥም መድበሎች ድረስ። ከታች ያሉትን ካርዶች በመጫን መጻሕፍቱን ይመልከቱ።'
                : 'From the legendary five Dertogada sagas to the acclaimed Kibur Dingay thrillers, visionary standalone novels, and early poetry collections. Click any category below to explore.'}
            </p>
          </div>

          {/* 4 Interactive Category Selector Cards */}
          <div className="jkr-home-category-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {bookCategories.map((cat, idx) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`jkr-home-category-card text-left p-5 rounded-xl transition-all duration-300 relative cursor-pointer border ${
                    isActive
                      ? 'bg-[#1a1714] text-[#fdfcfa] border-[#c9a84c] shadow-xl scale-[1.02]'
                      : 'bg-[#ffffff] text-[#1a1714] border-[#e8e2d5] hover:border-[#c9a84c]/60 hover:shadow-md'
                  }`}
                  style={{
                    boxShadow: isActive ? '0 12px 28px rgba(201,168,76,0.18)' : undefined,
                  }}
                >
                  {/* Category Card Header & Badge */}
                  <div className="jkr-home-category-card__meta flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                        isActive
                          ? 'bg-[#c9a84c] text-[#1a1714]'
                          : 'bg-[#f0ece4] text-[#7a746a]'
                      }`}
                    >
                      {cat.count} {lang === 'am' ? 'መጻሕፍት' : 'Books'}
                    </span>
                    <span className={`text-xs font-bold ${isActive ? 'text-[#c9a84c]' : 'text-[#8a857d]'}`}>
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Category Title */}
                  <h3
                    className="jkr-home-category-card__title text-base font-bold mb-1 leading-snug"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {lang === 'am' ? cat.titleAm : cat.titleEn}
                  </h3>

                  {/* Subtitle / summary */}
                  <p
                    className={`jkr-home-category-card__summary text-xs line-clamp-2 leading-relaxed ${
                      isActive ? 'text-[#d6d0c4]' : 'text-[#6b655d]'
                    }`}
                  >
                    {lang === 'am' ? cat.subtitleAm : cat.subtitleEn}
                  </p>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full bg-[#c9a84c]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Category Banner */}
          <div className="jkr-home-selected-category mb-8 p-4 sm:p-5 rounded-lg bg-[#f4f0e6] border border-[#e2d8c3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="jkr-home-selected-category__eyebrow text-[11px] font-bold tracking-widest uppercase text-[#8a6d1a] block mb-1">
                {lang === 'am' ? 'የተመረጠው ዘርፍ' : 'Current Series Selection'}
              </span>
              <h4 className="jkr-home-selected-category__title text-xl font-bold text-[#1a1714]" style={{ fontFamily: 'var(--font-serif)' }}>
                {lang === 'am' ? currentCategory.titleAm : currentCategory.titleEn}
              </h4>
              <p className="jkr-home-selected-category__summary text-xs text-[#6b655d] mt-0.5">
                {lang === 'am' ? currentCategory.subtitleAm : currentCategory.subtitleEn}
              </p>
            </div>
            <div className="jkr-home-selected-category__count text-xs font-bold text-[#1a1714] bg-white px-3 py-1.5 rounded-full border border-[#e2d8c3] whitespace-nowrap">
              {activeBooks.length} {lang === 'am' ? 'መጻሕፍት ተዘርዝረዋል' : 'Books Displayed'}
            </div>
          </div>

          {/* Books List for the Active Category */}
          <div className="space-y-8">
            {activeBooks.map((book, index) => {
              if (!book) return null;

              return (
                <div
                  key={book.id}
                  className="jkr-home-work-card bg-[#fdfcfa] border border-[#e8e2d5] rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  style={{
                    borderLeft: '5px solid #c9a84c',
                  }}
                >
                  {/* Watermark Part Number */}
                  <div
                    className="jkr-home-work-index"
                    style={{
                      position: 'absolute',
                      right: '1.5rem',
                      top: '0.5rem',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '5rem',
                      fontWeight: 900,
                      color: 'rgba(201,168,76,0.06)',
                      lineHeight: 1,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    0{index + 1}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Column 1: Authentic Book Cover Showcase */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center">
                      <div
                        className="jkr-home-work-cover"
                        style={{
                          width: '190px',
                          boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
                      >
                        <BookCover book={book} size="normal" />
                      </div>

                      {/* Series Badge Under Cover */}
                      <div
                        className="mt-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-center"
                        style={{
                          background: 'rgba(201,168,76,0.15)',
                          color: '#8a6d1a',
                          border: '1px solid rgba(201,168,76,0.3)',
                        }}
                      >
                        {lang === 'am' ? `ቅጽ 0${index + 1}` : `Book 0${index + 1}`}
                      </div>
                    </div>

                    {/* Column 2: Book Narrative & Details */}
                    <div className="md:col-span-8 space-y-4">
                      {/* Part Label & Year */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: '#c9a84c',
                            background: '#1a1714',
                            padding: '3px 10px',
                            borderRadius: '4px',
                          }}
                        >
                          {lang === 'am' ? currentCategory.badgeAm : currentCategory.badgeEn}
                        </span>
                        <span className="text-xs text-[#8a857d] font-semibold">
                          {book.year} ({book.yearEc} ዓ.ም) • {book.pageCount} {lang === 'am' ? 'ገጾች' : 'Pages'}
                        </span>
                      </div>

                      {/* Book Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                          fontWeight: 800,
                          color: '#1a1714',
                          lineHeight: 1.18,
                        }}
                      >
                        <Link to={`/books/${book.slug}`} className="hover:text-[#c9a84c] transition-colors">
                          {lang === 'am' ? book.titleAm : book.titleEn}
                        </Link>
                      </h3>

                      {/* Tagline / Subtitle */}
                      {book.tagline && (
                        <p
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '0.98rem',
                            fontStyle: 'italic',
                            color: '#c9a84c',
                            lineHeight: 1.5,
                          }}
                        >
                          "{lang === 'am' ? book.tagline.am : book.tagline.en}"
                        </p>
                      )}

                      {/* Synopsis */}
                      <p
                        className="jkr-home-work-summary"
                        style={{
                          fontSize: '0.925rem',
                          color: '#555047',
                          lineHeight: 1.75,
                        }}
                      >
                        {bookExcerpt(lang === 'am' ? book.description?.am : book.description?.en)}
                      </p>

                      {/* Key Themes Chips */}
                      {((lang === 'am' ? book.themesAm : book.themes) || []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(lang === 'am' ? book.themesAm : book.themes).slice(0, 4).map((theme, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded text-[11px] font-medium"
                              style={{
                                background: '#f0ece4',
                                color: '#5a554d',
                              }}
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Button: Read More & Sample */}
                      <div className="jkr-home-work-actions pt-3 flex items-center gap-3 flex-wrap">
                        <Link
                          to={`/books/${book.slug}`}
                          className="jkr-pill-btn-dark cursor-pointer flex items-center gap-2 !py-2.5 !px-6 !text-xs shadow-md"
                        >
                          <span>{lang === 'am' ? 'ተጨማሪ መረጃና የይዘት ቅምሻ' : 'Read More & Book Details'}</span>
                          <Icon name="arrowRight" size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Link to Full Catalogue */}
          <div className="mt-14 text-center">
            <Link
              to="/books"
              className="jkr-home-trilogy__catalogue-link jkr-pill-btn-dark !py-3 !px-8 !text-sm shadow-xl inline-flex items-center gap-2"
            >
              <span>
                {lang === 'am'
                  ? 'ሁሉንም 15+ የይስማዕከ ወርቁ መጻሕፍት ይመልከቱ'
                  : 'Explore All 15+ Masterpieces in the Full Catalogue'}
              </span>
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
