import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NoAlarmHeader.module.css";

export default function NoAlarmHeader () {
    const location = useLocation();
    const navigate = useNavigate();
    // 경로에 따른 페이지 이름 매핑
    const titleMap = {
        '/login': '로그인',
        '/signup': '회원가입',
        '/recovery-password': '비밀번호 재발급'
    };

    // location.pathname이 포함된 key를 찾는 로직
    const matchedKey = Object.keys(titleMap).find(key =>
        location.pathname.includes(key)
    );

    const title = titleMap[matchedKey] || '페이지';

    return (
        <header className={styles.header}>
           {/* 왼쪽: 뒤로가기 버튼 */}
            <button
                onClick={() => navigate(-1)}
                className={styles.backButton}
                aria-label="뒤로가기"
            >
                &lt;
            </button>

            {/* 가운데: 페이지 제목 */}
            <h1 className={styles.title}>{title}</h1>

            {/* 오른쪽: 공간 유지를 위해 빈 div */}
            <div className={styles.spacer}></div> {/* 아이콘 공간 대체용 */}
        </header>
    )
}