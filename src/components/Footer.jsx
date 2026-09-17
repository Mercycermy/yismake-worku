import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="relative bg-[#080f11] border-t border-[var(--border-hairline)] pt-20 pb-16 text-[var(--on-surface-variant)]">
      <div className="site-container">
        {/* Top Colophon Imprimatur */}
        <div className="pb-14 border-b border-[var(--border-hairline)] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-[var(--secondary)] tracking-[0.25em] uppercase font-bold">
                {lang === 'am' ? 'የደራሲው ማህተመ-ቃል' : 'COLOPHON & IMPRIMATUR'}
              </span>
              <span className="text-[var(--primary)] text-xs">❖</span>
              <span className="font-mono text-[10px] text-[var(--outline)] tracking-widest">
                LAKE TANA BASIN · 11°56′N 37°18′E
              </span>
            </div>

            <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--on-surface)] tracking-tight">
              ይስማዕከ ወርቁ
            </div>

            <p className="mt-4 max-w-xl text-sm sm:text-base font-serif text-[var(--on-surface)] leading-relaxed italic border-l-2 border-[var(--primary-container)] pl-4 py-1 bg-[#0e1a1d]">
              {lang === 'am'
                ? "«አርበኛ ማለት 'አርነት በእኛ' ማለት ነው። አርበኝነት ታሪክ ብቻ ሳይሆን፣ የአእምሮአችንንና የዕውቀታችንን ነጻነት በየዕለቱ የመጠበቅ አደራ ነው።»"
                : "“A patriot truly means 'liberty through us' — it is not merely a memory, but the daily defense of our intellectual inheritance and sovereign mind.”"}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="font-mono text-xs text-[var(--secondary)] tracking-widest uppercase">
              OFFICIAL TELEGRAM DISPATCH
            </span>
            <a
              href="https://t.me/yismakeworku"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-relic text-xs py-2 px-4"
            >
              <span>@YISMAKEWORKU · 18.6K+ READERS</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Archival Index Columns (4 Columns with Ge'ez Locks & Hairline Rules) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[var(--border-hairline)] text-xs font-mono">
          {/* Column 1: Books */}
          <div>
            <div className="text-[var(--secondary)] font-bold tracking-[0.18em] uppercase mb-4 flex items-center gap-1.5 pb-1 border-b border-[var(--border-hairline)]">
              <span className="font-serif">፩</span>
              <span>·</span>
              <span>01 / {lang === 'am' ? 'መጻሕፍት' : 'CANON'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--outline)] list-none">
              <li>
                <Link to="/books/dertogada" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'ዴርቶጋዳ (2009)' : 'Dertogada (2009)'}
                </Link>
              </li>
              <li>
                <Link to="/books/ramatohara" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'ራማቶሓራ (2010)' : 'Ramatohara (2010)'}
                </Link>
              </li>
              <li>
                <Link to="/books/xantoxara" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'ዣንቶዣራ (2011)' : 'Xantoxara (2011)'}
                </Link>
              </li>
              <li>
                <Link to="/books/kebur-dengay" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'ክቡር ድንጋይ (2013)' : 'Kebur Dengay / Lost Spell'}
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-[var(--primary)] hover:text-white transition-colors inline-block mt-1 font-bold">
                  → {lang === 'am' ? 'የተሟላ 15+ መጻሕፍት' : 'View Full 15+ Works'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Storyworld */}
          <div>
            <div className="text-[var(--secondary)] font-bold tracking-[0.18em] uppercase mb-4 flex items-center gap-1.5 pb-1 border-b border-[var(--border-hairline)]">
              <span className="font-serif">፪</span>
              <span>·</span>
              <span>02 / {lang === 'am' ? 'የልቦለድ ዓለም' : 'WORLD'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--outline)] list-none">
              <li>
                <Link to="/universe" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'የዴርቶጋዳ 5 ተከታታይ' : 'The 5-Part Pentology'}
                </Link>
              </li>
              <li>
                <Link to="/universe#lake-tana" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'የጣና ሐይቅ ምስጢር' : 'Lake Tana Subterranean'}
                </Link>
              </li>
              <li>
                <Link to="/universe" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'ሻጊዝ እጅጉ እና ሲፓራ' : 'Shagiz Ejigu & Zipporah'}
                </Link>
              </li>
              <li>
                <Link to="/author" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'የደራሲው የህይወት ታሪክ' : 'Author Biography'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Archive */}
          <div>
            <div className="text-[var(--secondary)] font-bold tracking-[0.18em] uppercase mb-4 flex items-center gap-1.5 pb-1 border-b border-[var(--border-hairline)]">
              <span className="font-serif">፫</span>
              <span>·</span>
              <span>03 / {lang === 'am' ? 'ምርምርና ጥናት' : 'RESEARCH'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--outline)] list-none">
              <li>
                <Link to="/sources" className="hover:text-[var(--primary)] transition-colors block">
                  Taylor & Francis Study
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-[var(--primary)] transition-colors block">
                  TA First Translation Prize (UK)
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-[var(--primary)] transition-colors block">
                  Henningham Family Press
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'የቴሌቪዥን ቃለ-መጠይቆች' : 'Broadcast & Media Archive'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Communication */}
          <div>
            <div className="text-[var(--secondary)] font-bold tracking-[0.18em] uppercase mb-4 flex items-center gap-1.5 pb-1 border-b border-[var(--border-hairline)]">
              <span className="font-serif">፬</span>
              <span>·</span>
              <span>04 / {lang === 'am' ? 'ግንኙነት' : 'DISPATCH'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--outline)] list-none">
              <li>
                <a
                  href="https://t.me/yismakeworku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors block"
                >
                  Telegram: @yismakeworku
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--primary)] transition-colors block">
                  {lang === 'am' ? 'የሚዲያና የአካዳሚ ጥያቄ' : 'Academic / Media Inquiries'}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.goodreads.com/book/show/16133457-dertogada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors block"
                >
                  Goodreads Reader Archive ↗
                </a>
              </li>
              <li>
                <span className="text-[var(--outline-variant)] block mt-1">
                  Debre Markos University · Ethiopia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--outline)]">
          <div>
            <span>© {new Date().getFullYear()} YISMAKE WORKU (ይስማዕከ ወርቁ) · ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
            <span>TYPESET IN PLAYFAIR DISPLAY & NOTO SERIF ETHIOPIC</span>
            <span>•</span>
            <span className="text-[var(--primary)] font-bold">TEHADSO OBSIDIAN ARCHIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
