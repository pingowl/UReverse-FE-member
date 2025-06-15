import styles from "./MainHeader.module.css"
import UREVERSE from "../../assets/UREVERSE.png" 
import notificationIcon from "../../assets/icon-notification-bell.png"
import userIcon from "../../assets/icon-user.png"
import { useNavigate } from 'react-router-dom';

export default function MainHeader () {
    const navigate = useNavigate();
    
    return (
        <header className={styles.header}>
            {/* 왼쪽: 프로젝트명 */}
            <img src={UREVERSE} alt="hpoint" className={styles.image} />

            {/* 오른쪽: 아이콘 영역 */}
            <div className={styles.iconGroup}>
                <button className={styles.iconButton} aria-label="알림">
                    <img src={notificationIcon} alt="alarm" className={styles.icon} />
                </button>
                <button className={styles.iconButton} aria-label="마이페이지" onClick={() => navigate('/mypage')}>
                    <img src={userIcon} alt="myPage" className={styles.icon} />
                </button>
            </div>
        </header>
    )
}