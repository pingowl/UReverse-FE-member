import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CommonHeader.module.css";
import notificationIcon from "../../assets/icon-notification-bell.png"
import userIcon from "../../assets/icon-user.png"

export default function NoAlarmHeader () {
    const location = useLocation();
    const navigate = useNavigate();
    // 경로에 따른 페이지 이름 매핑
    const titleMap = {
        '/mypage': '마이페이지',
        '/sell': '판매하기'
    };

    // location.pathname이 포함된 key를 찾는 로직
    const matchedKey = Object.keys(titleMap).find(key =>
        location.pathname.includes(key)
    );

    const title = titleMap[matchedKey] || '페이지';

    return (
        <header className={styles.header}>
            {/* 왼쪽: 뒤로가기 버튼 */}
            {location.pathname === '/sell/complete' ? <div></div> : (
            <button
                onClick={() => navigate(-1)}
                className={styles.backButton}
                aria-label="뒤로가기"
            >
                &lt;
            </button>)}

            {/* 가운데: 페이지 제목 */}
            <h1 className={styles.title}>{title}</h1>

            {/* 오른쪽: 아이콘 영역 */}
            <div className={styles.iconGroup}>
                <button className={styles.iconButton} aria-label="알림" onClick={() => navigate('/notifications')}>
                    <img src={notificationIcon} alt="alarm" className={styles.image} />
                </button>
                <button className={styles.iconButton} aria-label="마이페이지" onClick={() => navigate('/mypage')}>
                    <img src={userIcon} alt="myPage" className={styles.image} />
                </button>
            </div>
        </header>
    )
}