import { useRef, useCallback } from 'react';
import styles from './LandingPage.module.css';

import MainVisualSection from '../component/landing/MainVisualSection';
import UserTrustSection from '../component/landing/UserTrustSection';
import HowItWorksSection from '../component/landing/HowItWorksSection';
import TrustedProcessSection from '../component/landing/TrustedProcessSection';
import StartNowSection from '../component/landing/StartNowSection';


const LandingPage = () => {
  const stepRef = useRef(null);

  const scrollToSteps = useCallback(() => {
    if (stepRef.current) {
      stepRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.scrollContainer}>
        <MainVisualSection onScrollToSteps={scrollToSteps} />
        <UserTrustSection />
        <div ref={stepRef}>
          <HowItWorksSection />
        </div>
        <TrustedProcessSection />
        <StartNowSection />
      </div>
    </div>
  );
};

export default LandingPage;
