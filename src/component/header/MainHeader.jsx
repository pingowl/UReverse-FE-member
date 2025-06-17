import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms/userState';
import { authState } from '../../atoms/authState';
import { logout } from '../../api/member'

import notificationIcon from "../../assets/icon-notification-bell.png"
import settingsIcon from "../../assets/icon-settings.png"
import logoutIcon from "../../assets/icon-logout.png"

import styles from "./MainHeader.module.css"

export default function MainHeader() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const setAuth = useSetRecoilState(authState);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('accessToken');
      setUser({ isLoggedIn: false });
      setAuth({ accessToken: null, role: null });
      navigate('/landing');
    } catch (e) {
      console.error('로그아웃 실패:', e);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoText} onClick={() => navigate('/landing')}>
        U:REVERSE
      </div>

      <div className={styles.iconGroup}>
        <button className={styles.iconButton} onClick={() => navigate('/notifications')}>
          <img src={notificationIcon} alt="알림" />
        </button>
        <button className={styles.iconButton} onClick={() => navigate('/mypage/edit')}>
          <img src={settingsIcon} alt="마이페이지" />
        </button>
        <button className={styles.iconButton} onClick={handleLogout}>
          <img src={logoutIcon} alt="로그아웃" />
        </button>
      </div>
    </header>
  );
}