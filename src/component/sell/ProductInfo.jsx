import styles from './ProductInfo.module.css';
import AddIcon from '../../assets/icon-add.png';
import { useState } from 'react';
import BottomSheetModal from './BottomSheetModal';

export default function ProductInfo({ product, setProduct }){
    const isEmpty = !product || Object.keys(product).length === 0;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div className={styles.container}>
            {isEmpty ? (
                <div className={styles.emptyBox} onClick={() => setIsModalOpen(true)}>
                    <img src={AddIcon} alt="상품 없음" className={styles.addIcon} />
                </div>
            ) : (
                <div>
                {/* product 내용이 있을 때의 UI */}
                </div>
            )}
        {isModalOpen && <BottomSheetModal onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}