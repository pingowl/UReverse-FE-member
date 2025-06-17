import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './Root';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import NoAlarmLayout from './layout/NoAlarmLayout';
import CommonLayout from './layout/CommonLayout';
import LoginSelect from './pages/auth/LoginSelect';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import ProductInfoForm from './pages/Sell/ProductInfoForm';
import UserAddressForm from './pages/Sell/UserAddressForm';
import { useRecoilState } from 'recoil';
import ProductReceipt from './pages/Sell/ProductReceipt';
import { authState } from './atoms/authState';
import { useEffect } from 'react';
import { setAuthStore } from './api/axiosInstance';
import MyPageHome from './pages/mypage/MyPageHome';
import SellComplete from './pages/Sell/SellComplete';
import EditInfo from './pages/mypage/EditInfo';
import PointHistoryPage from './pages/mypage/PointHistoryPage';
import RecoveryPasswordPage from './pages/auth/RecoveryPasswordPage';
import SalesHistoryPage from './pages/mypage/SalesHistoryPage'
import SalesCompletePage from './pages/mypage/SalesCompletePage'
import NotificationPage from './pages/notification/NotificationPage';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <></>,
    children: [
      { path: "/landing", element: <LandingPage /> },
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "/mypage", element: <MyPageHome /> },
          { path: "/mypage/edit", element: <EditInfo /> },
          { path: "/mypage/points", element: <PointHistoryPage /> },
          { path: "/mypage/sales", element: <SalesHistoryPage /> },
          { path: "/mypage/sales/complete", element: <SalesCompletePage /> },
          { path: "/notifications", element: <NotificationPage /> },
        ] 
      },
      {
        element: <NoAlarmLayout />,
        children: [
          { path: "/login", element: <LoginSelect /> },
          { path: "/login/form", element: <LoginForm /> },
          { path: "/signup", element: <SignupForm /> },
          { path: "/recovery-password", element: <RecoveryPasswordPage /> }
        ]
      },
      {
        path: "/sell",
        element: <CommonLayout />,
        children: [
          { path: "product", element: <ProductInfoForm />},
          { path: "address", element: <UserAddressForm />},
          { path: "receipt", element: <ProductReceipt /> },
          { path: "complete", element: <SellComplete />}
        ]
      },
    ]
  }
])

function App() {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    // Axios 인스턴스가 사용할 인증 상태 관리 함수 등록
    setAuthStore({
      getAccessToken: () => auth.accessToken,
      setAuth: ({ accessToken, role }) => setAuth({ accessToken, role }),
      resetAuth: () => setAuth({ accessToken: null, role: null }),
    });
  }, [auth]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;