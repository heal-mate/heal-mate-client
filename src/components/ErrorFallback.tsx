import { path } from "@/App";
import authAPI from "@/service/apis/auth";
import customAlert from "@/utils/alert";
import { AxiosError } from "axios";
import { FallbackProps } from "react-error-boundary";
import { Navigate } from "react-router-dom";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  if (error instanceof AxiosError && error.response?.status === 401) {
    customAlert("유효하지 않은 사용자입니다. 다시 로그인해주세요.");
    authAPI.logoutUser();
    // TODO: localhost 비우기
    return <Navigate to={path.login} />;
  }

  return (
    <>
      {/* <div>에러가 발생했습니다. {error?.message ?? ""}</div> */}
      <div>에러가 발생했습니다. </div>
      <button onClick={resetErrorBoundary}>다시 시도하기</button>
    </>
  );
}
