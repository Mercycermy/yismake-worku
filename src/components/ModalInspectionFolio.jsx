import React, { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

/**
 * Modal Book Inspection Folio
 * Full-screen speculative manuscript overlay framed by 1px verdigris/brass containment,
 * displaying authentic double-page codex spreads, bone-parchment inserts (#E8DFD1),
 * scribe carbon typography (#242B2C), and red-ink scholarly marginalia (#B91C1C).
 */
export default function ModalInspectionFolio({ book, isOpen, onClose }) {
  const { lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080f11]/90 backdrop-blur-md animate-fade-in">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Inspection Folio Box */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0e1a1d] border border-[var(--border-hairline)] shadow-[0_0_50px_-10px_rgba(45,212,191,0.25)] overflow-hidden">
        
        {/* Top Cartographic & Archival Header */}
        <div className="px-6 py-4 bg-[#080f11] border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs text-[var(--on-surface-variant)] uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-[var(--primary-container)] shadow-[0_0_8px_var(--primary-container)]" />
            <span className="text-[var(--primary)] font-bold">MANUSCRIPT INSPECTION FOLIO</span>
            <span className="hidden sm:inline text-[var(--outline-variant)]">/</span>
            <span className="hidden sm:inline text-[var(--secondary)]">
              ARCH-ETH-0{book.id ? book.id.toUpperCase().slice(0, 3) : '94'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[10px] text-[var(--outline)]">
              GRID REF: 11°56′N 37°18′E · LAKE TANA CODEX
            </span>
            <button
              onClick={onClose}
              className="px-2.5 py-1 bg-[#132427] border border-[var(--border-hairline)] hover:border-[var(--primary)] text-[var(--on-surface)] hover:text-[var(--primary)] transition-all cursor-pointer font-mono text-[11px]"
              aria-label="Close Inspection Folio"
            >
              [ESC / CLOSE ✕]
            </button>
          </div>
        </div>

        {/* Scrollable Folio Body: Double-Page Manuscript Spread */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          {/* Codex Spread Framing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0b1315] p-4 sm:p-8 border border-[var(--border-hairline)] relative">
            
            {/* Left Page (Verso): Archival Parchment Inlay with Scribe Carbon & Red Marginalia */}
            <div className="lg:col-span-6 bg-[#e8dfd1] text-[#242b2c] p-6 sm:p-8 shadow-inner border border-[#d8cfc0] flex flex-col justify-between relative">
              {/* Parchment Corner Ornamentation */}
              <div className="absolute top-2 left-2 text-[#b91c1c] text-xs font-mono select-none">❖</div>
              <div className="absolute top-2 right-2 text-[#b91c1c] text-xs font-mono select-none">❖</div>

              <div>
                {/* Folio Head Note */}
                <div className="pb-3 mb-4 border-b border-[#242b2c]/20 flex items-center justify-between font-mono text-[10px] text-[#242b2c]/70 tracking-widest uppercase">
                  <span>FOLIO VERSO · ፩</span>
                  <span className="text-[#b91c1c] font-bold">ገዳማዊ ምስጢር</span>
                </div>

                {/* Ge'ez Chapter Title & Latin Subtitle */}
                <div className="mb-4">
                  <span className="text-[#b91c1c] text-xs font-mono font-bold tracking-widest uppercase block mb-1">
                    ክፍል ፩ / ARCHIVAL SPECIMEN
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#151d1f] tracking-tight leading-snug">
                    {book.titleAm}
                  </h3>
                  <div className="font-serif italic text-sm text-[#242b2c]/80 mt-1">
                    Transliteration: “{book.titleEn}” ({book.year} G.C.)
                  </div>
                </div>

                {/* Primary Prose Excerpt in Scribe Carbon */}
                <p className="font-serif text-sm sm:text-base leading-relaxed text-[#242b2c] font-normal">
                  {lang === 'am' ? book.tagline?.am : book.tagline?.en}
                </p>

                {/* Scholarly In-Line Manuscript Excerpt */}
                <div className="mt-5 p-3.5 bg-[#f4efe6] border-l-2 border-[#b91c1c] text-xs font-serif italic text-[#242b2c] leading-relaxed">
                  {book.description?.am ? (
                    <span>«{book.description.am.slice(0, 240)}...»</span>
                  ) : (
                    <span>«የጥንታዊው የኢትዮጵያ ገዳማዊ ጥበብና የብራና ምስጢር ከዘመናዊው የሳይንስና የቴክኖሎጂ ምርምር ጋር የተዋሃደበት የታሪክ ሰነድ።»</span>
                  )}
                </div>
              </div>

              {/* Red-Ink Scholarly Marginalia Footnote (Rubrication Crimson) */}
              <div className="mt-6 pt-3 border-t border-[#b91c1c]/30 font-mono text-[10px] text-[#b91c1c] flex items-center justify-between">
                <span>RUBRIC CANON: VERIFIED ARCHIVE</span>
                <span>ገጽ ፳፬ / PG. 24</span>
              </div>
            </div>

            {/* Right Page (Recto): Deep Basalt Codex Analytics & Field Metadata */}
            <div className="lg:col-span-6 bg-[#0e1a1d] p-6 sm:p-8 border border-[var(--border-hairline)] flex flex-col justify-between">
              <div>
                {/* Recto Head Note */}
                <div className="pb-3 mb-4 border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-[10px] text-[var(--outline)] tracking-widest uppercase">
                  <span>FOLIO RECTO · ፪</span>
                  <span className="text-[var(--primary)] font-bold">CLASSIFICATION SPEC</span>
                </div>

                {/* Technical Coordinates Grid */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#080f11] border border-[var(--border-hairline)] flex items-center justify-between">
                    <span className="text-[var(--outline)]">CANONICAL ERA:</span>
                    <span className="text-[var(--secondary)] font-bold">
                      {book.year} G.C. · {book.yearEc} ዓ.ም.
                    </span>
                  </div>

                  <div className="p-3 bg-[#080f11] border border-[var(--border-hairline)] flex items-center justify-between">
                    <span className="text-[var(--outline)]">LITERARY TAXONOMY:</span>
                    <span className="text-[var(--on-surface)] text-right">
                      {book.genre || 'Speculative Ethiopian Fiction'}
                    </span>
                  </div>

                  {book.seriesOrder && (
                    <div className="p-3 bg-[#080f11] border border-[var(--border-hairline)] flex items-center justify-between">
                      <span className="text-[var(--outline)]">SERIES POSITION:</span>
                      <span className="text-[var(--primary)] font-bold">
                        PENTOLOGY VOL 0{book.seriesOrder}
                      </span>
                    </div>
                  )}

                  {book.translator && (
                    <div className="p-3 bg-[#132427] border border-[var(--primary-container)] flex items-center justify-between">
                      <span className="text-[var(--primary)]">ENGLISH TRANSLATOR:</span>
                      <span className="text-[var(--on-surface)] font-bold">
                        {book.translator}
                      </span>
                    </div>
                  )}
                </div>

                {/* Literary Thesis & Historical Significance */}
                <div className="mt-5">
                  <h4 className="font-mono text-[11px] text-[var(--secondary)] tracking-widest uppercase mb-2">
                    ARCHIVAL CURATORIAL NOTE
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                    {lang === 'am'
                      ? "ይህ ድንቅ ስራ የአገሪቱን የልቦለድ ድንበር በማስፋት ዘመናዊ ቴክኖሎጂንና የስለላ ጥበብን ከጣና ሐይቅ የገዳማት ምስጢር ጋር በማስተሳሰር በኢትዮጵያ የስነ-ጽሑፍ ታሪክ ውስጥ ከፍተኛ ተጽዕኖ አሳድሯል።"
                      : "A pivotal monument in modern African speculative literature, seamlessly bridging ancient Ethiopian monastic preservation with sovereign aerospace research and anti-colonial technological reclamation."}
                  </p>
                </div>
              </div>

              {/* Recto Shelf: Direct Conduits */}
              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[var(--secondary)]" />
                  <span className="font-mono text-[10px] text-[var(--outline)] uppercase">
                    SEAL: OFFICIAL REPOSITORY
                  </span>
                </div>

                <a
                  href={`/books/${book.slug}`}
                  className="btn-relic text-xs py-2 px-4"
                >
                  <span>{lang === 'am' ? 'ሙሉ የመጽሐፉን ማህደር ክፈት' : 'OPEN FULL DOSSIER'}</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Cartographic Status Bar */}
        <div className="px-6 py-3 bg-[#080f11] border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-[10px] text-[var(--outline)] uppercase tracking-widest">
          <span>YISMAKE WORKU ARCHIVE · ADDIS ABABA & DEBRE MARKOS</span>
          <span className="text-[var(--primary)]">VERIFIED CODEX SYSTEM ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
