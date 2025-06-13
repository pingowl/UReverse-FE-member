import { useRef, useState } from "react";
import SellPreviewModal from "../../component/sellPreview/SellPreviewModal";
import BlackWarningIcon from "../../assets/icon-warning-black.png";
import styles from "./ProductInfoForm.module.css";
import HoverEventButton from "../../component/button/HoverEventButton";
import ProductInfo from "../../component/sell/ProductInfo";
import PictureNotice from '../../component/sellNotice/PictureNotice';

export default function ProductInfoForm(){
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState([]);

    // 사진 등록 안내 모달 오픈변수
    const [isPictureNoticeModalOpen, setIsPictureNoticeModalOpen] = useState(false);

    // 사진 등록 트리거
    const fileInputRef = useRef(null);

    const handleOpenImagePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleConfirmSelection = () => {
        setIsPictureNoticeModalOpen(false); // 모달 닫기
        handleOpenImagePicker();     // 사진 등록으로 이어짐
    };

    const handleOpenPictureNoticeModal = () => {
        setIsPictureNoticeModalOpen(true);
    }

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
                        onClick={handleOpenPictureNoticeModal}
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
            {isPictureNoticeModalOpen && (<PictureNotice onClose={handleConfirmSelection} />)}

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