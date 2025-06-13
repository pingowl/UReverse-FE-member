import HoverEventButton from '../button/HoverEventButton';
import MiddleModal from '../modal/MiddleModal';
import styles from './PictureNotice.module.css';
import blackFilledIcon from '../../assets/icon-warning-black-fill.png';

export default function PictureNotice({onClose}) {
    return (
        <MiddleModal onClose={onClose}>
            <div className={styles.contentsArea}>
                <div className={styles.container}>
                    <div className={styles.topRow}>
                        <img src={blackFilledIcon} alt='black warning icon' className={styles.centerIcon}/>
                    </div>
                    <div className={styles.title}>
                        <p>사진 등록 전 <br/>아래 내용을 꼭 확인하세요!</p>
                    </div>
                    <div className={styles.description}>
                        <div>▪ 빛번짐, 어두운 환경이 아닌 밝은 곳에서 찍은 제품 사진</div>
                        <div>▪ 제품의 전체가 나온 사진</div>
                        <div>▪ 제품의 앞, 뒤에서 찍은 사진 첨부</div>
                        <div>▪ 최소 2장 이상의 사진 업로드</div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonArea}>
                <HoverEventButton
                    text = "사진 등록하기"
                    width="w-full"
                    height="h-full"
                    color="green"
                    onClick={onClose}
                    />
            </div>
        </MiddleModal>
    )
}