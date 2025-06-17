import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../atoms/authState';
import { userState } from '../../atoms/userState';
import { useNavigate } from 'react-router-dom';
import styles from './MyPageHome.module.css';
import { getMyInfo } from '../../api/member';
import KakaoLinkButton from '../../component/button/KakaoLinkButton';

export default function MyPageHome() {
  const auth = useRecoilValue(authState);
  const setUser = useSetRecoilState(userState);
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
    const fetchUserInfo = async () => {
      if (!auth.accessToken) {
        navigate('/login/form');
        return;
      }

      try {
        const data = await getMyInfo();
        setUser({
          ...data,
          accessToken: auth.accessToken,
          isLoggedIn: true,
        });
      } catch (e) {
        console.error('유저 정보 조회 실패:', e);
        setUser({ isLoggedIn: false });
        navigate('/login/form');
      }
    };

    fetchUserInfo();
  }, [auth.accessToken, navigate, setUser]);

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
                <span className={styles.statusCount}>
                  {user.productStatus?.[label] ?? 0}
                </span>
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
        <button
          className={styles.sellButton}
          onClick={() => navigate('/sell/product')}
        >
          판매 신청하러 가기
        </button>
      </div>

      {/*  카카오 연동 버튼 영역 */}
      <div className={styles.kakaoLinkArea}>
        {user.kakaoLinked ? (
          <button className={styles.kakaoLinkedButton} disabled>
            <span className={styles.kakaoLabel}>카카오 계정 연동 완료</span>
          </button>
        ) : (
          <KakaoLinkButton />
        )}
      </div>

      <div className={styles.menuSection}>
        <button
          className={styles.menuButton}
          onClick={() => navigate('/mypage/points')}
        >
          포인트 내역
        </button>
        <button
          className={styles.menuButton}
          onClick={() => navigate('/mypage/sales')}
        >
          판매 내역
        </button>
        <button
          className={styles.menuButton}
          onClick={() => navigate('/mypage/sales/complete')}
        >
          판매 완료 내역
        </button>
        <button
          className={styles.menuButton}
          onClick={() => navigate('/mypage/edit')}
        >
          내 정보
        </button>
      </div>
    </div>
  );
}
