import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './Root';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import NoAlarmLayout from './layout/NoAlarmLayout';
import CommonLayout from './layout/CommonLayout';
import LoginSelect from './pages/Login/LoginSelect';
import LoginForm from './pages/Login/LoginForm';
import SignupForm from './pages/Login/SignupForm';
import ProductInfoForm from './pages/Sell/ProductInfoForm';
import UserAddressForm from './pages/Sell/UserAddressForm';
import { RecoilRoot } from 'recoil';
import ProductReceipt from './pages/Sell/ProductReceipt';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <></>,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Home />}
          // ,{ path: "/mypage", element: <Mypage /> }
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
          { path: "receipt", element: <ProductReceipt />}
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