import styles from './ProductInfo.module.css';
import AddIcon from '../../assets/icon-add.png';
import { useEffect, useRef, useState } from 'react';
import BottomSheetModal from './BottomSheetModal';
import BrandAndCategorySelect from './BrandAndCategorySelect';
import BrandSelect from './BrandSelect';
import CategorySelect from './CategorySelect';

import brandData from "../../dummy/brand.json";

export default function ProductInfo({ brand, setBrand, category, setCategory }){
    const isEmpty = !brand || Object.keys(brand).length === 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('select'); // 'select', 'brand', 'category' 로 모달 컴포넌트 선택됨
    const [brandList, setBrandList] = useState([]);
    const modalRef = useRef(null);

    const handleBrandClick = () => setModalContent('brand');
    const handleCategoryClick = () => setModalContent('category');
    const handleOpen = () => {
        setModalContent('select');
        setIsModalOpen(true);
    };
    const handleClose = () => setIsModalOpen(false);

    // ✅ 모달 외부에서 닫기 trigger 예시
    const forceCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.triggerClose(); // 애니메이션 포함 닫힘
        }
    };

    // 모달 내 보여질 컴포넌트 선택택
    const renderModalContent = () => {
        switch (modalContent) {
            case 'brand':
                return <BrandSelect onBack={() => setModalContent('select')} setBrand={setBrand} brandList={brandList} />;
            case 'category':
                return <CategorySelect onBack={() => setModalContent('select')} setCategory={setCategory} />;
            case 'select':
            default:
                return (
                    <BrandAndCategorySelect
                        brand={brand}
                        category={category}
                        onBrandClick={handleBrandClick}
                        onCategoryClick={handleCategoryClick}
                        onClose={forceCloseModal}
                    />
                );
        }
    };

    // 브랜드 목록 가져오는 api 통신
    useEffect(() => {
        setBrandList([
            Array.from({ length: 25 }, (_, i) => {
                const base = brandData[i % brandData.length];
                return {
                    ...base,
                    brand_id: i + 1
                };
            })
        ])
    }, [])

    return(
        <div className={styles.container}>
            {isEmpty ? (
                <div className={styles.emptyBox} onClick={handleOpen}>
                    <img src={AddIcon} alt="상품 없음" className={styles.addIcon} />
                </div>
            ) : (
                <div>
                {/* product 내용이 있을 때의 UI */}
                </div>
            )}
            {isModalOpen && (
                <BottomSheetModal ref={modalRef} onClose={handleClose}>
                    {renderModalContent()}
                </BottomSheetModal>
            )}
        </div>
    )
}