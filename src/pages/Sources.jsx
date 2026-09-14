import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { academicSources } from '../data/yismakeData';

export default function Sources() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 pb-24 bg-[#080b11] text-[#f6f0e2]">
      {/* Header */}
      <section className="relative py-14 sm:py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase mb-3">
            <span>❖ {lang === 'am' ? 'የመረጃና የጥናት ምንጮች' : 'ACADEMIC & FACTUAL CITATIONS'} ❖</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Cinzel'] tracking-tight">
            RESEARCH <span className="text-gradient-gold">BIBLIOGRAPHY</span>
            <span className="block text-2xl sm:text-4xl font-['Noto_Serif_Ethiopic'] text-[#ebe4d3] font-bold mt-2">
              የማጣቀሻና የመረጃ ምንጮች
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#9aa5b8] font-['Noto_Serif_Ethiopic'] leading-relaxed">
            {lang === 'am'
              ? "በዚህ ድረ-ገጽ ላይ የቀረቡት መረጃዎች፣ የህትመት ዘመናት፣ የሽያጭ መረጃዎችና የህይወት ታሪኮች የተሰባሰቡባቸው ተአማኒ የአካዳሚ፣ የአሳታሚና የሚዲያ ምንጮች ዝርዝር።"
              : "Rigorous transparency: Every factual milestone, publication date, translator credential, and biographical record on this site is cross-referenced with verified academic and literary sources."}
          </p>
        </div>
      </section>

      {/* Sources Table & Methodology */}
      <section className="section-padding">
        <div className="site-container max-w-4xl mx-auto">
          {/* Methodology Card */}
          <div className="glass-panel p-6 sm:p-8 mb-10 border-l-4 border-[#00f0ff]">
            <h3 className="text-lg font-bold text-white font-['Cinzel'] mb-2">
              {lang === 'am' ? 'የመረጃ ማረጋገጫ መርህ' : 'Editorial & Archival Standards'}
            </h3>
            <p className="text-sm text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] leading-relaxed">
              {lang === 'am'
                ? "በዚህ ድረ-ገጽ ላይ ያልተረጋገጡ ወይም የተፈበረኩ ወሬዎች ፈጽሞ አልተካተቱም። የተጠቀሱት 15+ መጻሕፍት፣ በታይለር ኤንድ ፍራንሲስ የታተመው አካዳሚያዊ ጥናት፣ በእንግሊዝ አገር ለሽልማት የቀረበው የትርጉም ስራ እና የደራሲው ቃለ-መጠይቆች በገለልተኛ አካላት ተረጋግጠው የቀረቡ ናቸው።"
                : "No fabricated quotes, speculative gossip, or unverified claims are featured on this digital archive. Bibliographic data, sales figures, and biographical details are cross-referenced across peer-reviewed African literary studies, Addis Ababa University theses, official publisher catalogs, and direct broadcast interviews."}
            </p>
          </div>

          {/* Source Citations List */}
          <div className="space-y-6">
            {academicSources.map((source, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 hover:border-[#d4af37]/40 transition-all font-mono"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="badge badge-gold text-[10px]">
                    {source.type}
                  </span>
                  {source.year && (
                    <span className="text-xs text-white/40">Year: {source.year}</span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white font-sans">
                  {source.title}
                </h4>

                <div className="mt-2 text-xs text-[#9aa5b8] space-y-1 font-sans">
                  {source.authors && <div><strong className="text-white/60">Authors:</strong> {source.authors}</div>}
                  {source.translator && <div><strong className="text-white/60">Translator:</strong> {source.translator}</div>}
                  {source.publication && <div><strong className="text-white/60">Journal/Publisher:</strong> {source.publication}</div>}
                  {source.institution && <div><strong className="text-white/60">Institution:</strong> {source.institution}</div>}
                  {source.recognition && <div><strong className="text-[#00f0ff]">Recognition:</strong> {source.recognition}</div>}
                  {source.subscribers && <div><strong className="text-[#00f0ff]">Audience:</strong> {source.subscribers}</div>}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/40 font-mono text-[11px]">Primary Source Index 0{idx + 1}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f0ff] hover:underline flex items-center gap-1 font-sans"
                  >
                    <span>Visit Reference URL</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
