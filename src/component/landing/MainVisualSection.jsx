import styles from './MainVisualSection.module.css';
// import deliveryBox from '../../assets/landing/delivery box.png';
// import figure2 from '../../assets/landing/figures-1.2.png';
// import figure3 from '../../assets/landing/figures-1.3.png';

const MainVisualSection = ({ onScrollToSteps }) => {
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
            <button className={styles.cta}>지금 판매하기</button>
            <button className={styles.secondary} onClick={onScrollToSteps}>어떻게 진행되나요?</button>
          </div>
        </div>
        <div className={styles.preview}>
          {/* <img src={deliveryBox} alt="deliveryBox" /> */}
          {/* <img src={deliveryBox} alt="deliveryBox" />
          <img src={deliveryBox} alt="deliveryBox" /> */}
        </div>
      </div>
    </section>
  );
};

export default MainVisualSection;
