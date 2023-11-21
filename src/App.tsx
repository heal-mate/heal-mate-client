import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";

// eslint-disable-next-line react-refresh/only-export-components
export const path = {
  root: "/",
};

const router = createBrowserRouter([
  {
    path: path.root,
    Component: () => <Main />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
