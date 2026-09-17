import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { dertogadaUniverseLore, verifiedBooks } from '../data/yismakeData';
import BookCover from './BookCover';
import ModalInspectionFolio from './ModalInspectionFolio';

export default function DertogadaUniverseMap() {
  const { lang } = useLanguage();
  const [selectedBookSlug, setSelectedBookSlug] = useState('dertogada');
  const [selectedCharId, setSelectedCharId] = useState('shagiz');
  const [inspectionBook, setInspectionBook] = useState(null);

  const selectedBook = verifiedBooks.find((b) => b.slug === selectedBookSlug) || verifiedBooks[0];
  const selectedChar = dertogadaUniverseLore.characters.find((c) => c.id === selectedCharId) || dertogadaUniverseLore.characters[0];

  const geezNumerals = ['፩', '፪', '፫', '፬', '፭'];

  return (
    <section id="universe-section" className="py-20 sm:py-24 bg-[#0d1517] border-b border-[var(--border-hairline)] relative overflow-hidden">
      {/* Background Subtle Starfield / Constellation Filaments */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f6b6b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header: Bilingual Codex Lockup */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፪
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              CONSTELLATION MAP READER · THE STORYWORLD
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            የዴርቶጋዳ ዓለም
          </h2>

          <div className="font-serif text-sm sm:text-lg text-[var(--secondary)] font-bold tracking-[0.16em] uppercase mt-2">
            THE DERTOGADA PENTOLOGY · SUBTERRANEAN SAGA (2009–2016)
          </div>

          <p className="mt-4 font-serif text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed">
            {lang === 'am' ? dertogadaUniverseLore.description.am : dertogadaUniverseLore.description.en}
          </p>
        </div>

        {/* Constellation Map Reader Viewport (Vector Filaments & Glowing Nodes) */}
        <div className="mb-14 p-6 sm:p-8 bg-[#0b1315] border border-[var(--border-hairline)] shadow-[0_0_35px_-10px_rgba(45,212,191,0.15)] relative">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border-hairline)] font-mono text-[11px] text-[var(--outline)] tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[var(--primary-container)] shadow-[0_0_8px_var(--primary-container)]" />
              <span>CONSTELLATION GRAPH: 5 CANONICAL VOLUMES</span>
            </div>
            <span className="text-[var(--primary)] font-bold">LAKE TANA MONASTIC BASIN</span>
          </div>

          {/* Connected Vector Filaments Visual */}
          <div className="hidden md:block relative h-12 mb-6">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 48">
              <line x1="80" y1="24" x2="720" y2="24" stroke="#1e3539" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="80" y1="24" x2="720" y2="24" stroke="rgba(45, 212, 191, 0.4)" strokeWidth="1" />
              {dertogadaUniverseLore.readingOrder.map((item, idx) => {
                const cx = 80 + idx * 160;
                const isSelected = selectedBookSlug === item.slug;
                return (
                  <g key={item.slug}>
                    <circle
                      cx={cx}
                      cy="24"
                      r={isSelected ? "7" : "4"}
                      fill={isSelected ? "#57f1db" : "#132427"}
                      stroke={isSelected ? "#ffffff" : "#2dd4bf"}
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    {isSelected && (
                      <circle cx={cx} cy="24" r="14" fill="none" stroke="#2dd4bf" strokeWidth="0.75" opacity="0.6" className="animate-ping" />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* The 5 Interactive Basalt Triggers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {dertogadaUniverseLore.readingOrder.map((item, index) => {
              const isSelected = selectedBookSlug === item.slug;
              return (
                <button
                  key={item.slug}
                  onClick={() => setSelectedBookSlug(item.slug)}
                  className={`text-left p-4 transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'border-[var(--primary-container)] bg-[#132427] shadow-[0_0_24px_-4px_rgba(45,212,191,0.3)]'
                      : 'border-[var(--border-hairline)] hover:border-[var(--primary)] bg-[#0e1a1d]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--outline)] mb-2">
                    <span className="text-[var(--secondary)] font-bold flex items-center gap-1">
                      <span className="font-serif">{geezNumerals[index]}</span>
                      <span>· VOL 0{item.order}</span>
                    </span>
                    <span>{item.year}</span>
                  </div>

                  <div className="font-serif text-lg sm:text-xl font-bold text-[var(--on-surface)] truncate">
                    {item.titleAm}
                  </div>

                  <div className="font-serif text-[11px] text-[var(--secondary)] tracking-wider uppercase mt-0.5 truncate">
                    {item.titleEn}
                  </div>

                  {isSelected ? (
                    <div className="mt-3 pt-2 border-t border-[var(--border-hairline)] flex items-center gap-1.5 font-mono text-[10px] text-[var(--primary)] font-bold">
                      <span>❖</span>
                      <span>ACTIVE CONDUIT</span>
                    </div>
                  ) : (
                    <div className="mt-3 pt-2 border-t border-transparent text-[10px] font-mono text-[var(--outline)]">
                      <span>SELECT VOL →</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Volume Dossier Exhibition (Broadside Split) */}
        <div className="archival-plate p-6 sm:p-10 mb-16 bg-[#0e1a1d] border border-[var(--border-hairline)] shadow-[0_0_35px_-8px_rgba(45,212,191,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Physical Codex Display */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="transition-transform duration-500 hover:scale-[1.02]">
                <BookCover book={selectedBook} size="large" />
              </div>
              
              {/* Folio Inspection Button */}
              <button
                onClick={() => setInspectionBook(selectedBook)}
                className="mt-5 btn-relic text-xs py-2 px-5 w-full max-w-[288px] text-center"
              >
                <span>[INSPECT ARCHIVAL FOLIO 👁]</span>
              </button>
            </div>

            {/* Right: Rich Editorial Content & Themes */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
                <span className="catalog-tag">
                  <span className="catalog-indicator-emerald" />
                  CANONICAL BOOK 0{selectedBook.seriesOrder}
                </span>
                <span className="catalog-tag">
                  {selectedBook.year} G.C. · {selectedBook.yearEc} ዓ.ም.
                </span>
                {selectedBook.translator && (
                  <span className="catalog-tag">
                    <span className="catalog-indicator-crimson" />
                    ENGLISH EDITION AVAILABLE
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-[var(--on-surface)] tracking-tight">
                  {selectedBook.titleAm}
                </h3>
                <div className="font-serif text-base text-[var(--secondary)] font-bold tracking-wider uppercase mt-1">
                  {selectedBook.titleEn}
                </div>
              </div>

              <div className="border-l-2 border-[var(--primary-container)] pl-4 py-1 italic font-serif text-sm sm:text-base text-[var(--on-surface)] bg-[#132427]/40">
                "{lang === 'am' ? selectedBook.tagline?.am : selectedBook.tagline?.en}"
              </div>

              <p className="font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
                {lang === 'am' ? selectedBook.description?.am : selectedBook.description?.en}
              </p>

              {/* Verified Literary & Scientific Themes */}
              <div className="pt-4 border-t border-[var(--border-hairline)]">
                <div className="font-mono text-[10px] text-[var(--secondary)] tracking-widest uppercase mb-2">
                  {lang === 'am' ? 'ቁልፍ ጭብጦች' : 'LITERARY & SPECULATIVE THEMES'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'am' ? selectedBook.themesAm : selectedBook.themes)?.map((theme, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-serif bg-[#080f11] border border-[var(--border-hairline)] text-[var(--on-surface-variant)] hover:border-[var(--primary-container)] transition-colors"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to={`/books/${selectedBook.slug}`} className="btn-relic text-xs">
                  <span>{lang === 'am' ? 'የመጽሐፉ ሙሉ ገጽ' : 'READ VOLUME DOSSIER'}</span>
                  <span>→</span>
                </Link>
                <Link to="/books" className="btn-marginal text-xs">
                  <span>{lang === 'am' ? 'ሙሉ ካታሎግ' : 'ALL 15+ WORKS'}</span>
                  <span className="marginal-glyph">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subterranean Sanctuaries & Character Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Geographic & Secret Base Locations */}
          <div className="lg:col-span-5 archival-plate p-6 sm:p-8 bg-[#0e1a1d] border border-[var(--border-hairline)]">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--secondary)] tracking-widest uppercase mb-6 pb-2 border-b border-[var(--border-hairline)]">
              <span className="text-[var(--primary)]">❖</span>
              <span>{lang === 'am' ? 'የልቦለዱ ዋና ማዕከላት' : 'SECRET SITES & RESEARCH BASES'}</span>
            </div>

            <div className="space-y-4">
              {dertogadaUniverseLore.keyLocations.map((loc, idx) => (
                <div key={idx} className="p-4 bg-[#0b1315] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-colors">
                  <div className="font-serif font-bold text-sm text-[var(--secondary)] uppercase tracking-wider">
                    {lang === 'am' ? loc.nameAm : loc.nameEn}
                  </div>
                  <div className="font-serif text-xs text-[var(--outline)] mb-1">
                    {lang === 'am' ? loc.nameEn : loc.nameAm}
                  </div>
                  <p className="font-serif text-xs text-[var(--on-surface-variant)] leading-relaxed">
                    {lang === 'am' ? loc.descAm : loc.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Character Dossier */}
          <div className="lg:col-span-7 archival-plate p-6 sm:p-8 bg-[#0e1a1d] border border-[var(--border-hairline)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--secondary)] tracking-widest uppercase">
                <span className="text-[var(--primary)]">❖</span>
                <span>{lang === 'am' ? 'ዋና ዋና ገጸ-ባህሪያት' : 'CENTRAL CHARACTER DOSSIERS'}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {dertogadaUniverseLore.characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharId(char.id)}
                    className={`px-3 py-1 text-[11px] border transition-all cursor-pointer ${
                      selectedCharId === char.id
                        ? 'border-[var(--primary-container)] bg-[#132427] text-[var(--primary)] font-bold shadow-[0_0_12px_-2px_rgba(45,212,191,0.3)]'
                        : 'border-[var(--border-hairline)] text-[var(--outline)] hover:text-[var(--on-surface)] bg-[#0b1315]'
                    }`}
                  >
                    {char.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Character Profile */}
            <div className="p-6 bg-[#0b1315] border border-[var(--border-hairline)]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border-hairline)] pb-4 mb-4">
                <div>
                  <div className="font-serif text-2xl font-bold text-[var(--on-surface)]">
                    {selectedChar.nameAm}
                  </div>
                  <div className="font-serif text-xs font-semibold text-[var(--secondary)] tracking-widest uppercase mt-0.5">
                    {selectedChar.nameEn}
                  </div>
                </div>
                <div className="catalog-tag">
                  <span className="catalog-indicator-crimson" />
                  {lang === 'am' ? selectedChar.roleAm : selectedChar.roleEn}
                </div>
              </div>

              <p className="font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
                {lang === 'am' ? selectedChar.bioAm : selectedChar.bioEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Inspection Folio Overlay */}
      <ModalInspectionFolio
        book={inspectionBook}
        isOpen={Boolean(inspectionBook)}
        onClose={() => setInspectionBook(null)}
      />
    </section>
  );
}
