import React from 'react';
import Icon from './Icon';

/**
 * Full-width page banner with desk/writing background
 * Premium editorial sub-page header
 */
export default function PageBanner({ title }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: "url('/images/writers-desk.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,23,20,0.6) 0%, rgba(26,23,20,0.4) 100%)',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '4rem 1.5rem 3.5rem',
        textAlign: 'center',
      }}>
        {/* Gold divider above title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '1rem',
        }}>
          <span style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.5)' }} />
          <Icon name="spark" size={14} style={{ color: '#c9a84c' }} />
          <span style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.5)' }} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: 700,
          color: '#ffffff',
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
          textShadow: '0 2px 16px rgba(0,0,0,0.3)',
        }}>
          {title}
        </h1>
      </div>
    </div>
  );
}
