import styles from './Step0.module.css'
import ConditionDialogStep0 from '../../assets/ConditionDialogStep0.png'
import icon_warning from '../../assets/icon-warning.png'

export default function Step0() {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img src={ConditionDialogStep0} alt="exampleImage" className={styles.image} />
            </div>

            {/* 콘텐츠 영역 */}
            <div className={styles.contentText}>
                <p>판매 가능한 옷인지<br/> 조건을 꼭 확인해 주세요!</p>
            </div>

            {/* 안내문구 영역 */}
            <div className={styles.warningText}>
                <p><img src={icon_warning} alt="warningIcom" className={styles.icon} /> 조건에 맞지 않는 상품은 반송됩니다.</p>
            </div>

        </div>
    )
}