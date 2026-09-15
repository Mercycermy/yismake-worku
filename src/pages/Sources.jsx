import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { academicSources } from '../data/yismakeData';

export default function Sources() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0a0c0f] text-[var(--text-vellum)]">
      {/* Sources Header */}
      <section className="pb-16 border-b border-[var(--rule-line)]">
        <div className="site-container">
          <div className="chapter-numeral">
            <span>FACTUAL VERIFICATION & SCHOLASTIC CITATIONS</span>
          </div>

          <h1 className="monument-title-am text-4xl sm:text-6xl lg:text-7xl text-[var(--text-vellum)]">
            የማጣቀሻና የመረጃ ምንጮች
          </h1>

          <div className="font-['Cinzel'] text-xs sm:text-sm text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mt-2">
            ACADEMIC BIBLIOGRAPHY & INDEPENDENT VERIFICATION RECORD
          </div>

          <p className="mt-4 max-w-3xl font-serif-ethiopic text-sm sm:text-base text-[var(--text-stone)] leading-relaxed">
            {lang === 'am'
              ? "በዚህ ድረ-ገጽ ላይ የቀረቡት መረጃዎች፣ የህትመት ዘመናት፣ የሽያጭ መረጃዎችና የህይወት ታሪኮች የተሰባሰቡባቸው ተአማኒ የአካዳሚ፣ የአሳታሚና የሚዲያ ምንጮች ዝርዝር።"
              : "Rigorous scholarly transparency: Every factual milestone, publication date, translator credential, and biographical record on this site is cross-referenced with verified academic and literary sources."}
          </p>
        </div>
      </section>

      {/* Methodology & Sources List */}
      <section className="site-container py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Methodology Card */}
          <div className="archival-plate archival-plate-framed p-6 sm:p-8 bg-[var(--ink-surface)] border-l-4 border-l-[var(--highland-gold)]">
            <h2 className="font-['Cinzel'] text-sm sm:text-base font-bold text-[var(--highland-gold)] uppercase tracking-wider mb-2">
              {lang === 'am' ? 'የመረጃ ማረጋገጫ መርህ' : 'EDITORIAL & ARCHIVAL STANDARDS'}
            </h2>
            <p className="font-serif-ethiopic text-sm sm:text-base text-[var(--text-vellum-soft)] leading-relaxed">
              {lang === 'am'
                ? "በዚህ ድረ-ገጽ ላይ ያልተረጋገጡ ወይም የተፈበረኩ ወሬዎች ፈጽሞ አልተካተቱም። የተጠቀሱት 15+ መጻሕፍት፣ በታይለር ኤንድ ፍራንሲስ የታተመው አካዳሚያዊ ጥናት፣ በእንግሊዝ አገር ለሽልማት የቀረበው የትርጉም ስራ እና የደራሲው ቃለ-መጠይቆች በገለልተኛ አካላት ተረጋግጠው የቀረቡ ናቸው።"
                : "No fabricated quotes, speculative gossip, or unverified claims are featured on this digital archive. Bibliographic data, sales figures, and biographical details are cross-referenced across peer-reviewed African literary studies (Taylor & Francis), Addis Ababa University theses, official publisher catalogs, and direct broadcast interviews."}
            </p>
          </div>

          {/* Source Citations List */}
          <div className="space-y-6">
            {academicSources.map((source, idx) => (
              <article
                key={idx}
                className="archival-plate p-6 sm:p-7 bg-[var(--ink-surface)] font-mono text-xs hover:border-[var(--highland-gold-border)] transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--rule-line-subtle)] text-[10px] text-[var(--text-muted)] uppercase">
                  <span className="archival-tag archival-tag-gold">
                    {source.type}
                  </span>
                  {source.year && (
                    <span>PUBLISHED: {source.year}</span>
                  )}
                </div>

                <h3 className="font-serif-ethiopic text-base sm:text-lg font-bold text-[var(--text-vellum)] leading-snug">
                  {source.title}
                </h3>

                {source.authors && (
                  <div className="text-[var(--highland-gold)] text-xs mt-1">
                    Authors / Scholars: {source.authors}
                  </div>
                )}

                {source.publication && (
                  <div className="text-[var(--text-stone)] text-xs mt-0.5">
                    Publication: {source.publication}
                  </div>
                )}

                {source.translator && (
                  <div className="text-[var(--rubric-bright)] text-xs mt-0.5">
                    Translator: {source.translator}
                  </div>
                )}

                {source.recognition && (
                  <div className="text-[var(--highland-gold)] text-xs mt-1 italic">
                    ★ {source.recognition}
                  </div>
                )}

                {source.publisher && (
                  <div className="text-[var(--text-stone)] text-xs mt-0.5">
                    Publisher / Entity: {source.publisher}
                  </div>
                )}

                {source.subscribers && (
                  <div className="text-[var(--text-stone)] text-xs mt-0.5">
                    Audience: {source.subscribers}
                  </div>
                )}

                <div className="mt-5 pt-3 border-t border-[var(--rule-line-subtle)] flex items-center justify-between">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link-editorial text-[11px]"
                  >
                    <span>VERIFY SOURCE ACCESS</span>
                    <span>↗</span>
                  </a>
                  <span className="text-[9px] text-[var(--text-muted)] uppercase">
                    CITATION #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
