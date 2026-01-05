"use client"; // <-- DIESE ZEILE HINZUFÜGEN

import React, { useState } from 'react';

interface HeaderProps {
  activeSection?: 'dashboard' | 'calendar' | 'documents' | 'knowledge' | 'experts';
}

function Header({ activeSection = 'dashboard' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

            {/* Desktop Navigation */}
            <nav style={{ display: 'none', marginLeft: '2.5rem', gap: '0.25rem' }}>
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: activeSection === item.id ? '#1d4ed8' : '#374151',
                    backgroundColor: activeSection === item.id ? '#dbeafe' : 'transparent',
                    border: activeSection === item.id ? '1px solid #dbeafe' : 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right side: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            
            {/* Language Selector */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>🌐</span>
              <span>🇵🇱</span>
              <span style={{ marginLeft: '0.5rem' }}>▼</span>
            </button>

            {/* Notifications */}
            <button style={{ position: 'relative', padding: '0.5rem' }}>
              <span>🔔</span>
              <span style={{
                position: 'absolute',
                top: '-0.25rem',
                right: '-0.25rem',
                height: '1.25rem',
                width: '1.25rem',
                backgroundColor: '#ef4444',
                color: 'white',
                fontSize: '0.75rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                3
              </span>
            </button>

            {/* Urgent Deadline Alert */}
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

            {/* User Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                  Jan Kowalski
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Einzelunternehmer
                </p>
              </div>
              <div style={{
                height: '2rem',
                width: '2rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: '600',
              }}>
                JK
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ padding: '0.5rem' }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{ borderTop: '1px solid #e5e7eb', padding: '0.75rem 0' }}>
            <div style={{ padding: '0 0.5rem' }}>
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    color: activeSection === item.id ? '#1d4ed8' : '#374151',
                    backgroundColor: activeSection === item.id ? '#dbeafe' : 'transparent',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Urgent Alert */}
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '0.5rem', color: '#dc2626' }}>📅</span>
                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#dc2626',
                    }}>
                      Pilne: Umsatzsteuervoranmeldung
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#dc2626',
                      marginTop: '0.125rem',
                    }}>
                      Termin: 10 dni • Finanzamt Berlin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;