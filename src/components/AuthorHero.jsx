import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { authorData } from '../data/yismakeData';
import BookCover from './BookCover';
import { verifiedBooks } from '../data/yismakeData';

export default function AuthorHero() {
  const { lang, t } = useLanguage();
  const dertogadaBook = verifiedBooks.find(b => b.slug === 'dertogada');

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Graphic: Subterranean Quantum Library Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 filter brightness-75 scale-105"
        style={{ backgroundImage: "url('/images/library-bg.jpg')" }}
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/85 to-[#080b11]/60" />
      <div className="absolute inset-0 z-0 cyber-grid-bg opacity-35" />

      {/* Futuristic Coordinate Watermarks (Lake Tana / Gojjam / Debre Markos) */}
      <div className="absolute top-24 left-8 hidden xl:block z-10 font-mono text-[11px] text-cyan-400/40 tracking-widest space-y-1">
        <div>SECTOR: LAKE TANA SUBTERRANEAN</div>
        <div>COORDINATES: 11°56′N 37°18′E</div>
        <div>ARCHIVE: DEBRE MARKOS · GOJJAM BASIN</div>
        <div className="text-[#d4af37]/40">MANUSCRIPT VAULT: ACTIVE</div>
      </div>

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Monumental Author Presentation & Statement */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="text-xs font-semibold tracking-wider text-cyan-300 font-mono">
                {lang === 'am' ? 'የኢትዮጵያ ሳይንስ ልቦለድ ፈር-ቀዳጅ' : 'PIONEER OF ETHIOPIAN TECHNO-FICTION'}
              </span>
            </div>

            {/* Monumental Dual-Language Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] font-['Cinzel']">
              <span className="block text-gradient-gold drop-shadow-lg">
                YISMAKE
              </span>
              <span className="block text-white">
                WORKU
              </span>
              <span className="block text-3xl sm:text-5xl xl:text-6xl font-['Noto_Serif_Ethiopic'] font-bold text-[#d4af37] mt-2 sm:mt-3">
                ይስማዕከ ወርቁ
              </span>
            </h1>

            {/* Researched Literary Premise (Never Fabricated) */}
            <p className="mt-6 text-lg sm:text-xl text-[#ebe4d3] max-w-2xl font-['Noto_Serif_Ethiopic'] font-normal leading-relaxed">
              {lang === 'am' ? (
                <span>
                  ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም።
                </span>
              ) : (
                <span>
                  Where ancient Ethiopian monastic contemplation meets orbital rocket physics, subterranean laboratories, and the relentless quest for intellectual sovereignty.
                </span>
              )}
            </p>

            {/* Quick Metrics from Verified Research */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 py-4 border-y border-white/10 font-mono">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#00f0ff]">{authorData.stats.booksPublished}</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider">{lang === 'am' ? 'የታተሙ መጻሕፍት' : 'Books Published'}</div>
              </div>
              <div className="border-x border-white/10 px-2">
                <div className="text-xl sm:text-2xl font-bold text-[#d4af37]">{authorData.stats.dertogadaSales.split(' ')[0]}</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider">{lang === 'am' ? 'የዴርቶጋዳ ሽያጭ' : 'Dertogada Sales'}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{authorData.stats.reprintsFirstYear.split(' ')[0]}</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider">{lang === 'am' ? 'በአንድ ዓመት እትሞች' : 'Reprints in Yr 1'}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/universe" className="btn-cyan">
                <span>{lang === 'am' ? 'የዴርቶጋዳን ዓለም አስስ' : 'Explore the Universe'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link to="/books" className="btn-secondary">
                <span>{lang === 'am' ? 'የመጻሕፍት ዝርዝር' : 'Browse Catalog'}</span>
              </Link>
              <Link to="/author" className="btn-secondary">
                <span>{lang === 'am' ? 'የደራሲው ታሪክ' : 'Visual Biography'}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Author Portrait & Iconic Dertogada Book) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-8 relative">
            {/* Ambient Backlight */}
            <div className="absolute w-72 h-72 rounded-full bg-[#00f0ff]/15 blur-[80px] pointer-events-none" />

            {/* Author Portrait Shield */}
            <div className="relative group">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-105">
                <img
                  src={authorData.avatar}
                  alt="Yismake Worku - Ethiopian Author"
                  className="w-full h-full object-cover object-center filter saturate-[1.1]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent opacity-60" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-2 rounded-lg bg-[#0e131d]/90 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-xs font-bold text-white font-['Cinzel']">YISMAKE WORKU</div>
                  <div className="text-[10px] text-[#d4af37] font-['Noto_Serif_Ethiopic']">ደራሲ ይስማዕከ ወርቁ</div>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#00f0ff]" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#d4af37]" />
            </div>

            {/* Iconic Dertogada Book Card Feature */}
            {dertogadaBook && (
              <div className="relative -mt-6 sm:mt-0 lg:-mt-10 z-20">
                <Link to={`/books/${dertogadaBook.slug}`} className="block group">
                  <div className="transition-transform duration-500 group-hover:-translate-y-2">
                    <BookCover book={dertogadaBook} size="normal" />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs font-mono text-cyan-300/80 group-hover:text-cyan-300">
                      {lang === 'am' ? '→ ስለ ዴርቶጋዳ ዝርዝር ይመልከቱ' : '→ View Dertogada Dossier'}
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
