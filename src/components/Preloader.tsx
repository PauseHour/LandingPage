import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear increment for cinematic effect
      current += Math.floor(Math.random() * 15) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setIsDone(true), 400); // Hold at 100% for a beat
        setTimeout(() => setIsVisible(false), 1400); // fully unmount after exit animation
      }
      setProgress(current);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isDone ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 1s cubic-bezier(0.85, 0, 0.15, 1)',
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 'clamp(48px, 10vw, 120px)',
          color: '#F5F2EA',
          letterSpacing: '-0.05em',
          opacity: isDone ? 0 : 1,
          transform: isDone ? 'translateY(-40px)' : 'translateY(0)',
          transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
        }}
      >
        {progress.toString().padStart(3, '0')}%
      </div>
      
      {/* Progress Bar Line */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(200px, 40vw, 400px)',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          opacity: isDone ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#FF3B00',
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>
    </div>
  );
}
