import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/authState';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './LandingPage.module.css';

import MainVisualSection from '../component/landing/MainVisualSection';
import UserTrustSection from '../component/landing/UserTrustSection';
import HowItWorksSection from '../component/landing/HowItWorksSection';
import TrustedProcessSection from '../component/landing/TrustedProcessSection';
import StartNowSection from '../component/landing/StartNowSection';


const LandingPage = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/home');
    }
  }, [auth, navigate]);

  const stepRef = useRef(null);

  return (
    <div className={styles.pageWrapper}>
      <MainVisualSection onScrollToSteps={() => stepRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <UserTrustSection />
      <div ref={stepRef}>
        <HowItWorksSection />
      </div>
      <TrustedProcessSection />
      <StartNowSection />
    </div>
  );
};

export default LandingPage;
