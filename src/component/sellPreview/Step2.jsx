import styles from './Step2.module.css'
import conditionDialogStep2 from '../../assets/ConditionDialogStep2.png'
import warningIcon from '../../assets/icon-warning.png'


export default function Step2() {
    return(
        <div className={styles.container}>
            {/* 아이콘, 페이징 영역 */}
            <div className={styles.topRow}>
                <img src={warningIcon} alt='check icon' className={styles.centerIcon}/>
                <div className={styles.pageIndicator}>2/4</div>
            </div>

            {/* 대제목(콘텐츠) 영역 */}
            <div className={styles.title}>
                <p><span className={styles.highlight} >사용감이 심하거나 훼손된 제품</span>은<br/>판매가 불가능합니다.</p>
            </div>

            {/* 상세 예시 사진 */}
            <div className={styles.imageRow}>
                <img src={conditionDialogStep2} alt='example image' className={styles.exampleImage} />
            </div>
        </div>
    )
}