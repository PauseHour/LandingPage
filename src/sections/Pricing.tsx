import { useEffect, useRef, useState } from 'react';
import Magnetic from '../components/Magnetic';

interface PricingPlan {
  name: string;
  price: string;
  unit: string;
  badge?: string;
  badgeColor?: string;
  topBorder?: string;
  features: string[];
  cta: string;
  soldOut?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Single Pause',
    price: '\u20B999',
    unit: '/pause',
    features: [
      '4-hour lobby access',
      'Secure luggage storage',
      'High-speed Wi-Fi',
      'Washroom & refresh access',
      'Complimentary chai or filter coffee',
    ],
    cta: 'Join Waitlist',
  },
  {
    name: 'Weekender',
    price: '\u20B9249',
    unit: '3 passes',
    badge: 'SAVE 16%',
    badgeColor: '#FF6B00',
    topBorder: '#FF6B00',
    features: [
      '4-hour lobby access',
      'Secure luggage storage',
      'High-speed Wi-Fi',
      'Washroom & refresh access',
      'Complimentary chai or filter coffee',
      'Valid 7 days',
      'Priority pod booking',
    ],
    cta: 'Join Waitlist',
    soldOut: true,
  },
  {
    name: 'Nomad',
    price: '\u20B9699',
    unit: '10 passes',
    badge: 'SAVE 29%',
    badgeColor: '#F6C324',
    topBorder: '#F6C324',
    features: [
      '4-hour lobby access',
      'Secure luggage storage',
      'High-speed Wi-Fi',
      'Washroom & refresh access',
      'Complimentary chai or filter coffee',
      'Valid 30 days',
      'VIP lounge access where available',
      'Free cancellation',
    ],
    cta: 'Join Waitlist',
  },
];

export default function Pricing({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        background: 'transparent',
        padding: 'clamp(80px, 15vh, 160px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Scarcity banner */}
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

        <div
          className="section-label"
          style={{
            textAlign: 'center',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.1s',
          }}
        >
          ADMISSION
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            color: '#FFFFFF',
            textAlign: 'center',
            marginTop: 24,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.15s',
          }}
        >
          &#x20B9;99 for the dignity of a pause.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: 18,
            color: 'rgba(245, 242, 234, 0.6)',
            textAlign: 'center',
            maxWidth: 560,
            margin: '20px auto 0',
            lineHeight: 1.7,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.2s',
          }}
        >
          No subscription. No hidden fees. One pass, one pause, one perfectly timed departure.
        </p>

        {/* Pricing cards */}
        <div
          className="flex flex-col md:flex-row"
          style={{
            gap: 24,
            marginTop: 80,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="card-surface"
              style={{
                flex: '0 1 360px',
                padding: 48,
                position: 'relative',
                borderTop: plan.topBorder ? `3px solid ${plan.topBorder}` : undefined,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${0.35 + i * 0.15}s`,
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(255, 59, 0, 0.3)';
                el.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                el.style.transform = 'translateY(0)';
              }}
            >
              {plan.badge && (
                <span
                  className="font-mono"
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 11,
                    background: plan.badgeColor,
                    color: '#0A0A0A',
                    padding: '4px 12px',
                    borderRadius: 50,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {plan.badge}
                </span>
              )}

              {plan.soldOut && (
                <span
                  className="font-mono"
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontSize: 10,
                    background: 'rgba(255, 59, 0, 0.15)',
                    color: '#FF3B00',
                    padding: '3px 10px',
                    borderRadius: 50,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Most Popular
                </span>
              )}

              <div
                className="font-display"
                style={{
                  fontSize: 64,
                  color: '#FF3B00',
                  lineHeight: 1,
                  marginTop: 8,
                }}
              >
                {plan.price}
              </div>
              <div
                className="font-body"
                style={{
                  fontSize: 18,
                  color: '#F5F2EA',
                  marginTop: 8,
                }}
              >
                {plan.unit}
              </div>

              <ul style={{ marginTop: 32, padding: 0, listStyle: 'none' }}>
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="font-body"
                    style={{
                      fontSize: 15,
                      color: 'rgba(245, 242, 234, 0.7)',
                      lineHeight: 1.6,
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2DB400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Magnetic>
                <button
                  className="btn-pill"
                  style={{
                    width: '100%',
                    marginTop: 32,
                  }}
                  onClick={() => onOpenWaitlist(plan.name)}
                >
                  {plan.cta}
                </button>
              </Magnetic>

              <p
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: 'rgba(245, 242, 234, 0.25)',
                  textAlign: 'center',
                  marginTop: 12,
                  letterSpacing: '0.05em',
                }}
              >
                No payment today. Reserve your spot.
              </p>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 60,
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.7s',
          }}
        >
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ gap: 32 }}
          >
            {[
              { label: 'Price Lock', desc: '₹99 forever for waitlist' },
              { label: 'Free Cancellation', desc: 'Anytime, no questions' },
              { label: 'Launch Guarantee', desc: 'First 500 get priority' },
            ].map((item) => (
              <div key={item.label} className="flex items-center" style={{ gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F6C324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div
                    className="font-display"
                    style={{ fontSize: 13, color: '#FFFFFF' }}
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
