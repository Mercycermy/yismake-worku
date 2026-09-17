import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { verifiedQuotes } from '../data/yismakeData';

export default function QuoteGallery() {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const themes = [
    { id: 'all', labelEn: 'All Folios', labelAm: 'ሁሉም አባባሎች' },
    { id: 'Sovereignty & Heritage', labelEn: 'Sovereignty', labelAm: 'ሉዓላዊነትና ቅርስ' },
    { id: 'Hope & Consciousness', labelEn: 'Consciousness', labelAm: 'ተስፋና ህሊና' },
    { id: 'Human Nature & Psychology', labelEn: 'Human Nature', labelAm: 'የሰው ባህሪ' },
    { id: 'Social Satire & Power', labelEn: 'Power & Satire', labelAm: 'ማህበራዊ ምጸት' },
    { id: 'Science & Monasticism', labelEn: 'Monastic Science', labelAm: 'ሳይንስና ጥበብ' }
  ];

  const filteredQuotes = activeFilter === 'all'
    ? verifiedQuotes
    : verifiedQuotes.filter(q => q.theme === activeFilter);

  return (
    <section id="quotes-section" className="py-20 sm:py-24 bg-[#080f11] border-b border-[var(--border-hairline)] relative">
      <div className="site-container">
        {/* Section Header: Bilingual Codex Lockup */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፭
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              PHILOSOPHICAL SCRIPTS & APHORISMS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            ጥልቅ እይታዎችና ቅኔያዊ ስንኞች
          </h2>

          <div className="font-serif text-sm sm:text-lg text-[var(--secondary)] font-bold tracking-[0.16em] uppercase mt-2">
            VERIFIED LITERARY REFLECTIONS & WRITER APHORISMS
          </div>

          <p className="mt-4 font-serif text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed">
            {lang === 'am'
              ? "ከዴርቶጋዳ፣ ሜሎስ፣ ክቡር ድንጋይ እና ከደራሲው ቃለ-መጠይቆች የተወሰዱ እውነተኛ ፍልስፍናዊ አስተውሎቶች።"
              : "Authentic excerpts, satirical aphorisms, and existential observations extracted directly from Yismake Worku's published literature."}
          </p>
        </div>

        {/* Archival Thematic Filters (Strictly Unrounded Basalt Tabs) */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[var(--border-hairline)] font-mono text-xs">
          {themes.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 border transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'border-[var(--primary-container)] bg-[#132427] text-[var(--primary)] font-bold shadow-[0_0_12px_-2px_rgba(45,212,191,0.3)]'
                  : 'border-[var(--border-hairline)] bg-[#0e1a1d] text-[var(--outline)] hover:text-[var(--on-surface)] hover:border-[var(--outline)]'
              }`}
            >
              <span className="text-[var(--secondary)]">{String(idx).padStart(2, '0')} / </span>
              <span>{lang === 'am' ? tab.labelAm : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Broadside Typographic Exhibition Cards (Candlelit Hover Focus) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredQuotes.map((q) => (
            <blockquote
              key={q.id}
              className="archival-plate-candle p-7 sm:p-8 flex flex-col justify-between bg-[#0e1a1d] border border-[var(--border-hairline)] transition-all duration-300 hover:border-[var(--secondary)] hover:shadow-[0_0_24px_-4px_rgba(245,158,11,0.20)]"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border-hairline)] font-mono text-[10px] uppercase tracking-widest text-[var(--outline)]">
                  <div className="flex items-center gap-2">
                    <span className="catalog-indicator-crimson" />
                    <span className="text-[var(--secondary)] font-bold">FOLIO #{String(q.id).padStart(2, '0')}</span>
                  </div>
                  <span>{lang === 'am' ? q.themeAm : q.theme}</span>
                </div>

                {/* Monumental Amharic Quote in Noto Serif Ethiopic */}
                <p className="font-serif text-lg sm:text-xl text-[var(--on-surface)] leading-relaxed font-normal">
                  «{q.quoteAm}»
                </p>

                {/* English Literary Translation in Playfair Display Italic */}
                <p className="mt-4 font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed italic border-l-2 border-[var(--secondary)]/40 pl-4 bg-[#151d1f]/40 py-1">
                  “{q.quoteEn}”
                </p>
              </div>

              {/* Source Provenance */}
              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-[11px] text-[var(--outline)]">
                <span className="text-[var(--primary)] font-bold">
                  SOURCE: {lang === 'am' ? q.sourceAm : q.sourceEn}
                </span>
                <span>YISMAKE WORKU</span>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
