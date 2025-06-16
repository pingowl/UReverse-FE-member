import React from 'react';
import styles from './SalesHistoryItem.module.css';
import StatusBadge from './StatusBadge';

export default function SalesHistoryItem({ item }) {
    const {
        createdAt,
        brandName,
        categoryMainName,
        categorySubName,
        point,
        status,
    } = item;

    return (
        <div className={styles.item}>
            <div className={styles.date}>{createdAt.split(' ')[0]}</div>
            <div className={styles.title}>판매 상품</div>
            <div className={styles.description}>
                ({brandName}) - ({categoryMainName}) {categorySubName}
            </div>
            <div className={styles.footer}>
                <div className={styles.point}>+{point.toLocaleString()}P</div>
                <StatusBadge status={status} />
            </div>
        </div>
    );
}
