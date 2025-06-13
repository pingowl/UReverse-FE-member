import { useNavigate } from 'react-router-dom';
import styles from './ProductReceipt.module.css';
import { useRecoilState } from 'recoil';
import { sellFormState } from '../../atoms/sellFormState';

export default function ProductReceipt(){
    const navigate = useNavigate();
    const [formData, setFormData] = useRecoilState(sellFormState);


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.content}>
                <div className={styles.innerContent}>

                    <div className={styles.processBar}>
                        <div className={styles.doneProcessBar}></div>
                        <div className={styles.doneProcessBar}></div>
                        <div className={styles.noneProcessBar}></div>
                    </div>

                    <div className={styles.stepDescription}>
                        <p>
                            마지막 단계<br/>
                            입력한 정보를 최종 확인 후,<br/>
                            판매 신청해 주세요!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}