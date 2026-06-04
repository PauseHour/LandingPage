import { useEffect, useRef, useState } from 'react';

function useCountUp(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(eased * end);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);

  return count;
}

export default function Problem() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const travelersCount = useCountUp(47, 1500, inView);
  const gapCount = useCountUp(6.2, 1200, inView);

  const stats = [
    { value: `${Math.floor(travelersCount)}M`, label: 'STRANDED TRAVELERS' },
    { value: `${gapCount.toFixed(1)}H`, label: 'AVERAGE GAP' },
    { value: '\u20B90', label: 'WORTH OF DIGNITY' },
  ];

  return (
    <section
      ref={sectionRef}
      id="problem"
      style={{
        background: 'transparent',
        padding: 'clamp(40px, 8vh, 80px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
        <div
          className="section-label"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
        >
          THE GAP
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#FFFFFF',
            maxWidth: 800,
            margin: '24px auto 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.15s',
          }}
        >
          You&apos;re not stranded. You&apos;re just between departures.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: 18,
            color: '#F5F2EA',
            lineHeight: 1.7,
            maxWidth: 640,
            margin: '32px auto 0',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.3s',
          }}
        >
          11 AM checkout. 8 PM flight. Six hours of nowhere. Dragging luggage through humid streets, camped in cafes with dying laptops, counting rupees for another overpriced coffee just to use the bathroom. India has 47 million stranded travelers every year. We built PAUSE HOUR because the gap deserves dignity.
        </p>

        <div
          className="flex flex-row items-start justify-between md:justify-center w-full gap-2 md:gap-20 mt-12 md:mt-20"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${0.45 + i * 0.15}s`,
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 'clamp(24px, 6vw, 56px)',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 'clamp(9px, 2.5vw, 12px)',
                  color: '#FF3B00',
                  letterSpacing: '0.15em',
                  marginTop: 12,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
