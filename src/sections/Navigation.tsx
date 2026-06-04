import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Spaces', href: '#cities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navigation({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

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
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.03)' : '1px solid transparent',
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

        {/* Mobile CTA */}
        <button
          className="btn-pill md:hidden"
          style={{ padding: '8px 20px', fontSize: 12 }}
          onClick={() => onOpenWaitlist('Header Mobile Menu Button')}
        >
          Get Pass
        </button>
      </div>
    </nav>
  );
}
