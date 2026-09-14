import React from 'react';
import { useLanguage } from './LanguageContext';
import { authorTimeline } from '../data/yismakeData';

export default function TimelineExhibition() {
  const { lang } = useLanguage();

  return (
    <section className="relative section-padding bg-[#05070a] overflow-hidden">
      {/* Subtle Background Ge'ez Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono tracking-widest uppercase mb-3">
            <span>❖ {lang === 'am' ? 'የደራሲው የጥበብ ታሪክ' : 'CHRONOLOGICAL ARCHIVE'} ❖</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white font-['Cinzel'] tracking-tight">
            VISUAL <span className="text-gradient-gold">BIOGRAPHY</span>
            <span className="block text-2xl sm:text-4xl font-['Noto_Serif_Ethiopic'] text-[#ebe4d3] font-semibold mt-2">
              የህይወትና የጥበብ ጉዞ
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#9aa5b8] font-['Noto_Serif_Ethiopic'] leading-relaxed">
            {lang === 'am'
              ? "ከጎጃም ደብረ ማርቆስ እስከ አዲስ አበባ፤ ከመጀመሪያው የግጥም መድበል እስከ ዴርቶጋዳ አብዮት እና የዓለም አቀፍ እውቅና የተዘረጋው እውነተኛ የታሪክ ማህደር።"
              : "From the monastic heartland of Gojjam to the national bestseller lists and international awards — an archival exhibition of verified literary milestones."}
          </p>
        </div>

        {/* Timeline Exhibition Vertical Rail */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glowing Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-[#d4af37] to-cyan-500 opacity-40 pointer-events-none" />

          <div className="space-y-12">
            {authorTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0e131d] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] z-20">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                  </div>

                  {/* Content Card (Left or Right on desktop) */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="glass-panel p-6 sm:p-7 hover:border-[#d4af37]/40 transition-all duration-300">
                      {/* Year Tag */}
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#d4af37]/15 text-[#e5c358] border border-[#d4af37]/30 mb-2">
                        {item.year}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white font-['Cinzel'] mt-1">
                        {lang === 'am' ? item.titleAm : item.titleEn}
                      </h3>

                      {lang !== 'am' && (
                        <div className="text-xs text-[#d4af37] font-['Noto_Serif_Ethiopic'] font-medium mt-0.5">
                          {item.titleAm}
                        </div>
                      )}

                      {/* Description */}
                      <p className="mt-3 text-sm text-[#9aa5b8] leading-relaxed font-['Noto_Serif_Ethiopic']">
                        {lang === 'am' ? item.descAm : item.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
