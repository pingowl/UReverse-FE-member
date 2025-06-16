import { Outlet } from 'react-router-dom';
import styles from './Root.module.css'
import NavigationInitializer from './NavigationInitializer';

export default function Root() {
    
    return (
        <div id="rootWrapper" className={styles.wrapper}>
            <div className={styles.inner}>
                <NavigationInitializer />
                <Outlet />
            </div>
        </div>
    )
}