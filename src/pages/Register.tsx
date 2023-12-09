import { FormEvent, useRef, useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import authAPI from "@/service/apis/auth";
import { FormStyle } from "@/components/common/Form.styles";
import toast from "react-hot-toast";
import { FunnelStyle } from "@/components/common/Funnel.styles";
import { path } from "@/App";

export default function Register() {
  const { state: isUpdatePassword } = useLocation();

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const authCodeRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const nextStep = () => {
    isUpdatePassword
      ? navigate(path.updatePassword, {
          state: { email: emailRef.current!.value, isUpdatePassword },
        })
      : navigate(path.setup, { state: emailRef.current!.value });
  };

  const handleSendAuthMail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current) {
      authAPI
        .sendAuthCodeMail(emailRef.current.value, isUpdatePassword)
        .then(() =>
          toast.success("이메일이 발송되었습니다.\n5분안에 인증해주세요."),
        )
        .catch((err) => setErrorMessage(err.response.data?.error));
    }
  };

  const handleCheckAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authCodeRef.current && emailRef.current) {
      authAPI
        .checkAuthCode({
          email: emailRef.current.value,
          authCode: authCodeRef.current.value,
        })
        .then(() => {
          toast.success("인증되었습니다.");
          nextStep();
        })
        .catch((err) => setErrorMessage(err.response.data?.error));
    }
  };

  return (
    <FunnelStyle.Container>
      <FunnelStyle.StageHeaderWrapper>
        <FunnelStyle.StageHeader>
          <FunnelStyle.ArrowBackIcon onClick={() => navigate(-1)} />
          {isUpdatePassword ? "비밀번호 변경하기" : "회원가입"}
        </FunnelStyle.StageHeader>
      </FunnelStyle.StageHeaderWrapper>
      <StyledContainer>
        <FormStyle.Form onSubmit={handleSendAuthMail}>
          <FormStyle.Label htmlFor="email">본인 인증(이메일)</FormStyle.Label>
          <FormStyle.Input
            type="email"
            id="email"
            placeholder="이메일 주소를 입력해주세요"
            ref={emailRef}
          />
          <FormStyle.Button type="submit" $buttonTheme="contain">
            인증메일 전송하기
          </FormStyle.Button>
        </FormStyle.Form>
        <FormStyle.Form onSubmit={handleCheckAuth}>
          <FormStyle.Label htmlFor="authCode">인증 문자 입력</FormStyle.Label>
          <FormStyle.Input
            type="text"
            id="authCode"
            placeholder="인증문자를 입력해주세요"
            ref={authCodeRef}
          />
          <FormStyle.Button type="submit" $buttonTheme="contain">
            인증하기
          </FormStyle.Button>

          {errorMessage && <StyledErrorSpan>{errorMessage}</StyledErrorSpan>}
        </FormStyle.Form>
      </StyledContainer>
    </FunnelStyle.Container>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${({ theme }) => theme.size.headerHeight}px);
  & > img {
    margin: 0 auto;
    width: 150px;
    margin-bottom: 20px;
  }
`;

const StyledErrorSpan = styled.span`
  margin-top: 1rem;
  color: red;
  font-size: 1rem;
  text-align: center;
`;
