import { useRef, useState } from "react";
import { styled } from "styled-components";
import logo from "@/assets/images/logo-removebg.png";
import { useNavigate } from "react-router-dom";
import { fetchGetAuthCode, fetchCheckAuthCode } from "@/service/apis/user";

export default function Register() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const authCodeRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const nextStep = () => {
    navigate("/setup", { state: emailRef.current!.value });
  };

  const handleClickAuth = () => {
    if (emailRef.current) {
      fetchGetAuthCode(emailRef.current.value)
        .then(() => alert("이메일이 발송되었습니다. 5분안에 인증해주세요."))
        .catch((err) => setError(err.response.data));
    }
  };

  const handleCheckAuth = () => {
    if (authCodeRef.current && emailRef.current) {
      fetchCheckAuthCode({
        email: emailRef.current.value,
        authCode: authCodeRef.current.value,
      })
        .then(() => {
          alert("인증되었습니다.");
          nextStep();
        })
        .catch((err) => setError(err.response.data));
    }
  };

  return (
    <StyledContainer>
      <img src={logo} alt="main logo" />
      <StyledLayout>
        <StyledInput
          type="text"
          id="email"
          placeholder="이메일 주소를 입력해주세요"
          ref={emailRef}
        />
        <StyledButton onClick={handleClickAuth}>인증메일 받기</StyledButton>
        {/* <StyledInput
          type="text"
          id="phone-number"
          placeholder="휴대폰 번호를 입력해주세요(- 없이)"
        />
        <StyledButton>인증문자 받기</StyledButton> */}
        <StyledInput
          type="text"
          id="authCode"
          placeholder="인증문자를 입력해주세요"
          ref={authCodeRef}
        />
        <StyledButton onClick={handleCheckAuth}>인증하기</StyledButton>

        <StyledErrorSpan>{error}</StyledErrorSpan>
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
    font-size: 10px;
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

const StyledErrorSpan = styled.span`
  color: red;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;
