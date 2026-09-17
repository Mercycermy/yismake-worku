import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import DertogadaUniverseMap from '../components/DertogadaUniverseMap';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';

export default function Universe() {
  const { lang } = useLanguage();

  const universeBooks = verifiedBooks
    .filter((b) => b.series?.includes('Dertogada'))
    .sort((a, b) => a.seriesOrder - b.seriesOrder);

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
  const geezNumerals = ['፩', '፪', '፫', '፬', '፭'];

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0d1517] text-[var(--on-surface)]">
      {/* Archival Universe Header */}
      <section className="pb-16 border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፪
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              THE CANONICAL STORYWORLD
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            የዴርቶጋዳ ዓለም
          </h1>

          <div className="font-serif text-xs sm:text-sm text-[var(--secondary)] font-bold tracking-[0.2em] uppercase mt-2">
            THE DERTOGADA PENTOLOGY & SUBTERRANEAN SAGA (2009–2016)
          </div>

          <div className="mt-4 pb-4 border-b border-[var(--border-hairline)] flex flex-wrap items-center gap-4 font-mono text-[11px] text-[var(--outline)] uppercase tracking-widest">
            <span>SECTOR: LAKE TANA MONASTIC BASIN</span>
            <span>•</span>
            <span>COORDINATES: 11°56′N 37°18′E</span>
            <span>•</span>
            <span className="text-[var(--primary)] font-bold">5 CONNECTED VOLUMES</span>
          </div>

          <p className="mt-6 max-w-3xl font-serif text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed">
            {lang === 'am'
              ? "የኢትዮጵያን ዘመናዊ ስነ-ጽሁፍ የቀየረው ባለ 5 ቅጽ የሳይንስና የስለላ ልቦለድ ድንቅ ስራ። በጣና ሐይቅ የደሴት ገዳማት ሥር ከተሰወረ የጠፈርና የቴክኖሎጂ የምርምር ማዕከል እስከ ዓለም አቀፍ የስለላ መረቦች ድረስ የተዘረጋው የይስማዕከ ወርቁ አይበገሬ የሉዓላዊነትና የዕውቀት ትግል ትረካ።"
              : "A monumental milestone in contemporary African speculative fiction. Centered on a clandestine consortium of patriotic Ethiopian scholars operating from a subterranean laboratory beneath ancient Lake Tana, defying international intelligence cartels (CIA, Mossad) to revive indigenous technological sovereignty."}
          </p>
        </div>
      </section>

      {/* The Manuscript Constellation & Character Dossiers */}
      <DertogadaUniverseMap />

      {/* In-Depth Pentology Chronological Archive */}
      <section className="site-container py-16">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)]">ቅጾች</span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              CANONICAL CHRONOLOGY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--on-surface)] font-bold">
            አምስቱ ተከታታይ ቅጾች
          </h2>
          <div className="font-serif text-xs text-[var(--secondary)] uppercase tracking-widest mt-1">
            THE COMPLETE 5-BOOK SAGA IN READING ORDER
          </div>
        </div>

        <div className="space-y-12">
          {universeBooks.map((book, idx) => (
            <article
              key={book.id}
              className="archival-plate p-6 sm:p-10 bg-[#0e1a1d] border border-[var(--border-hairline)] shadow-[0_0_35px_-8px_rgba(45,212,191,0.12)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Book Cover */}
                <div className="lg:col-span-4 flex justify-center">
                  <Link to={`/books/${book.slug}`} className="block group">
                    <BookCover book={book} size="normal" />
                  </Link>
                </div>

                {/* Dossier Content */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
                    <span className="catalog-tag">
                      <span className="catalog-indicator-emerald" />
                      {geezNumerals[idx]} · PART 0{book.seriesOrder} (CHRONICLE {romanNumerals[idx]})
                    </span>
                    <span className="catalog-tag">
                      {book.year} G.C. · {book.yearEc} ዓ.ም.
                    </span>
                    {book.pageCount && (
                      <span className="catalog-tag">
                        {book.pageCount} PAGES
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--on-surface)]">
                      {book.titleAm}
                    </h3>
                    <div className="font-serif text-sm font-semibold text-[var(--secondary)] uppercase tracking-widest mt-0.5">
                      {book.titleEn}
                    </div>
                  </div>

                  <div className="border-l-2 border-[var(--primary-container)] pl-4 py-1 font-serif italic text-sm text-[var(--on-surface)] bg-[#132427]/40">
                    "{lang === 'am' ? book.tagline?.am : book.tagline?.en}"
                  </div>

                  <p className="font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
                    {lang === 'am' ? book.description?.am : book.description?.en}
                  </p>

                  {/* Themes */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(lang === 'am' ? book.themesAm : book.themes)?.map((theme, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-serif bg-[#080f11] border border-[var(--border-hairline)] text-[var(--on-surface-variant)]"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4 font-mono text-xs">
                    <Link to={`/books/${book.slug}`} className="btn-relic text-xs">
                      <span>{lang === 'am' ? 'ሙሉ ዝርዝር' : 'READ DOSSIER'}</span>
                      <span>→</span>
                    </Link>
                    {book.purchaseLinks?.[0] && (
                      <a
                        href={book.purchaseLinks[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-marginal text-xs"
                      >
                        <span>FIND COPY</span>
                        <span className="marginal-glyph">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
