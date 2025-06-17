// src/components/NotificationIcon.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import notificationIconImg from '../../assets/icon-notification-bell.png';
import styles from './NotificationIcon.module.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atoms/authState';
import api from '../../api/axiosInstance';

export default function NotificationIcon() {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);
    const { accessToken } = useRecoilValue(authState);

    useEffect(() => {
        // 초기 한 번만 불러오기
        const fetchUnreadCount = async () => {
            try {
                const res = await api.get('/api/v1/notifications/unread-count');
                setUnreadCount(res.data.response); // { response: 숫자자 }
            } catch (e) {
                console.error('알림 수 조회 실패:', e);
            }
        };
        fetchUnreadCount();
    }, []);

    return (
        <div className={styles.wrapper}>
            <button className={styles.iconButton} onClick={() => navigate('/notifications')}>
                <img src={notificationIconImg} alt="alarm" className={styles.icon} />
                {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount}</span>
                )}
            </button>
        </div>
    );
}
