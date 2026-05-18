import { useEffect, useState } from 'react';
import Magnetic from '../components/Magnetic';

export default function Hero({ onOpenWaitlist }: { onOpenWaitlist: (plan?: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-end"
      style={{
        minHeight: '100vh',
        zIndex: 1,
        padding: '0 clamp(24px, 5vw, 80px)',
        paddingBottom: '6vh',
      }}
    >
      {/* Darkening gradients for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 30% 75%, rgba(10, 10, 10, 0.7) 0%, transparent 100%)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10, 10, 10, 0.85) 0%, transparent 40%)',
          zIndex: 0,
        }}
      />

      {/* Hero content */}
      <div className="relative" style={{ zIndex: 1, maxWidth: 720 }}>
        {/* Pre-launch badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            background: 'rgba(255, 59, 0, 0.1)',
            border: '1px solid rgba(255, 59, 0, 0.2)',
            borderRadius: 50,
            marginBottom: 24,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1)',
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
            style={{ fontSize: 11, color: '#FF6B00', letterSpacing: '0.1em' }}
          >
            PRE-LAUNCH — GOA & HYDERABAD
          </span>
        </div>

        <h1
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textShadow: '0 2px 30px rgba(0, 0, 0, 0.9)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.1s',
          }}
        >
          <span className="block">PAUSE</span>
          <span className="block">BETWEEN</span>
          <span className="block">DEPARTURES</span>
        </h1>

        <p
          className="font-body"
          style={{
            fontSize: 18,
            color: '#F5F2EA',
            lineHeight: 1.7,
            maxWidth: 480,
            marginTop: 24,
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.25s',
          }}
        >
          Pause spaces for the gap between checkout and takeoff. Just &#x20B9;99. No more dragging luggage through the city.
        </p>

        <div
          style={{
            marginTop: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.19, 1, 0.22, 1) 0.4s',
          }}
        >
          <Magnetic>
            <button className="btn-pill" onClick={() => onOpenWaitlist()}>
              Join the Waitlist — It&apos;s Free
            </button>
          </Magnetic>
        </div>

        {/* Social proof line */}
        <div
          className="flex items-center"
          style={{
            gap: 16,
            marginTop: 24,
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s cubic-bezier(0.19, 1, 0.22, 1) 0.6s',
          }}
        >
          <div className="flex" style={{ marginLeft: 4 }}>
            {[
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '2px solid #0A0A0A',
                  marginLeft: i > 0 ? -10 : 0,
                  objectFit: 'cover',
                }}
              />
            ))}
          </div>
          <span
            className="font-mono"
            style={{ fontSize: 12, color: 'rgba(245, 242, 234, 0.5)' }}
          >
            1,247 travelers waiting
          </span>
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
