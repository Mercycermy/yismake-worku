import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

const categoriesMap = {
  'dertogada-sequel': {
    id: 'dertogada-sequel',
    titleEn: 'Dertogada Sequel',
    titleAm: 'የዴርቶጋዳ ተከታታይ መጻሕፍት',
    subtitleEn: 'The monumental 5-part speculative saga: Dertogada, Ramatohara, Zhantozhara, Yoratorad, and Yotod.',
    subtitleAm: 'በኢትዮጵያ ስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት የፈጠሩት አምስቱ ተከታታይ የሳይንስና የስለላ ልቦለዶች።',
    slugs: ['dertogada', 'ramatohara', 'xantoxara', 'yoratorad', 'yotod']
  },
  'kibur-dingay-sequel': {
    id: 'kibur-dingay-sequel',
    titleEn: 'Kibur Dingay Sequel',
    titleAm: 'የክቡር ድንጋይ ተከታታይ መጻሕፍት',
    subtitleEn: 'The internationally acclaimed masterpiece and its gripping geopolitical thrillers.',
    subtitleAm: 'በእንግሊዝ አገር የታጨው «ክቡር ድንጋይ»፣ «ደህንነቱ» እና «የኦጋዴን ድመቶች»።',
    slugs: ['kebur-dengay', 'dehinetu', 'yeogaden-demetoch']
  },
  'other-novels': {
    id: 'other-novels',
    titleEn: 'Other Novels',
    titleAm: 'ሌሎች ልቦለዶች',
    subtitleEn: 'Independent masterworks of philosophy, human struggle, and social satire.',
    subtitleAm: 'ተልሚድ፣ ተከርቸም፣ ዘምራ እና ሜሎስ — የተለያዩ ማህበራዊና ፍልስፍናዊ ድንቅ ልቦለዶች።',
    slugs: ['telmid', 'tekerchem', 'zamra', 'melos']
  },
  'poetry-books': {
    id: 'poetry-books',
    titleEn: 'Poetry Books',
    titleAm: 'የግጥም መጻሕፍት',
    subtitleEn: 'Poignant verses, cultural reflections, and early artistic masterpieces.',
    subtitleAm: 'የደራሲው የወጣትነት የግጥም መድበሎችና ማህበራዊ ምጸቶች፡ «የወንድ ምጥ» እና «የቀንድ አውጣ ኑሮ»።',
    slugs: ['yewond-mit', 'yekend-awta-nuro']
  }
};

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const { lang } = useLanguage();

  const category = categoriesMap[categoryId] || categoriesMap['dertogada-sequel'];

  const categoryBooks = category.slugs
    .map((slug) => verifiedBooks.find((b) => b.slug === slug))
    .filter(Boolean);

  return (
    <div style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)', minHeight: '100vh' }}>
      <PageBanner title={lang === 'am' ? category.titleAm : category.titleEn} />

      <div className="site-container max-w-5xl mx-auto py-12 px-4">
        {/* Breadcrumb */}
        <div className="pb-4 mb-8 border-b border-[#e8e2d5] text-xs text-[#736d65] flex items-center gap-2">
          <Link to="/" className="hover:text-[#c9a84c]">
            {lang === 'am' ? 'መነሻ' : 'Home'}
          </Link>
          <span>/</span>
          <Link to="/books" className="hover:text-[#c9a84c]">
            {lang === 'am' ? 'መጻሕፍት' : 'Books'}
          </Link>
          <span>/</span>
          <span className="text-[#1a1714] font-semibold">{lang === 'am' ? category.titleAm : category.titleEn}</span>
        </div>

        {/* Subtitle / Description */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-serif text-lg text-[#5a564e] leading-relaxed">
            {lang === 'am' ? category.subtitleAm : category.subtitleEn}
          </p>
        </div>

        {/* List of Books in this Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryBooks.map((book, idx) => (
            <div
              key={book.id}
              className="bg-white border border-[#e8e2d5] rounded-xl p-6 shadow-md hover:border-[#c9a84c] transition-all flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="w-40 shrink-0">
                <Link to={`/books/${book.slug}`}>
                  <BookCover book={book} size="normal" />
                </Link>
              </div>

              <div className="space-y-3 flex-1">
                <span className="text-[11px] font-bold text-[#c9a84c] uppercase tracking-wider block">
                  {book.year} • {book.pageCount} {lang === 'am' ? 'ገጾች' : 'pages'}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#1a1714]">
                  <Link to={`/books/${book.slug}`} className="hover:text-[#c9a84c] transition-colors">
                    {lang === 'am' ? book.titleAm : book.titleEn}
                  </Link>
                </h3>

                <p className="text-xs text-[#555047] line-clamp-3 leading-relaxed">
                  {lang === 'am' ? book.description?.am : book.description?.en}
                </p>

                <div className="pt-2">
                  <Link
                    to={`/books/${book.slug}`}
                    className="jkr-pill-btn-dark !py-2 !px-4 !text-xs inline-flex items-center gap-2"
                  >
                    <span>{lang === 'am' ? 'ተጨማሪ መረጃ' : 'Read More & Details'}</span>
                    <Icon name="arrowRight" size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/books" className="jkr-pill-btn !py-2.5 !px-6 !text-xs border border-gray-300">
            ← {lang === 'am' ? 'ወደ ሁሉም ዘርፎች ተመለስ' : 'Back to All Categories'}
          </Link>
        </div>
      </div>
    </div>
  );
}
