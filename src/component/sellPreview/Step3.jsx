import styles from './Step3.module.css'
import warningIcon from '../../assets/icon-warning.png'
import conditionDialogStep3 from '../../assets/ConditionDialogStep3.png'

export default function Step3() {
    return(
        <div className={styles.container}>
            {/* 아이콘, 페이징 영역 */}
            <div className={styles.topRow}>
                <img src={warningIcon} alt='check icon' className={styles.centerIcon}/>
                <div className={styles.pageIndicator}>3/4</div>
            </div>

            {/* 대제목(콘텐츠) 영역 */}
            <div className={styles.title}>
                <p><span className={styles.highlight} >구성품이 완전하지 않은 제품</span>은<br/>판매가 불가능합니다.</p>
            </div>

            {/* 상세 예시 사진 */}
            <div className={styles.imageRow}>
                <img src={conditionDialogStep3} alt='example image' className={styles.exampleImage} />
            </div>
        </div>
    )
}