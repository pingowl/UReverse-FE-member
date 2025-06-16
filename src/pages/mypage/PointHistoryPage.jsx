import { useEffect, useState } from 'react';
import { fetchPointHistory } from '../../api/point';
import PointHistoryList from '../../component/mypage/point/PointHistoryList';
import styles from './PointHistoryPage.module.css';

export default function PointHistoryPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchPointHistory();
        setData(res);
      } catch (err) {
        console.error('포인트 내역 불러오기 실패', err);
      }
    };
    load();
  }, []);

  if (!data) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loader}>불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>포인트 내역</div>

      <div className={styles.totalCard}>
        <div className={styles.label}>총 포인트:</div>
        <div className={styles.total}>{data.totalPoint.toLocaleString()}P</div>
      </div>

      <div className={styles.historyCard}>
        <PointHistoryList histories={data.pointHistory} />
      </div>
    </div>
  );
}