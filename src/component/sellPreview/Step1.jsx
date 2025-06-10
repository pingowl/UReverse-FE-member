import styles from './Step1.module.css';
import checkIcon from '../../assets/icon-check.png'
import jacketFront from '../../assets/example_jacket_front.jpg'
import jacketBack from '../../assets/example_jacket_back.jpg'

export default function Step1() {
    return (
        <div className={styles.container}>
            {/* 아이콘, 페이징 영역 */}
            <div className={styles.topRow}>
                <img src={checkIcon} alt='check icon' className={styles.centerIcon}/>
                <div className={styles.pageIndicator}>1/4</div>
            </div>

            {/* 대제목(콘텐츠) 영역 */}
            <div className={styles.title}>
                <p>정확한 <span className={styles.highlight} >앞, 뒷면</span> 사진이<br/>있어야 등록 가능해요!</p>
            </div>

            {/* 상세설명 영역 */}
            <div className={styles.description}>
                <div>▪ 빛번짐, 어두운 환경이 아닌 밝은 곳에서 찍은 제품 사진</div>
                <div>▪ 제품의 전체가 나온 사진</div>
            </div>

            {/* 상세 예시 사진 */}
            <div className={styles.imageRow}>
                <img src={jacketFront} alt='example front product image' className={styles.exampleImage} />
                <img src={jacketBack} alt='example back product image' className={styles.exampleImage} />
            </div>
        </div>
    )
}