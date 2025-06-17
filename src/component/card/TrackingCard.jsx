import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';
import styles from './TrackingCard.module.css';

const statusOrder = [
  '상품 등록',
  '1차 검수',
  '2차 검수',
  '배송 요청 등록',
  '배송 중',
  '배송 완료',
];

export default function TrackingStatusCard() {
  const user = useRecoilValue(userState);

  return (
    <div className={styles.card}>
      <div className={styles.title}>현재 판매 / 배송 조회</div>
      <div className={styles.trackingRow}>
        {statusOrder.map((label, index) => (
          <React.Fragment key={label}>
            <div className={styles.trackingGroup}>
              <div className={styles.count}>{user.productStatus?.[label] ?? 0}</div>
              <div className={styles.label}>{label}</div>
            </div>
            {index < statusOrder.length - 1 && (
              <div className={styles.arrow}>&gt;</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}