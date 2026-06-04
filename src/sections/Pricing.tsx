import { useEffect, useRef, useState } from 'react';

interface ResortPass {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  urgencyText?: string;
  image: string;
  description: string;
  features: string[];
}

const passes: ResortPass[] = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 299,
    image: '/uploads/day_pass.jpg',
    description: 'Access to luxury pool, fitness center, lounge chairs & refreshments.',
    features: [
      'Access to main family pool & quiet adults-only pool',
      'Plush poolside lounge chairs',
      'Complimentary towel service & shower access',
      'Secured luggage locker storage'
    ]
  },
  {
    id: 'daybeds',
    name: 'Day Beds',
    price: 999,
    image: '/uploads/daybeds.webp',
    description: 'Premium shaded double daybed loungers at the adults pool.',
    features: [
      'Guaranteed double-width daybed seating',
      'Complimentary fruit platter',
      'Dedicated poolside towel service'
    ]
  },
  {
    id: 'family-pass',
    name: 'Family Pass',
    price: 899,
    image: '/uploads/family_pass.jpg',
    description: 'Full resort amenities access for up to 4 family members, kids pool & lawn games.',
    features: [
      'Entry for up to 2 adults and 2 kids under 12',
      'Access to family pool & children\'s play area',
      'Complimentary family snack basket & beverages'
    ]
  },
  {
    id: 'gym-access',
    name: 'Gym & Fitness',
    price: 249,
    image: '/uploads/gym_fitness.jpg',
    description: 'Elite cardio equipment, weight room, recovery saunas, and juices.',
    features: [
      'Access to state-of-the-art strength and cardio machines',
      'Clean showers, locker rooms, and sauna access',
      'Complimentary fresh towels and chilled water'
    ]
  },
  {
    id: 'cabanas',
    name: 'Pool Cabanas',
    price: 1499,
    urgencyText: 'Host up to 4',
    image: '/uploads/pool_cabanas.avif',
    description: 'Private shaded cabana, stocked mini-fridge, and personal server.',
    features: [
      'Private shaded poolside cabana with privacy curtains',
      'Mini-fridge loaded with chilled sodas & mineral water',
      'Dedicated server for poolside service'
    ]
  },
  {
    id: 'recreation-zone',
    name: 'Recreational Pass',
    price: 399,
    urgencyText: 'Billiards & Simulator',
    image: '/uploads/recreational_pass.jpg',
    description: 'Access to premium hotel recreation zone including 8-ball pool, table tennis, and lounge.',
    features: [
      'Access to premium 8-ball pool / billiards tables',
      '50 minutes of virtual Topgolf or multisport simulation',
      'Access to console gaming arcade & beverage bar lounge'
    ]
  },
  {
    id: 'dining-space',
    name: 'Restaurant',
    price: 499,
    image: '/uploads/restaurant.png',
    description: 'Fine-dining seating access, complimentary chef mocktail & appetizers.',
    features: [
      'Guaranteed fine-dining table reservation',
      'Complimentary curated chef mocktail or fresh beverage',
      'Fresh hot starter/appetizer platter served on arrival'
    ]
  },
  {
    id: 'spa-beauty',
    name: 'Spa & Beauty Pass',
    price: 699,
    urgencyText: 'Thermal Rooms Included',
    image: '/uploads/spa_beauty.webp',
    description: 'Sauna, steam rooms, beauty salon access, and relaxation lounge.',
    features: [
      'Access to partner hotel steam rooms & dry sauna',
      'Relaxation lounge access with herbal tea & salon access',
      'Premium plush robes, slippers, and lockers'
    ]
  },
  {
    id: 'massages',
    name: 'Spa & Massage Pass',
    price: 1299,
    urgencyText: 'Reset therapy',
    image: '/uploads/spa_massage.avif',
    description: '50-minute professional Swedish or Deep Tissue massage treatment.',
    features: [
      '50-minute signature therapeutic massage',
      'Full access to spa steam, sauna, and relaxation rooms',
      'Complimentary self-parking validation'
    ]
  },
  {
    id: 'sun-terrace-cabana',
    name: 'Sun Terrace Cabana',
    price: 1199,
    urgencyText: 'Sunset Views',
    image: '/uploads/sun_terrace_cabana.webp',
    description: 'Premium rooftop sun terrace cabana access with panoramic views and lounge service.',
    features: [
      'Guaranteed rooftop terrace seating',
      'Sunset refreshment platter & mocktails',
      'Personal sun deck lounge service'
    ]
  },
  {
    id: 'workspaces',
    name: 'Workspaces',
    price: 199,
    image: '/uploads/workspaces.webp',
    description: 'High-speed Wi-Fi, quiet zones, coffee, and lockable storage.',
    features: [
      'Access to quiet coworking zones and business lounge',
      'High-speed fiber Wi-Fi (up to 150 Mbps)',
      'Unlimited premium filter coffee or masala chai'
    ]
  },
  {
    id: 'boardrooms',
    name: 'Business Conference',
    price: 1399,
    image: '/uploads/business_conference.webp',
    description: 'Private high-tech conference room access with screencast and catered snacks.',
    features: [
      '3 hours of private high-tech meeting boardroom access',
      'UHD smart screen with wireless screencasting',
      'Savory snack platters served to the room'
    ]
  }
];

