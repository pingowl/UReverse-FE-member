import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './Root';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <></>,
    children: [
      { index: true, element: <Home /> }
      // ,{ path: "/mypage", element: <Mypage /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;