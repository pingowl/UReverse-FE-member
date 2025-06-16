import React from 'react';
import styles from './StatusBadge.module.css';

const statusMap = {
    NONE: { label: '상품등록 진행중', color: 'gray' },
    REGISTER: { label: '상품등록', color: '#B6F0E6' }, // 민트 (톤업)
    FIRST_INSPECT: { label: '1차 검수완료', color: '#A0D8EF' }, // 선명한 연하늘
    SECOND_INSPECT: { label: '2차 검수완료', color: '#90C2E7' }, // 파스텔 블루
    DELIVERY_REQUEST: { label: '배송요청등록', color: '#BBAEE2' }, // 연보라
    DELIVERING: { label: '배송중', color: '#D28FC6' }, // 진한 보라핑크
    FINISH: { label: '판매완료', color: '#C475A3' }, // 핑크+보라
    CANCEL: { label: '취소됨', color: 'gray' },
    REJECT: { label: '판매 거절됨', color: 'red' },
};

export default function StatusBadge({ status }) {
    const badge = statusMap[status] || { label: '알 수 없음', color: 'black' };

    return (
        <span className={styles.badge} style={{ backgroundColor: badge.color }}>
            {badge.label}
        </span>
    );
}
