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
        element: <CommonLayout />,
        children: [
          // { path: "/login", element: <Login />}
          // ,{ path: "/mypage", element: <Mypage /> }
        ]
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;