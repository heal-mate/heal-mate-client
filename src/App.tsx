import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Received from "./pages/Received";
import Mypage from "./pages/Mypage";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import UserInfoSetup from "./pages/UserInfoSetup";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { LoadingSpinnerAtom } from "./recoils/loadingSpinnerAtom";
import { useRecoilValue } from "recoil";
import LoadingSpinnerPotal from "./potals/LoadingSpinnerPotal";
import Sent from "./pages/Sent";

// eslint-disable-next-line react-refresh/only-export-components
export const path = {
  root: "/",
  tab1: "/recieved",
  tab2: "/sent",
  tab3: "/mypage",
  login: "/login",
  register: "/register",
  setup: "/setup",
};

const router = createBrowserRouter([
  {
    path: path.root,
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: path.root,
            element: <Main />,
          },
          {
            path: path.tab1,
            element: <Received />,
          },
          {
            path: path.tab2,
            element: <Sent />,
          },
          {
            path: path.tab3,
            element: <Mypage />,
          },
        ],
      },
    ],
  },
  {
    path: path.login,
    element: <Login />,
  },
  {
    path: path.register,
    element: <Register />,
  },
  {
    path: path.setup,
    element: <UserInfoSetup />,
  },
]);

export default function App() {
  const loadingSpinner = useRecoilValue(LoadingSpinnerAtom);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      {loadingSpinner && <LoadingSpinnerPotal />}
    </>
  );
}
