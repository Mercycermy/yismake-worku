import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookShowcase from '../components/BookShowcase';
import ModalInspectionFolio from '../components/ModalInspectionFolio';
import Icon from '../components/Icon';

export default function Books() {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryQuery = searchParams.get('category');
  const [inspectionBook, setInspectionBook] = useState(null);

  const bookCategories = [
    {
      id: 'dertogada',
      titleEn: 'Dertogada Sequels',
      titleAm: 'የዴርቶጋዳ ተከታታይ መጻሕፍት',
      tagEn: 'THE DERTOGADA SAGA · 5 VOLUMES',
      tagAm: 'የዴርቶጋዳ 5 ተከታታይ ቅጾች',
      subtitleEn: 'The monumental 5-part speculative saga exploring Ethiopian heritage, science, and subterranean secrets.',
      subtitleAm: 'በኢትዮጵያ ስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት የፈጠሩት አምስቱ ተከታታይ የሳይንስና የስለላ ልቦለዶች።',
      stageBg: 'radial-gradient(ellipse at 50% 25%, #edf3f5 0%, #d5e1e6 100%)',
      accentColor: '#c9a84c',
      bookSlugs: ['dertogada', 'ramatohara', 'xantoxara', 'yoratorad', 'yotod'],
    },
    {
      id: 'kibur-dingay',
      titleEn: 'Kibur Dingay Sequels',
      titleAm: 'የክቡር ድንጋይ ተከታታይ መጻሕፍት',
      tagEn: 'KIBUR DINGAY SERIES · 3 NOVELS',
      tagAm: 'የክቡር ድንጋይ ተከታታይ · 3 ልቦለዶች',
      subtitleEn: 'The internationally acclaimed masterpiece and its gripping geopolitical thrillers.',
      subtitleAm: 'በእንግሊዝ አገር የታጨው «ክቡር ድንጋይ»፣ «ደህንነቱ» እና «የኦጋዴን ድመቶች»።',
      stageBg: 'radial-gradient(ellipse at 50% 25%, #f4ede4 0%, #ded3c6 100%)',
      accentColor: '#b8793b',
      bookSlugs: ['kebur-dengay', 'dehinetu', 'yeogaden-demetoch'],
    },
    {
      id: 'other-novels',
      titleEn: 'Other Novels',
      titleAm: 'ሌሎች ልቦለዶች',
      tagEn: 'INDEPENDENT WORKS · 5 MASTERPIECES',
      tagAm: 'ራሳቸውን የቻሉ 5 ድንቅ ስራዎች',
      subtitleEn: 'Independent masterworks of philosophy, human struggle, and incisive sociopolitical critique.',
      subtitleAm: 'ተልሚድ፣ ተከርቸም፣ ዘምራ፣ ሜሎስ እና ግፉዓን የተሰኙ የተለያዩ ማህበራዊና ፍልስፍናዊ ድንቅ ልቦለዶች።',
      stageBg: 'radial-gradient(ellipse at 50% 25%, #eee7f2 0%, #dbd0e0 100%)',
      accentColor: '#8a529e',
      bookSlugs: ['telmid', 'tekerchem', 'zamra', 'melos', 'gefuan'],
    },
    {
      id: 'poetry',
      titleEn: 'Poetry Books',
      titleAm: 'የግጥም መጻሕፍት',
      tagEn: 'POETRY COLLECTIONS · 2 VOLUMES',
      tagAm: 'የግጥም መድበሎች · 2 ቅጾች',
      subtitleEn: 'Poignant verses, cultural reflections, and early artistic masterpieces.',
      subtitleAm: 'የደራሲው የወጣትነት የግጥም መድበሎችና ማህበራዊ ምጸቶች።',
      stageBg: 'radial-gradient(ellipse at 50% 25%, #f4f0e2 0%, #e2dcc8 100%)',
      accentColor: '#8f7b2c',
      bookSlugs: ['yewond-mit', 'yekend-awta-nuro'],
    },
  ];

  const activeCategory = bookCategories.find((c) => c.id === selectedCategoryQuery);

  const selectCategory = (catId) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="jkr-books-page"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        minHeight: '100vh',
      }}
    >
      {/* Editorial Page Header without background image */}
      <section className="pt-12 sm:pt-16 pb-8 border-b border-[#e8e2d5]/60 text-center">
        <div className="site-container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1714]/5 border border-[#c9a84c]/40 text-[#b8860b] text-[11px] font-bold tracking-widest uppercase mb-4">
            <Icon name="spark" size={13} />
            <span>{lang === 'am' ? 'የተሟላ የመጻሕፍት ማህደር' : 'Official Canonical Folios'}</span>
            <Icon name="spark" size={13} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {activeCategory
              ? (lang === 'am' ? activeCategory.titleAm : activeCategory.titleEn)
              : (lang === 'am' ? 'የይስማዕከ ወርቁ መጻሕፍት' : 'The Canonical Works')}
          </h1>

          <p
            className="max-w-2xl mx-auto text-sm sm:text-base text-[#6e685f]"
            style={{
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {activeCategory
              ? (lang === 'am' ? activeCategory.subtitleAm : activeCategory.subtitleEn)
              : (lang === 'am'
                  ? 'የዴርቶጋዳ ተከታታይ፣ የክቡር ድንጋይ ስብስብ፣ ፍልስፍናዊ ልቦለዶችና የግጥም መድበሎች በአራት ዋና ዘርፎች።'
                  : 'Four distinct literary categories: The Dertogada speculative saga, Kibur Dingay thrillers, independent social novels, and early poetry.')}
          </p>
          <div className="w-16 h-0.5 bg-[#c9a84c] mx-auto mt-4 rounded-full" />

          {/* Category Quick Navigation Tabs */}
          <div className="jkr-books-category-nav flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => selectCategory(null)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !activeCategory
                  ? 'bg-[#1a1714] text-[#f5f1eb] shadow-sm'
                  : 'bg-white border border-[#e8e2d5] text-[#5a564e] hover:border-[#c9a84c]'
              }`}
            >
              {lang === 'am' ? 'ሁሉም 4 ዘርፎች' : 'All 4 Categories'}
            </button>
            {bookCategories.map((cat) => {
              const isSelected = activeCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1714] text-[#c9a84c] shadow-sm ring-1 ring-[#c9a84c]'
                      : 'bg-white border border-[#e8e2d5] text-[#5a564e] hover:border-[#c9a84c]'
                  }`}
                >
                  {lang === 'am' ? cat.titleAm : cat.titleEn}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Dedicated Category Page OR 4 Animated Slider Stages */}
      <div className="site-container max-w-6xl mx-auto py-10 sm:py-16 px-4">
        {activeCategory ? (
          /* ══════════════════════════════════════════════════════════════
             DEDICATED CATEGORY PAGE (Directed when user clicks category)
             ══════════════════════════════════════════════════════════════ */
          <DedicatedCategoryView
            category={activeCategory}
            lang={lang}
            verifiedBooks={verifiedBooks}
            onBack={() => selectCategory(null)}
            setInspectionBook={setInspectionBook}
          />
        ) : (
          /* ══════════════════════════════════════════════════════════════
             4 CATEGORIES SHOWCASE WITH ANIMATED SLIDERS (Like Image)
             ══════════════════════════════════════════════════════════════ */
          <div className="category-collections">
            {bookCategories.map((cat, idx) => (
              <AnimatedCategoryStage
                key={cat.id}
                category={cat}
                categoryIndex={idx}
                lang={lang}
                verifiedBooks={verifiedBooks}
                onOpenCategory={() => selectCategory(cat.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Inspection Modal */}
      {inspectionBook && (
        <ModalInspectionFolio
          book={inspectionBook}
          isOpen={Boolean(inspectionBook)}
          onClose={() => setInspectionBook(null)}
        />
      )}
    </div>
  );
}

function AnimatedCategoryStage({ category, categoryIndex, lang, verifiedBooks, onOpenCategory }) {
  const books = category.bookSlugs.map(slug => verifiedBooks.find(book => book.slug === slug)).filter(Boolean);
  return (
    <section className="category-collection" aria-labelledby={`category-${category.id}`}>
      <header className="collection-heading collection-heading--category">
        <span className="editorial-eyebrow">{lang === 'am' ? 'ስብስብ' : 'COLLECTION'} {String(categoryIndex + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {books.length} {lang === 'am' ? 'መጻሕፍት' : 'BOOKS'}</span>
        <h2 id={`category-${category.id}`}>{lang === 'am' ? category.titleAm : category.titleEn}</h2>
        <p>{lang === 'am' ? category.subtitleAm : category.subtitleEn}</p>
      </header>
      <BookShowcase
        books={books}
        lang={lang}
        showAllCovers
        label={lang === 'am' ? category.tagAm : category.tagEn}
        onBrowse={onOpenCategory}
        collectionLabel={lang === 'am' ? 'ሁሉንም መጻሕፍት ይመልከቱ' : `View all ${books.length} books`}
      />
    </section>
  );
}

function DedicatedCategoryView({ category, lang, verifiedBooks, onBack, setInspectionBook }) {
  const books = category.bookSlugs.map(slug => verifiedBooks.find(book => book.slug === slug)).filter(Boolean);
  const descriptionFor = book => {
    const text = book.tagline || book.description;
    return text && typeof text === 'object' ? text[lang] || text.en : text || '';
  };
  return (
    <div className="book-category-page" style={{ '--category-wash': category.stageBg }}>
      <div className="book-category-page__toolbar">
        <button type="button" onClick={onBack}><Icon name="arrowLeft" size={16} />{lang === 'am' ? 'ወደ ሁሉም ስብስቦች' : 'All collections'}</button>
        <span>{books.length} {lang === 'am' ? 'መጻሕፍት' : 'books to explore'}</span>
      </div>
      <div className="catalogue-grid">
        {books.map((book, index) => (
          <article key={book.id} className="catalogue-card">
            <div className="catalogue-card__stage">
              <span className="catalogue-card__number">{String(index + 1).padStart(2, '0')}</span>
              <Link to={`/books/${book.slug}`} className="catalogue-card__cover" aria-label={lang === 'am' ? book.titleAm : book.titleEn}>
                <img src={book.coverImage} alt={book.titleEn} loading="lazy" />
              </Link>
            </div>
            <div className="catalogue-card__body">
              <p className="catalogue-card__meta">{book.year}<span aria-hidden="true">·</span>{book.pageCount ? `${book.pageCount} ${lang === 'am' ? 'ገጾች' : 'pages'}` : (lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku')}</p>
              <h2><Link to={`/books/${book.slug}`}>{lang === 'am' ? book.titleAm : book.titleEn}</Link></h2>
              <p className="catalogue-card__description">{descriptionFor(book)}</p>
            </div>
            <div className="catalogue-card__actions">
              <Link to={`/books/${book.slug}`} className="collection-button collection-button--dark">{lang === 'am' ? 'ዝርዝርና ቅምሻ' : 'Discover the book'}<Icon name="arrowRight" size={15} /></Link>
              <button type="button" className="catalogue-card__inspect" onClick={() => setInspectionBook(book)} aria-label={`${lang === 'am' ? 'ፈጣን እይታ' : 'Quick look'}: ${lang === 'am' ? book.titleAm : book.titleEn}`} title={lang === 'am' ? 'ፈጣን እይታ' : 'Quick look'}><Icon name="bookOpen" size={18} /></button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
