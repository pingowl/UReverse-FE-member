import { useEffect, useState } from 'react';
import NotificationItem from '../../component/mypage/notification/NotificationItem';
import styles from './NotificationPage.module.css';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>알림</header>
            <div className={styles.list}>
                {notifications.map((noti) => (
                    <NotificationItem key={noti.notificationId} data={noti} />
                ))}
            </div>
        </div>
    );
}
