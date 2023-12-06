import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = localStorage.getItem("user");

  // 인증이 반드시 필요한 페이지
  if (user) return <Outlet />;

  // 미로그인 유저가 이동할 곳
  return <Navigate replace to="/login" />;
}
