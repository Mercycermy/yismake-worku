import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { verifiedQuotes } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';

export default function InHisOwnWords() {
  const { lang } = useLanguage();
  const [copiedId, setCopiedId] = useState(null);

  const copyQuote = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const essays = [
    {
      id: 'letter-to-readers',
      titleEn: 'A Letter to the Sovereign Mind: On Why We Dream in Amharic',
      titleAm: 'ለነጻው ህሊና የተጻፈ ደብዳቤ፡ በራሳችን ቋንቋ ለምን እናልማለን?',
      date: 'Addis Ababa & Gojjam',
      bodyEn: [
        "When I sat down in my early twenties to draft Dertogada, people often asked me: 'Why science fiction in Amharic? Why speak of orbital rockets and quantum labs in our ancient tongue?'",
        "My answer has always been simple: A nation that borrows another’s language to imagine its future will perpetually borrow another’s future. Our monasteries in Gojjam, Gondar, and Lake Tana preserved astronomical computations, herbal medicine, and philosophy for millennia. Dertogada was not an imitation of foreign science; it was an awakening of African intellectual sovereignty.",
        "To every young Ethiopian reader holding a pen today: your stories matter. Your heritage is not an artifact to be locked behind glass; it is fuel for the stars."
      ],
      bodyAm: [
        "በሃያዎቹ መጀመሪያ ዕድሜዬ ላይ ሆኜ «ዴርቶጋዳ»ን መጻፍ ስጀምር፣ ብዙዎች 'በአማርኛ የሳይንስ ልቦለድ እንዴት ይቻላል? ስለ ጠፈር ምርምርና ሮኬት በራሳችን ቋንቋ እንዴት ይጻፋል?' ይሉኝ ነበር።",
        "መልሴ ሁሌም አንድ ነበር፡ የወደፊት ህልሙን በሰው ቋንቋ የሚበደር ህዝብ፣ የወደፊት እጣ ፈንታውንም በሰው እጅ ላይ ይተዋል። በጎጃም፣ በጎንደርና በጣና ገዳማት ውስጥ ለዘመናት ተጠብቀው የቆዩት የስነ-ከዋክብት ስሌቶችና ጥበቦች የመጪው ትውልድ መነሻ ናቸው። ዴርቶጋዳ የውጭውን ዓለም መኮረጅ ሳይሆን፣ የአገራዊ አእምሮአችን የነጻነት ጥሪ ነበር።",
        "ዛሬ ብዕር ለጨበጣችሁ ወጣት ኢትዮጵያውያን ሁሉ የምለው፡ የእናንተ ታሪክ ትልቅ ዋጋ አለው። ቅርሳችን በመስታወት ውስጥ የሚቀመጥ ሙዚየም ብቻ ሳይሆን፣ ወደ ከዋክብት የሚያደርሰን ጉልበት ነው።"
      ]
    },
    {
      id: 'crucible-and-recovery',
      titleEn: 'The Crucible: Surviving August 2017 & The Grace of Fortitude',
      titleAm: 'ፈተናን በጽናት ማለፍ፡ የነሐሴ 2009 አደጋ እና የሰው ልጅ መንፈስ',
      date: 'Post-Accident Reflection',
      bodyEn: [
        "The catastrophic car accident in August 2017 brought me to the precipice of mortality. In hospital rooms where machines beat in place of human rhythm, you realize how fragile the physical casing of life truly is.",
        "Yet in that vulnerability, I discovered the overwhelming grace of the Ethiopian reader. From street vendors in Merkato to university professors and diaspora readers across oceans, people held prayer vigils and sent messages of solidarity. It taught me that an author does not write alone; an author is carried upon the collective breath of the people.",
        "Physical pain can lock the limbs, but it can never lock the imagination. Out of that crucible came 'Tekerchem' (Locked)—a meditation on freedom that no prison or bodily injury can ever take away."
      ],
      bodyAm: [
        "በነሐሴ 2009 ዓ.ም የደረሰብኝ ከባድ የመኪና አደጋ የህይወቴን ትልቅ ፈተና ይዞ መጣ። በሆስፒታል አልጋ ላይ ተኝቼ የሰውን ልጅ አካላዊ ደካማነትና የህይወትን አላፊነት በጥልቅ አስተዋልኩ።",
        "ነገር ግን በዚያ አስቸጋሪ ወቅት ውስጥ የመላው የኢትዮጵያ ህዝብና የአንባቢዬ ፍቅር ታላቅ ብርታት ሆነኝ። ከመርካቶ ነጋዴዎች እስከ ዩኒቨርሲቲ መምህራን፣ ከአገር ቤት እስከ ባህር ማዶ ድረስ የተደረገልኝ ጸሎትና ድጋፍ ጥበብ የህዝብ መሆኗን በተግባር አሳየኝ።",
        "ህመም አካልን ቢያዳክምም፣ የነጻነትን መንፈስና ምናብን ግን ፈጽሞ ማሰር አይችልም። ከዚያ ፈተና በኋላ የተጻፈው «ተከርቼም» ማንም የማይደፍረውን የሰው ልጅ ውስጣዊ ነጻነት ያወድሳል።"
      ]
    }
  ];

  return (
    <div className="bg-white text-[#222222] font-sans antialiased">
      <PageBanner title={lang === 'am' ? 'በራሱ አንደበት' : 'In His Own Words'} />
      <div className="site-container max-w-3xl mx-auto py-14 sm:py-20">
        {/* Page Subtitle */}
        <div className="text-center mb-14">
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'ደራሲ ይስማዕከ ወርቁ ስለ ህይወቱ፣ ስለ ስነ-ጽሑፍ ጉዞውና ስለ ፈተናዎች በራሱ ብዕር ያሰፈራቸው ጥልቅ ማስታወሻዎች።'
              : 'Personal essays, letters to readers, and reflections on writing, sovereignty, and recovery in Yismake Worku’s own voice.'}
          </p>
        </div>

        {/* Featured Essays */}
        <div className="space-y-16 mb-24">
          {essays.map((essay) => (
            <article
              key={essay.id}
              className="bg-[#fafafa] border border-gray-200 p-8 sm:p-12 rounded-sm shadow-sm"
            >
              <div className="text-xs font-bold text-[#888888] tracking-widest uppercase mb-3">
                {essay.date}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-6 leading-tight">
                {lang === 'am' ? essay.titleAm : essay.titleEn}
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed font-serif">
                {(lang === 'am' ? essay.bodyAm : essay.bodyEn).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <span className="font-serif text-sm italic text-[#555555]">
                  — {lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku'}
                </span>
                <span className="text-xs text-gray-400">
                  LITERARY ARCHIVE
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Quotations Gallery */}
        <div className="pt-12 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#111111]">
              {lang === 'am' ? 'የተመረጡ ጥቅሶችና ፍልስፍናዎች' : 'Words from the Novels'}
            </h2>
            <p className="text-sm text-[#666666] mt-2">
              {lang === 'am' ? 'ከዴርቶጋዳ፣ ክቡር ድንጋይና ሜሎስ የተወሰዱ አጫጭር ኃይለ-ቃላት' : 'Timeless passages on human power, liberty, and the African mind.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedQuotes.map((q) => (
              <div
                key={q.id}
                className="bg-white border border-gray-200 p-6 rounded-sm flex flex-col justify-between hover:border-gray-400 transition-colors shadow-sm"
              >
                <div>
                  <div className="text-[#c59b27] text-3xl font-serif leading-none mb-2">“</div>
                  <p className="font-serif text-base text-[#333333] leading-relaxed italic mb-4">
                    {lang === 'am' ? q.quoteAm : q.quoteEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#111111]">
                      {lang === 'am' ? q.sourceAm : q.sourceEn}
                    </span>
                    <span className="text-gray-400 block text-[11px]">
                      {lang === 'am' ? q.themeAm : q.theme}
                    </span>
                  </div>

                  <button
                    onClick={() => copyQuote(lang === 'am' ? q.quoteAm : q.quoteEn, q.id)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-all cursor-pointer text-xs font-semibold"
                    title="Copy Quote"
                  >
                    {copiedId === q.id ? (lang === 'am' ? 'ተቀድቷል ✓' : 'Copied! ✓') : (lang === 'am' ? 'ቅዳ' : 'Copy')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
