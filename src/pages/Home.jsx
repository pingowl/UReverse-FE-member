import BlackButton from '../component/button/BlackButton';
import styles from './Home.module.css';

export default function Home() {

    return(
        <div className={styles.wrapper}>
            <div className={styles.background}>
            <div className={styles.buttonArea}>
                <BlackButton
                    text="판매하고 포인트 받기"
                    link="/sell"
                    width="w-full"
                    height="h-12"
                />
            </div>
            </div>
        </div>
    )
}