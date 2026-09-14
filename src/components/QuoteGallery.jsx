import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { verifiedQuotes } from '../data/yismakeData';

export default function QuoteGallery() {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const themes = [
    { id: 'all', labelEn: 'All Reflections', labelAm: 'ሁሉም አባባሎች' },
    { id: 'Sovereignty & Heritage', labelEn: 'Sovereignty & Heritage', labelAm: 'ሉዓላዊነትና ቅርስ' },
    { id: 'Hope & Consciousness', labelEn: 'Hope & Consciousness', labelAm: 'ተስፋና ህሊና' },
    { id: 'Human Nature & Psychology', labelEn: 'Human Nature', labelAm: 'የሰው ባህሪ' },
    { id: 'Social Satire & Power', labelEn: 'Social Satire', labelAm: 'ማህበራዊ ምጸት' },
    { id: 'Science & Monasticism', labelEn: 'Science & Wisdom', labelAm: 'ሳይንስና ገዳማዊ ጥበብ' }
  ];

  const filteredQuotes = activeFilter === 'all'
    ? verifiedQuotes
    : verifiedQuotes.filter(q => q.theme === activeFilter);

  return (
    <section id="quotes" className="relative section-padding bg-[#080b11] overflow-hidden">
      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-3">
            <span>❖ {lang === 'am' ? 'የተረጋገጡ የደራሲው ሀሳቦች' : 'VERIFIED REFLECTIONS'} ❖</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white font-['Cinzel'] tracking-tight">
            LITERARY <span className="text-gradient-cyan">THOUGHTS</span>
            <span className="block text-2xl sm:text-4xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] font-semibold mt-2">
              ጥልቅ እይታዎችና ጥቅሶች
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#9aa5b8] font-['Noto_Serif_Ethiopic']">
            {lang === 'am'
              ? "ከዴርቶጋዳ፣ ሜሎስ፣ ክቡር ድንጋይ እና ከደራሲው ቃለ-መጠይቆች የተወሰዱ ትክክለኛ ፍልስፍናዊ አስተውሎቶች።"
              : "Authentic excerpts and philosophical observations extracted directly from Yismake Worku's published works and verified public commentary."}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {themes.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {lang === 'am' ? tab.labelAm : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredQuotes.map((q) => (
            <div
              key={q.id}
              className="glass-panel p-8 relative flex flex-col justify-between hover:border-[#00f0ff]/40 transition-all duration-300"
            >
              {/* Top Quote Icon */}
              <div className="text-3xl text-[#d4af37] font-serif leading-none mb-3 opacity-60">
                “
              </div>

              {/* Quote Body */}
              <blockquote className="text-base sm:text-lg text-white font-['Noto_Serif_Ethiopic'] leading-relaxed font-medium">
                {lang === 'am' ? q.quoteAm : q.quoteEn}
              </blockquote>

              {/* Translation alternative below if in EN mode */}
              {lang !== 'am' && (
                <div className="mt-3 text-xs text-white/50 font-['Noto_Serif_Ethiopic'] italic">
                  "{q.quoteAm}"
                </div>
              )}

              {/* Footer Citation & Verified Badge */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#d4af37]">
                  {lang === 'am' ? q.sourceAm : q.sourceEn}
                </span>

                <span className="flex items-center gap-1 text-cyan-400 text-[11px]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{lang === 'am' ? 'የተረጋገጠ' : 'Verified'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
