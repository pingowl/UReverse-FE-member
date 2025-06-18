import styles from './NotificationItem.module.css';

export default function NotificationItem({ data }) {

    return (
        <div className={styles.card}>
            <div className={`${styles.title} ${data.isRead === "N" ? styles.unread : ''}`}>
                {data.title}
            </div>
            <div className={styles.message}>{data.message}</div>
        </div>
    );
}
