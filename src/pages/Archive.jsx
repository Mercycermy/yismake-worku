import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { publicInterviewsAndArchive, authorData } from '../data/yismakeData';

export default function Archive() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0a0c0f] text-[var(--text-vellum)]">
      {/* Archival Media Header */}
      <section className="pb-16 border-b border-[var(--rule-line)]">
        <div className="site-container">
          <div className="chapter-numeral">
            <span>PUBLIC & MEDIA REPOSITORY</span>
          </div>

          <h1 className="monument-title-am text-4xl sm:text-6xl lg:text-7xl text-[var(--text-vellum)]">
            የሚዲያና የጥናት ማህደር
          </h1>

          <div className="font-['Cinzel'] text-xs sm:text-sm text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mt-2">
            BROADCAST INTERVIEWS, PEER-REVIEWED STUDIES & RECORDED DISPATCHES
          </div>

          <p className="mt-4 max-w-3xl font-serif-ethiopic text-sm sm:text-base text-[var(--text-stone)] leading-relaxed">
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
              className="archival-plate archival-plate-framed p-7 sm:p-8 flex flex-col justify-between bg-[var(--ink-surface)]"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--rule-line-subtle)] font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  <span className="text-[var(--highland-gold)]">
                    ACCESSION AC-0{idx + 1}
                  </span>
                  <span className="archival-tag archival-tag-gold text-[9px]">
                    {item.platform}
                  </span>
                </div>

                <div className="archival-tag archival-tag-rubric text-[9px] mb-3 font-mono">
                  {item.tag}
                </div>

                <h3 className="font-serif-ethiopic text-xl sm:text-2xl font-bold text-[var(--text-vellum)] leading-snug">
                  {lang === 'am' ? item.titleAm : item.titleEn}
                </h3>

                {lang !== 'am' && (
                  <div className="font-serif-ethiopic text-xs text-[var(--highland-gold)] mt-1">
                    {item.titleAm}
                  </div>
                )}

                <p className="mt-4 font-serif-ethiopic text-sm text-[var(--text-stone)] leading-relaxed">
                  {lang === 'am' ? item.summaryAm : item.summaryEn}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--rule-line-subtle)] flex items-center justify-between font-mono text-xs">
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link-editorial"
                >
                  <span>{lang === 'am' ? 'ማህደሩን ይመልከቱ' : 'ACCESS RECORD'}</span>
                  <span>↗</span>
                </a>
                <span className="text-[10px] text-[var(--text-muted)] uppercase">VERIFIED</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
