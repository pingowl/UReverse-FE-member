import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step0 from './Step0';
import styles from "./SellPreviewModal.module.css";
import HoverEventButton from '../button/HoverEventButton';

export default function SellPreviewModal({ onClose }) {
    // TODO:
    // 1. 모달 바깥 클릭 시 모달 닫기
    // 2. 모달 페이지 끝 도달 시 닫기 버튼 클릭되기

    const [step, setStep] = useState(0);

    const goNext = () => setStep((prev) => Math.min(prev + 1, 4));
    const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

    const buttonText = step === 0
        ? '확인하기'
        : step < 4
            ? '다음'
            : '판매 시작하기';
    
    const handleButtonClick = () => {
    if (step === 4) {
        onClose();
    } else {
        goNext();
    }
};

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.contentsArea}>
                    {step === 0 && <Step0 />}
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                </div>

                <div className={styles.buttonArea}>
                    {/* <button onClick={goBack}>뒤로</button> */}
                    {step<4 && step>0 ? <HoverEventButton
                        text = "뒤로"
                        width="w-full"
                        height="h-full"
                        color="white"
                        onClick={goBack}
                        /> : <></>}
                    <HoverEventButton
                        text = {buttonText}
                        width="w-full"
                        height="h-full"
                        color="green"
                        onClick={handleButtonClick}
                        />
                </div>
            </div>
        </div>
    );
}
