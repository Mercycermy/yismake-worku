import React from 'react';

/**
 * Premium Literary Book Cover Component
 * Renders books as physical literary artifacts with elegant typography,
 * gold foil details, rich leatherette textures, and 3D spine effects.
 */
export default function BookCover({ book, size = 'normal', showSpine = true, className = '' }) {
  if (!book) return null;

  const sizeStyles = {
    small: 'w-36 h-52 text-xs',
    normal: 'w-56 h-80 text-sm',
    large: 'w-72 h-[420px] text-base',
    hero: 'w-72 sm:w-84 md:w-96 h-[440px] sm:h-[500px] md:h-[540px] text-lg'
  }[size] || 'w-56 h-80 text-sm';

  // Rich codex themes with warm leather-like backgrounds
  const codexThemes = {
    dertogada: {
      bg: 'linear-gradient(145deg, #1a2836 0%, #0f1a24 50%, #080f15 100%)',
      accent: '#c9a84c',
      rubric: '#ba323a',
      tagAm: '፩ኛ መጽሐፍ',
      symbol: '✦'
    },
    ramatohara: {
      bg: 'linear-gradient(145deg, #2a1c10 0%, #1a1008 50%, #0c0804 100%)',
      accent: '#d4a84c',
      rubric: '#ba323a',
      tagAm: '፪ኛ መጽሐፍ',
      symbol: '❖'
    },
    xantoxara: {
      bg: 'linear-gradient(145deg, #251430 0%, #160a1c 50%, #08030b 100%)',
      accent: '#c9a84c',
      rubric: '#9e348f',
      tagAm: '፫ኛ መጽሐፍ',
      symbol: '፠'
    },
    'kebur-dengay': {
      bg: 'linear-gradient(145deg, #361014 0%, #1e080a 50%, #0c0304 100%)',
      accent: '#dfb547',
      rubric: '#c13b3c',
      tagAm: 'ልዩ ድንቅ ስራ',
      symbol: '፨'
    },
    zamra: {
      bg: 'linear-gradient(145deg, #0e2a20 0%, #081812 50%, #030a08 100%)',
      accent: '#c9a84c',
      rubric: '#2ecc71',
      tagAm: 'የተፈጥሮ ሀብት ጥናት',
      symbol: '❖'
    },
    gefuan: {
      bg: 'linear-gradient(145deg, #2a0e10 0%, #1a0808 50%, #0c0304 100%)',
      accent: '#c9a84c',
      rubric: '#e74c3c',
      tagAm: 'ማህበራዊ ኢ-ልቦለድ',
      symbol: '፠'
    },
    yoratorad: {
      bg: 'linear-gradient(145deg, #10223a 0%, #0a1424 50%, #040a12 100%)',
      accent: '#c9a84c',
      rubric: '#ba323a',
      tagAm: '፬ኛ መጽሐፍ',
      symbol: '✦'
    },
    yotod: {
      bg: 'linear-gradient(145deg, #201230 0%, #120a1a 50%, #06040a 100%)',
      accent: '#dfb547',
      rubric: '#ba323a',
      tagAm: '፭ኛ መጽሐፍ (ፍጻሜ)',
      symbol: '❖'
    },
    melos: {
      bg: 'linear-gradient(145deg, #142436 0%, #0c1420 50%, #04080c 100%)',
      accent: '#c9a84c',
      rubric: '#3498db',
      tagAm: 'ስነ-ልቦናዊ ልቦለድ',
      symbol: '፠'
    },
    telmid: {
      bg: 'linear-gradient(145deg, #2c1c10 0%, #1a1008 50%, #0a0604 100%)',
      accent: '#c9a84c',
      rubric: '#e67e22',
      tagAm: 'መንፈሳዊ ፍልስፍና',
      symbol: '❖'
    },
    'yewond-mit': {
      bg: 'linear-gradient(145deg, #222426 0%, #141516 50%, #08090a 100%)',
      accent: '#c9a84c',
      rubric: '#ba323a',
      tagAm: 'የመጀመሪያ የግጥም ስራ',
      symbol: '፨'
    },
    'yekend-awta-nuro': {
      bg: 'linear-gradient(145deg, #0e2a22 0%, #081814 50%, #030a08 100%)',
      accent: '#c9a84c',
      rubric: '#1abc9c',
      tagAm: 'ማህበራዊ ምጸት',
      symbol: '❖'
    },
    'yeogaden-demetoch': {
      bg: 'linear-gradient(145deg, #30200c 0%, #1a1006 50%, #0c0802 100%)',
      accent: '#c9a84c',
      rubric: '#e67e22',
      tagAm: 'የበረሃ ትሪለር',
      symbol: '፠'
    },
    dehinetu: {
      bg: 'linear-gradient(145deg, #141c28 0%, #0c1018 50%, #04060a 100%)',
      accent: '#c9a84c',
      rubric: '#ba323a',
      tagAm: 'የስለላ ልቦለድ',
      symbol: '✦'
    },
    tekerchem: {
      bg: 'linear-gradient(145deg, #202024 0%, #121214 50%, #06060a 100%)',
      accent: '#c9a84c',
      rubric: '#ba323a',
      tagAm: 'የነጻነት ልቦለድ',
      symbol: '፨'
    }
  }[book.slug] || {
    bg: 'linear-gradient(145deg, #1a1e28 0%, #0e1014 50%, #060708 100%)',
    accent: '#c9a84c',
    rubric: '#ba323a',
    tagAm: 'ልቦለድ',
    symbol: '❖'
  };

  return (
    <div
      className={`relative select-none codex-shadow transition-transform duration-500 overflow-hidden ${sizeStyles} ${className}`}
      style={{
        border: `1px solid ${codexThemes.accent}25`,
        backgroundColor: '#0a0e14',
        boxShadow: `-8px 12px 28px rgba(0,0,0,0.55), 0 0 20px -5px ${codexThemes.accent}15`,
        borderRadius: '2px',
      }}
    >
      {/* Background Cloth Texture */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: codexThemes.bg }}
      />

      {/* Subtle grain overlay for texture */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold Border Frame */}
      <div
        className="absolute inset-2.5 z-10 pointer-events-none"
        style={{
          border: `1px solid ${codexThemes.accent}30`,
        }}
      />

      {/* Corner Florets */}
      {['top-3.5 left-3.5', 'top-3.5 right-3.5', 'bottom-3.5 left-3.5', 'bottom-3.5 right-3.5'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} z-10 text-[9px] pointer-events-none opacity-60`} style={{ color: codexThemes.accent }}>
          {codexThemes.symbol}
        </div>
      ))}

      {/* 3D Physical Spine */}
      {showSpine && <div className="codex-spine" />}

      {/* Cover Content */}
      <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-between text-center">
        {/* Top: Author Imprimatur */}
        <div className="pt-1">
          <div style={{
            fontSize: size === 'small' ? '9px' : '10px',
            letterSpacing: '0.22em',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: codexThemes.accent,
            fontWeight: 600,
            opacity: 0.9,
          }}>
            YISMAKE WORKU
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size === 'small' ? '0.6875rem' : '0.8125rem',
            fontWeight: 600,
            color: '#f0ebe3',
            letterSpacing: '0.06em',
            marginTop: '2px',
          }}>
            ይስማዕከ ወርቁ
          </div>

          {book.seriesOrder && (
            <div style={{
              marginTop: '6px',
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: size === 'small' ? '8px' : '9px',
              letterSpacing: '0.15em',
              color: codexThemes.accent,
              textTransform: 'uppercase',
              borderBottom: `1px solid ${codexThemes.accent}30`,
              paddingBottom: '3px',
              opacity: 0.8,
            }}>
              CANON 0{book.seriesOrder} · PENTOLOGY
            </div>
          )}
        </div>

        {/* Center: Hero Title */}
        <div className="my-auto py-2">
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size === 'small' ? '1.25rem' : size === 'large' || size === 'hero' ? '2.25rem' : '1.75rem',
            fontWeight: 900,
            color: '#f0ebe3',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
          }}>
            {book.titleAm}
          </div>

          {/* Gold Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: '8px 0',
            opacity: 0.7,
          }}>
            <span style={{ height: '1px', width: '20px', background: codexThemes.accent }} />
            <span style={{ fontSize: '10px', color: codexThemes.rubric }}>❖</span>
            <span style={{ height: '1px', width: '20px', background: codexThemes.accent }} />
          </div>

          {/* English Title */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size === 'small' ? '0.5625rem' : '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: codexThemes.accent,
            opacity: 0.85,
          }}>
            {book.titleEn}
          </div>
        </div>

        {/* Bottom: Publication Info */}
        <div style={{
          paddingBottom: '2px',
          paddingTop: '8px',
          borderTop: `1px solid ${codexThemes.accent}20`,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: size === 'small' ? '8px' : '9px',
            color: '#8a857d',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>{book.year} G.C.</span>
            <span style={{ fontFamily: 'var(--font-serif)', color: codexThemes.accent, opacity: 0.7 }}>{book.yearEc} ዓ.ም.</span>
          </div>
        </div>
      </div>

      {/* Right edge foil accent */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${codexThemes.accent}40, transparent)`
        }}
      />
    </div>
  );
}
