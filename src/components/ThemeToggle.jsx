import React from 'react';
import { useTheme } from './ThemeContext';
import Icon from './Icon';

/**
 * Premium Light / Dark Mode Toggle Button
 */
export default function ThemeToggle({ variant = 'light', size = 'md', className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle--${variant} theme-toggle--${size} ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: size === 'sm' ? '0.35rem 0.7rem' : '0.45rem 0.9rem',
        borderRadius: '9999px',
        border: isDark ? '1px solid rgba(201, 168, 76, 0.4)' : '1px solid #e0d8c8',
        background: isDark ? 'rgba(30, 25, 20, 0.85)' : '#f5f1ea',
        color: isDark ? '#f0d886' : '#1a1714',
        fontSize: size === 'sm' ? '0.725rem' : '0.8125rem',
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <span style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
        {isDark ? '☀️' : '🌙'}
      </span>
      <span>{isDark ? 'LIGHT' : 'DARK'}</span>
    </button>
  );
}
