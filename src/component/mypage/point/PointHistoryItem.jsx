import styles from './PointHistoryItem.module.css';

export default function PointHistoryItem({ data }) {
  const { createdAt, brandName, categoryMainName, categorySubName, point } = data;

  return (
    <div className={styles.item}>
      <div className={styles.date}>{createdAt}</div>
      <div className={styles.title}>판매 적립</div>
      <div className={styles.description}>
        판매 상품: ({brandName}) - ({categoryMainName}) {categorySubName}
      </div>
      <div className={styles.point}>+{point.toLocaleString()}P</div>
    </div>
  );
}
