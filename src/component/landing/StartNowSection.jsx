import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';
import styles from './StartNowSection.module.css';

const StartNowSection = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleSellClick = () => {
    if (user.isLoggedIn) {
      navigate('/sell/product');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          지금 바로 <span className={styles.highlight}>U:REVERSE</span>와 함께해요!
        </h2>
        <p className={styles.subtitle}>
          더 이상 버리지 마세요.<br />
          환경을 지키는 가장 똑똑한 방법, <br />
          지금 바로 실천해보세요.
        </p>
        <button className={styles.button} onClick={handleSellClick}>판매 시작하기</button>
      </div>
    </section>
  );
};

export default StartNowSection;
