import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { authorData, verifiedBooks } from '../data/yismakeData';
import BookCover from './BookCover';

export default function AuthorHero() {
  const { lang } = useLanguage();
  const dertogadaBook = verifiedBooks.find((b) => b.slug === 'dertogada');

  return (
    <section className="relative min-h-[92vh] pt-32 sm:pt-36 pb-20 sm:pb-24 border-b border-[var(--rule-line)] overflow-hidden">
      {/* Background Subtle Manuscript Drafting Grid */}
      <div className="absolute inset-0 manuscript-grid opacity-30 pointer-events-none" />

      {/* Atmospheric Lake Tana & Ink Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--tana-deep)] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[var(--rubric-red)] opacity-10 blur-[140px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Top Archival Metadata Header */}
        <div className="pb-4 mb-8 sm:mb-12 border-b border-[var(--rule-line-subtle)] flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] text-[var(--text-muted)] tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="text-[var(--highland-gold)]">FOLIO YW-2009</span>
            <span>•</span>
            <span>SECTOR: DEBRE MARKOS · LAKE TANA BASIN</span>
          </div>
          <div className="flex items-center gap-3">
            <span>COORDINATES: 11°56′N 37°18′E</span>
            <span>•</span>
            <span className="text-[var(--rubric-bright)]">MONASTIC ARCHIVE: ACTIVE</span>
          </div>
        </div>

        {/* Monumental Amharic Title & Architectural English Display */}
        <div className="mb-10 sm:mb-14">
          <div className="chapter-numeral">
            <span>01 / ARCHIVAL PROLOGUE</span>
          </div>

          <h1 className="monument-title-am text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-[var(--text-vellum)]">
            ይስማዕከ ወርቁ
          </h1>

          <div className="mt-2 sm:mt-3 flex flex-wrap items-baseline gap-3 sm:gap-4 font-['Cinzel'] text-sm sm:text-xl lg:text-2xl text-[var(--highland-gold)] font-bold tracking-[0.18em] uppercase">
            <span>YISMAKE WORKU</span>
            <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[var(--text-stone)] font-normal">
              {lang === 'am' ? 'የኢትዮጵያ ቴክኖ-ልቦለድና አስማታዊ እውነታዊነት ፈር-ቀዳጅ' : 'VISIONARY NOVELIST · PIONEER OF ETHIOPIAN TECHNO-FICTION'}
            </span>
          </div>
        </div>

        {/* Asymmetric Broadside: Premise & Metrics (Left) vs Archival Museum Portrait (Right) */}
        <div className="broadside-grid">
          {/* Left Column: Literary Thesis, Verified Milestones, and Editorial Directive */}
          <div className="space-y-8">
            <div className="border-l-2 border-[var(--highland-gold)] pl-5 sm:pl-6">
              <p className="font-serif-ethiopic text-lg sm:text-xl text-[var(--text-vellum-soft)] leading-relaxed font-normal">
                {lang === 'am' ? (
                  <span>
                    ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም። በ22 ዓመቱ በ2001 ዓ.ም ባሳተመው <strong className="text-[var(--text-vellum)] font-bold">«ዴርቶጋዳ»</strong> በተሰኘው ልብ አንጠልጣይ ስራው በአንድ ዓመት ውስጥ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች በመሸጥ የአገሪቱን የመጻሕፍት ገበያ ታሪክ ሰበረ።
                  </span>
                ) : (
                  <span>
                    Where ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind. Emerging at just twenty-two with his 2009 record-breaking techno-thriller <strong className="text-[var(--text-vellum)] font-semibold">“Dertogada”</strong>—selling over 200,000 copies across ten editions in its debut year—Yismake fundamentally transformed Amharic speculative literature.
                  </span>
                )}
              </p>
            </div>

            {/* Archival Milestones Ledger */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--rule-line-subtle)] font-mono">
              <div className="p-3.5 bg-[var(--ink-surface)] border border-[var(--rule-line)]">
                <div className="text-xl sm:text-2xl font-bold text-[var(--highland-gold)]">
                  {authorData.stats.dertogadaSales.split(' ')[0]}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  {lang === 'am' ? 'የዴርቶጋዳ ሽያጭ' : 'Dertogada Copies'}
                </div>
              </div>

              <div className="p-3.5 bg-[var(--ink-surface)] border border-[var(--rule-line)]">
                <div className="text-xl sm:text-2xl font-bold text-[var(--text-vellum)]">
                  {authorData.stats.booksPublished}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  {lang === 'am' ? 'የታተሙ መጻሕፍት' : 'Novels & Works'}
                </div>
              </div>

              <div className="p-3.5 bg-[var(--ink-surface)] border border-[var(--rule-line)] col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-bold text-[var(--rubric-bright)]">
                  {authorData.stats.reprintsFirstYear.split(' ')[0]}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  {lang === 'am' ? 'እትሞች በአንደኛው ዓመት' : 'Editions in Year 1'}
                </div>
              </div>
            </div>

            {/* Restrained Editorial Directives */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a href="#universe-section" className="btn-folio">
                <span>{lang === 'am' ? '01 / የዴርቶጋዳን ዓለም አስስ' : '01 / ENTER THE SAGA'}</span>
                <span>↓</span>
              </a>
              <Link to="/books" className="btn-ghost-archival">
                <span>{lang === 'am' ? 'የመጻሕፍት ማህደር (15+)' : 'COMPLETE CATALOGUE (15+)'}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Museum Archival Portrait & Canonical Artifact Fragment */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-6">
            {/* Museum Exhibition Frame for Author Portrait */}
            <div className="archival-plate archival-plate-framed p-3 bg-[var(--ink-surface)] max-w-sm w-full">
              <div className="relative overflow-hidden border border-[var(--rule-line)] aspect-[4/5] bg-black">
                <img
                  src={authorData.portrait}
                  alt="Yismake Worku - Ethiopian Author & Novelist"
                  className="w-full h-full object-cover object-center filter grayscale contrast-105 transition-all duration-700 hover:filter-none"
                  loading="eager"
                />

                {/* Museum Specimen Corner Label */}
                <div className="absolute top-2 left-2 bg-[#0a0c0f]/90 border border-[var(--rule-line)] px-2 py-1 font-mono text-[9px] text-[var(--highland-gold)] tracking-widest uppercase">
                  SPECIMEN YW-01
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/80 to-transparent">
                  <div className="font-['Cinzel'] text-xs font-bold text-[var(--text-vellum)] tracking-widest">
                    YISMAKE WORKU
                  </div>
                  <div className="font-serif-ethiopic text-[11px] text-[var(--highland-gold)]">
                    ደራሲ ይስማዕከ ወርቁ · ደብረ ማርቆስ
                  </div>
                </div>
              </div>

              {/* Archival Provenance Caption */}
              <div className="mt-3 px-1 py-1 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] border-t border-[var(--rule-line-subtle)]">
                <span>PHOTO: AUTHOR ARCHIVE</span>
                <span>DEBRE MARKOS UNIV.</span>
              </div>
            </div>

            {/* Dertogada Canonical Codex Callout */}
            {dertogadaBook && (
              <div className="max-w-sm w-full p-4 bg-[var(--ink-surface)] border border-[var(--rule-line-subtle)] hover:border-[var(--rule-line)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-16">
                    <BookCover book={dertogadaBook} size="small" showSpine={false} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[var(--highland-gold)] uppercase tracking-widest">
                      CANONICAL GENESIS (2009)
                    </span>
                    <h4 className="font-serif-ethiopic text-sm font-bold text-[var(--text-vellum)] mt-0.5">
                      {dertogadaBook.titleAm}
                    </h4>
                    <p className="font-serif-ethiopic text-[11px] text-[var(--text-stone)] line-clamp-2 mt-1">
                      {lang === 'am' ? dertogadaBook.tagline.am : dertogadaBook.tagline.en}
                    </p>
                    <Link to={`/books/${dertogadaBook.slug}`} className="btn-link-editorial text-[10px] mt-2 inline-flex">
                      <span>{lang === 'am' ? 'ሙሉ ማህደር' : 'VIEW DOSSIER'}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
