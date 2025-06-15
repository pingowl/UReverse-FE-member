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
import { RecoilRoot } from 'recoil';
import ProductReceipt from './pages/Sell/ProductReceipt';
import MyPageHome from './pages/mypage/MyPageHome';
import SellComplete from './pages/Sell/SellComplete';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <></>,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Home />},
          { path: "/mypage", element: <MyPageHome /> }
        ]
      },
      {
        element: <NoAlarmLayout />,
        children: [
          { path: "/login", element: <LoginSelect />},
          { path: "/login/form", element: <LoginForm />}
          ,{ path: "/signup", element: <SignupForm /> }
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
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;