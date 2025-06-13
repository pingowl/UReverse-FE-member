import MiddleModal from '../modal/MiddleModal';
import styles from './SellConfirmNotice.module.css';
import blackFilledIcon from '../../assets/icon-warning-black-fill.png';
import HoverEventButton from '../button/HoverEventButton';

export default function SellConfirmNotice({onClose}){
    return (
        <MiddleModal onClose={onClose}>
            <div className={styles.contentsArea}>
                <div className={styles.container}>
                    <div className={styles.topRow}>
                        <img src={blackFilledIcon} alt='black warning icon' className={styles.centerIcon}/>
                    </div>
                    <div className={styles.title}>
                        <p>아래 내용을 꼭 확인하세요!</p>
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
                    text = "확인했어요"
                    width="w-full"
                    height="h-full"
                    color="green"
                    onClick={onClose}
                    />
            </div>
        </MiddleModal>
    )
}