import styles from './ProductInfo.module.css';
import AddIcon from '../../assets/icon-add.png';
import { useState } from 'react';
import BottomSheetModal from './BottomSheetModal';
import BrandAndCategorySelect from './BrandAndCategorySelect';
import BrandSelect from './BrandSelect';
import CategorySelect from './CategorySelect';

export default function ProductInfo({ brand, setBrand, category, setCategory }){
    const isEmpty = !brand || Object.keys(brand).length === 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('select'); // 'select', 'brand', 'category' 로 모달 컴포넌트 선택됨

    const handleBrandClick = () => setModalContent('brand');
    const handleCategoryClick = () => setModalContent('category');
    const handleOpen = () => {
        setModalContent('select');
        setIsModalOpen(true);
    };
    const handleClose = () => setIsModalOpen(false);

    const renderModalContent = () => {
        switch (modalContent) {
            case 'brand':
                return <BrandSelect onBack={() => setModalContent('select')} setBrand={setBrand} />;
            case 'category':
                return <CategorySelect onBack={() => setModalContent('select')} setCategory={setCategory} />;
            case 'select':
            default:
                return (
                    <BrandAndCategorySelect
                        onBrandClick={handleBrandClick}
                        onCategoryClick={handleCategoryClick}
                    />
                );
        }
    };

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
            {isModalOpen && (
                <BottomSheetModal onClose={handleClose}>
                    {renderModalContent()}
                </BottomSheetModal>
            )}
        </div>
    )
}