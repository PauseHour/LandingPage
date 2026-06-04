import Magnetic from '../components/Magnetic';

const footerLinks = [
  { label: 'Spaces', href: '#cities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

const socialIcons = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/pause.hour?igsh=bXE4cGRhcDhlNThl',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const scrollTo = (href: string) => {
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'transparent',
        padding: '80px clamp(24px, 5vw, 80px) 40px',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* CTA Banner */}
        <div
          className="card-surface"
          style={{
            padding: 'clamp(40px, 5vw, 64px)',
            textAlign: 'center',
            marginBottom: 80,
            background: 'linear-gradient(135deg, rgba(255, 59, 0, 0.08) 0%, rgba(17, 17, 17, 1) 50%)',
          }}
        >
          <h3
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Don&apos;t spend another gap hour on a café floor.
          </h3>
          <p
            className="font-body"
            style={{
              fontSize: 16,
              color: 'rgba(245, 242, 234, 0.6)',
              maxWidth: 480,
              margin: '16px auto 32px',
              lineHeight: 1.6,
            }}
          >
            Join 1,247 travelers who&apos;ve already reserved their first pause. Launching soon in Goa &amp; Hyderabad.
          </p>
          <Magnetic>
            <button className="btn-pill" onClick={() => onOpenWaitlist('Footer Button')}>
              Reserve My Spot — Free
            </button>
          </Magnetic>
        </div>

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between" style={{ gap: 40 }}>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="https://www.pausehour.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <img
                src="/Logo_Prime_Dark.png"
                alt="Pause Hour"
                style={{
                  height: 'clamp(80px, 10vw, 110px)',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </a>
            <p
              className="font-body"
              style={{
                fontSize: 14,
                color: 'rgba(245, 242, 234, 0.5)',
                marginTop: 8,
              }}
            >
              The gap deserves dignity.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end" style={{ gap: 32 }}>
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="bg-transparent border-none cursor-pointer transition-colors duration-300"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 14,
                  color: 'rgba(245, 242, 234, 0.6)',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#FF3B00';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(245, 242, 234, 0.6)';
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle row */}
        <div
          className="flex flex-col md:flex-row items-center md:items-center justify-between"
          style={{ marginTop: 60, gap: 24 }}
        >
          <a
            href="mailto:founder@pausehour.in"
            className="font-mono text-center md:text-left"
            style={{
              fontSize: 14,
              color: '#FF3B00',
              textDecoration: 'none',
            }}
          >
            founder@pausehour.in
          </a>

          <div className="flex justify-center md:justify-end" style={{ gap: 24 }}>
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-none cursor-pointer transition-colors duration-300"
                style={{ color: 'rgba(245, 242, 234, 0.5)', display: 'inline-flex', padding: 0 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#FF3B00';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(245, 242, 234, 0.5)';
                }}
                aria-label={social.name}
              >
                {social.svg}
              </a >
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: 60,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 24,
            textAlign: 'center',
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: 12,
              color: 'rgba(245, 242, 234, 0.3)',
            }}
          >
            &copy; 2025 PAUSE HOUR. All rights reserved. Built for the in-between.
          </p>
        </div>
      </div>
    </footer>
  );
}
