import { useRecoilValue } from 'recoil';
import { Navigate, useLocation } from 'react-router-dom';
import { authState } from '../../atoms/authState';

export default function PublicRoute({ children }) {
  const auth = useRecoilValue(authState);
  const location = useLocation();

  // accessToken이 있으면 로그인된 상태 → 접근 막고 홈으로 이동
  if (auth?.accessToken) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  // 비로그인 상태면 children 렌더링
  return children;
}
