import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Spaces', href: '#cities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navigation({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(255, 255, 255, 0.03)' : '1px solid transparent',
        }}
      >
        <div
          className="flex items-center justify-between transition-all duration-300"
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            padding: scrolled ? '8px clamp(24px, 5vw, 80px)' : '16px clamp(24px, 5vw, 80px)',
          }}
        >
          <a
            href="https://www.pausehour.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-white no-underline flex items-center"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <img
              src="/Logo_Prime_Dark.png"
              alt="Pause Hour"
              style={{
                height: scrolled ? 'clamp(60px, 6vw, 80px)' : 'clamp(85px, 9vw, 110px)',
                width: 'auto',
                display: 'block',
                margin: scrolled ? '-6px 0 -12px 0' : '-10px 0 -20px 0',
                transition: 'all 0.3s ease',
              }}
            />
          </a>

          <div className="hidden md:flex items-center" style={{ gap: 40 }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="bg-transparent border-none cursor-pointer transition-colors duration-300"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  color: '#F5F2EA',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#FF3B00';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#F5F2EA';
                }}
              >
                {link.label}
              </button>
            ))}

            <button className="btn-pill" onClick={() => onOpenWaitlist('Header Menu Button')}>
              Get Pass
            </button>
          </div>

          {/* Mobile Navigation Trigger & CTA */}
          <div className="flex md:hidden items-center" style={{ gap: 12 }}>
            <button
              className="btn-pill"
              style={{ padding: '8px 18px', fontSize: 11 }}
              onClick={() => onOpenWaitlist('Header Mobile Menu Button')}
            >
              Get Pass
            </button>
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-transparent border-none text-white cursor-pointer flex items-center justify-center"
              style={{
                padding: '6px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.03)'
              }}
              aria-label="Toggle Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
        style={{
          background: 'rgba(10, 10, 10, 0.98)',
          backdropFilter: 'blur(20px)',
          gap: '32px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 bg-transparent border-none text-white cursor-pointer flex items-center justify-center"
          style={{
            padding: '10px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.03)'
          }}
          aria-label="Close Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => {
              setMenuOpen(false);
              scrollTo(link.href);
            }}
            className="bg-transparent border-none cursor-pointer text-white font-display uppercase tracking-widest"
            style={{
              fontSize: '20px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#FF3B00';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = '#FFFFFF';
            }}
          >
            {link.label}
          </button>
        ))}

        <button
          className="btn-pill"
          style={{ padding: '12px 36px', fontSize: 14, marginTop: '16px' }}
          onClick={() => {
            setMenuOpen(false);
            onOpenWaitlist('Header Mobile Menu Button');
          }}
        >
          Get Pass
        </button>
      </div>
    </>
  );
}

