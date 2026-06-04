import { useEffect, useRef, useState } from 'react';
import { QrCode, Wifi, Coffee, Bath, Lock, Plane, Sparkles } from 'lucide-react';

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
    body: 'Settle into the lounge with high-speed Wi-Fi, take a quick shower, grab complimentary chai, and finish that presentation. Choose whichever plan you like or whichever service you want to experience—you can avail it all.',
    duration: 'Deep focus',
  },
  {
    time: '05:30 PM',
    title: 'Depart Refreshed',
    body: 'Pick up your bags. Head to your 8 PM flight feeling completely refreshed, rather than exhausted from city streets.',
    duration: 'Ready to fly',
  },
];

function PausePassCard({ index, isMobile }: { index: number; isMobile?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: isMobile ? '140px' : '280px',
        height: isMobile ? '200px' : '380px',
        background: 'linear-gradient(180deg, #141414 0%, #0a0a0a 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: isMobile ? '12px' : '24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 59, 0, 0.03)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"JetBrains Mono", monospace',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top phone bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          fontSize: '9px',
          color: 'rgba(255, 255, 255, 0.4)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        }}
      >
        <span style={{ color: '#FF3B00', fontWeight: 'bold' }}>PAUSE NET</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Wifi size={10} style={{ color: index === 2 ? '#FF3B00' : 'inherit' }} />
          <span>5G</span>
          <div
            style={{
              width: '14px',
              height: '8px',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '2px',
              padding: '1px',
              display: 'flex',
            }}
          >
            <div style={{ width: '100%', height: '100%', background: index === 3 ? '#FF3B00' : 'rgba(255,255,255,0.6)', borderRadius: '1px' }} />
          </div>
        </div>
      </div>

      {/* Main card content */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '16px', position: 'relative', justifyContent: 'space-between' }}>
        {index === 0 && (
          <>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: 'rgba(245, 242, 234, 0.4)', letterSpacing: '0.1em' }}>MEMBER ACCESS PASS</div>
              <div style={{ fontSize: '16px', color: '#FFF', fontWeight: 'bold', marginTop: '2px', letterSpacing: '-0.02em', fontFamily: '"Space Grotesk", sans-serif' }}>PAUSE PASS</div>
            </div>

            <div
              style={{
                alignSelf: 'center',
                width: '120px',
                height: '120px',
                background: 'rgba(255, 59, 0, 0.03)',
                border: '1px solid rgba(255, 59, 0, 0.2)',
                borderRadius: '12px',
                padding: '10px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 59, 0, 0.05)',
              }}
            >
              <div
                className="sweep-line"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #FF3B00, transparent)',
                  boxShadow: '0 0 8px #FF3B00',
                  zIndex: 2,
                }}
              />
              <QrCode size={80} strokeWidth={1.5} style={{ color: '#FF3B00', filter: 'drop-shadow(0 0 4px rgba(255, 59, 0, 0.3))' }} />
            </div>

            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'rgba(245, 242, 234, 0.4)' }}>
                <span>PASS RATE</span>
                <span>STATUS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', color: '#FFF', marginTop: '2px' }}>
                <span style={{ color: '#FF3B00' }}>₹99 FLAT RATE</span>
                <span style={{ textShadow: '0 0 8px rgba(255, 59, 0, 0.5)' }}>CONFIRMED</span>
              </div>
            </div>
          </>
        )}

        {index === 1 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '8px', color: 'rgba(245, 242, 234, 0.4)' }}>ACCESS ZONE</div>
                <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 'bold', marginTop: '2px' }}>PARTNER LOBBY</div>
              </div>
              <div
                style={{
                  padding: '2px 6px',
                  background: 'rgba(255, 59, 0, 0.1)',
                  borderRadius: '4px',
                  fontSize: '8px',
                  color: '#FF3B00',
                  fontWeight: 'bold',
                }}
              >
                VERIFIED
              </div>
            </div>

            <div
              style={{
                alignSelf: 'center',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Lock size={16} style={{ color: '#FF3B00' }} />
                <span style={{ fontSize: '11px', color: '#FFF', fontWeight: 'bold' }}>LUGGAGE LOCKER B4-12</span>
              </div>
              
              <div style={{ width: '80%', height: '24px', background: 'transparent', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: '#FF3B00',
                    left: '50%',
                    boxShadow: '0 0 6px #FF3B00',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%', opacity: 0.4 }}>
                  {[1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4].map((w, i) => (
                    <div key={i} style={{ width: `${w}px`, height: '100%', background: '#FFF' }} />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: '7px', color: 'rgba(245,242,234,0.4)', letterSpacing: '2px' }}>*PH-SECURE-ACCESS*</span>
            </div>

            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'rgba(245, 242, 234, 0.4)' }}>
                <span>STORAGE</span>
                <span>SECURITY LEVEL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#FFF', marginTop: '2px', fontWeight: 'bold' }}>
                <span>100% SECURE LOCK</span>
                <span style={{ color: '#2DB400' }}>MILITARY-GRADE</span>
              </div>
            </div>
          </>
        )}

        {index === 2 && (
          <>
            <div>
              <div style={{ fontSize: '8px', color: 'rgba(245, 242, 234, 0.4)' }}>CONNECTED SERVICES</div>
              <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 'bold', marginTop: '2px' }}>PREMIUM AMENITIES</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  background: 'rgba(255, 59, 0, 0.05)',
                  border: '1px solid rgba(255, 59, 0, 0.15)',
                  borderRadius: '10px',
                  padding: '8px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div className="pulse-active" style={{ position: 'absolute', top: -3, left: -3, right: -3, bottom: -3, border: '1px solid #FF3B00', borderRadius: '50%' }} />
                    <Wifi size={14} style={{ color: '#FF3B00', position: 'relative', zIndex: 2 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '7px', color: 'rgba(245,242,234,0.4)' }}>NETWORK WI-FI</div>
                    <div style={{ fontSize: '10px', color: '#FFF', fontWeight: 'bold' }}>PauseHour_Premium</div>
                  </div>
                </div>
                <div style={{ fontSize: '8px', color: '#FF3B00', fontWeight: 'bold', background: 'rgba(255, 59, 0, 0.1)', padding: '1px 4px', borderRadius: '4px' }}>
                  500 MBPS
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '2px 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'rgba(245,242,234,0.8)' }}>
                  <Bath size={10} style={{ color: '#FF3B00' }} />
                  <span>Shower Pod Access</span>
                  <span style={{ marginLeft: 'auto', fontSize: '8px', color: '#2DB400', fontWeight: 'bold' }}>✓ READY</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'rgba(245,242,234,0.8)' }}>
                  <Coffee size={10} style={{ color: '#FF3B00' }} />
                  <span>Complimentary Chai</span>
                  <span style={{ marginLeft: 'auto', fontSize: '8px', color: '#2DB400', fontWeight: 'bold' }}>✓ CLAIMED</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'rgba(245,242,234,0.8)' }}>
                  <Sparkles size={10} style={{ color: '#FF3B00' }} />
                  <span>Lounge workspace</span>
                  <span style={{ marginLeft: 'auto', fontSize: '8px', color: '#2DB400', fontWeight: 'bold' }}>✓ ACTIVE</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'rgba(245, 242, 234, 0.4)' }}>
                <span>SESSION STATUS</span>
                <span>IP ADDRESS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#FFF', marginTop: '2px', fontWeight: 'bold' }}>
                <span style={{ color: '#FF3B00' }}>IN FOCUS SESSION</span>
                <span style={{ opacity: 0.6 }}>192.168.10.8</span>
              </div>
            </div>
          </>
        )}

        {index === 3 && (
          <>
            <div>
              <div style={{ fontSize: '8px', color: 'rgba(245, 242, 234, 0.4)' }}>CHECKOUT COMPLETED</div>
              <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 'bold', marginTop: '2px' }}>BOARDING PASS ACTIVE</div>
            </div>

            <div
              style={{
                alignSelf: 'center',
                width: '100%',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '7px', color: 'rgba(245,242,234,0.4)' }}>FROM</div>
                  <div style={{ fontSize: '12px', color: '#FFF', fontWeight: 'bold' }}>PAUSE</div>
                </div>
                <Plane size={12} className="plane-floating" style={{ color: '#FF3B00' }} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '7px', color: 'rgba(245,242,234,0.4)' }}>TO (FLIGHT)</div>
                  <div style={{ fontSize: '12px', color: '#FFF', fontWeight: 'bold' }}>FLIGHT</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', paddingBottom: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#FF3B00', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                  THANK YOU. VISIT AGAIN.
                </div>
                <div style={{ fontSize: '8px', color: 'rgba(245, 242, 234, 0.4)', marginTop: '4px' }}>
                  Your dignity is our priority
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'rgba(245, 242, 234, 0.4)' }}>
                <span>DEPARTURE TIME</span>
                <span>BAGS COLLECTED</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#FFF', marginTop: '2px', fontWeight: 'bold' }}>
                <span>05:30 PM (FLIGHT 8 PM)</span>
                <span style={{ color: '#2DB400' }}>YES</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* pass notch cutouts */}
      <div style={{ position: 'absolute', left: '-8px', bottom: '60px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--pause-void)', borderRight: '1px solid rgba(255,255,255,0.08)', zIndex: 10 }} />
      <div style={{ position: 'absolute', right: '-8px', bottom: '60px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--pause-void)', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 10 }} />
    </div>
  );
}

