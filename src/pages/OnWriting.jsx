import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';

export default function OnWriting() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('process');

  const craftAdvice = [
    {
      num: '01',
      titleEn: 'Write From Your Own Roots, Not Borrowed Soil',
      titleAm: 'በራስህ አፈር ላይ ጀምር',
      descEn:
        'Do not try to make your story sound like an American or European thriller. Look at your own monasteries, your mountain passes, your grandmothers’ proverbs. Authentic specificity is the only door to universal appeal.',
      descAm:
        'የአሜሪካ ወይም የአውሮፓ ልቦለዶችን ለመምሰል አትሞክር። የራስህን ገዳማት፣ ተራሮች፣ የገበሬውን ወግና የአያቶችህን ቅኔ ተመልከት። የራስህን ተጨባጭ እውነት በቅንነት ስትገልጽ ዓለም ያደምጥሃል።'
    },
    {
      num: '02',
      titleEn: 'Discipline Over Inspiration',
      titleAm: 'ስሜትን ሳይሆን ልማድን ተከተል',
      descEn:
        'Inspiration is a fickle guest; habit is a loyal companion. When drafting Dertogada, I did not wait for the muse. I woke up at 4:30 AM before my university teaching duties and wrote at least 1,500 words each morning.',
      descAm:
        'ተመስጦ ሁሌም አይመጣም፤ ጽናትና ልማድ ግን አያሳፍሩህም። ዴርቶጋዳን ስጽፍ ተመስጦ እስኪመጣ አልጠበቅኩም፤ በደብረ ማርቆስ ማለዳ 10፡30 ተነስቼ ከማስተማሬ በፊት ቢያንስ 1,500 ቃላትን እጽፍ ነበር።'
    },
    {
      num: '03',
      titleEn: 'Respect Your Reader’s Intelligence',
      titleAm: 'የአንባቢህን አእምሮ አታሳንሰው',
      descEn:
        'Never spoon-feed the plot. Leave room for the reader to deduce, question, and connect the dots. The greatest satisfaction of reading is when the reader feels like a co-discoverer of the secret.',
      descAm:
        'ሁሉንም ነገር አኝከህ አታጉርሰው። ለአንባቢው ማሰብያ፣ መፈተሻና ምስጢሩን በራሱ መፍቻ ክፍተት ተውለት። ትልቁ የንባብ እርካታ አንባቢው ምስጢሩን ከደራሲው ጋር አብሮ ያገኘው ሲመስለው ነው።'
    },
    {
      num: '04',
      titleEn: 'Language is Music: Master Its Cadence',
      titleAm: 'ቋንቋ ዜማ ነው፤ ምቱን ጠብቅ',
      descEn:
        'Read your dialogue aloud. Amharic has rich rhythmic cadences inherited from centuries of church chant (Zema) and public rhetoric. If a sentence stumbles when spoken, it will stumble in the reader’s mind.',
      descAm:
        'የጻፍከውን ንግግር ጮክ ብለህ አንብበው። አማርኛ ከዜማና ከቅኔ ባህላችን የተወረሰ ጥልቅ ሙዚቃ አለው። በአንደበትህ ሲነበብ የሚደናቀፍ አረፍተ ነገር፣ በአንባቢውም ህሊና ውስጥ ይደናቀፋል።'
    },
    {
      num: '05',
      titleEn: 'Endure the Crucible',
      titleAm: 'ፈተናን ለጥበብህ ማገዶ አድርገው',
      descEn:
        'Rejection, physical hardship, and creative exhaustion are inescapable. Do not let critics silence you. Turn your pain into ink. A writer who has survived the fire writes with unshakeable conviction.',
      descAm:
        'ተስፋ መቁረጥ፣ አካላዊ ህመም እና የደከመ አእምሮ ደራሲን ይፈትናሉ። ተቺዎች ብዕርህን እንዲሰብሩት አትፍቀድ። ህመምህን ለጥበብህ ማገዶ አድርገው። በእሳት ውስጥ ያለፈ ደራሲ ጽሑፉ አይናወጥም።'
    }
  ];

  return (
    <div className="bg-white text-[#222222] font-sans py-14 sm:py-20">
      <div className="site-container max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-14 pb-8 border-b border-gray-200">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] mb-4">
            {lang === 'am' ? 'ስለ አጻጻፍ ጥበብ' : 'On Writing'}
          </h1>
          <p className="text-base text-[#666666] max-w-xl mx-auto font-serif">
            {lang === 'am'
              ? 'ደራሲ ይስማዕከ ወርቁ ልቦለዶቹን እንዴት እንደሚቀርጽ፣ የፈጠራ ልማዶቹንና ለወጣት ጸሐፊዎች ያዘጋጀው ምክር።'
              : 'Insights into the creative process, routine, drafting of Dertogada, and guidance for aspiring authors.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 border-b border-gray-200">
          <div className="flex gap-4 sm:gap-8">
            <button
              onClick={() => setActiveTab('process')}
              className={`pb-3 font-serif text-sm sm:text-base font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'process'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {lang === 'am' ? 'የፈጠራ ሂደቱ' : 'The Creative Process'}
            </button>
            <button
              onClick={() => setActiveTab('advice')}
              className={`pb-3 font-serif text-sm sm:text-base font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'advice'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {lang === 'am' ? 'ምክሮች ለጸሐፊዎች' : 'Advice for Writers'}
            </button>
            <button
              onClick={() => setActiveTab('genesis')}
              className={`pb-3 font-serif text-sm sm:text-base font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'genesis'
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {lang === 'am' ? 'የዴርቶጋዳ አመጣጥ' : 'Genesis of Dertogada'}
            </button>
          </div>
        </div>

        {/* Tab 1: The Creative Process */}
        {activeTab === 'process' && (
          <div className="space-y-10 animate-fade-in">
            <article className="bg-[#fafafa] border border-gray-200 p-8 sm:p-10 rounded-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-4">
                {lang === 'am' ? 'የጸሐፊው ማለዳና የቡና ወግ' : 'The Morning Sanctuary & Coffee Ritual'}
              </h2>
              <div className="text-base sm:text-lg text-[#333333] leading-relaxed space-y-4 font-serif">
                <p>
                  {lang === 'am'
                    ? 'ለእኔ ጽሑፍ ከመጻፍ በፊት የአእምሮ ጸጥታ ይፈልጋል። አብዛኞቹን መጻሕፍቴን የምጀምረው ማለዳ ላይ ትኩስ የኢትዮጵያ ጀበና ቡና እየጠጣሁ ነው። በኮምፒውተር ከመጻፌ በፊት፣ በመጀመሪያ ሃሳቦቹን በደብተር ላይ በብዕር መክተብ እመርጣለሁ።'
                    : 'For me, storytelling begins long before the fingers hit a keyboard. I wake before dawn, brewing strong Ethiopian coffee. There is an intimate, tactile connection between ink flowing on paper and human contemplation that no screen can match.'}
                </p>
                <p>
                  {lang === 'am'
                    ? 'ደብተርና ብዕር ሃሳብህን ያረጋጉታል፤ ያረሙታል። የሻጊዝ እጅጉ ገጸ ባህሪ፣ የሲፓራ ውስጣዊ ግጭትና የጣና ሐይቁ የከርሰ ምድር ላቦራቶሪ የተወለዱት በዚያ ረጋ ባለ ማለዳ ላይ በተጻፉ የእጅ ጽሑፎች ነው።'
                    : 'The notebooks allow room for margin sketches, arrows, alternate timelines, and Ge’ez cryptographic codes. The complex conspiracies of Dertogada and Ramatohara were all architected page by page in physical composition books.'}
                </p>
              </div>
            </article>

            <article className="bg-[#fafafa] border border-gray-200 p-8 sm:p-10 rounded-sm">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-4">
                {lang === 'am' ? 'ገዳማዊ ጥበብና ዘመናዊ ሳይንስ' : 'Bridging Ancient Lore & Orbital Science'}
              </h2>
              <div className="text-base sm:text-lg text-[#333333] leading-relaxed space-y-4 font-serif">
                <p>
                  {lang === 'am'
                    ? 'የኢትዮጵያ ገዳማት የብራና መጻሕፍት አስደናቂ የስነ-ከዋክብት፣ የሂሳብና የፍልስፍና ምስጢራትን ይዘዋል። ሳይንስና እምነት እርስ በርስ አይጣሉም፤ አንዱ የሌላው ማሟያ ነው። ዴርቶጋዳ ይህን ጥንታዊ ሀብት ዘመናዊው ትውልድ በሳይንስ ልቦለድ መነጽር እንዲመለከተው አድርጓል።'
                    : 'Ancient Ethiopian manuscripts were not created out of idle superstition; they carefully recorded astronomical orbits, herbal pharmacology, and cosmic geometry. In my fiction, I wanted the modern laboratory not to replace the monastery, but to realize its ancient equations.'}
                </p>
              </div>
            </article>
          </div>
        )}

        {/* Tab 2: Advice for Writers */}
        {activeTab === 'advice' && (
          <div className="space-y-6 animate-fade-in">
            {craftAdvice.map((item) => (
              <div
                key={item.num}
                className="bg-[#fafafa] border border-gray-200 p-6 sm:p-8 rounded-sm hover:border-gray-400 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-sm text-[#888888] font-bold">{item.num}</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                    {lang === 'am' ? item.titleAm : item.titleEn}
                  </h3>
                </div>
                <p className="text-base text-[#555555] leading-relaxed mt-2 pl-7">
                  {lang === 'am' ? item.descAm : item.descEn}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Genesis of Dertogada */}
        {activeTab === 'genesis' && (
          <div className="bg-[#fafafa] border border-gray-200 p-8 sm:p-12 rounded-sm space-y-6 text-base sm:text-lg text-[#333333] leading-relaxed font-serif animate-fade-in">
            <div className="text-xs font-bold text-[#888888] tracking-widest uppercase">
              DEBRE MARKOS UNIVERSITY · 2008–2009
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {lang === 'am' ? 'ዴርቶጋዳ እንዴት ተወለደ?' : 'How Dertogada Was Born'}
            </h2>
            <p>
              {lang === 'am'
                ? 'በደብረ ማርቆስ ዩኒቨርሲቲ በማስተምርበት ወቅት፣ ተማሪዎችና ወጣቶች በአብዛኛው የውጭ ሀገር ልቦለዶችን ያነቡ ነበር። በራሳችን ቋንቋና ባህል የተቃኘ፣ በአለም አቀፍ ደረጃ ሊወዳደር የሚችል የሳይንስና የስለላ ልቦለድ ለምን አይጻፍም? የሚል ቁጭት አደረብኝ።'
                : 'While teaching at Debre Markos University, I watched thousands of ambitious students devouring foreign thrillers. A quiet determination gripped me: Why should our youth only imagine NASA, secret labs, and geopolitical mastery in English or French? Why not in Amharic, grounded in our own sacred soil?'}
            </p>
            <p>
              {lang === 'am'
                ? 'በዚያ ወቅት የተነሳሳው የመጀመሪያው ረቂቅ በአንድ ዓመት ውስጥ ብቻ 10 ጊዜ ታትሞ ከ200,000 በላይ ቅጂዎች ይሸጣል ብሎ የጠበቀ ማንም አልነበረም። ይህ የሚያሳየው አንባቢው የራሱን አገራዊ ማንነት በከፍተኛ ደረጃ የሚናፍቅ መሆኑን ነው።'
                : 'When the first edition was printed, booksellers predicted it would take years to sell 3,000 copies. Instead, it evaporated within weeks. Readers passed worn copies hand-to-hand across university dormitories, taxi lines, and diaspora living rooms. It proved that African audiences are hungry for high-stakes intellectual adventures rooted in their own heritage.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
