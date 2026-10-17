import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

export default function About() {
  const { lang } = useLanguage();

  return (
    <div className="jkr-about-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'ስለ ደራሲ ይስማዕከ ወርቁ' : 'About the Author'} />

      <div className="site-container jkr-about-content max-w-4xl mx-auto py-12 sm:py-20 px-4">
        {/* Editorial Subtitle */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: '#6e685f',
              lineHeight: 1.8,
              fontStyle: 'italic',
            }}
          >
            {lang === 'am'
              ? 'የኢትዮጵያ ሳይንስ ልቦለድ ፈር-ቀዳጅ፣ የደብረ ማርቆስ ዩኒቨርሲቲ መምህርና የ«ዴርቶጋዳ» ደራሲ የህይወትና የስነ-ጽሑፍ ጉዞ።'
              : 'The life, inspirations, and literary journey of one of Ethiopia’s most transformative contemporary novelists.'}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            AUTHOR PORTRAIT & BIOGRAPHY (CENTER ALIGNED)
            ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center text-center space-y-10 mb-20">
          {/* Portrait */}
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-[#c9a84c]/50">
            <img
              src={authorData.portrait}
              alt="Yismake Worku"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Author Titles & Origins */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#1a1714',
                marginBottom: '0.5rem',
              }}
            >
              Yismake Worku · ይስማዕከ ወርቁ
            </h2>
            <p className="text-sm font-bold text-[#c9a84c] tracking-widest uppercase mb-1 font-sans">
              {lang === 'am' ? authorData.titles.am : authorData.titles.en}
            </p>
            <p className="text-xs text-[#8a857d] font-semibold">
              {lang === 'am' ? authorData.origins.am : authorData.origins.en}
            </p>
          </div>

          {/* Long Paragraphs (Center Aligned with generous middle spacing) */}
          <div
            className="space-y-8 max-w-3xl text-[#3d3a35] text-center"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1875rem',
              lineHeight: 2,
            }}
          >
            <p>
              {lang === 'am'
                ? 'ይስማዕከ ወርቁ በዘመናዊው የኢትዮጵያ ስነ-ጽሁፍ ውስጥ ትልቅ የለውጥ ማዕበል ካስነሱ ድንቅ ደራሲያን መካከል ግንባር ቀደሙ ነው። በ22 ዓመቱ በ2001 ዓ.ም ባሳተመው «ዴርቶጋዳ» በተሰኘው ልብ አንጠልጣይ የሳይንስና የስለላ ልቦለዱ የአገሪቱን የመጻሕፍት ገበያ ታሪክ ሰበረ።'
                : 'Yismake Worku is one of the most prolific, transformative, and widely-read contemporary novelists in modern Ethiopian history. Bursting into national consciousness at just twenty-two years old with his 2009 record-breaking techno-thriller Dertogada, he fundamentally redefined Amharic literature.'}
            </p>

            <p>
              {lang === 'am'
                ? 'ጥንታዊውን የኢትዮጵያ ምናባዊ ልብ አንጠልጣይ ጥበብና የብራና ምሥጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂና አገራዊ ሉዓላዊነት ጋር በማዋሃድ አዲስ የአጻጻፍ ፈሊጥ ፈጠረ። በነሐሴ 2009 ዓ.ም የደረሰበትን ከባድ የመኪና አደጋ በጽናት ተቋቁሞ ወደ ጥበብ ዓለም የተመለሰው ደራሲ፣ ሥራዎቹ በአገር ውስጥም ሆነ በዓለም አቀፍ ደረጃ ከፍተኛ ትኩረት ተችሯቸዋል።'
                : 'By synthesizing ancient Ethiopian ecclesiastical scholarship, secret Ge\'ez manuscripts, and fantasy thriller contemplation with orbital rocketry, cybersecurity, geopolitics, and Afrofuturist aspirations, Yismake created a whole new genre for a generation of readers.'}
            </p>

            <p>
              {lang === 'am'
                ? 'ከ«ዴርቶጋዳ» በኋላ «ራማቶሓራ»፣ «ዣንቶዣራ»፣ «ዮራቶራድ» እና «ዮቶድ» የተሰኙ አምስት ተከታታይ ቅጾችን በማሳተም ታላቁን የሳይንስና የስለላ አድማስ አጠናቀቀ። በተጨማሪም በእንግሊዝ አገር ለሽልማት የታጨው «ክቡር ድንጋይ»፣ ፍልስፍናዊ ልቦለዶችና የግጥም መድበሎች የደራሲውን ሀብታም የፈጠራ ዓለም ያሳያሉ።'
                : 'Surviving a catastrophic car accident in August 2017 with inspiring fortitude, his literary universe continues to bridge Ethiopian sovereignty, scientific curiosity, and incisive social satire.'}
            </p>
          </div>

          {/* Author Quote Box (Center Aligned) */}
          <div
            className="p-8 rounded-2xl max-w-2xl text-center relative shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #fbf9f4 0%, #f4efe6 100%)',
              border: '1px solid #c9a84c',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.125rem',
                fontStyle: 'italic',
                color: '#3d372e',
                lineHeight: 1.8,
                marginBottom: '1rem',
              }}
            >
              {lang === 'am'
                ? '«ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም።»'
                : '“Where ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind.”'}
            </p>
            <span className="text-xs font-bold text-[#c9a84c] tracking-widest uppercase">
              — Yismake Worku (ይስማዕከ ወርቁ)
            </span>
          </div>

          {/* Bottom Catalog Links */}
          <div className="pt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/books"
              className="jkr-pill-btn-dark !py-3 !px-8 !text-xs shadow-lg inline-flex items-center gap-2"
            >
              <span>{lang === 'am' ? 'የተሟላ የመጻሕፍት ካታሎግ ይመልከቱ' : 'Explore All Masterpieces in Books'}</span>
              <Icon name="arrowRight" size={15} />
            </Link>

            <a
              href="https://t.me/yismakeworku"
              target="_blank"
              rel="noopener noreferrer"
              className="jkr-pill-btn !py-3 !px-7 !text-xs border border-gray-300 shadow-sm inline-flex items-center gap-2"
            >
              <span>{lang === 'am' ? 'ይፋዊ የቴሌግራም ማህበረሰብ (18.6K+)' : 'Join Official Telegram (18.6K+)'}</span>
              <Icon name="external" size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