function JourneyClock({ activeIndex, isMobile }: { activeIndex: number; isMobile?: boolean }) {
  const stepDetails = [
    { hourAngle: 330, minuteAngle: 0, progress: 0.15 },
    { hourAngle: 337.5, minuteAngle: 90, progress: 0.4 },
    { hourAngle: 30, minuteAngle: 0, progress: 0.7 },
    { hourAngle: 165, minuteAngle: 180, progress: 1.0 },
  ];

  const details = stepDetails[activeIndex] || stepDetails[0];
  const radius = 55;
  const circumference = 2 * Math.PI * radius; // ~345.5
  const strokeDashoffset = circumference - (circumference * details.progress);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '6px' : '12px', position: 'relative' }}>
      <svg width={isMobile ? '80' : '130'} height={isMobile ? '80' : '130'} viewBox="0 0 160 160">
        {/* Background track circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="3"
          fill="none"
        />

        {/* Progress Arc */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#FF3B00"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: 'rotate(-90deg)',
            transformOrigin: '80px 80px',
            filter: 'drop-shadow(0 0 4px rgba(255, 59, 0, 0.5))',
          }}
        />

        {/* Hours ticks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const isKeyHour = angle % 90 === 0;
          const len = isKeyHour ? 8 : 4;
          const strokeColor = isKeyHour ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)';
          return (
            <line
              key={i}
              x1="80"
              y1={80 - radius + len}
              x2="80"
              y2={80 - radius}
              stroke={strokeColor}
              strokeWidth={isKeyHour ? 2 : 1}
              transform={`rotate(${angle}, 80, 80)`}
            />
          );
        })}

        {/* Center pivot point */}
        <circle cx="80" cy="80" r="5" fill="#FF3B00" style={{ filter: 'drop-shadow(0 0 3px #FF3B00)' }} />

        {/* Hour Hand */}
        <line
          x1="80"
          y1="80"
          x2="80"
          y2="45"
          stroke="#FF3B00"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${details.hourAngle}, 80, 80)`}
          style={{
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: '80px 80px',
            filter: 'drop-shadow(0 0 2px rgba(255, 59, 0, 0.4))',
          }}
        />

        {/* Minute Hand */}
        <line
          x1="80"
          y1="80"
          x2="80"
          y2="28"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${details.minuteAngle}, 80, 80)`}
          style={{
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: '80px 80px',
          }}
        />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: isMobile ? '7px' : '9px', fontFamily: '"JetBrains Mono", monospace', color: 'rgba(245, 242, 234, 0.4)', letterSpacing: '0.1em' }}>TIMELINE ACTIVE</span>
        <div style={{ fontSize: isMobile ? '14px' : '24px', fontWeight: 'bold', color: '#FFF', fontFamily: '"Space Grotesk", sans-serif', marginTop: '2px', textShadow: '0 0 8px rgba(255,255,255,0.1)' }}>
          {steps[activeIndex].time}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 1. Intersection Observer for overall section entering viewport
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    // 2. Window scroll event listener to detect active step card
    const handleScroll = () => {
      const cardElements = document.querySelectorAll('.step-card-trigger');
      if (!cardElements.length) return;
      
      let closestIndex = 0;
      let closestDist = Infinity;
      const centerY = window.innerHeight / 2.2;
      
      cardElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - centerY);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = index;
        }
      });
      
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        background: 'transparent',
        padding: isMobile ? '40px 16px' : 'clamp(40px, 8vh, 80px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan-sweep {
          0% { top: 0%; opacity: 0.5; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0.5; }
        }
        @keyframes pulse-wave {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes float-plane {
          0% { transform: translate(0, 0); }
          50% { transform: translate(3px, -3px); }
          100% { transform: translate(0, 0); }
        }
        .sweep-line {
          animation: scan-sweep 3s ease-in-out infinite;
        }
        .pulse-active {
          animation: pulse-wave 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .plane-floating {
          animation: float-plane 4s ease-in-out infinite;
        }
      `}} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 80 }}>
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

        {/* Mobile and Desktop both use same two-column layout below */}

        {/* Layout container */}
        <div className="flex flex-col md:flex-row relative" style={{ gap: isMobile ? '30px' : '60px' }}>
          
          {/* Mobile: compact sticky top bar showing current step */}
          {isMobile && (
            <div
              style={{
                position: 'sticky',
                top: '60px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                padding: '12px 16px',
                background: 'rgba(10, 10, 10, 0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 59, 0, 0.15)',
                borderRadius: '12px',
                marginBottom: '24px',
                opacity: inView ? 1 : 0,
                transition: 'opacity 0.6s ease',
              }}
            >
              <JourneyClock activeIndex={activeIndex} isMobile={true} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '8px', fontFamily: '"JetBrains Mono", monospace', color: 'rgba(245, 242, 234, 0.4)', letterSpacing: '0.12em' }}>CURRENT STEP</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFF', fontFamily: '"Space Grotesk", sans-serif' }}>{steps[activeIndex].time}</span>
                <span style={{ fontSize: '10px', fontFamily: '"Space Grotesk", sans-serif', color: '#FF3B00', fontWeight: 600 }}>{steps[activeIndex].title}</span>
              </div>
            </div>
          )}

          {/* Desktop: Sticky left column with clock + card */}
          {!isMobile && (
            <div
              style={{
                width: '40%',
                position: 'sticky',
                top: '15vh',
                height: '70vh',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
                paddingRight: '20px',
                borderRight: '1px solid rgba(255, 255, 255, 0.04)',
                display: 'flex',
                opacity: inView ? 1 : 0,
                transition: 'opacity 1s ease 0.3s',
                alignSelf: 'flex-start',
              }}
            >
              <JourneyClock activeIndex={activeIndex} isMobile={false} />
              <PausePassCard index={activeIndex} isMobile={false} />
            </div>
          )}

          {/* Right/Full Column: Timeline elements */}
          <div
            style={{
              width: isMobile ? '100%' : '60%',
              position: 'relative',
            }}
          >
            {/* Background Line */}
            <div
              style={{
                position: 'absolute',
                top: '40px',
                bottom: isMobile ? '60px' : '120px',
                left: isMobile ? '12px' : 'clamp(16px, 3vw, 32px)',
                width: '2px',
                background: 'rgba(255, 255, 255, 0.04)',
              }}
            />

            {/* Scroll-driven Progress Line */}
            <div
              style={{
                position: 'absolute',
                top: '40px',
                height: `${(activeIndex / (steps.length - 1)) * (100 - (isMobile ? 100 : 160) / steps.length)}%`, // Dynamic height matching current active step node
                left: isMobile ? '12px' : 'clamp(16px, 3vw, 32px)',
                width: '2px',
                background: 'linear-gradient(to bottom, #FF3B00 0%, #FF6B00 100%)',
                boxShadow: '0 0 12px rgba(255, 59, 0, 0.6)',
                transition: 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {steps.map((step, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={i}
                  className="step-card-trigger flex flex-col md:flex-row relative"
                  data-index={i}
                  style={{
                    paddingLeft: isMobile ? '24px' : 'clamp(32px, 6vw, 80px)',
                    paddingTop: isMobile ? '12px' : '32px',
                    paddingBottom: isMobile ? '28px' : 'clamp(48px, 10vh, 120px)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${0.2 + i * 0.1}s`,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: isMobile ? '5px' : 'calc(clamp(16px, 3vw, 32px) - 5px)',
                      top: isMobile ? '18px' : '40px',
                      width: isMobile ? '10px' : '12px',
                      height: isMobile ? '10px' : '12px',
                      borderRadius: '50%',
                      background: isActive ? '#FF3B00' : (activeIndex > i ? '#FF3B00' : '#0A0A0A'),
                      border: activeIndex >= i ? '2px solid #FF3B00' : '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: activeIndex >= i ? '0 0 15px rgba(255, 59, 0, 0.8)' : 'none',
                      transition: 'all 0.4s ease',
                      zIndex: 2,
                    }}
                  />

                  {/* Stamp */}
                  <div
                    className="font-mono md:w-1/4 shrink-0"
                    style={{
                      fontSize: isMobile ? 10 : 14,
                      color: isActive ? '#FF3B00' : 'rgba(255, 59, 0, 0.5)',
                      letterSpacing: isMobile ? '0.04em' : '0.1em',
                      marginBottom: isMobile ? '6px' : '12px',
                      marginTop: isMobile ? '12px' : '34px',
                      fontWeight: isActive ? 'bold' : 'normal',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {step.time}
                  </div>

                  {/* Card content */}
                  <div
                    className="card-surface grow flex flex-col"
                    style={{
                      padding: isMobile ? '10px 12px' : 'clamp(16px, 4vw, 32px)',
                      borderColor: isActive ? 'rgba(255, 59, 0, 0.6)' : 'rgba(255, 255, 255, 0.04)',
                      boxShadow: isActive ? '0 10px 30px rgba(255, 59, 0, 0.08)' : 'none',
                      opacity: isMobile ? 1 : (isActive ? 1 : 0.35),
                      transform: isMobile ? 'none' : (isActive ? 'scale(1.02)' : 'scale(0.97)'),
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{ fontSize: isMobile ? 14 : 22, color: '#FFF', marginBottom: isMobile ? 6 : 12 }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body"
                      style={{
                        fontSize: isMobile ? 11 : 15,
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
                        color: isActive ? '#FF3B00' : 'rgba(245, 242, 234, 0.3)',
                        marginTop: 20,
                        paddingTop: 16,
                        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {step.duration}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
          <button className="btn-pill" onClick={() => onOpenWaitlist('How It Works Button')}>
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
