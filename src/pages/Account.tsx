import { path } from "@/App";
import authAPI from "@/service/apis/auth";
import { customConfirmAlert } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

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
    <StyledContainer>
      <StyledButtonGroup>
        <StyledButtonList onClick={handleLogout}>로그아웃</StyledButtonList>
        <StyledButtonList $warning onClick={handleWithdraw}>
          회원탈퇴
        </StyledButtonList>
      </StyledButtonGroup>
    </StyledContainer>
  );
}

const StyledContainer = styled.section`
  width: 100%;
`;

const StyledButtonGroup = styled.ul`
  display: flex;
  flex-direction: column;

  & > li {
    border-bottom: 0.0625rem solid #f2f2f2;
  }
`;

const StyledButtonList = styled.li<{ $warning?: boolean }>`
  font-size: 14px;
  padding: 10px 20px;
  color: ${({ $warning }) => ($warning ? "#ff4d4d" : "black")};

  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
`;
