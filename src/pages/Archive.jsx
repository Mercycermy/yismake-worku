import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { publicInterviewsAndArchive } from '../data/yismakeData';

export default function Archive() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0d1517] text-[var(--on-surface)]">
      {/* Archival Media Header */}
      <section className="pb-16 border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፬
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              PUBLIC & MEDIA REPOSITORY
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            የሚዲያና የጥናት ማህደር
          </h1>

          <div className="font-serif text-xs sm:text-sm text-[var(--secondary)] font-bold tracking-[0.2em] uppercase mt-2">
            BROADCAST INTERVIEWS, PEER-REVIEWED STUDIES & RECORDED DISPATCHES
          </div>

          <p className="mt-4 max-w-3xl font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
            {lang === 'am'
              ? "የሰይፉ በኢቢኤስ ዝግጅት፣ የአርትስ ቲቪ ውይይቶች፣ የታይለር ኤንድ ፍራንሲስ አካዳሚያዊ ጥናት እና ይፋዊ የቴሌግራም መድረኮች የተሰባሰቡበት የተረጋገጠ ማህደር።"
              : "Curated broadcast features, peer-reviewed academic literature, television broadcasts, and community dispatches documenting Yismake Worku's literary legacy."}
          </p>
        </div>
      </section>

      {/* Main Archival Records Grid */}
      <section className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {publicInterviewsAndArchive.map((item, idx) => (
            <article
              key={item.id}
              className="archival-plate p-7 sm:p-8 flex flex-col justify-between bg-[#0e1a1d] border border-[var(--border-hairline)] hover:border-[var(--primary-container)] transition-all duration-300 shadow-[0_0_24px_-8px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_-8px_rgba(45,212,191,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)] font-mono text-[10px] uppercase tracking-widest text-[var(--outline)]">
                  <span className="text-[var(--primary)] font-bold">
                    ACCESSION AC-0{idx + 1}
                  </span>
                  <span className="catalog-tag text-[9px]">
                    <span className="catalog-indicator-emerald" />
                    {item.platform}
                  </span>
                </div>

                <div className="catalog-tag mb-3 font-mono">
                  <span className="catalog-indicator-crimson" />
                  {item.tag}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--on-surface)] leading-snug">
                  {lang === 'am' ? item.titleAm : item.titleEn}
                </h3>

                {lang !== 'am' && (
                  <div className="font-serif text-xs text-[var(--secondary)] mt-1">
                    {item.titleAm}
                  </div>
                )}

                <p className="mt-4 font-serif text-sm text-[var(--on-surface-variant)] leading-relaxed">
                  {lang === 'am' ? item.summaryAm : item.summaryEn}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-marginal"
                >
                  <span>{lang === 'am' ? 'ማህደሩን ይመልከቱ' : 'ACCESS RECORD'}</span>
                  <span className="marginal-glyph">↗</span>
                </a>
                <span className="text-[10px] text-[var(--primary)] uppercase font-bold">VERIFIED DISPATCH</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
