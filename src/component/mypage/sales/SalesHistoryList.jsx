import SalesHistoryItem from './SalesHistoryItem';
import styles from './SalesHistoryList.module.css';

export default function SalesHistoryList({ salesList = [] }) {
    if (!Array.isArray(salesList) || salesList.length === 0) {
        return <div className={styles.empty}>판매 내역이 없습니다.</div>;
    }

    return (
        <div className={styles.list}>
            {salesList.map((item, idx) => (
                <div key={item.productId}>
                    <SalesHistoryItem item={item} />
                    {idx !== salesList.length - 1 && <hr className={styles.divider} />}
                </div>
            ))}
        </div>
    );
}
