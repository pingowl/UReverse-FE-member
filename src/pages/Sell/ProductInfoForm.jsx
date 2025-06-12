import { useRef, useState } from "react";
import SellPreviewModal from "../../component/sellPreview/SellPreviewModal";
import BlackWarningIcon from "../../assets/icon-warning-black.png";
import styles from "./ProductInfoForm.module.css";
import HoverEventButton from "../../component/button/HoverEventButton";
import ProductInfo from "../../component/sell/ProductInfo";
import BottomSheetModal from '../../component/sell/BottomSheetModal';
import PictureNotice from '../../component/sell/PictureNotice';

export default function ProductInfoForm(){
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState([]);

    // 사진 등록 안내문용 바닥 모달창 오픈변수
    const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('pictureNotice'); // 'pictureNotice', 'pointNotice' 로 모달 컴포넌트 선택됨
    const modalRef = useRef(null); // 모달창 열고 닫기 애니메이션을 위한 ref
    const handleCloseBottomModal = () => setIsBottomModalOpen(false);

    // 사진 등록 트리거
    const fileInputRef = useRef(null);

    const handleOpenImagePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleOpenPictureBottomModal = () => {
        setModalContent('pictureNotice');
        setIsBottomModalOpen(true);
    }

    // ✅ 모달 외부에서 닫기 trigger 예시
    const forceCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.triggerClose(); // 애니메이션 포함 닫힘
        }
    };

    // 선택 완료 버튼 클릭시 기존 brand, category 반영
    const handleConfirmSelection = () => {
        forceCloseModal(); // 모달 닫기
        handleOpenImagePicker(); // 사진 등록으로 이어짐
    };

    // 모달 내 보여질 컴포넌트 선택
    const renderBottomModalContent = () => {
        switch (modalContent) {
            case 'pictureNotice':
                return <PictureNotice onClose={handleConfirmSelection}/>;
            default:
                return <></>;
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.content}>
                <div className={styles.alertBar} onClick={() => setIsModalOpen(true)}>
                    <img src={BlackWarningIcon} className={styles.alertIcon} alt="인포 아이콘"></img>
                    판매 가능 조건 다시 확인하기
                </div>
                <div className={styles.innerContent}>
                    <div className={styles.processBar}>
                        <div className={styles.doneProcessBar}></div>
                        <div className={styles.noneProcessBar}></div>
                        <div className={styles.noneProcessBar}></div>
                    </div>
                    <div className={styles.stepDescription}>
                        <p>
                            step1<br/>
                            판매할 상품의 정보를<br/>
                            추가해 주세요!
                        </p>
                    </div>

                    <div className={styles.productListArea}>
                        <ProductInfo
                            brand={brand}
                            setBrand={setBrand}
                            category={category}
                            setCategory={setCategory}
                        />
                    </div>

                    <div className={styles.imagePreviewContainer}>
                        {/* map 으로 state에 저장된 이미지 링크 컴포넌트에 전송, 링크는 아래의 사진 등록 버튼 누르면 state 에 저장 */}
                    </div>
                </div>
            </div>

            <div className={styles.fixedButtonWrapper}>
                <div className={styles.buttonGroup}>
                    <HoverEventButton
                        text="+ 사진 추가"
                        width="w-full"
                        height="h-12"
                        color="black"
                        onClick={handleOpenPictureBottomModal}
                    />
                    <HoverEventButton
                        text="25,000p 보상받기"
                        width="w-full"
                        height="h-12"
                        color="green"
                    />
                </div>
            </div>

            {isModalOpen && <SellPreviewModal onClose={() => setIsModalOpen(false)} />}
            {isBottomModalOpen && (
                <BottomSheetModal ref={modalRef} onClose={handleCloseBottomModal}>
                    {renderBottomModalContent()}
                </BottomSheetModal>
            )}

            {/* 파일 업로드 영역 */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    // 파일 업로드 상태 저장 등 처리 로직
                    console.log('업로드할 파일:', files);
                }}
            />
        </div>
    )
}