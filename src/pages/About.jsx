import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData, authorHighlights } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

export default function About() {
  const { lang } = useLanguage();

  // Filter out any "Original Language" or "Amharic" type highlights
  const filteredHighlights = authorHighlights.filter((fact) => {
    const val = (fact.value || '').toLowerCase();
    const label = (fact.labelEn || '').toLowerCase();
    return !val.includes('amharic') && !label.includes('language') && !label.includes('ቋንቋ');
  });

  return (
    <div
      className="jkr-about-page"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        minHeight: '100vh',
      }}
    >
      <PageBanner title={lang === 'am' ? 'ስለ ደራሲ ይስማዕከ ወርቁ' : 'About the Author'} />

      <div className="site-container jkr-about-content max-w-5xl mx-auto py-12 sm:py-20 px-4">
        {/* Editorial Subtitle */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.125rem',
              color: '#6e685f',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {lang === 'am'
              ? 'የኢትዮጵያ ሳይንስ ልቦለድ ፈር-ቀዳጅ፣ የደብረ ማርቆስ ዩኒቨርሲቲ መምህርና የ«ዴርቶጋዳ» ደራሲ የህይወትና የስነ-ጽሑፍ ጉዞ።'
              : "The life, inspirations, and literary journey of one of Ethiopia's most transformative contemporary novelists."}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            AUTHOR PROFILE & LITERARY GENESIS
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Portrait & Key Facts */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Polaroid Photo Stack */}
            <div className="jkr-polaroid-stack mb-8">
              <div className="jkr-polaroid-back-1">
                <div style={{ width: '100%', height: '230px', overflow: 'hidden', background: '#edeae4' }}>
                  <img src="/images/library-bg.jpg" alt="Archival notes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="jkr-polaroid-back-2">
                <div style={{ width: '100%', height: '230px', overflow: 'hidden', background: '#edeae4' }}>
                  <img src="/images/dertogada-art.jpg" alt="Dertogada Universe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="jkr-polaroid-front shadow-2xl">
                <div style={{ width: '100%', height: '270px', overflow: 'hidden', background: '#1a1714', marginBottom: '12px' }}>
                  <img src={authorData.portrait} alt="Yismake Worku" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 800, color: '#1a1714' }}>
                  Yismake Worku · ይስማዕከ ወርቁ
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#8a857d', fontWeight: 600 }}>
                  Gojjam &amp; Addis Ababa, Ethiopia
                </div>
              </div>
            </div>

            {/* Quick Author Fact Chips (Without Original Language) */}
            <div className="jkr-about-highlights w-full grid grid-cols-2 gap-3 max-w-sm">
              {filteredHighlights.map((fact) => (
                <div
                  key={fact.labelEn}
                  className="jkr-about-highlight p-3 bg-[#f7f5f0] border border-[#e8e2d5] rounded-xl text-center shadow-2xs"
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#c9a84c',
                      marginBottom: '2px',
                    }}
                  >
                    {lang === 'am' ? fact.labelAm : fact.labelEn}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.9375rem',
                      fontWeight: 800,
                      color: '#1a1714',
                    }}
                  >
                    {lang === 'am' ? fact.valueAm : fact.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="jkr-about-signature mt-6 max-w-sm text-center">
              <span className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-widest block mb-1">
                {lang === 'am' ? 'የስነ-ጽሑፍ ልዩ ድምፅ' : 'A LITERARY SIGNATURE'}
              </span>
              <p className="text-xs text-[#6e685f] italic" style={{ fontFamily: 'var(--font-serif)' }}>
                "{lang === 'am' ? authorData.literarySignature.am : authorData.literarySignature.en}"
              </p>
            </div>
          </div>

          {/* Right Column: Bio Narrative with Centered Alignment & Pleasant Spacing */}
          <div className="lg:col-span-7 space-y-8">
            <div className="text-center lg:text-left">
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#c9a84c',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                {lang === 'am' ? 'የደራሲው የህይወት ታሪክ' : 'Biography & Worldview'}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.45rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                {lang === 'am'
                  ? 'የኢትዮጵያ ስነ-ጽሑፍን በአዲስ ምናብ የቀየረው ደራሲ'
                  : 'Redefining African Literature Through Speculative Sovereignty'}
              </h2>
            </div>

            {/* Long paragraph with center alignment and comfortable space in middle */}
            <div
              style={{
                textAlign: 'center',
                maxWidth: '620px',
                margin: '0 auto',
                padding: '1rem 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.0625rem',
                  lineHeight: 2.2,
                  letterSpacing: '0.01em',
                  color: '#3d3a35',
                  marginBottom: '2rem',
                }}
              >
                {lang === 'am'
                  ? 'ይስማዕከ ወርቁ በዘመናዊው የኢትዮጵያ ስነ-ጽሑፍ ውስጥ ትልቅ የለውጥ ማዕበል ካስነሱ ድንቅ ደራሲያን መካከል ግንባር ቀደሙ ነው። በ22 ዓመቱ በ2001 ዓ.ም ባሳተመው «ዴርቶጋዳ» በተሰኘው ልብ አንጠልጣይ የሳይንስና የስለላ ልቦለዱ የአገሪቱን የመጻሕፍት ገበያ ታሪክ ሰበረ።'
                  : "Yismake Worku is one of the most prolific, transformative, and widely-read contemporary novelists in modern Ethiopian history. Bursting into national consciousness at just twenty-two years old with his 2009 record-breaking techno-thriller 'Dertogada', he fundamentally redefined Amharic literature."}
              </p>

              {/* Decorative Middle Space Break */}
              <div className="flex items-center justify-center gap-3 my-6">
                <span className="w-12 h-px bg-[#c9a84c]/40" />
                <span className="text-[#c9a84c] text-xs">✦ ✦ ✦</span>
                <span className="w-12 h-px bg-[#c9a84c]/40" />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.0625rem',
                  lineHeight: 2.2,
                  letterSpacing: '0.01em',
                  color: '#3d3a35',
                  marginTop: '1.5rem',
                }}
              >
                {lang === 'am'
                  ? 'ጥንታዊውን የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምሥጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂና አገራዊ ሉዓላዊነት ጋር በማዋሃድ አዲስ የአጻጻፍ ፈሊጥ ፈጠረ። በነሐሴ 2009 ዓ.ም የደረሰበትን ከባድ የመኪና አደጋ በጽናት ተቋቁሞ ወደ ጥበብ ዓለም የተመለሰው ደራሲ፣ ሥራዎቹ በአገር ውስጥም ሆነ በዓለም አቀፍ ደረጃ ከፍተኛ ትኩረት ተችሯቸዋል።'
                  : "By synthesizing ancient Ethiopian ecclesiastical scholarship, secret Ge'ez manuscripts, and monastic contemplation with orbital rocketry, cybersecurity, geopolitics, and Afrofuturist aspirations, Yismake created a whole new genre for a generation of readers. Surviving a catastrophic car accident in August 2017 with inspiring fortitude, his literary universe continues to bridge Ethiopian sovereignty, scientific curiosity, and incisive social satire."}
              </p>
            </div>

            {/* Stylized Philosophy Callout */}
            <div
              style={{
                padding: '1.5rem 1.75rem',
                background: 'linear-gradient(135deg, #fbf9f4 0%, #f4efe6 100%)',
                borderLeft: '4px solid #c9a84c',
                borderRadius: '0 12px 12px 0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                borderTop: '1px solid #e8e2d5',
                borderBottom: '1px solid #e8e2d5',
                borderRight: '1px solid #e8e2d5',
                marginTop: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: '#3d372e',
                  lineHeight: 1.7,
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                }}
              >
                {lang === 'am'
                  ? '«ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም።»'
                  : '"Where ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind."'}
              </p>
              <div className="flex items-center justify-between text-xs text-[#c9a84c] font-bold">
                <span>— Yismake Worku</span>
                <span>{lang === 'am' ? 'የአጻጻፍ ፍልስፍና' : 'Literary Philosophy'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Catalog Links */}
        <div className="mt-16 text-center pt-10 border-t border-[#e8e2d5] flex flex-wrap justify-center gap-4">
          <Link
            to="/books"
            className="jkr-pill-btn-dark !py-3 !px-8 !text-xs shadow-lg inline-flex items-center gap-2"
          >
            <span>{lang === 'am' ? 'የተሟላ 15+ መጻሕፍት ካታሎግ ይመልከቱ' : 'Explore All 15+ Masterpieces in Books'}</span>
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
  );
}
