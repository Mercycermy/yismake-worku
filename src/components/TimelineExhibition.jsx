import React from 'react';
import { useLanguage } from './LanguageContext';
import { authorTimeline } from '../data/yismakeData';

export default function TimelineExhibition() {
  const { lang } = useLanguage();

  return (
    <section className="section-editorial bg-[#0a0c0f] border-b border-[var(--rule-line)]">
      <div className="site-container">
        {/* Section Header: Chapter 04 */}
        <div className="max-w-3xl mb-16">
          <div className="chapter-numeral">
            <span>04 / THE AUTHOR'S CHRONICLE</span>
          </div>

          <h2 className="monument-title-am text-3xl sm:text-5xl lg:text-6xl text-[var(--text-vellum)]">
            የህይወትና የጥበብ ማህደር
          </h2>

          <div className="font-['Cinzel'] text-sm sm:text-lg text-[var(--highland-gold)] font-bold tracking-[0.16em] uppercase mt-2">
            ARCHIVAL BIOGRAPHY & HISTORIC MILESTONES
          </div>

          <p className="mt-4 font-serif-ethiopic text-base sm:text-lg text-[var(--text-stone)] leading-relaxed">
            {lang === 'am'
              ? "ከጎጃም ደብረ ማርቆስ እስከ አዲስ አበባ፤ ከመጀመሪያው የግጥም መድበል እስከ ዴርቶጋዳ አብዮት፣ የ2009 አደጋ ጽናት እና ዓለም አቀፍ የትርጉም እውቅና የተዘረጋው እውነተኛ የታሪክ ሰነድ።"
              : "From the monastic heartland of Gojjam to record-shattering bestseller lists, catastrophic trauma overcome with fortitude, and UK translation prizes."}
          </p>
        </div>

        {/* Archival Ledger Entries (Not standard circles/lines timeline) */}
        <div className="max-w-4xl mx-auto space-y-8">
          {authorTimeline.map((item, index) => (
            <article
              key={index}
              className="archival-plate archival-plate-framed p-6 sm:p-8 bg-[var(--ink-surface)] transition-all duration-300 hover:border-[var(--highland-gold-border)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left: Oversized Archival Year Specimen */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[var(--rule-line-subtle)] pb-4 md:pb-0 md:pr-6">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--highland-gold)] tracking-tight">
                    {item.year.split(' ')[0]}
                  </div>
                  {item.year.includes('(') && (
                    <div className="font-serif-ethiopic text-xs text-[var(--text-muted)] mt-1">
                      {item.year.substring(item.year.indexOf('('))}
                    </div>
                  )}

                  <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest">
                    <span>RECORD</span>
                    <span>#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Right: Milestone Title & Research Record */}
                <div className="md:col-span-8 space-y-3">
                  <div>
                    <h3 className="font-serif-ethiopic text-xl sm:text-2xl font-bold text-[var(--text-vellum)] leading-snug">
                      {lang === 'am' ? item.titleAm : item.titleEn}
                    </h3>
                    {lang !== 'am' && (
                      <div className="font-serif-ethiopic text-xs text-[var(--highland-gold)] mt-0.5">
                        {item.titleAm}
                      </div>
                    )}
                  </div>

                  <p className="font-serif-ethiopic text-sm sm:text-base text-[var(--text-vellum-soft)] leading-relaxed">
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
