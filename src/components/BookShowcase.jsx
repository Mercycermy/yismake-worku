import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';

const SLIDE_DURATION = 5500;
const wrap = (value, length) => ((value % length) + length) % length;

function bookText(book, lang) {
  const text = book.tagline || book.description;
  return text && typeof text === 'object' ? text[lang] || text.en : text || '';
}

export default function BookShowcase({ books, lang = 'en', label, collectionHref, collectionLabel, onBrowse, showAllCovers = false }) {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const pointerStart = useRef(null);
  const swiped = useRef(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Repeat short collections so wrapping covers can travel through hidden positions.
  const slides = useMemo(() => {
    if (!books.length) return [];
    return Array.from({ length: Math.ceil(6 / books.length) }, (_, copy) =>
      books.map((book, index) => ({ book, index, key: `${book.slug}-${copy}` }))
    ).flat();
  }, [books]);
  const total = books.length;
  const current = slides[wrap(active, slides.length || 1)];
  const playing = total > 1 && !paused && !hovered && !focused && inView && !hidden && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.2), { threshold: 0.2 });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setTimeout(() => setActive(value => wrap(value + 1, slides.length)), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, playing, slides.length]);

  if (!current) return null;
  const { book, index: bookIndex } = current;
  const move = direction => setActive(value => wrap(value + direction, slides.length));
  const browseLabel = collectionLabel || (lang === 'am' ? 'ስብስቡን ይመልከቱ' : 'Explore the collection');
  const browseHref = typeof collectionHref === 'function' ? collectionHref(book) : collectionHref;

  return (
    <div
      ref={rootRef}
      className={`book-showcase${showAllCovers ? ' book-showcase--all' : ''}`}
      data-book-count={total}
      style={{ '--slide-duration': `${SLIDE_DURATION}ms`, '--slot-center': showAllCovers && total % 2 === 0 ? 0.5 : 0 }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <div className="book-showcase__top">
        <span className="book-showcase__label">{label}</span>
        <div className="book-showcase__controls">
          <span className="book-showcase__count"><strong>{String(bookIndex + 1).padStart(2, '0')}</strong><span> / {String(total).padStart(2, '0')}</span></span>
          <button type="button" onClick={() => move(-1)} aria-label={lang === 'am' ? 'ያለፈው መጽሐፍ' : 'Previous book'}><Icon name="chevronLeft" size={18} /></button>
          {!reducedMotion && <button type="button" onClick={() => { setPaused(value => !value); setFocused(false); }} aria-label={paused ? (lang === 'am' ? 'ስላይዱን አስቀጥል' : 'Play slideshow') : (lang === 'am' ? 'ስላይዱን አቁም' : 'Pause slideshow')} aria-pressed={paused}><Icon name={paused ? 'play' : 'pause'} size={14} /></button>}
          <button type="button" onClick={() => move(1)} aria-label={lang === 'am' ? 'ቀጣዩ መጽሐፍ' : 'Next book'}><Icon name="chevronRight" size={18} /></button>
        </div>
      </div>

      <div
        className="book-showcase__viewport"
        onPointerDown={event => {
          pointerStart.current = { x: event.clientX, y: event.clientY };
          swiped.current = false;
        }}
        onPointerUp={event => {
          if (!pointerStart.current) return;
          const dx = event.clientX - pointerStart.current.x;
          const dy = event.clientY - pointerStart.current.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            swiped.current = true;
            move(dx < 0 ? 1 : -1);
          }
          pointerStart.current = null;
        }}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {slides.map((slide, position) => {
          const distance = wrap(position - active + Math.floor(slides.length / 2), slides.length) - Math.floor(slides.length / 2);
          const depth = Math.abs(distance);
          const firstSlot = showAllCovers ? -Math.floor((total - 1) / 2) : -2;
          const lastSlot = showAllCovers ? Math.ceil((total - 1) / 2) : 2;
          const visible = distance >= firstSlot && distance <= lastSlot;
          return (
            <button
              key={slide.key}
              type="button"
              className={`book-showcase__cover${depth === 0 ? ' is-active' : ''}`}
              style={{ '--book-slot': distance, '--book-scale': depth === 0 ? 1 : depth === 1 ? 0.72 : 0.53, '--book-opacity': !visible ? 0 : depth === 0 ? 1 : depth === 1 ? 0.85 : 0.7, zIndex: 10 - depth }}
              data-depth={Math.min(depth, 3)}
              data-hidden={!visible}
              tabIndex={depth === 0 ? 0 : -1}
              aria-hidden={depth !== 0}
              aria-label={`${lang === 'am' ? slide.book.titleAm : slide.book.titleEn}${depth === 0 ? (lang === 'am' ? ' · ዝርዝሩን ክፈት' : ' · open book details') : ''}`}
              onClick={() => {
                if (swiped.current) return;
                if (depth === 0) navigate(`/books/${slide.book.slug}`);
                else setActive(position);
              }}
              draggable={false}
            >
              <img src={slide.book.coverImage} alt={slide.book.titleEn} loading={depth < 2 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
            </button>
          );
        })}
      </div>

      <div className="book-showcase__story" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        <div className="book-showcase__story-content" key={book.slug}>
          <p className="book-showcase__meta">{book.year}<span>·</span>{lang === 'am' ? 'ይስማዕከ ወርቁ' : 'Yismake Worku'}</p>
          <h3>{lang === 'am' ? book.titleAm : book.titleEn}</h3>
          <p className="book-showcase__description">{bookText(book, lang)}</p>
        </div>
        <div className="book-showcase__actions">
          <Link to={`/books/${book.slug}`} className="collection-button collection-button--dark">{lang === 'am' ? 'ዝርዝርና ቅምሻ' : 'Details & sample'}<Icon name="arrowRight" size={15} /></Link>
          {onBrowse ? <button type="button" className="collection-button collection-button--outline" onClick={onBrowse}>{browseLabel}<Icon name="arrowRight" size={15} /></button> : browseHref && <Link to={browseHref} className="collection-button collection-button--outline">{browseLabel}<Icon name="arrowRight" size={15} /></Link>}
        </div>
      </div>

      <div className="book-showcase__progress" aria-hidden="true"><span key={`${active}-${playing}`} className={playing ? 'is-playing' : ''} /></div>
    </div>
  );
}
