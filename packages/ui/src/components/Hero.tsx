// packages/ui/src/components/Hero.tsx
// Wenn Hero nur statisch ist, kein "use client" nötig
"use client"
import React from 'react';

export default function Hero() {
  return (
    <div style={{
      padding: '4rem 1rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Willkommen bei Doch
      </h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
        Die einfache App für polnische Unternehmer in Deutschland
      </p>
    </div>
  );
}