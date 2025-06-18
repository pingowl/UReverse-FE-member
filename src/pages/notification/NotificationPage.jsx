import { useEffect, useState } from 'react';
import NotificationItem from '../../component/mypage/notification/NotificationItem';
import styles from './NotificationPage.module.css';
import { getNotifications, updateNotifications } from '../../api/member';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [unRead, setUnRead] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getNotifications();
            setNotifications(data);

            // 안읽었던 알림 조회
            const unread = data.filter(n => n.isRead === 'N');
            setUnRead(unread);
        })();
    }, [])

    // 알림 읽음처리
    useEffect(() => {
        (async () => {
            if (unRead.length > 0) {
                const ids = unRead.map(n => n.notificationId);
                await updateNotifications(ids);
                setUnRead([]);
            }
        })();    
    }, [unRead]);

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
