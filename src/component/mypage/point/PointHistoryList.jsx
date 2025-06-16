import PointHistoryItem from './PointHistoryItem';
import styles from './PointHistoryList.module.css';

export default function PointHistoryList({ histories = [] }) {
  if (!Array.isArray(histories) || histories.length === 0) {
    return <div className={styles.empty}>포인트 내역이 없습니다.</div>;
  }

  return (
    <div className={styles.list}>
      {histories.map((item, idx) => (
        <div key={item.productId}>
          <PointHistoryItem data={item} />
          {idx !== histories.length - 1 && <hr className={styles.divider} />}
        </div>
      ))}
    </div>
  );
}
