import React, { useState, useMemo } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCard from '../components/BookCard';
import ModalInspectionFolio from '../components/ModalInspectionFolio';

export default function Books() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // chronological
  const [inspectionBook, setInspectionBook] = useState(null);

  const filteredBooks = useMemo(() => {
    return verifiedBooks
      .filter((book) => {
        // Search query in Amharic, English, themes, or tagline
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchAm = book.titleAm.toLowerCase().includes(q);
          const matchEn = book.titleEn.toLowerCase().includes(q);
          const matchGenre = book.genre?.toLowerCase().includes(q);
          const matchDesc = book.description?.en?.toLowerCase().includes(q);
          if (!matchAm && !matchEn && !matchGenre && !matchDesc) return false;
        }

        // Genre filter
        if (selectedGenre !== 'all') {
          if (selectedGenre === 'scifi' && !book.genre?.includes('Science') && !book.genre?.includes('Techno')) return false;
          if (selectedGenre === 'satire' && !book.genre?.includes('Satire') && !book.genre?.includes('Magical')) return false;
          if (selectedGenre === 'philosophy' && !book.genre?.includes('Philosophical') && !book.genre?.includes('Quest') && !book.genre?.includes('Psychological')) return false;
          if (selectedGenre === 'poetry' && !book.genre?.includes('Poetry') && !book.genre?.includes('Non-Fiction')) return false;
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
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0d1517] text-[var(--on-surface)]">
      {/* Archival Catalog Header */}
      <section className="pb-12 border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፩
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              REPOSITORY CATALOGUE
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            የተሟላ የመጻሕፍት ማህደር
          </h1>

          <div className="font-serif text-xs sm:text-sm text-[var(--secondary)] font-bold tracking-[0.2em] uppercase mt-2">
            THE VERIFIED BIBLIOGRAPHY OF YISMAKE WORKU (15+ WORKS)
          </div>

          <p className="mt-4 max-w-2xl font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
            {lang === 'am'
              ? "ከ2000 ዓ.ም የመጀመሪያ የግጥም መድበል 'የወንድ ምጥ' ጀምሮ፤ የአገሪቱን ገበያ ታሪክ የሰበረው ባለ 5 ቅጽ 'ዴርቶጋዳ' ተከታታይ፤ በእንግሊዝ አገር ለሽልማት እጩ የሆነው 'ክቡር ድንጋይ' እና ማህበራዊ ኢ-ልቦለዶች የተካተቱበት የተረጋገጠ ማህደር።"
              : "Spanning groundbreaking speculative techno-fiction, satirical magical realism, and social non-fiction published between 2008 and present."}
          </p>
        </div>
      </section>

      {/* Catalog Search & Filtering Rail (Inverted Baseline & Sharp Chips) */}
      <section className="sticky top-[61px] sm:top-[73px] z-30 bg-[#0d1517]/95 backdrop-blur-md border-b border-[var(--border-hairline)] py-4">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Inverted Baseline Search Input with § Taxonomic Symbol */}
            <div className="archival-input-wrap max-w-md">
              <span className="archival-input-taxonomic">§</span>
              <input
                type="text"
                placeholder={lang === 'am' ? 'በርዕስ፣ በጭብጥ ወይም በቁልፍ ቃል ፈልግ...' : 'Search by title, theme, taxonomy...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="archival-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--outline)] hover:text-[var(--on-surface)] cursor-pointer"
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
                    ? 'border-[var(--primary-container)] bg-[#132427] text-[var(--primary)] font-bold shadow-[0_0_12px_-2px_rgba(45,212,191,0.3)]'
                    : 'border-[var(--border-hairline)] bg-[#0e1a1d] text-[var(--outline)] hover:text-[var(--on-surface)]'
                }`}
              >
                {lang === 'am' ? 'ሁሉም (15+)' : 'ALL (15+)'}
              </button>

              <button
                onClick={() => setSelectedSeries('dertogada')}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedSeries === 'dertogada'
                    ? 'border-[var(--primary-container)] bg-[#132427] text-[var(--primary)] font-bold shadow-[0_0_12px_-2px_rgba(45,212,191,0.3)]'
                    : 'border-[var(--border-hairline)] bg-[#0e1a1d] text-[var(--outline)] hover:text-[var(--on-surface)]'
                }`}
              >
                {lang === 'am' ? 'ዴርቶጋዳ (5)' : 'DERTOGADA SAGA (5)'}
              </button>

              <button
                onClick={() => setSelectedSeries('standalone')}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedSeries === 'standalone'
                    ? 'border-[var(--primary-container)] bg-[#132427] text-[var(--primary)] font-bold shadow-[0_0_12px_-2px_rgba(45,212,191,0.3)]'
                    : 'border-[var(--border-hairline)] bg-[#0e1a1d] text-[var(--outline)] hover:text-[var(--on-surface)]'
                }`}
              >
                {lang === 'am' ? 'ራሳቸውን የቻሉ' : 'STANDALONE'}
              </button>

              <button
                onClick={() => setSelectedSeries('translated')}
                className={`px-3 py-1.5 border transition-all cursor-pointer ${
                  selectedSeries === 'translated'
                    ? 'border-red-500 bg-[#300d11] text-[#fca5a5] font-bold'
                    : 'border-[var(--border-hairline)] bg-[#0e1a1d] text-[var(--outline)] hover:text-[var(--on-surface)]'
                }`}
              >
                {lang === 'am' ? 'የተተረጎሙ' : 'EN TRANSLATED'}
              </button>

              {/* Chronological Sort Toggle */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-1.5 border border-[var(--border-hairline)] bg-[#0e1a1d] text-[var(--secondary)] hover:border-[var(--secondary)] transition-all cursor-pointer flex items-center gap-1.5"
                title="Toggle Chronological Order"
              >
                <span>{sortOrder === 'asc' ? 'CHRONO: 2008 → 2024' : 'CHRONO: 2024 → 2008'}</span>
                <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid View */}
      <section className="site-container py-12">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 p-8 archival-plate max-w-lg mx-auto bg-[#0e1a1d] border border-[var(--border-hairline)]">
            <div className="font-mono text-xs text-[var(--secondary)] uppercase tracking-widest mb-3">
              NO FOLIOS FOUND
            </div>
            <h3 className="font-serif text-2xl font-bold mb-2">ምንም የተገኘ መጽሐፍ የለም</h3>
            <p className="font-serif text-sm text-[var(--on-surface-variant)] mb-6">
              No works matched your search query or filter selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
                setSelectedSeries('all');
              }}
              className="btn-relic text-xs"
            >
              RESET CATALOG FILTERS
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between font-mono text-xs text-[var(--outline)] mb-6 pb-2 border-b border-[var(--border-hairline)]">
              <span>ACTIVE RESULTS: {filteredBooks.length} VOLUMES</span>
              <span>VERIFIED ETHIOPIAN REPOSITORY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onInspect={(b) => setInspectionBook(b)}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Modal Inspection Folio Component */}
      <ModalInspectionFolio
        book={inspectionBook}
        isOpen={Boolean(inspectionBook)}
        onClose={() => setInspectionBook(null)}
      />
    </main>
  );
}
