import { useEffect, useRef, useState } from 'react';

interface CityData {
  src: string;
  name: string;
  landmark: string;
  status: 'Active' | 'Pre-Launch' | 'Coming Soon';
  badgeColor: string;
  description: string;
}

const cities: CityData[] = [
  {
    src: '/uploads/hyderabad.webp',
    name: 'Hyderabad',
    landmark: 'Taj Falaknuma Palace',
    status: 'Active',
    badgeColor: '#00E676', // Bright Green
    description: 'Banjara Hills & Falaknuma transit spaces',
  },
  {
    src: '/uploads/goa.jpg',
    name: 'Goa',
    landmark: 'Taj Cidade de Goa',
    status: 'Active',
    badgeColor: '#00E676', // Bright Green
    description: 'Beachfront boutique & heritage partner hotels',
  },
  {
    src: '/uploads/delhi.webp',
    name: 'Delhi NCR',
    landmark: 'Taj Palace',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Connaught Place & Aerocity transit spots',
  },
  {
    src: '/uploads/mumbai.avif',
    name: 'Mumbai',
    landmark: 'Taj Palace',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Colaba seafront & airport premium partner spots',
  },
  {
    src: '/uploads/bangalore.jpg',
    name: 'Bangalore',
    landmark: 'The Leela Palace',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'MG Road green oasis transit lounges',
  },
  {
    src: '/uploads/chennai.png',
    name: 'Chennai',
    landmark: 'ITC Grand Chola',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Guindy luxury transit partner spaces',
  },
  {
    src: '/uploads/manali.jpg',
    name: 'Manali',
    landmark: 'Tiaraa Hotel',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Snowy mountainside viewport spaces',
  },
  {
    src: '/uploads/munnar.avif',
    name: 'Munnar',
    landmark: 'Chandys Windy Woods',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Hill station tea garden viewing lobbies',
  }
];

