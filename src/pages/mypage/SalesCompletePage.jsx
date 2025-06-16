import React, { useEffect, useState } from 'react';
import { fetchSalesHistory } from '../../api/sales';
import SalesHistoryList from '../../component/mypage/sales/SalesHistoryList';
import styles from './SalesHistoryPage.module.css';

export default function SalesCompletePage() {
    const [completeList, setCompleteList] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const { salesHistory } = await fetchSalesHistory();
                const filtered = salesHistory.filter(item => item.status === 'FINISH');
                setCompleteList(filtered);
            } catch (e) {
                console.error('판매완료 데이터 불러오기 실패', e);
            }
        };
        load();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>판매 완료 내역</h2>
            <SalesHistoryList salesList={completeList} />
        </div>
    );
}
