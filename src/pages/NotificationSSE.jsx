import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/authState';

export default function NotificationSSE({ userId }) {
    const { accessToken } = useRecoilValue(authState);
    useEffect(() => {
        console.log("하이", accessToken);
        if (!accessToken) {
            console.warn("❗ accessToken이 없습니다. SSE 연결 생략");
            return;
        }

        const eventSource = new EventSource(
            `http://localhost:8080/api/v1/notifications/subscribe/${userId}?token=${accessToken}`
        );

        eventSource.addEventListener("connect", (event) => {
            console.log("✅ SSE 연결 성공:", event.data);
        });

        eventSource.addEventListener("notification", (event) => {
            const data = JSON.parse(event.data);
            alert(`📩 ${data.title}: ${data.message}`);
        });

        eventSource.onerror = (e) => {
            console.error("❌ SSE 오류:", e);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [userId, accessToken]);

    return null;
}
