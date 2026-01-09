// packages/ui/src/components/HeaderServer.tsx
import React from 'react';

interface HeaderProps {
  activeSection?: 'dashboard' | 'calendar' | 'documents' | 'knowledge' | 'experts';
}

function HeaderServer({ activeSection = 'dashboard' }: HeaderProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Pulpit', href: '/' },
    { id: 'calendar', label: 'Kalendarz', href: '/calendar' },
    { id: 'documents', label: 'Dokumenty', href: '/documents' },
    { id: 'knowledge', label: 'Wiedza', href: '/knowledge' },
    { id: 'experts', label: 'Eksperci', href: '/experts' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{ padding: '0 1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
        }}>
          
          {/* Logo und App-Name */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <div style={{
                height: '2rem',
                width: '2rem',
                background: 'linear-gradient(135deg, #2563EB 0%, #DC2626 100%)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  D
                </span>
              </div>
              <div>
                <h1 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#111827',
                }}>
                  Doch<span style={{ color: '#2563EB' }}>.</span>
                </h1>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#6B7280',
                  marginTop: '-0.25rem',
                }}>
                  Für polnische Unternehmer in DE
                </p>
              </div>
            </div>
          </div>

          {/* Static right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
            }}>
              <span style={{ marginRight: '0.5rem' }}>🌐</span>
              <span>🇵🇱</span>
            </div>

            <div style={{
              display: 'none',
              alignItems: 'center',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              borderRadius: '0.5rem',
            }}>
              <span style={{ marginRight: '0.5rem', color: '#92400e' }}>📅</span>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#92400e',
              }}>
                USt-VA: 10 dni
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderServer;