import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import BookCover from './BookCover';
import QuickPurchaseModal from './QuickPurchaseModal';

export default function BookCard({ book, onInspect }) {
  const { lang } = useLanguage();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  if (!book) return null;

  return (
    <>
      <article
        style={{
          background: '#ffffff',
          border: '1px solid #edeae4',
          borderRadius: '8px',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
        className="group"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)';
          e.currentTarget.style.borderColor = '#c9a84c';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
          e.currentTarget.style.borderColor = '#edeae4';
        }}
      >
        {/* Book Cover Area */}
        <div style={{
          background: 'linear-gradient(135deg, #f5f3ef 0%, #edeae4 100%)',
          padding: '2rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Link
            to={`/books/${book.slug}`}
            style={{
              display: 'block',
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            }}
            className="group-hover:-translate-y-2"
          >
            <BookCover book={book} size="normal" />
          </Link>
        </div>

        {/* Book Info */}
        <div style={{ padding: '1.25rem 1.5rem 0' }}>
          {/* Metadata row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#8a857d',
          }}>
            <span>{book.year} ({book.yearEc} ዓ.ም)</span>
            {book.seriesOrder && <span style={{ color: '#c9a84c' }}>Book {book.seriesOrder}</span>}
          </div>

          {/* Title */}
          <Link to={`/books/${book.slug}`} style={{ textDecoration: 'none' }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: '#1a1714',
              lineHeight: 1.25,
              marginBottom: '2px',
              transition: 'color 0.25s',
            }} className="group-hover:text-[#b8860b]">
              {book.titleAm}
            </h3>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#8a857d',
              marginBottom: '0.5rem',
            }}>
              {book.titleEn}
            </div>
          </Link>

          {/* Tagline */}
          <p style={{
            fontSize: '0.8125rem',
            color: '#5a564e',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '0',
          }}>
            {lang === 'am' ? book.tagline?.am : book.tagline?.en}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          padding: '1rem 1.5rem 1.25rem',
          marginTop: 'auto',
        }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
          }}>
            <button
              onClick={() => setPurchaseModalOpen(true)}
              style={{
                flex: 1,
                padding: '0.6rem 0.75rem',
                background: '#1a1714',
                color: '#faf8f4',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.04em',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c9a84c';
                e.currentTarget.style.color = '#1a1714';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1a1714';
                e.currentTarget.style.color = '#faf8f4';
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span>{lang === 'am' ? 'ይግዙ' : 'Buy Now'}</span>
            </button>

            <Link
              to={`/books/${book.slug}`}
              style={{
                flex: 1,
                padding: '0.6rem 0.75rem',
                background: 'transparent',
                color: '#1a1714',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.04em',
                borderRadius: '6px',
                border: '1.5px solid #e8e4de',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.25s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c9a84c';
                e.currentTarget.style.color = '#b8860b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e8e4de';
                e.currentTarget.style.color = '#1a1714';
              }}
            >
              {lang === 'am' ? 'ተጨማሪ →' : 'Read More →'}
            </Link>
          </div>

          {onInspect && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.625rem',
              paddingTop: '0.75rem',
              marginTop: '0.75rem',
              borderTop: '1px solid #f0ece6',
              color: '#8a857d',
            }}>
              <button
                onClick={() => onInspect(book)}
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
                ⊕ Quick Inspect
              </button>
              <span style={{
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>Verified</span>
            </div>
          )}
        </div>
      </article>

      {purchaseModalOpen && (
        <QuickPurchaseModal
          book={book}
          isOpen={purchaseModalOpen}
          onClose={() => setPurchaseModalOpen(false)}
        />
      )}
    </>
  );
}
