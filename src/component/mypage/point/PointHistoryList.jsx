import PointHistoryItem from './PointHistoryItem';
import styles from './PointHistoryList.module.css';

export default function PointHistoryList({ history = [] }) {
  if (!Array.isArray(history) || history.length === 0) {
    return <div className={styles.empty}>포인트 내역이 없습니다.</div>;
  }

  return (
    <div className={styles.list}>
      {history.map((item, idx) => (
        <div key={item.productId}>
          <PointHistoryItem data={item} />
          {idx !== history.length - 1 && <hr className={styles.divider} />}
        </div>
      ))}
    </div>
  );
}
