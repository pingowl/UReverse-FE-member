import { useState } from "react";
import SellPreviewModal from "../../component/sellPreview/SellPreviewModal";
import BlackWarningIcon from "../../assets/icon-warning-black.png";
import styles from "./ProductInfoForm.module.css";
import HoverEventButton from "../../component/button/HoverEventButton";
import ProductInfo from "../../component/sell/ProductInfo";

export default function ProductInfoForm(){
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [product, setProduct] = useState([]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.content}>
                <div className={styles.alertBar} onClick={() => setIsModalOpen(true)}>
                    <img src={BlackWarningIcon} className={styles.alertIcon} alt="인포 아이콘"></img>
                    판매 가능 조건 다시 확인하기
                </div>
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
                        product={product}
                        setProduct={setProduct}
                    />
                </div>

                <div className={styles.imagePreviewContainer}>
                    {/* map 으로 state에 저장된 이미지 링크크 컴포넌트에 전송, 링크는 아래의 사진 등록 버튼 누르면 state 에 저장 */}
                </div>
            </div>

            <div className={styles.fixedButtonWrapper}>
                <div className={styles.buttonGroup}>
                    <HoverEventButton
                        text="+사진 추가"
                        width="w-full"
                        height="h-12"
                        color="black"
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
        </div>
    )
}