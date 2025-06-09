import { Outlet } from 'react-router-dom';
import styles from './Root.module.css'

export default function Root() {
    
    return (
        <div id="rootWrapper" className={styles.wrapper}>
            <div className={styles.inner}>
                <Outlet />
            </div>
        </div>
    )
}