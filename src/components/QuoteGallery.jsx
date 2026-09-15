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
    <section id="quotes-section" className="section-editorial bg-[#0c0f14] border-b border-[var(--rule-line)]">
      <div className="site-container">
        {/* Section Header: Chapter 05 */}
        <div className="max-w-3xl mb-12">
          <div className="chapter-numeral">
            <span>05 / PHILOSOPHICAL SCRIPTS & OBSERVATIONS</span>
          </div>

          <h2 className="monument-title-am text-3xl sm:text-5xl lg:text-6xl text-[var(--text-vellum)]">
            ጥልቅ እይታዎችና ቅኔያዊ ስንኞች
          </h2>

          <div className="font-['Cinzel'] text-sm sm:text-lg text-[var(--highland-gold)] font-bold tracking-[0.16em] uppercase mt-2">
            VERIFIED LITERARY REFLECTIONS & WRITER APHORISMS
          </div>

          <p className="mt-4 font-serif-ethiopic text-base sm:text-lg text-[var(--text-stone)] leading-relaxed">
            {lang === 'am'
              ? "ከዴርቶጋዳ፣ ሜሎስ፣ ክቡር ድንጋይ እና ከደራሲው ቃለ-መጠይቆች የተወሰዱ እውነተኛ ፍልስፍናዊ አስተውሎቶች።"
              : "Authentic excerpts, satirical aphorisms, and existential observations extracted directly from Yismake Worku's published literature."}
          </p>
        </div>

        {/* Editorial Index Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[var(--rule-line-subtle)] font-mono text-xs">
          {themes.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 border transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'border-[var(--highland-gold)] bg-[var(--highland-gold)] text-[var(--ink-base)] font-bold'
                  : 'border-[var(--rule-line)] bg-[var(--ink-surface)] text-[var(--text-stone)] hover:text-[var(--text-vellum)] hover:border-[var(--rule-line-strong)]'
              }`}
            >
              <span>{String(idx).padStart(2, '0')} / </span>
              <span>{lang === 'am' ? tab.labelAm : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Broadside Typographic Exhibition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredQuotes.map((q) => (
            <blockquote
              key={q.id}
              className="archival-plate archival-plate-framed p-7 sm:p-8 flex flex-col justify-between bg-[var(--ink-surface)]"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--rule-line-subtle)] font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-widest">
                  <span className="text-[var(--rubric-bright)]">FOLIO #{String(q.id).padStart(2, '0')}</span>
                  <span>{lang === 'am' ? q.themeAm : q.theme}</span>
                </div>

                {/* Monumental Amharic Quote */}
                <p className="font-serif-ethiopic text-lg sm:text-xl text-[var(--text-vellum)] leading-relaxed font-normal">
                  «{q.quoteAm}»
                </p>

                {/* English Literary Translation */}
                <p className="mt-4 font-serif-latin text-sm sm:text-base text-[var(--text-stone)] leading-relaxed italic border-l-2 border-[var(--highland-gold-border)] pl-4">
                  “{q.quoteEn}”
                </p>
              </div>

              {/* Source Provenance */}
              <div className="mt-6 pt-4 border-t border-[var(--rule-line-subtle)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
                <span className="text-[var(--highland-gold)]">
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
