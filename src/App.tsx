import { useEffect } from 'react';
import Preloader from './components/Preloader';
import WireframeHotel from './components/WireframeHotel';
import WaitlistModal, { useWaitlistModal } from './components/WaitlistModal';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import HowItWorks from './sections/HowItWorks';
import Spaces from './sections/Spaces';
import Pricing from './sections/Pricing';
import Manifesto from './sections/Manifesto';
import Footer from './sections/Footer';

export default function App() {
  const { isOpen, open, close, planName } = useWaitlistModal();

  useEffect(() => {
    // Native smooth scroll enabled via index.css
  }, []);

  return (
    <>
      <Preloader />
      
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <WireframeHotel />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation onOpenWaitlist={open} />
        <Hero onOpenWaitlist={open} />
        <Problem />
        <HowItWorks onOpenWaitlist={open} />
        <Spaces onOpenWaitlist={open} />
        <Pricing onOpenWaitlist={open} />
        <Manifesto />
        <Footer onOpenWaitlist={open} />
      </div>

      <WaitlistModal isOpen={isOpen} onClose={close} planName={planName} />
    </>
  );
}
