import { fetchPointHistory } from './point';
import { fetchSalesHistory } from './sales';

/**
 * 누적 포인트와 FINISH 상태 판매 수 계산
 */
export const fetchHomeStats = async () => {
    try {
        const pointRes = await fetchPointHistory();
        const totalPoints = pointRes.totalPoint ?? 0;

        const salesRes = await fetchSalesHistory();
        const finishSales = (salesRes.histories || []).filter(
            (item) => item.status === 'FINISH'
        );
        const salesCount = finishSales.length;

        return {
            totalPoints,
            salesCount,
        };
    } catch (error) {
        console.error('홈 통계 API 호출 실패', error);
        return {
            totalPoints: 0,
            salesCount: 0,
        };
    }
};
