import NotificationSSE from "./NotificationSSE";

export default function NotificationTestPage() {
    const userId = 15; // ⚠️ 테스트할 사용자 ID

    return (
        <div>
            <h1>🔔 알림 SSE 테스트</h1>
            <NotificationSSE userId={userId} />
        </div>
    );
}
