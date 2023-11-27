import { styled } from "styled-components";
import logo from "@/assets/images/logo-removebg.png";
import { useNavigate } from "react-router-dom";

function deley() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

export default function Login() {
  const navigate = useNavigate();
  const handleClick = () => {
    deley().then(() => {
      navigate("/setup");
    });
  };
  return (
    <StyledContainer>
      <img src={logo} alt="main logo" />
      <StyledLayout>
        <StyledInput
          type="text"
          id="phone-number"
          placeholder="휴대폰 번호를 입력해주세요(- 없이)"
        />
        <StyledButton>인증문자 받기</StyledButton>
        <StyledInput
          type="text"
          id="phone-number-check"
          placeholder="인증번호를 입력해주세요"
        />
        <StyledButton onClick={handleClick}>인증하기</StyledButton>
      </StyledLayout>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 40px;
  & > img {
    margin: 0 auto;
    width: 150px;
    margin-bottom: 20px;
  }
`;

const StyledLayout = styled.div`
  width: 100%;
  max-width: 430px;
  display: flex;
  flex-direction: column;

  gap: 10px;
  padding: 30px 40px;
  border-radius: 20px;
`;

const StyledInput = styled.input`
  padding: 20px 40px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.colors.point};
  outline: none;
  &::placeholder {
    text-align: center;
  }
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.point};
  color: white;
  padding: 20px 40px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #26403f;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
