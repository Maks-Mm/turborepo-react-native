// packages/ui/src/components/Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '3rem 1rem',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <p>© 2024 Doch. Alle Rechte vorbehalten.</p>
        <p style={{ marginTop: '1rem', opacity: 0.7 }}>
          Für polnische Unternehmer in Deutschland
        </p>
      </div>
    </footer>
  );
}