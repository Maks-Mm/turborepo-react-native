// packages/ui/src/components/Nav.tsx
import React from 'react';

export default function Nav() {
  return (
    <nav style={{
      backgroundColor: '#f8fafc',
      padding: '1rem',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
      }}>
        {['Start', 'Features', 'Preise', 'Kontakt'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              color: '#475569',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}