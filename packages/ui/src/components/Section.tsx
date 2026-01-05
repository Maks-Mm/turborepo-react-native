// packages/ui/src/components/Section.tsx
import React from 'react';

export default function Section() {
  return (
    <section style={{
      padding: '4rem 1rem',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        Warum Doch?
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
      }}>
        {[
          { title: 'Einfache Bedienung', desc: 'Keine komplizierte Software' },
          { title: 'Polnische Sprache', desc: 'Alles in deiner Muttersprache' },
          { title: 'Fristen im Blick', desc: 'Verpasse keine wichtigen Termine' },
          { title: 'Experten-Netzwerk', desc: 'Direkter Kontakt zu Steuerberatern' },
        ].map((feature) => (
          <div
            key={feature.title}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              {feature.title}
            </h3>
            <p style={{ color: '#64748b' }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}