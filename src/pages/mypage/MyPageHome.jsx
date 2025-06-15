import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';
import { useNavigate } from 'react-router-dom';
import styles from './MyPageHome.module.css';

export default function MyPageHome() {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    const statusOrder = [
        '상품 등록',
        '1차 검수',
        '2차 검수',
        '배송 요청 등록',
        '배송 중',
        '배송 완료',
    ];

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/login/form');
        }
    }, [user, navigate]);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.greeting}>
                {user.name ? `${user.name}님, 안녕하세요 👋` : '마이페이지'}
            </h2>

            <div className={styles.statusBox}>
                <div className={styles.statusTitle}>현재 판매/배송 조회</div>
                <div className={styles.statusRow}>
                    {statusOrder.map((label, index) => (
                        <React.Fragment key={label}>
                            <div className={styles.statusItem}>
                                <span className={styles.statusCount}>{user.productStatus?.[label] ?? 0}</span>
                                <span className={styles.statusLabel}>{label}</span>
                            </div>
                            {index !== statusOrder.length - 1 && (
                                <span className={styles.statusArrow}>&gt;</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className={styles.sellButtonArea}>
                <button className={styles.sellButton} onClick={() => navigate('/sell/product')}>
                    판매 신청하러 가기
                </button>
            </div>

            <div className={styles.menuSection}>
                <button className={styles.menuButton} onClick={() => navigate('/mypage/points')}>
                    포인트 내역
                </button>
                <button className={styles.menuButton} onClick={() => navigate('/mypage/sales')}>
                    판매 내역
                </button>
                <button className={styles.menuButton} onClick={() => navigate('/mypage/complete')}>
                    판매 완료 내역
                </button>
            </div>

        </div>
    );
}
