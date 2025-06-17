import MiddleModal from '../modal/MiddleModal';
import styles from './SellConfirmNotice.module.css';
import blackFilledIcon from '../../assets/icon-warning-black-fill.png';
import HoverEventButton from '../button/HoverEventButton';

export default function SellCompleteModal({ onClose, onConfirm }) {

    return (
        <MiddleModal onClose={onClose}>
            <div className={styles.contentsArea}>
                <div className={styles.container}>
                    <div className={styles.topRow}>
                        <img src={blackFilledIcon} alt='black warning icon' className={styles.centerIcon}/>
                    </div>
                    <div className={styles.title}>
                        <p>판매 전 아래 내용을<br/> 꼭 확인하세요!</p>
                    </div>
                    <div className={styles.description}>
                        <div>▪ 신청하신 상품이 실제 상품 정보와 다를 경우, H.Point</div>
                        <div>&nbsp;&nbsp;  금액이 변경될 수 있어요.</div>
                        <div>▪ 보상 H.Point 가 50만 포인트를 초과할 경우, 2번에 나</div>
                        <div>&nbsp;&nbsp; 눠 지급될 수 있어요.</div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonArea}>
                <HoverEventButton
                    text = "다시 확인하기"
                    width="w-full"
                    height="h-full"
                    color="white"
                    onClick={onClose}
                />
                <HoverEventButton
                    text = "판매하기"
                    width="w-full"
                    height="h-full"
                    color="black"
                    onClick={onConfirm}
                />
            </div>
        </MiddleModal>
    )
}