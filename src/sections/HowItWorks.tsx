import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    time: '11:00 AM',
    title: 'Checkout & Book',
    body: 'Hotel checkout time. Instead of wandering, buy a ₹99 digital pass on our app for a Pause Space nearby.',
    duration: '2 min booking',
  },
  {
    time: '11:15 AM',
    title: 'Walk Into the Lobby',
    body: 'Arrive at our partner boutique hotel. Show your pass, drop your heavy luggage in our secure storage.',
    duration: 'Zero friction',
  },
  {
    time: '01:00 PM',
    title: 'Work & Refresh',
    body: 'Settle into the lounge with high-speed Wi-Fi, take a quick shower, grab complimentary chai, and finish that presentation.',
    duration: 'Deep focus',
  },
  {
    time: '05:30 PM',
    title: 'Depart Refreshed',
    body: 'Pick up your bags. Head to your 8 PM flight feeling completely refreshed, rather than exhausted from city streets.',
    duration: 'Ready to fly',
  },
];

export default function HowItWorks({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
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
      id="how-it-works"
      style={{
        background: 'transparent',
        padding: 'clamp(80px, 15vh, 160px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 100 }}>
          <div
            className="section-label"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
            }}
          >
            THE TIMELINE
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: '#FFFFFF',
              marginTop: 20,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.1s',
            }}
          >
            Four steps. One perfect pause.
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: 18,
              color: 'rgba(245, 242, 234, 0.6)',
              maxWidth: 520,
              margin: '16px auto 0',
              lineHeight: 1.7,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.2s',
            }}
          >
            From checkout to takeoff, we make every gap hour count.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Center Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 'clamp(16px, 5vw, 32px)',
              width: '2px',
              background: 'linear-gradient(to bottom, #FF3B00 0%, rgba(255, 59, 0, 0.1) 100%)',
              transformOrigin: 'top',
              transform: inView ? 'scaleY(1)' : 'scaleY(0)',
              transition: 'transform 1.5s cubic-bezier(0.19, 1, 0.22, 1) 0.3s',
            }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row relative"
              style={{
                paddingLeft: 'clamp(48px, 10vw, 80px)',
                marginBottom: i === steps.length - 1 ? 0 : '60px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${0.4 + i * 0.15}s`,
              }}
            >
              {/* Timeline Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(clamp(16px, 5vw, 32px) - 5px)',
                  top: '6px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#0A0A0A',
                  border: '2px solid #FF3B00',
                  boxShadow: '0 0 12px rgba(255, 59, 0, 0.6)',
                }}
              />

              {/* Time Stamp */}
              <div
                className="font-mono sm:w-1/4 shrink-0"
                style={{
                  fontSize: 14,
                  color: '#FF3B00',
                  letterSpacing: '0.1em',
                  marginBottom: '16px',
                  marginTop: '1px',
                }}
              >
                {step.time}
              </div>

              {/* Content Card */}
              <div
                className="card-surface grow"
                style={{
                  padding: '32px',
                }}
              >
                <h3
                  className="font-display"
                  style={{ fontSize: 24, color: '#FFF', marginBottom: 12 }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: 16,
                    color: 'rgba(245, 242, 234, 0.6)',
                    lineHeight: 1.6,
                  }}
                >
                  {step.body}
                </p>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    color: 'rgba(245, 242, 234, 0.3)',
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {step.duration}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 80,
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.8s',
          }}
        >
          <button className="btn-pill" onClick={() => onOpenWaitlist()}>
            Reserve Your First Pause
          </button>
          <p
            className="font-mono"
            style={{
              fontSize: 11,
              color: 'rgba(245, 242, 234, 0.3)',
              marginTop: 12,
              letterSpacing: '0.05em',
            }}
          >
            Join 1,247+ travelers on the waitlist
          </p>
        </div>
      </div>
    </section>
  );
}
