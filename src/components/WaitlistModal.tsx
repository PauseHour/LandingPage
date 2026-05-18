import { useState, useCallback, useEffect } from 'react';
import { submitWaitlist } from '../api';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

export function useWaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [planName, setPlanName] = useState<string | undefined>();

  const open = useCallback((plan?: string) => {
    setPlanName(plan);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setPlanName(undefined);
    document.body.style.overflow = '';
  }, []);

  return { isOpen, open, close, planName };
}

export default function WaitlistModal({ isOpen, onClose, planName }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [waitlistPosition, setWaitlistPosition] = useState(0);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setBackendError('');
      setName('');
      setEmail('');
      setErrors({});
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError('');
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitWaitlist(name, email, planName);
      setWaitlistPosition(result.position);
      setSubmitted(true);
    } catch (err: any) {
      setBackendError(err.message || 'An error occurred connecting to our servers.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.3s ease-out',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          background: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 16,
          padding: 'clamp(32px, 5vw, 56px)',
          maxWidth: 480,
          width: '100%',
          animation: 'slideUp 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            color: 'rgba(245, 242, 234, 0.5)',
            fontSize: 24,
            cursor: 'pointer',
            padding: 4,
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        {!submitted ? (
          <>
            {/* Badge */}
            <div
              className="font-mono"
              style={{
                fontSize: 11,
                color: '#FF6B00',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Coming Soon to {planName || 'Your City'}
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                color: '#FFFFFF',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              We&apos;re Fully Booked for Launch
            </h2>

            <p
              className="font-body"
              style={{
                fontSize: 15,
                color: 'rgba(245, 242, 234, 0.6)',
                lineHeight: 1.6,
                marginTop: 12,
              }}
            >
              {planName
                ? `The ${planName} plan is in high demand. Join the waitlist to secure your spot when we open bookings.`
                : `Pause Hour is launching soon. Join the waitlist to be the first to know when bookings open.`}
            </p>

            {/* Urgency bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 24,
                padding: '12px 16px',
                background: 'rgba(255, 59, 0, 0.08)',
                borderRadius: 8,
                border: '1px solid rgba(255, 59, 0, 0.15)',
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
                style={{ fontSize: 12, color: '#FF3B00' }}
              >
                Only 500 early-access spots available
              </span>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: 32 }}>
              <div style={{ marginBottom: 20 }}>
                <label
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: 11,
                    color: 'rgba(245, 242, 234, 0.5)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0A0A0A',
                    border: `1px solid ${errors.name ? '#FF3B00' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: 8,
                    color: '#F5F2EA',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 15,
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    if (!errors.name) e.target.style.borderColor = 'rgba(255, 59, 0, 0.4)';
                  }}
                  onBlur={(e) => {
                    if (!errors.name) e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                />
                {errors.name && (
                  <span style={{ fontSize: 12, color: '#FF3B00', marginTop: 4, display: 'block' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: 11,
                    color: 'rgba(245, 242, 234, 0.5)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="you@email.com"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0A0A0A',
                    border: `1px solid ${errors.email ? '#FF3B00' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: 8,
                    color: '#F5F2EA',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 15,
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    if (!errors.email) e.target.style.borderColor = 'rgba(255, 59, 0, 0.4)';
                  }}
                  onBlur={(e) => {
                    if (!errors.email) e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                />
                {errors.email && (
                  <span style={{ fontSize: 12, color: '#FF3B00', marginTop: 4, display: 'block' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {backendError && (
                <div style={{ marginBottom: 16, padding: '12px', background: 'rgba(255, 59, 0, 0.1)', borderRadius: 8, border: '1px solid rgba(255, 59, 0, 0.2)' }}>
                  <span style={{ fontSize: 13, color: '#FF3B00' }}>{backendError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-pill"
                style={{
                  width: '100%',
                  padding: '16px 28px',
                  fontSize: 16,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                {isSubmitting ? (
                  <>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        border: '2px solid rgba(10, 10, 10, 0.2)',
                        borderTopColor: '#0A0A0A',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    Securely Processing...
                  </>
                ) : (
                  "Join Waitlist — It's Free"
                )}
              </button>
            </form>

            <p
              className="font-body"
              style={{
                fontSize: 12,
                color: 'rgba(245, 242, 234, 0.3)',
                textAlign: 'center',
                marginTop: 16,
              }}
            >
              No payment required. We&apos;ll notify you when we launch.
            </p>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(45, 180, 0, 0.1)',
                border: '2px solid #2DB400',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2DB400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 28,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              You&apos;re on the List
            </h2>

            <p
              className="font-body"
              style={{
                fontSize: 15,
                color: 'rgba(245, 242, 234, 0.6)',
                lineHeight: 1.6,
                marginTop: 12,
              }}
            >
              Thanks, <strong style={{ color: '#F5F2EA' }}>{name}</strong>! We&apos;ll email you at <strong style={{ color: '#F5F2EA' }}>{email}</strong> as soon as Pause Hour launches in your city. Early-access members get priority booking and a complimentary upgrade.
            </p>

            <div
              style={{
                marginTop: 24,
                padding: '16px',
                background: 'rgba(246, 195, 36, 0.06)',
                borderRadius: 8,
                border: '1px solid rgba(246, 195, 36, 0.15)',
              }}
            >
              <span className="font-mono" style={{ fontSize: 12, color: '#F6C324' }}>
                Your waitlist position: #{waitlistPosition}
              </span>
            </div>

            <button
              onClick={onClose}
              className="btn-pill"
              style={{ marginTop: 24 }}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
