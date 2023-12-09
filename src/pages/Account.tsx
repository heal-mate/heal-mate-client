import { path } from "@/App";
import authAPI from "@/service/apis/auth";
import { customConfirmAlert } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { css, styled } from "styled-components";

export default function Account() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await authAPI.logoutUser();
    navigate(path.login);
  };

  const handleWithdraw = async () => {
    customConfirmAlert("정말 탈퇴하시겠습니까?")
      .then(async (result) => {
        if (result.isConfirmed) {
          await authAPI.withdrawUser();
          navigate(path.login);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
      <StyledButton $warning onClick={handleWithdraw}>
        회원탈퇴
      </StyledButton>
    </div>
  );
}

const StyledButton = styled.button<{ $warning?: boolean }>`
  outline: none;
  border: none;

  background-color: ${({ $warning }) => ($warning ? css`#ff4d4d` : css`#fff`)};
  border: 1px solid
    ${({ $warning }) =>
      $warning
        ? css`#ff4d4d`
        : css`
            ${({ theme }) => theme.colors.point}
          `};
  color: ${({ $warning }) =>
    $warning
      ? css`white`
      : css`
          ${({ theme }) => theme.colors.point}
        `};
  padding: 10px 20px;

  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 8px;

  &:hover {
    color: white;
    background-color: ${({ $warning }) =>
      $warning
        ? css`#ff4d4d`
        : css`
            ${({ theme }) => theme.colors.point}
          `};
  }
`;
