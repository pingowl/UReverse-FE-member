import HoverEventButton from '../button/HoverEventButton';
import styles from './BrandAndCategorySelect.module.css';

export default function BrandAndCategorySelect({ onBrandClick, onCategoryClick }) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>판매상품 정보 입력</div>

            <div className={styles.block}>
                <div className={styles.label}>브랜드 <span className={styles.emphasis}>*</span> </div>
                <div className={styles.selectBox} onClick={onBrandClick}>브랜드 선택 &gt;</div>
            </div>

            <div className={styles.block}>
                <div className={styles.label}>카테고리 <span className={styles.emphasis}>*</span></div>
                <div className={styles.selectBox} onClick={onCategoryClick}>카테고리 선택 &gt;</div>
            </div>

            <div className={styles.buttonArea}>
                <HoverEventButton
                text="선택 완료"
                link="/login/form"
                width="w-full"
                height="h-12"
                color="black"
                />
            </div>
        </div>
    );
}