import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { verifiedBooks } from '../data/yismakeData';
import BookCover from '../components/BookCover';
import ModalInspectionFolio from '../components/ModalInspectionFolio';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

export default function Books() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [inspectionBook, setInspectionBook] = useState(null);

  const categories = [
    { id: 'ALL', en: 'All Works', am: 'ሁሉም ስራዎች' },
    { id: 'DERTOGADA', en: 'The Dertogada Pentology', am: 'የዴርቶጋዳ 5 ተከታታይ' },
    { id: 'TRANSLATION', en: 'International Translations', am: 'ዓለም አቀፍ ትርጉሞች' },
    { id: 'PHILOSOPHY', en: 'Philosophical & Satire', am: 'ፍልስፍናዊና ማህበራዊ' },
    { id: 'POETRY', en: 'Poetry & Early Works', am: 'ግጥም እና የመጀመሪያ ስራዎች' }
  ];

  const filteredBooks = useMemo(() => {
    return verifiedBooks.filter((book) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchAm = book.titleAm.toLowerCase().includes(q);
        const matchEn = book.titleEn.toLowerCase().includes(q);
        const matchGenre = book.genre?.toLowerCase().includes(q);
        const matchDesc = book.description?.en?.toLowerCase().includes(q);
        if (!matchAm && !matchEn && !matchGenre && !matchDesc) return false;
      }

      if (selectedCategory === 'DERTOGADA') {
        return book.series?.includes('Dertogada');
      }
      if (selectedCategory === 'TRANSLATION') {
        return Boolean(book.translator);
      }
      if (selectedCategory === 'PHILOSOPHY') {
        return (
          book.genre?.includes('Philosophical') ||
          book.genre?.includes('Satire') ||
          book.genre?.includes('Psychological') ||
          book.slug === 'kebur-dengay'
        );
      }
      if (selectedCategory === 'POETRY') {
        return book.genre?.includes('Poetry') || book.slug === 'yewond-mit';
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const dertogadaBook = verifiedBooks.find((b) => b.slug === 'dertogada') || verifiedBooks[0];

  return (
    <div className="jkr-books-page" style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'መጻሕፍት' : 'Books'} />

      {/* Featured Masterpiece */}
      <section className="jkr-books-featured" style={{
        background: 'var(--bg-secondary)',
        padding: '4rem 0 5rem',
        borderBottom: '1px solid #edeae4',
      }}>
        <div className="site-container jkr-books-featured__inner">
          <div className="jkr-books-featured__cover-wrap">
            <Link
              to="/books/dertogada"
              className="jkr-books-featured__cover"
              style={{
                display: 'inline-block',
                transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <BookCover book={dertogadaBook} size="large" />
            </Link>
          </div>

          <div className="jkr-books-featured__copy">
          <div className="jkr-books-featured__eyebrow" style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            color: '#c9a84c',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            {lang === 'am' ? 'የመጀመሪያው ተከታታይ ቅጽ' : 'DERTOGADA'}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#1a1714',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}>
            {lang === 'am' ? 'የይስማዕከ ወርቁ ዴርቶጋዳ' : "Yismake Worku's Dertogada"}
          </h2>

          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.8125rem',
            fontStyle: 'italic',
            color: '#8a857d',
            marginBottom: '1.25rem',
          }}>
            {lang === 'am'
              ? 'ሜጋ አሳታሚ / ኩራዝ / ዓለም አቀፍ እትሞች'
              : 'Mega Publishers; Kuraz Publishing; International Editions'}
          </div>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            color: '#5a564e',
            lineHeight: 1.75,
            maxWidth: '560px',
            margin: '0 auto 1.5rem',
          }}>
            {lang === 'am'
              ? 'በ2001 ዓ.ም ሲታተም በአንድ ዓመት ውስጥ ብቻ 10 ጊዜ ታትሞ ከ500,000 በላይ ቅጂዎች በመሸጥ በኢትዮጵያ የስነ-ጽሑፍ ታሪክ ውስጥ ትልቅ አብዮት የፈጠረው የአገሪቱ የመጀመሪያው የሳይንስና የስለላ ልቦለድ።'
              : 'The first Dertogada book, published in 2009, was met with immediate, unprecedented national acclaim. The landmark novel broke Ethiopian publishing records with over 500,000 copies sold in its debut year alone.'}
          </p>

          <div className="jkr-books-featured__actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/books/dertogada" className="jkr-pill-btn-dark" style={{ fontSize: '0.8125rem', padding: '0.65rem 1.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>{lang === 'am' ? 'ሙሉውን ዝርዝር ያንብቡ' : 'Read Full Book Details'}</span>
              <Icon name="arrowRight" size={15} />
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <div className="site-container jkr-books-catalog" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="jkr-gold-divider" style={{ marginBottom: '1.5rem' }}>
            <Icon name="spark" size={15} />
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: '#1a1714',
            marginBottom: '0.5rem',
          }}>
            {lang === 'am' ? 'የተሟላ 15+ መጻሕፍት ካታሎግ' : 'Complete Published Works'}
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: '#8a857d',
            maxWidth: '520px',
            margin: '0 auto',
            fontFamily: 'var(--font-serif)',
          }}>
            {lang === 'am'
              ? 'ከአገሪቱ የመጀመሪያው የሳይንስ ልቦለድ «ዴርቶጋዳ» እስከ እንግሊዝ አገር እጩው «ክቡር ድንጋይ»'
              : 'From the pioneering Dertogada to the UK-shortlisted The Lost Spell'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.25s',
                background: selectedCategory === cat.id ? '#1a1714' : '#f5f3ef',
                color: selectedCategory === cat.id ? '#faf8f4' : '#5a564e',
                boxShadow: selectedCategory === cat.id ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {lang === 'am' ? cat.am : cat.en}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '420px', margin: '0 auto 3rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder={lang === 'am' ? 'በርዕስ፣ በዘውግ ወይም በጭብጥ ፈልግ...' : 'Search books by title, genre, theme...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#fdfcfa',
                border: '1.5px solid #e8e4de',
                padding: '0.65rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                color: '#1a1714',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.25s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#c9a84c'}
              onBlur={(e) => e.target.style.borderColor = '#e8e4de'}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.75rem',
                  color: '#8a857d',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                >
                <Icon name="close" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
          {filteredBooks.map((book) => (
            <article
              key={book.id}
              style={{
                background: '#ffffff',
                border: '1px solid #edeae4',
                borderRadius: '8px',
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
              className="jkr-book-catalog-card group"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#c9a84c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#edeae4';
              }}
            >
              {/* Cover area */}
              <div style={{
                background: 'linear-gradient(135deg, #f5f3ef 0%, #edeae4 100%)',
                padding: '1.75rem 1.25rem',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Link
                  to={`/books/${book.slug}`}
                  style={{ display: 'inline-block', transition: 'transform 0.4s' }}
                  className="group-hover:-translate-y-2"
                >
                  <BookCover book={book} size="normal" />
                </Link>
              </div>

              <div style={{ padding: '1.25rem 1.5rem 0' }}>
                {/* Metadata */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8a857d',
                  marginBottom: '0.4rem',
                }}>
                  <span>{book.year} ({book.yearEc} ዓ.ም)</span>
                  {book.seriesOrder && <span style={{ color: '#c9a84c' }}>BOOK {book.seriesOrder}</span>}
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#1a1714',
                  marginBottom: '0.25rem',
                  transition: 'color 0.25s',
                }} className="group-hover:text-[#b8860b]">
                  <Link to={`/books/${book.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {lang === 'am' ? book.titleAm : book.titleEn}
                  </Link>
                </h2>

                <p style={{
                  fontSize: '0.6875rem',
                  color: '#8a857d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  {lang === 'am' ? book.genreAm : book.genre}
                </p>

                <p style={{
                  fontSize: '0.8125rem',
                  color: '#5a564e',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {lang === 'am' ? book.description?.am : book.description?.en}
                </p>
              </div>

              {/* Actions */}
              <div style={{ padding: '1rem 1.5rem 1.25rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex' }}>
                  <Link
                    to={`/books/${book.slug}`}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.75rem',
                      background: '#1a1714',
                      color: '#faf8f4',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-sans)',
                      borderRadius: '6px',
                      border: '1px solid #1a1714',
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#1a1714'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1714'; e.currentTarget.style.borderColor = '#1a1714'; e.currentTarget.style.color = '#faf8f4'; }}
                  >
                    <span>{lang === 'am' ? 'ተጨማሪ መረጃ ያንብቡ' : 'Read More & Details'}</span>
                    <Icon name="arrowRight" size={14} />
                  </Link>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.625rem',
                  paddingTop: '0.625rem',
                  marginTop: '0.625rem',
                  borderTop: '1px solid #f0ece6',
                  color: '#8a857d',
                }}>
                  <button
                    onClick={() => setInspectionBook(book)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#8a857d',
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      padding: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#8a857d'}
                  >
                    <Icon name="plus" size={13} /> {lang === 'am' ? 'ፈትሽ' : 'Quick Inspect'}
                  </button>
                  <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    VERIFIED
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-secondary)',
            border: '1px solid #edeae4',
            borderRadius: '8px',
          }}>
            <Icon name="bookOpen" size={36} className="mx-auto mb-3 text-[#c9a84c] opacity-60" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#5a564e', marginBottom: '0.5rem' }}>
              {lang === 'am' ? 'ምንም መጽሐፍ አልተገኘም' : 'No Books Found'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#8a857d' }}>
              {lang === 'am'
                ? 'እባክዎ የተለየ የፍለጋ ቃል ያስገቡ ወይም ማጣሪያውን ይቀይሩ።'
                : 'Try adjusting your search query or selecting a different category filter.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal Inspection Folio */}
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
