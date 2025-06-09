import styles from "./MainHeader.module.css"

export default function MainHeader () {
    return (
        <header className={styles.header}>
            {/* 왼쪽: 프로젝트명 */}
            <h1 className={styles.title}>UReverse</h1>

            {/* 오른쪽: 아이콘 영역 */}
            <div className={styles.iconGroup}>
                <button className={styles.iconButton} aria-label="검색">🔍</button>
                <button className={styles.iconButton} aria-label="설정">⚙️</button>
            </div>
        </header>
    )
}