import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { publicInterviewsAndArchive, authorData } from '../data/yismakeData';

export default function Archive() {
  const { lang } = useLanguage();

  return (
    <main className="pt-28 pb-24 bg-[#080b11] text-[#f6f0e2]">
      {/* Header */}
      <section className="relative py-14 sm:py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono tracking-widest uppercase mb-3">
            <span>❖ {lang === 'am' ? 'የሚዲያና የጥናት ማህደር' : 'PUBLIC & MEDIA ARCHIVE'} ❖</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Cinzel'] tracking-tight">
            MEDIA & <span className="text-gradient-cyan">INTERVIEWS</span>
            <span className="block text-2xl sm:text-4xl font-['Noto_Serif_Ethiopic'] text-[#d4af37] font-bold mt-2">
              የሚዲያና የቃለ-መጠይቅ ማህደር
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#9aa5b8] font-['Noto_Serif_Ethiopic'] leading-relaxed">
            {lang === 'am'
              ? "የሰይፉ በኢቢኤስ ዝግጅት፣ የአርትስ ቲቪ ውይይቶች፣ የታይለር ኤንድ ፍራንሲስ አካዳሚያዊ ጥናት እና ይፋዊ የቴሌግራም መድረኮች የተሰባሰቡበት ማህደር።"
              : "Curated broadcast interviews, peer-reviewed academic journal publications, literary podcasts, and community dispatches documenting Yismake Worku's public presence."}
          </p>
        </div>
      </section>

      {/* Main Archival Records Grid */}
      <section className="section-padding">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {publicInterviewsAndArchive.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-8 flex flex-col justify-between hover:border-[#00f0ff]/40 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="badge badge-cyan font-mono text-[10px]">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono text-[#d4af37]">
                      {item.platform}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-['Noto_Serif_Ethiopic'] group-hover:text-[#00f0ff] transition-colors leading-snug">
                    {lang === 'am' ? item.titleAm : item.titleEn}
                  </h3>

                  {lang !== 'am' && (
                    <div className="text-xs text-white/40 font-['Noto_Serif_Ethiopic'] mt-1">
                      {item.titleAm}
                    </div>
                  )}

                  <p className="mt-4 text-sm text-[#ebe4d3] leading-relaxed font-['Noto_Serif_Ethiopic']">
                    {lang === 'am' ? item.summaryAm : item.summaryEn}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyan text-xs inline-flex items-center gap-2"
                  >
                    <span>{lang === 'am' ? 'ማህደሩን ይመልከቱ' : 'Access Record'}</span>
                    <span>↗</span>
                  </a>

                  <span className="text-[11px] font-mono text-white/40">Verified Source</span>
                </div>
              </div>
            ))}
          </div>

          {/* Special Telegram Channel Deep-Link Card */}
          <div className="mt-12 max-w-5xl mx-auto glass-panel-gold p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-mono mb-1">
                {lang === 'am' ? 'የቀጥታ ማህበረሰብ' : 'Live Community Stream'}
              </div>
              <h3 className="text-2xl font-bold text-white font-['Noto_Serif_Ethiopic']">
                Telegram: {authorData.telegram.handle}
              </h3>
              <p className="mt-1 text-sm text-[#ebe4d3] font-['Noto_Serif_Ethiopic'] max-w-lg">
                {lang === 'am'
                  ? "ከ18,600 በላይ አባላት ባሉበት ቻናል ላይ አዳዲስ የደራሲነት ማስታወሻዎችንና ቅኔዎችን በየዕለቱ ያግኙ።"
                  : "Daily reflections, Amharic poetic fragments, and literary discussions with 18,600+ subscribers."}
              </p>
            </div>

            <a
              href={authorData.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0 text-sm"
            >
              <span>{lang === 'am' ? 'ቻናሉን ይቀላቀሉ' : 'Open Telegram'}</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
