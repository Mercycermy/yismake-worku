import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  const footerLinks = [
    { to: '/enquiries#terms', en: 'Terms of Use', am: 'የአጠቃቀም ደንቦች' },
    { to: '/enquiries#privacy', en: 'General Privacy Policy', am: 'የግላዊነት ፖሊሲ' },
    { to: '/enquiries', en: 'Enquiries & Rights', am: 'ጥያቄዎችና መብቶች' },
    { to: '/sources', en: 'Official Links', am: 'ማጣቀሻዎችና አገናኞች' },
    { to: '/enquiries#media-kit', en: 'Media Kit', am: 'የሚዲያ ማህደር' },
    { to: '/enquiries#faqs', en: 'FAQs', am: 'ተደጋጋሚ ጥያቄዎች' },
    { to: '/enquiries#verification', en: 'Legal & Book Verification', am: 'የህግና የመጽሐፍ ትክክለኛነት' }
  ];

  return (
    <footer
      id="colophon"
      className="relative site-footer text-[#dcd1c4] pt-16 pb-14 overflow-hidden border-t-2 border-[#3d2a1b]"
      style={{
        backgroundImage: "url('/images/footer-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-[#0d0906]/85 backdrop-blur-[2px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Footer Navigation Menu */}
        <div className="flex justify-center mb-10 pb-6 border-b border-[#4d3725]/60">
          <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 list-none p-0 m-0 text-xs sm:text-sm font-serif">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-[#dcd1c4] hover:text-[#d4af37] transition-colors tracking-wide underline-offset-4 hover:underline"
                >
                  {lang === 'am' ? item.am : item.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Channels */}
        <div className="flex justify-center items-center gap-6 mb-10">
          <a
            href="https://t.me/yismakeworku"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1e140d] border border-[#523824] hover:border-[#d4af37] text-[#d4af37] hover:scale-110 flex items-center justify-center transition-all shadow-md"
            title="Official Telegram Channel (18.6K+ subscribers)"
            aria-label="Telegram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </a>

          <a
            href="https://www.goodreads.com/book/show/16133457-dertogada"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1e140d] border border-[#523824] hover:border-[#d4af37] text-[#d4af37] hover:scale-110 flex items-center justify-center transition-all shadow-md font-serif font-bold text-sm"
            title="Goodreads Author Profile"
            aria-label="Goodreads"
          >
            <span>g</span>
          </a>

          <a
            href="https://www.youtube.com/results?search_query=Yismake+Worku"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1e140d] border border-[#523824] hover:border-[#d4af37] text-[#d4af37] hover:scale-110 flex items-center justify-center transition-all shadow-md"
            title="Interviews & Television Features"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 002.42 7.2 26.2 26.2 0 002 12c0 1.62.14 3.2.42 4.81a2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 001.76-1.77C21.86 15.2 22 13.62 22 12c0-1.62-.14-3.2-.42-4.81zM9.75 15.02V8.98l5.5 3.02-5.5 3.02z" />
            </svg>
          </a>

          <a
            href="https://henninghamfamilypress.com/the-lost-spell/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1e140d] border border-[#523824] hover:border-[#d4af37] text-[#d4af37] hover:scale-110 flex items-center justify-center transition-all shadow-md font-serif text-xs font-semibold"
            title="Henningham Family Press (UK Publisher)"
            aria-label="Publisher"
          >
            <span>UK</span>
          </a>
        </div>

        {/* Clean Author Brand Typography */}
        <div className="flex flex-col items-center justify-center mb-8 select-none">
          <div className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#dcd1c4] uppercase">
            YISMAKE WORKU
          </div>
          <div className="font-serif text-xs tracking-[0.3em] text-[#d4af37] uppercase mt-1">
            {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Official Author Website'}
          </div>
        </div>

        {/* Copyright & Legal Notices (Patterned directly after jkrowling.com) */}
        <div className="max-w-3xl mx-auto text-center font-serif text-xs text-[#a09080] space-y-3 leading-relaxed">
          <p className="font-bold text-[#dcd1c4] tracking-widest uppercase">
            &copy; {new Date().getFullYear()} YISMAKE WORKU. ALL RIGHTS RESERVED.
          </p>

          <p className="text-[#e5a840] font-sans text-[11px] bg-[#1a120b]/80 border border-[#4d3725] p-2.5 rounded-sm">
            {lang === 'am'
              ? 'ማሳሰቢያ፡ በይስማዕከ ወርቁ ስም የተከፈቱ ሀሰተኛ የማህበራዊ ሚዲያ ገጾችና ያልተፈቀዱ የፒዲኤፍ (PDF) ስርጭቶች እንዳሉ እናውቃለን። ትክክለኛና ህጋዊ መጻሕፍትን ለማግኘት እባክዎ የእኛን የጥያቄዎችና አድራሻ (Enquiries) ገጽ ይጎብኙ።'
              : 'We are aware of imposter accounts online and counterfeit bootleg printings posing as Yismake Worku and his publishers. Please visit our Enquiries page for verified information on authentic editions and official channels.'}
          </p>

          <div className="text-[11px] text-[#8e7e70] space-y-1.5 pt-2">
            <p>
              Dertogada, Ramatohara, Xantoxara, Yoratorad, Yotod, and associated character names and storyworlds &copy; Yismake Worku.
            </p>
            <p>
              “The Lost Spell” (English translation of Kebur Dengay) translation &copy; Dr. Bethlehem Attfield; published under exclusive UK license by Henningham Family Press, London.
            </p>
            <p>
              DERTOGADA UNIVERSE is a registered literary trademark of Yismake Worku.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
