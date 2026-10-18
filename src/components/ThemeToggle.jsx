import React, { useState, useEffect } from 'react';

/**
 * Premium Light / Dark Mode Toggle
 * Replaces the old EN/AM language toggle.
 * Supports compact (mobile) and default (desktop) variants.
 */
export default function ThemeToggle({ variant = 'light', size = 'md', className = '' }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('yismake_theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('yismake_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const isDark = theme === 'dark';
  const isCompact = size === 'sm' || variant === 'compact';

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle--${variant} theme-toggle--${size} ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.45rem',
        padding: isCompact ? '0.35rem 0.65rem' : '0.45rem 0.9rem',
        borderRadius: '999px',
        border: '1px solid',
        borderColor: isDark ? 'rgba(201,168,76,0.45)' : '#e5dfd5',
        background: isDark ? 'rgba(201,168,76,0.12)' : '#f5f3ef',
        color: isDark ? '#c9a84c' : '#4a453e',
        cursor: 'pointer',
        fontSize: isCompact ? '0.75rem' : '0.8125rem',
        fontWeight: 650,
        fontFamily: 'var(--font-sans)',
        transition: 'all 0.25s ease',
        lineHeight: 1,
      }}
    >
      <span style={{ fontSize: isCompact ? '0.85rem' : '0.95rem' }}>
        {isDark ? '☀️' : '🌙'}
      </span>
      {!isCompact && (
        <span style={{ letterSpacing: '0.04em' }}>
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
}
