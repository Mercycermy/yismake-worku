import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';
import BookSlider from '../components/BookSlider';
import Icon from '../components/Icon';

export default function Books() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const categories = [
    {
      id: 'dertogada-sequel',
      titleEn: 'Dertogada Sequel',
      titleAm: 'የዴርቶጋዳ ተከታታይ መጻሕፍት',
      subtitleEn: 'The monumental 5-part speculative saga: Dertogada, Ramatohara, Zhantozhara, Yoratorad, and Yotod.',
      subtitleAm: 'በኢትዮጵያ ስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት የፈጠሩት አምስቱ ተከታታይ የሳይንስና የስለላ ልቦለዶች።',
      slugs: ['dertogada', 'ramatohara', 'xantoxara', 'yoratorad', 'yotod']
    },
    {
      id: 'kibur-dingay-sequel',
      titleEn: 'Kibur Dingay Sequel',
      titleAm: 'የክቡር ድንጋይ ተከታታይ መጻሕፍት',
      subtitleEn: 'The internationally acclaimed masterpiece and its gripping geopolitical thrillers.',
      subtitleAm: 'በእንግሊዝ አገር የታጨው «ክቡር ድንጋይ»፣ «ደህንነቱ» እና «የኦጋዴን ድመቶች»።',
      slugs: ['kebur-dengay', 'dehinetu', 'yeogaden-demetoch']
    },
    {
      id: 'other-novels',
      titleEn: 'Other Novels',
      titleAm: 'ሌሎች ልቦለዶች',
      subtitleEn: 'Independent masterworks of philosophy, human struggle, and social satire.',
      subtitleAm: 'ተልሚድ፣ ተከርቸም፣ ዘምራ እና ሜሎስ — የተለያዩ ማህበራዊና ፍልስፍናዊ ድንቅ ልቦለዶች።',
      slugs: ['telmid', 'tekerchem', 'zamra', 'melos']
    },
    {
      id: 'poetry-books',
      titleEn: 'Poetry Books',
      titleAm: 'የግጥም መጻሕፍት',
      subtitleEn: 'Poignant verses, cultural reflections, and early artistic masterpieces.',
      subtitleAm: 'የደራሲው የወጣትነት የግጥም መድበሎችና ማህበራዊ ምጸቶች፡ «የወንድ ምጥ» እና «የቀንድ አውጣ ኑሮ»።',
      slugs: ['yewond-mit', 'yekend-awta-nuro']
    }
  ];

  return (
    <div className="jkr-books-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'መጻሕፍት' : 'Books Catalogue'} />

      <div className="site-container max-w-6xl mx-auto py-12 px-4 space-y-20">
        {/* Intro Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="jkr-gold-divider mb-3">
            <Icon name="spark" size={15} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#1a1714',
              marginBottom: '0.5rem',
            }}
          >
            {lang === 'am' ? 'አራቱ ዋነኛ የድርሰት ዘርፎች' : '4 Canonical Categories'}
          </h2>
          <p className="font-serif text-[#6e685f] text-base">
            {lang === 'am'
              ? 'ከታች ባሉት የድርሰት ዘርፎች ውስጥ የመጻሕፍቱን ተንቀሳቃሽ ምስሎች ይመልከቱ። ዘርፉን በመጫን ሙሉ ዝርዝራቸውን ማየት ይችላሉ።'
              : 'Browse each category using the interactive book slider. Click any category title to open its complete dedicated list.'}
          </p>
        </div>

        {/* The 4 Canonical Categories */}
        {categories.map((cat, idx) => {
          const categoryBooks = cat.slugs
            .map((s) => verifiedBooks.find((b) => b.slug === s))
            .filter(Boolean);

          return (
            <div
              key={cat.id}
              className="category-section p-6 sm:p-10 rounded-2xl bg-white border border-[#e8e2d5] shadow-md hover:shadow-xl transition-all"
            >
              {/* Category Header (Clicking navigates to CategoryDetail) */}
              <div
                onClick={() => navigate(`/books/category/${cat.id}`)}
                className="cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#e8e2d5]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold font-mono text-[#c9a84c] px-2.5 py-0.5 rounded bg-[#1a1714]">
                      CATEGORY 0{idx + 1}
                    </span>
                    <span className="text-xs text-[#8a857d] font-semibold">
                      {categoryBooks.length} {lang === 'am' ? 'መጻሕፍት' : 'Books'}
                    </span>
                  </div>
                  <h3
                    className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1a1714] group-hover:text-[#c9a84c] transition-colors"
                  >
                    {lang === 'am' ? cat.titleAm : cat.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6e685f] mt-1 font-serif">
                    {lang === 'am' ? cat.subtitleAm : cat.subtitleEn}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="jkr-pill-btn-dark !py-2 !px-5 !text-xs group-hover:bg-[#c9a84c] group-hover:text-black transition-all inline-flex items-center gap-2">
                    <span>{lang === 'am' ? 'ሁሉንም ይመልከቱ' : 'View All Books'}</span>
                    <Icon name="arrowRight" size={14} />
                  </span>
                </div>
              </div>

              {/* Animated Book Slider for this Category */}
              <BookSlider books={categoryBooks} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
