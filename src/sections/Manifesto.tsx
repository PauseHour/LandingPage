import { useEffect, useRef, useState, useCallback } from 'react';

const manifestoLines = [
  "WE ARE NOT A HOTEL.",
  "WE ARE NOT A LOUNGE.",
  "WE ARE THE SPACE BETWEEN.",
  "₹99. FOUR HOURS. INFINITE DIGNITY.",
  "BETWEEN CHECKOUT AND TAKEOFF,",
  "PAUSE.",
];

const baseDelay = 300;
const charDelay = 50;
const lineDelay = 300;
const emphasisPause = 800;

interface CharState {
  line: number;
  char: number;
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleChars, setVisibleChars] = useState<CharState[]>([]);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [underlinesVisible, setUnderlinesVisible] = useState<number[]>([]);
  const [heartbeatLine, setHeartbeatLine] = useState<number | null>(null);
  const hasStarted = useRef(false);

  const delay = useCallback((ms: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }, []);

  const isCharVisible = useCallback((lineIdx: number, charIdx: number) => {
    return visibleChars.some((c) => c.line === lineIdx && c.char === charIdx);
  }, [visibleChars]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startTyping();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const startTyping = async () => {
    await delay(baseDelay);

    for (let lineIdx = 0; lineIdx < manifestoLines.length; lineIdx++) {
      setVisibleLines((prev) => [...prev, lineIdx]);
      const line = manifestoLines[lineIdx];

      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        setVisibleChars((prev) => [...prev, { line: lineIdx, char: charIdx }]);
        await delay(charDelay);
      }

      // Show underline for this line
      setUnderlinesVisible((prev) => [...prev, lineIdx]);

      const pause = (lineIdx === 1 || lineIdx === 3) ? emphasisPause : lineDelay;
      await delay(pause);
    }

    // Final heartbeat on last underline
    await delay(1000);
    setHeartbeatLine(manifestoLines.length - 1);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#111111',
        padding: 'clamp(100px, 20vh, 200px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 800, width: '100%' }}>
        {manifestoLines.map((line, lineIdx) => (
          visibleLines.includes(lineIdx) && (
            <div
              key={lineIdx}
              style={{
                marginBottom: 24,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 4vw, 48px)',
                  color: '#F5F2EA',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                }}
              >
                {(() => {
                  let globalCharIdx = 0;
                  const words = line.split(/(\s+)/);
                  return words.map((word, wordIdx) => {
                    return (
                      <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {word.split('').map((char) => {
                          const charIdx = globalCharIdx++;
                          const isVisible = isCharVisible(lineIdx, charIdx);
                          return (
                            <span
                              key={charIdx}
                              style={{
                                display: 'inline-block',
                                minWidth: char === ' ' ? '0.3em' : (char === '₹' ? '0.8em' : 'auto'),
                                textAlign: 'center',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                                transition: 'opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                              }}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          );
                        })}
                      </span>
                    );
                  });
                })()}
              </div>
              <div
                style={{
                  height: 3,
                  background: '#FF3B00',
                  width: underlinesVisible.includes(lineIdx) ? '100%' : '0%',
                  marginTop: 8,
                  transition: 'width 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
                  transformOrigin: 'center',
                  animation: heartbeatLine === lineIdx ? 'underlineHeartbeat 0.3s ease-in-out' : 'none',
                }}
              />
            </div>
          )
        ))}
      </div>
    </section>
  );
}
