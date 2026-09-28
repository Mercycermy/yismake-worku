import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData, authorTimeline } from '../data/yismakeData';
import AuthorSignature from '../components/AuthorSignature';

export default function About() {
  const { lang } = useLanguage();

  return (
    <div className="bg-white text-[#222222] font-sans py-14 sm:py-20">
      <div className="site-container max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-14 pb-8 border-b border-gray-200">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] mb-4">
            {lang === 'am' ? 'ስለ ደራሲ ይስማዕከ ወርቁ' : 'About Yismake Worku'}
          </h1>
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'የኢትዮጵያ ሳይንስ ልቦለድ ፈር-ቀዳጅ፣ የደብረ ማርቆስ ዩኒቨርሲቲ መምህርና የ«ዴርቶጋዳ» ደራሲ የህይወት ጉዞ።'
              : 'The life, inspirations, and literary journey of one of Ethiopia’s most transformative contemporary novelists.'}
          </p>
        </div>

        {/* Lead Biographical Section with Polaroid Framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Layered Polaroid Photo Stack (Matching JKR) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="jkr-polaroid-stack">
              <div className="jkr-polaroid-back-1">
                <div className="w-full h-56 bg-gray-200 overflow-hidden">
                  <img
                    src="/images/library-bg.jpg"
                    alt="Archival notes"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="jkr-polaroid-back-2">
                <div className="w-full h-56 bg-gray-200 overflow-hidden">
                  <img
                    src="/images/dertogada-art.jpg"
                    alt="Dertogada Universe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="jkr-polaroid-front">
                <div className="w-full h-64 bg-gray-900 overflow-hidden mb-3">
                  <img
                    src={authorData.portrait}
                    alt="Yismake Worku"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-serif text-sm font-semibold text-[#333333]">
                  Yismake Worku
                </div>
                <div className="text-[11px] text-[#777777] font-sans">
                  Gojjam &amp; Addis Ababa, Ethiopia
                </div>
              </div>
            </div>
          </div>

          {/* Longform Narrative */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-[#333333] font-serif">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {lang === 'am' ? 'የህይወትና የስነ-ጽሑፍ ታሪክ' : 'Early Life & The Breakthrough'}
            </h2>

            <p>{lang === 'am' ? authorData.bio.am : authorData.bio.en}</p>

            <div className="p-5 bg-[#fafafa] border-l-4 border-[#111111] rounded-sm text-base italic text-[#444444]">
              {lang === 'am'
                ? "«ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም።»"
                : "“Where ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind.”"}
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 text-xs font-sans">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Origins</span>
                <span className="text-[#111111] font-serif font-bold text-sm">Gojjam / Lake Tana</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Published Novels</span>
                <span className="text-[#111111] font-bold text-sm">15+ Books</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Dertogada Debut</span>
                <span className="text-[#111111] font-bold text-sm">200,000+ Copies</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">UK Award</span>
                <span className="text-[#111111] font-bold text-sm">TA Prize Shortlist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Life Milestones Timeline */}
        <div className="pt-16 border-t border-gray-200">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {lang === 'am' ? 'የህይወትና የደራሲነት ዋና ዋና ምዕራፎች' : 'Milestones in the Literary Journey'}
            </h2>
          </div>

          <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-28 space-y-12 pl-6 sm:pl-10">
            {authorTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#111111] group-hover:bg-[#111111] transition-colors" />

                {/* Year Label */}
                <div className="text-xs sm:text-sm font-bold text-[#888888] uppercase tracking-wider mb-1">
                  {item.year}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mb-2">
                  {lang === 'am' ? item.titleAm : item.titleEn}
                </h3>

                {/* Description */}
                <p className="font-serif text-base text-[#555555] leading-relaxed max-w-2xl">
                  {lang === 'am' ? item.descAm : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Signature & Call to Action */}
        <div className="mt-20 pt-12 border-t border-gray-200 text-center">
          <AuthorSignature className="h-14 w-auto text-[#111111] mx-auto mb-5" light={false} />
          <Link
            to="/books"
            className="jkr-pill-btn-dark"
          >
            {lang === 'am' ? 'የተሟላ 15+ መጻሕፍት ካታሎግ ይመልከቱ' : 'Explore The Books →'}
          </Link>
        </div>
      </div>
    </div>
  );
}
