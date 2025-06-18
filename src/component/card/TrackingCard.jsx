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
    <div className={styles.statusBox}>
      <div className={styles.statusTitle}>현재 판매 / 배송 조회</div>
      <div className={styles.statusGrid}>
        {/* 1행: 숫자 + 화살표 */}
        {statusOrder.map((label, index) => (
          <React.Fragment key={`count-${label}`}>
            <div className={styles.statusCount}>
              {user.productStatus?.[label] ?? 0}
            </div>
            {index < statusOrder.length - 1 && (
              <div className={styles.statusArrow}>&gt;</div>
            )}
          </React.Fragment>
        ))}

        {/* 2행: 텍스트 + 화살표 */}
        {statusOrder.map((label, index) => (
          <React.Fragment key={`label-${label}`}>
            <div className={styles.statusLabel}>{label}</div>
            {index < statusOrder.length - 1 && (
              <div className={styles.statusArrow}>&nbsp;</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}