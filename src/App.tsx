import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Received from "./pages/Received";
import Mypage from "./pages/Mypage";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import UserInfoSetup from "./pages/UserInfoSetup";
import MatchFilter from "./components/MatchFilter";
import Register from "./pages/Register";
// import { FilterStatus } from "./components/MatchFilter.type";

// eslint-disable-next-line react-refresh/only-export-components
export const path = {
  root: "/",
  tab1: "/recieved",
  tab2: "/chat",
  tab3: "/mypage",
  login: "/login",
  register: "/register",
  setup: "/setup",
  matchFilter: "/filter",
};

const router = createBrowserRouter([
  {
    path: path.root,
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
        element: <Chat />,
      },
      {
        path: path.tab3,
        element: <Mypage />,
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
  {
    path: path.matchFilter,
    element: (
      <MatchFilter
        handleChangeFilters={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
