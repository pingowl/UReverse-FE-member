import { useEffect, useState, useRef } from 'react';
import { fetchSalesHistory } from '../../api/sales';
import SalesHistoryList from '../../component/mypage/sales/SalesHistoryList';
import styles from './SalesHistoryPage.module.css';

const SalesHistoryPage = () => {
    const [salesList, setSalesList] = useState([]);
    const [cursor, setCursor] = useState({ lastCreatedAt: null, lastProductId: null });
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const loadMoreSales = async () => {
        if (loading) {
            return;
        }
        setLoading(true);

        try {
            const { salesHistory, lastCreatedAt, lastProductId } = await fetchSalesHistory(cursor);
            setSalesList((prev) => {
                const productIds = new Set(prev.map((item) => item.productId));
                const newItems = salesHistory.filter((item) => !productIds.has(item.productId));
                return [...prev, ...newItems];
            });
            setCursor({ lastCreatedAt, lastProductId });
        } catch (err) {
            console.error('판매 내역 조회 실패:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreSales();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadMoreSales();
            },
            { threshold: 1.0 }
        );
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [salesList]);

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h2 className={styles.title}>판매 내역</h2>
                {salesList.length === 0 && !loading ? (
                    <p className={styles.empty}>판매 내역이 없습니다.</p>
                ) : (
                    <>
                        <SalesHistoryList salesList={salesList} />
                        <div ref={observerRef} className={styles.observer}></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SalesHistoryPage;