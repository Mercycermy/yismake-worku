import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData, authorTimeline } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

export default function About() {
  const { lang } = useLanguage();

  const milestoneIcons = [
    'feather',
    'telescope',
    'spark',
    'building',
    'theatre',
    'bookOpen',
    'shield',
    'medal',
    'archive',
  ];

  const milestoneTags = [
    { en: 'POETIC GENESIS', am: 'የጥበብ ጅማሮ' },
    { en: 'HISTORIC BREAKTHROUGH', am: 'ታሪካዊ አብዮት' },
    { en: 'STORYWORLD EXPANSION', am: 'የዓለሙ መስፋፋት' },
    { en: 'ACADEMIC RECOGNITION', am: 'አካዳሚያዊ አድናቆት' },
    { en: 'SATIRICAL MASTERPIECE', am: 'ማህበራዊ ምጸት' },
    { en: 'PENTOLOGY CULMINATION', am: 'አምስቱ ድርሰቶች' },
    { en: 'RESILIENCE & RECOVERY', am: 'ጽናትና ተጋድሎ' },
    { en: 'UK TRANSLATION PRIZE', am: 'የእንግሊዝ ሽልማት' },
    { en: 'THE LIVING ARCHIVE', am: 'የቀጠለው አሻራ' },
  ];

  const pillars = [
    {
      num: '፩',
      badgeEn: 'PILLAR 01',
      badgeAm: 'ምሰሶ ፩',
      icon: 'scroll',
      titleEn: 'Monastic Science & Sacred Ge’ez Hermeneutics',
      titleAm: 'የገዳማት ጥበብና የግዕዝ ምስጢር',
      descEn: 'Unearthing ancient Ethiopian ecclesiastical manuscripts, astronomical parchments, and monastic contemplation as an architectural blueprint for modern African speculative fiction.',
      descAm: 'ጥንታዊ የኢትዮጵያ የገዳማት ብራናዎችን፣ የከዋክብት ስሌቶችንና መንፈሳዊ ጥበቦችን ለዘመናዊው የሳይንስ ልቦለድ መነሻና አዕማድ ማድረግ።',
      books: ['Dertogada', 'Ramatohara']
    },
    {
      num: '፪',
      badgeEn: 'PILLAR 02',
      badgeAm: 'ምሰሶ ፪',
      icon: 'telescope',
      titleEn: 'Technological Sovereignty & Afrofuturism',
      titleAm: 'የቴክኖሎጂ ሉዓላዊነትና የጠፈር ምርምር',
      descEn: 'Reversing brain drain by imagining a subterranean quantum laboratory beneath Lake Tana where top diaspora minds return to build an independent Ethiopian aerospace civilization.',
      descAm: 'በጣና ሐይቅ ስር የተሰወረ የጠፈርና የኳንተም ሳይንስ ማዕከል በመፍጠር፣ የተሰደዱ ኢትዮጵያውያን ምሁራን ለአገራቸው የሳይንስ ትንሳኤ የሚተጉበትን ራዕይ መቅረጽ።',
      books: ['Dertogada', 'Xantoxara', 'Yotod']
    },
    {
      num: '፫',
      badgeEn: 'PILLAR 03',
      badgeAm: 'ምሰሶ ፫',
      icon: 'theatre',
      titleEn: 'Incisive Allegorical Satire & Social Critique',
      titleAm: 'ማህበራዊና ፖለቲካዊ ምጸት',
      descEn: 'Using biting magical realism and picaresque humor to hold a mirror to societal greed, bureaucratic corruption, urban alienation, and systemic injustice.',
      descAm: 'በአስማታዊ እውነታዊነትና በማህበራዊ ምጸት ታግዞ የሰው ልጅን ስግብግብነት፣ የአስተዳደር መበላሸትን፣ የከተማ ገመናንና ፍትህ ማጣትን በድፍረት መመርመር።',
      books: ['Kebur Dengay', 'Yekend Awta Nuro', 'Gefuan']
    },
    {
      num: '፬',
      badgeEn: 'PILLAR 04',
      badgeAm: 'ምሰሶ ፬',
      icon: 'shield',
      titleEn: 'Creative Fortitude & The Unconquered Mind',
      titleAm: 'ጽናትና የማይበገር የፈጠራ መንፈስ',
      descEn: 'Overcoming near-fatal physical trauma after the August 2017 accident with resolute creative bravery, showing that while bodies can be confined, sovereign imagination is infinite.',
      descAm: 'በነሐሴ 2009 ዓ.ም የደረሰበትን አሰቃቂ አደጋ በጽናት በማለፍ፣ አካል ቢታሰርና ቢጎዳም የሰው ልጅ ነጻ ህሊናና ፈጠራ ግን የማይገደብ መሆኑን በህይወቱ ማረጋገጥ።',
      books: ['Tekerchem', 'Zamra']
    },
  ];

  return (
    <div className="jkr-about-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'ስለ ደራሲ ይስማዕከ ወርቁ' : 'About the Author'} />

      <div className="site-container jkr-about-content max-w-5xl mx-auto py-12 sm:py-20">
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
              : 'The life, inspirations, and literary journey of one of Ethiopia’s most transformative contemporary novelists.'}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            1. AUTHOR PROFILE & LITERARY GENESIS
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
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
                  Gojjam (Lake Tana Basin) &amp; Addis Ababa
                </div>
              </div>
            </div>

            {/* Quick Author Fact Chips */}
            <div className="w-full grid grid-cols-2 gap-3 max-w-sm">
              {[
                { label: lang === 'am' ? 'የትውልድ ስፍራ' : 'Origins', val: 'Gojjam / Tana' },
                { label: lang === 'am' ? 'የታተሙ መጻሕፍት' : 'Books Published', val: '15+ Works' },
                { label: lang === 'am' ? 'የመጀመሪያ እትም ሽያጭ' : 'Debut Sales', val: '200,000+ Copies' },
                { label: lang === 'am' ? 'የእንግሊዝ ሽልማት' : 'UK Translation', val: 'TA Prize Finalist' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#f7f5f0] border border-[#e8e2d5] rounded-lg text-center shadow-2xs"
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
                    {f.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.875rem',
                      fontWeight: 800,
                      color: '#1a1714',
                    }}
                  >
                    {f.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-[#3d3a35]">
            <div>
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
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
                  fontWeight: 800,
                  color: '#1a1714',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                {lang === 'am'
                  ? 'የኢትዮጵያ ስነ-ጽሑፍን በአዲስ ምናብ የቀየረው ደራሲ'
                  : 'Redefining African Literature Through Speculative Sovereignty'}
              </h2>
            </div>

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', lineHeight: 1.8 }}>
              {lang === 'am' ? authorData.bio.am : authorData.bio.en}
            </p>

            {/* Stylized Philosophy Callout */}
            <div
              style={{
                padding: '1.5rem 1.75rem',
                background: 'linear-gradient(135deg, #fbf9f4 0%, #f4efe6 100%)',
                borderLeft: '4px solid #c9a84c',
                borderRadius: '0 10px 10px 0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                borderTop: '1px solid #e8e2d5',
                borderBottom: '1px solid #e8e2d5',
                borderRight: '1px solid #e8e2d5',
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
                }}
              >
                {lang === 'am'
                  ? '«ጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የጠፈር ምርምር፣ ቴክኖሎጂ እና አገራዊ ሉዓላዊነት ጋር የሚገናኝበት ድንቅ የልቦለድ ዓለም።»'
                  : '“Where ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind.”'}
              </p>
              <div className="flex items-center justify-between text-xs text-[#c9a84c] font-bold">
                <span>— Yismake Worku</span>
                <span>የአጻጻፍ ፍልስፍና</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Thematic Foundations */}
        <div className="jkr-about-foundations pt-20 pb-24 border-t border-[#e8e2d5]">
          <div className="text-center mb-14">
            <div className="jkr-gold-divider mb-4">
              <Icon name="spark" size={15} />
            </div>
            <span className="jkr-section-badge mb-4">
              {lang === 'am' ? 'የደራሲው ዋነኛ አዕማድ' : 'Architectural Pillars'}
            </span>
            <h2 className="jkr-section-heading mb-4">
              {lang === 'am' ? 'የስነ-ጽሑፍ ፍልስፍና መሠረቶች' : 'Core Thematic Foundations'}
            </h2>
            <p className="jkr-section-lead">
              {lang === 'am'
                ? 'በይስማዕከ ወርቁ ልቦለዶችና ኢ-ልቦለዶች ውስጥ የሚንጸባረቁ አራት ታላላቅ ርዕዮተ-ዓለማት'
                : 'The four intellectual cornerstones that distinguish Yismake Worku’s canon in modern African literature.'}
            </p>
          </div>

          <div className="jkr-pillar-grid">
            {pillars.map((pillar, pIdx) => (
              <div key={pIdx} className="jkr-pillar-card group">
                <span className="jkr-pillar-card__watermark">{pillar.num}</span>
                <div className="flex items-center gap-3 mb-4">
                  <div className="jkr-pillar-card__icon-ring"><Icon name={pillar.icon} size={22} /></div>
                  <span className="jkr-section-badge jkr-section-badge--dark !text-[10px] !py-1">
                    {lang === 'am' ? pillar.badgeAm : pillar.badgeEn}
                  </span>
                </div>
                <h3
                  className="font-serif text-xl sm:text-2xl font-extrabold text-[#1a1714] mb-3 leading-snug group-hover:text-[#b8860b] transition-colors"
                >
                  {lang === 'am' ? pillar.titleAm : pillar.titleEn}
                </h3>
                <p className="text-sm sm:text-base text-[#555047] leading-relaxed mb-5 font-serif">
                  {lang === 'am' ? pillar.descAm : pillar.descEn}
                </p>
                <div className="pt-4 border-t border-[#f0ebe3] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-[#8a857d] uppercase tracking-wider w-full sm:w-auto">
                    {lang === 'am' ? 'ቁልፍ መጻሕፍት' : 'Key Works'}
                  </span>
                  {pillar.books.map((bk, bIdx) => (
                    <Link
                      key={bIdx}
                      to="/books"
                      className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#fbf9f4] border border-[#e8dfc8] text-[#4a4235] hover:border-[#c9a84c] hover:text-[#b8860b] transition-colors"
                    >
                      {bk}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Literary Journey */}
        <div className="jkr-about-journey pt-20 border-t border-[#e8e2d5]">
          <div className="text-center mb-14">
            <div className="jkr-gold-divider mb-4">
              <Icon name="spark" size={15} />
            </div>
            <span className="jkr-section-badge mb-4">
              {lang === 'am' ? 'የህይወትና የደራሲነት ጉዞ' : 'Chronicles of Mastery'}
            </span>
            <h2 className="jkr-section-heading mb-4">
              {lang === 'am' ? 'ዋና ዋና የስነ-ጽሑፍ ምዕራፎች' : 'The Literary Journey'}
            </h2>
            <p className="jkr-section-lead">
              {lang === 'am'
                ? 'ከመጀመሪያው የግጥም መድበል እስከ ዓለም አቀፍ የትርጉም ሽልማት እጩነት'
                : 'A chronological odyssey of breakthrough works, national phenomena, and international honors.'}
            </p>
          </div>

          <div className="jkr-journey-rail max-w-3xl mx-auto">
            {authorTimeline.map((item, idx) => {
              const icon = milestoneIcons[idx] || 'spark';
              const tag = milestoneTags[idx] || { en: 'LITERARY MILESTONE', am: 'የስነ-ጽሑፍ ምዕራፍ' };

              return (
                <div key={idx} className="jkr-journey-item group">
                  <div className="jkr-journey-node"><Icon name={icon} size={15} /></div>
                  <div className="jkr-journey-card">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="jkr-section-badge jkr-section-badge--dark !text-[10px] !py-0.5">
                        {lang === 'am' ? tag.am : tag.en}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#8a857d] bg-[#f5f3ef] px-2.5 py-0.5 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-extrabold text-[#1a1714] mb-2 leading-snug group-hover:text-[#b8860b] transition-colors">
                      {lang === 'am' ? item.titleAm : item.titleEn}
                    </h3>
                    <p className="text-sm text-[#5a554c] leading-relaxed font-serif">
                      {lang === 'am' ? item.descAm : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
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
    </div>
  );
}
