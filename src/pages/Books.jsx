import React, { useState, useMemo } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCard from '../components/BookCard';

export default function Books() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // chronological

  const filteredBooks = useMemo(() => {
    return verifiedBooks
      .filter((book) => {
        // Search query in Amharic, English, themes, or tagline
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchAm = book.titleAm.toLowerCase().includes(q);
          const matchEn = book.titleEn.toLowerCase().includes(q);
          const matchGenre = book.genre.toLowerCase().includes(q);
          const matchDesc = book.description.en.toLowerCase().includes(q);
          if (!matchAm && !matchEn && !matchGenre && !matchDesc) return false;
        }

        // Genre filter
        if (selectedGenre !== 'all') {
          if (selectedGenre === 'scifi' && !book.genre.includes('Science') && !book.genre.includes('Techno')) return false;
          if (selectedGenre === 'satire' && !book.genre.includes('Satire') && !book.genre.includes('Magical')) return false;
          if (selectedGenre === 'philosophy' && !book.genre.includes('Philosophical') && !book.genre.includes('Quest') && !book.genre.includes('Psychological')) return false;
          if (selectedGenre === 'poetry' && !book.genre.includes('Poetry') && !book.genre.includes('Non-Fiction')) return false;
        }

        // Series filter
        if (selectedSeries !== 'all') {
          if (selectedSeries === 'dertogada' && !book.series?.includes('Dertogada')) return false;
          if (selectedSeries === 'standalone' && book.series?.includes('Dertogada')) return false;
          if (selectedSeries === 'translated' && !book.translator) return false;
        }

        return true;
      })
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
      });
  }, [searchQuery, selectedGenre, selectedSeries, sortOrder]);

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0a0c0f] text-[var(--text-vellum)]">
      {/* Archival Catalog Header */}
      <section className="pb-12 border-b border-[var(--rule-line)]">
        <div className="site-container">
          <div className="chapter-numeral">
            <span>REPOSITORY CATALOGUE</span>
          </div>

          <h1 className="monument-title-am text-4xl sm:text-6xl lg:text-7xl text-[var(--text-vellum)]">
            የተሟላ የመጻሕፍት ማህደር
          </h1>

          <div className="font-['Cinzel'] text-xs sm:text-sm text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mt-2">
            THE VERIFIED BIBLIOGRAPHY OF YISMAKE WORKU (15+ WORKS)
          </div>

          <p className="mt-4 max-w-2xl font-serif-ethiopic text-sm sm:text-base text-[var(--text-stone)] leading-relaxed">
            {lang === 'am'
              ? "ከ2000 ዓ.ም የመጀመሪያ የግጥም መድበል 'የወንድ ምጥ' ጀምሮ፤ የአገሪቱን ገበያ ታሪክ የሰበረው ባለ 5 ቅጽ 'ዴርቶጋዳ' ተከታታይ፤ በእንግሊዝ አገር ለሽልማት እጩ የሆነው 'ክቡር ድንጋይ' እና ማህበራዊ ኢ-ልቦለዶች የተካተቱበት የተረጋገጠ ማህደር።"
              : "Spanning groundbreaking speculative techno-fiction, satirical magical realism, and social non-fiction published between 2008 and present."}
          </p>
        </div>
      </section>

      {/* Catalog Search & Filtering Rail */}
      <section className="sticky top-[61px] sm:top-[73px] z-30 bg-[#0a0c0f]/95 backdrop-blur-sm border-b border-[var(--rule-line)] py-4">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={lang === 'am' ? 'በርዕስ፣ በጭብጥ ወይም በዓይነት ፈልግ...' : 'Search by title, theme, keyword...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--ink-surface)] border border-[var(--rule-line)] text-xs text-[var(--text-vellum)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--highland-gold)] font-mono transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-vellum)]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs & Chronology */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {/* Series Filter */}
              <button
                onClick={() => setSelectedSeries('all')}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedSeries === 'all'
                    ? 'border-[var(--highland-gold)] bg-[var(--highland-gold)] text-[var(--ink-base)] font-bold'
                    : 'border-[var(--rule-line)] text-[var(--text-stone)] hover:text-[var(--text-vellum)]'
                }`}
              >
                {lang === 'am' ? 'ሁሉም (15+)' : 'ALL (15+)'}
              </button>

              <button
                onClick={() => setSelectedSeries('dertogada')}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedSeries === 'dertogada'
                    ? 'border-[var(--highland-gold)] bg-[var(--highland-gold)] text-[var(--ink-base)] font-bold'
                    : 'border-[var(--rule-line)] text-[var(--text-stone)] hover:text-[var(--text-vellum)]'
                }`}
              >
                {lang === 'am' ? 'የዴርቶጋዳ ተከታታይ (5)' : 'DERTOGADA SAGA (5)'}
              </button>

              <button
                onClick={() => setSelectedSeries('standalone')}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedSeries === 'standalone'
                    ? 'border-[var(--highland-gold)] bg-[var(--highland-gold)] text-[var(--ink-base)] font-bold'
                    : 'border-[var(--rule-line)] text-[var(--text-stone)] hover:text-[var(--text-vellum)]'
                }`}
              >
                {lang === 'am' ? 'ራሳቸውን የቻሉ' : 'STANDALONE'}
              </button>

              <button
                onClick={() => setSelectedSeries('translated')}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedSeries === 'translated'
                    ? 'border-[var(--rubric-bright)] bg-[var(--rubric-red)] text-[var(--text-vellum)] font-bold'
                    : 'border-[var(--rule-line)] text-[var(--text-stone)] hover:text-[var(--text-vellum)]'
                }`}
              >
                {lang === 'am' ? 'የተተረጎሙ' : 'EN TRANSLATED'}
              </button>

              {/* Sort Order Toggle */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="ml-auto lg:ml-2 px-3 py-1.5 border border-[var(--rule-line)] hover:border-[var(--highland-gold)] text-[var(--text-stone)] text-xs cursor-pointer"
                title="Toggle Chronological Order"
              >
                <span>{sortOrder === 'asc' ? '1980s → 2020s ↑' : '2020s → 1980s ↓'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="site-container py-12">
        {filteredBooks.length === 0 ? (
          <div className="archival-plate p-12 text-center max-w-lg mx-auto">
            <div className="font-mono text-xs text-[var(--highland-gold)] uppercase tracking-widest mb-2">
              NO RECORDS MATCHED
            </div>
            <p className="font-serif-ethiopic text-sm text-[var(--text-stone)]">
              {lang === 'am' ? 'ለፍለጋዎ የተገኘ መጽሐፍ የለም። እባክዎ ሌላ ቃል ይሞክሩ።' : 'No volumes match your active criteria. Please adjust filters or search terms.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedSeries('all'); setSelectedGenre('all'); }}
              className="btn-folio text-xs mt-6"
            >
              RESET CATALOGUE FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
