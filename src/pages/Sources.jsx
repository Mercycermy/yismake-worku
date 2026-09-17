import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { academicSources } from '../data/yismakeData';

export default function Sources() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-[#0d1517] text-[var(--on-surface)]">
      {/* Sources Header */}
      <section className="pb-16 border-b border-[var(--border-hairline)]">
        <div className="site-container">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-serif text-sm font-semibold text-[var(--secondary)] tracking-wider">
              ክፍል ፭
            </span>
            <span className="font-mono text-xs text-[var(--outline)]">/</span>
            <span className="font-mono text-xs text-[var(--primary)] uppercase tracking-widest">
              FACTUAL VERIFICATION & SCHOLASTIC CITATIONS
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[var(--on-surface)] font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            የማጣቀሻና የመረጃ ምንጮች
          </h1>

          <div className="font-serif text-xs sm:text-sm text-[var(--secondary)] font-bold tracking-[0.2em] uppercase mt-2">
            ACADEMIC BIBLIOGRAPHY & INDEPENDENT VERIFICATION RECORD
          </div>

          <p className="mt-4 max-w-3xl font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
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
          <div className="archival-plate p-6 sm:p-8 bg-[#0e1a1d] border-l-4 border-l-[var(--primary-container)] border border-[var(--border-hairline)] shadow-[0_0_30px_-8px_rgba(45,212,191,0.12)]">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[var(--secondary)] uppercase tracking-wider mb-2">
              {lang === 'am' ? 'የመረጃ ማረጋገጫ መርህ' : 'EDITORIAL & ARCHIVAL STANDARDS'}
            </h2>
            <p className="font-serif text-sm sm:text-base text-[var(--on-surface-variant)] leading-relaxed">
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
                className="archival-plate p-6 sm:p-7 bg-[#0e1a1d] border border-[var(--border-hairline)] font-mono text-xs hover:border-[var(--primary-container)] transition-colors shadow-[0_0_20px_-8px_rgba(0,0,0,0.8)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--border-hairline)] text-[10px] text-[var(--outline)] uppercase">
                  <span className="catalog-tag">
                    <span className="catalog-indicator-emerald" />
                    {source.type}
                  </span>
                  {source.year && (
                    <span className="text-[var(--primary)] font-bold">PUBLISHED: {source.year}</span>
                  )}
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--on-surface)] leading-snug">
                  {source.title}
                </h3>

                {source.authors && (
                  <div className="text-[var(--secondary)] text-xs mt-1">
                    Authors / Scholars: {source.authors}
                  </div>
                )}

                {source.publication && (
                  <div className="text-[var(--on-surface-variant)] text-xs mt-0.5">
                    Publication: {source.publication}
                  </div>
                )}

                {source.translator && (
                  <div className="text-[#fca5a5] text-xs mt-0.5">
                    Translator: {source.translator}
                  </div>
                )}

                {source.recognition && (
                  <div className="text-[var(--primary)] text-xs mt-1 font-bold">
                    ★ {source.recognition}
                  </div>
                )}

                {source.publisher && (
                  <div className="text-[var(--outline)] text-xs mt-0.5">
                    Publisher / Entity: {source.publisher}
                  </div>
                )}

                {source.subscribers && (
                  <div className="text-[var(--outline)] text-xs mt-0.5">
                    Audience: {source.subscribers}
                  </div>
                )}

                {source.url && (
                  <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex justify-end">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-marginal text-[11px]"
                    >
                      <span>ACCESS PRIMARY SOURCE</span>
                      <span className="marginal-glyph">↗</span>
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
