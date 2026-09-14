import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="relative bg-[#05070a] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Subtle Grid & Depth */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Author Brand & Vision */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group text-decoration-none inline-flex">
              <div className="author-seal">
                <span>ይ</span>
              </div>
              <div>
                <div className="text-xl font-bold tracking-wider text-white font-['Cinzel']">
                  YISMAKE WORKU
                </div>
                <div className="text-sm text-[#d4af37] font-semibold font-['Noto_Serif_Ethiopic'] -mt-1">
                  ይስማዕከ ወርቁ
                </div>
              </div>
            </Link>

            <p className="mt-4 text-sm text-[#9aa5b8] max-w-sm leading-relaxed">
              {lang === 'am'
                ? "የኢትዮጵያን ጥንታዊ ገዳማዊ ጥበብና ታሪክ ከዘመናዊው የቴክኖሎጂ እና የጠፈር ሳይንስ ልቦለድ ጋር በማዋሃድ አዲስ የስነ-ጽሑፍ ዘመን የፈጠረ የጥበብ ዓለም።"
                : "A visionary literary universe where ancient Ethiopian monastic scholarship, secret Ge'ez manuscripts, and Afrofuturist quantum science collide."}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://t.me/yismakeworku"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Telegram: @yismakeworku (18.6K+)</span>
              </a>
            </div>
          </div>

          {/* Col 2: The Universe */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold mb-4 font-['Cinzel']">
              {lang === 'am' ? "የዴርቶጋዳ ዓለም" : "The Universe"}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9aa5b8] list-none">
              <li>
                <Link to="/books/dertogada" className="hover:text-[#00f0ff] transition-colors">
                  1. {lang === 'am' ? 'ዴርቶጋዳ' : 'Dertogada (2009)'}
                </Link>
              </li>
              <li>
                <Link to="/books/ramatohara" className="hover:text-[#00f0ff] transition-colors">
                  2. {lang === 'am' ? 'ራማቶሓራ' : 'Ramatohara (2010)'}
                </Link>
              </li>
              <li>
                <Link to="/books/xantoxara" className="hover:text-[#00f0ff] transition-colors">
                  3. {lang === 'am' ? 'ዣንቶዣራ' : 'Xantoxara (2011)'}
                </Link>
              </li>
              <li>
                <Link to="/books/yoratorad" className="hover:text-[#00f0ff] transition-colors">
                  4. {lang === 'am' ? 'ዮራቶራድ' : 'Yoratorad (2014)'}
                </Link>
              </li>
              <li>
                <Link to="/books/yotod" className="hover:text-[#00f0ff] transition-colors">
                  5. {lang === 'am' ? 'ዮቶድ' : 'Yotod (2016)'}
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/universe" className="text-xs text-[#00f0ff] font-semibold hover:underline">
                  {lang === 'am' ? '→ ሙሉውን ካርታ ይመልከቱ' : '→ Explore Storyworld Map'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Standalone Works */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold mb-4 font-['Cinzel']">
              {lang === 'am' ? "ታዋቂ ስራዎች" : "Masterpieces"}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9aa5b8] list-none">
              <li>
                <Link to="/books/kebur-dengay" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'ክቡር ድንጋይ (The Lost Spell)' : 'The Lost Spell (Kebur Dengay)'}
                </Link>
              </li>
              <li>
                <Link to="/books/zamra" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'ዛምራ' : 'Zamra (Eco-Thriller)'}
                </Link>
              </li>
              <li>
                <Link to="/books/gefuan" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'ግፉዓን' : 'Gefuan (The Oppressed)'}
                </Link>
              </li>
              <li>
                <Link to="/books/melos" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'ሜሎስ' : 'Melos'}
                </Link>
              </li>
              <li>
                <Link to="/books/yewond-mit" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'የወንድ ምጥ' : 'Yewond Mit (Poetry)'}
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/books" className="text-xs text-[#d4af37] font-semibold hover:underline">
                  {lang === 'am' ? '→ 15+ መጻሕፍትን ያስሱ' : '→ View All 15+ Titles'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Archival & Sources */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold mb-4 font-['Cinzel']">
              {lang === 'am' ? "ማህደርና ማጣቀሻ" : "Archive & Links"}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9aa5b8] list-none">
              <li>
                <Link to="/author" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'የደራሲው የህይወት ታሪክ' : 'Author Biography'}
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'ቃለ-መጠይቆችና ሚዲያ' : 'Interviews & Media'}
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'አካዳሚያዊ ማጣቀሻዎች' : 'Academic Bibliography'}
                </Link>
              </li>
              <li>
                <a
                  href="https://henninghamfamilypress.com/the-lost-spell/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00f0ff] transition-colors"
                >
                  Henningham Family Press (UK)
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#00f0ff] transition-colors">
                  {lang === 'am' ? 'የአንባቢና የሚዲያ ግንኙነት' : 'Reader & Press Inquiries'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Fair Use & Verification Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} Yismake Worku (ይስማዕከ ወርቁ). All literary rights reserved.</span>
            <span className="block text-[11px] text-white/35 mt-1">
              Official literary archive and discovery showcase. Dedicated to scholarly study and reading discovery.
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-white/40">
            <Link to="/sources" className="hover:text-[#d4af37]">Sources & Verification</Link>
            <span>•</span>
            <a href="https://t.me/yismakeworku" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f0ff]">
              Official Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
