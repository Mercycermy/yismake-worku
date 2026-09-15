import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { dertogadaUniverseLore, verifiedBooks } from '../data/yismakeData';
import BookCover from './BookCover';

export default function DertogadaUniverseMap() {
  const { lang } = useLanguage();
  const [selectedBookSlug, setSelectedBookSlug] = useState('dertogada');
  const [selectedCharId, setSelectedCharId] = useState('shagiz');

  const selectedBook = verifiedBooks.find((b) => b.slug === selectedBookSlug) || verifiedBooks[0];
  const selectedChar = dertogadaUniverseLore.characters.find((c) => c.id === selectedCharId) || dertogadaUniverseLore.characters[0];

  const geezNumerals = ['፩', '፪', '፫', '፬', '፭'];

  return (
    <section id="universe-section" className="section-editorial bg-[#0c0f14] border-b border-[var(--rule-line)]">
      <div className="site-container">
        {/* Section Header: Chapter 02 */}
        <div className="max-w-3xl mb-14">
          <div className="chapter-numeral">
            <span>02 / THE CANONICAL STORYWORLD</span>
          </div>

          <h2 className="monument-title-am text-3xl sm:text-5xl lg:text-6xl text-[var(--text-vellum)]">
            የዴርቶጋዳ ዓለም
          </h2>

          <div className="font-['Cinzel'] text-sm sm:text-lg text-[var(--highland-gold)] font-bold tracking-[0.16em] uppercase mt-2">
            THE DERTOGADA PENTOLOGY · 2009–2016
          </div>

          <p className="mt-4 font-serif-ethiopic text-base sm:text-lg text-[var(--text-stone)] leading-relaxed">
            {lang === 'am' ? dertogadaUniverseLore.description.am : dertogadaUniverseLore.description.en}
          </p>
        </div>

        {/* The Literary Constellation Rail (5 Interconnected Canonical Works) */}
        <div className="mb-14 pb-8 border-b border-[var(--rule-line-subtle)]">
          <div className="flex items-center justify-between mb-4 font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase">
            <span>CANONICAL READING ORDER</span>
            <span>CHRONOLOGY: 5 VOLUMES</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {dertogadaUniverseLore.readingOrder.map((item, index) => {
              const isSelected = selectedBookSlug === item.slug;
              return (
                <button
                  key={item.slug}
                  onClick={() => setSelectedBookSlug(item.slug)}
                  className={`text-left p-4 archival-plate transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[var(--highland-gold)] bg-[var(--ink-plate)] shadow-lg'
                      : 'border-[var(--rule-line-subtle)] hover:border-[var(--rule-line)] bg-[var(--ink-surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] mb-2">
                    <span className="text-[var(--highland-gold)] font-bold">
                      {geezNumerals[index]} · VOL 0{item.order}
                    </span>
                    <span>{item.year}</span>
                  </div>

                  <div className="font-serif-ethiopic text-lg sm:text-xl font-bold text-[var(--text-vellum)] truncate">
                    {item.titleAm}
                  </div>

                  <div className="font-['Cinzel'] text-[11px] text-[var(--text-stone)] tracking-wider uppercase mt-0.5 truncate">
                    {item.titleEn}
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-2 border-t border-[var(--rule-line-subtle)] flex items-center gap-1.5 font-mono text-[10px] text-[var(--highland-gold)]">
                      <span>❖</span>
                      <span>ACTIVE DOSSIER</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Volume Dossier Exhibition (Broadside Split) */}
        <div className="archival-plate archival-plate-framed p-6 sm:p-10 mb-16 bg-[var(--ink-surface)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Physical Codex Display */}
            <div className="lg:col-span-4 flex justify-center">
              <Link to={`/books/${selectedBook.slug}`} className="block group transition-transform duration-500 hover:scale-[1.02]">
                <BookCover book={selectedBook} size="large" />
                <div className="mt-4 text-center font-mono text-xs text-[var(--highland-gold)] group-hover:text-[var(--text-vellum)] transition-colors">
                  <span>→ {lang === 'am' ? 'ሙሉ የመጽሐፉን ማህደር አንብብ' : 'OPEN FULL DOSSIER'}</span>
                </div>
              </Link>
            </div>

            {/* Right: Rich Editorial Content & Themes */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase">
                <span className="archival-tag archival-tag-gold">
                  CANONICAL BOOK 0{selectedBook.seriesOrder}
                </span>
                <span className="archival-tag">
                  {selectedBook.year} G.C. · {selectedBook.yearEc} ዓ.ም.
                </span>
                {selectedBook.translator && (
                  <span className="archival-tag archival-tag-rubric">
                    ENGLISH EDITION AVAILABLE
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif-ethiopic text-3xl sm:text-4xl font-black text-[var(--text-vellum)]">
                  {selectedBook.titleAm}
                </h3>
                <div className="font-['Cinzel'] text-lg text-[var(--highland-gold)] font-bold tracking-widest uppercase mt-1">
                  {selectedBook.titleEn}
                </div>
              </div>

              <div className="border-l-2 border-[var(--rubric-bright)] pl-4 py-1 italic font-serif-ethiopic text-sm sm:text-base text-[var(--text-vellum-soft)]">
                "{lang === 'am' ? selectedBook.tagline.am : selectedBook.tagline.en}"
              </div>

              <p className="font-serif-ethiopic text-sm sm:text-base text-[var(--text-stone)] leading-relaxed">
                {lang === 'am' ? selectedBook.description.am : selectedBook.description.en}
              </p>

              {/* Verified Literary & Scientific Themes */}
              <div className="pt-4 border-t border-[var(--rule-line-subtle)]">
                <div className="font-mono text-[10px] text-[var(--highland-gold)] tracking-widest uppercase mb-2">
                  {lang === 'am' ? 'ቁልፍ ጭብጦች' : 'LITERARY & SPECULATIVE THEMES'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'am' ? selectedBook.themesAm : selectedBook.themes).map((theme, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-serif-ethiopic bg-[var(--ink-base)] border border-[var(--rule-line)] text-[var(--text-vellum-soft)]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link to={`/books/${selectedBook.slug}`} className="btn-folio text-xs">
                  <span>{lang === 'am' ? 'የመጽሐፉ ሙሉ ገጽ' : 'READ VOLUME DOSSIER'}</span>
                  <span>→</span>
                </Link>
                {selectedBook.purchaseLinks?.[0] && (
                  <a
                    href={selectedBook.purchaseLinks[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-archival text-xs"
                  >
                    <span>{lang === 'am' ? 'መጽሐፉን ያግኙ' : 'FIND COPY / READ'}</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subterranean Sanctuaries & Character Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Geographic & Secret Base Locations */}
          <div className="lg:col-span-5 archival-plate p-6 sm:p-8 bg-[var(--ink-surface)]">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--highland-gold)] tracking-widest uppercase mb-6 pb-2 border-b border-[var(--rule-line-subtle)]">
              <span>❖</span>
              <span>{lang === 'am' ? 'የልቦለዱ ዋና ማዕከላት' : 'SECRET SITES & RESEARCH BASES'}</span>
            </div>

            <div className="space-y-4">
              {dertogadaUniverseLore.keyLocations.map((loc, idx) => (
                <div key={idx} className="p-4 bg-[var(--ink-plate)] border border-[var(--rule-line-subtle)]">
                  <div className="font-['Cinzel'] font-bold text-xs text-[var(--highland-gold)] uppercase tracking-wider">
                    {lang === 'am' ? loc.nameAm : loc.nameEn}
                  </div>
                  <div className="font-serif-ethiopic text-[11px] text-[var(--text-muted)] mb-1">
                    {lang === 'am' ? loc.nameEn : loc.nameAm}
                  </div>
                  <p className="font-serif-ethiopic text-xs text-[var(--text-stone)] leading-relaxed">
                    {lang === 'am' ? loc.descAm : loc.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Character Dossier */}
          <div className="lg:col-span-7 archival-plate p-6 sm:p-8 bg-[var(--ink-surface)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-[var(--rule-line-subtle)]">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--highland-gold)] tracking-widest uppercase">
                <span>❖</span>
                <span>{lang === 'am' ? 'ዋና ዋና ገጸ-ባህሪያት' : 'CENTRAL CHARACTER DOSSIERS'}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {dertogadaUniverseLore.characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharId(char.id)}
                    className={`px-2.5 py-1 text-[11px] border transition-all cursor-pointer ${
                      selectedCharId === char.id
                        ? 'border-[var(--highland-gold)] bg-[var(--highland-gold)] text-[var(--ink-base)] font-bold'
                        : 'border-[var(--rule-line)] text-[var(--text-stone)] hover:text-[var(--text-vellum)] bg-[var(--ink-plate)]'
                    }`}
                  >
                    {char.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Character Profile */}
            <div className="p-6 bg-[var(--ink-plate)] border border-[var(--rule-line)]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--rule-line-subtle)] pb-4 mb-4">
                <div>
                  <div className="font-serif-ethiopic text-2xl font-bold text-[var(--text-vellum)]">
                    {selectedChar.nameAm}
                  </div>
                  <div className="font-['Cinzel'] text-xs font-semibold text-[var(--highland-gold)] tracking-widest uppercase mt-0.5">
                    {selectedChar.nameEn}
                  </div>
                </div>
                <div className="archival-tag archival-tag-rubric self-start sm:self-auto">
                  {lang === 'am' ? selectedChar.roleAm : selectedChar.roleEn}
                </div>
              </div>

              <p className="font-serif-ethiopic text-sm sm:text-base text-[var(--text-vellum-soft)] leading-relaxed">
                {lang === 'am' ? selectedChar.bioAm : selectedChar.bioEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
