import React from 'react';

/**
 * Premium Procedural & Photographic Book Cover Component
 * Renders authentic Amharic & English titles, Ge'ez filigree, spine lighting,
 * and atmospheric color grading tailored to each specific title.
 */
export default function BookCover({ book, size = 'normal', showSpine = true, className = '' }) {
  if (!book) return null;

  const sizeClasses = {
    small: 'w-36 h-52 text-xs',
    normal: 'w-56 h-80 text-sm',
    large: 'w-72 h-[420px] text-base',
    hero: 'w-80 sm:w-96 h-[480px] sm:h-[540px] text-lg'
  }[size] || 'w-56 h-80 text-sm';

  const accentColor = book.accentColor || '#00f0ff';

  // Specific theme gradients
  const gradientStyles = {
    dertogada: 'radial-gradient(circle at 50% 20%, #004d54 0%, #061824 50%, #02070d 100%)',
    ramatohara: 'radial-gradient(circle at 50% 20%, #5a3500 0%, #291802 50%, #0a0601 100%)',
    xantoxara: 'radial-gradient(circle at 50% 20%, #3e1654 0%, #1c0828 50%, #08020c 100%)',
    'kebur-dengay': 'radial-gradient(circle at 50% 20%, #4a0e14 0%, #200508 50%, #090102 100%)',
    zamra: 'radial-gradient(circle at 50% 20%, #093f35 0%, #041c17 50%, #010806 100%)',
    gefuan: 'radial-gradient(circle at 50% 20%, #441416 0%, #210809 50%, #090202 100%)',
    yoratorad: 'radial-gradient(circle at 50% 20%, #113359 0%, #07172b 50%, #02060d 100%)',
    yotod: 'radial-gradient(circle at 50% 20%, #30164e 0%, #150824 50%, #05020a 100%)',
    melos: 'radial-gradient(circle at 50% 20%, #0f3659 0%, #06192c 50%, #01060d 100%)',
    telmid: 'radial-gradient(circle at 50% 20%, #4b2609 0%, #231102 50%, #080300 100%)',
    'yewond-mit': 'radial-gradient(circle at 50% 20%, #2d3436 0%, #171a1b 50%, #080909 100%)',
    'yekend-awta-nuro': 'radial-gradient(circle at 50% 20%, #0c3d33 0%, #041d18 50%, #010806 100%)',
    'yeogaden-demetoch': 'radial-gradient(circle at 50% 20%, #4e2908 0%, #271403 50%, #090400 100%)',
    dehinetu: 'radial-gradient(circle at 50% 20%, #192a3e 0%, #0b1420 50%, #030508 100%)',
    tekerchem: 'radial-gradient(circle at 50% 20%, #282828 0%, #131313 50%, #050505 100%)'
  }[book.slug] || 'radial-gradient(circle at 50% 20%, #1a233a 0%, #0b0f19 60%, #04060a 100%)';

  return (
    <div
      className={`relative select-none transition-all duration-500 rounded-lg overflow-hidden ${sizeClasses} ${className}`}
      style={{
        boxShadow: `0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px ${accentColor}25`,
        border: `1px solid rgba(255, 255, 255, 0.12)`
      }}
    >
      {/* Background with custom procedural gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: gradientStyles }}
      />

      {/* Subtle Ge'ez manuscript decorative texture watermark */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Cybernetic circuit lines for Dertogada Universe */}
      {book.series?.includes('Dertogada') && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="0" x2="10%" y2="100%" stroke={accentColor} strokeWidth="1" strokeDasharray="4 6" />
            <line x1="90%" y1="0" x2="90%" y2="100%" stroke={accentColor} strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="50%" cy="50%" r="60" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="50%" cy="50%" r="90" stroke={accentColor} strokeWidth="0.75" strokeDasharray="8 8" fill="none" opacity="0.3" />
          </svg>
        </div>
      )}

      {/* 3D Spine Depth Highlight (Left side of book) */}
      {showSpine && (
        <div
          className="absolute top-0 bottom-0 left-0 w-4 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.5) 40%, rgba(255,255,255,0.08) 80%, rgba(0,0,0,0.3) 100%)'
          }}
        />
      )}

      {/* Cover Editorial Layout */}
      <div className="relative z-10 h-full p-4 sm:p-5 flex flex-col justify-between text-center">
        {/* Top Header: Author Name */}
        <div className="pt-1">
          <div className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#d4af37] uppercase">
            Yismake Worku
          </div>
          <div className="text-sm sm:text-base font-bold text-white/90 font-['Noto_Serif_Ethiopic'] tracking-wider mt-0.5">
            ይስማዕከ ወርቁ
          </div>
          {book.seriesOrder && (
            <div className="inline-block mt-1.5 px-2 py-0.5 text-[9px] sm:text-[10px] uppercase tracking-widest rounded-full bg-white/5 border border-white/15 text-cyan-300 font-mono">
              Book {book.seriesOrder} · {book.series?.split(' ')[1] || 'Saga'}
            </div>
          )}
        </div>

        {/* Center: Monumental Titles */}
        <div className="my-auto py-2">
          {/* Amharic Title (Dominant & Sacred) */}
          <div
            className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Noto_Serif_Ethiopic'] leading-tight drop-shadow-md"
            style={{
              color: '#ffffff',
              textShadow: `0 0 20px ${accentColor}80`
            }}
          >
            {book.titleAm}
          </div>

          {/* Golden Ethiopic Seal / Emblem */}
          <div className="flex items-center justify-center my-2.5 opacity-85">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="mx-2 text-[#d4af37] text-xs">❖</span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* English Title / Transliteration */}
          <div className="text-xs sm:text-sm font-semibold tracking-widest text-[#ebe4d3] uppercase font-['Cinzel'] drop-shadow">
            {book.titleEn}
          </div>
        </div>

        {/* Bottom Footer: Publication & Genre */}
        <div className="pb-1">
          <div className="text-[10px] sm:text-[11px] text-white/60 line-clamp-1 font-mono tracking-wide">
            {book.genre?.split('/')[0]}
          </div>
          <div className="mt-1 flex items-center justify-between text-[9px] sm:text-[10px] text-white/40 pt-1.5 border-t border-white/10 font-mono">
            <span>{book.year} G.C.</span>
            <span>{book.yearEc} ዓ.ም.</span>
          </div>
        </div>
      </div>

      {/* Foil Rim Glow */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 0 15px ${accentColor}15`
        }}
      />
    </div>
  );
}
