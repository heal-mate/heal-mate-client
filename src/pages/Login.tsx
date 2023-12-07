import { useRef, useState } from "react";
import { styled } from "styled-components";
import logo from "@/assets/images/logo-removebg.png";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import authAPI from "@/service/apis/auth";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const handleClick = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      authAPI
        .loginUser({ email, password })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res));
          alert("로그인 되었습니다.");
          navigate("/");
        })
        .catch((err) => {
          if (err instanceof AxiosError && err.response) {
            console.log("err: ", err);
            setError(err.response.data);
          } else {
            console.error(err);
          }
        });
    } else {
      alert("필수 사항을 입력해주세요.");
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
        <StyledInput
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          ref={passwordRef}
        />
        <StyledButton onClick={handleClick}>로그인</StyledButton>
        <StyledSpan onClick={() => navigate("/register")}>회원가입</StyledSpan>
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
`;

const StyledErrorSpan = styled.span`
  color: red;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;

const StyledSpan = styled.span`
  color: #35a29f;
  font-size: 10px;
  display: inline-block;
  width: fit-content;
  border-radius: 50px;
  padding: 7px 10px;
  cursor: pointer;
  margin-left: 4px;
  border-bottom: 1px solid #35a29f;
`;