const moreCities: CityData[] = [
  {
    src: '/uploads/kolkata.jpg',
    name: 'Kolkata',
    landmark: 'ITC Royal Bengal',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Heritage city transit hubs',
  },
  {
    src: '/uploads/jaipur.webp',
    name: 'Jaipur',
    landmark: 'Anantara Jewel Bagh',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Royal palace heritage transit spaces',
  },
  {
    src: '/uploads/udaipur.webp',
    name: 'Udaipur',
    landmark: 'Fairmont Palace',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Lakeview luxury sanctuary spots',
  },
  {
    src: '/uploads/kochi.avif',
    name: 'Kochi',
    landmark: 'Grand Hyatt',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Coastal historic harbor transit spaces',
  },
  {
    src: '/uploads/andaman.png',
    name: 'Andaman & Nicobar',
    landmark: 'Havelock Island Resort',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Island sanctuary viewing spaces',
  },
  {
    src: '/uploads/varanasi.webp',
    name: 'Varanasi',
    landmark: 'BrijRama Palace',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Holy riverfront heritage transit spots',
  },
  {
    src: '/uploads/Agra - Oberoi Amarvilas .jpg',
    name: 'Agra',
    landmark: 'Oberoi Amarvilas',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Iconic Taj Mahal view transit lounges',
  },
  {
    src: '/uploads/Shimla - Colonial Manor .avif',
    name: 'Shimla',
    landmark: 'Colonial Manor',
    status: 'Coming Soon',
    badgeColor: '#00E5FF', // Bright Cyan
    description: 'Himalayan mountain pine view lounges',
  }
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

  const duplicatedCities = [...cities, ...cities];
  const duplicatedMoreCities = [...moreCities, ...moreCities];

  return (
    <section
      ref={sectionRef}
      id="cities"
      style={{
        background: 'transparent',
        padding: 'clamp(40px, 8vh, 80px) 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between"
          style={{ gap: 32, marginBottom: 40 }}
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
              OUR DESTINATIONS
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
              margin: 0,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.2s',
            }}
          >
            We partner with underutilized luxury boutique hotels in India’s top travel hubs. Every space includes secure luggage storage, high-speed Wi-Fi, washrooms, and refreshments.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Continuous Scroll Ticker */}
      <div
        className="ticker-wrap"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.3s',
        }}
      >
        <div className="ticker-track">
          {duplicatedCities.map((city, idx) => (
            <div
              key={`${city.name}-${idx}`}
              style={{
                flex: '0 0 280px',
                height: 380,
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.city-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1.06)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.2) 100%)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.city-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)';
              }}
              onClick={() => onOpenWaitlist(`${city.name} Launch`)}
            >
              {/* City Image */}
              <img
                src={city.src}
                alt={city.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                }}
              />

              {/* Status Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 50,
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: city.badgeColor,
                    animation: 'pulse 1.5s infinite',
                    boxShadow: `0 0 10px ${city.badgeColor}`,
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: '#FFFFFF',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {city.status}
                </span>
              </div>

              {/* Content Overlay */}
              <div
                className="city-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  transition: 'background 0.4s ease-out',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    color: 'rgba(245, 242, 234, 0.6)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {city.landmark}
                </span>
                
                <h3
                  className="font-display"
                  style={{
                    fontSize: 26,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {city.name}
                </h3>
                
                <div
                  style={{
                    marginTop: 14,
                    display: 'flex',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: '#0A0A0A',
                      background: '#FF3B00',
                      padding: '8px 16px',
                      borderRadius: 50,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 4px 12px rgba(255, 59, 0, 0.3)',
                    }}
                  >
                    <span>{city.status === 'Active' ? 'Reserve Pass' : 'Join Waitlist'}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Continuous Scroll Ticker Row 2 (Reverse direction) */}
      <div
        className="ticker-wrap"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.4s',
          marginTop: 12,
        }}
      >
        <div className="ticker-track-reverse">
          {duplicatedMoreCities.map((city, idx) => (
            <div
              key={`${city.name}-${idx}`}
              style={{
                flex: '0 0 280px',
                height: 380,
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.city-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1.06)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.2) 100%)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.city-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)';
              }}
              onClick={() => onOpenWaitlist(`${city.name} Launch`)}
            >
              {/* City Image */}
              <img
                src={city.src}
                alt={city.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                }}
              />

              {/* Status Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  background: 'rgba(10, 10, 10, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 50,
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: city.badgeColor,
                    animation: 'pulse 1.5s infinite',
                    boxShadow: `0 0 10px ${city.badgeColor}`,
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: '#FFFFFF',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {city.status}
                </span>
              </div>

              {/* Content Overlay */}
              <div
                className="city-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  transition: 'background 0.4s ease-out',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    color: 'rgba(245, 242, 234, 0.6)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {city.landmark}
                </span>
                
                <h3
                  className="font-display"
                  style={{
                    fontSize: 26,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {city.name}
                </h3>
                
                <div
                  style={{
                    marginTop: 14,
                    display: 'flex',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: '#0A0A0A',
                      background: '#FF3B00',
                      padding: '8px 16px',
                      borderRadius: 50,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 4px 12px rgba(255, 59, 0, 0.3)',
                    }}
                  >
                    <span>{city.status === 'Active' ? 'Reserve Pass' : 'Join Waitlist'}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hyderabad Arrival Banner Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <div
          style={{
            marginTop: 48,
            backgroundImage: 'linear-gradient(to right, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 50%, rgba(10, 10, 10, 0.4) 100%), url(https://images.unsplash.com/photo-1608958416752-671239611f7c?auto=format&fit=crop&w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid rgba(255, 59, 0, 0.25)',
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            padding: '72px clamp(24px, 6vw, 80px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.5s',
          }}
        >
          <div
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between"
            style={{ gap: 40, position: 'relative', zIndex: 1 }}
          >
            <div style={{ flex: '1 1 60%' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 12px',
                  background: 'rgba(255, 59, 0, 0.15)',
                  border: '1px solid rgba(255, 59, 0, 0.3)',
                  borderRadius: 50,
                  marginBottom: 20,
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#FF3B00',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: 10, color: '#FF6B00', letterSpacing: '0.1em' }}
                >
                  NEXT DESTINATION
                </span>
              </div>
              
              <h3
                className="font-display uppercase"
                style={{
                  fontSize: 'clamp(32px, 6vw, 56px)',
                  color: '#FFFFFF',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                }}
              >
                We are arriving<br />in Hyderabad.
              </h3>
            </div>

            <div
              style={{
                flex: '0 0 auto',
                width: '100%',
                maxWidth: 360,
                background: 'rgba(10, 10, 10, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 12,
                padding: 28,
                boxSizing: 'border-box',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 12,
                  color: '#FFFFFF',
                  marginBottom: 16,
                  textAlign: 'center',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                SECURE HYDERABAD EARLY ACCESS
              </div>
              <button
                className="btn-pill"
                onClick={() => onOpenWaitlist('Hyderabad Early Access')}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>Reserve Early Pass</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p
                className="font-mono"
                style={{
                  fontSize: 9,
                  color: 'rgba(245, 242, 234, 0.4)',
                  textAlign: 'center',
                  marginTop: 12,
                  letterSpacing: '0.02em',
                  margin: '12px 0 0 0',
                }}
              >
                No payment today &middot; Free cancellation &middot; Limited spots
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ticker-wrap {
          overflow: hidden;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          position: relative;
          padding: 20px 0;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-slide 45s linear infinite;
          gap: 24px;
        }
        .ticker-track-reverse {
          display: flex;
          width: max-content;
          animation: ticker-slide 45s linear infinite reverse;
          gap: 24px;
        }
        .ticker-track:hover, .ticker-track-reverse:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-slide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
