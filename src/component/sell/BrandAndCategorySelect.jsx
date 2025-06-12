import { useState } from 'react';
import HoverEventButton from '../button/HoverEventButton';
import styles from './BrandAndCategorySelect.module.css';

export default function BrandAndCategorySelect({brand, category, onBrandClick, onCategoryClick, onClose }) {
    const [highlight, setHighlight] = useState(false);
    const handleCategoryClick = () => {
        console.log("눌린다");
        if (!brand) {
            console.log("브랜드 없다");
            setHighlight(true);
            setTimeout(() => setHighlight(false), 1000); // 0.2초 후 원상복귀
            return;
        }
        onCategoryClick();
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>판매상품 정보 입력</div>

            <div className={styles.block}>
                <div className={styles.label}>
                    브랜드 <span className={styles.emphasis}>*</span> 
                </div>
                <div 
                className={`${styles.selectBox} ${styles.brandBox}  ${highlight ? styles.highlight : ''}`} 
                onClick={onBrandClick}>
                    {brand && brand.name ? brand.name : `브랜드 선택 >` } 
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.label}>
                    카테고리 <span className={styles.emphasis}>*</span>
                </div>
                <div 
                className={`${styles.selectBox} ${!brand ? styles.disabled : ''}`} 
                onClick={() => handleCategoryClick()}>
                    {category && category.name ? category.name : '카테고리 선택 >'}
                </div>
            </div>

            <div className={styles.buttonArea}>
                <HoverEventButton
                text="선택 완료"
                width="w-full"
                height="h-12"
                color="black"
                onClick={onClose}
                />
            </div>
        </div>
    );
}