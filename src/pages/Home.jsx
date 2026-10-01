import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import BookCover from '../components/BookCover';
import QuickPurchaseModal from '../components/QuickPurchaseModal';
import Icon from '../components/Icon';
import { verifiedBooks, authorData } from '../data/yismakeData';

export default function Home() {
  const { lang } = useLanguage();
  const bioRef = useRef(null);
  const trilogyRef = useRef(null);
  const [purchaseBook, setPurchaseBook] = useState(null);

  const scrollToBio = () => {
    bioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTrilogy = () => {
    trilogyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // The 3 iconic sequel books in chronological saga order
  const trilogyBooks = [
    {
      partNumber: 1,
      partLabelEn: 'PART I · THE GENESIS',
      partLabelAm: 'ክፍል ፩ · የመጀመሪያው ምዕራፍ',
      book: verifiedBooks.find((b) => b.slug === 'dertogada'),
      subtitleEn: 'The Historic Record-Breaker That Sparked an Afrofuturist Renaissance',
      subtitleAm: 'በአንድ ዓመት ውስጥ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች የተሸጠው ታሪካዊ መጽሐፍ',
      highlightBadge: '200,000+ COPIES',
    },
    {
      partNumber: 2,
      partLabelEn: 'PART II · DIRECT SEQUEL',
      partLabelAm: 'ክፍል ፪ · ቀጥተኛ ተከታይ',
      book: verifiedBooks.find((b) => b.slug === 'ramatohara'),
      subtitleEn: 'The Conspiracy Deepens Beneath Lake Tana as Global Superpowers Intervene',
      subtitleAm: 'የዴርቶጋዳ ታላቅ ቀጣይ ምዕራፍ፤ ጥንታዊ ምስጢሮች ከዓለም አቀፍ የፖለቲካ ሴራ ጋር ሲፋጠጡ',
      highlightBadge: 'DIRECT SEQUEL',
    },
    {
      partNumber: 3,
      partLabelEn: 'PART III · THE CLIMAX',
      partLabelAm: 'ክፍል ፫ · የፍጻሜው ማዕበል',
      book: verifiedBooks.find((b) => b.slug === 'xantoxara'),
      subtitleEn: 'Orbital Cryptography, Cybernetic Warfare, and Ancient Monastic Lineages',
      subtitleAm: 'የቴክኖሎጂና የስለላው ፍልሚያ ወደ ሳይበርና የኮምፒውተር የደህንነት ምህዳር የዘለቀበት ድንቅ ሥራ',
      highlightBadge: 'TRILOGY CLIMAX',
    }
  ];

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
                : 'Architect of Modern Ethiopian Speculative Fiction'}
            </span>
            <Icon name="spark" size={14} className="text-[#c9a84c]" />
          </div>

          {/* Hero Name Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 6.5vw, 4.75rem)',
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
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              color: 'rgba(240,235,225,0.92)',
              lineHeight: 1.65,
              maxWidth: '680px',
              margin: '0 auto 2.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              fontWeight: 400,
            }}
          >
            {lang === 'am'
              ? 'ጥንታዊው የገዳማት ምስጢር፣ የብራና ጥበብና ዘመናዊው የጠፈር ምርምር የተዋሃዱበት ድንቅ የስነ-ጽሑፍ ዓለም።'
              : 'Where ancient Ethiopian monastic contemplation, sacred Ge’ez parchments, and orbital rocketry converge into a transformative literary universe.'}
          </p>

          {/* Quick Accolades Grid */}
          <div
            className="jkr-home-landing-stats grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10"
            style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            {[
              { num: '200,000+', labelEn: 'Copies Sold', labelAm: 'የተሸጡ ቅጂዎች' },
              { num: '10x', labelEn: 'Reprints First Year', labelAm: 'በአንድ ዓመት 10 እትም' },
              { num: '15+', labelEn: 'Major Novels', labelAm: 'ታላላቅ ልቦለዶች' },
              { num: 'UK 2022', labelEn: 'TA Prize Shortlist', labelAm: 'የእንግሊዝ ሽልማት እጩ' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-1">
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#c9a84c',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.num}
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
          <div className="jkr-home-landing-actions flex flex-wrap items-center justify-center gap-4">
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
              <span>{lang === 'am' ? 'የዴርቶጋዳ ተከታታይ መጻሕፍት' : 'Explore The Trilogy Saga'}</span>
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
          3. THE 3 SEQUEL BOOKS (ONLY APPEARS AFTER ABOUT ME)
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
          <div className="jkr-home-trilogy__header text-center mb-12">
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
              {lang === 'am' ? 'ተከታታይ የልቦለድ ስራዎች' : 'The Canonical Trilogy Saga'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: 800,
                color: '#1a1714',
                lineHeight: 1.15,
                marginBottom: '1rem',
              }}
            >
              {lang === 'am' ? 'የዴርቶጋዳ ሦስቱ ተከታታይ መጻሕፍት' : 'The Three Dertogada Sequels'}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.0625rem',
                color: '#6b655d',
                maxWidth: '640px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              {lang === 'am'
                ? 'በኢትዮጵያ ስነ-ጽሑፍ ታሪክ ውስጥ ከፍተኛ ተወዳጅነት ያተረፉት ሦስቱ ተከታታይ ልብ አንጠልጣይ የሳይንስና የስለላ ልቦለዶች በቅደም ተከተል'
                : 'Experience the iconic sequence: from the subterranean genesis beneath Lake Tana to geopolitical intrigue and orbital cryptographic warfare.'}
            </p>

            {/* Sequence Connection Ribbon */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1a1714] text-[#c9a84c] text-xs font-bold flex items-center justify-center">1</span>
                <span className="text-xs font-bold text-[#1a1714]">{lang === 'am' ? 'ዴርቶጋዳ' : 'Dertogada'}</span>
              </div>
              <Icon name="arrowRight" size={15} className="text-[#c9a84c]" />
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1a1714] text-[#c9a84c] text-xs font-bold flex items-center justify-center">2</span>
                <span className="text-xs font-bold text-[#1a1714]">{lang === 'am' ? 'ራማቶሐራ' : 'Ramatohara'}</span>
              </div>
              <Icon name="arrowRight" size={15} className="text-[#c9a84c]" />
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1a1714] text-[#c9a84c] text-xs font-bold flex items-center justify-center">3</span>
                <span className="text-xs font-bold text-[#1a1714]">{lang === 'am' ? 'ዣንቶዣራ' : 'Zhantozhara'}</span>
              </div>
            </div>
          </div>

          {/* 3 Sequel Books Grid / Timeline Stack */}
          <div className="jkr-home-trilogy__list space-y-8">
            {trilogyBooks.map((item, index) => {
              const book = item.book;
              if (!book) return null;

              return (
                <div
                  key={book.id}
                  className="jkr-home-trilogy__card bg-[#fdfcfa] border border-[#e8e2d5] rounded-xl p-6 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  style={{
                    borderLeft: '5px solid #c9a84c',
                  }}
                >
                  {/* Watermark Part Number */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '1.5rem',
                      top: '0.5rem',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '6rem',
                      fontWeight: 900,
                      color: 'rgba(201,168,76,0.06)',
                      lineHeight: 1,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    0{item.partNumber}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Column 1: Book Cover Showcase */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center">
                      <div
                        style={{
                          width: '210px',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
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
                        className="mt-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase"
                        style={{
                          background: 'rgba(201,168,76,0.15)',
                          color: '#8a6d1a',
                          border: '1px solid rgba(201,168,76,0.3)',
                        }}
                      >
                        {item.highlightBadge}
                      </div>
                    </div>

                    {/* Column 2: Book Narrative & Details */}
                    <div className="md:col-span-8 space-y-4">
                      {/* Part Label & Year */}
                      <div className="flex items-center gap-3">
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
                          {lang === 'am' ? item.partLabelAm : item.partLabelEn}
                        </span>
                        <span className="text-xs text-[#8a857d] font-semibold">
                          {book.year} ({book.yearEc} ዓ.ም) • {book.pageCount} {lang === 'am' ? 'ገጾች' : 'Pages'}
                        </span>
                      </div>

                      {/* Book Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
                          fontWeight: 800,
                          color: '#1a1714',
                          lineHeight: 1.15,
                        }}
                      >
                        <Link to={`/books/${book.slug}`} className="hover:text-[#c9a84c] transition-colors">
                          {lang === 'am' ? book.titleAm : book.titleEn}
                        </Link>
                      </h3>

                      {/* Tagline / Subtitle */}
                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1rem',
                          fontStyle: 'italic',
                          color: '#c9a84c',
                          lineHeight: 1.5,
                        }}
                      >
                        "{lang === 'am' ? book.tagline.am : book.tagline.en}"
                      </p>

                      {/* Synopsis */}
                      <p
                        style={{
                          fontSize: '0.9375rem',
                          color: '#555047',
                          lineHeight: 1.75,
                        }}
                      >
                        {lang === 'am' ? book.description.am : book.description.en}
                      </p>

                      {/* Key Themes Chips */}
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

                      {/* Action Buttons: Buy Now & Read More */}
                      <div className="pt-4 flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => setPurchaseBook(book)}
                          className="jkr-pill-btn-dark cursor-pointer flex items-center gap-2 !py-2.5 !px-6 !text-xs shadow-md"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                          <span>{lang === 'am' ? 'ይግዙ / እዘዙ' : 'Buy / Order Copy'}</span>
                        </button>

                        <Link
                          to={`/books/${book.slug}`}
                          className="jkr-pill-btn cursor-pointer flex items-center gap-1.5 !py-2.5 !px-6 !text-xs border border-gray-300 hover:border-black shadow-sm"
                        >
                          <span>{lang === 'am' ? 'ተጨማሪ መረጃና ቅምሻ' : 'Read More & Sample'}</span>
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
              className="jkr-pill-btn-dark !py-3 !px-8 !text-sm shadow-xl inline-flex items-center gap-2"
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

      {/* Quick Purchase Modal */}
      {purchaseBook && (
        <QuickPurchaseModal
          book={purchaseBook}
          isOpen={Boolean(purchaseBook)}
          onClose={() => setPurchaseBook(null)}
        />
      )}
    </div>
  );
}
