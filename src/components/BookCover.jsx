import React from 'react';

/**
 * Procedural & Tactile Literary Codex Component
 * Renders books as physical literary artifacts: foil-stamped Amharic titles,
 * Ethiopian manuscript rubrication (ቀይ ቀለም), leatherette/cloth textures,
 * book spines, and archival provenance tags.
 */
export default function BookCover({ book, size = 'normal', showSpine = true, className = '' }) {
  if (!book) return null;

  const sizeStyles = {
    small: 'w-36 h-52 text-xs',
    normal: 'w-56 h-80 text-sm',
    large: 'w-72 h-[420px] text-base',
    hero: 'w-72 sm:w-84 md:w-96 h-[440px] sm:h-[500px] md:h-[540px] text-lg'
  }[size] || 'w-56 h-80 text-sm';

  // Specific codex cloth/leatherette backgrounds tailored to the literature
  const codexThemes = {
    dertogada: {
      bg: 'linear-gradient(135deg, #101c26 0%, #080f15 50%, #030609 100%)',
      accent: '#c29b38',
      rubric: '#ba323a',
      tagAm: '፩ኛ መጽሐፍ',
      symbol: '✦'
    },
    ramatohara: {
      bg: 'linear-gradient(135deg, #2a180b 0%, #150c05 50%, #080402 100%)',
      accent: '#d4a34b',
      rubric: '#ba323a',
      tagAm: '፪ኛ መጽሐፍ',
      symbol: '❖'
    },
    xantoxara: {
      bg: 'linear-gradient(135deg, #22122b 0%, #120917 50%, #060308 100%)',
      accent: '#c29b38',
      rubric: '#9e348f',
      tagAm: '፫ኛ መጽሐፍ',
      symbol: '፠'
    },
    'kebur-dengay': {
      bg: 'linear-gradient(135deg, #300d11 0%, #170608 50%, #090203 100%)',
      accent: '#dfb547',
      rubric: '#c13b3c',
      tagAm: 'ልዩ ድንቅ ስራ',
      symbol: '፨'
    },
    zamra: {
      bg: 'linear-gradient(135deg, #0a251d 0%, #05130f 50%, #020705 100%)',
      accent: '#c29b38',
      rubric: '#2ecc71',
      tagAm: 'የተፈጥሮ ሀብት ጥናት',
      symbol: '❖'
    },
    gefuan: {
      bg: 'linear-gradient(135deg, #260c0d 0%, #140607 50%, #080203 100%)',
      accent: '#c29b38',
      rubric: '#e74c3c',
      tagAm: 'ማህበራዊ ኢ-ልቦለድ',
      symbol: '፠'
    },
    yoratorad: {
      bg: 'linear-gradient(135deg, #0d1f33 0%, #07101b 50%, #02060a 100%)',
      accent: '#c29b38',
      rubric: '#ba323a',
      tagAm: '፬ኛ መጽሐፍ',
      symbol: '✦'
    },
    yotod: {
      bg: 'linear-gradient(135deg, #1d102c 0%, #0e0716 50%, #040207 100%)',
      accent: '#dfb547',
      rubric: '#ba323a',
      tagAm: '፭ኛ መጽሐፍ (ፍጻሜ)',
      symbol: '❖'
    },
    melos: {
      bg: 'linear-gradient(135deg, #122131 0%, #09111a 50%, #03060a 100%)',
      accent: '#c29b38',
      rubric: '#3498db',
      tagAm: 'ስነ-ልቦናዊ ልቦለድ',
      symbol: '፠'
    },
    telmid: {
      bg: 'linear-gradient(135deg, #29180c 0%, #150c06 50%, #080402 100%)',
      accent: '#c29b38',
      rubric: '#e67e22',
      tagAm: 'መንፈሳዊ ፍልስፍና',
      symbol: '❖'
    },
    'yewond-mit': {
      bg: 'linear-gradient(135deg, #1e2022 0%, #101112 50%, #060607 100%)',
      accent: '#c29b38',
      rubric: '#ba323a',
      tagAm: 'የመጀመሪያ የግጥም ስራ',
      symbol: '፨'
    },
    'yekend-awta-nuro': {
      bg: 'linear-gradient(135deg, #0d2720 0%, #061511 50%, #020705 100%)',
      accent: '#c29b38',
      rubric: '#1abc9c',
      tagAm: 'ማህበራዊ ምጸት',
      symbol: '❖'
    },
    'yeogaden-demetoch': {
      bg: 'linear-gradient(135deg, #2d1808 0%, #170c04 50%, #090401 100%)',
      accent: '#c29b38',
      rubric: '#e67e22',
      tagAm: 'የበረሃ ትሪለር',
      symbol: '፠'
    },
    dehinetu: {
      bg: 'linear-gradient(135deg, #121922 0%, #090d12 50%, #030406 100%)',
      accent: '#c29b38',
      rubric: '#ba323a',
      tagAm: 'የስለላ ልቦለድ',
      symbol: '✦'
    },
    tekerchem: {
      bg: 'linear-gradient(135deg, #1d1d1f 0%, #0e0e10 50%, #050506 100%)',
      accent: '#c29b38',
      rubric: '#ba323a',
      tagAm: 'የነጻነት ልቦለድ',
      symbol: '፨'
    }
  }[book.slug] || {
    bg: 'linear-gradient(135deg, #141a22 0%, #0a0d12 50%, #040507 100%)',
    accent: '#c29b38',
    rubric: '#ba323a',
    tagAm: 'ልቦለድ',
    symbol: '❖'
  };

  return (
    <div
      className={`relative select-none codex-shadow transition-transform duration-500 overflow-hidden ${sizeStyles} ${className}`}
      style={{
        border: '1px solid var(--border-hairline)',
        backgroundColor: '#080f11',
        boxShadow: '-10px 14px 28px rgba(0, 0, 0, 0.9), 0 0 20px -5px rgba(45, 212, 191, 0.15)'
      }}
    >
      {/* Background Cloth & Vellum Texture */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: codexThemes.bg }}
      />

      {/* Traditional Ethiopian Rubric Border (Framing rules around the book face) */}
      <div
        className="absolute inset-2 z-10 pointer-events-none"
        style={{
          border: `1px solid ${codexThemes.accent}30`,
          outline: `1px solid rgba(45, 212, 191, 0.12)`,
          outlineOffset: '2px'
        }}
      />

      {/* Traditional Ge'ez Corner Florets */}
      <div className="absolute top-3 left-3 z-10 text-[10px] pointer-events-none opacity-70" style={{ color: codexThemes.accent }}>
        {codexThemes.symbol}
      </div>
      <div className="absolute top-3 right-3 z-10 text-[10px] pointer-events-none opacity-70" style={{ color: codexThemes.accent }}>
        {codexThemes.symbol}
      </div>
      <div className="absolute bottom-3 left-3 z-10 text-[10px] pointer-events-none opacity-70" style={{ color: codexThemes.accent }}>
        {codexThemes.symbol}
      </div>
      <div className="absolute bottom-3 right-3 z-10 text-[10px] pointer-events-none opacity-70" style={{ color: codexThemes.accent }}>
        {codexThemes.symbol}
      </div>

      {/* 3D Physical Spine Depth Highlight */}
      {showSpine && <div className="codex-spine" />}

      {/* Editorial Cover Composition */}
      <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-between text-center">
        {/* Top Header: Author Imprimatur */}
        <div className="pt-1">
          <div className="text-[10px] sm:text-[11px] tracking-[0.22em] font-mono uppercase text-[var(--secondary)] font-semibold">
            YISMAKE WORKU
          </div>
          <div className="font-serif text-xs sm:text-sm font-semibold text-[var(--on-surface)] tracking-wider mt-0.5">
            ይስማዕከ ወርቁ
          </div>

          {book.seriesOrder && (
            <div className="mt-1.5 inline-block font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--primary)] uppercase border-b border-[var(--border-hairline)] pb-0.5">
              CANON 0{book.seriesOrder} · PENTOLOGY
            </div>
          )}
        </div>

        {/* Center: Hero Amharic Title & Gold Leaf English */}
        <div className="my-auto py-3">
          {/* Sacred Amharic Monument Title */}
          <div
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--on-surface)] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
            style={{
              letterSpacing: '0.02em',
            }}
          >
            {book.titleAm}
          </div>

          {/* Traditional Rubric Divider */}
          <div className="flex items-center justify-center my-2 opacity-80">
            <span className="h-[1px] w-6 bg-[var(--primary)]" />
            <span className="mx-2 text-xs" style={{ color: codexThemes.rubric }}>❖</span>
            <span className="h-[1px] w-6 bg-[var(--primary)]" />
          </div>

          {/* Latin Title Transliteration */}
          <div className="font-serif text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[var(--secondary)]">
            {book.titleEn}
          </div>
        </div>

        {/* Bottom Footer: Publication Stamp */}
        <div className="pb-1 pt-2 border-t border-[var(--border-hairline)]">
          <div className="font-mono text-[9px] sm:text-[10px] text-[var(--outline)] tracking-wider uppercase flex items-center justify-between">
            <span>{book.year} G.C.</span>
            <span className="font-serif text-[var(--secondary)]">{book.yearEc} ዓ.ም.</span>
          </div>
        </div>
      </div>

      {/* Subtle Foil Emboss Effect on Right Border */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(45, 212, 191, 0.35), transparent)'
        }}
      />
    </div>
  );
}
