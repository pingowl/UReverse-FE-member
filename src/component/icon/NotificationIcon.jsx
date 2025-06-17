// src/components/NotificationIcon.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import notificationIconImg from '../../assets/icon-notification-bell.png';
import styles from './NotificationIcon.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import api from '../../api/axiosInstance';
import { userState } from '../../atoms/userState';
import { connectSSE } from '../../util/ConnectSSE';

export default function NotificationIcon() {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);
    const { accessToken, role } = useRecoilValue(authState);
    const setAuth = useSetRecoilState(authState);
    const setUser = useSetRecoilState(userState);

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

        let eventSource;
        let reconnectTimer;
        const setupSSE = async () => {
            try {
                const userId = JSON.parse(atob(accessToken.split('.')[1])).sub;
                eventSource = connectSSE(accessToken, userId, fetchUnreadCount);

                eventSource.onerror = async () => {
                    eventSource.close();

                    try {
                        // accessToken 재발급 시도
                        const res = await api.get('/api/v1/auth/refresh');
                        const { accessToken: newAccessToken, role } = res.data.response;

                        setAuth({ accessToken: newAccessToken, role });

                        reconnectTimer = setTimeout(() => {
                            setupSSE(); // 재연결
                        }, 1000); // 짧은 지연후 연결 재시도
                    } catch (err) {
                        console.error('refreshToken 만료, 로그인 페이지로 이동');
                        setAuth({ accessToken: null, role: null });
                        setUser({ userId: null, name: '', email: '', phone: '', role: '', isLoggedIn: false });
                        navigate('/login');
                    }
                }
            } catch (err) {
                console.error('SSE 설정 중 에러 : ', err);
            }
        }
        fetchUnreadCount();
        setupSSE();

        return () => {
            if (eventSource) eventSource.close();
            if (reconnectTimer) clearTimeout(reconnectTimer);
        }
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
