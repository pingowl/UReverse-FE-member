import CountUp from 'react-countup';
import styles from './UserTrustSection.module.css';

const UserTrustSection = () => {
  return (
    <section className={styles.trustSection}>
      <p className={styles.trustTitle}>
        많은 고객이 U:REVERSE와 함께하고 있어요
      </p>

      <p className={styles.stat}>
        <span className={styles.statLabel}>누적 거래 수:</span>
        <span className={styles.count}>
          <CountUp end={12345} duration={2} separator="," />
        </span>
      </p>

      <p className={styles.trustDesc}>
        신뢰 기반의 중고 판매를 더 많은 분들이 경험하고 있습니다.
      </p>
    </section>
  );
};

export default UserTrustSection;
