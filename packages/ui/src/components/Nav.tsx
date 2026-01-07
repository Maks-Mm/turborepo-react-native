// packages/ui/src/components/Nav.tsx
import React from 'react';

export default function Nav() {
  const navItems = [
    { label: 'Start', key: 'home' },
    { label: 'Funkcje', key: 'features', pl: 'Funkcje', de: 'Funktionen' },
    { label: 'Dlaczego Doch?', key: 'why', pl: 'Dlaczego Doch?', de: 'Warum Doch?' },
    { label: 'Cennik', key: 'pricing', pl: 'Cennik', de: 'Preise' },
    { label: 'Kontakt', key: 'contact', pl: 'Kontakt', de: 'Kontakt' }
  ];

  return (
    <nav style={{
      backgroundColor: '#1e3c72',
      padding: '1rem 2rem',
      borderBottom: '3px solid #4CD964',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#4CD964',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
          }}>
            ✓
          </div>
          <span style={{
            color: 'white',
            fontWeight: '700',
            fontSize: '24px',
            letterSpacing: '-0.5px',
          }}>
            Doch
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '14px',
            marginLeft: '5px',
          }}>
            Polscy przedsiębiorcy w Niemczech
          </span>
        </div>

        {/* Navigation Items */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              style={{
                color: 'white',
                fontWeight: '500',
                textDecoration: 'none',
                fontSize: '15px',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                opacity: item.key === 'home' ? 1 : 0.9,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.opacity = item.key === 'home' ? '1' : '0.9';
              }}
            >
              {item.label}
            </a>
          ))}
          
          {/* Language Selector */}
          <div style={{
            display: 'flex',
            gap: '5px',
            marginLeft: '2rem',
            borderLeft: '1px solid rgba(255,255,255,0.2)',
            paddingLeft: '1rem',
          }}>
            <button
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              PL
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}
            >
              DE
            </button>
          </div>

          {/* Call to Action */}
          <button
            style={{
              backgroundColor: '#4CD964',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginLeft: '1rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(76, 217, 100, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3dc954';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(76, 217, 100, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4CD964';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 217, 100, 0.3)';
            }}
          >
            Darmowy Test
          </button>
        </div>
      </div>
    </nav>
  );
}