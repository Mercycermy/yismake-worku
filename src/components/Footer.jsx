import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="relative bg-[#0a0c0f] border-t border-[var(--rule-line)] pt-20 pb-16 text-[var(--text-stone)]">
      {/* Decorative Traditional Ethiopian Rubric Stamp */}
      <div className="site-container">
        {/* Top Colophon Imprimatur */}
        <div className="pb-14 border-b border-[var(--rule-line-subtle)] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-[var(--highland-gold)] tracking-[0.25em] uppercase">
                {lang === 'am' ? 'የደራሲው ማህተመ-ቃል' : 'COLOPHON & IMPRIMATUR'}
              </span>
              <span className="text-[var(--rubric-bright)] text-xs">❖</span>
              <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest">
                LAKE TANA BASIN · 11°56′N 37°18′E
              </span>
            </div>

            <div className="font-serif-ethiopic text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-vellum)] tracking-tight">
              ይስማዕከ ወርቁ
            </div>

            <p className="mt-4 max-w-xl text-sm sm:text-base font-serif-ethiopic text-[var(--text-vellum-soft)] leading-relaxed italic">
              {lang === 'am'
                ? "«አርበኛ ማለት 'አርነት በእኛ' ማለት ነው። አርበኝነት ታሪክ ብቻ ሳይሆን፣ የአእምሮአችንንና የዕውቀታችንን ነጻነት በየዕለቱ የመጠበቅ አደራ ነው።»"
                : "“A patriot truly means 'liberty through us' — it is not merely a memory, but the daily defense of our intellectual inheritance and sovereign mind.”"}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="font-mono text-xs text-[var(--highland-gold)] tracking-widest uppercase">
              OFFICIAL TELEGRAM DISPATCH
            </span>
            <a
              href="https://t.me/yismakeworku"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-archival text-xs py-2 px-4"
            >
              <span>@YISMAKEWORKU · 18.6K+ READERS</span>
              <span className="text-[var(--highland-gold)]">↗</span>
            </a>
          </div>
        </div>

        {/* Archival Index Columns (4 Columns with Clean Rules) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[var(--rule-line-subtle)] text-xs font-mono">
          {/* Column 1: Books */}
          <div>
            <div className="text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-1.5">
              <span>01</span>
              <span>/</span>
              <span>{lang === 'am' ? 'መጻሕፍት' : 'CANON'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--text-stone)] list-none">
              <li>
                <Link to="/books/dertogada" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'ዴርቶጋዳ (2009)' : 'Dertogada (2009)'}
                </Link>
              </li>
              <li>
                <Link to="/books/ramatohara" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'ራማቶሓራ (2010)' : 'Ramatohara (2010)'}
                </Link>
              </li>
              <li>
                <Link to="/books/xantoxara" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'ዣንቶዣራ (2011)' : 'Xantoxara (2011)'}
                </Link>
              </li>
              <li>
                <Link to="/books/kebur-dengay" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'ክቡር ድንጋይ (2013)' : 'Kebur Dengay / Lost Spell'}
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-[var(--highland-gold)] hover:text-[var(--text-vellum)] transition-colors inline-block mt-1">
                  → {lang === 'am' ? 'የተሟላ 15+ መጻሕፍት' : 'View Full 15+ Works'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Storyworld */}
          <div>
            <div className="text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-1.5">
              <span>02</span>
              <span>/</span>
              <span>{lang === 'am' ? 'የልቦለድ ዓለም' : 'WORLD'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--text-stone)] list-none">
              <li>
                <Link to="/universe" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'የዴርቶጋዳ 5 ተከታታይ' : 'The 5-Part Pentology'}
                </Link>
              </li>
              <li>
                <Link to="/universe#lake-tana" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'የጣና ሐይቅ ምስጢር' : 'Lake Tana Subterranean'}
                </Link>
              </li>
              <li>
                <Link to="/universe#characters" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'ሻጊዝ እጅጉ እና ሲፓራ' : 'Shagiz Ejigu & Zipporah'}
                </Link>
              </li>
              <li>
                <Link to="/author" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'የደራሲው የህይወት ታሪክ' : 'Author Biography'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Archive */}
          <div>
            <div className="text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-1.5">
              <span>03</span>
              <span>/</span>
              <span>{lang === 'am' ? 'ምርምርና ጥናት' : 'RESEARCH'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--text-stone)] list-none">
              <li>
                <Link to="/sources" className="hover:text-[var(--text-vellum)] transition-colors">
                  Taylor & Francis Study
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-[var(--text-vellum)] transition-colors">
                  TA First Translation Prize (UK)
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-[var(--text-vellum)] transition-colors">
                  Henningham Family Press
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'የቴሌቪዥን ቃለ-መጠይቆች' : 'Broadcast & Media Archive'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Communication */}
          <div>
            <div className="text-[var(--highland-gold)] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-1.5">
              <span>04</span>
              <span>/</span>
              <span>{lang === 'am' ? 'ግንኙነት' : 'DISPATCH'}</span>
            </div>
            <ul className="space-y-2.5 text-[var(--text-stone)] list-none">
              <li>
                <a
                  href="https://t.me/yismakeworku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-vellum)] transition-colors"
                >
                  Telegram: @yismakeworku
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--text-vellum)] transition-colors">
                  {lang === 'am' ? 'የሚዲያና የአካዳሚ ጥያቄ' : 'Academic / Media Inquiries'}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.goodreads.com/book/show/16133457-dertogada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-vellum)] transition-colors"
                >
                  Goodreads Reader Archive ↗
                </a>
              </li>
              <li>
                <span className="text-[var(--text-muted)] block mt-1">
                  Debre Markos University · Ethiopia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--text-muted)]">
          <div>
            <span>© {new Date().getFullYear()} YISMAKE WORKU (ይስማዕከ ወርቁ) · ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
            <span>TYPESET IN NOTO SERIF ETHIOPIC & CORMORANT GARAMOND</span>
            <span>•</span>
            <span className="text-[var(--highland-gold)]">AUTHORED DIGITAL ARCHIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