export default function Pricing({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const SPEED = 0.5;

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

  // RAF auto-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const animate = () => {
      if (!draggingRef.current) {
        const totalWidth = track.scrollWidth / 2;
        offsetRef.current += SPEED;
        if (offsetRef.current >= totalWidth) offsetRef.current = 0;
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const delta = startXRef.current - e.clientX;
    let newOffset = startOffsetRef.current + delta;
    newOffset = ((newOffset % totalWidth) + totalWidth) % totalWidth;
    offsetRef.current = newOffset;
    track.style.transform = `translateX(-${newOffset}px)`;
  };
  const onPointerUp = () => { draggingRef.current = false; };

  const duplicatedPasses = [...passes, ...passes];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        background: 'transparent',
        padding: 'clamp(40px, 8vh, 80px) 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Scarcity Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '14px 24px',
            background: 'rgba(255, 59, 0, 0.06)',
            border: '1px solid rgba(255, 59, 0, 0.12)',
            borderRadius: 8,
            marginBottom: 48,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#FF3B00',
              animation: 'pulse 2s infinite',
            }}
          />
          <span
            className="font-mono"
            style={{ fontSize: 12, color: '#FF6B00', letterSpacing: '0.05em' }}
          >
            LAUNCHING SOON — ONLY 500 EARLY-ACCESS SPOTS FOR GOA &amp; HYDERABAD
          </span>
        </div>

        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between"
          style={{ gap: 32, marginBottom: 48 }}
        >
          <div>
            <div
              className="section-label"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.1s',
              }}
            >
              EXPERIENCES
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
                transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.15s',
              }}
            >
              Find experiences that suit your style
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
            Choose from a wide variety of five-star amenities. Scroll, select your package, and reserve your early pricing pass starting at just ₹199.
          </p>
        </div>
      </div>

      {/* Draggable Experiences Ticker */}
      <div
        className="ticker-wrap"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.3s',
          cursor: 'grab',
          userSelect: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: 'max-content',
            gap: '24px',
            willChange: 'transform',
          }}
        >
          {duplicatedPasses.map((pass, idx) => (
            <div
              key={`${pass.id}-${idx}`}
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
                const overlay = e.currentTarget.querySelector('.pass-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1.06)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.2) 100%)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.pass-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)';
              }}
              onClick={() => onOpenWaitlist(`${pass.name} Selection`)}
            >
              {/* Pass Image */}
              <img
                src={pass.image}
                alt={pass.name}
                loading="eager"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                  WebkitTransform: 'translateZ(0)',
                }}
              />

              {/* Tag / Urgency Badge */}
              {pass.urgencyText && (
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 2,
                    padding: '4px 10px',
                    background: 'rgba(255, 59, 0, 0.9)',
                    borderRadius: 4,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 9,
                      color: '#0A0A0A',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {pass.urgencyText}
                  </span>
                </div>
              )}

              {/* Content Overlay */}
              <div
                className="pass-overlay"
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
                <h3
                  className="font-display"
                  style={{
                    fontSize: 24,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {pass.name}
                </h3>
                
                <p
                  className="font-body"
                  style={{
                    fontSize: 12,
                    color: 'rgba(245, 242, 234, 0.6)',
                    marginTop: 6,
                    lineHeight: 1.4,
                    marginBottom: 12,
                  }}
                >
                  {pass.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'between',
                    width: '100%',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: 12,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      className="font-display"
                      style={{
                        fontSize: 18,
                        color: '#FF3B00',
                        fontWeight: 700,
                      }}
                    >
                      ₹{pass.price}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 8,
                        color: 'rgba(245, 242, 234, 0.4)',
                      }}
                    >
                      Early access
                    </span>
                  </div>

                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: '#FFFFFF',
                      fontWeight: 600,
                      marginLeft: 'auto',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: 4,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Select Pass
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Guarantees */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <div
          style={{
            textAlign: 'center',
            marginTop: 60,
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.6s',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px 40px',
            }}
          >
            {[
              { label: 'Waitlist Price Lock', desc: 'Lock today\'s low rates forever' },
              { label: 'Flexible booking', desc: 'No-charge cancellation anytime' },
              { label: 'Quality Guarantee', desc: 'Partnership with Best Hotels' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: '200px', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F6C324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div
                    className="font-display"
                    style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 600 }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-mono"
                    style={{ fontSize: 10, color: 'rgba(245, 242, 234, 0.4)' }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
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
          touch-action: pan-y;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
