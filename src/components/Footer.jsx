import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import AuthorSignature from './AuthorSignature';

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
        <div className="flex justify-center items-center gap-6 mb-10 text-lg">
          <a
            href="https://t.me/yismakeworku"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1e140d] border border-[#523824] hover:border-[#d4af37] text-[#d4af37] hover:scale-110 flex items-center justify-center transition-all shadow-md"
            title="Official Telegram Channel (18.6K+ subscribers)"
            aria-label="Telegram"
          >
            <span>✈️</span>
          </a>

          <a
            href="https://www.goodreads.com/book/show/16133457-dertogada"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1e140d] border border-[#523824] hover:border-[#d4af37] text-[#d4af37] hover:scale-110 flex items-center justify-center transition-all shadow-md font-serif font-bold text-xs"
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
            <span>▶</span>
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

        {/* Illuminated Author Signature */}
        <div className="flex flex-col items-center justify-center mb-10">
          <AuthorSignature className="h-16 sm:h-20 w-auto text-[#d4af37]" light={true} />
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
