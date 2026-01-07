// packages/ui/src/components/Footer.tsx
import React from 'react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <a 
    href={href} 
    style={{ 
      color: '#64748b', 
      textDecoration: 'none', 
      transition: 'color 0.3s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
    onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
  >
    {children}
  </a>
);

const GlassIcon: React.FC<{ children: string; href: string }> = ({ children, href }) => (
  <a 
    href={href}
    style={{
      width: '45px',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#60a5fa';
      e.currentTarget.style.color = '#000';
      e.currentTarget.style.transform = 'translateY(-5px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.color = '#fff';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      position: 'relative',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      padding: '80px 5% 30px',
      marginTop: 'auto',
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      
      {/* Decorative blur circles */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        filter: 'blur(80px)',
        opacity: 0.1,
        top: '-50px',
        left: '-50px',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
        filter: 'blur(80px)',
        opacity: 0.1,
        bottom: '-50px',
        right: '-50px',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        
        {/* Top Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '60px',
          paddingBottom: '80px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          
          {/* Brand Section */}
          <div>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              lineHeight: 0.9,
              fontWeight: 900,
              letterSpacing: '-2px',
              margin: 0,
              background: 'linear-gradient(to bottom, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              DOCH<span style={{ color: '#60a5fa' }}>.</span>
            </h2>
            <p style={{
              maxWidth: '400px',
              color: '#94a3b8',
              marginTop: '20px',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}>
              Professionelle Unterstützung für polnische Unternehmer im deutschen Markt. 
              Rechtlich sicher, benutzerfreundlich und maßgeschneidert.
            </p>
          </div>

          {/* Links Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
          }}>
            
            {/* Navigation */}
            <div>
              <span style={{
                display: 'block',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#64748b',
                marginBottom: '20px',
                fontWeight: 600,
              }}>
                Navigation
              </span>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <FooterLink href="#">Über Uns</FooterLink>
                <FooterLink href="#">Leistungen</FooterLink>
                <FooterLink href="#">Blog & Ratgeber</FooterLink>
                <FooterLink href="#">Kontakt</FooterLink>
              </div>
            </div>

            {/* Tools */}
            <div>
              <span style={{
                display: 'block',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#64748b',
                marginBottom: '20px',
                fontWeight: 600,
              }}>
                Tools
              </span>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <FooterLink href="#">Fristen-Checker</FooterLink>
                <FooterLink href="#">Dokumenten-Scanner</FooterLink>
                <FooterLink href="#">Steuer-Kalkulator</FooterLink>
                <FooterLink href="#">Rechner-Tools</FooterLink>
              </div>
            </div>

            {/* Social & Contact */}
            <div>
              <span style={{
                display: 'block',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#64748b',
                marginBottom: '20px',
                fontWeight: 600,
              }}>
                Kontakt
              </span>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '25px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#cbd5e1',
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                  }} />
                  <span>Online Support</span>
                </div>
                <a 
                  href="mailto:kontakt@doch-app.de" 
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  kontakt@doch-app.de
                </a>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <GlassIcon href="#">IN</GlassIcon>
                <GlassIcon href="#">FB</GlassIcon>
                <GlassIcon href="#">YT</GlassIcon>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '40px',
          color: '#64748b',
          fontSize: '14px',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <p style={{ margin: 0 }}>
            © {currentYear} <strong>Doch</strong> — Made with <span style={{ color: '#ef4444' }}>❤</span> für polnische Unternehmer
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <FooterLink href="#">Datenschutz</FooterLink>
            <span style={{ color: '#475569' }}>/</span>
            <FooterLink href="#">Impressum</FooterLink>
            <span style={{ color: '#475569' }}>/</span>
            <FooterLink href="#">AGB</FooterLink>
            <span style={{ color: '#475569' }}>/</span>
            <FooterLink href="#">Cookie-Richtlinie</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}