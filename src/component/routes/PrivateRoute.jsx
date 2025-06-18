import { useRecoilValue } from 'recoil';
import { Navigate, useLocation } from 'react-router-dom';
import { authState } from '../../atoms/authState';

export default function PrivateRoute({ children }) {
  const auth = useRecoilValue(authState);
  const location = useLocation();

  // accessToken이 없으면 로그인 페이지로
  if (!auth?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그인된 상태면 children 렌더링
  return children;
}