import { FormEvent, useRef, useState } from "react";
import { styled } from "styled-components";
import logo from "@/assets/images/logo-removebg.png";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import authAPI from "@/service/apis/auth";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { LoadingSpinnerAtom } from "@/recoils/loadingSpinnerAtom";
import { FormStyle } from "@/components/common/Form.styles";
import { path } from "@/App";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const setIsLoading = useSetRecoilState(LoadingSpinnerAtom);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      setIsLoading(true);
      authAPI
        .loginUser({ email, password })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res));
          toast.success("로그인 되었습니다.");
          navigate(path.root);
        })
        .catch((err) => {
          if (err instanceof AxiosError && err.response) {
            console.log("err: ", err);
            setError(err.response.data?.error);
          } else {
            console.error(err);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("필수 사항을 입력해주세요.");
    }
  };

  return (
    <StyledContainer>
      <img src={logo} alt="main logo" />
      <FormStyle.Form onSubmit={handleLogin}>
        <FormStyle.Label htmlFor="email">이메일</FormStyle.Label>
        <FormStyle.Input
          type="email"
          id="email"
          name="email"
          placeholder="helf9594@heathfriends.com"
          ref={emailRef}
        />
        <FormStyle.Label htmlFor="email">비밀번호</FormStyle.Label>
        <FormStyle.Input
          type="password"
          id="password"
          placeholder="영문, 숫자, 특수문자를 포함한 8자 이상"
          ref={passwordRef}
        />
        <FormStyle.Button $buttonTheme="contain" onClick={handleLogin}>
          로그인
        </FormStyle.Button>
        <StyledSpan>
          회원이 아니신가요?
          <span onClick={() => navigate(path.register)}>회원가입하기</span>
        </StyledSpan>
        <StyledSpan>
          비밀번호를 잊으셨나요?
          <span onClick={() => navigate(path.register, { state: true })}>
            비밀번호 변경하기
          </span>
        </StyledSpan>
        <StyledErrorSpan>{error}</StyledErrorSpan>
      </FormStyle.Form>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  height: 100vh;
  & > img {
    margin: 0 auto;
    width: 150px;
  }
`;

const StyledErrorSpan = styled.span`
  color: red;
  text-align: center;
  font-weight: bold;
`;

const StyledSpan = styled.div`
  padding: 1rem 0px;
  text-align: center;
  width: 100%;
  & > span {
    margin-left: 4px;
    color: ${({ theme }) => theme.colors.point};
    text-decoration: underline;
    cursor: pointer;
  }
`;
