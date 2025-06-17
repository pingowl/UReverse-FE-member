import styles from './Home.module.css';
import StatCard from '../component/card/StatCard';
import HoverEventButton from '../component/button/HoverEventButton';
import TrackingCard from '../component/card/TrackingCard'

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../atoms/authState';
import { userState } from '../atoms/userState';

import { fetchPointHistory } from '../api/point';
import { getMyInfo } from '../api/member';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [user, setUser] = useRecoilState(userState);
    const [totalPoint, setTotalPoint] = useState(0);
    const [salesCount, setSalesCount] = useState(0);
    const auth = useRecoilValue(authState);
    const navigate = useNavigate();

   useEffect(() => {
  const shouldRedirect =
    !auth.accessToken && user.isLoggedIn !== true;

  if (shouldRedirect) {
    navigate('/landing');
  }
}, [auth.accessToken, user.isLoggedIn, navigate]);



    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!auth.accessToken) {
                navigate('/login');
                return;
            }

            try {
                const data = await getMyInfo();
                setUser({
                    ...data,
                    isLoggedIn: true,
                    accessToken: auth.accessToken,
                });
            } catch (e) {
                console.error('유저 정보 조회 실패:', e);
                setUser({ isLoggedIn: false });
                navigate('/login');
            }
        };

        fetchUserInfo();
    }, [auth.accessToken, navigate, setUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    totalPoint,
                    salesCount
                } = await fetchPointHistory();

                setTotalPoint(totalPoint);
                setSalesCount(salesCount);
            } catch (e) {
                console.error('데이터 로딩 실패:', e);
            }
        };

        fetchData();
    }, []);

    const formatNumber = (num) => num?.toLocaleString('ko-KR');

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>
                <span className={styles.username}>{user?.name ?? '회원'}</span>님, 안녕하세요 👋
            </h1>

            <TrackingCard statusText="택배사 수거 완료" />

            <div className={styles.cardArea}>
                <StatCard label="누적 포인트" value={`${formatNumber(totalPoint)}P`} onClick={() => navigate('/my-page/points')} />
                <StatCard label="총 판매 수량" value={`${formatNumber(salesCount)}개`} onClick={() => navigate('/my-page/sales')} />
            </div>

            <div className={styles.buttonArea}>
                <HoverEventButton
                    text="판매하고 포인트 받기"
                    link="/sell/product"
                    width="w-full"
                    height="h-12"
                    color="black"
                />
            </div>
        </div>
    );
}
