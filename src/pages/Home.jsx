import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import Icon from '../components/Icon';
import HeroSection from '../components/HeroSection';
import BookShowcase from '../components/BookShowcase';
import { verifiedBooks } from '../data/yismakeData';

function categoryForBook(book) {
  if (['dertogada', 'ramatohara', 'xantoxara', 'yoratorad', 'yotod'].includes(book.slug)) return 'dertogada';
  if (['kebur-dengay', 'dehinetu', 'yeogaden-demetoch'].includes(book.slug)) return 'kibur-dingay';
  if (['telmid', 'tekerchem', 'zamra', 'melos', 'gefuan'].includes(book.slug)) return 'other-novels';
  return 'poetry';
}

export default function Home() {
  const { lang } = useLanguage();
  const carouselRef = useRef(null);

  return (
    <div className="author-home">
      <HeroSection scrollToTrilogy={() => carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
      <section ref={carouselRef} className="home-collection" aria-labelledby="home-collection-title">
        <div className="site-container">
          <header className="collection-heading">
            <span className="editorial-eyebrow">{lang === 'am' ? 'የተሟላ የመጻሕፍት ስብስብ' : 'A LIFE IN STORIES'}</span>
            <h2 id="home-collection-title">{lang === 'am' ? 'የተሟላ የመጻሕፍት ስብስብ' : 'The Masterpiece Collection'}</h2>
            <p>{lang === 'am' ? 'ከዴርቶጋዳ ተከታታይ እስከ ልቦለዶችና ግጥሞች። የሚቀጥለውን ንባብዎን ያግኙ።' : 'From the world of Dertogada to novels and poetry. A story for every curious mind.'}</p>
          </header>
          <BookShowcase
            books={verifiedBooks}
            lang={lang}
            label={lang === 'am' ? 'ይስማዕከ ወርቁ · ሁሉም መጻሕፍት' : `YISMAKE WORKU · ${verifiedBooks.length} BOOKS`}
            collectionHref={book => `/books?category=${categoryForBook(book)}`}
            collectionLabel={lang === 'am' ? 'ተከታታዩን ይመልከቱ' : 'Explore the series'}
          />
          <div className="collection-closing">
            <p>{lang === 'am' ? 'አራት ዘርፎች። ለማሰስ የሚጋብዙ ብዙ ዓለማት።' : 'Four collections. Many worlds to discover.'}</p>
            <Link to="/books" className="collection-button collection-button--dark">{lang === 'am' ? 'ሁሉንም መጻሕፍት ያስሱ' : 'Browse all books'}<Icon name="arrowRight" size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
