import HoverEventButton from '../component/button/HoverEventButton';
import styles from './Home.module.css';

export default function Home() {

    return(
        <div className={styles.wrapper}>
            <div className={styles.background}>
            <div className={styles.buttonArea}>
                <HoverEventButton
                    text="판매하고 포인트 받기"
                    link="/sell/product"
                    width="w-full"
                    height="h-12"
                    color="black"
                />
            </div>
            </div>
        </div>
    )
}