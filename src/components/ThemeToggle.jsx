import React, { useState, useEffect } from 'react';
import Icon from './Icon';

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('yismake_theme');
      if (saved === 'light' || saved === 'dark') return saved;
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

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle${isDark ? ' is-dark' : ''} ${className}`}
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
        <span className="theme-toggle__icon theme-toggle__sun"><Icon name="sun" size={16} /></span>
        <span className="theme-toggle__icon theme-toggle__moon"><Icon name="moon" size={15} /></span>
      </span>
    </button>
  );
}
