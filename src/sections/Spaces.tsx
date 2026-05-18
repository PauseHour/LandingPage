import { useEffect, useRef, useState } from 'react';

interface SpaceImage {
  src: string;
  label: string;
  subtitle: string;
  featured?: boolean;
}

const spaces: SpaceImage[] = [
  {
    src: '/assets/hotel-lobby-1.jpg',
    label: 'The reception',
    subtitle: 'Brass-accented boutique check-in',
    featured: true,
  },
  {
    src: '/assets/hotel-lobby-2.jpg', // Reusing an existing image since goa/hyderabad might not exist
    label: 'Goa',
    subtitle: 'Beachfront & heritage partner hotels',
  },
  {
    src: '/assets/hotel-lobby-2.jpg',
    label: 'The coworking lounge',
    subtitle: 'Marble tables, city views, fiber Wi-Fi',
  },
  {
    src: '/assets/hotel-lobby-1.jpg', // Reusing existing image
    label: 'Hyderabad',
    subtitle: 'Banjara Hills & Jubilee Hills lobbies',
  },
  {
    src: '/assets/hotel-lobby-3.jpg',
    label: 'The pause pod',
    subtitle: 'Private booth, laptop, complimentary chai',
    featured: true,
  },
];

export default function Spaces({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cities"
      style={{
        background: 'transparent',
        padding: 'clamp(80px, 15vh, 160px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between"
          style={{ gap: 32, marginBottom: 60 }}
        >
          <div>
            <div
              className="section-label"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
              }}
            >
              OUR SPACES
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: '#FFFFFF',
                marginTop: 20,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: 600,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.1s',
              }}
            >
              Pause spaces, reimagined.
            </h2>
          </div>

          <p
            className="font-body"
            style={{
              fontSize: 16,
              color: 'rgba(245, 242, 234, 0.6)',
              lineHeight: 1.7,
              maxWidth: 400,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.2s',
            }}
          >
            We partner with underutilized boutique hotels in Goa and Hyderabad. Every space includes secure storage, high-speed Wi-Fi, washroom access, and complimentary refreshments.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 16,
          }}
        >
          {spaces.map((space, i) => (
            <div
              key={space.label}
              style={{
                gridColumn: space.featured ? 'span 6' : 'span 3',
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: space.featured ? '16/10' : '1/1',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${0.25 + i * 0.1}s`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.space-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1.05)';
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.space-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
              }}
              onClick={() => onOpenWaitlist()}
            >
              <img
                src={space.src}
                alt={space.label}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                }}
              />

              {/* Hover overlay */}
              <div
                className="space-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(10, 10, 10, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.4s ease-out',
                }}
              >
                <span
                  className="btn-pill"
                  style={{ fontSize: 12, padding: '10px 24px' }}
                >
                  Join Waitlist
                </span>
              </div>

              {/* Label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '40px 20px 20px',
                  background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 100%)',
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: space.featured ? 22 : 16,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                >
                  {space.label}
                </div>
                <div
                  className="font-body"
                  style={{
                    fontSize: 12,
                    color: 'rgba(245, 242, 234, 0.5)',
                    marginTop: 4,
                  }}
                >
                  {space.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon cities */}
        <div
          style={{
            marginTop: 40,
            textAlign: 'center',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.6s',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: 11,
              color: 'rgba(245, 242, 234, 0.3)',
              letterSpacing: '0.1em',
            }}
          >
            Coming soon: Delhi NCR &middot; Mumbai &middot; Jaipur &middot; Bengaluru &middot; Chennai &middot; Kolkata
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .grid > div[style*="span 6"] { grid-column: span 6 !important; }
          .grid > div[style*="span 3"] { grid-column: span 6 !important; }
        }
        @media (max-width: 640px) {
          .grid > div[style*="span 6"] { grid-column: span 12 !important; }
          .grid > div[style*="span 3"] { grid-column: span 6 !important; }
        }
      `}</style>
    </section>
  );
}
