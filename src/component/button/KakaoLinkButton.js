import styles from './KakaoLinkButton.module.css';
import KakaoIcon from '../../assets/kakao.svg';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';

function KakaoLinkButton() {
  const auth = useRecoilValue(authState);

  const handleKakaoLink = () => {
    const accessToken = auth.accessToken;
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    const stateObject = {
      jwt: accessToken,
      redirectUri: window.location.origin + '/kakao/callback', // 프론트 리다이렉트 페이지
    };

    const encodedState = btoa(JSON.stringify(stateObject));

    const kakaoAuthUrl = `http://localhost:8080/api/v1/oauth/kakao?state=${encodedState}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <button onClick={handleKakaoLink} className={styles.kakaoButton}>
      <img src={KakaoIcon} alt="Kakao" className={styles.kakaoIcon} />
      <span className={styles.kakaoLabel}>카카오 계정 연동</span>
    </button>
  );
}

export default KakaoLinkButton;
