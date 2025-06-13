import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step0 from './Step0';
import styles from "./SellPreviewModal.module.css";
import HoverEventButton from '../button/HoverEventButton';
import MiddleModal from '../modal/MiddleModal';

export default function SellPreviewModal({ onClose }) {
    const [step, setStep] = useState(0);

    const goNext = () => setStep((prev) => Math.min(prev + 1, 4));
    const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

    const buttonText = step === 0
        ? '확인하기'
        : step < 4
            ? '다음'
            : '판매 시작하기';
    
    const handleButtonClick = () => {
        if (step === 4) onClose(); 
        else goNext();
    };

    const renderStepComponent = () => {
        switch (step) {
            case 0: return <Step0 />;
            case 1: return <Step1 />;
            case 2: return <Step2 />;
            case 3: return <Step3 />;
            case 4: return <Step4 />;
            default: return null;
        }
    };

    return (
        <MiddleModal onClose={onClose}>
            <div className={styles.contentsArea}>
                {renderStepComponent()}
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
        </MiddleModal>
    );
}
