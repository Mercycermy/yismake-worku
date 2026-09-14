import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { dertogadaUniverseLore, verifiedBooks } from '../data/yismakeData';
import BookCover from './BookCover';

export default function DertogadaUniverseMap() {
  const { lang, t } = useLanguage();
  const [selectedBookSlug, setSelectedBookSlug] = useState('dertogada');
  const [selectedCharId, setSelectedCharId] = useState('shagiz');

  const selectedBook = verifiedBooks.find(b => b.slug === selectedBookSlug) || verifiedBooks[0];
  const selectedChar = dertogadaUniverseLore.characters.find(c => c.id === selectedCharId) || dertogadaUniverseLore.characters[0];

  return (
    <section id="dertogada-universe" className="relative section-padding bg-[#080b11] overflow-hidden">
      {/* Background Ambience: Subterranean Lake Tana Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-3">
            <span>❖ {lang === 'am' ? 'የተከታታይ ልቦለድ ቅደም ተከተል' : 'THE CANONICAL PENTOLOGY'} ❖</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white font-['Cinzel'] tracking-tight">
            <span className="text-gradient-cyan">DERTOGADA</span> UNIVERSE
            <span className="block text-2xl sm:text-4xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] font-semibold mt-2">
              የዴርቶጋዳ ዓለም
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9aa5b8] font-['Noto_Serif_Ethiopic'] leading-relaxed">
            {lang === 'am'
              ? dertogadaUniverseLore.description.am
              : dertogadaUniverseLore.description.en}
          </p>
        </div>

        {/* Constellation Timeline Nodes (5 Connected Books) */}
        <div className="mb-16">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-4 text-center">
            {lang === 'am' ? 'የንባብ ቅደም ተከተል (2009–2016)' : 'Canonical Chronology & Reading Sequence'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dertogadaUniverseLore.readingOrder.map((item, index) => {
              const bookObj = verifiedBooks.find(b => b.slug === item.slug);
              const isSelected = selectedBookSlug === item.slug;

              return (
                <button
                  key={item.slug}
                  onClick={() => setSelectedBookSlug(item.slug)}
                  className={`text-left p-4 rounded-xl transition-all duration-300 relative cursor-pointer border ${
                    isSelected
                      ? 'bg-cyan-950/40 border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.25)]'
                      : 'bg-[#0f1420]/80 border-white/10 hover:border-white/25 hover:bg-[#151d2d]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-cyan-300">
                      PART 0{item.order}
                    </span>
                    <span className="text-xs font-mono text-white/50">{item.year}</span>
                  </div>

                  <div className="text-xl font-bold font-['Noto_Serif_Ethiopic'] text-white">
                    {item.titleAm}
                  </div>

                  <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase font-['Cinzel'] mt-0.5">
                    {item.titleEn}
                  </div>

                  {isSelected && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#00f0ff] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                      <span>{lang === 'am' ? 'አሁን የተመረጠ' : 'Selected Dossier'}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Book Interactive Spotlight */}
        <div className="glass-panel-cyan p-6 sm:p-10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Cover Column */}
            <div className="lg:col-span-4 flex justify-center">
              <Link to={`/books/${selectedBook.slug}`} className="group block">
                <BookCover book={selectedBook} size="large" />
                <div className="mt-3 text-center text-xs text-cyan-300/80 group-hover:text-cyan-300 font-mono">
                  {lang === 'am' ? '→ ሙሉ ገጹን አንብብ' : '→ View Full Book Page'}
                </div>
              </Link>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="badge badge-cyan font-mono">
                  Book 0{selectedBook.seriesOrder} of the Saga
                </span>
                <span className="badge badge-gold font-mono">
                  {selectedBook.year} G.C. · {selectedBook.yearEc} ዓ.ም.
                </span>
                {selectedBook.translator && (
                  <span className="badge badge-crimson font-mono">
                    Translated to English
                  </span>
                )}
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white font-['Noto_Serif_Ethiopic']">
                {selectedBook.titleAm}
                <span className="ml-3 text-xl sm:text-2xl font-light text-[#d4af37] font-['Cinzel'] uppercase">
                  ({selectedBook.titleEn})
                </span>
              </h3>

              <p className="mt-2 text-sm sm:text-base text-cyan-200 font-['Noto_Serif_Ethiopic'] italic">
                "{lang === 'am' ? selectedBook.tagline.am : selectedBook.tagline.en}"
              </p>

              <p className="mt-4 text-[#ebe4d3] leading-relaxed font-['Noto_Serif_Ethiopic']">
                {lang === 'am' ? selectedBook.description.am : selectedBook.description.en}
              </p>

              {/* Verified Themes */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-2">
                  {lang === 'am' ? 'ዋና ዋና ጭብጦች' : 'Key Literary & Scientific Themes'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'am' ? selectedBook.themesAm : selectedBook.themes).map((theme, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-white/90 font-['Noto_Serif_Ethiopic']"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/books/${selectedBook.slug}`} className="btn-cyan">
                  <span>{lang === 'am' ? 'የመጽሐፉ ሙሉ ማህደር' : 'Explore Book Dossier'}</span>
                </Link>
                {selectedBook.purchaseLinks?.[0] && (
                  <a
                    href={selectedBook.purchaseLinks[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <span>{lang === 'am' ? 'መጽሐፉን ያግኙ / ይዘዙ' : 'Find / Purchase'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subterranean Lore & Character Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Key Geographic & Secret Base Locations */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8">
            <h4 className="text-xl font-bold text-white font-['Cinzel'] mb-4 flex items-center gap-2">
              <span className="text-[#00f0ff]">❖</span>
              <span>{lang === 'am' ? 'የልቦለዱ ዋና ማዕከላት' : 'Sanctuaries & Secret Sites'}</span>
            </h4>

            <div className="space-y-4">
              {dertogadaUniverseLore.keyLocations.map((loc, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-black/40 border border-white/5">
                  <div className="font-bold text-sm text-[#d4af37] font-['Cinzel']">
                    {lang === 'am' ? loc.nameAm : loc.nameEn}
                  </div>
                  <div className="text-xs text-white/50 font-['Noto_Serif_Ethiopic'] mb-1">
                    {lang === 'am' ? loc.nameEn : loc.nameAm}
                  </div>
                  <p className="text-xs text-[#9aa5b8] font-['Noto_Serif_Ethiopic']">
                    {lang === 'am' ? loc.descAm : loc.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Character Dossier */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h4 className="text-xl font-bold text-white font-['Cinzel'] flex items-center gap-2">
                <span className="text-[#d4af37]">❖</span>
                <span>{lang === 'am' ? 'ዋና ዋና ገጸ-ባህሪያት' : 'Central Character Dossiers'}</span>
              </h4>

              <div className="flex flex-wrap gap-1.5">
                {dertogadaUniverseLore.characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharId(char.id)}
                    className={`px-3 py-1 text-xs rounded-md font-mono transition-all cursor-pointer ${
                      selectedCharId === char.id
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {char.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Character Profile */}
            <div className="p-6 rounded-xl bg-black/50 border border-cyan-500/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <div className="text-2xl font-bold text-white font-['Noto_Serif_Ethiopic']">
                    {selectedChar.nameAm}
                  </div>
                  <div className="text-sm font-semibold text-[#d4af37] font-['Cinzel']">
                    {selectedChar.nameEn}
                  </div>
                </div>
                <span className="badge badge-cyan font-mono text-xs">
                  {lang === 'am' ? selectedChar.roleAm : selectedChar.roleEn}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#ebe4d3] leading-relaxed font-['Noto_Serif_Ethiopic']">
                {lang === 'am' ? selectedChar.bioAm : selectedChar.bioEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
