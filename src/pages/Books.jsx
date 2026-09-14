import React, { useState, useMemo } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCard from '../components/BookCard';
import BookCover from '../components/BookCover';
import { Link } from 'react-router-dom';

export default function Books() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [selectedLang, setSelectedLang] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // chronological or desc
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
          if (selectedGenre === 'philosophy' && !book.genre.includes('Philosophical') && !book.genre.includes('Quest')) return false;
          if (selectedGenre === 'poetry' && !book.genre.includes('Poetry') && !book.genre.includes('Non-Fiction')) return false;
        }

        // Series filter
        if (selectedSeries !== 'all') {
          if (selectedSeries === 'dertogada' && !book.series?.includes('Dertogada')) return false;
          if (selectedSeries === 'standalone' && book.series?.includes('Dertogada')) return false;
        }

        // Language filter
        if (selectedLang === 'translated' && !book.translator) return false;

        return true;
      })
      .sort((a, b) => {
        return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
      });
  }, [searchQuery, selectedGenre, selectedSeries, selectedLang, sortOrder]);

  return (
    <main className="pt-28 pb-20 bg-[#080b11] text-[#f6f0e2]">
      {/* Header */}
      <section className="relative py-14 sm:py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase mb-3">
            <span>❖ {lang === 'am' ? 'የተሟላ የመጻሕፍት ማህደር' : 'VERIFIED COMPLETE BIBLIOGRAPHY'} ❖</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Cinzel'] tracking-tight">
            THE LITERARY <span className="text-gradient-gold">LIBRARY</span>
            <span className="block text-2xl sm:text-4xl font-['Noto_Serif_Ethiopic'] text-[#ebe4d3] font-bold mt-2">
              የመጻሕፍት ሙሉ ዝርዝር
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#9aa5b8] font-['Noto_Serif_Ethiopic'] leading-relaxed">
            {lang === 'am'
              ? "ከ2000 ዓ.ም የወንድ ምጥ ጀምሮ እስከ ዴርቶጋዳ፣ ራማቶሓራ፣ ክቡር ድንጋይ፣ ዛምራ እና ሌሎችም ድረስ የታተሙ 15+ የተረጋገጡ ሥራዎች።"
              : "Explore the verified catalog of 15+ published works by Yismake Worku, spanning groundbreaking Afrofuturist techno-thrillers, philosophical satire, and poetry."}
          </p>
        </div>
      </section>

      {/* Filter & Control Bar */}
      <section className="sticky top-[69px] z-30 bg-[#0c111c]/95 backdrop-blur-md border-b border-white/10 py-4">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={lang === 'am' ? 'በርዕስ፣ በጭብጥ ወይም በዓይነት ፈልግ...' : 'Search by title (English/Amharic), theme, genre...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-lg bg-black/50 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#00f0ff] transition-all font-['Noto_Serif_Ethiopic']"
              />
              <svg
                className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Toggles */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              {/* Genre Filter */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white/80 focus:border-[#00f0ff] focus:outline-none cursor-pointer"
              >
                <option value="all">{lang === 'am' ? 'ሁሉም ዘውጎች' : 'All Genres'}</option>
                <option value="scifi">{lang === 'am' ? 'ሳይንስና ቴክኖ-ልቦለድ' : 'Sci-Fi & Techno-Thriller'}</option>
                <option value="satire">{lang === 'am' ? 'አስማታዊ እውነታዊነትና ምጸት' : 'Magical Realism & Satire'}</option>
                <option value="philosophy">{lang === 'am' ? 'ፍልስፍናና ስነ-ልቦና' : 'Philosophy & Drama'}</option>
                <option value="poetry">{lang === 'am' ? 'ግጥምና ኢ-ልቦለድ' : 'Poetry & Non-Fiction'}</option>
              </select>

              {/* Series Filter */}
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white/80 focus:border-[#00f0ff] focus:outline-none cursor-pointer"
              >
                <option value="all">{lang === 'am' ? 'ሁሉም ተከታታዮች' : 'All Series'}</option>
                <option value="dertogada">{lang === 'am' ? 'የዴርቶጋዳ ዓለም (5 መጻሕፍት)' : 'Dertogada Saga (5 Books)'}</option>
                <option value="standalone">{lang === 'am' ? 'ነጠላ ልቦለዶች' : 'Standalone Masterpieces'}</option>
              </select>

              {/* Translation Filter */}
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white/80 focus:border-[#00f0ff] focus:outline-none cursor-pointer"
              >
                <option value="all">{lang === 'am' ? 'ሁሉም ቋንቋዎች' : 'All Editions'}</option>
                <option value="translated">{lang === 'am' ? 'የእንግሊዝኛ ትርጉም ያላቸው' : 'English Translations Available'}</option>
              </select>

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                className="px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white/80 hover:text-white flex items-center gap-1.5 cursor-pointer"
                title="Sort by publication date"
              >
                <span>{sortOrder === 'asc' ? '▲ Chronological' : '▼ Newest First'}</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-white/15 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-white/15 text-[#00f0ff]' : 'text-white/40 hover:text-white'}`}
                  title="Grid View"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-white/15 text-[#00f0ff]' : 'text-white/40 hover:text-white'}`}
                  title="List View"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Counter */}
          <div className="mt-3 text-xs text-white/50 font-mono flex items-center justify-between">
            <span>
              {lang === 'am' ? `የተገኙ መጻሕፍት: ${filteredBooks.length}` : `Showing ${filteredBooks.length} verified titles`}
            </span>
            {(searchQuery || selectedGenre !== 'all' || selectedSeries !== 'all' || selectedLang !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('all');
                  setSelectedSeries('all');
                  setSelectedLang('all');
                }}
                className="text-[#00f0ff] hover:underline cursor-pointer"
              >
                {lang === 'am' ? 'ማጣሪያዎችን አጽዳ' : 'Reset all filters'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Catalog Display */}
      <section className="section-padding">
        <div className="site-container">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-24 glass-panel max-w-lg mx-auto p-8">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-white font-['Cinzel']">
                {lang === 'am' ? 'ምንም መጽሐፍ አልተገኘም' : 'No Books Match Criteria'}
              </h3>
              <p className="mt-2 text-sm text-[#9aa5b8]">
                {lang === 'am' ? 'እባክዎ የፍለጋ ቃሉን ወይም ማጣሪያዎችን ይቀይሩ።' : 'Try broadening your search term or resetting the filters.'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="glass-panel p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:border-cyan-500/30 transition-all"
                >
                  <Link to={`/books/${book.slug}`} className="shrink-0">
                    <BookCover book={book} size="small" />
                  </Link>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="badge badge-gold font-mono text-xs">
                        {book.year} G.C. ({book.yearEc} ዓ.ም.)
                      </span>
                      <span className="badge badge-outline font-mono text-xs">
                        {book.genre}
                      </span>
                      {book.seriesOrder && (
                        <span className="badge badge-cyan font-mono text-xs">
                          {book.series} · Part {book.seriesOrder}
                        </span>
                      )}
                      {book.translator && (
                        <span className="badge badge-crimson font-mono text-xs">
                          Translated by {book.translator.split(' ')[0]} {book.translator.split(' ')[1]}
                        </span>
                      )}
                    </div>

                    <Link to={`/books/${book.slug}`} className="block group">
                      <h3 className="text-2xl font-bold text-white font-['Noto_Serif_Ethiopic'] group-hover:text-[#00f0ff] transition-colors">
                        {book.titleAm}
                        <span className="ml-2 text-base font-light text-[#d4af37] font-['Cinzel'] uppercase">
                          ({book.titleEn})
                        </span>
                      </h3>
                    </Link>

                    <p className="mt-2 text-sm text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] leading-relaxed">
                      {lang === 'am' ? book.description.am : book.description.en}
                    </p>

                    <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                      <Link to={`/books/${book.slug}`} className="btn-cyan text-xs">
                        <span>{lang === 'am' ? 'ዝርዝር መረጃ' : 'View Dossier'}</span>
                        <span>→</span>
                      </Link>
                      {book.purchaseLinks?.[0] && (
                        <a
                          href={book.purchaseLinks[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs"
                        >
                          {lang === 'am' ? 'መጽሐፉን ያግኙ' : 'Purchase / Read'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
