export const connectSSE = (accessToken, userId, onMessage) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/v1/notifications/subscribe/${userId}?token=${accessToken}`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener('connect', () => {
        console.log('✅ SSE 연결됨');
    });

    eventSource.addEventListener('notification', onMessage);

    eventSource.onerror = (e) => {
        console.warn('❌ SSE 오류, 연결 종료됨', e);
        eventSource.close();
    };

    return eventSource;
};
