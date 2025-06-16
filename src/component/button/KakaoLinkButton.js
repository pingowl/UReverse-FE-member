import styles from './KakaoLinkButton.module.css';
import KakaoIcon from '../../assets/kakao.svg';

function KakaoLinkButton() {
  const handleKakaoLink = () => {
    window.location.href = 'https://localhost:8080/api/v1/oauth/kakao';
  };

  return (
    <button onClick={handleKakaoLink} className={styles.kakaoButton}>
      <img src={KakaoIcon} alt="Kakao" className={styles.kakaoIcon} />
      <span className={styles.kakaoLabel}>카카오 계정 연동</span>
    </button>
  );
}

export default KakaoLinkButton;
