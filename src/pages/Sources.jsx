import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { academicSources } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

export default function Sources() {
  const { lang } = useLanguage();

  return (
    <div className="bg-white text-[#222222] font-sans antialiased">
      <PageBanner title={lang === 'am' ? 'የመረጃ ምንጮች' : 'Sources & Bibliography'} />

      <div className="site-container max-w-4xl mx-auto py-14 sm:py-20">
        {/* Page Subtitle */}
        <div className="text-center mb-14">
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'በዚህ ድረ-ገጽ ላይ የቀረቡት መረጃዎች፣ የህትመት ዘመናት፣ የሽያጭ መረጃዎችና የህይወት ታሪኮች የተሰባሰቡባቸው ተአማኒ የአካዳሚ፣ የአሳታሚና የሚዲያ ምንጮች ዝርዝር።'
              : 'Rigorous scholarly transparency: Every factual milestone, publication date, translator credential, and biographical record on this site is cross-referenced with verified academic and literary sources.'}
          </p>
        </div>

        {/* Editorial Standards Card */}
        <div className="p-6 sm:p-8 bg-[#fafafa] border-l-4 border-[#111111] border border-gray-200 rounded-sm mb-12 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#111111] uppercase tracking-wider mb-2">
            {lang === 'am' ? 'የመረጃ ማረጋገጫ መርህ' : 'Editorial & Archival Standards'}
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#444444] leading-relaxed">
            {lang === 'am'
              ? 'በዚህ ድረ-ገጽ ላይ ያልተረጋገጡ ወይም የተፈበረኩ ወሬዎች ፈጽሞ አልተካተቱም። የተጠቀሱት 15+ መጻሕፍት፣ በታይለር ኤንድ ፍራንሲስ የታተመው አካዳሚያዊ ጥናት፣ በእንግሊዝ አገር ለሽልማት የቀረበው የትርጉም ስራ እና የደራሲው ቃለ-መጠይቆች በገለልተኛ አካላት ተረጋግጠው የቀረቡ ናቸው።'
              : 'No fabricated quotes, speculative gossip, or unverified claims are featured on this digital archive. Bibliographic data, sales figures, and biographical details are cross-referenced across peer-reviewed African literary studies (Taylor & Francis), Addis Ababa University theses, official publisher catalogs, and direct broadcast interviews.'}
          </p>
        </div>

        {/* Source Citations List */}
        <div className="space-y-6">
          {academicSources.map((source, idx) => (
            <article
              key={idx}
              className="p-6 sm:p-8 bg-white border border-gray-200 hover:border-gray-400 rounded-sm shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                <span className="bg-gray-100 text-[#111111] px-3 py-1 rounded-full font-bold text-[10px]">
                  {source.type}
                </span>
                {source.year && (
                  <span className="font-bold text-[#888888]">PUBLISHED: {source.year}</span>
                )}
              </div>

              <h3 className="font-serif text-xl font-bold text-[#111111] leading-snug mb-2">
                {source.title}
              </h3>

              {source.authors && (
                <div className="text-xs text-[#555555] mb-1 font-serif">
                  <span className="font-semibold text-[#111111]">Authors / Scholars:</span> {source.authors}
                </div>
              )}

              {source.publication && (
                <div className="text-xs text-[#555555] mb-1 font-serif">
                  <span className="font-semibold text-[#111111]">Publication:</span> {source.publication}
                </div>
              )}

              {source.translator && (
                <div className="text-xs text-[#8b3a3a] mb-1 font-serif">
                  <span className="font-semibold text-[#111111]">Translator:</span> {source.translator}
                </div>
              )}

              {source.recognition && (
                <div className="text-xs text-[#c59b27] font-bold mt-2 font-serif">
                  <Icon name="star" size={13} className="inline-block align-[-2px] mr-1" /> {source.recognition}
                </div>
              )}

              {source.publisher && (
                <div className="text-xs text-[#777777] mt-1 font-serif">
                  <span className="font-semibold text-[#111111]">Publisher / Entity:</span> {source.publisher}
                </div>
              )}

              {source.subscribers && (
                <div className="text-xs text-[#777777] mt-1 font-serif">
                  <span className="font-semibold text-[#111111]">Audience:</span> {source.subscribers}
                </div>
              )}

              {source.url && (
                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jkr-pill-btn-dark !text-xs !py-1.5 !px-5 inline-flex items-center gap-1.5"
                  >
                    <span>{lang === 'am' ? 'ዋናውን ምንጭ ይመልከቱ' : 'Access Primary Source'}</span>
                    <Icon name="external" size={13} />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
