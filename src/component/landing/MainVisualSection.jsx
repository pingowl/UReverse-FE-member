import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';
import styles from './MainVisualSection.module.css';

const MainVisualSection = ({ onScrollToSteps }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleSellClick = () => {
    if (user.isLoggedIn) {
      navigate('/sell/product');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className={styles.mainVisual}>
      <div className={styles.center}>
        <div className={styles.content}>
          <div className={styles.badge}>U:REVERSE</div>
          <h1 className={styles.title}>
            옷장 속 잠든 옷,<br />
            이제 <strong className={styles.green}>H.Point</strong>로<br />
            되돌려받으세요!
          </h1>
          <p className={styles.subtitle}>
            사진 한 장이면 충분해요. <br />
            검수도 수거도, <br />
            <strong className={styles.green}>U:REVERSE</strong>에서 해드립니다!
          </p>
          <div className={styles.buttons}>
            <button className={styles.cta} onClick={handleSellClick}>지금 판매하기</button>
            <button className={styles.secondary} onClick={onScrollToSteps}>어떻게 진행되나요?</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainVisualSection;
