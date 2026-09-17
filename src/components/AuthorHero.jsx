import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { authorData, verifiedBooks } from '../data/yismakeData';

export default function AuthorHero() {
  const { lang } = useLanguage();
  const dertogadaBook = verifiedBooks.find((b) => b.slug === 'dertogada');

  return (
    <section className="relative min-h-[92vh] pt-32 sm:pt-36 pb-20 sm:pb-24 border-b border-[var(--border-hairline)] overflow-hidden bg-[#0d1517]">
      {/* Background Subtle Manuscript Drafting Grid */}
      <div className="absolute inset-0 manuscript-grid opacity-25 pointer-events-none" />

      {/* Atmospheric Chasm Emerald & Sacred Ochre Bioluminescence Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2dd4bf] opacity-[0.07] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-[#1f6b6b] opacity-[0.12] blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#ffb95f] opacity-[0.04] blur-[160px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Top Archival Metadata Header */}
        <div className="pb-4 mb-8 sm:mb-12 border-b border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] text-[var(--outline)] tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[var(--primary-container)] shadow-[0_0_8px_var(--primary-container)]" />
            <span className="text-[var(--primary)] font-bold">FOLIO YW-2009</span>
            <span className="text-[var(--outline-variant)]">•</span>
            <span>SECTOR: DEBRE MARKOS · LAKE TANA BASIN</span>
          </div>
          <div className="flex items-center gap-3">
            <span>COORDINATES: 11°56′N 37°18′E</span>
            <span className="text-[var(--outline-variant)]">•</span>
            <span className="text-[var(--secondary)] font-bold">MONASTIC OBSERVATORY: ACTIVE</span>
          </div>
        </div>

        {/* Monumental Bilingual Codex Title Lockup */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm sm:text-base font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፩
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              CANONICAL PROLOGUE · FOLIO 01
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-[var(--on-surface)] font-black leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            ይስማዕከ ወርቁ
          </h1>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-baseline gap-3 sm:gap-4 font-serif text-base sm:text-xl lg:text-2xl text-[var(--secondary)] font-bold tracking-[0.16em] uppercase">
            <span>YISMAKE WORKU</span>
            <span className="text-[var(--outline-variant)] hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[var(--on-surface-variant)] font-normal">
              {lang === 'am' ? 'የኢትዮጵያ ቴክኖ-ልቦለድና አስማታዊ እውነታዊነት ፈር-ቀዳጅ' : 'VISIONARY NOVELIST · PIONEER OF ETHIOPIAN TECHNO-FICTION'}
            </span>
          </div>
        </div>

        {/* Asymmetric Broadside (12-Column Architectural Balance) */}
        <div className="broadside-grid">
          {/* Left Column: Literary Thesis, Verified Milestones, and Relic Action */}
          <div className="space-y-8">
            <div className="border-l-2 border-[var(--primary-container)] pl-5 sm:pl-6 bg-[#0e1a1d]/60 p-4 border-y border-r border-[var(--border-hairline)] shadow-[0_0_24px_-8px_rgba(45,212,191,0.08)]">
              <p className="font-serif text-lg sm:text-xl text-[var(--on-surface)] leading-relaxed font-normal">
                {lang === 'am' ? (
                  <span>
                    ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም። በ22 ዓመቱ በ2001 ዓ.ም ባሳተመው <strong className="text-[var(--primary)] font-bold">«ዴርቶጋዳ»</strong> በተሰኘው ልብ አንጠልጣይ ስራው በአንድ ዓመት ውስጥ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች በመሸጥ የአገሪቱን የመጻሕፍት ገበያ ታሪክ ሰበረ።
                  </span>
                ) : (
                  <span>
                    Where ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind. Emerging at just twenty-two with his 2009 record-breaking techno-thriller <strong className="text-[var(--primary)] font-semibold">“Dertogada”</strong>—selling over 200,000 copies across ten editions in its debut year—Yismake fundamentally transformed Amharic speculative literature.
                  </span>
                )}
              </p>
            </div>

            {/* Archival Milestones Ledger */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-hairline)] font-mono">
              <div className="p-4 bg-[#0e1a1d] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-colors">
                <div className="text-xl sm:text-2xl font-bold text-[var(--secondary)]">
                  {authorData.stats.dertogadaSales.split(' ')[0]}
                </div>
                <div className="text-[10px] text-[var(--outline)] uppercase tracking-wider mt-1">
                  {lang === 'am' ? 'የዴርቶጋዳ ሽያጭ' : 'Dertogada Copies'}
                </div>
              </div>

              <div className="p-4 bg-[#0e1a1d] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-colors">
                <div className="text-xl sm:text-2xl font-bold text-[var(--primary)]">
                  {authorData.stats.booksPublished}
                </div>
                <div className="text-[10px] text-[var(--outline)] uppercase tracking-wider mt-1">
                  {lang === 'am' ? 'የታተሙ መጻሕፍት' : 'Novels & Works'}
                </div>
              </div>

              <div className="p-4 bg-[#0e1a1d] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-colors col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-[var(--secondary-container)]">
                  {authorData.stats.reprintsFirstYear.split(' ')[0]}
                </div>
                <div className="text-[10px] text-[var(--outline)] uppercase tracking-wider mt-1">
                  {lang === 'am' ? 'እትሞች በአንደኛው ዓመት' : 'Editions in Year 1'}
                </div>
              </div>
            </div>

            {/* Primary Relic Actions & Marginal References */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <a href="#universe-section" className="btn-relic">
                <span>{lang === 'am' ? '፩ / የዴርቶጋዳን ዓለም አስስ' : '01 / ENTER THE SAGA'}</span>
                <span>↓</span>
              </a>
              <Link to="/books" className="btn-marginal">
                <span>{lang === 'am' ? 'የተሟላ የመጻሕፍት ማህደር (15+)' : 'COMPLETE CATALOGUE (15+)'}</span>
                <span className="marginal-glyph">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Museum Archival Portrait & Canonical Artifact Fragment */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-6">
            {/* Museum Exhibition Frame for Author Portrait */}
            <div className="archival-plate p-3 bg-[#0e1a1d] max-w-sm w-full border border-[var(--border-hairline)] shadow-[0_0_35px_-8px_rgba(45,212,191,0.15)]">
              <div className="relative overflow-hidden border border-[var(--border-hairline)] aspect-[4/5] bg-black">
                <img
                  src={authorData.portrait}
                  alt="Yismake Worku - Ethiopian Author & Novelist"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 transition-all duration-700 hover:filter-none"
                  loading="eager"
                />

                {/* Museum Specimen Corner Label */}
                <div className="absolute top-2 left-2 bg-[#080f11]/90 border border-[var(--border-hairline)] px-2 py-1 font-mono text-[9px] text-[var(--secondary)] tracking-widest uppercase flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-[var(--primary)]" />
                  <span>SPECIMEN YW-01 · ARCH-ETH-001</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#080f11] via-[#080f11]/85 to-transparent">
                  <div className="font-serif text-sm font-bold text-[var(--on-surface)] tracking-wider">
                    YISMAKE WORKU
                  </div>
                  <div className="font-serif text-xs text-[var(--secondary)]">
                    ደራሲ ይስማዕከ ወርቁ · ደብረ ማርቆስ
                  </div>
                </div>
              </div>

              {/* Archival Provenance Caption */}
              <div className="mt-3 px-1 py-1 flex items-center justify-between text-[10px] font-mono text-[var(--outline)] border-t border-[var(--border-hairline)]">
                <span>PROVENANCE: AUTHOR ARCHIVE</span>
                <span className="text-[var(--primary)]">DEBRE MARKOS UNIV.</span>
              </div>
            </div>

            {/* Dertogada Canonical Codex Callout */}
            {dertogadaBook && (
              <div className="max-w-sm w-full p-4 bg-[#0e1a1d] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-all shadow-[0_0_20px_-6px_rgba(45,212,191,0.1)]">
                <div className="flex items-start justify-between gap-3 mb-2 font-mono text-[9px] uppercase tracking-widest text-[var(--outline)]">
                  <span className="text-[var(--secondary)] font-bold">CANONICAL GENESIS</span>
                  <span>2009 G.C. · 2001 ዓ.ም.</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[var(--on-surface)]">
                  {dertogadaBook.titleAm} <span className="font-serif text-xs text-[var(--secondary)] font-normal">({dertogadaBook.titleEn})</span>
                </h4>
                <p className="font-serif text-xs text-[var(--on-surface-variant)] line-clamp-2 mt-1.5 leading-relaxed">
                  {lang === 'am' ? dertogadaBook.tagline.am : dertogadaBook.tagline.en}
                </p>
                <div className="mt-3 pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[var(--primary)] font-bold">200,000+ COPIES PRINTED</span>
                  <Link to={`/books/${dertogadaBook.slug}`} className="btn-marginal text-[10px]">
                    <span>{lang === 'am' ? 'ሙሉ ማህደር' : 'VIEW DOSSIER'}</span>
                    <span className="marginal-glyph">→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
