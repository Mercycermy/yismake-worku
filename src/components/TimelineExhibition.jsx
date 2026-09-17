import React from 'react';
import { useLanguage } from './LanguageContext';
import { authorTimeline } from '../data/yismakeData';

export default function TimelineExhibition() {
  const { lang } = useLanguage();

  const geezCounters = ['፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱', '፲', '፲፩', '፲፪'];

  return (
    <section className="py-20 sm:py-24 bg-[#0d1517] border-b border-[var(--border-hairline)]">
      <div className="site-container">
        {/* Section Header: Bilingual Codex Lockup */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፬
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              ARCHIVAL CHRONICLE · HISTORIC MILESTONES
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            የህይወትና የጥበብ ማህደር
          </h2>

          <div className="font-serif text-sm sm:text-lg text-[var(--secondary)] font-bold tracking-[0.16em] uppercase mt-2">
            THE AUTHOR'S BIOGRAPHICAL LEDGER (1986–PRESENT)
          </div>

          <p className="mt-4 font-serif text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed">
            {lang === 'am'
              ? "ከጎጃም ደብረ ማርቆስ እስከ አዲስ አበባ፤ ከመጀመሪያው የግጥም መድበል እስከ ዴርቶጋዳ አብዮት፣ የ2009 አደጋ ጽናት እና ዓለም አቀፍ የትርጉም እውቅና የተዘረጋው እውነተኛ የታሪክ ሰነድ።"
              : "From the monastic heartland of Gojjam to record-shattering bestseller lists, catastrophic trauma overcome with fortitude, and UK translation prizes."}
          </p>
        </div>

        {/* Archival Ledger Entries (Indexed by Ge'ez Counters & Lateral Emerald Glow) */}
        <div className="max-w-4xl mx-auto space-y-6">
          {authorTimeline.map((item, index) => (
            <article
              key={index}
              className="p-6 sm:p-8 bg-[#0e1a1d] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(45,212,191,0.18)] group relative"
            >
              {/* Left Vertical Emerald Glow Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--primary-container)] opacity-0 group-hover:opacity-100 shadow-[0_0_12px_var(--primary-container)] transition-opacity" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left: Ge'ez Index Counter & Oversized Year Specimen */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[var(--border-hairline)] pb-4 md:pb-0 md:pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif text-lg font-bold text-[var(--secondary)]">
                      {geezCounters[index] || '❖'}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--outline)] uppercase tracking-wider">
                      · LEDGER #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--primary)] tracking-tight">
                    {item.year.split(' ')[0]}
                  </div>
                  {item.year.includes('(') && (
                    <div className="font-serif text-xs text-[var(--outline)] mt-1">
                      {item.year.substring(item.year.indexOf('('))}
                    </div>
                  )}

                  <div className="mt-3">
                    <span className="catalog-tag">
                      <span className="catalog-indicator-emerald" />
                      VERIFIED CANON
                    </span>
                  </div>
                </div>

                {/* Right: Milestone Title & Research Record */}
                <div className="md:col-span-8 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--on-surface)] leading-snug group-hover:text-[var(--primary)] transition-colors">
                      {lang === 'am' ? item.titleAm : item.titleEn}
                    </h3>
                    {lang !== 'am' && (
                      <div className="font-serif text-xs text-[var(--secondary)] mt-0.5">
                        {item.titleAm}
                      </div>
                    )}
                  </div>

                  <p className="font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
                    {lang === 'am' ? item.descAm : item.descEn}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
